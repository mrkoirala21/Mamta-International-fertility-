import React, { useState } from 'react';
import { CONDITIONS, Condition } from '../data/fertilityData';
import Breadcrumbs from '../components/Breadcrumbs';
import {
  ArrowRight,
  AlertCircle,
  Activity,
  CheckCircle2,
  Calendar,
  Sparkles,
  Phone,
} from 'lucide-react';

interface ConditionsHubPageProps {
  onNavigate: (path: string) => void;
  onOpenBooking: (doctorName?: string, branchId?: string, treatment?: string) => void;
  language?: 'en' | 'ne';
}

export const ConditionsHubPage: React.FC<ConditionsHubPageProps> = ({
  onNavigate,
  onOpenBooking,
  language = 'en',
}) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'female' | 'male' | 'combined'>('all');

  const filtered = activeCategory === 'all'
    ? CONDITIONS
    : CONDITIONS.filter((c) => c.category === activeCategory);

  return (
    <div className="min-w-0 bg-[#F9FAFC] pb-20">
      <div className="bg-white border-b border-slate-100">
        <Breadcrumbs
          items={[{ label: 'Infertility Conditions' }]}
          onNavigate={onNavigate}
        />
      </div>

      {/* HERO */}
      <section className="bg-gradient-to-b from-white to-[#F9FAFC] pt-12 pb-14 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5 text-center max-w-4xl">
          <div className="text-xs font-bold text-[#E48AA0] uppercase tracking-wider">
            Clinical Diagnostic Scope
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1D3B58] tracking-tight">
            Understanding Infertility Conditions & Root Causes
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Infertility is a physiological medical condition, not a personal shortcoming. Our clinical panel pinpoints the exact biological factors affecting conception and delivers targeted evidence-based treatments.
          </p>

          {/* FILTER BUTTONS */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeCategory === 'all'
                  ? 'bg-[#1D3B58] text-white shadow-xs'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              All Conditions ({CONDITIONS.length})
            </button>
            <button
              onClick={() => setActiveCategory('female')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeCategory === 'female'
                  ? 'bg-[#1D3B58] text-white shadow-xs'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              Female Infertility (PCOS, Endometriosis, Tubes)
            </button>
            <button
              onClick={() => setActiveCategory('male')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeCategory === 'male'
                  ? 'bg-[#1D3B58] text-white shadow-xs'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              Male Factor & Azoospermia
            </button>
            <button
              onClick={() => setActiveCategory('combined')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeCategory === 'combined'
                  ? 'bg-[#1D3B58] text-white shadow-xs'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              Implantation Failure & Complex Factors
            </button>
          </div>
        </div>
      </section>

      {/* CONDITIONS GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl border border-slate-200/90 hover:border-[#E48AA0] p-6 sm:p-7 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-5 group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-extrabold text-[#E48AA0] uppercase tracking-wider">
                    {item.category === 'female' ? 'Female Factor' : item.category === 'male' ? 'Male Factor' : 'Combined Factor'}
                  </span>
                  <span className="text-slate-400 font-medium">{item.symptoms.length} Symptoms Tracked</span>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-[#1D3B58] group-hover:text-[#2B5A88] transition-colors">
                    {language === 'en' ? item.title : item.nepaliTitle}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium mt-1">{item.subtitle}</p>
                </div>

                <p className="text-sm text-slate-600 leading-relaxed">
                  {item.summary}
                </p>

                <div className="space-y-1.5 pt-2 border-t border-slate-100">
                  <span className="text-xs font-bold text-[#1D3B58] block">Key Diagnostic Tests:</span>
                  {item.diagnosticMethods.slice(0, 2).map((m, i) => (
                    <div key={i} className="text-xs text-slate-600 flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="line-clamp-1">{m}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                <button
                  onClick={() => onNavigate(`/conditions/${item.id}`)}
                  className="bg-[#1D3B58] hover:bg-[#2B5A88] text-white px-4 py-2.5 rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <span>Detailed Clinical Guide</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => onOpenBooking(undefined, 'chitwan', item.title)}
                  className="text-xs font-bold text-[#E48AA0] hover:text-[#C96D83] cursor-pointer"
                >
                  Consult
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* BOTTOM HELP BANNER */}
        <div className="mt-16 bg-gradient-to-r from-[#FCEEF1] to-[#FFF6F8] rounded-3xl p-8 sm:p-10 border border-[#E48AA0]/30 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center sm:text-left">
            <h3 className="text-xl sm:text-2xl font-bold text-[#1D3B58]">
              Unsure which diagnosis applies to your situation?
            </h3>
            <p className="text-sm text-slate-600 max-w-2xl">
              Our lead fertility counselor and medical doctors will review your past medical reports and conduct a non-invasive diagnostic roadmap on your first visit.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 shrink-0">
            <button
              onClick={() => onOpenBooking()}
              className="bg-[#E48AA0] hover:bg-[#D4748B] text-white px-6 py-3 rounded-xl font-bold text-xs sm:text-sm shadow-sm transition-all cursor-pointer"
            >
              Book Initial Evaluation
            </button>
            <a
              href="tel:056493798"
              className="bg-white hover:bg-slate-50 text-[#1D3B58] border border-slate-200 px-5 py-3 rounded-xl font-bold text-xs sm:text-sm transition-colors cursor-pointer flex items-center gap-2"
            >
              <Phone className="w-4 h-4 text-[#E48AA0]" />
              <span>Call 056-493798</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ConditionsHubPage;
