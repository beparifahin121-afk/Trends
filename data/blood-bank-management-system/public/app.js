const GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const $ = (id) => document.getElementById(id);

function showToast(message, error = false) {
  const toast = $("toast");
  toast.textContent = message;
  toast.className = `toast show${error ? " error" : ""}`;
  setTimeout(() => toast.className = "toast", 2800);
}

function fillGroupOptions() {
  document.querySelectorAll('select[name="blood_group"]').forEach(select => {
    const first = select.querySelector('option')?.outerHTML || '<option value="">Select group</option>';
    select.innerHTML = first + GROUPS.map(g => `<option value="${g}">${g}</option>`).join("");
  });
}

async function api(url, options = {}) {
  const response = await fetch(url, {
    headers: { "Content-Type": "application/json" },
    ...options
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "Something went wrong.");
  return data;
}

async function loadDashboard() {
  const data = await api("/api/dashboard");
  $("donorTotal").textContent = data.donors;
  $("pendingTotal").textContent = data.pendingRequests;
  $("unitTotal").textContent = data.stock.reduce((sum, item) => sum + item.units, 0);
  $("stockGrid").innerHTML = data.stock.map(item =>
    `<div class="blood-card"><strong>${item.blood_group}</strong><span>${item.units} units recorded</span></div>`
  ).join("");
}

async function loadDonors() {
  const donors = await api("/api/donors");
  $("donorRows").innerHTML = donors.length ? donors.map(d =>
    `<tr><td>${escapeHtml(d.full_name)}</td><td>${d.age}</td><td><span class="group-pill">${d.blood_group}</span></td><td>${escapeHtml(d.phone)}</td><td>${escapeHtml(d.city)}</td></tr>`
  ).join("") : '<tr><td colspan="5">No donors registered yet.</td></tr>';
}

async function loadRequests() {
  const requests = await api("/api/requests");
  $("requestRows").innerHTML = requests.length ? requests.map(r =>
    `<tr><td>${escapeHtml(r.patient_name)}</td><td>${escapeHtml(r.hospital)}</td><td><span class="group-pill">${r.blood_group}</span></td><td>${r.units}</td><td>${escapeHtml(r.contact)}</td><td><span class="status ${r.status}">${r.status}</span></td><td><select class="small-select" aria-label="Update request status" onchange="updateStatus(${r.id}, this.value)">${["Pending","Approved","Fulfilled","Rejected"].map(s => `<option ${s === r.status ? "selected" : ""}>${s}</option>`).join("")}</select></td></tr>`
  ).join("") : '<tr><td colspan="7">No blood requests yet.</td></tr>';
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, char => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
  })[char]);
}

async function refreshAll() {
  try {
    await Promise.all([loadDashboard(), loadDonors(), loadRequests()]);
  } catch (error) {
    showToast(error.message, true);
  }
}

$("donorForm").addEventListener("submit", async event => {
  event.preventDefault();
  const body = Object.fromEntries(new FormData(event.target));
  try {
    const result = await api("/api/donors", { method: "POST", body: JSON.stringify(body) });
    showToast(result.message);
    event.target.reset();
    await refreshAll();
  } catch (error) { showToast(error.message, true); }
});

$("requestForm").addEventListener("submit", async event => {
  event.preventDefault();
  const body = Object.fromEntries(new FormData(event.target));
  try {
    const result = await api("/api/requests", { method: "POST", body: JSON.stringify(body) });
    showToast(result.message);
    event.target.reset();
    await refreshAll();
  } catch (error) { showToast(error.message, true); }
});

$("stockForm").addEventListener("submit", async event => {
  event.preventDefault();
  const body = Object.fromEntries(new FormData(event.target));
  try {
    const result = await api("/api/stock", { method: "POST", body: JSON.stringify(body) });
    showToast(result.message);
    event.target.reset();
    await loadDashboard();
  } catch (error) { showToast(error.message, true); }
});

async function updateStatus(id, status) {
  try {
    const result = await api(`/api/requests/${id}/status`, {
      method: "PATCH", body: JSON.stringify({ status })
    });
    showToast(result.message);
    await refreshAll();
  } catch (error) { showToast(error.message, true); }
}
window.updateStatus = updateStatus;

$("refreshBtn").addEventListener("click", refreshAll);
fillGroupOptions();
refreshAll();
