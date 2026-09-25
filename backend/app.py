from flask import Flask, request, jsonify
from flask_cors import CORS
import datetime
import random

app = Flask(__name__)
# Enable CORS for frontend integration
CORS(app, resources={r"/api/*": {"origins": "*"}})

# ==========================================
# In-Memory Hospital Database & Data Store
# ==========================================

DEPARTMENTS = [
    {
        "id": "cardiology",
        "name": "Cardiology & Cardiac Surgery",
        "tagline": "Comprehensive Heart & Vascular Institute",
        "description": "Round-the-clock primary angioplasty, complex valve repairs, pediatric cardiology, and minimally invasive robotic coronary artery bypass procedures.",
        "head_of_dept": "Dr. Vikramaditya Roy, MD, DM, FACC",
        "beds": 64,
        "icon": "HeartPulse",
        "featured_procedures": [
            "Coronary Angiography & Stenting (Cath Lab)",
            "Minimally Invasive CABG (Bypass Surgery)",
            "TAVI (Transcatheter Aortic Valve Implantation)",
            "Electrophysiology & Pacemaker Implantation",
            "Advanced Heart Failure & ECMO Support"
        ],
        "equipment": ["Philips Azurion 7 Biplane Cath Lab", "3D Echocardiography", "Rotablator System"],
        "stat": "99.4% Angioplasty Success Rate"
    },
    {
        "id": "neurology",
        "name": "Neurology & Neurosurgery",
        "tagline": "Brain, Spine & Neuro-Vascular Excellence",
        "description": "Level-1 Comprehensive Stroke Center equipped with rapid thrombolysis, mechanical thrombectomy, stereotactic neuro-navigation, and microscopic spine surgery.",
        "head_of_dept": "Dr. Marcus Sterling, MS, MCh (Neurosurgery), IFAANS",
        "beds": 48,
        "icon": "Brain",
        "featured_procedures": [
            "Code Stroke 24/7 Rapid Mechanical Thrombectomy",
            "Awake Craniotomy for Brain Tumors",
            "Endoscopic Skull Base Surgery",
            "Minimally Invasive Spine Micro-Discectomy",
            "Deep Brain Stimulation (DBS) for Parkinson's"
        ],
        "equipment": ["Zeiss KINEVO 900 Robotic Microscope", "Medtronic StealthStation S8", "32-Channel Intraoperative EEG"],
        "stat": "< 28 Min Stroke Door-to-Needle Time"
    },
    {
        "id": "orthopedics",
        "name": "Orthopedics & Joint Reconstruction",
        "tagline": "Precision Robotics & Sports Medicine",
        "description": "Specialized center for autonomous robotic-assisted knee and hip replacements, complex trauma reconstructions, arthroscopic sports surgeries, and spinal corrections.",
        "head_of_dept": "Dr. Raghavendra Hegde, MS (Ortho), MCh, FRCS",
        "beds": 52,
        "icon": "Activity",
        "featured_procedures": [
            "Mako Robotic-Arm Assisted Total Knee Replacement",
            "Direct Anterior Total Hip Arthroplasty",
            "Arthroscopic ACL/PCL Ligament Reconstruction",
            "Spinal Deformity & Scoliosis Correction",
            "Day-Care Arthroscopic Shoulder Rotator Cuff Repair"
        ],
        "equipment": ["Stryker Mako Robotic System", "Smith & Nephew 4K Arthroscopy Tower", "Mobile C-Arm Fluoroscopy"],
        "stat": "4,200+ Robotic Joint Replacements Done"
    },
    {
        "id": "oncology",
        "name": "Medical & Surgical Oncology",
        "tagline": "Integrated Multidisciplinary Cancer Center",
        "description": "Tumor Board guided personalized cancer therapeutics, hyperthermic intraperitoneal chemotherapy (HIPEC), targeted immunotherapy, and organ-preserving oncological surgery.",
        "head_of_dept": "Dr. Sumita Bannerjee, MD, DNB (Oncology), ESMO Fellow",
        "beds": 58,
        "icon": "ShieldAlert",
        "featured_procedures": [
            "Multidisciplinary Tumor Board Consultation",
            "Robotic Radical Prostatectomy & Gynecologic Oncology",
            "Precision Immunotherapy & Targeted Biologicals",
            "Day-Care Chemotherapy & Infusion Lounge",
            "Breast Oncoplasty & Sentinel Lymph Node Biopsy"
        ],
        "equipment": ["Elekta Versa HD Linear Accelerator", "Automated Closed-System Chemo Compounding", "PET-CT Fusion Planning"],
        "stat": "Zero Treatment Interruption Protocol"
    },
    {
        "id": "pediatrics",
        "name": "Pediatrics & Neonatology (NICU)",
        "tagline": "Advanced Child & Infant Intensive Care",
        "description": "Level-III tertiary Neonatal Intensive Care Unit with dedicated transport incubators, pediatric intensive care (PICU), and developmental pediatric clinics.",
        "head_of_dept": "Dr. Ananya Sen, MD (Pediatrics), Fellowship in Neonatology (UK)",
        "beds": 42,
        "icon": "Baby",
        "featured_procedures": [
            "Tertiary Level-III Neonatal Intensive Care (NICU)",
            "High-Frequency Oscillatory Ventilation & Nitric Oxide Therapy",
            "Pediatric Emergency Care & Resuscitation",
            "Comprehensive Pediatric Vaccination & Growth Monitoring",
            "Pediatric Cardiology & Congenital Heart Screening"
        ],
        "equipment": ["GE Giraffe OmniBed Carestations", "Dräger Babylog VN500 Ventilators", "Nitric Oxide Delivery Units"],
        "stat": "98.8% Survival Rate for Extreme Preterms"
    },
    {
        "id": "gastroenterology",
        "name": "Gastroenterology & Hepatobiliary Sciences",
        "tagline": "Digestive, Liver & Biliary Tract Care",
        "description": "Comprehensive digestive disease center delivering high-definition therapeutic endoscopy, ERCP, endoscopic ultrasound (EUS), and liver disease management.",
        "head_of_dept": "Dr. Tariq Al-Mansoor, MD, DM (Gastro), FACG",
        "beds": 36,
        "icon": "Stethoscope",
        "featured_procedures": [
            "Diagnostic & Therapeutic Upper GI Endoscopy",
            "Colonoscopy & Polypectomy Screening",
            "ERCP for Bile Duct Stones & Strictures",
            "Endoscopic Ultrasound (EUS) & Fine Needle Biopsy",
            "FibroScan Liver Stiffness Assessment"
        ],
        "equipment": ["Olympus EVIS X1 Endoscopy System", "EUS Radial & Linear Scopes", "EchoSens FibroScan 530 Compact"],
        "stat": "Over 8,500 Endoscopic Procedures / Year"
    },
    {
        "id": "nephrology",
        "name": "Nephrology & Renal Transplant Center",
        "tagline": "Kidney Health, Dialysis & Transplantation",
        "description": "State-of-the-art dialysis suite running 24/7 online hemodiafiltration (HDF), automated peritoneal dialysis training, and live-donor kidney transplants.",
        "head_of_dept": "Dr. Harish K. Varma, MD, DM (Nephro), FRCP",
        "beds": 40,
        "icon": "Droplets",
        "featured_procedures": [
            "24/7 Online Hemodiafiltration (HDF) Dialysis Unit",
            "Living Donor Kidney Transplantation Services",
            "Vascular Access Creation (AV Fistula Surgery)",
            "Continuous Renal Replacement Therapy (CRRT in ICU)",
            "Pediatric Nephrology & Glomerular Clinic"
        ],
        "equipment": ["Fresenius 5008S CorDiax Dialysis Machines", "Prismaflex CRRT Systems", "Ultrapure Water RO Plant"],
        "stat": "42 Dialysis Stations with Dedicated Isolation"
    },
    {
        "id": "radiology",
        "name": "Advanced Diagnostics & Imaging",
        "tagline": "Sub-millimeter Precision Diagnostic Radiology",
        "description": "Fully digital diagnostic imaging wing with ultra-fast multi-slice CT, high-tesla MRI, digital mammography, and interventional ultrasound.",
        "head_of_dept": "Dr. Priyanka Deshmukh, MD (Radiology), FICR",
        "beds": 20,
        "icon": "Scan",
        "featured_procedures": [
            "3.0 Tesla Silent Wide-Bore MRI Neuro & Musculoskeletal",
            "256-Slice Dual-Source Ultra Low-Dose Cardiac CT",
            "Digital 3D Breast Tomosynthesis (Mammography)",
            "Color Doppler Vascular Ultrasound & Elastography",
            "CT & Ultrasound-Guided Biopsies & Drainage"
        ],
        "equipment": ["Siemens Magnetom Vida 3T MRI", "GE Revolution Apex 256-Slice CT", "Hologic 3D Dimensions Mammography"],
        "stat": "< 90 Mins Standard Report TAT"
    }
]

