import React from 'react';
import { COST_PACKAGES } from '../data/fertilityData';
import {
  ShieldCheck,
  Check,
  Sparkles,
  HelpCircle,
  ArrowRight,
  Phone,
  MessageSquare,
  AlertCircle,
  Calendar,
  Layers,
  Heart,
  FileText
} from 'lucide-react';

interface PricingPageProps {
  onOpenBooking: (doctorName?: string, branchId?: string, treatmentName?: string) => void;
  language?: 'en' | 'ne';
}

export const PricingPage: React.FC<PricingPageProps> = ({ onOpenBooking, language = 'en' }) => {
  return (
    <div className="space-y-16 pb-20">
      {/* 1. HERO HEADER */}
      <section className="bg-gradient-to-b from-[#1D3B58] to-[#122538] text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-semibold bg-white/10 text-[#E48AA0] px-3.5 py-1.5 rounded-full">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>{language === 'en' ? 'Transparent Reproductive Care' : 'पारदर्शी तथा गुणस्तरीय उपचार'}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            {language === 'en'
              ? 'Fertility Treatment Packages & Clinical Plans'
              : 'निःसन्तानता उपचार प्याकेजहरू तथा क्लिनिकल योजना'}
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
            {language === 'en'
              ? 'At Mamata International Fertility Centre, every clinical protocol is tailored to each couple’s specific biology. We provide itemized, comprehensive treatment packages with a strict 100% no-hidden-fee guarantee.'
              : 'ममता इन्टरनेसनलमा हरेक बिरामीको शारीरिक अवस्था अनुसार व्यक्तिगत उपचार योजना बनाइन्छ। उपचार सुरु हुनुअघि नै सम्पूर्ण क्लिनिकल सेवाहरूको पारदर्शी विवरण प्रदान गरिन्छ।'}
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-slate-300">
            <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg border border-white/10">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Itemized Upfront Estimates</span>
            </span>
            <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg border border-white/10">
              <Heart className="w-4 h-4 text-[#E48AA0]" />
              <span>Zero Surprise Lab Additions</span>
            </span>
            <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg border border-white/10">
              <Layers className="w-4 h-4 text-sky-400" />
              <span>Flexible Stage-Wise Billing</span>
            </span>
          </div>
        </div>
      </section>

      {/* 2. PACKAGES GRID (PRICES HIDDEN - FOCUSED ON INCLUSIONS & TAILORED CONSULTATION) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-bold text-[#E48AA0] uppercase tracking-wider">
            All-Inclusive Clinical Packages
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1D3B58] tracking-tight">
            Comprehensive Treatment Plans
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Select a treatment package below to view complete clinical inclusions or request a detailed personalized itemized quote from our Chitwan care team.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {COST_PACKAGES.map((pkg) => (
            <div
              key={pkg.id}
              className={`rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all relative ${
                pkg.popular
                  ? 'bg-white border-2 border-[#E48AA0] shadow-xl ring-4 ring-[#E48AA0]/10'
                  : 'bg-white border border-slate-200 shadow-xs hover:border-slate-300'
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#E48AA0] text-white text-[11px] font-extrabold uppercase tracking-wider py-1 px-3.5 rounded-full shadow-xs">
                  Most Chosen Comprehensive Plan
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-[#1D3B58]">{pkg.name}</h3>
                  <p className="text-xs text-slate-500 font-medium mt-1">{pkg.subtitle}</p>
                </div>

                {/* TAILORED PRICING BADGE (NUMERIC PRICE HIDDEN) */}
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
                  <div className="text-xs text-[#C96D83] font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Personalized Clinical Package</span>
                  </div>
                  <div className="text-lg font-bold text-[#1D3B58]">
                    Transparent Upfront Quote
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    Itemized estimate provided upon clinical evaluation with zero hidden charges.
                  </p>
                </div>

                {/* INCLUSIONS */}
                <div className="space-y-2 text-xs">
                  <span className="font-bold text-slate-800 uppercase tracking-wider text-[11px] block">
                    What is Fully Included:
                  </span>
                  <ul className="space-y-2">
                    {pkg.includes.map((inc, i) => (
                      <li key={i} className="flex items-start gap-2 text-slate-600">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="leading-snug">{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* EXCLUSIONS / VARIABLES */}
                <div className="space-y-2 text-xs pt-4 border-t border-slate-100">
                  <span className="font-bold text-slate-500 uppercase tracking-wider text-[11px] block">
                    Variable or Excluded:
                  </span>
                  <ul className="space-y-1.5">
                    {pkg.excludes.map((exc, i) => (
                      <li key={i} className="flex items-start gap-2 text-slate-500 text-[11px]">
                        <span className="text-slate-400 font-bold">•</span>
                        <span className="leading-snug">{exc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* ACTION BUTTON */}
              <div className="pt-6 mt-6 border-t border-slate-100 space-y-2">
                <button
                  onClick={() => onOpenBooking(undefined, 'chitwan', pkg.name)}
                  className={`w-full py-3 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    pkg.popular
                      ? 'bg-[#E48AA0] hover:bg-[#D4748B] text-white shadow-md'
                      : 'bg-[#1D3B58] hover:bg-[#2B5A88] text-white'
                  }`}
                >
                  <Calendar className="w-4 h-4" />
                  <span>Request Package Quote & Consult</span>
                </button>
                <div className="grid grid-cols-2 gap-2 text-center">
                  <a
                    href="tel:056493798"
                    className="py-2 px-2 bg-slate-50 hover:bg-slate-100 text-[#1D3B58] rounded-lg text-[11px] font-bold border border-slate-200 transition-colors flex items-center justify-center gap-1"
                  >
                    <Phone className="w-3 h-3 text-[#E48AA0]" />
                    <span>056-493798</span>
                  </a>
                  <a
                    href={`https://wa.me/9779855088798?text=Hello%20Mamata%20IVF,%20I%20would%20like%20to%20inquire%20about%20the%20${encodeURIComponent(
                      pkg.name
                    )}%20package.`}
                    target="_blank"
                    rel="noreferrer"
                    className="py-2 px-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-lg text-[11px] font-bold border border-emerald-200 transition-colors flex items-center justify-center gap-1"
                  >
                    <MessageSquare className="w-3 h-3 text-emerald-600" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. HONEST MEDICATION & PERSONALIZATION EXPLANATION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FCEEF1] border border-[#F5D8E0] rounded-3xl p-6 sm:p-10 space-y-4">
          <div className="flex items-center gap-2 text-[#C96D83] font-bold text-sm">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>Why Pricing is Personalized to Each Couple</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            In reproductive endocrinology, hormone stimulation protocols depend entirely on each patient’s ovarian reserve (AMH), antral follicle count (AFC), age, and metabolic profile. A couple requiring gentle minimal stimulation requires very different pharmaceutical dosage compared to another protocol.
          </p>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            Unlike commercial centres that advertise unrealistic flat fees that unexpectedly inflate during your cycle with hidden lab or anesthesia surcharges, Mamata International guarantees full price transparency. You will receive an exact itemized breakdown following your initial medical assessment at Maulakalika Hospital Chitwan before any cycle begins.
          </p>
        </div>
      </section>

      {/* 4. FINANCIAL COUNSELING & MULTI-PHASE BILLING */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 space-y-6 text-center max-w-3xl mx-auto shadow-xs">
          <h3 className="text-2xl font-bold text-[#1D3B58]">
            Need Stage-by-Stage Billing or Financial Guidance?
          </h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            Our patient financial counselors at Maulakalika Hospital Chitwan can structure multi-phase cycle billing (Assessment → Follicular Stimulation → Egg Retrieval & Embryology → Embryo Transfer) so that you only invest as each milestone is reached.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <a
              href="tel:056493798"
              className="bg-[#1D3B58] hover:bg-[#2B5A88] text-white px-6 py-3 rounded-xl font-bold text-xs sm:text-sm transition-colors flex items-center gap-2"
            >
              <Phone className="w-4 h-4 text-[#E48AA0]" />
              <span>Call Pricing & Counseling Desk: 056-493798</span>
            </a>
            <a
              href="https://wa.me/9779855088798?text=Hello%20Mamata%20IVF,%20I%20would%20like%20more%20details%20on%20treatment%20packages%20and%20financial%20counseling."
              target="_blank"
              rel="noreferrer"
              className="bg-[#25D366] hover:bg-[#1EBE5D] text-white px-6 py-3 rounded-xl font-bold text-xs sm:text-sm transition-colors flex items-center gap-2 shadow-xs"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp Inquiries (9855088798)</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PricingPage;
