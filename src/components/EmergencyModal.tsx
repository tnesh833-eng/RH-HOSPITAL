import React, { useState, useEffect } from 'react';
import { X, Phone, Ambulance, ShieldAlert, MapPin, CheckCircle2, AlertOctagon, Heart, Activity } from 'lucide-react';

interface EmergencyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EmergencyModal: React.FC<EmergencyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [state, setState] = useState<'request' | 'dispatched'>('request');
  const [patientCondition, setPatientCondition] = useState<string>('Acute Chest Pain / Suspected STEMI');
  const [callerName, setCallerName] = useState('');
  const [callerPhone, setCallerPhone] = useState('');
  const [pickupAddress, setPickupAddress] = useState('');
  const [etaMinutes, setEtaMinutes] = useState(11);
  const [ambulanceId, setAmbulanceId] = useState('');

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (state === 'dispatched' && etaMinutes > 1) {
      timer = setInterval(() => {
        setEtaMinutes(prev => (prev > 1 ? prev - 1 : 1));
      }, 30000);
    }
    return () => clearInterval(timer);
  }, [state, etaMinutes]);

  const handleDispatch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pickupAddress.trim() || !callerPhone.trim()) {
      alert('Please enter pickup address and phone number for dispatch.');
      return;
    }
    const randNum = Math.floor(100 + Math.random() * 900);
    setAmbulanceId(`RH-ACLS-0${randNum}`);
    setState('dispatched');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-xl w-full shadow-2xl overflow-hidden border border-rose-200">
        
        {/* Modal Emergency Top Banner */}
        <div className="bg-rose-700 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-white/20 rounded-lg">
              <ShieldAlert className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-rose-200">
                24/7 Level-1 Emergency & Trauma Care
              </span>
              <h2 className="text-xl font-bold font-serif">
                {state === 'request' ? 'Rapid ACLS Ambulance Dispatch' : 'Ambulance En Route'}
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-rose-200 hover:text-white hover:bg-rose-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Immediate Call Direct Strip */}
        <div className="bg-rose-50 border-b border-rose-100 p-4 flex items-center justify-between">
          <div className="text-xs text-rose-900">
            <strong>Critical Life Hazard?</strong> Immediate voice connection with triage doctor:
          </div>
          <a
            href="tel:1066"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-bold shadow-xs transition-colors shrink-0"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Call 1066</span>
          </a>
        </div>

        {state === 'request' ? (
          <form onSubmit={handleDispatch} className="p-6 space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Emergency Medical Condition
              </label>
              <select
                value={patientCondition}
                onChange={(e) => setPatientCondition(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs sm:text-sm text-slate-900 font-medium focus:ring-2 focus:ring-rose-500"
              >
                <option value="Acute Chest Pain / Suspected STEMI">Severe Chest Pain / Pressure (Suspected Heart Attack)</option>
                <option value="Stroke / Facial Droop / Sudden Weakness">Code Stroke: Sudden Slurred Speech / Facial Asymmetry</option>
                <option value="Severe Trauma / Road Traffic Collision">Major Road Accident / Severe Bone Fracture / Bleeding</option>
                <option value="Severe Acute Dyspnea / Asthma Attack">Severe Breathing Difficulty / Low Oxygen</option>
                <option value="Unconscious / Seizure / Fainting">Unconscious Patient / Continuous Seizure Episode</option>
                <option value="Pediatric Emergency">Pediatric High Fever / Infant Convulsion</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Caller Name *</label>
                <input
                  type="text"
                  required
                  value={callerName}
                  onChange={(e) => setCallerName(e.target.value)}
                  placeholder="Your Name"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs sm:text-sm text-slate-900 focus:ring-2 focus:ring-rose-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Contact Phone *</label>
                <input
                  type="tel"
                  required
                  value={callerPhone}
                  onChange={(e) => setCallerPhone(e.target.value)}
                  placeholder="Primary phone number"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs sm:text-sm text-slate-900 focus:ring-2 focus:ring-rose-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Exact Pickup Location / Street Landmark *
              </label>
              <textarea
                required
                rows={2}
                value={pickupAddress}
                onChange={(e) => setPickupAddress(e.target.value)}
                placeholder="Flat / Building Name, Road, Landmark, Pincode..."
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs sm:text-sm text-slate-900 focus:ring-2 focus:ring-rose-500"
              />
            </div>

            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-[11px] text-slate-600 flex items-start gap-2">
              <Activity className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <span>
                All RH Hospital Ambulances are Advanced Cardiac Life Support (ACLS) compliant with motorized ventilators, defibrillators, oxygen, and trained ER paramedic teams.
              </span>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm rounded-xl shadow-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Ambulance className="w-5 h-5" />
              <span>Confirm & Dispatch Ambulance Now</span>
            </button>
          </form>
        ) : (
          /* Live Dispatch Screen */
          <div className="p-6 text-center space-y-6">
            <div className="relative w-20 h-20 mx-auto">
              <div className="w-20 h-20 rounded-full bg-rose-100 flex items-center justify-center text-rose-600 animate-pulse">
                <Ambulance className="w-10 h-10" />
              </div>
              <span className="absolute -top-1 -right-1 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-rose-600"></span>
              </span>
            </div>

            <div>
              <div className="text-3xl font-extrabold text-slate-900 font-mono">
                ETA: ~{etaMinutes} Minutes
              </div>
              <div className="text-xs font-semibold text-rose-600 uppercase tracking-wide mt-1">
                Ambulance Unit {ambulanceId} Dispatched
              </div>
              <p className="text-xs text-slate-500 mt-2">
                Emergency Paramedic Lead: Dr. Samuel Roy · Driver Direct: +1 (800) 106-602
              </p>
            </div>

            {/* Crucial First Aid While Waiting */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-left text-xs space-y-2">
              <div className="flex items-center gap-1.5 font-bold text-amber-900">
                <AlertOctagon className="w-4 h-4 text-amber-600" />
                <span>Immediate Actions While Waiting:</span>
              </div>
              <ul className="list-disc pl-4 space-y-1 text-amber-800">
                <li>Keep the patient calm, seated or in a semi-reclined position.</li>
                <li>Do not give any solid food or heavy liquids.</li>
                <li>Loosen tight clothing around the neck and chest.</li>
                <li>Keep the front gate open and turn on outdoor lights for rapid driver identification.</li>
              </ul>
            </div>

            <div className="flex justify-center gap-3">
              <a
                href="tel:1066"
                className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5"
              >
                <Phone className="w-4 h-4" />
                <span>Call Dispatch Operator</span>
              </a>
              <button
                onClick={onClose}
                className="px-5 py-2.5 border border-slate-300 rounded-xl text-xs font-medium text-slate-700 hover:bg-slate-100"
              >
                Close Window
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