DOCTORS = [
    {
        "id": "doc-1",
        "name": "Dr. Vikramaditya Roy",
        "department": "Cardiology & Cardiac Surgery",
        "qualification": "MBBS, MD (Medicine), DM (Cardiology), FACC (USA)",
        "designation": "Director & Chief Interventional Cardiologist",
        "experience_years": 24,
        "rating": 4.9,
        "review_count": 382,
        "opd_timings": "Mon, Wed, Fri · 09:30 AM – 02:00 PM",
        "opd_room": "Room 102 (Cardiology OPD, Wing A)",
        "consultation_fee": 1200,
        "languages": ["English", "Hindi", "Bengali"],
        "next_available": "Today · 11:30 AM",
        "specializations": ["Complex Angioplasty", "Transcatheter Valve Repair (TAVI)", "Bifurcation Stenting", "Heart Failure Management"],
        "bio": "Pioneering cardiologist with over 18,000 successful interventions. Trained at Johns Hopkins."
    },
    {
        "id": "doc-2",
        "name": "Dr. Marcus Sterling",
        "department": "Neurology & Neurosurgery",
        "qualification": "MD, MS, MCh (Neurosurgery), Fellowship in Cerebrovascular (Zurich)",
        "designation": "Senior Consultant Neurosurgeon & Stroke Lead",
        "experience_years": 20,
        "rating": 4.9,
        "review_count": 294,
        "opd_timings": "Tue, Thu, Sat · 10:00 AM – 03:00 PM",
        "opd_room": "Room 205 (Neuroscience Suite, Wing A)",
        "consultation_fee": 1400,
        "languages": ["English", "German", "Hindi"],
        "next_available": "Tomorrow · 10:15 AM",
        "specializations": ["Micro-Neurosurgery", "Endovascular Stroke Thrombectomy", "Spine Endoscopy"],
        "bio": "Renowned neurosurgeon focusing on acute ischemic stroke interventions and brain tumor resections."
    },
    {
        "id": "doc-3",
        "name": "Dr. Raghavendra Hegde",
        "department": "Orthopedics & Joint Reconstruction",
        "qualification": "MBBS, MS (Ortho), MCh, FRCS (Tr & Orth, UK)",
        "designation": "Head of Robotic Joint Reconstruction & Orthopedics",
        "experience_years": 22,
        "rating": 4.8,
        "review_count": 440,
        "opd_timings": "Mon, Tue, Thu · 09:00 AM – 01:30 PM",
        "opd_room": "Room 114 (Orthopedics OPD, Wing A)",
        "consultation_fee": 1100,
        "languages": ["English", "Kannada", "Hindi"],
        "next_available": "Today · 02:00 PM",
        "specializations": ["Robotic Total Knee Replacement", "Direct Anterior Hip Arthroplasty", "Sports Arthroscopy"],
        "bio": "International faculty for robotic arthroplasty with thousands of joint replacements."
    },
    {
        "id": "doc-4",
        "name": "Dr. Sumita Bannerjee",
        "department": "Medical & Surgical Oncology",
        "qualification": "MD (Internal Medicine), DNB (Medical Oncology), ESMO Certified",
        "designation": "Senior Consultant Medical Oncologist & Immunotherapist",
        "experience_years": 18,
        "rating": 4.9,
        "review_count": 215,
        "opd_timings": "Mon to Fri · 11:00 AM – 04:00 PM",
        "opd_room": "Room 312 (Comprehensive Cancer Wing, Wing B)",
        "consultation_fee": 1300,
        "languages": ["English", "Hindi", "Bengali"],
        "next_available": "Today · 03:30 PM",
        "specializations": ["Targeted Therapy", "Precision Immunotherapy", "Genomic Oncology"],
        "bio": "Dedicated medical oncologist championing biomarker-driven cancer therapy."
    },
    {
        "id": "doc-5",
        "name": "Dr. Ananya Sen",
        "department": "Pediatrics & Neonatology (NICU)",
        "qualification": "MBBS, MD (Pediatrics), Fellowship in Neonatology (Great Ormond St, UK)",
        "designation": "Director of Child Health & Neonatal Care",
        "experience_years": 16,
        "rating": 5.0,
        "review_count": 512,
        "opd_timings": "Daily (Mon – Sat) · 09:00 AM – 01:00 PM",
        "opd_room": "Room 108 (Pediatric Care Wing, Wing C)",
        "consultation_fee": 900,
        "languages": ["English", "Hindi", "Bengali", "Marathi"],
        "next_available": "Today · 10:45 AM",
        "specializations": ["Preterm Infant Care", "Pediatric Pulmonology", "Vaccination"],
        "bio": "Compassionate pediatrician leading our Level-3 NICU."
    }
]

