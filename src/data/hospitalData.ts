export interface Doctor {
  id: string;
  name: string;
  department: string;
  qualification: string;
  designation: string;
  experienceYears: number;
  rating: number;
  reviewCount: number;
  opdTimings: string;
  opdRoom: string;
  consultationFee: number;
  languages: string[];
  nextAvailable: string;
  specializations: string[];
  bio: string;
  avatarColor: string;
}

export interface Department {
  id: string;
  name: string;
  tagline: string;
  description: string;
  headOfDept: string;
  beds: number;
  icon: string;
  featuredProcedures: string[];
  equipment: string[];
  stat: string;
}

export interface BedCapacity {
  category: string;
  total: number;
  occupied: number;
  available: number;
  unit: string;
  status: 'normal' | 'busy' | 'critical';
}

export interface BloodStock {
  group: string;
  units: number;
  status: 'Adequate' | 'Moderate' | 'Critical';
}

export interface HealthPackage {
  id: string;
  name: string;
  subtitle: string;
  category: string;
  originalPrice: number;
  packagePrice: number;
  parametersCount: number;
  idealFor: string;
  fastingRequired: string;
  reportTurnaround: string;
  keyTests: string[];
}

export interface LabReport {
  uhid: string;
  patientName: string;
  age: number;
  gender: string;
  testName: string;
  department: string;
  collectionDate: string;
  reportedDate: string;
  consultant: string;
  status: 'Verified & Signed' | 'In Progress';
  parameters: {
    name: string;
    value: string;
    unit: string;
    referenceRange: string;
    flag: 'Normal' | 'High' | 'Low';
  }[];
  clinicalNotes: string;
}

