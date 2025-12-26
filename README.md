## Project Architecture Overview

This project is a full-stack hotel booking system built as a portfolio project.

The frontend was generated using Lovable and customized manually.
The backend will be implemented separately using Django REST Framework.
All services used are free-tier or open-source.

---

## Page Classification: Static vs Dynamic

## Frontend Page Classification (src/pages)

### Static Pages

- **AboutPage**
  - Informational content only

- **ContactPage**
  - UI-only contact form

- **NotFound**
  - 404 fallback page

---

### Mixed Pages

- **Index (Homepage)**
  - Static layout
  - Dynamic featured rooms (via API)

---

### Dynamic Pages (Backend Required)

- **RoomsPage**
  - Fetches room list from API

- **RoomDetailsPage**
  - Fetches single room data by ID

- **BookingPage**
  - Submits booking data
  - Handles availability validation

- **LoginPage**
  - User authentication

- **SignupPage**
  - User registration

- **ForgotPasswordPage**
  - Password recovery flow

- **AdminDashboard**
  - Admin-only backend access
  - Booking and room management

---

## Data Flow (Planned)

Frontend (Next.js / React)
→ API Layer (Django REST Framework)
→ Database (SQLite locally, PostgreSQL later)

All frontend components are designed to consume API data.
No business logic exists on the frontend.