BED_CAPACITIES = [
    {"category": "General Medical & Surgical Wards", "total": 180, "occupied": 142, "available": 38, "unit": "Beds", "status": "normal"},
    {"category": "Semi-Private Dual Sharing Rooms", "total": 90, "occupied": 74, "available": 16, "unit": "Beds", "status": "normal"},
    {"category": "Private Deluxe & Executive Suites", "total": 60, "occupied": 52, "available": 8, "unit": "Suites", "status": "busy"},
    {"category": "Intensive Care Unit (Medical/Surgical ICU)", "total": 40, "occupied": 34, "available": 6, "unit": "Ventilated Beds", "status": "busy"},
    {"category": "Coronary Care Unit (CCU / Cardiac ICU)", "total": 24, "occupied": 19, "available": 5, "unit": "Cardiac Beds", "status": "normal"},
    {"category": "Neonatal ICU (NICU Level-III)", "total": 28, "occupied": 22, "available": 6, "unit": "Incubators", "status": "normal"},
    {"category": "Pediatric ICU (PICU)", "total": 16, "occupied": 12, "available": 4, "unit": "Pedia Beds", "status": "normal"},
    {"category": "Emergency Triage & Trauma Bays", "total": 22, "occupied": 14, "available": 8, "unit": "Emergency Bays", "status": "normal"}
]