export const DEPARTMENTS: Department[] = [
  {
    id: 'cardiology',
    name: 'Cardiology & Cardiac Surgery',
    tagline: 'Comprehensive Heart & Vascular Institute',
    description: 'Round-the-clock primary angioplasty, complex valve repairs, pediatric cardiology, and minimally invasive robotic coronary artery bypass procedures.',
    headOfDept: 'Dr. Vikramaditya Roy, MD, DM, FACC',
    beds: 64,
    icon: 'HeartPulse',
    featuredProcedures: [
      'Coronary Angiography & Stenting (Cath Lab)',
      'Minimally Invasive CABG (Bypass Surgery)',
      'TAVI (Transcatheter Aortic Valve Implantation)',
      'Electrophysiology & Pacemaker Implantation',
      'Advanced Heart Failure & ECMO Support'
    ],
    equipment: ['Philips Azurion 7 Biplane Cath Lab', '3D Echocardiography', 'Rotablator System'],
    stat: '99.4% Angioplasty Success Rate'
  },
  {
    id: 'neurology',
    name: 'Neurology & Neurosurgery',
    tagline: 'Brain, Spine & Neuro-Vascular Excellence',
    description: 'Level-1 Comprehensive Stroke Center equipped with rapid thrombolysis, mechanical thrombectomy, stereotactic neuro-navigation, and microscopic spine surgery.',
    headOfDept: 'Dr. Marcus Sterling, MS, MCh (Neurosurgery), IFAANS',
    beds: 48,
    icon: 'Brain',
    featuredProcedures: [
      'Code Stroke 24/7 Rapid Mechanical Thrombectomy',
      'Awake Craniotomy for Brain Tumors',
      'Endoscopic Skull Base Surgery',
      'Minimally Invasive Spine Micro-Discectomy',
      'Deep Brain Stimulation (DBS) for Parkinson’s'
    ],
    equipment: ['Zeiss KINEVO 900 Robotic Microscope', 'Medtronic StealthStation S8', '32-Channel Intraoperative EEG'],
    stat: '< 28 Min Stroke Door-to-Needle Time'
  },
  {
    id: 'orthopedics',
    name: 'Orthopedics & Joint Reconstruction',
    tagline: 'Precision Robotics & Sports Medicine',
    description: 'Specialized center for autonomous robotic-assisted knee and hip replacements, complex trauma reconstructions, arthroscopic sports surgeries, and spinal corrections.',
    headOfDept: 'Dr. Raghavendra Hegde, MS (Ortho), MCh, FRCS',
    beds: 52,
    icon: 'Activity',
    featuredProcedures: [
      'Mako Robotic-Arm Assisted Total Knee Replacement',
      'Direct Anterior Total Hip Arthroplasty',
      'Arthroscopic ACL/PCL Ligament Reconstruction',
      'Spinal Deformity & Scoliosis Correction',
      'Day-Care Arthroscopic Shoulder Rotator Cuff Repair'
    ],
    equipment: ['Stryker Mako Robotic System', 'Smith & Nephew 4K Arthroscopy Tower', 'Mobile C-Arm Fluoroscopy'],
    stat: '4,200+ Robotic Joint Replacements Done'
  },
  {
    id: 'oncology',
    name: 'Medical & Surgical Oncology',
    tagline: 'Integrated Multidisciplinary Cancer Center',
    description: 'Tumor Board guided personalized cancer therapeutics, hyperthermic intraperitoneal chemotherapy (HIPEC), targeted immunotherapy, and organ-preserving oncological surgery.',
    headOfDept: 'Dr. Sumita Bannerjee, MD, DNB (Oncology), ESMO Fellow',
    beds: 58,
    icon: 'ShieldAlert',
    featuredProcedures: [
      'Multidisciplinary Tumor Board Consultation',
      'Robotic Radical Prostatectomy & Gynecologic Oncology',
      'Precision Immunotherapy & Targeted Biologicals',
      'Day-Care Chemotherapy & Infusion Lounge',
      'Breast Oncoplasty & Sentinel Lymph Node Biopsy'
    ],
    equipment: ['Elekta Versa HD Linear Accelerator', 'Automated Closed-System Chemo Compounding', 'PET-CT Fusion Planning'],
    stat: 'Zero Treatment Interruption Protocol'
  },
  {
    id: 'pediatrics',
    name: 'Pediatrics & Neonatology (NICU)',
    tagline: 'Advanced Child & Infant Intensive Care',
    description: 'Level-III tertiary Neonatal Intensive Care Unit with dedicated transport incubators, pediatric intensive care (PICU), and developmental pediatric clinics.',
    headOfDept: 'Dr. Ananya Sen, MD (Pediatrics), Fellowship in Neonatology (UK)',
    beds: 42,
    icon: 'Baby',
    featuredProcedures: [
      'Tertiary Level-III Neonatal Intensive Care (NICU)',
      'High-Frequency Oscillatory Ventilation & Nitric Oxide Therapy',
      'Pediatric Emergency Care & Resuscitation',
      'Comprehensive Pediatric Vaccination & Growth Monitoring',
      'Pediatric Cardiology & Congenital Heart Screening'
    ],
    equipment: ['GE Giraffe OmniBed Carestations', 'Dräger Babylog VN500 Ventilators', 'Nitric Oxide Delivery Units'],
    stat: '98.8% Survival Rate for Extreme Preterms'
  },
  {
    id: 'gastroenterology',
    name: 'Gastroenterology & Hepatobiliary Sciences',
    tagline: 'Digestive, Liver & Biliary Tract Care',
    description: 'Comprehensive digestive disease center delivering high-definition therapeutic endoscopy, ERCP, endoscopic ultrasound (EUS), and liver disease management.',
    headOfDept: 'Dr. Tariq Al-Mansoor, MD, DM (Gastro), FACG',
    beds: 36,
    icon: 'Stethoscope',
    featuredProcedures: [
      'Diagnostic & Therapeutic Upper GI Endoscopy',
      'Colonoscopy & Polypectomy Screening',
      'ERCP for Bile Duct Stones & Strictures',
      'Endoscopic Ultrasound (EUS) & Fine Needle Biopsy',
      'FibroScan Liver Stiffness Assessment'
    ],
    equipment: ['Olympus EVIS X1 Endoscopy System', 'EUS Radial & Linear Scopes', 'EchoSens FibroScan 530 Compact'],
    stat: 'Over 8,500 Endoscopic Procedures / Year'
  },
  {
    id: 'nephrology',
    name: 'Nephrology & Renal Transplant Center',
    tagline: 'Kidney Health, Dialysis & Transplantation',
    description: 'State-of-the-art dialysis suite running 24/7 online hemodiafiltration (HDF), automated peritoneal dialysis training, and live-donor kidney transplants.',
    headOfDept: 'Dr. Harish K. Varma, MD, DM (Nephro), FRCP',
    beds: 40,
    icon: 'Droplets',
    featuredProcedures: [
      '24/7 Online Hemodiafiltration (HDF) Dialysis Unit',
      'Living Donor Kidney Transplantation Services',
      'Vascular Access Creation (AV Fistula Surgery)',
      'Continuous Renal Replacement Therapy (CRRT in ICU)',
      'Pediatric Nephrology & Glomerular Clinic'
    ],
    equipment: ['Fresenius 5008S CorDiax Dialysis Machines', 'Prismaflex CRRT Systems', 'Ultrapure Water RO Plant'],
    stat: '42 Dialysis Stations with Dedicated Isolation'
  },
  {
    id: 'radiology',
    name: 'Advanced Diagnostics & Imaging',
    tagline: 'Sub-millimeter Precision Diagnostic Radiology',
    description: 'Fully digital diagnostic imaging wing with ultra-fast multi-slice CT, high-tesla MRI, digital mammography, and interventional ultrasound.',
    headOfDept: 'Dr. Priyanka Deshmukh, MD (Radiology), FICR',
    beds: 20,
    icon: 'Scan',
    featuredProcedures: [
      '3.0 Tesla Silent Wide-Bore MRI Neuro & Musculoskeletal',
      '256-Slice Dual-Source Ultra Low-Dose Cardiac CT',
      'Digital 3D Breast Tomosynthesis (Mammography)',
      'Color Doppler Vascular Ultrasound & Elastography',
      'CT & Ultrasound-Guided Biopsies & Drainage'
    ],
    equipment: ['Siemens Magnetom Vida 3T MRI', 'GE Revolution Apex 256-Slice CT', 'Hologic 3D Dimensions Mammography'],
    stat: '< 90 Mins Standard Report TAT'
  }
];

