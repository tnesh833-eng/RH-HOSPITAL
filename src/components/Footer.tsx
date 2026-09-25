import React from 'react';
import { Phone, Mail, MapPin, ShieldCheck, Heart, ArrowUp } from 'lucide-react';

interface FooterProps {
  onOpenBooking: () => void;
  onOpenEmergency: () => void;
  onOpenReports: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenBooking,
  onOpenEmergency,
  onOpenReports
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
          
          {/* Col 1: Brand & Hospital Identity */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-xl shadow-md">
                RH
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-extrabold tracking-tight text-white font-serif">
                  RH Hospital
                </span>
                <span className="text-xs font-medium uppercase tracking-wider text-slate-400">
                  Multispecialty & Research Institute
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Committed to providing compassionate, quaternary-level medical care, state-of-the-art robotic surgery, and round-the-clock emergency trauma resuscitation.
            </p>

            <div className="space-y-2 text-xs text-slate-300 pt-2">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span>RH Medical Enclave, Sector 14, Health City, Metro 400076</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Central Board: +1 (800) 744-6774 · Emergency: <strong>1066</strong></span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <span>care@rh-hospital.org · appointments@rh-hospital.org</span>
              </div>
            </div>
          </div>

          {/* Col 2: Centers of Excellence */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Centers of Excellence
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><a href="#specialties" className="hover:text-white transition-colors">Cardiology & Cardiac Surgery</a></li>
              <li><a href="#specialties" className="hover:text-white transition-colors">Neurology & Neurosurgery</a></li>
              <li><a href="#specialties" className="hover:text-white transition-colors">Robotic Orthopedics & Joint Care</a></li>
              <li><a href="#specialties" className="hover:text-white transition-colors">Comprehensive Cancer Care (Oncology)</a></li>
              <li><a href="#specialties" className="hover:text-white transition-colors">Pediatrics & Level-III NICU</a></li>
              <li><a href="#specialties" className="hover:text-white transition-colors">Gastroenterology & Hepatobiliary</a></li>
              <li><a href="#specialties" className="hover:text-white transition-colors">Nephrology & Renal Dialysis</a></li>
            </ul>
          </div>

          {/* Col 3: Patient Care Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Patient Services
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={onOpenBooking} className="hover:text-white text-left transition-colors">
                  Book Doctor OPD
                </button>
              </li>
              <li>
                <button onClick={onOpenReports} className="hover:text-white text-left transition-colors">
                  Diagnostic Reports Portal
                </button>
              </li>
              <li><a href="#live-capacity" className="hover:text-white transition-colors">Live Bed Tracker</a></li>
              <li><a href="#health-packages" className="hover:text-white transition-colors">Preventive Packages</a></li>
              <li><a href="#campus-guide" className="hover:text-white transition-colors">Campus Floor Guide</a></li>
              <li><a href="#campus-guide" className="hover:text-white transition-colors">Cashless Insurance Desk</a></li>
            </ul>
          </div>

          {/* Col 4: Rapid Emergency Callout */}
          <div className="lg:col-span-3 space-y-4">
            <div className="bg-rose-950/50 border border-rose-800/80 rounded-2xl p-4.5 text-xs text-rose-200">
              <span className="font-bold text-white block text-sm mb-1">
                24/7 Rapid Ambulance Care
              </span>
              <p className="text-rose-300 text-xs mb-3">
                Live GPS telemetry, ACLS mobile ventilators, and emergency physicians.
              </p>
              <button
                onClick={onOpenEmergency}
                className="w-full py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-lg transition-colors cursor-pointer text-xs"
              >
                Dispatch Ambulance (1066)
              </button>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 text-[11px] text-slate-400 space-y-1">
              <span className="text-white font-semibold block">Quality Accreditations:</span>
              <div className="flex flex-wrap gap-2 pt-1 text-slate-300 font-mono text-[10px]">
                <span className="bg-slate-800 px-2 py-0.5 rounded border border-slate-700">JCI USA</span>
                <span className="bg-slate-800 px-2 py-0.5 rounded border border-slate-700">NABH Certified</span>
                <span className="bg-slate-800 px-2 py-0.5 rounded border border-slate-700">NABL ISO-15189</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} RH Hospital (Rank-Holder Health System). All rights reserved.
          </div>

          <div className="flex items-center gap-4">
            <span>Emergency: 1066</span>
            <span>·</span>
            <span>Privacy Policy</span>
            <span>·</span>
            <span>Patient Charter</span>
            <span>·</span>
            <button
              onClick={scrollToTop}
              className="p-2 bg-slate-900 hover:bg-slate-800 rounded-lg text-slate-300 hover:text-white transition-colors cursor-pointer"
              title="Scroll to Top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