BLOOD_INVENTORY = [
    {"group": "O Positive (O+)", "units": 48, "status": "Adequate"},
    {"group": "O Negative (O-)", "units": 14, "status": "Moderate"},
    {"group": "A Positive (A+)", "units": 36, "status": "Adequate"},
    {"group": "A Negative (A-)", "units": 9, "status": "Moderate"},
    {"group": "B Positive (B+)", "units": 42, "status": "Adequate"},
    {"group": "B Negative (B-)", "units": 11, "status": "Moderate"},
    {"group": "AB Positive (AB+)", "units": 28, "status": "Adequate"},
    {"group": "AB Negative (AB-)", "units": 4, "status": "Critical"}
]

APPOINTMENTS_STORE = []

SAMPLE_LAB_REPORTS = {
    "UHID-88204": {
        "uhid": "UHID-88204",
        "patient_name": "Rajesh Sharma",
        "age": 52,
        "gender": "Male",
        "test_name": "Comprehensive Lipid & Cardiac Risk Profile",
        "department": "Department of Biochemistry & Cardiology",
        "collection_date": "2026-09-23 07:45 AM",
        "reported_date": "2026-09-23 01:30 PM",
        "consultant": "Dr. Vikramaditya Roy, MD, DM",
        "status": "Verified & Signed",
        "clinical_notes": "Borderline elevated LDL cholesterol. Triglycerides within acceptable range. Low cardiovascular inflammatory marker (hs-CRP < 1.0 mg/L).",
        "parameters": [
            {"name": "Total Cholesterol", "value": "218", "unit": "mg/dL", "reference_range": "< 200 Desirable", "flag": "High"},
            {"name": "HDL Cholesterol (Good)", "value": "46", "unit": "mg/dL", "reference_range": "> 40 mg/dL", "flag": "Normal"},
            {"name": "LDL Cholesterol (Calculated)", "value": "138", "unit": "mg/dL", "reference_range": "< 100 Optimal", "flag": "High"},
            {"name": "Triglycerides", "value": "168", "unit": "mg/dL", "reference_range": "< 150 mg/dL", "flag": "High"},
            {"name": "High Sensitivity CRP (hs-CRP)", "value": "0.85", "unit": "mg/L", "reference_range": "< 1.0 Low Risk", "flag": "Normal"}
        ]
    },
    "UHID-99412": {
        "uhid": "UHID-99412",
        "patient_name": "Emily Davis",
        "age": 34,
        "gender": "Female",
        "test_name": "3.0 Tesla MRI Brain & Neuro-Vascular Study",
        "department": "Advanced Diagnostics & Radiology",
        "collection_date": "2026-09-22 10:15 AM",
        "reported_date": "2026-09-22 03:00 PM",
        "consultant": "Dr. Priyanka Deshmukh, MD, FICR",
        "status": "Verified & Signed",
        "clinical_notes": "Normal MRI study of the brain. Cerebral hemispheres show normal grey-white matter differentiation. No acute infarction or hemorrhage.",
        "parameters": [
            {"name": "Cerebral Parenchyma", "value": "Normal Morphology", "unit": "Visual", "reference_range": "Normal", "flag": "Normal"},
            {"name": "Ventricular Size & Contour", "value": "Symmetrical / Normal", "unit": "Index", "reference_range": "Symmetrical", "flag": "Normal"},
            {"name": "Diffusion Restriction (DWI)", "value": "Absent", "unit": "Signal", "reference_range": "Negative for Acute Ischemia", "flag": "Normal"}
        ]
    }
}