export const DOCTORS: Doctor[] = [
  {
    id: 'doc-1',
    name: 'Dr. Vikramaditya Roy',
    department: 'Cardiology & Cardiac Surgery',
    qualification: 'MBBS, MD (Medicine), DM (Cardiology), FACC (USA)',
    designation: 'Director & Chief Interventional Cardiologist',
    experienceYears: 24,
    rating: 4.9,
    reviewCount: 382,
    opdTimings: 'Mon, Wed, Fri · 09:30 AM – 02:00 PM',
    opdRoom: 'Room 102 (Cardiology OPD, Wing A)',
    consultationFee: 1200,
    languages: ['English', 'Hindi', 'Bengali'],
    nextAvailable: 'Today · 11:30 AM',
    specializations: ['Complex Angioplasty', 'Transcatheter Valve Repair (TAVI)', 'Bifurcation Stenting', 'Heart Failure Management'],
    bio: 'Pioneering cardiologist with over 18,000 successful interventions. Trained at Johns Hopkins, specializing in high-risk coronary interventions and minimally invasive structural heart therapies.',
    avatarColor: 'bg-blue-600'
  },
  {
    id: 'doc-2',
    name: 'Dr. Marcus Sterling',
    department: 'Neurology & Neurosurgery',
    qualification: 'MD, MS, MCh (Neurosurgery), Fellowship in Cerebrovascular (Zurich)',
    designation: 'Senior Consultant Neurosurgeon & Stroke Lead',
    experienceYears: 20,
    rating: 4.9,
    reviewCount: 294,
    opdTimings: 'Tue, Thu, Sat · 10:00 AM – 03:00 PM',
    opdRoom: 'Room 205 (Neuroscience Suite, Wing A)',
    consultationFee: 1400,
    languages: ['English', 'German', 'Hindi'],
    nextAvailable: 'Tomorrow · 10:15 AM',
    specializations: ['Micro-Neurosurgery', 'Endovascular Stroke Thrombectomy', 'Spine Endoscopy', 'Aneurysm Clipping'],
    bio: 'Renowned neurosurgeon focusing on acute ischemic stroke interventions, robotic brain tumor resections, and complex spinal reconstruction with zero nerve deficit protocols.',
    avatarColor: 'bg-indigo-600'
  },
  {
    id: 'doc-3',
    name: 'Dr. Raghavendra Hegde',
    department: 'Orthopedics & Joint Reconstruction',
    qualification: 'MBBS, MS (Ortho), MCh, FRCS (Tr & Orth, UK)',
    designation: 'Head of Robotic Joint Reconstruction & Orthopedics',
    experienceYears: 22,
    rating: 4.8,
    reviewCount: 440,
    opdTimings: 'Mon, Tue, Thu · 09:00 AM – 01:30 PM',
    opdRoom: 'Room 114 (Orthopedics OPD, Wing A)',
    consultationFee: 1100,
    languages: ['English', 'Kannada', 'Hindi'],
    nextAvailable: 'Today · 02:00 PM',
    specializations: ['Robotic Total Knee Replacement', 'Direct Anterior Hip Arthroplasty', 'Sports Arthroscopy', 'Revision Joint Surgery'],
    bio: 'International faculty for robotic arthroplasty with thousands of joint replacements. Known for rapid recovery protocols allowing patients to walk within 4 hours post-surgery.',
    avatarColor: 'bg-emerald-600'
  },
  {
    id: 'doc-4',
    name: 'Dr. Sumita Bannerjee',
    department: 'Medical & Surgical Oncology',
    qualification: 'MD (Internal Medicine), DNB (Medical Oncology), ESMO Certified',
    designation: 'Senior Consultant Medical Oncologist & Immunotherapist',
    experienceYears: 18,
    rating: 4.9,
    reviewCount: 215,
    opdTimings: 'Mon to Fri · 11:00 AM – 04:00 PM',
    opdRoom: 'Room 312 (Comprehensive Cancer Wing, Wing B)',
    consultationFee: 1300,
    languages: ['English', 'Hindi', 'Bengali'],
    nextAvailable: 'Today · 03:30 PM',
    specializations: ['Targeted Therapy', 'Precision Immunotherapy', 'Breast & Lung Carcinomas', 'Genomic Oncology'],
    bio: 'Dedicated medical oncologist championing biomarker-driven cancer therapy and supportive palliative care with deep commitment to patient comfort and quality of life.',
    avatarColor: 'bg-rose-600'
  },
  {
    id: 'doc-5',
    name: 'Dr. Ananya Sen',
    department: 'Pediatrics & Neonatology (NICU)',
    qualification: 'MBBS, MD (Pediatrics), Fellowship in Neonatology (Great Ormond St, UK)',
    designation: 'Director of Child Health & Neonatal Care',
    experienceYears: 16,
    rating: 5.0,
    reviewCount: 512,
    opdTimings: 'Daily (Mon – Sat) · 09:00 AM – 01:00 PM',
    opdRoom: 'Room 108 (Pediatric Care Wing, Wing C)',
    consultationFee: 900,
    languages: ['English', 'Hindi', 'Bengali', 'Marathi'],
    nextAvailable: 'Today · 10:45 AM',
    specializations: ['Preterm Infant Care', 'Pediatric Pulmonology', 'Child Growth & Developmental Milestones', 'Vaccination'],
    bio: 'Compassionate pediatrician and neonatologist leading our Level-3 NICU. Trusted by thousands of families for holistic child development, allergy care, and critical pediatric resuscitation.',
    avatarColor: 'bg-amber-600'
  },
  {
    id: 'doc-6',
    name: 'Dr. Tariq Al-Mansoor',
    department: 'Gastroenterology & Hepatobiliary Sciences',
    qualification: 'MBBS, MD, DM (Gastroenterology), FACG',
    designation: 'Chief Consultant Gastroenterologist & Hepatologist',
    experienceYears: 19,
    rating: 4.8,
    reviewCount: 310,
    opdTimings: 'Mon, Wed, Sat · 10:30 AM – 03:30 PM',
    opdRoom: 'Room 215 (Digestive Health Center, Wing A)',
    consultationFee: 1150,
    languages: ['English', 'Arabic', 'Hindi', 'Urdu'],
    nextAvailable: 'Tomorrow · 11:00 AM',
    specializations: ['Therapeutic Endoscopy & ERCP', 'Fatty Liver & Cirrhosis Care', 'IBD & Crohn’s Disease', 'GI Bleed Interventions'],
    bio: 'Expert gastroenterologist with advanced procedural training in ERCP and EUS. Focused on non-invasive diagnosis and comprehensive liver health management.',
    avatarColor: 'bg-teal-600'
  },
  {
    id: 'doc-7',
    name: 'Dr. Harish K. Varma',
    department: 'Nephrology & Renal Transplant Center',
    qualification: 'MBBS, MD (Gen Med), DM (Nephrology), FRCP (Edin)',
    designation: 'Chief Nephrologist & Transplant Physician',
    experienceYears: 23,
    rating: 4.9,
    reviewCount: 260,
    opdTimings: 'Tue, Thu, Fri · 09:30 AM – 02:30 PM',
    opdRoom: 'Room 220 (Renal Care Suite, Wing B)',
    consultationFee: 1200,
    languages: ['English', 'Hindi', 'Tamil', 'Telugu'],
    nextAvailable: 'Today · 01:15 PM',
    specializations: ['Renal Transplantation', 'Critical Care Nephrology & CRRT', 'Diabetic Kidney Disease', 'Automated Peritoneal Dialysis'],
    bio: 'Spearheaded over 650 successful kidney transplant programs. Passionate about early intervention in chronic kidney diseases and home dialysis integration.',
    avatarColor: 'bg-cyan-700'
  },
  {
    id: 'doc-8',
    name: 'Dr. Priyanka Deshmukh',
    department: 'Advanced Diagnostics & Imaging',
    qualification: 'MBBS, MD (Radio-Diagnosis), Fellowship in Neuro-Radiology (FICR)',
    designation: 'Head of Clinical Imaging & Diagnostic Radiology',
    experienceYears: 17,
    rating: 4.9,
    reviewCount: 190,
    opdTimings: 'Mon to Sat · 08:30 AM – 04:30 PM',
    opdRoom: 'Room 004 (Diagnostic Imaging Wing, Ground Floor)',
    consultationFee: 1000,
    languages: ['English', 'Marathi', 'Hindi'],
    nextAvailable: 'Today · 11:00 AM',
    specializations: ['3T MRI Neuro & Spine Imaging', 'Cardiac CT Angiography', '3D Mammography', 'Image-Guided Interventions'],
    bio: 'Expert radiologist committed to rapid turnaround, crystal-clear submillimeter imaging diagnostics, and seamless collaboration with operating surgeons.',
    avatarColor: 'bg-purple-600'
  },
  {
    id: 'doc-9',
    name: 'Dr. Rajeshwari Nair',
    department: 'Cardiology & Cardiac Surgery',
    qualification: 'MBBS, MS, MCh (Cardiothoracic & Vascular Surgery), FIACS',
    designation: 'Senior Consultant Cardiothoracic & Minimally Invasive Surgeon',
    experienceYears: 19,
    rating: 4.9,
    reviewCount: 278,
    opdTimings: 'Mon, Wed, Thu · 10:00 AM – 02:00 PM',
    opdRoom: 'Room 105 (Cardiothoracic Clinic, Wing A)',
    consultationFee: 1300,
    languages: ['English', 'Malayalam', 'Hindi'],
    nextAvailable: 'Tomorrow · 10:30 AM',
    specializations: ['Minimally Invasive Valve Replacement', 'Off-Pump Beating Heart Bypass', 'Thoracic Aortic Aneurysm Repair', 'Vascular Reconstruction'],
    bio: 'Renowned cardiothoracic surgeon with expertise in sternum-sparing keyhole cardiac surgeries, enabling rapid return to active physical life.',
    avatarColor: 'bg-blue-700'
  },
  {
    id: 'doc-10',
    name: 'Dr. Amitav Chunder',
    department: 'Orthopedics & Joint Reconstruction',
    qualification: 'MBBS, MS (Orthopedics), Fellowship in Spine Surgery (Singapore)',
    designation: 'Senior Consultant Spine & Scoliosis Surgeon',
    experienceYears: 15,
    rating: 4.8,
    reviewCount: 220,
    opdTimings: 'Tue, Fri, Sat · 11:00 AM – 03:00 PM',
    opdRoom: 'Room 118 (Spine Clinic, Wing A)',
    consultationFee: 1100,
    languages: ['English', 'Hindi', 'Bengali'],
    nextAvailable: 'Today · 02:45 PM',
    specializations: ['Endoscopic Micro-Discectomy', 'Scoliosis & Kyphosis Correction', 'Cervical Disc Replacement', 'Vertebroplasty'],
    bio: 'Dedicated spine surgeon specializing in motion-preserving cervical spine surgery and robotic instrumentation for scoliosis.',
    avatarColor: 'bg-emerald-700'
  },
  {
    id: 'doc-11',
    name: 'Dr. Kavita Mehra',
    department: 'Pediatrics & Neonatology (NICU)',
    qualification: 'MBBS, DCH, DNB (Pediatrics), Fellowship in Pediatric Critical Care',
    designation: 'In-charge Pediatric Intensive Care Unit (PICU)',
    experienceYears: 14,
    rating: 4.9,
    reviewCount: 345,
    opdTimings: 'Mon to Fri · 02:00 PM – 06:00 PM',
    opdRoom: 'Room 110 (Pediatric Care Wing, Wing C)',
    consultationFee: 900,
    languages: ['English', 'Hindi', 'Punjabi'],
    nextAvailable: 'Today · 03:00 PM',
    specializations: ['Pediatric Critical Resuscitation', 'Child Asthma & Respiratory Syncytial Care', 'Infectious Diseases', 'Pediatric Nutrition'],
    bio: 'Pediatric intensivist committed to zero hospital-acquired infections in children and providing warm, reassuring guidance to anxious parents.',
    avatarColor: 'bg-amber-700'
  },
  {
    id: 'doc-12',
    name: 'Dr. Farhan Siddiqui',
    department: 'Neurology & Neurosurgery',
    qualification: 'MBBS, MD (Medicine), DM (Neurology)',
    designation: 'Senior Consultant Neurologist & Epilepsy Specialist',
    experienceYears: 16,
    rating: 4.8,
    reviewCount: 189,
    opdTimings: 'Mon, Wed, Fri · 01:00 PM – 05:00 PM',
    opdRoom: 'Room 208 (Neuroscience Suite, Wing A)',
    consultationFee: 1100,
    languages: ['English', 'Hindi', 'Urdu'],
    nextAvailable: 'Tomorrow · 01:30 PM',
    specializations: ['Refractory Epilepsy & Video EEG', 'Parkinson’s Disease & Movement Disorders', 'Headache & Migraine Clinics', 'Multiple Sclerosis'],
    bio: 'Specialist in clinical neurophysiology, advanced management of seizure disorders, and modern pharmacological treatments for Parkinson’s.',
    avatarColor: 'bg-indigo-700'
  }
];

