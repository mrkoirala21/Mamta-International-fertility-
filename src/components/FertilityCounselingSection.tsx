import React from 'react';
import { FERTILITY_COUNSELING_SERVICES } from '../data/fertilityData';
import {
  MessageSquareHeart,
  Microscope,
  Activity,
  HeartHandshake,
  Sparkles,
  CheckCircle2,
  Calendar,
  ArrowRight,
  Phone,
} from 'lucide-react';

interface FertilityCounselingSectionProps {
  onOpenBooking: (doctorName?: string, branchId?: string, treatmentName?: string) => void;
  onNavigate?: (page: string) => void;
  language?: 'en' | 'ne';
}

const iconMap: Record<string, React.ElementType> = {
  MessageSquareHeart,
  Microscope,
  Activity,
  HeartHandshake,
  Sparkles,
};

export const FertilityCounselingSection: React.FC<FertilityCounselingSectionProps> = ({
  onOpenBooking,
  onNavigate,
  language = 'en',
}) => {
  return (
    <section id="fertility-investigations" className="py-16 md:py-24 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-[#C96D83] bg-[#FCEEF1] px-3.5 py-1 rounded-full uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{language === 'en' ? 'Evidence-Based Reproductive Diagnostics' : 'वैज्ञानिक प्रजनन परीक्षण'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1D3B58] tracking-tight">
            {language === 'en'
              ? 'Fertility Counseling, Investigation & Treatment'
              : 'प्रजनन परामर्श, परीक्षण तथा उपचार सेवाहरू'}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            {language === 'en'
              ? 'Thorough reproductive investigations and confidential clinical counseling led by Dr. Anusha Tiwari at Maulakalika Hospital. We identify root biological factors and create individualized protocols with compassionate clarity.'
              : 'डा. अनुषा तिवारीको नेतृत्वमा महिला तथा पुरुष प्रजनन परीक्षण, हर्मोनल प्रोफाइल जाँच र व्यक्तिगत परामर्श सेवा।'}
          </p>
        </div>

        {/* 5 SERVICE PILLARS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {FERTILITY_COUNSELING_SERVICES.map((item, idx) => {
            const IconComponent = iconMap[item.icon] || Microscope;
            const isFeatured = idx === 0 || idx === 3;

            return (
              <div
                key={item.id}
                className={`rounded-3xl border transition-all duration-300 p-6 sm:p-7 flex flex-col justify-between group ${
                  isFeatured
                    ? 'bg-gradient-to-b from-white to-[#FDF7F8] border-[#E48AA0]/60 shadow-xs hover:shadow-md'
                    : 'bg-[#F9FAFC] border-slate-200/90 hover:border-[#E48AA0] hover:bg-white shadow-2xs hover:shadow-xs'
                }`}
              >
                <div className="space-y-4">
                  {/* ICON & BADGE */}
                  <div className="flex items-center justify-between gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-white shadow-2xs border border-slate-200/80 flex items-center justify-center text-[#1D3B58] group-hover:bg-[#1D3B58] group-hover:text-white transition-colors">
                      <IconComponent className="w-6 h-6 text-[#C96D83] group-hover:text-[#E48AA0] transition-colors" />
                    </div>
                    <span className="text-[11px] font-bold text-[#1D3B58] bg-slate-100 px-3 py-1 rounded-full">
                      {item.badge}
                    </span>
                  </div>

                  {/* TITLE & DESCRIPTION */}
                  <div className="space-y-1.5">
                    <h3 className="text-lg sm:text-xl font-bold text-[#1D3B58] group-hover:text-[#2B5A88] transition-colors">
                      {language === 'en' ? item.title : item.nepaliTitle}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* KEY INCLUDES */}
                  <div className="pt-2 border-t border-slate-200/60 space-y-2">
                    <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">
                      Key Clinical Components:
                    </span>
                    <ul className="space-y-1.5">
                      {item.keyIncludes.map((inc, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-slate-600">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{inc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* CARD CTA */}
                <div className="pt-5 mt-4 border-t border-slate-200/60 flex items-center justify-between gap-2">
                  <button
                    onClick={() => onOpenBooking('Dr. Anusha Tiwari', 'chitwan', item.title)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C96D83] hover:text-[#1D3B58] transition-colors cursor-pointer"
                  >
                    <span>Book Consultation</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <a
                    href="tel:056493798"
                    className="text-[11px] text-slate-500 hover:text-slate-700 flex items-center gap-1"
                    title="Call Clinic"
                  >
                    <Phone className="w-3 h-3 text-slate-400" />
                    <span>056-493798</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* BOTTOM ACTION STRIP */}
        <div className="bg-[#1D3B58] text-white rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="text-lg sm:text-xl font-bold">
              Looking for Clear Diagnostic Answers for Your Conception Journey?
            </h4>
            <p className="text-xs sm:text-sm text-slate-300">
              Schedule your comprehensive male & female fertility investigations and hormonal profiling at Maulakalika Hospital Chitwan.
            </p>
          </div>
          <div className="flex items-center flex-wrap gap-3 shrink-0">
            <button
              onClick={() => onOpenBooking('Dr. Anusha Tiwari', 'chitwan', 'Fertility Investigation & Counseling')}
              className="bg-[#E48AA0] hover:bg-[#D4748B] text-white px-5 py-3 rounded-xl font-bold text-xs sm:text-sm shadow-sm transition-all cursor-pointer flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Diagnostic Assessment</span>
            </button>
            {onNavigate && (
              <button
                onClick={() => onNavigate('doctors')}
                className="bg-white/10 hover:bg-white/20 text-white px-4 py-3 rounded-xl font-semibold text-xs sm:text-sm transition-colors cursor-pointer"
              >
                Meet Our Doctors
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FertilityCounselingSection;
