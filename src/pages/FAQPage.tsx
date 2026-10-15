import React, { useState, useId } from 'react';
import { FAQS, FAQItem } from '../data/fertilityData';
import {
  ChevronDown,
  HelpCircle,
  Search,
  Sparkles,
  Phone,
  MessageSquare,
  Calendar,
  CheckCircle2,
  X,
  ThumbsUp,
  Share2,
  ArrowRight,
  BookOpen,
  Filter,
  Check,
  Stethoscope,
  Maximize2,
  Minimize2,
} from 'lucide-react';

interface FAQPageProps {
  onOpenBooking: (doctorName?: string, branchId?: string, treatmentName?: string) => void;
  language?: 'en' | 'ne';
}

// DEDICATED ACCORDION ITEM COMPONENT
interface AccordionItemProps {
  faq: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
  language: 'en' | 'ne';
  index: number;
  onOpenBooking: () => void;
}

const FAQAccordionItem: React.FC<AccordionItemProps> = ({
  faq,
  isOpen,
  onToggle,
  language,
  index,
  onOpenBooking,
}) => {
  const [hasVotedHelpful, setHasVotedHelpful] = useState(false);
  const contentId = useId();

  const getCategoryBadge = (cat: string) => {
    switch (cat) {
      case 'ivf':
        return { label: 'IVF & ICSI', bg: 'bg-[#FCEEF1] text-[#C96D83]' };
      case 'cost':
        return { label: 'Pricing & Costs', bg: 'bg-emerald-50 text-emerald-700' };
      case 'process':
        return { label: 'Process & Timeline', bg: 'bg-blue-50 text-blue-700' };
      case 'male':
        return { label: 'Male Infertility', bg: 'bg-purple-50 text-purple-700' };
      case 'general':
      default:
        return { label: 'General & Preparation', bg: 'bg-amber-50 text-amber-700' };
    }
  };

  const badge = getCategoryBadge(faq.category);

  return (
    <div
      className={`border rounded-2xl transition-all duration-200 overflow-hidden ${
        isOpen
          ? 'border-[#E48AA0] bg-white shadow-md ring-1 ring-[#E48AA0]/30'
          : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-xs'
      }`}
    >
      {/* ACCORDION HEADER BUTTON */}
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={contentId}
        className="w-full text-left p-5 sm:p-6 flex items-start justify-between gap-4 cursor-pointer focus:outline-hidden focus-visible:bg-slate-50 transition-colors"
      >
        <div className="flex items-start gap-3 sm:gap-4 flex-1">
          {/* Question Number Badge */}
          <span
            className={`w-7 h-7 sm:w-8 sm:h-8 rounded-xl flex items-center justify-center text-xs font-extrabold shrink-0 mt-0.5 transition-colors ${
              isOpen
                ? 'bg-[#1D3B58] text-white'
                : 'bg-slate-100 text-slate-600 group-hover:bg-[#FCEEF1]'
            }`}
          >
            {index < 9 ? `0${index + 1}` : index + 1}
          </span>

          <div className="space-y-1.5 flex-1 pr-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`text-[10px] sm:text-xs font-bold px-2.5 py-0.5 rounded-full ${badge.bg}`}>
                {badge.label}
              </span>
              {faq.authorBadge && (
                <span className="text-[10px] text-slate-500 font-medium hidden sm:inline-flex items-center gap-1">
                  <Stethoscope className="w-3 h-3 text-[#E48AA0]" />
                  <span>{faq.authorBadge}</span>
                </span>
              )}
            </div>

            <h3
              className={`text-sm sm:text-base font-bold transition-colors leading-snug ${
                isOpen ? 'text-[#1D3B58]' : 'text-slate-800'
              }`}
            >
              {language === 'en' ? faq.question : faq.nepaliQuestion}
            </h3>

            {/* Nepali subtitle when in English mode, or English when in Nepali mode */}
            <p className="text-xs text-slate-500 font-normal">
              {language === 'en' ? faq.nepaliQuestion : faq.question}
            </p>
          </div>
        </div>

        {/* ROTATING CHEVRON TOGGLE ICON */}
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
            isOpen ? 'bg-[#FCEEF1] text-[#C96D83] rotate-180' : 'bg-slate-100 text-slate-500'
          }`}
        >
          <ChevronDown className="w-4 h-4" />
        </div>
      </button>

      {/* ACCORDION EXPANDED BODY */}
      {isOpen && (
        <div
          id={contentId}
          role="region"
          className="border-t border-slate-100 bg-[#F9FAFC] px-5 py-5 sm:px-6 sm:py-6 space-y-4 animate-in fade-in duration-200"
        >
          {/* Main Answer text */}
          <div className="text-xs sm:text-sm text-slate-700 leading-relaxed space-y-3 pl-0 sm:pl-11">
            <p className="whitespace-pre-line">{faq.answer}</p>

            {/* Key Clinical Takeaway Box */}
            {faq.keyTakeaway && (
              <div className="p-3.5 bg-white rounded-xl border border-[#F5D8E0] flex items-start gap-2.5 text-xs text-[#1D3B58] shadow-2xs">
                <CheckCircle2 className="w-4 h-4 text-[#C96D83] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-[#C96D83] uppercase tracking-wider text-[10px] block">
                    Key Clinical Takeaway
                  </span>
                  <span className="font-medium text-slate-800">{faq.keyTakeaway}</span>
                </div>
              </div>
            )}

            {/* Micro Interaction: Was this helpful? & Booking link */}
            <div className="pt-3 border-t border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 text-slate-500">
                <span>Was this medical answer helpful?</span>
                <button
                  onClick={() => setHasVotedHelpful(true)}
                  disabled={hasVotedHelpful}
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                    hasVotedHelpful
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200 font-bold'
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {hasVotedHelpful ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Thank you!</span>
                    </>
                  ) : (
                    <>
                      <ThumbsUp className="w-3.5 h-3.5" />
                      <span>Yes, helpful</span>
                    </>
                  )}
                </button>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={onOpenBooking}
                  className="text-xs font-bold text-[#C96D83] hover:text-[#1D3B58] inline-flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <span>Discuss this with Dr. Mamata</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export const FAQPage: React.FC<FAQPageProps> = ({ onOpenBooking, language = 'en' }) => {
  // Set of open indices to allow flexible single or multiple expanded items
  const [openIndices, setOpenIndices] = useState<number[]>([0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');

  // Toggle specific accordion item
  const handleToggle = (index: number) => {
    setOpenIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  // Expand all
  const handleExpandAll = () => {
    setOpenIndices(filteredFaqs.map((_, i) => i));
  };

  // Collapse all
  const handleCollapseAll = () => {
    setOpenIndices([]);
  };

  // Filter logic
  const filteredFaqs = FAQS.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.nepaliQuestion.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (faq.keyTakeaway && faq.keyTakeaway.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory =
      activeCategory === 'all' || faq.category === activeCategory;

    return matchesSearch && matchesCategory;
  });

  const categories = [
    { id: 'all', label: 'All Questions', count: FAQS.length },
    { id: 'ivf', label: 'IVF & ICSI Procedures', count: FAQS.filter((f) => f.category === 'ivf').length },
    { id: 'cost', label: 'Costs & Transparent Pricing', count: FAQS.filter((f) => f.category === 'cost').length },
    { id: 'process', label: 'Timeline & Injections', count: FAQS.filter((f) => f.category === 'process').length },
    { id: 'male', label: 'Male Infertility (Azoospermia)', count: FAQS.filter((f) => f.category === 'male').length },
    { id: 'general', label: 'General & Preparation', count: FAQS.filter((f) => f.category === 'general').length },
  ];

  return (
    <div className="space-y-16 pb-20">
      {/* 1. HERO HEADER */}
      <section className="bg-gradient-to-b from-[#1D3B58] to-[#122538] text-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="max-w-4xl mx-auto space-y-5 text-center relative z-10">
          <div className="inline-flex items-center gap-2 text-xs font-semibold bg-white/10 text-[#E48AA0] px-3.5 py-1.5 rounded-full backdrop-blur-xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Medically Vetted Knowledge Base</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            Frequently Asked Questions
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Transparent, empathetic answers to your most pressing questions about IVF success rates, injection timelines, embryo freezing, and cost breakdowns at Maulakalika Hospital Chitwan.
          </p>

          {/* SEARCH BAR */}
          <div className="max-w-xl mx-auto pt-2 relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by keyword e.g. success rate, pain, cost, injections, azoospermia..."
              className="w-full bg-white/15 border border-white/20 rounded-2xl py-3.5 pl-12 pr-10 text-sm text-white placeholder-slate-400 focus:outline-hidden focus:border-[#E48AA0] focus:ring-2 focus:ring-[#E48AA0]/40 backdrop-blur-xs shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-white rounded-full transition-colors cursor-pointer"
                title="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* 2. CATEGORY TABS & CONTROLS */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Category Pills */}
        <div className="flex items-center justify-center gap-2 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id);
                setOpenIndices([0]); // Open first item in the new category
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeCategory === cat.id
                  ? 'bg-[#1D3B58] text-white shadow-sm ring-2 ring-[#E48AA0]'
                  : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200'
              }`}
            >
              <span>{cat.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full font-semibold ${
                  activeCategory === cat.id ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
                }`}
              >
                {cat.count}
              </span>
            </button>
          ))}
        </div>

        {/* ACCORDION UTILITY BAR: Item count + Expand/Collapse All */}
        <div className="flex items-center justify-between text-xs text-slate-500 px-1 pt-1">
          <div className="font-semibold text-slate-700 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-[#E48AA0]" />
            <span>
              Showing {filteredFaqs.length} of {FAQS.length} Questions
              {searchQuery && ` matching "${searchQuery}"`}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExpandAll}
              className="hover:text-[#1D3B58] hover:bg-slate-100 px-2.5 py-1 rounded-lg transition-colors cursor-pointer font-semibold flex items-center gap-1"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span>Expand All</span>
            </button>
            <span>·</span>
            <button
              onClick={handleCollapseAll}
              className="hover:text-[#1D3B58] hover:bg-slate-100 px-2.5 py-1 rounded-lg transition-colors cursor-pointer font-semibold flex items-center gap-1"
            >
              <Minimize2 className="w-3.5 h-3.5" />
              <span>Collapse All</span>
            </button>
          </div>
        </div>
      </section>

      {/* 3. ACCORDION LIST CONTAINER */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredFaqs.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
              <HelpCircle className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h4 className="font-bold text-slate-800 text-base">No matching questions found</h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                We couldn't find any questions matching "{searchQuery}". You can speak directly to our Chitwan hospital fertility counselor.
              </p>
            </div>
            <div className="pt-2 flex justify-center gap-3">
              <button
                onClick={() => setSearchQuery('')}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors cursor-pointer"
              >
                Clear Search Query
              </button>
              <a
                href="https://wa.me/9779855088798"
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Ask on WhatsApp</span>
              </a>
            </div>
          </div>
        ) : (
          <div className="space-y-3.5">
            {filteredFaqs.map((faq, idx) => (
              <FAQAccordionItem
                key={faq.id || idx}
                faq={faq}
                index={idx}
                isOpen={openIndices.includes(idx)}
                onToggle={() => handleToggle(idx)}
                language={language}
                onOpenBooking={() => onOpenBooking(undefined, 'chitwan')}
              />
            ))}
          </div>
        )}
      </section>

      {/* 4. HOSPITAL LOCATION CALLOUT & HELP CARD */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#1D3B58] text-white rounded-3xl p-8 sm:p-10 space-y-5 text-center relative overflow-hidden shadow-xl">
          <div className="max-w-xl mx-auto space-y-2">
            <span className="text-xs font-bold text-[#E48AA0] uppercase tracking-wider">
              Confidential Medical Consultation
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Still Have an Unanswered Question?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Every couple’s biological profile is unique. Dr. Anusha Tiwari and Dr. Bikash Adhikari offer personal, confidential report evaluations at Maulakalika Hospital Pvt. Ltd., Bharatpur-11, Chitwan.
            </p>
          </div>

          <div className="pt-2 flex flex-wrap justify-center gap-3 sm:gap-4">
            <button
              onClick={() => onOpenBooking()}
              className="bg-[#E48AA0] hover:bg-[#D4748B] text-white px-6 py-3 rounded-xl font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Book In-Person Consultation</span>
            </button>
            <a
              href="tel:056493798"
              className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl font-bold text-xs sm:text-sm transition-colors flex items-center gap-2"
            >
              <Phone className="w-4 h-4 text-[#E48AA0]" />
              <span>Hotline: 056-493798</span>
            </a>
            <a
              href="https://wa.me/9779855088798"
              target="_blank"
              rel="noreferrer"
              className="bg-[#25D366] hover:bg-[#1EBE5D] text-white px-6 py-3 rounded-xl font-bold text-xs sm:text-sm transition-colors flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp: 9855088798</span>
            </a>
          </div>

          <p className="text-[11px] text-slate-400 pt-2">
            📍 Maulakalika Hospital Pvt. Ltd., Bharatpur-11, Chitwan, Nepal · Direct landlines: 056-493798 | 056-493738
          </p>
        </div>
      </section>
    </div>
  );
};

export default FAQPage;