export const BED_CAPACITIES: BedCapacity[] = [
  { category: 'General Medical & Surgical Wards', total: 180, occupied: 142, available: 38, unit: 'Beds', status: 'normal' },
  { category: 'Semi-Private Dual Sharing Rooms', total: 90, occupied: 74, available: 16, unit: 'Beds', status: 'normal' },
  { category: 'Private Deluxe & Executive Suites', total: 60, occupied: 52, available: 8, unit: 'Suites', status: 'busy' },
  { category: 'Intensive Care Unit (Medical/Surgical ICU)', total: 40, occupied: 34, available: 6, unit: 'Ventilated Beds', status: 'busy' },
  { category: 'Coronary Care Unit (CCU / Cardiac ICU)', total: 24, occupied: 19, available: 5, unit: 'Cardiac Beds', status: 'normal' },
  { category: 'Neonatal ICU (NICU Level-III)', total: 28, occupied: 22, available: 6, unit: 'Incubators', status: 'normal' },
  { category: 'Pediatric ICU (PICU)', total: 16, occupied: 12, available: 4, unit: 'Pedia Beds', status: 'normal' },
  { category: 'Emergency Triage & Trauma Bays', total: 22, occupied: 14, available: 8, unit: 'Emergency Bays', status: 'normal' }
];

