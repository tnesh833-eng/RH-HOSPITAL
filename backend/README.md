# RH Hospital — Python Flask Backend

This is the dedicated **Python Flask** REST API backend for the **RH Hospital (Multispecialty Healthcare & Research Institute)** portal. It handles doctor appointment bookings, live bed capacity telemetry, emergency ambulance dispatches, and diagnostic lab report retrievals.

---

## 🚀 Quick Start Guide

### 1. Requirements
- Python 3.9+ or Python 3.10+
- `pip` (Python package manager)

### 2. Setup Virtual Environment (Recommended)
```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python3 -m venv venv

# Activate virtual environment
# On Linux / macOS:
source venv/bin/activate
# On Windows:
venv\Scripts\activate
```

### 3. Install Dependencies
```bash
pip install -r requirements.txt
```

### 4. Run the Flask Development Server
```bash
python app.py
```
Or via the Flask CLI:
```bash
flask run --host=0.0.0.0 --port=5000
```

The Flask server will start listening at:
`http://localhost:5000`

---

## 📡 REST API Endpoints Overview

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Service health check |
| `GET` | `/api/departments` | List all 8 Centers of Clinical Excellence |
| `GET` | `/api/doctors` | List doctors (with `?department=` and `?q=` search parameters) |
| `GET` | `/api/doctors/<id>` | Retrieve single consultant profile and OPD timings |
| `GET` | `/api/beds` | Real-time bed occupancy telemetry across Wards, ICUs, NICU |
| `GET` | `/api/blood-bank` | Live Blood Bank units in cold storage with reserve status |
| `POST` | `/api/appointments` | Book doctor consultation and generate `RH-APT-YYYY-XXXX` voucher |
| `GET` | `/api/appointments/<token>` | Lookup confirmed appointment voucher by token |
| `POST` | `/api/emergency/dispatch` | Dispatch emergency ACLS ambulance with live GPS ETA |
| `GET` | `/api/reports/<uhid>` | Fetch authorized patient diagnostic lab test by UHID |

---

## 🧪 Sample API Test Commands (cURL)

### 1. Book Doctor Appointment
```bash
curl -X POST http://localhost:5000/api/appointments \
  -H "Content-Type: application/json" \
  -d '{
    "patient_name": "Ramesh Chandra",
    "patient_age": 42,
    "patient_gender": "Male",
    "patient_phone": "+91 98765 43210",
    "doctor_id": "doc-1",
    "date": "2026-09-26",
    "slot": "10:30 AM",
    "appointment_type": "In-Person OPD",
    "symptoms": "Follow-up consultation after chest stress test"
  }'
```

### 2. Fetch Diagnostic Lab Report by UHID
```bash
curl http://localhost:5000/api/reports/UHID-88204
```

### 3. Dispatch Rapid Ambulance
```bash
curl -X POST http://localhost:5000/api/emergency/dispatch \
  -H "Content-Type: application/json" \
  -d '{
    "address": "402 Skyline Heights, Sector 14, Ring Road",
    "phone": "+91 98111 22334",
    "condition": "Acute Chest Pain / Suspected STEMI"
  }'
```

### 4. Fetch Live Bed Telemetry
```bash
curl http://localhost:5000/api/beds
```

---

## 🚢 Production Deployment with Gunicorn
For production deployment on Linux servers or Docker containers:
```bash
gunicorn -w 4 -b 0.0.0.0:5000 app:app
```
