import React from 'react';
import { TREATMENTS, DOCTORS, BRANCHES, TESTIMONIALS } from '../data/fertilityData';
import { IMAGES } from '../assets/images';
import IVFProcessSection from '../components/IVFProcessSection';
import FertilityCounselingSection from '../components/FertilityCounselingSection';
import MaternityCareSection from '../components/MaternityCareSection';
import SuccessStoriesStatsSection from '../components/SuccessStoriesStatsSection';
import {
  ArrowRight,
  ShieldCheck,
  Heart,
  Award,
  Sparkles,
  Calendar,
  CheckCircle2,
  Clock,
  Phone,
  Microscope,
  Baby,
  MapPin,
  ChevronRight,
  Star,
  Quote,
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: string, param?: string) => void;
  onOpenBooking: (doctorName?: string, branchId?: string, treatmentName?: string) => void;
  language?: 'en' | 'ne';
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onOpenBooking, language = 'en' }) => {
  const primaryBranch = BRANCHES[0];

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#F9FAFC] via-white to-white pt-8 pb-16 md:pt-14 md:pb-24 border-b border-slate-100">
        <div className="absolute top-0 right-0 -mr-32 -mt-32 w-96 h-96 rounded-full bg-[#FCEEF1] blur-3xl opacity-60 pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-32 -mb-32 w-96 h-96 rounded-full bg-slate-100 blur-3xl opacity-70 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* HERO PROPOSITION */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 text-xs font-semibold bg-[#FCEEF1] text-[#C96D83] px-3.5 py-1.5 rounded-full">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Nepal’s Premier Assisted Reproductive & IVF Centre</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-extrabold text-[#1D3B58] tracking-tight leading-[1.15] text-balance">
                Empowering Your Journey to Parenthood with Care & Excellence
              </h1>

              <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                World-class IVF and fertility treatments at Maulakalika Hospital Pvt. Ltd., Bharatpur-11, Chitwan with advanced embryology labs, transparent pricing, and deeply compassionate care.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <button
                  onClick={() => onOpenBooking(undefined, 'chitwan')}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#E48AA0] hover:bg-[#D4748B] text-white px-7 py-3.5 rounded-xl font-bold text-base shadow-md transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  <Calendar className="w-5 h-5" />
                  <span>Book Free Consultation</span>
                  <ArrowRight className="w-5 h-5" />
                </button>

                <button
                  onClick={() => onNavigate('treatments')}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-slate-300 hover:border-[#1D3B58] text-[#1D3B58] bg-white hover:bg-slate-50 px-6 py-3.5 rounded-xl font-semibold text-base transition-colors"
                >
                  <span>Explore Treatments</span>
                </button>
              </div>

              {/* REASSURANCE STRIP */}
              <div className="pt-2 flex items-center justify-center lg:justify-start gap-6 text-xs text-slate-500">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>100% Confidential</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <Heart className="w-4 h-4 text-[#E48AA0]" />
                  <span>Zero Hidden Fees</span>
                </span>
                <span className="hidden sm:flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-[#2B5A88]" />
                  <span>NMC Registered</span>
                </span>
              </div>
            </div>

            {/* HERO PHOTOGRAPHY */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="relative rounded-2xl overflow-hidden shadow-xl border-4 border-white aspect-4/3 sm:aspect-16/11">
                  <img
                    src={IMAGES.heroConsultation}
                    alt="Doctor consulting warmly with couple at Mamata International Fertility Centre"
                    className="w-full h-full object-cover object-center"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />

                  <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-xs p-3.5 rounded-xl shadow-lg border border-white/50 flex items-center justify-between">
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-[#1D3B58]">
                        Dr. Anusha Tiwari & Clinical Team
                      </h4>
                      <p className="text-[11px] text-slate-500 font-medium">
                        Focal Person · MBBS, MD (OBG/GYN), Fellow Repro Med
                      </p>
                    </div>
                    <button
                      onClick={() => onOpenBooking(DOCTORS[0].name, 'chitwan')}
                      className="bg-[#E48AA0] hover:bg-[#D4748B] text-white text-[11px] font-semibold px-3 py-1.5 rounded-lg shrink-0 transition-colors"
                    >
                      Book Slot
                    </button>
                  </div>
                </div>

                <div className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 bg-[#1D3B58] text-white py-2 px-3.5 rounded-xl shadow-md border-2 border-white flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#E48AA0]" />
                  <span className="text-xs font-bold tracking-tight">Maulakalika Hospital, Bharatpur-11</span>
                </div>
              </div>
            </div>

          </div>

          {/* SOCIAL PROOF METRICS STRIP */}
          <div className="mt-14 pt-8 border-t border-slate-200">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div className="space-y-1">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1D3B58] tabular-nums tracking-tight">
                  130+
                </div>
                <div className="text-xs sm:text-sm font-semibold text-slate-600">Successful Journeys</div>
                <div className="text-[11px] text-slate-400 font-medium">Parenthood Milestones</div>
              </div>
              <div className="space-y-1">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1D3B58] tabular-nums tracking-tight">
                  25+
                </div>
                <div className="text-xs sm:text-sm font-semibold text-slate-600">Recent Success Stories</div>
                <div className="text-[11px] font-bold text-[#C96D83]">At Mamta in 5 Months</div>
              </div>
              <div className="space-y-1">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1D3B58] tabular-nums tracking-tight">
                  Up to 72%
                </div>
                <div className="text-xs sm:text-sm font-semibold text-slate-600">Clinical Pregnancy Rate</div>
                <div className="text-[11px] text-slate-400 font-medium">Blastocyst FET Standard</div>
              </div>
              <div className="space-y-1">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1D3B58] tabular-nums tracking-tight">
                  From Everywhere
                </div>
                <div className="text-xs sm:text-sm font-semibold text-slate-600">Couples & Families Served</div>
                <div className="text-[11px] text-slate-400 font-medium">Across Nepal & Overseas</div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. CHITWAN HOSPITAL QUICK ACCESS STRIP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#1D3B58] text-white rounded-3xl p-6 sm:p-8 shadow-md">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-1.5">
              <span className="text-xs font-bold text-[#E48AA0] uppercase tracking-wider flex items-center gap-1.5">
                <MapPin className="w-4 h-4" />
                <span>Official Hospital Location & Inquiries</span>
              </span>
              <h3 className="text-xl sm:text-2xl font-bold">
                Maulakalika Hospital Pvt. Ltd., Bharatpur-11, Chitwan
              </h3>
              <p className="text-xs sm:text-sm text-slate-200">
                Direct Hotline: <strong className="text-white font-mono">056-493798 | 056-493738</strong> · Official WhatsApp: <strong className="text-[#E48AA0] font-mono">9855088798</strong>
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href="tel:056493798"
                className="bg-white/10 hover:bg-white/20 text-white px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-colors flex items-center gap-2"
              >
                <Phone className="w-4 h-4 text-[#E48AA0]" />
                <span>Call Hotline</span>
              </a>
              <a
                href="https://wa.me/9779855088798"
                target="_blank"
                rel="noreferrer"
                className="bg-[#25D366] hover:bg-[#1EBE5D] text-white px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-colors flex items-center gap-2 shadow-xs"
              >
                <span>WhatsApp Us</span>
              </a>
              <button
                onClick={() => onNavigate('contact')}
                className="bg-[#E48AA0] hover:bg-[#D4748B] text-white px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-colors"
              >
                Location & Hours
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2.5 FERTILITY COUNSELING, INVESTIGATION & TREATMENT */}
      <FertilityCounselingSection
        onOpenBooking={onOpenBooking}
        onNavigate={onNavigate}
        language={language}
      />

      {/* 3. DEDICATED SERVICES SHOWCASE (EACH LEADS TO ITS OWN PAGE!) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <span className="text-xs font-bold text-[#E48AA0] uppercase tracking-wider">
              Single-Service Dedicated Pages
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1D3B58] tracking-tight">
              Explore Our Specialized Fertility Treatments
            </h2>
            <p className="text-slate-600 text-sm max-w-xl">
              Each service is thoroughly documented on its own dedicated page with clinical indications, step-by-step procedures, transparent pricing, and specialist doctor.
            </p>
          </div>

          <button
            onClick={() => onNavigate('treatments')}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#1D3B58] hover:text-[#E48AA0] shrink-0"
          >
            <span>View All Services Directory</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* 7 SERVICE CARDS DIRECT ROUTING */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TREATMENTS.map((treatment) => (
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
                    {treatment.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 font-medium">
                    {treatment.subtitle}
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed">
                  {treatment.summary}
                </p>

                <div className="p-3 bg-slate-50 rounded-xl text-xs space-y-1">
                  <span className="font-semibold text-slate-700 block">Recommended for:</span>
                  <p className="text-slate-500 line-clamp-1">{treatment.idealFor[0]}</p>
                </div>
              </div>

              <div className="pt-5 mt-5 border-t border-slate-100 flex items-center justify-between gap-2">
                <button
                  onClick={() => onNavigate('service', treatment.id)}
                  className="text-xs font-bold text-[#1D3B58] hover:text-[#E48AA0] flex items-center gap-1 py-1.5 px-3 bg-slate-50 hover:bg-[#FCEEF1] rounded-lg border border-slate-200 transition-colors"
                >
                  <span>Open Dedicated Page</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => onOpenBooking(undefined, 'chitwan', treatment.title)}
                  className="bg-[#E48AA0] hover:bg-[#D4748B] text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap"
                >
                  Book Slot
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3.5 COMPLETE CARE FROM CONCEPTION TO DELIVERY */}
      <MaternityCareSection
        onOpenBooking={onOpenBooking}
        onNavigate={onNavigate}
        language={language}
      />

      {/* 4. IVF PROCESS STEP BY STEP */}
      <IVFProcessSection
        onOpenBooking={onOpenBooking}
        onNavigate={onNavigate}
        language={language}
      />

      {/* 4.5 OUR SUCCESS STORIES — YOUR JOURNEY TO PARENTHOOD */}
      <SuccessStoriesStatsSection
        onOpenBooking={onOpenBooking}
        onNavigate={onNavigate}
        language={language}
      />

      {/* 5. CLINICAL LEADERSHIP SPOTLIGHT TEASER */}
      <section className="bg-[#F9FAFC] py-16 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2">
              <span className="text-xs font-bold text-[#E48AA0] uppercase tracking-wider">
                Clinical Faculty & Medical Team
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1D3B58] tracking-tight">
                Meet Our Doctors & Healthcare Specialists
              </h2>
              <p className="text-slate-600 text-sm max-w-xl">
                Led by focal person Dr. Anusha Tiwari, ultrasound expert Dr. Ramesh Ghimire, obstetrics consultants (Dr. Kesheb Bhurtel & Dr. Anupama Karki), laparoscopic surgeons (Dr. Ramesh Poudel & Dr. Ritu), Chief Embryologist Dr. Bikash Adhikari, and Consultant Andrologist Dr. Suresh Thapa.
              </p>
            </div>
            <button
              onClick={() => onNavigate('doctors')}
              className="inline-flex items-center gap-1.5 bg-[#1D3B58] hover:bg-[#2B5A88] text-white px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold shadow-xs transition-colors shrink-0 cursor-pointer"
            >
              <span>Meet Our Doctors</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {DOCTORS.map((doc) => (
              <div
                key={doc.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4 hover:border-[#E48AA0] hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <div className="aspect-square rounded-xl bg-slate-100 overflow-hidden relative">
                    {doc.image ? (
                      <img src={doc.image} alt={doc.name} className="w-full h-full object-cover object-top" />
                    ) : (
                      <div className="w-full h-full bg-[#1D3B58] text-white flex flex-col items-center justify-center p-3 text-center">
                        <span className="text-2xl font-bold">{doc.name.replace('Dr. ', '').split(' ')[0]}</span>
                        <span className="text-[10px] text-slate-300 uppercase tracking-wider font-semibold mt-0.5">{doc.department || 'Specialist'}</span>
                      </div>
                    )}
                    <span className="absolute top-2 left-2 bg-white/95 text-[11px] font-bold px-2 py-0.5 rounded text-[#1D3B58] shadow-2xs">
                      {doc.experienceYears}+ Yrs
                    </span>
                  </div>

                  <div>
                    <h3 className="font-bold text-base text-[#1D3B58] group-hover:text-[#2B5A88] transition-colors">{doc.name}</h3>
                    <p className="text-xs font-semibold text-[#E48AA0]">{doc.role.split('&')[0]}</p>
                    <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">{doc.qualifications}</p>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 space-y-2">
                  <button
                    onClick={() => onOpenBooking(doc.name, 'chitwan')}
                    className="w-full bg-[#E48AA0] hover:bg-[#D4748B] text-white py-2.5 rounded-xl text-xs font-bold transition-colors cursor-pointer shadow-xs"
                  >
                    Book Appointment
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. PATIENT RESOURCES TEASER: DUE DATE CALCULATOR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#1D3B58] to-[#2B5A88] text-white rounded-3xl p-8 sm:p-12 shadow-lg">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#E48AA0] bg-white/10 px-3 py-1 rounded-full">
                <Baby className="w-4 h-4" />
                <span>Interactive Patient Resource</span>
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight">
                Try Our Pregnancy Due Date & Ultrasound Milestone Tool
              </h2>
              <p className="text-sm sm:text-base text-slate-200 max-w-2xl leading-relaxed">
                Input your Last Period (LMP) or IVF Day 5 Blastocyst transfer date to calculate your estimated delivery date, trimester progress, and schedule your crucial 6-week viability scan.
              </p>
              <div className="pt-2 flex flex-wrap gap-4">
                <button
                  onClick={() => onNavigate('calculator')}
                  className="bg-[#E48AA0] hover:bg-[#D4748B] text-white px-6 py-3 rounded-xl font-bold text-sm shadow-sm transition-all"
                >
                  Open Due Date Calculator
                </button>
                <button
                  onClick={() => onNavigate('pricing')}
                  className="border border-white/40 hover:border-white text-white px-6 py-3 rounded-xl font-semibold text-sm transition-colors"
                >
                  View Treatment Packages
                </button>
              </div>
            </div>

            <div className="lg:col-span-4 bg-white/10 backdrop-blur-xs p-6 rounded-2xl border border-white/20 text-center space-y-3">
              <span className="text-3xl">🗓️</span>
              <h3 className="font-bold text-base text-white">4 Calculation Methods</h3>
              <p className="text-xs text-slate-200">
                Supports natural LMP cycles, IVF Day 5 Blastocyst transfers, Day 3 embryos, and IUI conception dates.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. TESTIMONIAL TEASER & REVIEWS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold text-[#E48AA0] uppercase tracking-wider">
            Voices of Parenthood
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1D3B58] tracking-tight">
            Real Families, Real Miracles
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {TESTIMONIALS.slice(0, 2).map((test) => (
            <div
              key={test.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-xs flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <Quote className="w-7 h-7 text-[#E48AA0]/40" />
                <p className="text-sm text-slate-700 italic leading-relaxed">
                  "{test.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-[#1D3B58] block">{test.parentNames}</span>
                  <span className="text-slate-500">{test.location}</span>
                </div>
                <span className="text-[#C96D83] font-semibold bg-[#FCEEF1] px-2.5 py-1 rounded-full">
                  {test.yearsTrying} waiting
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center pt-2">
          <button
            onClick={() => onNavigate('stories')}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#1D3B58] hover:text-[#E48AA0]"
          >
            <span>Read All Verified Success Stories</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