export const BLOOD_INVENTORY: BloodStock[] = [
  { group: 'O Positive (O+)', units: 48, status: 'Adequate' },
  { group: 'O Negative (O-)', units: 14, status: 'Moderate' },
  { group: 'A Positive (A+)', units: 36, status: 'Adequate' },
  { group: 'A Negative (A-)', units: 9, status: 'Moderate' },
  { group: 'B Positive (B+)', units: 42, status: 'Adequate' },
  { group: 'B Negative (B-)', units: 11, status: 'Moderate' },
  { group: 'AB Positive (AB+)', units: 28, status: 'Adequate' },
  { group: 'AB Negative (AB-)', units: 4, status: 'Critical' }
];

export const HEALTH_PACKAGES: HealthPackage[] = [
  {
    id: 'pkg-exec',
    name: 'RH Executive Comprehensive Health Check',
    subtitle: 'Full-spectrum preventive health evaluation for working professionals and adults',
    category: 'Adult Preventive Care',
    originalPrice: 7500,
    packagePrice: 3999,
    parametersCount: 68,
    idealFor: 'Adults aged 25–55 seeking an in-depth annual diagnostic baseline',
    fastingRequired: '10–12 Hours Overnight Fasting Required',
    reportTurnaround: 'Same Day by 06:00 PM',
    keyTests: [
      'Complete Blood Count (CBC) with ESR (24 parameters)',
      'Comprehensive Lipid Profile (Cholesterol, HDL, LDL, Triglycerides, VLDL)',
      'Liver Function Test (SGOT, SGPT, Bilirubin, Protein, Albumin)',
      'Kidney Function Test (Urea, Creatinine, Uric Acid, eGFR)',
      'Fasting Blood Glucose & HbA1c (3-Month Sugar Average)',
      'Thyroid Profile (TSH, Free T3, Free T4)',
      '12-Lead Resting Digital Electrocardiogram (ECG)',
      'Digital Chest X-Ray (PA View)',
      'Ultrasound Whole Abdomen & Pelvis Screening',
      'Physician Physical Consultation & Diet Counseling'
    ]
  },
  {
    id: 'pkg-cardiac',
    name: 'RH Advanced Cardiac Wellness Screening',
    subtitle: 'Targeted cardiovascular health evaluation designed to identify silent heart disease risks',
    category: 'Cardiology Care',
    originalPrice: 9200,
    packagePrice: 4850,
    parametersCount: 38,
    idealFor: 'Individuals with family history of heart disease, hypertension, or high stress',
    fastingRequired: '10 Hours Fasting',
    reportTurnaround: 'Same Day (with Cardiologist Review)',
    keyTests: [
      '2D Color Doppler Echocardiography (Echo)',
      'Treadmill Stress Test (TMT / Exercise Stress Test)',
      'High-Sensitivity C-Reactive Protein (hs-CRP)',
      'Apolipoprotein A1 & B Screening',
      'Serum Homocysteine Cardiac Biomarker',
      'Advanced Lipid Profile & Cardiac Risk Ratios',
      'Serum Electrolytes (Sodium, Potassium, Chloride)',
      'Post-Prandial Blood Sugar & Fasting Sugar',
      'Senior Interventional Cardiologist Review & ECG Mapping'
    ]
  },
  {
    id: 'pkg-women',
    name: 'RH Women’s Platinum Health & Wellness',
    subtitle: 'Comprehensive multi-phase wellness check tailored to women’s physiological health',
    category: 'Women’s Health',
    originalPrice: 8400,
    packagePrice: 4200,
    parametersCount: 52,
    idealFor: 'Women of all age groups, pre/post-menopausal health maintenance',
    fastingRequired: '10–12 Hours Overnight Fasting',
    reportTurnaround: '24 Hours',
    keyTests: [
      'Digital Mammography Screening / Breast Ultrasound',
      'Liquid-Based Pap Smear Cervical Screening',
      'Vitamin D3 (25-Hydroxy) & Vitamin B12 Levels',
      'Serum Ferritin, Iron & Total Iron Binding Capacity',
      'Complete Thyroid Panel (Free T3, Free T4, Ultra TSH)',
      'Ultrasound Pelvis (Transabdominal/TVS screening)',
      'Bone Mineral Density (DEXA Scan Single Site)',
      'HbA1c & Fasting Glucose',
      'Full Blood Count & Kidney/Liver Panels',
      'Consultation with Senior Consultant Gynecologist'
    ]
  },
  {
    id: 'pkg-senior',
    name: 'RH Senior Citizen Golden Vitality Check',
    subtitle: 'Age-appropriate screening focusing on joint mobility, cardiac health, organ function and bone density',
    category: 'Geriatric Health',
    originalPrice: 8900,
    packagePrice: 4450,
    parametersCount: 60,
    idealFor: 'Men and women aged 55+ for proactive age-related health management',
    fastingRequired: '10 Hours Fasting',
    reportTurnaround: 'Same Day (Wheelchair Assistance Included)',
    keyTests: [
      'Prostate Specific Antigen (PSA) for Men / Pap Smear for Women',
      'Dual Energy X-ray Absorptiometry (DEXA Spine & Hip Bone Scan)',
      'Resting ECG & 2D Echo Screening',
      'Complete Metabolic Panel (Kidney, Liver, Electrolytes)',
      'HbA1c & Fasting Blood Sugar',
      'Urine Microalbumin & Creatinine Ratio',
      'Complete Ophthalmic Retinal Screening & Glaucoma Check',
      'Audiometry Hearing Baseline Evaluation',
      'Comprehensive Geriatric Medicine Review & Fall Risk Assessment'
    ]
  }
];

