import React, { useState } from 'react';
import { TREATMENTS, Treatment, DOCTORS, BRANCHES } from '../data/fertilityData';
import {
  ArrowLeft,
  Calendar,
  Phone,
  CheckCircle2,
  Clock,
  Sparkles,
  ShieldCheck,
  ChevronRight,
  Stethoscope,
  MapPin,
  HelpCircle,
  Banknote,
  Activity,
  Heart,
  MessageCircle,
  MessageSquare,
} from 'lucide-react';

interface ServiceDetailPageProps {
  treatmentId: string;
  onBackToHome: () => void;
  onSelectTreatment: (treatmentId: string) => void;
  onOpenBooking: (doctorName?: string, branchId?: string, treatmentName?: string) => void;
  language?: 'en' | 'ne';
}

export const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({
  treatmentId,
  onBackToHome,
  onSelectTreatment,
  onOpenBooking,
  language = 'en',
}) => {
  const treatment = TREATMENTS.find((t) => t.id === treatmentId) || TREATMENTS[0];
  const primaryBranch = BRANCHES[0]; // Maulakalika Hospital Chitwan

  // Doctor recommended for this treatment
  const relevantDoctor =
    treatment.id === 'male-infertility'
      ? DOCTORS.find((d) => d.id === 'dr-suresh') || DOCTORS[0]
      : treatment.id === 'laparoscopy'
      ? DOCTORS.find((d) => d.id === 'dr-priya') || DOCTORS[0]
      : treatment.id === 'blastocyst' || treatment.id === 'icsi'
      ? DOCTORS.find((d) => d.id === 'dr-bikash') || DOCTORS[0]
      : DOCTORS[0]; // Dr. Anusha Tiwari

  // Package pricing details specific to this treatment
  const pricingInfo = {
    ivf: {
      plan: 'Complete IVF / ICSI Program',
      quote: 'Itemized Quote on Consultation',
      note: 'All-inclusive laboratory, egg retrieval, blastocyst culture, and 1 year cryo-storage included.',
    },
    icsi: {
      plan: 'ICSI Precision Micromanipulation',
      quote: 'Included in Core IVF Program',
      note: 'Single-sperm micromanipulation included within the core IVF program.',
    },
    iui: {
      plan: 'IUI Natural / Stimulated Protocol',
      quote: 'Itemized Quote on Consultation',
      note: 'Includes ultrasound follicular monitoring, density-gradient semen wash & intrauterine catheter placement.',
    },
    blastocyst: {
      plan: 'Day 5 Blastocyst Extended Incubation',
      quote: 'Standard in IVF Cycles',
      note: 'Extended 5-day multi-gas incubator culture standard for all qualifying cycles.',
    },
    cryopreservation: {
      plan: 'Egg / Embryo Cryopreservation Program',
      quote: 'Itemized Quote on Consultation',
      note: 'Includes oocyte retrieval under twilight sedation and liquid nitrogen tank cryo-banking.',
    },
    'male-infertility': {
      plan: 'Andrology Microsurgical Package (TESA/PESA)',
      quote: 'Itemized Quote on Consultation',
      note: 'Day-care microsurgical TESA/PESA aspiration, stereomicroscope search & embryology isolation.',
    },
    laparoscopy: {
      plan: 'Advanced Laparoscopic / Hysteroscopic Surgery',
      quote: 'Itemized Quote on Consultation',
      note: 'Minimally-invasive 3D keyhole fertility surgery by senior laparoscopic gynecologist.',
    },
  }[treatment.id] || {
    plan: 'Personalized Clinical Protocol',
    quote: 'Consult Specialist for Quote',
    note: 'Transparent itemized breakdown provided prior to starting.',
  };

  return (
    <div className="min-h-screen bg-[#F9FAFC] pb-24">
      {/* TOP SUB-HEADER & BREADCRUMB */}
      <div className="bg-[#1D3B58] text-white py-4 px-4 sm:px-6 lg:px-8 border-b border-[#2A4D70]">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-200 hover:text-white bg-white/10 hover:bg-white/20 px-3.5 py-1.5 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>← Back to All Services & Home</span>
          </button>

          <div className="flex items-center gap-2 text-xs text-slate-300">
            <MapPin className="w-3.5 h-3.5 text-[#E48AA0]" />
            <span className="font-semibold text-white">
              Maulakalika Hospital Pvt. Ltd., Bharatpur-11, Chitwan
            </span>
            <span className="hidden sm:inline">|</span>
            <a href="tel:056493798" className="hidden sm:inline text-slate-200 hover:text-white font-mono">
              056-493798
            </a>
            <span className="hidden sm:inline">|</span>
            <a href="tel:9855088798" className="text-[#E48AA0] hover:underline font-bold font-mono">
              9855088798
            </a>
          </div>
        </div>
      </div>

      {/* SERVICE HERO BANNER */}
      <div className="bg-gradient-to-b from-[#1D3B58] to-[#24476B] text-white pt-10 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#E48AA0] bg-white/10 px-3 py-1 rounded-full">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Dedicated Clinical Program · {treatment.badge}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
                {language === 'en' ? treatment.title : treatment.nepaliTitle}
              </h1>

              <p className="text-base sm:text-lg text-slate-200 max-w-2xl leading-relaxed">
                {treatment.subtitle}
              </p>

              {/* QUICK CLINICAL METRICS */}
              <div className="pt-2 flex flex-wrap gap-4 text-xs">
                <div className="bg-white/10 px-3.5 py-2 rounded-xl border border-white/10">
                  <span className="text-slate-300 block text-[11px]">Cycle Duration:</span>
                  <span className="font-bold text-white">{treatment.duration}</span>
                </div>
                <div className="bg-white/10 px-3.5 py-2 rounded-xl border border-white/10">
                  <span className="text-slate-300 block text-[11px]">Clinical Benchmark:</span>
                  <span className="font-bold text-emerald-300">{treatment.successIndicator}</span>
                </div>
                <div className="bg-white/10 px-3.5 py-2 rounded-xl border border-white/10">
                  <span className="text-slate-300 block text-[11px]">Primary Location:</span>
                  <span className="font-bold text-white">Bharatpur-11, Chitwan</span>
                </div>
              </div>
            </div>

            {/* HERO CTA ACTION CARD */}
            <div className="lg:col-span-4 bg-white text-slate-900 rounded-2xl p-6 shadow-xl space-y-4 border border-white/30">
              <div className="space-y-1">
                <span className="text-xs font-semibold text-[#C96D83] uppercase tracking-wider block">
                  Book For This Service
                </span>
                <h3 className="text-lg font-bold text-[#1D3B58]">
                  Consultation at Maulakalika Hospital
                </h3>
                <p className="text-xs text-slate-500">
                  Private one-on-one evaluation with personalized diagnostic ultrasound.
                </p>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 text-xs space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Treatment Plan:</span>
                  <span className="font-bold text-[#1D3B58]">{pricingInfo.plan}</span>
                </div>
                <div className="flex items-center justify-between text-emerald-700 font-semibold">
                  <span>Transparent Fee:</span>
                  <span>{pricingInfo.quote}</span>
                </div>
              </div>

              <button
                onClick={() => onOpenBooking(relevantDoctor.name, 'chitwan', treatment.title)}
                className="w-full bg-[#E48AA0] hover:bg-[#D4748B] text-white py-3 rounded-xl font-bold text-sm shadow-sm transition-all flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Consultation for {treatment.id.toUpperCase()}</span>
              </button>

              <div className="text-center">
                <a
                  href="tel:9855088798"
                  className="inline-flex items-center gap-1.5 text-xs text-[#1D3B58] font-bold hover:text-[#E48AA0]"
                >
                  <Phone className="w-3.5 h-3.5 text-[#E48AA0]" />
                  <span>Direct Hotline: 9855088798</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* MAIN SINGLE-SERVICE CONTENT CONTAINER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT 8 COLS: IN-DEPTH CLINICAL CONTENT FOR THIS SINGLE SERVICE */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* 1. OVERVIEW & DESCRIPTION */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-xs">
              <h2 className="text-xl font-bold text-[#1D3B58] flex items-center gap-2">
                <Stethoscope className="w-5 h-5 text-[#E48AA0]" />
                <span>About {treatment.title}</span>
              </h2>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                {treatment.description}
              </p>
              <div className="p-4 bg-[#FCEEF1] rounded-xl border border-[#F5D8E0] text-xs text-slate-700 space-y-1">
                <span className="font-bold text-[#C96D83] block">
                  Embryology & Technology Standard:
                </span>
                <p>{treatment.techHighlight}</p>
              </div>
            </div>

            {/* 2. WHO IS THIS SERVICE RECOMMENDED FOR */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-xs">
              <h2 className="text-xl font-bold text-[#1D3B58] flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>Who is a Candidate for {treatment.title}?</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                Our specialists recommend this procedure under the following clinical circumstances:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {treatment.idealFor.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 flex items-start gap-2.5 text-xs sm:text-sm text-slate-800"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. STEP-BY-STEP CLINICAL WORKFLOW */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
              <div>
                <h2 className="text-xl font-bold text-[#1D3B58] flex items-center gap-2">
                  <Activity className="w-5 h-5 text-[#E48AA0]" />
                  <span>Step-by-Step Clinical Procedure</span>
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  What you will experience during this treatment at our Chitwan Flagship Centre:
                </p>
              </div>

              <div className="space-y-4">
                {treatment.processSteps.map((step, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-4 p-4 rounded-xl bg-[#F9FAFC] border border-slate-200/80"
                  >
                    <div className="w-8 h-8 rounded-full bg-[#1D3B58] text-white flex items-center justify-center font-bold text-sm shrink-0">
                      {idx + 1}
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-bold text-sm text-[#1D3B58]">Phase {idx + 1}</h4>
                      <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">{step}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. TRANSPARENT PACKAGES & INCLUSIONS FOR THIS SPECIFIC SERVICE */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-xs">
              <h2 className="text-xl font-bold text-[#1D3B58] flex items-center gap-2">
                <Banknote className="w-5 h-5 text-emerald-600" />
                <span>Transparent Treatment Package & Inclusions</span>
              </h2>
              
              <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-xs text-emerald-800 font-bold uppercase tracking-wider block">
                    Clinical Plan & Upfront Guarantee
                  </span>
                  <div className="text-xl font-extrabold text-[#1D3B58] mt-0.5">
                    {pricingInfo.plan} · <span className="text-emerald-700 font-bold text-sm">{pricingInfo.quote}</span>
                  </div>
                </div>
                <button
                  onClick={() => onOpenBooking(relevantDoctor.name, 'chitwan', treatment.title)}
                  className="bg-[#1D3B58] hover:bg-[#152B40] text-white px-5 py-2.5 rounded-xl font-bold text-xs shadow-xs shrink-0 cursor-pointer"
                >
                  Request Itemized Quote
                </button>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                {pricingInfo.note} At Mamata International, we guarantee zero hidden medical bills or unexpected lab additions.
              </p>
            </div>

            {/* 5. LEAD SPECIALIST FOR THIS SERVICE */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-xs">
              <span className="text-xs font-bold text-[#E48AA0] uppercase tracking-wider block">
                Primary Consulting Specialist
              </span>
              <div className="flex flex-col sm:flex-row items-center gap-5">
                <div className="w-20 h-20 rounded-2xl bg-slate-200 overflow-hidden shrink-0 border border-slate-200 shadow-2xs">
                  {relevantDoctor.image ? (
                    <img
                      src={relevantDoctor.image}
                      alt={relevantDoctor.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-[#1D3B58] text-white flex items-center justify-center font-bold text-xl">
                      {relevantDoctor.name.split(' ')[1]?.[0] || 'D'}
                    </div>
                  )}
                </div>

                <div className="space-y-1 text-center sm:text-left flex-1">
                  <h3 className="text-lg font-bold text-[#1D3B58]">{relevantDoctor.name}</h3>
                  <p className="text-xs font-semibold text-[#E48AA0]">{relevantDoctor.role}</p>
                  <p className="text-[11px] text-slate-500">{relevantDoctor.qualifications}</p>
                  <p className="text-xs text-slate-600 line-clamp-2 mt-1">{relevantDoctor.bio}</p>
                </div>

                <button
                  onClick={() => onOpenBooking(relevantDoctor.name, 'chitwan', treatment.title)}
                  className="bg-[#E48AA0] hover:bg-[#D4748B] text-white px-4 py-2.5 rounded-xl font-bold text-xs transition-colors shrink-0"
                >
                  Book with {relevantDoctor.name.split(' ')[1]}
                </button>
              </div>
            </div>

          </div>

          {/* RIGHT 4 COLS: SERVICE NAVIGATOR & CLINIC DETAILS */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* SERVICE SWITCHER MENU: SINGLE PAGE FOR EACH SERVICE */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3">
              <h3 className="font-bold text-sm text-[#1D3B58] uppercase tracking-wider pb-2 border-b border-slate-100">
                Explore Other Services
              </h3>
              <div className="space-y-1.5">
                {TREATMENTS.map((t) => {
                  const isActive = t.id === treatment.id;
                  return (
                    <button
                      key={t.id}
                      onClick={() => onSelectTreatment(t.id)}
                      className={`w-full text-left p-3 rounded-xl text-xs font-semibold flex items-center justify-between transition-all ${
                        isActive
                          ? 'bg-[#1D3B58] text-white shadow-xs font-bold'
                          : 'bg-slate-50 hover:bg-[#FCEEF1] text-slate-700 hover:text-[#C96D83]'
                      }`}
                    >
                      <span className="line-clamp-1">{t.title}</span>
                      <ChevronRight className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#E48AA0]' : 'text-slate-400'}`} />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* CHITWAN HOSPITAL CONTACT CARD */}
            <div className="bg-[#FCEEF1] rounded-2xl border border-[#F5D8E0] p-5 space-y-4">
              <div className="flex items-center gap-2 font-bold text-[#C96D83] text-xs uppercase tracking-wider">
                <MapPin className="w-4 h-4" />
                <span>Chitwan Centre Location</span>
              </div>

              <div>
                <h4 className="font-bold text-sm text-[#1D3B58]">
                  Maulakalika Hospital Pvt. Ltd.
                </h4>
                <p className="text-xs text-slate-600 mt-1">
                  Bharatpur-11, Chitwan, Nepal
                </p>
              </div>

              <div className="space-y-2 text-xs text-slate-700 pt-2 border-t border-[#F5D8E0]">
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-[#E48AA0]" />
                  <span>Hotline: <strong className="font-mono">056-493798</strong> | <strong className="font-mono">056-493738</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                  <span>WhatsApp: <strong className="font-mono text-emerald-700">9855088798</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-[#E48AA0]" />
                  <span>Sun–Fri: 7:30 AM – 7:30 PM</span>
                </div>
              </div>

              <div className="pt-2 flex flex-col gap-2">
                <a
                  href="tel:9855088798"
                  className="w-full bg-[#1D3B58] text-white py-2.5 rounded-xl font-bold text-xs text-center hover:bg-[#152B40] transition-colors"
                >
                  Call 9855088798
                </a>
                <a
                  href="https://wa.me/9779855088798"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full border border-[#E48AA0] text-[#C96D83] py-2.5 rounded-xl font-bold text-xs text-center hover:bg-white transition-colors"
                >
                  WhatsApp Consultation
                </a>
              </div>
            </div>

            {/* RETURN BUTTON */}
            <div className="p-4 bg-white rounded-2xl border border-slate-200 text-center">
              <button
                onClick={onBackToHome}
                className="text-xs font-bold text-[#1D3B58] hover:text-[#E48AA0] hover:underline"
              >
                ← Return to Mamata Fertility Home Page
              </button>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default ServiceDetailPage;
