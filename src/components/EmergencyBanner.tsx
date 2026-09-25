import React from 'react';
import { Phone, Ambulance, Droplet, Clock } from 'lucide-react';

interface EmergencyBannerProps {
  onOpenEmergency: () => void;
  onOpenBloodBank: () => void;
}

export const EmergencyBanner: React.FC<EmergencyBannerProps> = ({
  onOpenEmergency,
  onOpenBloodBank
}) => {
  return (
    <div className="bg-slate-900 text-slate-200 border-b border-slate-800 text-xs py-2 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-y-2 gap-x-4">
        
        {/* Left: Emergency Status & Contact */}
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 font-medium text-rose-400">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
            24/7 Level-1 Trauma & Code Stroke Resuscitation Active
          </span>
          <span className="hidden md:inline text-slate-600">·</span>
          <a 
            href="tel:1066" 
            className="hidden md:flex items-center gap-1.5 text-white font-semibold hover:text-rose-300 transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-rose-400" />
            <span>Toll-Free Helpline: 1066 / +1 (800) 744-6774</span>
          </a>
        </div>

        {/* Right: Quick actions */}
        <div className="flex items-center gap-4 text-xs">
          <button
            onClick={onOpenEmergency}
            className="flex items-center gap-1 text-rose-300 hover:text-white transition-colors cursor-pointer"
          >
            <Ambulance className="w-3.5 h-3.5 text-rose-400" />
            <span className="underline decoration-rose-500/50 underline-offset-2">Live Ambulance Dispatch</span>
          </button>
          <span className="text-slate-700">|</span>
          <button
            onClick={onOpenBloodBank}
            className="flex items-center gap-1 text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            <Droplet className="w-3.5 h-3.5 text-red-400" />
            <span>Blood Bank Status</span>
          </button>
          <span className="text-slate-700 hidden sm:inline">|</span>
          <span className="hidden sm:flex items-center gap-1 text-slate-400">
            <Clock className="w-3.5 h-3.5 text-slate-500" />
            <span>OPD: 08:00 AM – 08:00 PM</span>
          </span>
        </div>

      </div>
    </div>
  );
};
