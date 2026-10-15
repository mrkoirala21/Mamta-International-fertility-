import React, { useState } from 'react';
import { FAQS } from '../data/fertilityData';
import { ChevronDown, HelpCircle, PhoneCall, MessageCircle } from 'lucide-react';

interface FAQSectionProps {
  onOpenBooking: () => void;
  language?: 'en' | 'ne';
}

export const FAQSection: React.FC<FAQSectionProps> = ({ onOpenBooking, language = 'en' }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleItem = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-16 md:py-24 bg-white border-b border-slate-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* HEADER */}
        <div className="text-center space-y-3">
          <div className="text-xs font-bold text-[#E48AA0] uppercase tracking-wider">
            {language === 'en' ? 'Empathetic Patient Knowledge' : 'प्रायः सोधिने प्रश्नहरू'}
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1D3B58] tracking-tight">
            {language === 'en' ? 'Frequently Asked Questions About IVF' : 'निःसन्तानता उपचार सम्बन्धी जिज्ञासाहरू'}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            {language === 'en'
              ? 'Clear, medically vetted answers to help ease anxiety and provide clarity before scheduling your consultation.'
              : 'उपचार प्रक्रिया, शुल्क र सफलता दरबारे स्पष्ट र वैज्ञानिक जानकारी।'}
          </p>
        </div>

        {/* ACCORDION ITEMS */}
        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="border border-slate-200 rounded-2xl overflow-hidden transition-all bg-[#F9FAFC]"
              >
                <button
                  onClick={() => toggleItem(idx)}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-[#1D3B58] hover:text-[#2B5A88] transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="flex items-center gap-3">
                    <HelpCircle className="w-4 h-4 text-[#E48AA0] shrink-0" />
                    <span>{language === 'en' ? faq.question : faq.nepaliQuestion}</span>
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'transform rotate-180 text-[#E48AA0]' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-6 sm:px-6 sm:pb-6 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3 bg-white">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* STILL HAVE QUESTIONS HELP CARD */}
        <div className="p-6 bg-[#FCEEF1] rounded-2xl border border-[#F5D8E0] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h4 className="text-sm font-bold text-[#1D3B58]">
              Have a Question Not Answered Here?
            </h4>
            <p className="text-xs text-slate-600 mt-0.5">
              Our clinical counselors are standing by to guide you with complete confidentiality.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="tel:056493798"
              className="inline-flex items-center gap-1.5 bg-[#1D3B58] hover:bg-[#152B40] text-white px-4 py-2.5 rounded-xl text-xs font-bold transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5 text-[#E48AA0]" />
              <span>Hotline: 056-493798</span>
            </a>
            <button
              onClick={onOpenBooking}
              className="inline-flex items-center gap-1.5 bg-[#E48AA0] hover:bg-[#D4748B] text-white px-4 py-2.5 rounded-xl text-xs font-bold transition-colors"
            >
              <span>Book Appointment</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default FAQSection;
