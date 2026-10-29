import React from 'react';
import { TREATMENTS, DOCTORS, Treatment } from '../data/fertilityData';
import Breadcrumbs from '../components/Breadcrumbs';
import {
  Calendar,
  Clock,
  Award,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Stethoscope,
  Microscope,
  Phone,
  HelpCircle,
  Sparkles,
} from 'lucide-react';

interface TreatmentDetailPageProps {
  treatmentId: string;
  onNavigate: (path: string) => void;
  onOpenBooking: (doctorName?: string, branchId?: string, treatment?: string) => void;
  language?: 'en' | 'ne';
}

export const TreatmentDetailPage: React.FC<TreatmentDetailPageProps> = ({
  treatmentId,
  onNavigate,
  onOpenBooking,
  language = 'en',
}) => {
  const treatment = TREATMENTS.find((t) => t.id === treatmentId) || TREATMENTS[0];

  // Map relevant specialist
  const leadDoctor =
    treatment.category === 'male'
      ? DOCTORS.find((d) => d.id === 'dr-suresh') || DOCTORS[0]
      : treatment.category === 'surgical'
      ? DOCTORS.find((d) => d.id === 'dr-ramesh-poudel') || DOCTORS[0]
      : DOCTORS.find((d) => d.id === 'dr-anusha') || DOCTORS[0];

  const otherTreatments = TREATMENTS.filter((t) => t.id !== treatment.id).slice(0, 3);

  return (
    <div className="min-w-0 bg-[#F9FAFC] pb-20">
      {/* 1. BREADCRUMBS */}
      <div className="bg-white border-b border-slate-100">
        <Breadcrumbs
          items={[
            { label: 'Fertility Treatments', href: '/fertility-treatments' },
            { label: treatment.title },
          ]}
          onNavigate={onNavigate}
        />
      </div>

      {/* 2. HERO BANNER */}
      <section className="bg-gradient-to-b from-white via-white to-[#F9FAFC] pt-10 pb-12 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-[#E48AA0] uppercase tracking-wider">
            <span>Specialized Clinical Program</span>
            <span aria-hidden="true">·</span>
            <span>{treatment.badge}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2 space-y-4">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1D3B58] tracking-tight">
                {language === 'en' ? treatment.title : treatment.nepaliTitle}
              </h1>
              <p className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed">
                {treatment.subtitle}
              </p>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed pt-2">
                {treatment.description}
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-4">
                <button
                  onClick={() => onOpenBooking(leadDoctor.name, 'chitwan', treatment.title)}
                  className="bg-[#E48AA0] hover:bg-[#D4748B] text-white px-6 py-3 rounded-xl font-bold text-sm shadow-sm transition-all hover:shadow-md cursor-pointer flex items-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Consultation for {treatment.title.split(' ')[0]}</span>
                </button>
                <a
                  href="tel:056493798"
                  className="bg-white hover:bg-slate-50 text-[#1D3B58] border border-slate-200 px-5 py-3 rounded-xl font-bold text-sm transition-colors cursor-pointer flex items-center gap-2"
                >
                  <Phone className="w-4 h-4 text-[#E48AA0]" />
                  <span>Helpline: 056-493798</span>
                </a>
              </div>
            </div>

            {/* QUICK FACTS CARD */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-xs">
              <h3 className="text-sm font-bold text-[#1D3B58] uppercase tracking-wider border-b border-slate-100 pb-3">
                Clinical Fast Facts
              </h3>

              <div className="space-y-3.5 text-xs">
                <div>
                  <span className="text-slate-400 block font-medium">Estimated Timeline</span>
                  <span className="text-[#1D3B58] font-bold text-sm">{treatment.duration}</span>
                </div>

                <div>
                  <span className="text-slate-400 block font-medium">Expected Success Outcome</span>
                  <span className="text-emerald-700 font-bold text-sm">{treatment.successIndicator}</span>
                </div>

                <div>
                  <span className="text-slate-400 block font-medium">Embryology Technology</span>
                  <span className="text-slate-700 font-semibold">{treatment.techHighlight}</span>
                </div>

                <div className="pt-2 border-t border-slate-100">
                  <span className="text-slate-400 block font-medium">Consulting Department</span>
                  <span className="text-[#1D3B58] font-bold">{leadDoctor.role.split('&')[0]}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CLINICAL INDICATIONS & PROCESS STEPS */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Who Is This Treatment Ideal For? */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 space-y-5 shadow-xs">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#FCEEF1] text-[#C96D83] flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-[#1D3B58]">
                  Who Is This Treatment Ideal For?
                </h2>
                <p className="text-xs text-slate-500">Clinical eligibility and indications</p>
              </div>
            </div>

            <ul className="space-y-3 pt-2">
              {treatment.idealFor.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-slate-700">
                  <span className="w-2 h-2 rounded-full bg-[#E48AA0] mt-2 shrink-0" />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Step-by-Step Procedure Workflow */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 space-y-5 shadow-xs">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-800 flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-[#1D3B58]">
                  Step-by-Step Clinical Process
                </h2>
                <p className="text-xs text-slate-500">What to expect throughout your treatment</p>
              </div>
            </div>

            <div className="space-y-4 pt-2">
              {treatment.processSteps.map((step, idx) => (
                <div key={idx} className="flex items-start gap-3.5">
                  <div className="w-7 h-7 rounded-lg bg-slate-100 text-[#1D3B58] font-extrabold text-xs flex items-center justify-center shrink-0">
                    {idx + 1}
                  </div>
                  <div className="text-sm text-slate-700 leading-relaxed pt-0.5">
                    {step}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 4. PRIMARY CONSULTING SPECIALIST */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs">
          <div className="text-xs font-bold text-[#E48AA0] uppercase tracking-wider mb-2">
            Clinical Leadership
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#1D3B58] mb-6">
            Primary Consulting Specialist for {treatment.title}
          </h2>

          <div className="flex flex-col sm:flex-row items-start gap-6 bg-[#F9FAFC] p-6 rounded-2xl border border-slate-200">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden bg-slate-200 shrink-0 border border-slate-200 shadow-2xs">
              {leadDoctor.image ? (
                <img
                  src={leadDoctor.image}
                  alt={leadDoctor.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top"
                  loading="lazy"
                  decoding="async"
                  width={112}
                  height={112}
                />
              ) : (
                <div className="w-full h-full bg-[#1D3B58] text-white flex items-center justify-center font-bold text-2xl">
                  {leadDoctor.name.split(' ')[1]?.[0] || 'D'}
                </div>
              )}
            </div>

            <div className="flex-1 space-y-2">
              <div className="flex flex-wrap items-baseline gap-2">
                <h3 className="text-lg font-bold text-[#1D3B58]">{leadDoctor.name}</h3>
                <span className="text-xs font-semibold text-[#E48AA0]">{leadDoctor.role}</span>
              </div>
              <p className="text-xs text-slate-500 font-medium">{leadDoctor.qualifications}</p>
              <p className="text-sm text-slate-600 leading-relaxed pt-1">{leadDoctor.bio}</p>

              <div className="flex flex-wrap items-center gap-4 pt-3 text-xs text-slate-600">
                <span>Availability: <strong className="text-[#1D3B58]">{leadDoctor.availableDays}</strong></span>
                <span aria-hidden="true">·</span>
                <span>Satisfaction: <strong className="text-emerald-700">{leadDoctor.patientSatisfaction}</strong></span>
              </div>

              <div className="flex flex-wrap gap-3 pt-3">
                <button
                  onClick={() => onOpenBooking(leadDoctor.name, 'chitwan', treatment.title)}
                  className="bg-[#E48AA0] hover:bg-[#D4748B] text-white px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                >
                  Consult with {leadDoctor.name.split(' ')[1]}
                </button>
                <button
                  onClick={() => onNavigate(`/doctors/${leadDoctor.id}`)}
                  className="bg-white hover:bg-slate-100 text-[#1D3B58] border border-slate-200 px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                >
                  View Full Profile & Credentials
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 5. EXPLORE OTHER FERTILITY TREATMENTS */}
        <div className="space-y-6 pt-6 border-t border-slate-200/80">
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-bold text-[#1D3B58]">
              Related Fertility Services
            </h2>
            <button
              onClick={() => onNavigate('/fertility-treatments')}
              className="text-xs font-bold text-[#E48AA0] hover:text-[#C96D83] flex items-center gap-1 cursor-pointer"
            >
              <span>View All Treatments</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {otherTreatments.map((t) => (
              <div
                key={t.id}
                onClick={() => onNavigate(`/treatments/${t.id}`)}
                className="bg-white rounded-2xl border border-slate-200 p-5 space-y-3 hover:border-[#E48AA0] hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-[#E48AA0] uppercase tracking-wider block">
                    {t.badge}
                  </span>
                  <h3 className="font-bold text-base text-[#1D3B58] group-hover:text-[#2B5A88] transition-colors">
                    {t.title}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-2">
                    {t.summary}
                  </p>
                </div>

                <div className="pt-2 text-xs font-bold text-[#E48AA0] flex items-center gap-1">
                  <span>Explore Program</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TreatmentDetailPage;