export const SAMPLE_LAB_REPORTS: Record<string, LabReport> = {
  'UHID-88204': {
    uhid: 'UHID-88204',
    patientName: 'Rajesh Sharma',
    age: 52,
    gender: 'Male',
    testName: 'Comprehensive Lipid & Cardiac Risk Profile',
    department: 'Department of Biochemistry & Cardiology',
    collectionDate: '2026-09-23 07:45 AM',
    reportedDate: '2026-09-23 01:30 PM',
    consultant: 'Dr. Vikramaditya Roy, MD, DM',
    status: 'Verified & Signed',
    clinicalNotes: 'Borderline elevated LDL cholesterol. Triglycerides within acceptable range. Low cardiovascular inflammatory marker (hs-CRP < 1.0 mg/L). Recommend Mediterranean diet, 30 min daily brisk walk, and repeat testing in 12 weeks.',
    parameters: [
      { name: 'Total Cholesterol', value: '218', unit: 'mg/dL', referenceRange: '< 200 Desirable', flag: 'High' },
      { name: 'HDL Cholesterol (Good)', value: '46', unit: 'mg/dL', referenceRange: '> 40 mg/dL', flag: 'Normal' },
      { name: 'LDL Cholesterol (Calculated)', value: '138', unit: 'mg/dL', referenceRange: '< 100 Optimal', flag: 'High' },
      { name: 'Triglycerides', value: '168', unit: 'mg/dL', referenceRange: '< 150 mg/dL', flag: 'High' },
      { name: 'VLDL Cholesterol', value: '34', unit: 'mg/dL', referenceRange: '5 - 30 mg/dL', flag: 'High' },
      { name: 'Cholesterol / HDL Ratio', value: '4.7', unit: 'ratio', referenceRange: '< 4.5 Desirable', flag: 'Normal' },
      { name: 'High Sensitivity CRP (hs-CRP)', value: '0.85', unit: 'mg/L', referenceRange: '< 1.0 Low Risk', flag: 'Normal' },
      { name: 'Fasting Blood Glucose', value: '98', unit: 'mg/dL', referenceRange: '70 - 99 Normal', flag: 'Normal' },
      { name: 'HbA1c (Glycated Hemoglobin)', value: '5.6', unit: '%', referenceRange: '< 5.7 Normal', flag: 'Normal' }
    ]
  },
  'UHID-99412': {
    uhid: 'UHID-99412',
    patientName: 'Emily Davis',
    age: 34,
    gender: 'Female',
    testName: '3.0 Tesla MRI Brain & Neuro-Vascular Study',
    department: 'Advanced Diagnostics & Radiology',
    collectionDate: '2026-09-22 10:15 AM',
    reportedDate: '2026-09-22 03:00 PM',
    consultant: 'Dr. Priyanka Deshmukh, MD, FICR',
    status: 'Verified & Signed',
    clinicalNotes: 'Normal MRI study of the brain. Cerebral hemispheres show normal grey-white matter differentiation. No evidence of acute infarction, hemorrhage, mass effect, or abnormal leptomeningeal enhancement. Ventricular system and basal cisterns are unremarkable.',
    parameters: [
      { name: 'Cerebral Parenchyma', value: 'Normal Morphology', unit: 'Visual', referenceRange: 'Normal', flag: 'Normal' },
      { name: 'Ventricular Size & Contour', value: 'Symmetrical / Normal', unit: 'Index', referenceRange: 'Symmetrical', flag: 'Normal' },
      { name: 'Diffusion Restriction (DWI)', value: 'Absent', unit: 'Signal', referenceRange: 'Negative for Acute Ischemia', flag: 'Normal' },
      { name: 'Intracranial MRA Flow Voids', value: 'Patent Major Vessels', unit: 'Flow', referenceRange: 'Symmetric Bilateral Flow', flag: 'Normal' },
      { name: 'Paranasal Sinuses & Mastoids', value: 'Clear & Well Aerated', unit: 'Visual', referenceRange: 'Clear', flag: 'Normal' }
    ]
  },
  'UHID-77105': {
    uhid: 'UHID-77105',
    patientName: 'Vikram Malhotra',
    age: 48,
    gender: 'Male',
    testName: 'Complete Hemogram & Renal Function Test',
    department: 'Department of Clinical Pathology',
    collectionDate: '2026-09-24 08:00 AM',
    reportedDate: '2026-09-24 11:45 AM',
    consultant: 'Dr. Harish K. Varma, MD, DM',
    status: 'Verified & Signed',
    clinicalNotes: 'Hemoglobin and total leukocyte count within normal physiological boundaries. Renal parameters demonstrate optimal glomerular filtration (eGFR > 95 mL/min). Electrolyte balance is well preserved.',
    parameters: [
      { name: 'Hemoglobin (Hb)', value: '14.8', unit: 'g/dL', referenceRange: '13.0 - 17.0 g/dL', flag: 'Normal' },
      { name: 'Total Leukocyte Count (TLC)', value: '6,800', unit: '/cu.mm', referenceRange: '4,000 - 11,000', flag: 'Normal' },
      { name: 'Platelet Count', value: '240,000', unit: '/cu.mm', referenceRange: '150,000 - 450,000', flag: 'Normal' },
      { name: 'Serum Creatinine', value: '0.92', unit: 'mg/dL', referenceRange: '0.7 - 1.3 mg/dL', flag: 'Normal' },
      { name: 'Blood Urea Nitrogen (BUN)', value: '14.2', unit: 'mg/dL', referenceRange: '7.0 - 20.0 mg/dL', flag: 'Normal' },
      { name: 'Serum Uric Acid', value: '5.1', unit: 'mg/dL', referenceRange: '3.5 - 7.2 mg/dL', flag: 'Normal' },
      { name: 'Serum Potassium', value: '4.2', unit: 'mEq/L', referenceRange: '3.5 - 5.1 mEq/L', flag: 'Normal' },
      { name: 'Estimated GFR', value: '98', unit: 'mL/min/1.73m²', referenceRange: '> 90 Normal', flag: 'Normal' }
    ]
  }
};

