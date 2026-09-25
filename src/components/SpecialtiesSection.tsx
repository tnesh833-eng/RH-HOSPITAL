import React, { useState } from 'react';
import { 
  HeartPulse, Brain, Activity, ShieldAlert, Baby, Stethoscope, Droplets, Scan, 
  CheckCircle2, ArrowRight, BedDouble, Cpu
} from 'lucide-react';
import { DEPARTMENTS, Department } from '../data/hospitalData';

interface SpecialtiesSectionProps {
  onSelectDepartmentForBooking: (deptName: string) => void;
  onFilterDoctorsByDept: (deptName: string) => void;
}

export const SpecialtiesSection: React.FC<SpecialtiesSectionProps> = ({
  onSelectDepartmentForBooking,
  onFilterDoctorsByDept
}) => {
  const [selectedDeptId, setSelectedDeptId] = useState<string>(DEPARTMENTS[0].id);

  const activeDepartment = DEPARTMENTS.find(d => d.id === selectedDeptId) || DEPARTMENTS[0];

  const getDepartmentIcon = (iconName: string, className = "w-5 h-5") => {
    switch (iconName) {
      case 'HeartPulse': return <HeartPulse className={className} />;
      case 'Brain': return <Brain className={className} />;
      case 'Activity': return <Activity className={className} />;
      case 'ShieldAlert': return <ShieldAlert className={className} />;
      case 'Baby': return <Baby className={className} />;
      case 'Stethoscope': return <Stethoscope className={className} />;
      case 'Droplets': return <Droplets className={className} />;
      case 'Scan': return <Scan className={className} />;
      default: return <Activity className={className} />;
    }
  };

  return (
    <section id="specialties" className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading with high editorial design standard */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-2">
              Centers of Clinical Excellence
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 font-serif tracking-tight">
              Specialized Care Departments
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-2xl">
              Equipped with precision technology, dedicated ICU wings, and multidisciplinary clinical teams collaborating seamlessly.
            </p>
          </div>
          <div className="hidden lg:flex items-center gap-3 text-xs text-slate-500 bg-white px-4 py-2.5 rounded-lg border border-slate-200 shadow-xs">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>All 8 Centers of Excellence Operating 24/7</span>
          </div>
        </div>

        {/* Desktop & Tablet Interactive Department Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Department Selector List (Left Column) */}
          <div className="lg:col-span-5 flex flex-col space-y-2">
            {DEPARTMENTS.map((dept) => {
              const isSelected = dept.id === activeDepartment.id;
              return (
                <button
                  key={dept.id}
                  onClick={() => setSelectedDeptId(dept.id)}
                  className={`text-left p-4 rounded-xl border transition-all flex items-start gap-4 cursor-pointer ${
                    isSelected
                      ? 'bg-white border-blue-600 shadow-md ring-1 ring-blue-600/20'
                      : 'bg-white/80 hover:bg-white border-slate-200/90 text-slate-700 hover:border-slate-300'
                  }`}
                >
                  <div className={`p-2.5 rounded-lg shrink-0 ${
                    isSelected ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'
                  }`}>
                    {getDepartmentIcon(dept.icon, "w-5 h-5")}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className={`text-sm sm:text-base font-bold truncate ${
                        isSelected ? 'text-blue-900' : 'text-slate-900'
                      }`}>
                        {dept.name}
                      </h3>
                      <span className="text-[11px] font-semibold text-slate-500 shrink-0">
                        {dept.beds} Beds
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                      {dept.tagline}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Department Detail Focus View (Right Column) */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-100">
              <div className="flex items-center gap-3.5">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                  {getDepartmentIcon(activeDepartment.icon, "w-6 h-6")}
                </div>
                <div>
                  <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
                    Center of Excellence
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-950 font-serif">
                    {activeDepartment.name}
                  </h3>
                </div>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200/80 text-xs font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{activeDepartment.stat}</span>
              </div>
            </div>

            {/* Department Head & Overview */}
            <div className="py-6 border-b border-slate-100">
              <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4">
                {activeDepartment.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-slate-50 p-3.5 rounded-xl border border-slate-200/60">
                <div>
                  <span className="text-slate-500 block mb-0.5">Director & Clinical Head:</span>
                  <span className="font-semibold text-slate-900">{activeDepartment.headOfDept}</span>
                </div>
                <div>
                  <span className="text-slate-500 block mb-0.5">Dedicated Inpatient Capacity:</span>
                  <span className="font-semibold text-slate-900 flex items-center gap-1.5">
                    <BedDouble className="w-3.5 h-3.5 text-blue-600" />
                    {activeDepartment.beds} Intensive & General Beds
                  </span>
                </div>
              </div>
            </div>

            {/* High-frequency Clinical Procedures */}
            <div className="py-6 border-b border-slate-100">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3.5">
                Core Procedures & Clinical Capabilities
              </h4>
              <ul className="space-y-2.5">
                {activeDepartment.featuredProcedures.map((proc, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <span>{proc}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Equipment and Infrastructure */}
            <div className="py-6 border-b border-slate-100">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3 flex items-center gap-1.5">
                <Cpu className="w-4 h-4 text-blue-600" />
                <span>Specialized Diagnostic & Surgical Infrastructure</span>
              </h4>
              <div className="flex flex-wrap gap-2">
                {activeDepartment.equipment.map((eq, i) => (
                  <span key={i} className="text-xs font-medium bg-slate-100 text-slate-800 px-3 py-1.5 rounded-lg border border-slate-200">
                    {eq}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions for this department */}
            <div className="pt-6 flex flex-wrap items-center justify-between gap-4">
              <button
                onClick={() => onFilterDoctorsByDept(activeDepartment.name)}
                className="text-xs sm:text-sm font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1.5 cursor-pointer"
              >
                <span>View Doctors in {activeDepartment.name.split(' ')[0]}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onSelectDepartmentForBooking(activeDepartment.name)}
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold rounded-lg shadow-sm transition-colors cursor-pointer"
              >
                Book OPD Consultation
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
