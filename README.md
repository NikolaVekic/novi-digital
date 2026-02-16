## Features
- ✅ Register (first name, last name, email, password)
- ✅ Login / Logout
- ✅ Persistent login on refresh (server sessions stored in MongoDB)
- ✅ Validation (frontend + backend)
- ✅ Responsive navbar (hamburger menu on mobile)
- ✅ Centered “Welcome {First} {Last}” home screen
- ✅ Loading spinner while checking auth state

## Tech Stack
- **Frontend:** React + TypeScript + Vite + Tailwind CSS
- **Backend:** Node.js + Express + TypeScript
- **Database:** MongoDB
- **Auth:** `express-session` + `connect-mongo` (cookie-based sessions)
- **Validation:** Zod
- **Password Hashing:** bcrypt

## Project Structure
- `client/` — React app (UI)
- `server/` — Express API (auth + sessions)

## Setup
1) Install deps:
```bash
cd server && npm install
cd ../client && npm install
