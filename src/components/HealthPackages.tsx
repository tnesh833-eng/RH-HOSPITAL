import React, { useState } from 'react';
import { ShieldCheck, Check, Clock, AlertCircle, ChevronDown, ChevronUp, Calendar } from 'lucide-react';
import { HEALTH_PACKAGES, HealthPackage } from '../data/hospitalData';

interface HealthPackagesProps {
  onBookPackage: (pkg: HealthPackage) => void;
}

export const HealthPackages: React.FC<HealthPackagesProps> = ({ onBookPackage }) => {
  const [expandedPkgId, setExpandedPkgId] = useState<string | null>(HEALTH_PACKAGES[0].id);

  const toggleExpand = (id: string) => {
    setExpandedPkgId(prev => prev === id ? null : id);
  };

  return (
    <section id="health-packages" className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-2">
              Proactive Preventive Medicine
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 font-serif tracking-tight">
              Comprehensive Health Check Packages
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-2xl">
              Early detection saves lives. All packages include high-definition laboratory testing, physician physical evaluation, and same-day electronic reports.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3.5 py-2 rounded-lg border border-emerald-200">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>NABL & CAP Certified Pathology</span>
          </div>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {HEALTH_PACKAGES.map((pkg) => {
            const isExpanded = expandedPkgId === pkg.id;
            const savingsPercent = Math.round(((pkg.originalPrice - pkg.packagePrice) / pkg.originalPrice) * 100);

            return (
              <div 
                key={pkg.id}
                className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:border-blue-300 transition-all flex flex-col overflow-hidden"
              >
                {/* Card Top Banner */}
                <div className="p-6 sm:p-7 border-b border-slate-100 flex-1">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md">
                      {pkg.category}
                    </span>
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                      Save {savingsPercent}%
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-950 font-serif mb-1">
                    {pkg.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 mb-5 leading-normal">
                    {pkg.subtitle}
                  </p>

                  {/* Pricing Box */}
                  <div className="flex items-baseline gap-3 mb-5 p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                    <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono">
                      ₹{pkg.packagePrice.toLocaleString()}
                    </div>
                    <div className="text-xs text-slate-400 line-through">
                      ₹{pkg.originalPrice.toLocaleString()}
                    </div>
                    <div className="text-xs font-semibold text-blue-700 ml-auto bg-blue-50 px-2 py-1 rounded">
                      {pkg.parametersCount} Parameters
                    </div>
                  </div>

                  {/* Key metadata */}
                  <div className="space-y-2 text-xs text-slate-600 mb-4">
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span><strong>Turnaround:</strong> {pkg.reportTurnaround}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <AlertCircle className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                      <span><strong>Preparation:</strong> {pkg.fastingRequired}</span>
                    </div>
                  </div>

                  {/* Included Tests Summary */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                        Key Diagnostics Included ({pkg.keyTests.length}):
                      </span>
                      <button
                        onClick={() => toggleExpand(pkg.id)}
                        className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
                      >
                        {isExpanded ? 'Collapse' : 'Show All'}
                        {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                      </button>
                    </div>

                    <ul className="space-y-1.5 text-xs text-slate-600">
                      {(isExpanded ? pkg.keyTests : pkg.keyTests.slice(0, 4)).map((test, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{test}</span>
                        </li>
                      ))}
                    </ul>
                    {!isExpanded && (
                      <div className="text-[11px] text-slate-400 italic mt-1.5 pl-5">
                        + {pkg.keyTests.length - 4} additional vital parameters...
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer Action */}
                <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-3">
                  <div className="text-[11px] text-slate-500">
                    Complimentary breakfast voucher provided
                  </div>

                  <button
                    onClick={() => onBookPackage(pkg)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors cursor-pointer"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Book Health Package</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
