import React, { useState } from 'react';
import { BedDouble, Droplet, RefreshCw, AlertTriangle, CheckCircle, Info, ShieldCheck } from 'lucide-react';
import { BED_CAPACITIES, BLOOD_INVENTORY, BedCapacity, BloodStock } from '../data/hospitalData';

interface LiveCapacityTrackerProps {
  onEmergencyBedRequest: () => void;
  onOpenBloodDonation: () => void;
}

export const LiveCapacityTracker: React.FC<LiveCapacityTrackerProps> = ({
  onEmergencyBedRequest,
  onOpenBloodDonation
}) => {
  const [activeTab, setActiveTab] = useState<'beds' | 'blood'>('beds');
  const [lastUpdated, setLastUpdated] = useState<string>('Just now');
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setLastUpdated('Updated a moment ago');
    }, 600);
  };

  const totalBeds = BED_CAPACITIES.reduce((acc, b) => acc + b.total, 0);
  const totalOccupied = BED_CAPACITIES.reduce((acc, b) => acc + b.occupied, 0);
  const totalAvailable = BED_CAPACITIES.reduce((acc, b) => acc + b.available, 0);
  const totalBloodUnits = BLOOD_INVENTORY.reduce((acc, b) => acc + b.units, 0);

  return (
    <section id="live-capacity" className="py-20 bg-slate-900 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400 mb-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span>Hospital Operational Transparency</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-serif tracking-tight text-white">
              Live Bed & Blood Bank Telemetry
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-2xl">
              Public dashboard reporting real-time ICU ventilators, general inpatient bed availability, and central blood bank reserves across RH Hospital campus.
            </p>
          </div>

          {/* Sync status & Refresh button */}
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-400 font-mono">
              Status: {lastUpdated}
            </span>
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition-colors cursor-pointer disabled:opacity-60"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-blue-400' : ''}`} />
              <span>Refresh</span>
            </button>
          </div>
        </div>

        {/* Top Summary Banner */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-slate-800/80 border border-slate-700/80 p-5 rounded-2xl flex items-center justify-between">
            <div>
              <div className="text-xs text-slate-400 font-medium">Total Campus Beds</div>
              <div className="text-2xl sm:text-3xl font-bold font-mono text-white mt-1">
                {totalBeds} <span className="text-xs font-sans text-slate-400 font-normal">Beds</span>
              </div>
            </div>
            <div className="p-3 bg-blue-500/10 text-blue-400 rounded-xl">
              <BedDouble className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-slate-800/80 border border-slate-700/80 p-5 rounded-2xl flex items-center justify-between">
            <div>
              <div className="text-xs text-slate-400 font-medium">Currently Available Beds</div>
              <div className="text-2xl sm:text-3xl font-bold font-mono text-emerald-400 mt-1">
                {totalAvailable} <span className="text-xs font-sans text-emerald-300/80 font-normal">Ready for Admission</span>
              </div>
            </div>
            <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl">
              <CheckCircle className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-slate-800/80 border border-slate-700/80 p-5 rounded-2xl flex items-center justify-between">
            <div>
              <div className="text-xs text-slate-400 font-medium">Blood Reserves in Stock</div>
              <div className="text-2xl sm:text-3xl font-bold font-mono text-rose-400 mt-1">
                {totalBloodUnits} <span className="text-xs font-sans text-rose-300/80 font-normal">Tested Units</span>
              </div>
            </div>
            <div className="p-3 bg-rose-500/10 text-rose-400 rounded-xl">
              <Droplet className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Toggle Switch */}
        <div className="flex border-b border-slate-800 mb-6">
          <button
            onClick={() => setActiveTab('beds')}
            className={`pb-3 px-6 text-sm font-semibold transition-colors cursor-pointer flex items-center gap-2 ${
              activeTab === 'beds'
                ? 'border-b-2 border-blue-500 text-blue-400'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <BedDouble className="w-4 h-4" />
            <span>Inpatient & Critical Care Beds ({totalAvailable} Vacant)</span>
          </button>

          <button
            onClick={() => setActiveTab('blood')}
            className={`pb-3 px-6 text-sm font-semibold transition-colors cursor-pointer flex items-center gap-2 ${
              activeTab === 'blood'
                ? 'border-b-2 border-blue-500 text-blue-400'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Droplet className="w-4 h-4" />
            <span>Central Blood Bank Inventory</span>
          </button>
        </div>

        {/* Tab 1: Beds Grid */}
        {activeTab === 'beds' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {BED_CAPACITIES.map((bed, idx) => {
                const occupancyRate = Math.round((bed.occupied / bed.total) * 100);
                const isUrgent = bed.available <= 5;

                return (
                  <div 
                    key={idx}
                    className="bg-slate-800/70 border border-slate-700/70 rounded-xl p-4.5 flex flex-col justify-between hover:border-slate-600 transition-colors"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-xs font-semibold text-slate-300 truncate">
                          {bed.category}
                        </span>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                          isUrgent ? 'bg-amber-950 text-amber-300 border border-amber-700/50' : 'bg-emerald-950 text-emerald-300 border border-emerald-700/50'
                        }`}>
                          {bed.available} Available
                        </span>
                      </div>

                      <div className="flex items-baseline justify-between mt-3 mb-1">
                        <span className="text-2xl font-bold font-mono text-white">
                          {bed.available}
                        </span>
                        <span className="text-xs text-slate-400">
                          of {bed.total} {bed.unit}
                        </span>
                      </div>

                      {/* Progress bar */}
                      <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden mt-2">
                        <div 
                          className={`h-full rounded-full ${occupancyRate > 85 ? 'bg-amber-500' : 'bg-blue-500'}`}
                          style={{ width: `${occupancyRate}%` }}
                        />
                      </div>
                      <div className="flex justify-between items-center text-[11px] text-slate-400 mt-1.5 font-mono">
                        <span>{occupancyRate}% Occupied</span>
                        <span>{bed.occupied} admitted</span>
                      </div>
                    </div>

                    <div className="pt-4 mt-3 border-t border-slate-700/60 flex items-center justify-between text-xs">
                      <span className="text-slate-400 text-[11px]">24/7 Nurse Monitoring</span>
                      <button
                        onClick={onEmergencyBedRequest}
                        className="text-blue-400 hover:text-blue-300 font-semibold cursor-pointer"
                      >
                        Reserve Bay &rarr;
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Note box */}
            <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-4 flex items-start gap-3 text-xs text-slate-300">
              <Info className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
              <p>
                <strong>Admission Desk Note:</strong> Emergency beds for acute myocardial infarction (heart attack), stroke, and major trauma are held under reserve protocol and guaranteed zero delay. For planned admissions, contact the Central Admission Office at ext. 402 or Ground Floor Wing A.
              </p>
            </div>
          </div>
        )}

        {/* Tab 2: Blood Bank Grid */}
        {activeTab === 'blood' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {BLOOD_INVENTORY.map((item, index) => {
                const isCritical = item.status === 'Critical';
                const isModerate = item.status === 'Moderate';

                return (
                  <div 
                    key={index}
                    className={`rounded-2xl p-5 border transition-all flex flex-col justify-between ${
                      isCritical 
                        ? 'bg-rose-950/40 border-rose-700/80 shadow-md shadow-rose-900/20' 
                        : isModerate
                        ? 'bg-amber-950/30 border-amber-700/50'
                        : 'bg-slate-800/70 border-slate-700/70'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="text-base sm:text-lg font-bold text-white font-mono">
                        {item.group}
                      </div>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                        isCritical
                          ? 'bg-rose-600 text-white animate-pulse'
                          : isModerate
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                          : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      }`}>
                        {item.status}
                      </span>
                    </div>

                    <div className="my-2">
                      <div className="text-3xl font-black font-mono text-white">
                        {item.units}
                      </div>
                      <div className="text-xs text-slate-400 mt-0.5">
                        Units in cold storage
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-700/60 mt-2 flex items-center justify-between text-xs">
                      <span className="text-[11px] text-slate-400">Tested: NAT & ELISA</span>
                      {isCritical ? (
                        <button
                          onClick={onOpenBloodDonation}
                          className="text-xs font-bold text-rose-300 hover:text-white underline cursor-pointer"
                        >
                          Urgent Donor Need
                        </button>
                      ) : (
                        <span className="text-[11px] text-slate-400">Available</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="bg-blue-950/40 border border-blue-800/60 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-blue-400 shrink-0" />
                <div className="text-xs text-slate-300">
                  <strong>RH Hospital Voluntary Blood Donation Camp:</strong> Open 09:00 AM – 06:00 PM every day at Ground Floor Blood Center. Single donation saves up to 3 lives.
                </div>
              </div>
              <button
                onClick={onOpenBloodDonation}
                className="shrink-0 px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs rounded-lg transition-colors cursor-pointer whitespace-nowrap"
              >
                Register as Blood Donor
              </button>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
