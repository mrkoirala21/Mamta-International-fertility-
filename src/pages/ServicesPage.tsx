import React, { useState } from 'react';
import { TREATMENTS, Treatment } from '../data/fertilityData';
import FertilityCounselingSection from '../components/FertilityCounselingSection';
import MaternityCareSection from '../components/MaternityCareSection';
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  Sparkles,
  Activity,
  Calendar,
  Layers,
  ChevronRight,
  ExternalLink,
  Users,
} from 'lucide-react';

interface ServicesPageProps {
  onNavigate: (page: string, param?: string) => void;
  onOpenBooking: (doctorName?: string, branchId?: string, treatmentName?: string) => void;
  language?: 'en' | 'ne';
}

export const ServicesPage: React.FC<ServicesPageProps> = ({
  onNavigate,
  onOpenBooking,
  language = 'en',
}) => {
  const [activeCategory, setActiveCategory] = useState<
    'all' | 'assisted' | 'preservation' | 'male' | 'surgical'
  >('all');

  const filteredTreatments =
    activeCategory === 'all'
      ? TREATMENTS
      : TREATMENTS.filter((t) => t.category === activeCategory);

  const categories = [
    { id: 'all', label: 'All Services (7)' },
    { id: 'assisted', label: 'Assisted Reproduction (IVF/ICSI/Blastocyst)' },
    { id: 'preservation', label: 'Fertility Preservation' },
    { id: 'male', label: 'Male Infertility & Andrology' },
    { id: 'surgical', label: 'Fertility Surgery (Laparoscopy)' },
  ];

  return (
    <div className="space-y-16 pb-20">
      {/* 1. HERO HEADER */}
      <section className="bg-gradient-to-b from-[#1D3B58] to-[#122538] text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-semibold bg-white/10 text-[#E48AA0] px-3.5 py-1.5 rounded-full">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Comprehensive Reproductive Programs</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            Fertility Services & Advanced Treatments
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
            Every couple’s path to parenthood is unique. At our Maulakalika Hospital Chitwan facility, we provide tailor-made clinical solutions ranging from gentle IUI to robotic ICSI and testicular sperm extraction.
          </p>
          <div className="pt-2 text-xs text-[#E48AA0] font-semibold flex items-center gap-2">
            <span>✨ Each treatment below has its own dedicated in-depth page</span>
          </div>
        </div>
      </section>

      {/* 2. CATEGORY FILTER TABS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as any)}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-[#1D3B58] text-white shadow-sm ring-2 ring-[#E48AA0]'
                  : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      {/* 3. TREATMENT CARDS GRID WITH DIRECT DEDICATED PAGE LINKS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTreatments.map((tr) => (
            <div
              key={tr.id}
              className="bg-white rounded-2xl border border-slate-200/90 hover:border-[#E48AA0] p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#C96D83] bg-[#FCEEF1] px-2.5 py-0.5 rounded-full">
                    {tr.badge}
                  </span>
                  <div className="flex items-center gap-1 text-xs text-slate-500 font-medium">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{tr.duration}</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-[#1D3B58] group-hover:text-[#2B5A88] transition-colors">
                    {tr.title}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">
                    {tr.subtitle}
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                  {tr.summary}
                </p>

                <div className="p-3 bg-slate-50 rounded-xl space-y-1.5 text-xs">
                  <div className="flex items-center gap-1.5 font-semibold text-slate-800">
                    <Activity className="w-3.5 h-3.5 text-[#E48AA0]" />
                    <span>Clinical Success Metric:</span>
                  </div>
                  <p className="text-slate-600">{tr.successIndicator}</p>
                </div>

                <div className="space-y-1 text-xs">
                  <span className="font-semibold text-slate-700 block">Ideal Candidates:</span>
                  <ul className="space-y-1">
                    {tr.idealFor.slice(0, 2).map((item, idx) => (
                      <li key={idx} className="flex items-start gap-1.5 text-slate-500">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* ACTION LINKS */}
              <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between gap-3">
                <button
                  onClick={() => onNavigate('service', tr.id)}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 bg-[#1D3B58] hover:bg-[#2B5A88] text-white py-2.5 px-3 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                >
                  <span>Open {tr.title.split(' ')[0]} Page</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#E48AA0]" />
                </button>
                <button
                  onClick={() => onOpenBooking(undefined, 'chitwan', tr.title)}
                  className="bg-[#E48AA0] hover:bg-[#D4748B] text-white py-2.5 px-3.5 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                >
                  Book Slot
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. TREATMENT SELECTION GUIDE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#F9FAFC] rounded-3xl border border-slate-200 p-8 sm:p-12 space-y-8">
          <div className="max-w-3xl space-y-2">
            <span className="text-xs font-bold text-[#E48AA0] uppercase tracking-wider">
              Patient Guidance
            </span>
            <h3 className="text-2xl font-bold text-[#1D3B58]">
              Which Treatment is Right for You?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              We never perform unnecessary high-level procedures when simpler interventions can succeed. Here is how our specialists evaluate treatment readiness:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs sm:text-sm">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-3">
              <span className="font-bold text-base text-[#1D3B58] block">Step 1: IUI</span>
              <p className="text-slate-600">
                Recommended for younger couples with at least one open fallopian tube, mild male factor, or unexplained infertility of under 2 years.
              </p>
              <button
                onClick={() => onNavigate('service', 'iui')}
                className="text-xs font-bold text-[#C96D83] hover:underline flex items-center gap-1"
              >
                <span>Read IUI Details</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-3">
              <span className="font-bold text-base text-[#1D3B58] block">Step 2: IVF & ICSI</span>
              <p className="text-slate-600">
                Recommended for blocked fallopian tubes, low ovarian reserve, severe sperm motility/count issues, or failed IUI cycles.
              </p>
              <button
                onClick={() => onNavigate('service', 'ivf')}
                className="text-xs font-bold text-[#C96D83] hover:underline flex items-center gap-1"
              >
                <span>Read IVF Details</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-3">
              <span className="font-bold text-base text-[#1D3B58] block">Step 3: Surgical TESA / Micro-TESE</span>
              <p className="text-slate-600">
                For men with azoospermia (zero sperm in semen), directly retrieving viable sperm from testicular tissue for ICSI fertilization.
              </p>
              <button
                onClick={() => onNavigate('service', 'male-infertility')}
                className="text-xs font-bold text-[#C96D83] hover:underline flex items-center gap-1"
              >
                <span>Read Male Infertility Details</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FERTILITY COUNSELING, INVESTIGATION & TREATMENT */}
      <FertilityCounselingSection
        onOpenBooking={onOpenBooking}
        onNavigate={onNavigate}
        language={language}
      />

      {/* 5. COMPLETE CARE FROM CONCEPTION TO DELIVERY */}
      <MaternityCareSection
        onOpenBooking={onOpenBooking}
        onNavigate={onNavigate}
        language={language}
      />

      {/* 6. NAVIGATION CTA STRIP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4 max-w-3xl mx-auto">
          <h3 className="text-xl sm:text-2xl font-bold text-[#1D3B58]">
            {language === 'en' ? 'Have Questions About Which Treatment is Right for You?' : 'तपाईंको लागि कुन उपचार उपयुक्त हुन्छ?'}
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {language === 'en'
              ? 'Our specialists offer individualized diagnostic evaluations at Maulakalika Hospital Chitwan. Discuss your timeline with our fertility doctors or maternal care team.'
              : 'हाम्रा विशेषज्ञ डाक्टरहरूसँग परामर्श गरी आफ्नो अवस्था अनुसारको स्पष्ट मार्गनिर्देशन लिनुहोस्।'}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => onOpenBooking(undefined, 'chitwan', 'General Services Consultation')}
              className="bg-[#E48AA0] hover:bg-[#D4748B] text-white px-6 py-3 rounded-xl font-bold text-xs sm:text-sm shadow-sm transition-all cursor-pointer flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Book an Appointment</span>
            </button>
            <button
              onClick={() => onNavigate('doctors')}
              className="bg-[#1D3B58] hover:bg-[#2B5A88] text-white px-5 py-3 rounded-xl font-bold text-xs sm:text-sm transition-colors cursor-pointer flex items-center gap-2"
            >
              <Users className="w-4 h-4 text-[#E48AA0]" />
              <span>Meet Our Doctors</span>
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="border border-slate-300 hover:border-[#1D3B58] text-slate-700 px-5 py-3 rounded-xl font-semibold text-xs sm:text-sm transition-colors cursor-pointer"
            >
              <span>Contact Us</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;