export const PATIENT_STORIES = [
  {
    patientName: 'Devendra K. Patil',
    age: 61,
    condition: 'Acute STEMI (Heart Attack) & Emergency Primary Angioplasty',
    doctor: 'Dr. Vikramaditya Roy',
    outcome: 'Discharged active in 72 hours with normal left ventricular function',
    quote: 'When chest discomfort struck at 2 AM, the RH Rapid Ambulance arrived with an emergency doctor on board within 11 minutes. Before reaching the hospital, my ECG was already transmitted to the Cath Lab team. Dr. Roy opened the blocked artery with zero delay. The speed and calm expertise saved my life.',
    recoveryDays: '3 Days',
    year: 'August 2026'
  },
  {
    patientName: 'Margaret Reynolds',
    age: 68,
    condition: 'Bilateral Severe Knee Osteoarthritis',
    doctor: 'Dr. Raghavendra Hegde',
    outcome: 'Walking unassisted on Day 2; resumed daily morning walks at 3 weeks',
    quote: 'For 6 years, bone-on-bone knee pain had crippled my mobility. Dr. Hegde performed robotic knee replacement on both legs. The sub-millimeter precision of the robotic arm meant almost zero soft tissue trauma. I was up on my feet the very same evening. The nursing staff at RH Hospital treated me like family.',
    recoveryDays: '2 Weeks',
    year: 'July 2026'
  },
  {
    patientName: 'Sunita & Arvind Mehta',
    age: 'Infant Aarav (Born at 27 Weeks)',
    condition: 'Extreme Prematurity & Respiratory Distress',
    doctor: 'Dr. Ananya Sen',
    outcome: 'Graduated from Level-III NICU at 2.4 kg healthy weight',
    quote: 'Our son arrived unexpectedly at just 27 weeks, weighing barely 890 grams. The pediatric team led by Dr. Sen fought tirelessly for 54 days in the Level-3 NICU. Today Aarav is laughing, feeding actively, and thriving. We will forever revere RH Hospital for giving our child his life.',
    recoveryDays: '54 Days NICU',
    year: 'June 2026'
  }
];

