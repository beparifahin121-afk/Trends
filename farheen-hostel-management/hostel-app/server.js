/* Farheen Hostel Management - Node + MySQL. Run: npm install, then node server.js */
const http = require("http"), fs = require("fs"), path = require("path");
const mysql = require("mysql2/promise");
const PORT = process.env.PORT || 3000, PUB = path.join(__dirname, "public");

/* ---- MySQL settings (XAMPP default: user root, empty password) ---- */
const DBCFG = {
  host: process.env.DB_HOST || "localhost", port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER || "root", password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "hostel_db"
};

/* ---- Hostel settings ---- */
const CONFIG = { fee: 60000, rooms: [] };
for (const floor of [1, 2, 3]) for (let n = 1; n <= 6; n++)
  CONFIG.rooms.push({ room: `A${floor}0${n}`, capacity: 3 });

let pool;
async function initDb() {
  const boot = await mysql.createConnection({ host: DBCFG.host, port: DBCFG.port, user: DBCFG.user, password: DBCFG.password });
  await boot.query("CREATE DATABASE IF NOT EXISTS `" + DBCFG.database + "`");
  await boot.end();
  pool = mysql.createPool({ ...DBCFG, connectionLimit: 5 });
  await pool.query(`CREATE TABLE IF NOT EXISTS residents (
    resident_id VARCHAR(20) PRIMARY KEY, resident_name VARCHAR(100) NOT NULL,
    phone CHAR(10) NOT NULL, room_no VARCHAR(10) NOT NULL, fee_paid INT NOT NULL DEFAULT 0)`);
  const [[{ n }]] = await pool.query("SELECT COUNT(*) AS n FROM residents");
  if (n === 0) {   // first run: import old db.json if present, else add samples
    let rows = [["101", "Ravi Kumar", "9876543210", "A101", 60000], ["102", "Anil Reddy", "9876501234", "A101", 30000], ["103", "Suresh Babu", "9123456780", "A102", 0]];
    try { rows = JSON.parse(fs.readFileSync(path.join(__dirname, "db.json"), "utf8")).map(r => [r.resident_id, r.resident_name, r.phone, r.room_no, r.fee_paid]); } catch {}
    if (rows.length) await pool.query("INSERT INTO residents VALUES ?", [rows]);
  }
}

const send = (res, code, body, type = "text/plain") => {
  res.writeHead(code, { "Content-Type": type + "; charset=utf-8" });
  res.end(typeof body === "string" ? body : JSON.stringify(body));
};
const readBody = req => new Promise(ok => {
  let b = ""; req.on("data", c => b += c);
  req.on("end", () => { try { ok(JSON.parse(b || "{}")); } catch { ok({}); } });
});

/* Returns an error message, or null when the data is valid */
async function check(b, selfId) {
  const name = String(b.name || "").trim(), phone = String(b.phone || "").trim(), paid = Number(b.paid);
  const room = CONFIG.rooms.find(r => r.room === String(b.room));
  if (!name) return "Name is required.";
  if (!/^\d{10}$/.test(phone)) return "Phone number must be 10 digits.";
  if (!room) return "Please choose a valid room.";
  if (!Number.isFinite(paid) || paid < 0 || paid > CONFIG.fee) return `Fee paid must be between 0 and ${CONFIG.fee}.`;
  const [[{ n }]] = await pool.query("SELECT COUNT(*) AS n FROM residents WHERE room_no = ? AND resident_id <> ?", [room.room, String(selfId)]);
  if (n >= room.capacity) return `Room ${room.room} is full (${room.capacity} beds).`;
  return null;
}

async function api(req, res, parts) {
  const id = parts[1] ? String(parts[1]) : null;
  if (parts[0] === "config") return send(res, 200, CONFIG, "application/json");
  if (parts[0] === "status") {
    try { await pool.query("SELECT 1"); return send(res, 200, { connected: true, database: DBCFG.database, host: DBCFG.host }, "application/json"); }
    catch { return send(res, 200, { connected: false }, "application/json"); }
  }
  if (req.method === "GET" && !id) { const [r] = await pool.query("SELECT * FROM residents ORDER BY CAST(resident_id AS UNSIGNED), resident_id"); return send(res, 200, r, "application/json"); }
  if (req.method === "GET") { const [r] = await pool.query("SELECT * FROM residents WHERE resident_id = ?", [id]); return send(res, 200, r, "application/json"); }
  if (req.method === "POST" && !id) {
    const b = await readBody(req), rid = String(b.sno || "").trim();
    if (!rid) return send(res, 400, "Resident ID is required.");
    const [dup] = await pool.query("SELECT 1 FROM residents WHERE resident_id = ?", [rid]);
    if (dup.length) return send(res, 400, "Resident ID " + rid + " already exists.");
    const err = await check(b, rid); if (err) return send(res, 400, err);
    await pool.query("INSERT INTO residents VALUES (?,?,?,?,?)", [rid, b.name.trim(), b.phone.trim(), b.room, Number(b.paid)]);
    return send(res, 200, "Resident inserted into room " + b.room + ".");
  }
  if (req.method === "PUT" && id) {
    const [ex] = await pool.query("SELECT 1 FROM residents WHERE resident_id = ?", [id]);
    if (!ex.length) return send(res, 404, "Resident not found.");
    const b = await readBody(req), err = await check(b, id); if (err) return send(res, 400, err);
    await pool.query("UPDATE residents SET resident_name=?, phone=?, room_no=?, fee_paid=? WHERE resident_id=?", [b.name.trim(), b.phone.trim(), b.room, Number(b.paid), id]);
    return send(res, 200, "Resident updated.");
  }
  if (req.method === "DELETE" && id) {
    const [r] = await pool.query("DELETE FROM residents WHERE resident_id = ?", [id]);
    return send(res, r.affectedRows ? 200 : 404, r.affectedRows ? "Resident checked out." : "Resident not found.");
  }
  send(res, 405, "Method not allowed");
}

const TYPES = { ".html": "text/html", ".css": "text/css", ".js": "text/javascript", ".svg": "image/svg+xml" };
const server = http.createServer(async (req, res) => {
  try {
    const url = decodeURIComponent(req.url.split("?")[0]);
    const parts = url.split("/").filter(Boolean);
    if (["residents", "config", "status"].includes(parts[0])) return await api(req, res, parts);
    const f = path.normalize(path.join(PUB, url === "/" ? "index.html" : url));
    if (!f.startsWith(PUB + path.sep) || !TYPES[path.extname(f)]) return send(res, 404, "Not found");
    fs.readFile(f, (e, d) => {
      if (e) return send(res, 404, "Not found");
      res.writeHead(200, { "Content-Type": TYPES[path.extname(f)] + "; charset=utf-8" }); res.end(d);
    });
  } catch (e) { console.error(e.message); send(res, 500, "Database error. Is MySQL running?"); }
});

initDb().then(() => server.listen(PORT, () => console.log(`MySQL connected (${DBCFG.database}). Hostel Management at http://localhost:${PORT}`)))
  .catch(e => { console.error("\nCould not connect to MySQL: " + e.message + "\nStart MySQL in XAMPP and check user/password at the top of server.js.\n"); process.exit(1); });
