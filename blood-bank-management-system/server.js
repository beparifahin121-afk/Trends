require("dotenv").config();

const express = require("express");
const mysql = require("mysql2/promise");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;
const GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "blood_bank",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

function validGroup(group) {
  return GROUPS.includes(group);
}

app.get("/api/dashboard", async (req, res) => {
  try {
    const [[donorCount]] = await pool.query("SELECT COUNT(*) AS total FROM donors");
    const [[requestCount]] = await pool.query("SELECT COUNT(*) AS total FROM blood_requests WHERE status = 'Pending'");
    const [stock] = await pool.query("SELECT blood_group, units FROM blood_stock ORDER BY FIELD(blood_group,'A+','A-','B+','B-','AB+','AB-','O+','O-')");
    res.json({ donors: donorCount.total, pendingRequests: requestCount.total, stock });
  } catch (err) {
    res.status(500).json({ error: "Could not load dashboard. Check your database setup." });
  }
});

app.get("/api/donors", async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT id, full_name, age, phone, blood_group, city, created_at FROM donors ORDER BY id DESC"
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: "Could not fetch donors." });
  }
});

app.post("/api/donors", async (req, res) => {
  const { full_name, age, phone, blood_group, city } = req.body;
  const parsedAge = Number(age);
  if (!full_name || !phone || !city || !validGroup(blood_group) ||
      !Number.isInteger(parsedAge) || parsedAge < 18 || parsedAge > 65) {
    return res.status(400).json({ error: "Enter valid details. Donor age must be 18–65 for this demo; actual eligibility must be assessed by qualified staff." });
  }
  try {
    const [result] = await pool.execute(
      "INSERT INTO donors (full_name, age, phone, blood_group, city) VALUES (?, ?, ?, ?, ?)",
      [full_name.trim(), parsedAge, phone.trim(), blood_group, city.trim()]
    );
    res.status(201).json({ message: "Donor registered successfully.", id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: "Could not register donor." });
  }
});

app.get("/api/requests", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM blood_requests ORDER BY id DESC");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: "Could not fetch blood requests." });
  }
});

app.post("/api/requests", async (req, res) => {
  const { patient_name, hospital, blood_group, units, contact } = req.body;
  const count = Number(units);
  if (!patient_name || !hospital || !contact || !validGroup(blood_group) ||
      !Number.isInteger(count) || count < 1 || count > 50) {
    return res.status(400).json({ error: "Please enter valid request details." });
  }
  try {
    const [result] = await pool.execute(
      "INSERT INTO blood_requests (patient_name, hospital, blood_group, units, contact) VALUES (?, ?, ?, ?, ?)",
      [patient_name.trim(), hospital.trim(), blood_group, count, contact.trim()]
    );
    res.status(201).json({ message: "Blood request submitted successfully.", id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: "Could not submit request." });
  }
});

// Staff can adjust recorded stock. This demo endpoint has no login; add authentication before real use.
app.post("/api/stock", async (req, res) => {
  const { blood_group, units, operation } = req.body;
  const count = Number(units);
  if (!validGroup(blood_group) || !Number.isInteger(count) || count < 1 || count > 500 ||
      !["add", "remove"].includes(operation)) {
    return res.status(400).json({ error: "Enter a valid blood group, unit count and operation." });
  }
  try {
    const connection = await pool.getConnection();
    try {
      await connection.beginTransaction();
      const [rows] = await connection.execute(
        "SELECT units FROM blood_stock WHERE blood_group = ? FOR UPDATE", [blood_group]
      );
      const current = rows[0]?.units ?? 0;
      if (operation === "remove" && current < count) {
        await connection.rollback();
        return res.status(400).json({ error: "Not enough recorded units in stock." });
      }
      const next = operation === "add" ? current + count : current - count;
      await connection.execute("UPDATE blood_stock SET units = ? WHERE blood_group = ?", [next, blood_group]);
      await connection.commit();
      res.json({ message: "Stock updated successfully.", units: next });
    } catch (err) {
      await connection.rollback();
      res.status(500).json({ error: "Could not update stock." });
    } finally {
      connection.release();
    }
  } catch (err) {
    res.status(500).json({ error: "Database connection failed." });
  }
});

app.patch("/api/requests/:id/status", async (req, res) => {
  const { status } = req.body;
  const allowed = ["Pending", "Approved", "Fulfilled", "Rejected"];
  if (!allowed.includes(status)) return res.status(400).json({ error: "Invalid status." });
  try {
    const [result] = await pool.execute(
      "UPDATE blood_requests SET status = ? WHERE id = ?", [status, req.params.id]
    );
    if (!result.affectedRows) return res.status(404).json({ error: "Request not found." });
    res.json({ message: "Request status updated." });
  } catch (err) {
    res.status(500).json({ error: "Could not update request status." });
  }
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Blood Bank Management System running at http://localhost:${PORT}`);
});
