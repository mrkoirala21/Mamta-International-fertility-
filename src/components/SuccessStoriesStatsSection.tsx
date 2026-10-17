import React from 'react';
import { MAMTA_SUCCESS_STATS } from '../data/fertilityData';
import {
  Heart,
  Sparkles,
  Users,
  ShieldCheck,
  Calendar,
  ArrowRight,
  Info,
  Clock,
} from 'lucide-react';

interface SuccessStoriesStatsSectionProps {
  onOpenBooking: (doctorName?: string, branchId?: string, treatmentName?: string) => void;
  onNavigate?: (page: string) => void;
  language?: 'en' | 'ne';
}

export const SuccessStoriesStatsSection: React.FC<SuccessStoriesStatsSectionProps> = ({
  onOpenBooking,
  onNavigate,
  language = 'en',
}) => {
  return (
    <section id="success-stories" className="py-16 md:py-24 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-[#C96D83] bg-[#FCEEF1] px-3.5 py-1 rounded-full uppercase tracking-wider">
            <Heart className="w-3.5 h-3.5" />
            <span>{language === 'en' ? 'Clinical Milestones' : 'सफलताका कोशेढुङ्गाहरू'}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1D3B58] tracking-tight">
            {language === 'en' ? MAMTA_SUCCESS_STATS.heading : MAMTA_SUCCESS_STATS.nepaliHeading}
          </h2>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            {language === 'en' ? MAMTA_SUCCESS_STATS.subheading : 'मौलकालिका अस्पताल चितवनमा ममता सेन्टरप्रति विश्वास गर्नुहुने दम्पतीहरूका वास्तविक उपलब्धिहरू।'}
          </p>
        </div>

        {/* COMPASSIONATE QUOTE BANNER */}
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-[#FCEEF1]/70 via-white to-[#FCEEF1]/70 rounded-3xl p-6 sm:p-8 border border-[#E48AA0]/40 text-center shadow-2xs space-y-3">
          <p className="text-base sm:text-lg font-medium text-[#1D3B58] italic leading-relaxed">
            {language === 'en' ? MAMTA_SUCCESS_STATS.quote : MAMTA_SUCCESS_STATS.nepaliQuote}
          </p>
          <div className="flex items-center justify-center gap-2 text-xs text-[#C96D83] font-bold">
            <span>Mamta International Fertility Center</span>
            <span>·</span>
            <span>Maulakalika Hospital, Bharatpur</span>
          </div>
        </div>

        {/* VERIFIED STATISTIC CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {MAMTA_SUCCESS_STATS.items.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl border-2 border-slate-200/90 hover:border-[#E48AA0] p-8 shadow-xs hover:shadow-md transition-all duration-300 text-center flex flex-col justify-between space-y-6 group"
            >
              <div className="space-y-3">
                {/* TIMELINE PERIOD BADGE */}
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1D3B58] bg-slate-100 px-3 py-1 rounded-full">
                  <Clock className="w-3.5 h-3.5 text-[#E48AA0]" />
                  <span>{item.period}</span>
                </div>

                {/* NUMBER */}
                <div className="text-5xl sm:text-6xl font-extrabold text-[#1D3B58] group-hover:text-[#C96D83] transition-colors tabular-nums tracking-tight">
                  {item.stat}
                </div>

                {/* TITLE & SUBTITLE */}
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-[#1D3B58]">
                    {language === 'en' ? item.title : item.nepaliTitle}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#C96D83] font-semibold mt-0.5">
                    {language === 'en' ? item.subtitle : item.nepaliSubtitle}
                  </p>
                </div>
              </div>

              {/* VERIFICATION BADGE */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-center gap-1.5 text-[11px] text-slate-500 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>{item.verificationStatus}</span>
              </div>
            </div>
          ))}
        </div>

        {/* CLINICAL TRANSPARENCY DISCLAIMER */}
        <div className="max-w-3xl mx-auto p-4 bg-slate-50 rounded-2xl border border-slate-200 text-center space-y-1">
          <div className="flex items-center justify-center gap-1.5 text-xs font-semibold text-slate-700">
            <Info className="w-3.5 h-3.5 text-slate-500" />
            <span>Clinical Transparency & Individual Biological Outcomes</span>
          </div>
          <p className="text-[11px] text-slate-500 leading-relaxed">
            {MAMTA_SUCCESS_STATS.disclaimer}
          </p>
        </div>

        {/* CALL TO ACTION BUTTONS */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <button
            onClick={() => onOpenBooking(undefined, 'chitwan', 'Initial Consultation')}
            className="inline-flex items-center gap-2 bg-[#E48AA0] hover:bg-[#D4748B] text-white px-7 py-3.5 rounded-xl font-bold text-sm shadow-sm transition-all cursor-pointer"
          >
            <Calendar className="w-4 h-4" />
            <span>Book an Appointment</span>
          </button>

          {onNavigate && (
            <>
              <button
                onClick={() => onNavigate('doctors')}
                className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-[#1D3B58] border border-slate-300 hover:border-[#1D3B58] px-6 py-3.5 rounded-xl font-semibold text-sm transition-colors cursor-pointer"
              >
                <Users className="w-4 h-4 text-[#E48AA0]" />
                <span>Meet Our Doctors</span>
              </button>

              <button
                onClick={() => onNavigate('treatments')}
                className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-[#1D3B58] border border-slate-300 hover:border-[#1D3B58] px-6 py-3.5 rounded-xl font-semibold text-sm transition-colors cursor-pointer"
              >
                <span>Explore Our Services</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate('contact')}
                className="inline-flex items-center gap-2 text-slate-600 hover:text-[#1D3B58] px-5 py-3.5 rounded-xl font-semibold text-sm transition-colors cursor-pointer"
              >
                <span>Contact Us</span>
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default SuccessStoriesStatsSection;
