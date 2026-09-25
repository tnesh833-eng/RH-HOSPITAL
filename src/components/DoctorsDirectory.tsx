import React, { useState, useMemo } from 'react';
import { Search, Star, Clock, MapPin, Calendar, Award, Languages, ChevronRight } from 'lucide-react';
import { DOCTORS, Doctor, DEPARTMENTS } from '../data/hospitalData';

interface DoctorsDirectoryProps {
  onSelectDoctorForBooking: (doctor: Doctor) => void;
  selectedDeptFilter: string;
  onClearDeptFilter: () => void;
  onSelectDeptFilter: (dept: string) => void;
}

export const DoctorsDirectory: React.FC<DoctorsDirectoryProps> = ({
  onSelectDoctorForBooking,
  selectedDeptFilter,
  onClearDeptFilter,
  onSelectDeptFilter
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredDoctors = useMemo(() => {
    return DOCTORS.filter((doc) => {
      const matchesDept = selectedDeptFilter === 'ALL' || doc.department.toLowerCase().includes(selectedDeptFilter.toLowerCase());
      const query = searchQuery.toLowerCase().trim();
      const matchesQuery = !query || 
        doc.name.toLowerCase().includes(query) ||
        doc.department.toLowerCase().includes(query) ||
        doc.specializations.some(s => s.toLowerCase().includes(query)) ||
        doc.qualification.toLowerCase().includes(query);

      return matchesDept && matchesQuery;
    });
  }, [selectedDeptFilter, searchQuery]);

  return (
    <section id="doctors" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-2">
              Distinguished Medical Faculty
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 font-serif tracking-tight">
              Our Senior Consultants & Specialists
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-2xl">
              Book consultations with board-certified physicians, super-specialists, and renowned surgeons with decades of tertiary clinical practice.
            </p>
          </div>

          <div className="text-xs font-semibold text-slate-500">
            Showing <span className="text-slate-900 font-bold">{filteredDoctors.length}</span> verified specialists
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 mb-8 space-y-4">
          
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search consultant name, condition, or procedural expertise..."
                className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
                >
                  Clear
                </button>
              )}
            </div>

            {selectedDeptFilter !== 'ALL' && (
              <button
                onClick={onClearDeptFilter}
                className="shrink-0 text-xs font-semibold text-blue-700 bg-blue-100 hover:bg-blue-200 px-3.5 py-2.5 rounded-xl transition-colors cursor-pointer"
              >
                Reset Department: {selectedDeptFilter.split(' ')[0]} ✕
              </button>
            )}
          </div>

          {/* Department Quick Filter Tags */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
            <span className="text-slate-400 shrink-0 font-medium mr-1">Filter by Center:</span>
            <button
              onClick={() => onSelectDeptFilter('ALL')}
              className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors cursor-pointer ${
                selectedDeptFilter === 'ALL'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              All Specialties
            </button>
            {DEPARTMENTS.map((dept) => {
              const isSelected = selectedDeptFilter.toLowerCase() === dept.name.toLowerCase();
              return (
                <button
                  key={dept.id}
                  onClick={() => onSelectDeptFilter(dept.name)}
                  className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-200'
                  }`}
                >
                  {dept.name.split(' ')[0]}
                </button>
              );
            })}
          </div>

        </div>

        {/* Doctors Grid */}
        {filteredDoctors.length === 0 ? (
          <div className="text-center py-16 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
            <h3 className="text-base font-bold text-slate-800">No doctors matched your search criteria</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              Try searching for general specialties like &quot;Cardiology&quot;, &quot;Joint&quot;, or clear the department filter.
            </p>
            <button
              onClick={() => { setSearchQuery(''); onClearDeptFilter(); }}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-semibold hover:bg-blue-700 transition-colors"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDoctors.map((doc) => (
              <div 
                key={doc.id}
                className="bg-white rounded-2xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all flex flex-col p-5 group"
              >
                
                {/* Doctor Card Header */}
                <div className="flex items-start gap-3.5 mb-4">
                  <div className={`w-14 h-14 rounded-2xl ${doc.avatarColor} text-white flex items-center justify-center font-bold text-lg shrink-0 shadow-sm`}>
                    {doc.name.replace('Dr. ', '').split(' ').map(n => n[0]).join('')}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wide truncate">
                        {doc.department.split('&')[0]}
                      </span>
                      <div className="flex items-center gap-1 text-amber-500 text-xs shrink-0 font-semibold">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <span>{doc.rating}</span>
                        <span className="text-slate-400 font-normal">({doc.reviewCount})</span>
                      </div>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-700 transition-colors truncate">
                      {doc.name}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium truncate">
                      {doc.designation}
                    </p>
                  </div>
                </div>

                {/* Academic Qualifications & Experience */}
                <div className="text-xs text-slate-600 mb-3 space-y-1">
                  <div className="text-[11px] text-slate-500 flex items-center gap-1.5 truncate">
                    <Award className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{doc.qualification}</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-600 text-[11px] pt-1">
                    <span><strong>{doc.experienceYears}+</strong> Yrs Clinical Exp</span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <Languages className="w-3 h-3 text-slate-400" />
                      {doc.languages.slice(0, 2).join(', ')}
                    </span>
                  </div>
                </div>

                {/* Key Specializations */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {doc.specializations.slice(0, 3).map((spec, i) => (
                    <span key={i} className="text-[10px] font-medium bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md">
                      {spec}
                    </span>
                  ))}
                </div>

                {/* OPD Schedule & Room Info */}
                <div className="mt-auto pt-3 border-t border-slate-100 text-xs space-y-1.5 mb-4">
                  <div className="flex items-center justify-between text-slate-600">
                    <span className="flex items-center gap-1 text-[11px]">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{doc.opdTimings}</span>
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-500">
                    <span className="flex items-center gap-1 truncate max-w-[190px]">
                      <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                      <span className="truncate">{doc.opdRoom}</span>
                    </span>
                    <span className="font-semibold text-emerald-600">
                      Slot: {doc.nextAvailable}
                    </span>
                  </div>
                </div>

                {/* Fee & Action Button */}
                <div className="flex items-center justify-between gap-3 pt-2">
                  <div>
                    <span className="text-[10px] text-slate-500 block uppercase">Consultation</span>
                    <span className="text-sm font-bold text-slate-900">₹{doc.consultationFee}</span>
                  </div>

                  <button
                    onClick={() => onSelectDoctorForBooking(doc)}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-xs transition-colors cursor-pointer"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Book Appointment</span>
                  </button>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
