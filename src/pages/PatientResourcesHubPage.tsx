import React from 'react';
import Breadcrumbs from '../components/Breadcrumbs';
import {
  Banknote,
  HelpCircle,
  Calendar,
  Heart,
  Calculator,
  ArrowRight,
  FileText,
  Clock,
  ShieldCheck,
  Phone,
} from 'lucide-react';

interface PatientResourcesHubPageProps {
  onNavigate: (path: string) => void;
  onOpenBooking: (doctorName?: string, branchId?: string, treatment?: string) => void;
  language?: 'en' | 'ne';
}

export const PatientResourcesHubPage: React.FC<PatientResourcesHubPageProps> = ({
  onNavigate,
  onOpenBooking,
  language = 'en',
}) => {
  const resourceCards = [
    {
      title: 'Transparent Treatment Costs & Packages',
      nepaliTitle: 'उपचार शुल्क तथा पारदर्शी प्याकेजहरू',
      path: '/pricing',
      icon: Banknote,
      color: 'bg-emerald-50 text-emerald-700',
      description: 'Clear, itemized fee breakdowns for IUI, complete IVF/ICSI blastocyst programs, egg vitrification, and male TESA with zero hidden costs.'
    },
    {
      title: 'Frequently Asked Questions (Clinical FAQs)',
      nepaliTitle: 'प्रायः सोधिने प्रश्नहरू (FAQs)',
      path: '/faq',
      icon: HelpCircle,
      color: 'bg-sky-50 text-sky-700',
      description: 'Answers directly authored by our clinical panel on IVF success rates, pain-free egg retrieval, outstation stays, and blastocyst transfer.'
    },
    {
      title: 'Pregnancy Due Date & Gestation Calculator',
      nepaliTitle: 'गर्भावस्था मिति तथा डेलिभरी क्यालकुलेटर',
      path: '/calculator',
      icon: Calculator,
      color: 'bg-purple-50 text-purple-700',
      description: 'Interactive medical tool to calculate estimated due dates, trimester milestones, and gestational age via LMP, conception, or IVF transfer dates.'
    },
    {
      title: 'Step-by-Step Patient Fertility Journey',
      nepaliTitle: 'उपचार प्रक्रियाका ४ चरणहरू (Patient Journey)',
      path: '/journey',
      icon: Calendar,
      color: 'bg-[#FCEEF1] text-[#C96D83]',
      description: 'A transparent 4-stage roadmap guiding you from your initial diagnostic consult to medication management, egg retrieval, and positive pregnancy.'
    },
    {
      title: 'Verified Success Stories & Family Testimonials',
      nepaliTitle: 'सफल दम्पतीहरूका अनुभव तथा कथाहरू',
      path: '/stories',
      icon: Heart,
      color: 'bg-rose-50 text-rose-700',
      description: 'Documented milestones and real experiences from families across Nepal and abroad who welcomed their miracle babies through Mamta International.'
    }
  ];

  return (
    <div className="min-w-0 bg-[#F9FAFC] pb-20">
      <div className="bg-white border-b border-slate-100">
        <Breadcrumbs
          items={[{ label: 'Patient Information & Resources' }]}
          onNavigate={onNavigate}
        />
      </div>

      {/* HERO */}
      <section className="bg-gradient-to-b from-white to-[#F9FAFC] pt-12 pb-14 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5 text-center max-w-4xl">
          <div className="text-xs font-bold text-[#E48AA0] uppercase tracking-wider">
            Patient Support & Knowledge Hub
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1D3B58] tracking-tight">
            Fertility Education, Pricing & Patient Guides
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            We believe an informed patient is an empowered patient. Explore transparent treatment fee packages, pregnancy timeline calculators, clinical FAQs, and verified patient stories designed to guide your journey with clarity and confidence.
          </p>
        </div>
      </section>

      {/* RESOURCE DIRECTORY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {resourceCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                key={idx}
                onClick={() => onNavigate(card.path)}
                className="bg-white rounded-3xl border border-slate-200/90 hover:border-[#E48AA0] p-6 sm:p-7 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-3">
                  <div className={`w-12 h-12 rounded-2xl ${card.color} flex items-center justify-center shrink-0`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-[#1D3B58] group-hover:text-[#2B5A88] transition-colors">
                    {language === 'en' ? card.title : card.nepaliTitle}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {card.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 text-xs font-bold text-[#E48AA0] flex items-center gap-1">
                  <span>Explore Guide</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

        {/* CONSULTATION PREPARATION GUIDE */}
        <div className="mt-14 bg-white rounded-3xl border border-slate-200/90 p-8 sm:p-10 shadow-xs space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold text-[#E48AA0] uppercase tracking-wider block">
              Patient Preparation Guide
            </span>
            <h2 className="text-2xl font-bold text-[#1D3B58]">
              How to Prepare for Your First Visit to Mamta International
            </h2>
            <p className="text-sm text-slate-600">
              To help us evaluate your complete reproductive history and formulate an accurate plan on Day 1:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 pt-2">
            <div className="p-4 rounded-2xl bg-[#F9FAFC] border border-slate-200 space-y-2">
              <span className="text-xs font-extrabold text-[#1D3B58]">1. Bring Past Reports</span>
              <p className="text-xs text-slate-600 leading-relaxed">
                Bring any semen analyses, hormone panels (AMH, TSH, Prolactin), HSG films, laparoscopy discharge summaries, or previous IVF cycle sheets.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#F9FAFC] border border-slate-200 space-y-2">
              <span className="text-xs font-extrabold text-[#1D3B58]">2. Attend as a Couple</span>
              <p className="text-xs text-slate-600 leading-relaxed">
                Fertility is a shared journey. Having both partners present allows our doctors to evaluate male and female factors concurrently.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#F9FAFC] border border-slate-200 space-y-2">
              <span className="text-xs font-extrabold text-[#1D3B58]">3. Non-Invasive Day 1</span>
              <p className="text-xs text-slate-600 leading-relaxed">
                Your initial consultation focuses on sympathetic listening, medical timeline mapping, baseline ultrasound, and transparent counseling.
              </p>
            </div>
          </div>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => onOpenBooking()}
              className="bg-[#E48AA0] hover:bg-[#D4748B] text-white px-6 py-3 rounded-xl font-bold text-xs sm:text-sm shadow-sm transition-all cursor-pointer"
            >
              Book Your First Consultation
            </button>
            <a
              href="tel:056493798"
              className="bg-white hover:bg-slate-50 text-[#1D3B58] border border-slate-200 px-5 py-3 rounded-xl font-bold text-xs sm:text-sm transition-colors cursor-pointer flex items-center gap-2"
            >
              <Phone className="w-4 h-4 text-[#E48AA0]" />
              <span>Helpline: 056-493798</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PatientResourcesHubPage;
