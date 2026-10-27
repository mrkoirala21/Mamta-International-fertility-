import React from 'react';
import { CONDITIONS, DOCTORS, Condition } from '../data/fertilityData';
import Breadcrumbs from '../components/Breadcrumbs';
import {
  Activity,
  AlertCircle,
  CheckCircle2,
  Calendar,
  ArrowRight,
  Stethoscope,
  Phone,
  HelpCircle,
  Sparkles,
} from 'lucide-react';

interface ConditionDetailPageProps {
  conditionId: string;
  onNavigate: (path: string) => void;
  onOpenBooking: (doctorName?: string, branchId?: string, treatment?: string) => void;
  language?: 'en' | 'ne';
}

export const ConditionDetailPage: React.FC<ConditionDetailPageProps> = ({
  conditionId,
  onNavigate,
  onOpenBooking,
  language = 'en',
}) => {
  const condition = CONDITIONS.find((c) => c.id === conditionId) || CONDITIONS[0];
  const specialist = DOCTORS.find((d) => d.id === condition.specialistId) || DOCTORS[0];
  const otherConditions = CONDITIONS.filter((c) => c.id !== condition.id).slice(0, 3);

  return (
    <div className="min-w-0 bg-[#F9FAFC] pb-20">
      {/* 1. BREADCRUMBS */}
      <div className="bg-white border-b border-slate-100">
        <Breadcrumbs
          items={[
            { label: 'Infertility Conditions', href: '/conditions' },
            { label: condition.title },
          ]}
          onNavigate={onNavigate}
        />
      </div>

      {/* 2. HERO */}
      <section className="bg-gradient-to-b from-white via-white to-[#F9FAFC] pt-10 pb-12 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
          <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-[#E48AA0] uppercase tracking-wider">
            <span>Clinical Infertility Guide</span>
            <span aria-hidden="true">·</span>
            <span>{condition.category === 'female' ? 'Female Factor' : condition.category === 'male' ? 'Male Factor' : 'Combined Factor'}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1D3B58] tracking-tight">
            {language === 'en' ? condition.title : condition.nepaliTitle}
          </h1>

          <p className="text-base sm:text-lg text-slate-600 font-medium max-w-3xl leading-relaxed">
            {condition.subtitle}
          </p>

          <p className="text-sm sm:text-base text-slate-700 leading-relaxed max-w-4xl pt-2">
            {condition.description}
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-4">
            <button
              onClick={() => onOpenBooking(specialist.name, 'chitwan', condition.title)}
              className="bg-[#E48AA0] hover:bg-[#D4748B] text-white px-6 py-3 rounded-xl font-bold text-sm shadow-sm transition-all hover:shadow-md cursor-pointer flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Schedule Diagnostic Consultation</span>
            </button>
            <a
              href="tel:056493798"
              className="bg-white hover:bg-slate-50 text-[#1D3B58] border border-slate-200 px-5 py-3 rounded-xl font-bold text-sm transition-colors cursor-pointer flex items-center gap-2"
            >
              <Phone className="w-4 h-4 text-[#E48AA0]" />
              <span>Hotline: 056-493798</span>
            </a>
          </div>
        </div>
      </section>

      {/* 3. SYMPTOMS & DIAGNOSTIC METHODS */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Common Symptoms */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 space-y-5 shadow-xs">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center shrink-0">
                <AlertCircle className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-[#1D3B58]">
                  Common Symptoms & Indicators
                </h2>
                <p className="text-xs text-slate-500">Signs that warrant specialist evaluation</p>
              </div>
            </div>

            <ul className="space-y-3 pt-2">
              {condition.symptoms.map((symptom, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-slate-700">
                  <span className="w-2 h-2 rounded-full bg-amber-500 mt-2 shrink-0" />
                  <span className="leading-relaxed">{symptom}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Diagnostic Investigations */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 space-y-5 shadow-xs">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-800 flex items-center justify-center shrink-0">
                <Activity className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-[#1D3B58]">
                  Diagnostic Investigations at Mamta
                </h2>
                <p className="text-xs text-slate-500">Precision tests available at Maulakalika Hospital</p>
              </div>
            </div>

            <ul className="space-y-3 pt-2">
              {condition.diagnosticMethods.map((method, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-sky-600 mt-0.5 shrink-0" />
                  <span className="leading-relaxed">{method}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 4. RECOMMENDED TREATMENT PATHWAYS */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 space-y-6 shadow-xs">
          <div>
            <span className="text-xs font-bold text-[#E48AA0] uppercase tracking-wider block">
              Evidence-Based Pathways
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-[#1D3B58] mt-1">
              Treatment Options Available for {condition.title.split('(')[0].trim()}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Tailored protocols implemented by our reproductive medicine and surgical panel.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {condition.recommendedTreatments.map((rec, idx) => (
              <div
                key={idx}
                className="bg-[#F9FAFC] border border-slate-200 rounded-2xl p-5 space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <span className="text-xs font-extrabold text-[#E48AA0]">
                    Option 0{idx + 1}
                  </span>
                  <h3 className="text-base font-bold text-[#1D3B58]">
                    {rec.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {rec.description}
                  </p>
                </div>

                {rec.treatmentId && (
                  <button
                    onClick={() => onNavigate(`/treatments/${rec.treatmentId}`)}
                    className="text-xs font-bold text-[#1D3B58] hover:text-[#E48AA0] flex items-center gap-1 cursor-pointer pt-2"
                  >
                    <span>Read Treatment Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 5. CONSULTING SPECIALIST INSIGHT */}
        <div className="bg-gradient-to-r from-[#1D3B58] to-[#2B5A88] text-white rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6 shadow-md">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden shrink-0 border-2 border-white/20">
            {specialist.image ? (
              <img
                src={specialist.image}
                alt={specialist.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-top"
              />
            ) : (
              <div className="w-full h-full bg-white/10 flex items-center justify-center font-bold text-2xl">
                {specialist.name.split(' ')[1]?.[0] || 'D'}
              </div>
            )}
          </div>

          <div className="flex-1 space-y-2 text-center sm:text-left">
            <span className="text-xs font-bold text-[#E48AA0] uppercase tracking-wider block">
              Doctor's Clinical Insight
            </span>
            <p className="text-sm sm:text-base italic leading-relaxed text-slate-100">
              "{condition.expertQuote}"
            </p>
            <div className="text-xs text-slate-300 pt-1">
              <strong className="text-white">{specialist.name}</strong> · {specialist.role}
            </div>
          </div>

          <button
            onClick={() => onOpenBooking(specialist.name, 'chitwan', condition.title)}
            className="bg-[#E48AA0] hover:bg-[#D4748B] text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-colors cursor-pointer shrink-0 shadow-sm"
          >
            Consult with Doctor
          </button>
        </div>

        {/* 6. OTHER CONDITIONS */}
        <div className="space-y-6 pt-6 border-t border-slate-200/80">
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-bold text-[#1D3B58]">
              Other Infertility Conditions We Treat
            </h2>
            <button
              onClick={() => onNavigate('/conditions')}
              className="text-xs font-bold text-[#E48AA0] hover:text-[#C96D83] flex items-center gap-1 cursor-pointer"
            >
              <span>View All Conditions</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {otherConditions.map((c) => (
              <div
                key={c.id}
                onClick={() => onNavigate(`/conditions/${c.id}`)}
                className="bg-white rounded-2xl border border-slate-200 p-5 space-y-3 hover:border-[#E48AA0] hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-[#E48AA0] uppercase tracking-wider block">
                    {c.category} factor
                  </span>
                  <h3 className="font-bold text-base text-[#1D3B58] group-hover:text-[#2B5A88] transition-colors">
                    {c.title}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-2">
                    {c.summary}
                  </p>
                </div>

                <div className="pt-2 text-xs font-bold text-[#E48AA0] flex items-center gap-1">
                  <span>Learn Diagnosis & Care</span>
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

export default ConditionDetailPage;
