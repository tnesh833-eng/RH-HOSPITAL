import React, { useState } from 'react';
import { PhoneCall, Calendar, Menu, X, ShieldAlert } from 'lucide-react';

interface HeaderProps {
  onOpenBooking: () => void;
  onOpenEmergency: () => void;
  onOpenReports: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenBooking,
  onOpenEmergency,
  onOpenReports
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Zone 1: Single text element Brand Zone */}
          <div className="flex items-center gap-3">
            <a 
              href="#" 
              className="group flex items-center gap-2.5 text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded-md"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-xl shadow-md group-hover:bg-blue-700 transition-colors">
                RH
              </div>
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-950 font-serif">
                  RH Hospital
                </span>
                <span className="text-[11px] font-medium uppercase tracking-wider text-slate-500">
                  Multispecialty & Research
                </span>
              </div>
            </a>
          </div>

          {/* Zone 2: 4-6 clean text navigation links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-600">
            <a href="#specialties" className="hover:text-blue-600 transition-colors">
              Specialties
            </a>
            <a href="#doctors" className="hover:text-blue-600 transition-colors">
              Doctors
            </a>
            <a href="#live-capacity" className="hover:text-blue-600 transition-colors">
              Live Capacity
            </a>
            <a href="#health-packages" className="hover:text-blue-600 transition-colors">
              Health Checkups
            </a>
            <button 
              onClick={onOpenReports}
              className="hover:text-blue-600 transition-colors text-left"
            >
              Patient Portal
            </button>
            <a href="#campus-guide" className="hover:text-blue-600 transition-colors">
              Campus Guide
            </a>
          </nav>

          {/* Zone 3: 1-2 primary actions */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={onOpenEmergency}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-rose-700 bg-rose-50 border border-rose-200/80 rounded-lg hover:bg-rose-100 transition-colors whitespace-nowrap cursor-pointer"
              title="24/7 Rapid Emergency & Ambulance Service"
            >
              <ShieldAlert className="w-4 h-4 text-rose-600" />
              <span>Emergency 1066</span>
            </button>

            <button
              onClick={onOpenBooking}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 shadow-sm transition-colors whitespace-nowrap cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Appointment</span>
            </button>
          </div>

          {/* Mobile hamburger button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={onOpenEmergency}
              className="p-2 text-rose-600 bg-rose-50 rounded-lg border border-rose-200"
              aria-label="Emergency Call"
            >
              <PhoneCall className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 hover:text-slate-900 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 shadow-xl">
          <nav className="flex flex-col space-y-2.5 text-sm font-medium text-slate-700">
            <a 
              href="#specialties" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded-md hover:bg-slate-100"
            >
              Specialties & Centers of Excellence
            </a>
            <a 
              href="#doctors" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded-md hover:bg-slate-100"
            >
              Find a Doctor & OPD Schedules
            </a>
            <a 
              href="#live-capacity" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded-md hover:bg-slate-100"
            >
              Live Bed & Blood Bank Tracker
            </a>
            <a 
              href="#health-packages" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded-md hover:bg-slate-100"
            >
              Preventive Health Packages
            </a>
            <button 
              onClick={() => { setMobileMenuOpen(false); onOpenReports(); }}
              className="py-2 px-3 text-left rounded-md hover:bg-slate-100 text-blue-600 font-semibold"
            >
              Patient Portal & Diagnostic Reports
            </button>
            <a 
              href="#campus-guide" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded-md hover:bg-slate-100"
            >
              Hospital Floor Guide & Visiting Hours
            </a>
          </nav>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenBooking(); }}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Doctor Appointment</span>
            </button>
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenEmergency(); }}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-sm font-medium text-rose-700 bg-rose-50 border border-rose-200 rounded-lg hover:bg-rose-100"
            >
              <ShieldAlert className="w-4 h-4" />
              <span>Rapid Ambulance Dispatch (1066)</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
