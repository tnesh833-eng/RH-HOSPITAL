import React, { useState } from 'react';
import { MapPin, Clock, CreditCard, ChevronDown, ChevronUp, HelpCircle, Building2, Phone } from 'lucide-react';
import { CAMPUS_FLOORS, FAQS } from '../data/hospitalData';

export const CampusGuide: React.FC = () => {
  const [activeWingIndex, setActiveWingIndex] = useState(0);
  const [expandedFaqIndex, setExpandedFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setExpandedFaqIndex(prev => prev === index ? null : index);
  };

  return (
    <section id="campus-guide" className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-2">
            Campus Wayfinding & Patient Services
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 font-serif tracking-tight">
            Hospital Guide & Visitor Information
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            Everything you need for a comfortable hospital visit, from floor navigation and visiting hours to cashless insurance claim settlement.
          </p>
        </div>

        {/* 2-Column Campus Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          
          {/* Left Column: Floor-by-Floor Wayfinder */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-xs">
            <div className="flex items-center gap-2 mb-4">
              <Building2 className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-bold text-slate-900 font-serif">
                Campus Floor Navigation Directory
              </h3>
            </div>

            {/* Wing selector tabs */}
            <div className="flex flex-wrap gap-2 mb-6">
              {CAMPUS_FLOORS.map((wing, i) => (
                <button
                  key={i}
                  onClick={() => setActiveWingIndex(i)}
                  className={`text-xs font-semibold py-2 px-3 rounded-lg border transition-all cursor-pointer ${
                    activeWingIndex === i
                      ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                      : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border-slate-200'
                  }`}
                >
                  {wing.wing.split('—')[0]}
                </button>
              ))}
            </div>

            {/* Selected Wing Details */}
            <div className="space-y-3">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                {CAMPUS_FLOORS[activeWingIndex].wing}
              </div>

              {CAMPUS_FLOORS[activeWingIndex].floors.map((fl, fIdx) => (
                <div key={fIdx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-col sm:flex-row sm:items-start gap-3">
                  <span className="text-xs font-bold text-blue-700 bg-blue-100 px-2.5 py-1 rounded-md shrink-0 sm:w-28 text-center sm:text-left">
                    {fl.floor}
                  </span>
                  <span className="text-xs sm:text-sm text-slate-700 leading-normal">
                    {fl.services}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Visiting Hours & Cashless Insurance */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Visiting Hours Card */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
              <div className="flex items-center gap-2 mb-3">
                <Clock className="w-5 h-5 text-blue-600" />
                <h3 className="text-base font-bold text-slate-900">
                  Patient Visiting Hours
                </h3>
              </div>

              <div className="space-y-3 text-xs text-slate-600">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <strong className="text-slate-900 block mb-1">General Inpatient & Private Wards:</strong>
                  <div className="flex justify-between text-slate-700">
                    <span>Morning Session:</span>
                    <span className="font-semibold">11:00 AM – 01:00 PM</span>
                  </div>
                  <div className="flex justify-between text-slate-700 mt-1">
                    <span>Evening Session:</span>
                    <span className="font-semibold">05:00 PM – 07:00 PM</span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1.5">Max 2 visitors with authorized pass.</div>
                </div>

                <div className="p-3 rounded-xl bg-rose-50/60 border border-rose-100">
                  <strong className="text-rose-950 block mb-1">Critical Care Units (ICU / CCU / NICU):</strong>
                  <div className="flex justify-between text-rose-900">
                    <span>Evening Window:</span>
                    <span className="font-semibold">04:30 PM – 05:30 PM</span>
                  </div>
                  <div className="text-[11px] text-rose-700 mt-1">1 attendant only. Sterile hospital gown provided.</div>
                </div>
              </div>
            </div>

            {/* Cashless Insurance Desk */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
              <div className="flex items-center gap-2 mb-3">
                <CreditCard className="w-5 h-5 text-emerald-600" />
                <h3 className="text-base font-bold text-slate-900">
                  24/7 Cashless TPA & Insurance Desk
                </h3>
              </div>
              <p className="text-xs text-slate-600 leading-normal mb-3">
                RH Hospital facilitates seamless cashless pre-authorization with all leading insurance carriers and TPAs.
              </p>
              <div className="flex flex-wrap gap-1.5 mb-3">
                {['Star Health', 'HDFC ERGO', 'ICICI Lombard', 'Medi Assist', 'Paramount TPA', 'Care Health', 'Bajaj Allianz', 'Max Bupa'].map((ins, i) => (
                  <span key={i} className="text-[11px] font-medium bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                    {ins}
                  </span>
                ))}
              </div>
              <div className="text-xs text-slate-500 flex items-center gap-1.5 pt-2 border-t border-slate-100">
                <Phone className="w-3.5 h-3.5 text-slate-400" />
                <span>Insurance Helpdesk Direct: <strong>+1 (800) 744-4678</strong></span>
              </div>
            </div>

          </div>

        </div>

        {/* FAQs Accordion */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
          <div className="flex items-center gap-2 mb-6">
            <HelpCircle className="w-5 h-5 text-blue-600" />
            <h3 className="text-xl font-bold text-slate-950 font-serif">
              Frequently Asked Patient Questions
            </h3>
          </div>

          <div className="divide-y divide-slate-100">
            {FAQS.map((faq, index) => {
              const isOpen = expandedFaqIndex === index;
              return (
                <div key={index} className="py-4">
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full text-left flex items-start justify-between gap-4 font-semibold text-sm sm:text-base text-slate-900 hover:text-blue-600 transition-colors cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? <ChevronUp className="w-4 h-4 text-blue-600 shrink-0 mt-1" /> : <ChevronDown className="w-4 h-4 text-slate-400 shrink-0 mt-1" />}
                  </button>
                  {isOpen && (
                    <p className="text-xs sm:text-sm text-slate-600 mt-2.5 leading-relaxed pl-1">
                      {faq.a}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
