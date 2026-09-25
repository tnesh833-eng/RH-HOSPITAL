import React from 'react';
import { Quote, Award, CheckCircle, ArrowRight } from 'lucide-react';
import { PATIENT_STORIES } from '../data/hospitalData';

export const PatientStories: React.FC = () => {
  return (
    <section className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-2">
            Clinical Outcomes & Recovery
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 font-serif tracking-tight">
            Patient Journeys & Lifesaving Moments
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            Every patient recovery is a testament to the dedication of our doctors, nurses, and world-class medical protocols.
          </p>
        </div>

        {/* Visual Storytelling Showcase with Generated Image */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-12">
          
          {/* Main Visual Image Card */}
          <div className="lg:col-span-5 relative rounded-2xl overflow-hidden shadow-md min-h-[320px] lg:min-h-auto">
            <img
              src="/src/assets/images/rh_doctor_consultation_1790267876667.jpg"
              alt="RH Hospital Senior Doctor discussing care plan with patient"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent flex flex-col justify-end p-6 text-white">
              <div className="flex items-center gap-2 text-xs font-semibold text-blue-300 uppercase tracking-wider mb-1">
                <Award className="w-4 h-4 text-blue-400" />
                <span>Patient-First Philosophy</span>
              </div>
              <h3 className="text-lg font-bold font-serif">
                Uncompromising Care with Human Empathy
              </h3>
              <p className="text-xs text-slate-300 mt-1">
                Over 120,000 satisfied patients treated annually across outpatients and inpatient admissions.
              </p>
            </div>
          </div>

          {/* Stories Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 gap-5">
            {PATIENT_STORIES.map((story, index) => (
              <div
                key={index}
                className="bg-slate-50 border border-slate-200/90 rounded-2xl p-5 sm:p-6 flex flex-col justify-between hover:border-blue-300 transition-all"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div>
                      <div className="text-xs font-bold text-blue-600 uppercase tracking-wide">
                        {story.condition}
                      </div>
                      <h4 className="text-base font-bold text-slate-900 mt-0.5">
                        {story.patientName} {typeof story.age === 'number' ? `(Age ${story.age})` : `(${story.age})`}
                      </h4>
                    </div>
                    <span className="text-[11px] font-semibold text-slate-500 bg-white border border-slate-200 px-2.5 py-1 rounded-md shrink-0">
                      Recovery: {story.recoveryDays}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed mb-4">
                    &ldquo;{story.quote}&rdquo;
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-200/70 flex flex-wrap items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-1.5 text-slate-600">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span><strong>Consultant:</strong> {story.doctor}</span>
                  </div>
                  <span className="text-slate-400 font-medium">{story.year}</span>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Surgical Suite Callout */}
        <div className="bg-slate-900 rounded-2xl p-6 sm:p-8 text-white grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-4 rounded-xl overflow-hidden h-44">
            <img
              src="/src/assets/images/rh_advanced_surgery_suite_1790267890175.jpg"
              alt="RH Hospital Hybrid Robotic Surgical Suite"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center filter brightness-90"
            />
          </div>
          <div className="md:col-span-8">
            <div className="text-xs font-bold uppercase tracking-wider text-blue-400 mb-1">
              Zero-Infection Surgical Protocol
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-serif mb-2">
              8 Ultra-Clean Laminar Airflow Hybrid Operation Suites
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
              Equipped with HEPA filter positive pressure systems exchanging sterile air 30 times per hour, intraoperative robotic navigation, and 4K surgical monitors to ensure flawless clinical precision.
            </p>
            <div className="flex flex-wrap gap-4 text-xs font-medium text-slate-200">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                Sub-Zero SSI Infection Rate
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                24/7 Anesthesia & Resuscitation
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                Robotic Orthopedic & General Surgery
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