# ==========================================
# RESTful API Endpoints (Python Flask)
# ==========================================

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        "status": "healthy",
        "service": "RH Hospital Python Flask Backend",
        "timestamp": datetime.datetime.utcnow().isoformat(),
        "version": "1.0.0"
    }), 200

@app.route('/api/departments', methods=['GET'])
def get_departments():
    """Returns all hospital Centers of Excellence"""
    return jsonify({
        "success": True,
        "count": len(DEPARTMENTS),
        "data": DEPARTMENTS
    }), 200

@app.route('/api/doctors', methods=['GET'])
def get_doctors():
    """Filter doctors by department or query parameter"""
    department = request.args.get('department')
    search = request.args.get('q')

    filtered = DOCTORS
    if department and department.upper() != 'ALL':
        filtered = [d for d in filtered if department.lower() in d['department'].lower()]
    if search:
        s = search.lower()
        filtered = [
            d for d in filtered 
            if s in d['name'].lower() 
            or s in d['department'].lower() 
            or any(s in spec.lower() for spec in d['specializations'])
        ]

    return jsonify({
        "success": True,
        "count": len(filtered),
        "data": filtered
    }), 200

@app.route('/api/doctors/<doc_id>', methods=['GET'])
def get_doctor_by_id(doc_id):
    """Retrieve details of a single physician"""
    doc = next((d for d in DOCTORS if d['id'] == doc_id), None)
    if not doc:
        return jsonify({"success": False, "error": "Doctor not found"}), 404
    return jsonify({"success": True, "data": doc}), 200

@app.route('/api/beds', methods=['GET'])
def get_bed_telemetry():
    """Real-time hospital bed status"""
    total = sum(b['total'] for b in BED_CAPACITIES)
    occupied = sum(b['occupied'] for b in BED_CAPACITIES)
    available = sum(b['available'] for b in BED_CAPACITIES)
    return jsonify({
        "success": True,
        "summary": {
            "total_beds": total,
            "occupied_beds": occupied,
            "available_beds": available,
            "occupancy_percentage": round((occupied / total) * 100, 1)
        },
        "data": BED_CAPACITIES
    }), 200

@app.route('/api/blood-bank', methods=['GET'])
def get_blood_inventory():
    """Central Blood Bank inventory stock"""
    total_units = sum(b['units'] for b in BLOOD_INVENTORY)
    return jsonify({
        "success": True,
        "total_units": total_units,
        "data": BLOOD_INVENTORY
    }), 200

