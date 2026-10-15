import React, { useState } from 'react';
import { TREATMENTS, Treatment } from '../data/fertilityData';
import { ArrowRight, CheckCircle2, Clock, Sparkles, X, Activity, ShieldAlert } from 'lucide-react';

interface TreatmentsSectionProps {
  onSelectTreatmentForBooking: (treatmentTitle: string) => void;
  onNavigateToServicePage: (treatmentId: string) => void;
  language?: 'en' | 'ne';
}

export const TreatmentsSection: React.FC<TreatmentsSectionProps> = ({
  onSelectTreatmentForBooking,
  onNavigateToServicePage,
  language = 'en',
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeModalTreatment, setActiveModalTreatment] = useState<Treatment | null>(null);

  const categories = [
    { id: 'all', label: language === 'en' ? 'All Treatments' : 'सबै सेवाहरू' },
    { id: 'assisted', label: language === 'en' ? 'IVF & Embryology' : 'आई.भी.एफ. र प्रविधि' },
    { id: 'preservation', label: language === 'en' ? 'Fertility Freezing' : 'फ्रिजिङ (Preservation)' },
    { id: 'male', label: language === 'en' ? 'Male Infertility' : 'पुरुष निःसन्तानता' },
    { id: 'surgical', label: language === 'en' ? 'Laparoscopy Surgery' : 'ल्यापारोस्कोपी शल्यक्रिया' },
  ];

  const filteredTreatments =
    selectedCategory === 'all'
      ? TREATMENTS
      : TREATMENTS.filter((t) => t.category === selectedCategory);

  return (
    <section id="treatments" className="py-16 md:py-24 bg-[#F9FAFC] border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="text-xs font-bold text-[#E48AA0] uppercase tracking-wider">
            {language === 'en' ? 'Evidence-Based Reproductive Medicine' : 'प्रमाण-आधारित प्रजनन चिकित्सा'}
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1D3B58] tracking-tight">
            {language === 'en' ? 'Fertility Services & Advanced Treatments' : 'प्रजनन सेवा तथा अत्याधुनिक उपचारहरू'}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            {language === 'en'
              ? 'From gentle first-line IUI to complex microsurgical ICSI and blastocyst culturing, our protocols are personalized around your individual biological markers.'
              : 'सामान्य IUI देखि जटिल ICSI, ब्लास्टोसिस्ट कल्चर र ल्यापारोस्कोपीसम्म सम्पूर्ण उपचार अन्तर्राष्ट्रिय मापदण्ड अनुसार उपलब्ध छ।'}
          </p>

          {/* FILTER TABS */}
          <div className="pt-4 flex items-center justify-center flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-[#1D3B58] text-white shadow-sm'
                    : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* TREATMENTS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTreatments.map((treatment) => (
            <div
              key={treatment.id}
              className="bg-white rounded-2xl p-6 border border-slate-200/90 hover:border-[#E48AA0] transition-all duration-200 hover:shadow-md flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold tracking-wider uppercase text-[#C96D83] bg-[#FCEEF1] px-2.5 py-0.5 rounded-full">
                    {treatment.badge}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">
                    {treatment.duration}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-[#1D3B58] group-hover:text-[#2B5A88] transition-colors">
                    {language === 'en' ? treatment.title : treatment.nepaliTitle}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 font-medium">
                    {treatment.subtitle}
                  </p>
                </div>

                <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">
                  {treatment.summary}
                </p>

                {/* Ideal for list */}
                <div className="space-y-1.5 pt-2">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                    Recommended For:
                  </span>
                  {treatment.idealFor.slice(0, 2).map((item, i) => (
                    <div key={i} className="flex items-start gap-1.5 text-xs text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="line-clamp-1">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* ACTION BUTTONS */}
              <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between gap-2">
                <button
                  onClick={() => onNavigateToServicePage(treatment.id)}
                  className="text-xs font-bold text-[#1D3B58] hover:text-[#E48AA0] transition-colors flex items-center gap-1 bg-slate-50 hover:bg-[#FCEEF1] px-3 py-1.5 rounded-lg border border-slate-200"
                >
                  <span>View Dedicated Page</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => onSelectTreatmentForBooking(treatment.title)}
                  className="bg-[#E48AA0] hover:bg-[#D4748B] text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors shadow-2xs whitespace-nowrap"
                >
                  Book Inquiries
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* TREATMENT DETAILS MODAL */}
      {activeModalTreatment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden my-8 animate-in fade-in zoom-in-95">
            {/* Modal Header */}
            <div className="bg-[#1D3B58] text-white p-6 relative">
              <button
                onClick={() => setActiveModalTreatment(null)}
                className="absolute top-5 right-5 p-1.5 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <span className="text-xs font-semibold text-[#E48AA0] uppercase tracking-wider">
                {activeModalTreatment.badge} · Clinical Protocol
              </span>
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight mt-1">
                {activeModalTreatment.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-200 mt-1">
                {activeModalTreatment.subtitle}
              </p>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto text-xs sm:text-sm">
              <div>
                <h4 className="font-bold text-slate-900 text-sm mb-2">Overview</h4>
                <p className="text-slate-600 leading-relaxed">
                  {activeModalTreatment.description}
                </p>
              </div>

              {/* Step by step process */}
              <div>
                <h4 className="font-bold text-slate-900 text-sm mb-3">Clinical Workflow & Steps</h4>
                <div className="space-y-2.5">
                  {activeModalTreatment.processSteps.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200/80">
                      <span className="w-6 h-6 rounded-full bg-[#1D3B58] text-white flex items-center justify-center text-xs font-bold shrink-0">
                        {idx + 1}
                      </span>
                      <span className="text-slate-700 leading-snug">{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Candidates */}
              <div>
                <h4 className="font-bold text-slate-900 text-sm mb-2">Who Is This Recommended For?</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {activeModalTreatment.idealFor.map((item, i) => (
                    <div key={i} className="flex items-center gap-2 bg-emerald-50 text-emerald-900 p-2.5 rounded-lg border border-emerald-100">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Highlights strip */}
              <div className="p-4 bg-[#FCEEF1] rounded-xl border border-[#F5D8E0] space-y-2 text-xs">
                <div className="flex items-center gap-2 font-bold text-[#C96D83]">
                  <Sparkles className="w-4 h-4" />
                  <span>Key Technology & Success Indicator</span>
                </div>
                <div className="text-slate-700">
                  <strong>Expected Benchmark:</strong> {activeModalTreatment.successIndicator}
                </div>
                <div className="text-slate-700">
                  <strong>Lab Infrastructure:</strong> {activeModalTreatment.techHighlight}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3">
              <span className="text-xs text-slate-500 font-medium">
                Cycle Duration: {activeModalTreatment.duration}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveModalTreatment(null)}
                  className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-800"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    const title = activeModalTreatment.title;
                    setActiveModalTreatment(null);
                    onSelectTreatmentForBooking(title);
                  }}
                  className="bg-[#E48AA0] hover:bg-[#D4748B] text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-colors shadow-2xs"
                >
                  Schedule Consultation for this Treatment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default TreatmentsSection;