export const CAMPUS_FLOORS = [
  {
    wing: 'Wing A — Clinical Sciences & OPD',
    floors: [
      { floor: 'Ground Floor', services: '24/7 Central Registration, Emergency & Trauma Resuscitation, Outpatient Pharmacy, Cashless Insurance Desk' },
      { floor: '1st Floor', services: 'Cardiology OPD, Orthopedics & Joint Clinic, Minor Procedure Rooms, ECG & Echo Labs' },
      { floor: '2nd Floor', services: 'Neurosciences Suite, Gastroenterology Clinics, Endoscopy & Colonoscopy Suites, Patient Lounge' }
    ]
  },
  {
    wing: 'Wing B — Critical Care & Surgical Suites',
    floors: [
      { floor: 'Ground Floor', services: 'Central Blood Bank & Transfusion Services, High-Tech Molecular & Histopathology Lab' },
      { floor: '1st Floor', services: 'Medical ICU, Surgical ICU, Nephrology & 24/7 Hemodialysis Suite' },
      { floor: '2nd Floor', services: 'Cardiac Cath Lab Suite, Coronary Care Unit (CCU), Cardiothoracic ICU' },
      { floor: '3rd Floor', services: 'Hybrid Robotic Modular Operation Theaters (OT 1 to OT 8), Post-Anesthesia Care Unit (PACU)' }
    ]
  },
  {
    wing: 'Wing C & D — Inpatient Suites & Mother/Child Center',
    floors: [
      { floor: 'Ground Floor', services: 'Pediatric OPD, Child Wellness & Vaccination Center, Pediatric Play Area' },
      { floor: '1st Floor', services: 'Labor & Delivery Suites, Level-III Neonatal Intensive Care Unit (NICU), Pediatric ICU (PICU)' },
      { floor: '2nd to 4th Floor', services: 'Deluxe Private Suites, Executive Inpatient Rooms, Semi-Private Sharing Wards' },
      { floor: '5th Floor', services: 'RH Executive Health Checkup Lounge, Dietetics & Preventive Wellness Center' }
    ]
  }
];

export const FAQS = [
  {
    q: 'How do I book an emergency ambulance and what is the response time?',
    a: 'You can immediately dial our 24/7 emergency hotline at 1066 or use the online "Rapid Dispatch" tool on this portal. Our GPS-integrated Advanced Cardiac Life Support (ACLS) ambulances have an average urban response time of 12 minutes, staffed with emergency paramedics and live ECG telemetry.'
  },
  {
    q: 'Which health insurance and TPA providers are supported for Cashless Hospitalization?',
    a: 'RH Hospital is empaneled with all major insurance companies and Third-Party Administrators (TPAs) including Star Health, HDFC ERGO, ICICI Lombard, Medi Assist, Paramount TPA, Care Health, Bajaj Allianz, and government health schemes. Our 24/7 Cashless TPA Helpdesk on the Ground Floor processes pre-authorizations within 60 minutes.'
  },
  {
    q: 'What are the visiting hours for inpatients and intensive care units?',
    a: 'General Inpatient Wards: 11:00 AM – 01:00 PM and 05:00 PM – 07:00 PM (Max 2 visitors per pass). Intensive Care Units (ICU / CCU / NICU): 04:30 PM – 05:30 PM (Only 1 designated immediate family member wearing sterile gown and mask to protect vulnerable patients).'
  },
  {
    q: 'Can I view or download my diagnostic and laboratory reports online?',
    a: 'Yes! Simply click on "Patient Portal" in the top bar or use the Diagnostic Lookup section below. Enter your UHID (e.g. UHID-88204) to instantly review laboratory values, normal reference ranges, doctor notes, and download printable verification summaries.'
  },
  {
    q: 'What should I bring on the day of my doctor consultation?',
    a: 'Please bring your appointment confirmation SMS/token number, valid government photo ID, previous medical records, past surgical summaries, current prescriptions, and recent diagnostic scan films or CD-ROMs.'
  }
];
