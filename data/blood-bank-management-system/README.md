# LifeLine — Blood Bank Management System

A simple educational website built with HTML, CSS, JavaScript, Node.js, Express and MySQL.

## Features
- Dashboard with donor count, pending requests and total recorded blood units
- Donor registration and donor list
- Blood request submission and request status updates
- Blood stock view and stock adjustment
- MySQL database with parameterized SQL queries

## Requirements
- Node.js and npm
- MySQL Server 8.x (or a compatible MySQL server)

## Setup on Windows

### 1. Create the database
1. Open MySQL Workbench or MySQL Command Line Client.
2. Open `database.sql`.
3. Execute the complete SQL script. It creates the `blood_bank` database and tables.

### 2. Configure the connection
1. In this project folder, copy `.env.example` and rename the copy to `.env`.
2. Open `.env`.
3. Enter your MySQL username and password.

Example:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=blood_bank
PORT=3000
```

### 3. Install packages
Open Command Prompt in this project folder and run:
```cmd
npm install
```

### 4. Start the website
```cmd
npm start
```
Open this address in your browser:
http://localhost:3000

## Important notes
- This is a college/student demonstration project, not a production-ready medical system.
- The demo has no login or role-based access. Do not deploy it publicly or enter real donor/patient information without adding authentication, authorization, HTTPS, audit logs, backups and a privacy/security review.
- The age range in the donor form is only a demo validation. Actual donor eligibility must be assessed by qualified staff.
- The application records requested blood groups and stock. It does not determine blood compatibility or authorize blood release. Qualified blood-bank professionals must verify compatibility, testing, storage and release.
- Never commit `.env` or real personal/medical data to GitHub.
