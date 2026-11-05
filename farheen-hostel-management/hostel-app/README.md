# Farheen Hostel Management System

Converted from the student app. Same pages and look, now for hostel work.

## Run
    node server.js
Needs MySQL running (XAMPP) and `npm install` once. Open http://localhost:3000. The database `hostel_db` and table `residents` are created automatically (existing db.json data is imported on first run).
created automatically with 3 sample residents. Delete it to reset.

## Pages
| Page | Purpose |
|---|---|
| Home | Quick stats and shortcuts |
| Residents | Search, sort, fee status, export CSV |
| Rooms | Occupancy per room, vacant beds, who stays where |
| Find Resident | View one record and roommates |
| Check-in | Add a resident and allot a room |
| Update Resident | Change phone, room or fee paid |
| Check-out | Remove a resident and free the bed |

## Rules enforced by the server
Unique resident ID, 10-digit phone, valid room, room capacity not exceeded, fee paid between 0 and the yearly fee.

## Settings (top of server.js)
`CONFIG.fee` is the yearly fee; the room list and beds per room are right below it.

## API
GET /residents, GET /residents/:id, POST /residents, PUT /residents/:id, DELETE /residents/:id, GET /config
