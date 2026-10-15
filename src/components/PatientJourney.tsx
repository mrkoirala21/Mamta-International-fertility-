import React from 'react';
import { PATIENT_STEPS } from '../data/fertilityData';
import { Calendar, Stethoscope, Sparkles, Heart } from 'lucide-react';

interface PatientJourneyProps {
  onOpenBooking: () => void;
  language?: 'en' | 'ne';
}

export const PatientJourney: React.FC<PatientJourneyProps> = ({ onOpenBooking, language = 'en' }) => {
  return (
    <section className="py-16 md:py-24 bg-[#F9FAFC] border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="text-xs font-bold text-[#E48AA0] uppercase tracking-wider">
            {language === 'en' ? 'Your Roadmap to Parenthood' : 'उपचारको चरणबद्ध यात्रा'}
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1D3B58] tracking-tight">
            {language === 'en' ? 'Step-by-Step Patient Care Journey' : 'चरणबद्ध बिरामी हेरचाह प्रक्रिया'}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            {language === 'en'
              ? 'We demystify the IVF and fertility process into transparent, supportive milestones, ensuring you feel completely informed and reassured at every single step.'
              : 'पहिलो भेटदेखि सफल गर्भावस्थासम्मको हरेक चरणमा हामी तपाईंको साथमा हुनेछौं।'}
          </p>
        </div>

        {/* TIMELINE CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {PATIENT_STEPS.map((step, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 border border-slate-200/90 hover:border-[#E48AA0] transition-all duration-200 hover:shadow-md flex flex-col justify-between relative group"
            >
              <div className="space-y-4">
                {/* Step badge & timeline */}
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-extrabold text-[#E48AA0] font-mono tabular-nums">
                    {step.step}
                  </span>
                  <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md">
                    {step.timeline}
                  </span>
                </div>

                <h3 className="text-base font-bold text-[#1D3B58] group-hover:text-[#2B5A88] transition-colors leading-snug">
                  {language === 'en' ? step.title : step.nepaliTitle}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {step.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs text-[#1D3B58] font-semibold">
                <span>Phase {idx + 1} of 4</span>
                <span className="w-2 h-2 rounded-full bg-[#E48AA0]" />
              </div>
            </div>
          ))}
        </div>

        {/* BOTTOM REASSURANCE BANNER */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 text-center max-w-2xl mx-auto space-y-4 shadow-2xs">
          <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#FCEEF1] text-[#C96D83]">
            <Heart className="w-5 h-5" />
          </div>
          <h4 className="text-base font-bold text-[#1D3B58]">
            {language === 'en' ? 'Ready to Take Your First Step?' : 'आफ्नो पहिलो कदम चाल्न तयार हुनुहुन्छ?'}
          </h4>
          <p className="text-xs sm:text-sm text-slate-600">
            {language === 'en'
              ? 'Book an assessment with Dr. Anusha Tiwari or our clinical specialists. No obligations—just clear biological answers and honest guidance.'
              : 'कुनै बाध्यता छैन—मात्र स्पष्ट वैज्ञानिक मार्गदर्शन र ममतामयी सल्लाह।'}
          </p>
          <button
            onClick={onOpenBooking}
            className="inline-flex items-center gap-2 bg-[#E48AA0] hover:bg-[#D4748B] text-white px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all shadow-xs"
          >
            <Calendar className="w-4 h-4" />
            <span>Book Initial Diagnostic Consultation</span>
          </button>
        </div>

      </div>
    </section>
  );
};

export default PatientJourney;
