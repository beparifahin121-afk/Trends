/* Shared helpers used by all pages */
function esc(v){
  return String(v == null ? "" : v).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
}
const api = {
  residents: () => fetch("/residents").then(r => r.json()),
  config: () => fetch("/config").then(r => r.json())
};

function fillResidents(select, list, selectedId){
  select.innerHTML = '<option value="">-- Select a resident --</option>' +
    list.map(s => `<option value="${esc(s.resident_id)}">${esc(s.resident_id)} - ${esc(s.resident_name)} (${esc(s.room_no)})</option>`).join("");
  if (selectedId) select.value = selectedId;
}

/* Room dropdown. Full rooms are disabled (except the resident's own room when editing) */
function fillRooms(select, cfg, residents, selectedRoom, selfId){
  select.innerHTML = '<option value="">-- Select a room --</option>' + cfg.rooms.map(r => {
    const used = residents.filter(p => p.room_no === r.room && String(p.resident_id) !== String(selfId)).length;
    return `<option value="${esc(r.room)}" ${used >= r.capacity ? "disabled" : ""}>${esc(r.room)} - ${used}/${r.capacity} beds taken</option>`;
  }).join("");
  if (selectedRoom) select.value = selectedRoom;
}

function showMsg(text, type){
  const box = document.getElementById("msg");
  if (!box) return alert(text);
  box.textContent = text;
  box.className = "msg " + (type || "ok");
}
function checkOk(response){
  if (response.ok) return response.text();
  return response.text().then(m => { throw new Error(m || "Request failed"); });
}

/* ---------- Fees ---------- */
function money(n){ return "\u20B9" + Number(n).toLocaleString("en-IN"); }
function feeStatus(paid, fee){ return Number(paid) >= fee ? "Paid" : Number(paid) > 0 ? "Partial" : "Due"; }
function feeBadge(paid, fee){
  const s = feeStatus(paid, fee);
  return `<span class="badge ${s === "Paid" ? "pass" : s === "Partial" ? "part" : "fail"}">${s}</span>`;
}

function downloadCsv(filename, header, rows){
  const cell = v => '"' + String(v == null ? "" : v).replace(/"/g, '""') + '"';
  const csv = [header].concat(rows).map(r => r.map(cell).join(",")).join("\r\n");
  const blob = new Blob(["\ufeff" + csv], {type: "text/csv;charset=utf-8;"});
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob); a.download = filename;
  document.body.appendChild(a); a.click(); a.remove();
}

/* ---------- MySQL status badge in the sidebar ---------- */
document.addEventListener("DOMContentLoaded", () => {
  const side = document.querySelector(".topbar-inner"); if (!side) return;
  const el = document.createElement("div"); el.className = "dbstatus"; el.textContent = "Checking database...";
  side.appendChild(el);
  fetch("/status").then(r => r.json()).then(s => {
    el.className = "dbstatus " + (s.connected ? "up" : "down");
    el.textContent = s.connected ? "MySQL connected \u2022 " + s.database : "MySQL not connected";
  }).catch(() => { el.className = "dbstatus down"; el.textContent = "MySQL not connected"; });
});
