import React, { useState, useEffect } from 'react';
import OvulationCalculator from '../components/OvulationCalculator';
import DueDateCalculator from '../components/DueDateCalculator';
import {
  Calculator,
  Calendar,
  Baby,
  Heart,
  Sparkles,
  Phone,
  MessageSquare,
  ShieldCheck,
  CheckCircle2,
  MapPin,
  Clock,
  ArrowRight,
  Info,
} from 'lucide-react';

interface CalculatorsPageProps {
  onOpenBooking: (doctorName?: string, branchId?: string, treatmentName?: string) => void;
  language?: 'en' | 'ne';
  initialTab?: 'ovulation' | 'due-date';
}

export const CalculatorsPage: React.FC<CalculatorsPageProps> = ({
  onOpenBooking,
  language = 'en',
  initialTab,
}) => {
  // Check URL query or hash if any
  const [activeTab, setActiveTab] = useState<'ovulation' | 'due-date'>(() => {
    if (initialTab) return initialTab;
    if (typeof window !== 'undefined') {
      const p = window.location.pathname;
      if (p.includes('ovulation')) return 'ovulation';
      if (p.includes('due-date') || p.includes('pregnancy')) return 'due-date';
    }
    return 'ovulation';
  });

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  return (
    <div className="space-y-12 pb-20">
      {/* 1. HERO BANNER */}
      <section className="bg-gradient-to-b from-[#1D3B58] to-[#122538] text-white py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-semibold bg-white/10 text-[#E48AA0] px-3.5 py-1.5 rounded-full">
            <Calculator className="w-3.5 h-3.5" />
            <span>Interactive Reproductive Tools & Calculators</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            Fertility & Pregnancy Calculators
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
            Clinically verified reproductive medicine tools developed for prospective and expecting parents. Calculate your peak fertile window or your accurate pregnancy due date and ultrasound scan milestones at Maulakalika Hospital, Chitwan.
          </p>

          {/* TAB BUTTONS */}
          <div className="pt-4 flex flex-wrap gap-3">
            <button
              onClick={() => setActiveTab('ovulation')}
              className={`px-5 py-3 rounded-2xl font-bold text-sm transition-all flex items-center gap-2.5 cursor-pointer ${
                activeTab === 'ovulation'
                  ? 'bg-[#E48AA0] text-white shadow-lg shadow-pink-900/30 ring-2 ring-white/20'
                  : 'bg-white/10 hover:bg-white/20 text-slate-200'
              }`}
            >
              <Heart className="w-4 h-4" />
              <span>1. Ovulation & Fertile Window Tracker</span>
            </button>

            <button
              onClick={() => setActiveTab('due-date')}
              className={`px-5 py-3 rounded-2xl font-bold text-sm transition-all flex items-center gap-2.5 cursor-pointer ${
                activeTab === 'due-date'
                  ? 'bg-[#E48AA0] text-white shadow-lg shadow-pink-900/30 ring-2 ring-white/20'
                  : 'bg-white/10 hover:bg-white/20 text-slate-200'
              }`}
            >
              <Baby className="w-4 h-4" />
              <span>2. Due Date & IVF Gestational Calculator</span>
            </button>
          </div>
        </div>
      </section>

      {/* 2. ACTIVE CALCULATOR RENDER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {activeTab === 'ovulation' ? (
          <OvulationCalculator
            onOpenBookingForConsultation={(doc, br, tr) => onOpenBooking(doc, br, tr)}
            language={language}
          />
        ) : (
          <DueDateCalculator
            onOpenBookingForScan={(scanName) =>
              onOpenBooking('Dr. Ramesh Ghimire', 'chitwan', scanName || 'Pregnancy Ultrasound Scan')
            }
            language={language}
          />
        )}
      </section>

      {/* 3. CLINICAL EXPERTISE BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#F9FAFC] rounded-3xl border border-slate-200 p-8 sm:p-10 space-y-6">
          <div className="max-w-3xl space-y-2">
            <span className="text-xs font-bold text-[#E48AA0] uppercase tracking-wider">
              Specialized Care at Maulakalika Hospital Chitwan
            </span>
            <h3 className="text-2xl font-bold text-[#1D3B58]">
              From Pre-Conception Planning to High-Resolution 5D Scans
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Whether you are timing intercourse with our ovulation tracker or tracking gestational milestones following an IVF Day 5 Blastocyst transfer, our team provides full-spectrum clinical care with state-of-the-art ultrasound, hormone diagnostics, and dedicated obstetricians.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-2">
              <span className="font-bold text-[#1D3B58] text-sm block">1. Follicular Tracking (TVS)</span>
              <p className="text-slate-600">
                Monitors dominant follicle development (18–20 mm) and endometrial thickness. Supervised directly by Dr. Anusha Tiwari.
              </p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-2">
              <span className="font-bold text-[#1D3B58] text-sm block">2. Early Viability & NT Scan</span>
              <p className="text-slate-600">
                Confirms crown-rump length, embryonic heartbeat, and nuchal translucency with Dr. Ramesh Ghimire on 5D GE Voluson™ ultrasound.
              </p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-2">
              <span className="font-bold text-[#1D3B58] text-sm block">3. Full Antenatal & Postnatal Care</span>
              <p className="text-slate-600">
                Continuous medical monitoring through pregnancy, high-risk obstetric management, delivery, and post-birth infant care.
              </p>
            </div>
          </div>

          <div className="pt-4 flex flex-wrap gap-4 items-center justify-between border-t border-slate-200">
            <div className="flex items-center gap-2 text-xs text-slate-600">
              <MapPin className="w-4 h-4 text-[#E48AA0]" />
              <span>Maulakalika Hospital Pvt. Ltd., Bharatpur-11, Chitwan, Nepal</span>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => onOpenBooking('Dr. Anusha Tiwari', 'chitwan', 'Fertility Consultation')}
                className="bg-[#1D3B58] hover:bg-[#2B5A88] text-white px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>Book Doctor Consultation</span>
              </button>
              <a
                href="https://wa.me/9779855088798"
                target="_blank"
                rel="noreferrer"
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp: 9855088798</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CalculatorsPage;