@app.route('/api/appointments', methods=['POST'])
def book_appointment():
    """Create a new doctor appointment and generate confirmation token"""
    payload = request.get_json() or {}

    patient_name = payload.get('patient_name')
    phone = payload.get('patient_phone')
    doctor_id = payload.get('doctor_id')
    appointment_date = payload.get('date', datetime.date.today().isoformat())
    time_slot = payload.get('slot', '10:00 AM')

    if not patient_name or not phone:
        return jsonify({
            "success": False, 
            "error": "patient_name and patient_phone are required fields."
        }), 400

    doctor = next((d for d in DOCTORS if d['id'] == doctor_id), DOCTORS[0])
    token = f"RH-APT-{datetime.date.today().year}-{random.randint(1000, 9999)}"

    appointment_record = {
        "token": token,
        "patient_name": patient_name,
        "patient_age": payload.get('patient_age', 'N/A'),
        "patient_gender": payload.get('patient_gender', 'Not Specified'),
        "patient_phone": phone,
        "patient_email": payload.get('patient_email', ''),
        "doctor_name": doctor['name'],
        "doctor_department": doctor['department'],
        "opd_room": doctor['opd_room'],
        "consultation_fee": doctor['consultation_fee'],
        "appointment_date": appointment_date,
        "time_slot": time_slot,
        "appointment_type": payload.get('appointment_type', 'In-Person OPD'),
        "symptoms": payload.get('symptoms', ''),
        "created_at": datetime.datetime.utcnow().isoformat(),
        "status": "Confirmed"
    }

    APPOINTMENTS_STORE.append(appointment_record)

    return jsonify({
        "success": True,
        "message": "Appointment confirmed successfully",
        "data": appointment_record
    }), 201

@app.route('/api/appointments/<token>', methods=['GET'])
def get_appointment(token):
    """Lookup appointment by token"""
    apt = next((a for a in APPOINTMENTS_STORE if a['token'] == token), None)
    if not apt:
        return jsonify({"success": False, "error": "Appointment token not found"}), 404
    return jsonify({"success": True, "data": apt}), 200

@app.route('/api/emergency/dispatch', methods=['POST'])
def dispatch_ambulance():
    """Dispatch emergency ACLS ambulance with live telemetry"""
    payload = request.get_json() or {}
    pickup_address = payload.get('address')
    caller_phone = payload.get('phone')

    if not pickup_address or not caller_phone:
        return jsonify({
            "success": False,
            "error": "Address and phone are required for emergency dispatch."
        }), 400

    ambulance_unit = f"RH-ACLS-{random.randint(101, 199)}"
    dispatch_record = {
        "dispatch_id": f"DISPATCH-{random.randint(10000, 99999)}",
        "ambulance_unit": ambulance_unit,
        "eta_minutes": 11,
        "pickup_address": pickup_address,
        "caller_phone": caller_phone,
        "emergency_condition": payload.get('condition', 'General Emergency'),
        "paramedic_lead": "Dr. Samuel Roy (Emergency Physician)",
        "driver_direct": "+1 (800) 106-602",
        "status": "En Route with Sirens Active",
        "dispatched_at": datetime.datetime.utcnow().isoformat()
    }

    return jsonify({
        "success": True,
        "message": "Emergency ACLS unit dispatched immediately",
        "data": dispatch_record
    }), 200

@app.route('/api/reports/<uhid>', methods=['GET'])
def get_lab_report(uhid):
    """Retrieve patient diagnostic lab report by UHID"""
    clean_uhid = uhid.strip().upper()
    report = SAMPLE_LAB_REPORTS.get(clean_uhid)
    if not report:
        return jsonify({
            "success": False,
            "error": f"No diagnostic records found for UHID '{clean_uhid}'"
        }), 404

    return jsonify({
        "success": True,
        "data": report
    }), 200

# ==========================================
# Main Execution Entry Point
# ==========================================
if __name__ == '__main__':
    # Runs the Flask server on port 5000 in development mode
    print("Starting RH Hospital Python Flask Backend on http://0.0.0.0:5000")
    app.run(host='0.0.0.0', port=5000, debug=True)
