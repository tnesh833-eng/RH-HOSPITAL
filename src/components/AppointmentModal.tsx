import React, { useState } from 'react';
import { X, Calendar, Clock, User, Phone, CheckCircle2, ShieldCheck, MapPin, Printer } from 'lucide-react';
import { DOCTORS, Doctor, DEPARTMENTS } from '../data/hospitalData';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedDoctor?: Doctor | null;
  preselectedDepartment?: string;
  preselectedPackageName?: string;
}

export const AppointmentModal: React.FC<AppointmentModalProps> = ({
  isOpen,
  onClose,
  preselectedDoctor,
  preselectedDepartment,
  preselectedPackageName
}) => {
  if (!isOpen) return null;

  const [step, setStep] = useState<'form' | 'success'>('form');

  const [selectedDept, setSelectedDept] = useState<string>(
    preselectedDoctor?.department || preselectedDepartment || DEPARTMENTS[0].name
  );
  const [selectedDoctorId, setSelectedDoctorId] = useState<string>(
    preselectedDoctor?.id || (DOCTORS.find(d => d.department.includes(selectedDept))?.id || DOCTORS[0].id)
  );

  const [appointmentType, setAppointmentType] = useState<'In-Person OPD' | 'Video Teleconsultation'>('In-Person OPD');
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date(Date.now() + 86400000).toISOString().split('T')[0]
  );
  const [selectedSlot, setSelectedSlot] = useState<string>('10:30 AM');

  const [patientName, setPatientName] = useState('');
  const [patientAge, setPatientAge] = useState('');
  const [patientGender, setPatientGender] = useState('Male');
  const [patientPhone, setPatientPhone] = useState('');
  const [patientEmail, setPatientEmail] = useState('');
  const [symptoms, setSymptoms] = useState(preselectedPackageName ? `Booking Package: ${preselectedPackageName}` : '');
  const [uhid, setUhid] = useState('');

  // Confirmation state
  const [confirmationToken, setConfirmationToken] = useState('');

  const currentDoctor = DOCTORS.find(d => d.id === selectedDoctorId) || preselectedDoctor || DOCTORS[0];

  const timeSlots = [
    '09:30 AM', '10:00 AM', '10:30 AM', '11:15 AM', '12:00 PM',
    '02:30 PM', '03:15 PM', '04:00 PM', '04:45 PM', '05:30 PM'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName.trim() || !patientPhone.trim()) {
      alert('Please fill in patient name and phone number');
      return;
    }

    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const token = `RH-APT-${new Date().getFullYear()}-${randomNum}`;
    setConfirmationToken(token);
    setStep('success');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl overflow-hidden border border-slate-200">
        
        {/* Modal Header */}
        <div className="bg-slate-900 text-white p-5 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-blue-400">
              RH Hospital Patient Booking Portal
            </span>
            <h2 className="text-xl font-bold font-serif">
              {step === 'form' ? 'Schedule Doctor Consultation' : 'Appointment Confirmed'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {step === 'form' ? (
          <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
            
            {preselectedPackageName && (
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-xs text-blue-900 flex items-center justify-between">
                <span>Selected Health Package: <strong>{preselectedPackageName}</strong></span>
                <span className="font-bold text-blue-600">Preventive Care</span>
              </div>
            )}

            {/* Mode Selection */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Consultation Preference
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setAppointmentType('In-Person OPD')}
                  className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-all ${
                    appointmentType === 'In-Person OPD'
                      ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <MapPin className="w-4 h-4" />
                  <span>In-Person Hospital Visit</span>
                </button>
                <button
                  type="button"
                  onClick={() => setAppointmentType('Video Teleconsultation')}
                  className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-all ${
                    appointmentType === 'Video Teleconsultation'
                      ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <Calendar className="w-4 h-4" />
                  <span>Video Tele-Consultation</span>
                </button>
              </div>
            </div>

            {/* Department & Doctor Selection */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Medical Department
                </label>
                <select
                  value={selectedDept}
                  onChange={(e) => {
                    setSelectedDept(e.target.value);
                    const matching = DOCTORS.find(d => d.department.includes(e.target.value));
                    if (matching) setSelectedDoctorId(matching.id);
                  }}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs sm:text-sm text-slate-900 focus:ring-2 focus:ring-blue-500"
                >
                  {DEPARTMENTS.map((dept) => (
                    <option key={dept.id} value={dept.name}>{dept.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Consultant Physician / Surgeon
                </label>
                <select
                  value={selectedDoctorId}
                  onChange={(e) => setSelectedDoctorId(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs sm:text-sm text-slate-900 focus:ring-2 focus:ring-blue-500"
                >
                  {DOCTORS.map((doc) => (
                    <option key={doc.id} value={doc.id}>
                      {doc.name} ({doc.department.split('&')[0]})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Doctor mini info strip */}
            {currentDoctor && (
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-900">{currentDoctor.name}</div>
                  <div className="text-slate-500 text-[11px]">{currentDoctor.opdRoom} · {currentDoctor.opdTimings}</div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] text-slate-500">Consultation Fee</div>
                  <div className="font-bold text-blue-600 font-mono text-sm">₹{currentDoctor.consultationFee}</div>
                </div>
              </div>
            )}

            {/* Date and Time Slot Picker */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Appointment Date
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs sm:text-sm text-slate-900 focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Available Time Slot
                </label>
                <select
                  value={selectedSlot}
                  onChange={(e) => setSelectedSlot(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs sm:text-sm text-slate-900 focus:ring-2 focus:ring-blue-500"
                >
                  {timeSlots.map((slot) => (
                    <option key={slot} value={slot}>{slot}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Patient Personal Details */}
            <div className="pt-2 border-t border-slate-200">
              <span className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">
                Patient Information
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-slate-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    placeholder="e.g. Ramesh Chandra"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs sm:text-sm text-slate-900 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Age *</label>
                  <input
                    type="number"
                    required
                    value={patientAge}
                    onChange={(e) => setPatientAge(e.target.value)}
                    placeholder="e.g. 42"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs sm:text-sm text-slate-900 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Gender</label>
                  <select
                    value={patientGender}
                    onChange={(e) => setPatientGender(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs sm:text-sm text-slate-900 focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Mobile Phone *</label>
                  <input
                    type="tel"
                    required
                    value={patientPhone}
                    onChange={(e) => setPatientPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs sm:text-sm text-slate-900 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">UHID (Optional)</label>
                  <input
                    type="text"
                    value={uhid}
                    onChange={(e) => setUhid(e.target.value)}
                    placeholder="e.g. UHID-88204"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs sm:text-sm text-slate-900 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Primary Symptoms / Health Concern</label>
                <textarea
                  rows={2}
                  value={symptoms}
                  onChange={(e) => setSymptoms(e.target.value)}
                  placeholder="Describe your current discomfort, duration, or previous diagnosis..."
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs sm:text-sm text-slate-900 focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Submit Action */}
            <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
              <span className="text-xs text-slate-500 flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Instant SMS & WhatsApp confirmation</span>
              </span>

              <button
                type="submit"
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold rounded-xl shadow-md transition-colors cursor-pointer"
              >
                Confirm Appointment
              </button>
            </div>

          </form>
        ) : (
          /* Confirmation Success Voucher View */
          <div className="p-6 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
                Appointment Scheduled Successfully
              </span>
              <h3 className="text-2xl font-bold text-slate-900 font-serif mt-3">
                Token: <span className="font-mono text-blue-600">{confirmationToken}</span>
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                A confirmation SMS and reminder calendar invite have been dispatched to {patientPhone}.
              </p>
            </div>

            {/* Appointment Voucher Card */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 text-left text-xs space-y-3">
              <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                <span className="text-slate-500">Patient:</span>
                <span className="font-bold text-slate-900">{patientName} ({patientAge} Yrs, {patientGender})</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                <span className="text-slate-500">Consultant:</span>
                <span className="font-bold text-slate-900">{currentDoctor.name}</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                <span className="text-slate-500">Specialty / Dept:</span>
                <span className="font-bold text-slate-900">{currentDoctor.department}</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                <span className="text-slate-500">Date & Slot:</span>
                <span className="font-bold text-blue-700">{selectedDate} at {selectedSlot}</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                <span className="text-slate-500">Location / Mode:</span>
                <span className="font-bold text-slate-900">{appointmentType === 'In-Person OPD' ? currentDoctor.opdRoom : 'Encrypted Video Link via SMS'}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Payment Status:</span>
                <span className="font-bold text-emerald-600">Payable at Hospital Counter (₹{currentDoctor.consultationFee})</span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3">
              <button
                onClick={handlePrint}
                className="px-4 py-2 border border-slate-300 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-100 flex items-center gap-1.5 cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>Print Appointment Voucher</span>
              </button>

              <button
                onClick={onClose}
                className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
