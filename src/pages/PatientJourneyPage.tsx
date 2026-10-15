import React from 'react';
import { PATIENT_STEPS } from '../data/fertilityData';
import {
  Calendar,
  Stethoscope,
  Sparkles,
  Heart,
  CheckCircle2,
  Clock,
  Phone,
  MessageSquare,
  FileText,
  MapPin,
  ArrowRight,
} from 'lucide-react';

interface PatientJourneyPageProps {
  onOpenBooking: (doctorName?: string, branchId?: string, treatmentName?: string) => void;
  language?: 'en' | 'ne';
}

export const PatientJourneyPage: React.FC<PatientJourneyPageProps> = ({
  onOpenBooking,
  language = 'en',
}) => {
  return (
    <div className="space-y-16 pb-20">
      {/* 1. HERO HEADER */}
      <section className="bg-gradient-to-b from-[#1D3B58] to-[#122538] text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-semibold bg-white/10 text-[#E48AA0] px-3.5 py-1.5 rounded-full">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Clear Clinical Roadmap</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            Your Step-by-Step Journey to Parenthood
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
            We understand that starting fertility treatment can feel daunting. Here is the transparent, caring 4-phase clinical pathway you will experience with Dr. Anusha Tiwari and our team at Maulakalika Hospital Chitwan.
          </p>
        </div>
      </section>

      {/* 2. TIMELINE STEPS */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="relative border-l-2 border-[#E48AA0]/40 pl-6 sm:pl-10 space-y-12 ml-4 sm:ml-6">
          {PATIENT_STEPS.map((st) => (
            <div key={st.step} className="relative group">
              {/* TIMELINE BADGE NUMBER */}
              <div className="absolute -left-[35px] sm:-left-[51px] top-0 w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-[#1D3B58] text-[#E48AA0] border-4 border-white shadow-md flex items-center justify-center font-extrabold text-sm sm:text-base">
                {st.step}
              </div>

              {/* STEP CONTENT CARD */}
              <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs hover:border-[#E48AA0] transition-all space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#C96D83] bg-[#FCEEF1] px-3 py-0.5 rounded-full">
                    Phase {st.step}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{st.timeline}</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#1D3B58]">
                    {language === 'en' ? st.title : st.nepaliTitle}
                  </h3>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {st.description}
                </p>

                <div className="p-3.5 bg-slate-50 rounded-2xl text-xs flex items-center gap-2 text-slate-600">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Personalized guidance under Dr. Anusha Tiwari & clinical embryology staff.</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. FIRST VISIT PREPARATION CHECKLIST */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#1D3B58] text-white rounded-3xl p-8 sm:p-10 space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold text-[#E48AA0] uppercase tracking-wider flex items-center gap-1.5">
              <FileText className="w-4 h-4" />
              <span>What to Bring for Your First Visit</span>
            </span>
            <h3 className="text-2xl font-bold">
              Preparing for Your Consultation at Maulakalika Hospital Chitwan
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              To make your first consultation as comprehensive and efficient as possible, please bring:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-200">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#E48AA0] shrink-0" />
              <span>Previous semen analysis reports (if any)</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#E48AA0] shrink-0" />
              <span>Previous pelvic ultrasound scans or HSG reports</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#E48AA0] shrink-0" />
              <span>Details of previous medications or IVF/IUI cycles</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#E48AA0] shrink-0" />
              <span>Government-issued ID cards for both partners</span>
            </div>
          </div>

          <div className="pt-4 border-t border-white/10 flex flex-wrap gap-4 items-center justify-between">
            <div>
              <p className="text-xs text-slate-300">
                Direct Consultation Hotline: <strong className="text-white font-mono">056-493798</strong>
              </p>
              <p className="text-xs text-emerald-400 font-semibold">
                WhatsApp Desk: <strong className="font-mono">9855088798</strong>
              </p>
            </div>
            <button
              onClick={() => onOpenBooking()}
              className="bg-[#E48AA0] hover:bg-[#D4748B] text-white px-6 py-3 rounded-xl font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Step 1 Consultation</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PatientJourneyPage;
