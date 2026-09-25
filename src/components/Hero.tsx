import React, { useState } from 'react';
import { Calendar, Search, ArrowRight, ShieldCheck, HeartPulse, Clock, Award } from 'lucide-react';

interface HeroProps {
  onOpenBooking: () => void;
  onOpenEmergency: () => void;
  onSearchDoctorOrCondition: (query: string) => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenBooking,
  onOpenEmergency,
  onSearchDoctorOrCondition
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearchDoctorOrCondition(searchQuery.trim());
    }
  };

  return (
    <section className="relative overflow-hidden bg-slate-950 text-white">
      {/* Background Hero Image with Measured Gradient Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/rh_hospital_facade_1790267863206.jpg"
          alt="RH Hospital Modern Medical Center Campus Exterior"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center opacity-35 filter brightness-90"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-slate-900/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 sm:pt-20 sm:pb-28">
        <div className="max-w-3xl">
          
          {/* Natural human editorial kicker (no comment slashes, no pills) */}
          <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-wide text-blue-400 mb-4 uppercase">
            <span>Accredited Tertiary Medical Center</span>
            <span aria-hidden="true">·</span>
            <span>JCI & NABH Certified</span>
            <span aria-hidden="true">·</span>
            <span>Est. 2004</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1] mb-6 font-serif">
            RH Hospital
          </h1>
          <p className="text-xl sm:text-2xl font-medium text-slate-200 mb-4">
            Where world-class clinical excellence meets uncompromising human compassion.
          </p>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-8 max-w-2xl font-light">
            Rank-Holder Health System unites 65+ leading multi-specialty consultants, robotic surgical suites, an accredited 24/7 Level-1 trauma resuscitation bay, and 450+ inpatient beds to safeguard every life.
          </p>

          {/* Quick Doctor & Specialty Finder Input */}
          <form onSubmit={handleSearchSubmit} className="mb-8 max-w-2xl">
            <div className="relative flex items-center bg-white rounded-xl shadow-xl p-1.5 focus-within:ring-2 focus-within:ring-blue-500">
              <Search className="w-5 h-5 text-slate-400 ml-3 mr-2 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by doctor, disease, or medical specialty (e.g. Cardiologist, Knee, MRI)..."
                className="w-full text-slate-900 placeholder:text-slate-400 text-sm sm:text-base focus:outline-none bg-transparent pr-2 py-1.5"
              />
              <button
                type="submit"
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold rounded-lg shrink-0 transition-colors flex items-center gap-1.5"
              >
                <span>Find Care</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400 mt-2.5 px-1">
              <span>Popular searches:</span>
              <button 
                type="button" 
                onClick={() => onSearchDoctorOrCondition('Cardiology')}
                className="text-slate-300 hover:text-white underline underline-offset-2"
              >
                Heart & Angioplasty
              </button>
              <span>·</span>
              <button 
                type="button" 
                onClick={() => onSearchDoctorOrCondition('Orthopedics')}
                className="text-slate-300 hover:text-white underline underline-offset-2"
              >
                Robotic Knee
              </button>
              <span>·</span>
              <button 
                type="button" 
                onClick={() => onSearchDoctorOrCondition('Neurology')}
                className="text-slate-300 hover:text-white underline underline-offset-2"
              >
                Brain Stroke
              </button>
              <span>·</span>
              <button 
                type="button" 
                onClick={() => onSearchDoctorOrCondition('Pediatrics')}
                className="text-slate-300 hover:text-white underline underline-offset-2"
              >
                NICU
              </button>
            </div>
          </form>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 mb-12">
            <button
              onClick={onOpenBooking}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-lg hover:shadow-blue-500/25 transition-all cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Doctor Consultation</span>
            </button>

            <button
              onClick={onOpenEmergency}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-rose-300 bg-rose-950/70 hover:bg-rose-900/80 border border-rose-700/60 rounded-lg transition-colors cursor-pointer"
            >
              <HeartPulse className="w-4 h-4 text-rose-400" />
              <span>Emergency 1066 & Ambulance</span>
            </button>
          </div>

          {/* Claim-to-Proof Quantitative Adjacency Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-slate-800/80">
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-white font-mono tabular-nums">450+</div>
              <div className="text-xs text-slate-400 mt-0.5">Inpatient Tertiary Beds</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-emerald-400 font-mono tabular-nums">99.2%</div>
              <div className="text-xs text-slate-400 mt-0.5">Clinical Recovery Rate</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-blue-400 font-mono tabular-nums">&lt; 12 min</div>
              <div className="text-xs text-slate-400 mt-0.5">Avg Ambulance Response</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-white font-mono tabular-nums">65+</div>
              <div className="text-xs text-slate-400 mt-0.5">Super-Specialists On-Campus</div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
