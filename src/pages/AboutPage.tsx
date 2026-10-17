import React from 'react';
import {
  ShieldCheck,
  Award,
  Heart,
  Microscope,
  CheckCircle2,
  Calendar,
  Sparkles,
  ArrowRight,
  Phone,
  MessageSquare,
  Building2,
  Users,
} from 'lucide-react';
import { DOCTORS } from '../data/fertilityData';
import { IMAGES } from '../assets/images';
import SuccessRateStatistics from '../components/SuccessRateStatistics';

interface AboutPageProps {
  onNavigate: (page: string, param?: string) => void;
  onOpenBooking: (doctorName?: string, branchId?: string, treatmentName?: string) => void;
  language?: 'en' | 'ne';
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate, onOpenBooking, language = 'en' }) => {
  return (
    <div className="space-y-16 pb-20">
      {/* 1. HERO BANNER */}
      <section className="bg-gradient-to-b from-[#1D3B58] to-[#122538] text-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="max-w-7xl mx-auto space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 text-xs font-semibold bg-white/10 text-[#E48AA0] px-3.5 py-1.5 rounded-full backdrop-blur-xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Pioneering Reproductive Medicine in Nepal</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-balance max-w-4xl">
            Dedicated to Making Parenthood Possible Through Compassion & Precision Science
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
            Established at Maulakalika Hospital Pvt. Ltd., Bharatpur-11, Chitwan, Mamata International Fertility Centre represents Nepal’s premier tertiary reproductive care facility—uniting world-trained embryologists, cutting-edge embryology laboratory technology, and profound emotional empathy.
          </p>

          <div className="pt-4 flex flex-wrap gap-4">
            <button
              onClick={() => onOpenBooking(DOCTORS[0].name, 'chitwan')}
              className="bg-[#E48AA0] hover:bg-[#D4748B] text-white px-6 py-3 rounded-xl font-bold text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Consultation with Dr. Anusha Tiwari</span>
            </button>
            <a
              href="https://wa.me/9779855088798"
              target="_blank"
              rel="noreferrer"
              className="bg-[#25D366] hover:bg-[#1EBE5D] text-white px-6 py-3 rounded-xl font-bold text-sm transition-colors flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp 9855088798</span>
            </a>
          </div>
        </div>
      </section>

      {/* 2. CLINICAL HERITAGE & MISSION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold text-[#E48AA0] uppercase tracking-wider">
                Our Heritage & Mission
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1D3B58]">
                Where Medical Rigor Meets Tender Patient Care
              </h2>
            </div>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Infertility is not simply a biological condition; it is an emotional, psychological, and financial crossroad for couples. Mamata International Fertility Centre was founded with a singular conviction: every couple in Nepal deserves access to global-standard reproductive medicine without having to travel abroad or endure opaque pricing structures.
            </p>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Situated in the healthcare heartland of Chitwan at Maulakalika Hospital, our centre provides an integrated ecosystem where clinical consultations, hormonal biochemistry, 4D ultrasound imaging, laparoscopic day-surgery, and blastocyst embryology operate seamlessly under one roof.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-2xl font-bold text-[#1D3B58] block">130+</span>
                <span className="text-xs text-slate-600 font-semibold block">Successful Journeys</span>
                <span className="text-[11px] text-slate-400 font-medium">Parenthood milestones achieved</span>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-2xl font-bold text-[#1D3B58] block">25+</span>
                <span className="text-xs text-slate-600 font-semibold block">Recent Success Stories</span>
                <span className="text-[11px] text-[#C96D83] font-bold">Within 5 months at Mamta</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden shadow-xl border-4 border-white">
              <img
                src={IMAGES.doctorPortrait}
                alt="Dr. Anusha Tiwari"
                className="w-full h-[450px] object-cover object-top"
              />
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-900/90 via-slate-900/60 to-transparent p-6 text-white space-y-1">
                <h4 className="font-bold text-lg">Dr. Anusha Tiwari</h4>
                <p className="text-xs text-[#E48AA0] font-semibold">
                  Focal Person & Consultant Reproductive Medicine
                </p>
                <p className="text-xs text-slate-300">
                  MBBS, MD (OBG/GYN) · Fellowship in Reproductive Medicine
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2.5 SUCCESS RATE STATISTICS VISUALIZATION (RECHARTS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SuccessRateStatistics
          onOpenBooking={() => onOpenBooking(DOCTORS[0].name, 'chitwan')}
          language={language}
        />
      </section>

      {/* 3. FOUR CLINICAL PILLARS */}
      <section className="bg-[#F9FAFC] py-16 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold text-[#E48AA0] uppercase tracking-wider">
              The Mamata Standard
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1D3B58]">
              Four Pillars Behind Our High Success Rates
            </h2>
            <p className="text-slate-600 text-sm">
              How our Chitwan centre maintains consistent embryological excellence and patient trust.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#FCEEF1] text-[#C96D83] flex items-center justify-center">
                <Microscope className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base text-[#1D3B58]">
                Advanced Lab Technology
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Advanced embryology facility with ESCO MIRI® multi-room incubators, robotic micromanipulators, and laser-assisted hatching.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#FCEEF1] text-[#C96D83] flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base text-[#1D3B58]">
                Transparent Pricing
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Strict no-hidden-cost guarantee. Itemized package breakdowns provided in writing before beginning any medical cycle.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#FCEEF1] text-[#C96D83] flex items-center justify-center">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base text-[#1D3B58]">
                Internationally Trained Faculty
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Senior fertility clinicians and embryologists certified by ESHRE with training in Singapore, UK, Germany, and South Korea.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#FCEEF1] text-[#C96D83] flex items-center justify-center">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base text-[#1D3B58]">
                Emotional Patient Support
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Dedicated fertility counselors, continuous updates during embryonic culture, and 24/7 hotline accessibility for peace of mind.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. EMBRYOLOGY LAB SPOTLIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#1D3B58] text-white rounded-3xl p-8 sm:p-12 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-5">
              <span className="text-xs font-bold text-[#E48AA0] uppercase tracking-wider">
                Our Laboratory Technology
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Advanced IVF & Embryology Laboratory
              </h3>
              <p className="text-sm text-slate-200 leading-relaxed">
                Human embryos are micro-environments sensitive to volatile organic compounds (VOCs), room light, temperature shifts, and humidity. Our lab at Maulakalika Hospital is built to stringent international embryology standards:
              </p>

              <div className="space-y-3 text-xs sm:text-sm text-slate-200">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#E48AA0] shrink-0 mt-0.5" />
                  <span><strong>HEPA & Activated Carbon Filtration:</strong> Continuous positive-pressure air filtration keeping air purer than typical hospital operating suites.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#E48AA0] shrink-0 mt-0.5" />
                  <span><strong>ESCO MIRI® Multi-Room Incubators:</strong> Individual chambers per patient so one couple's embryos are never exposed when another chamber is opened.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#E48AA0] shrink-0 mt-0.5" />
                  <span><strong>Hamilton Thorne Laser Optics:</strong> Ultra-precise laser hatching to assist blastocysts in hatching out of their outer shell (zona pellucida) for maximum implantation.</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onNavigate('contact')}
                  className="bg-[#E48AA0] hover:bg-[#D4748B] text-white px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-colors"
                >
                  Visit Maulakalika Hospital
                </button>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-2xl overflow-hidden shadow-lg border-2 border-white/20">
                <img
                  src={IMAGES.advancedLab}
                  alt="Mamata Advanced Embryology Laboratory"
                  className="w-full h-80 object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CTA BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <h3 className="text-2xl font-bold text-[#1D3B58]">
          Ready to Begin Your Parenthood Journey?
        </h3>
        <p className="text-slate-600 text-sm max-w-xl mx-auto">
          Schedule your confidential initial evaluation with our focal person Dr. Anusha Tiwari at Maulakalika Hospital, Bharatpur-11, Chitwan.
        </p>
        <div className="flex justify-center gap-4 pt-2">
          <button
            onClick={() => onOpenBooking()}
            className="bg-[#E48AA0] hover:bg-[#D4748B] text-white px-6 py-3 rounded-xl font-bold text-sm shadow-sm transition-all"
          >
            Book Free Consultation
          </button>
          <a
            href="tel:056493798"
            className="border border-slate-300 hover:border-[#1D3B58] text-[#1D3B58] bg-white px-6 py-3 rounded-xl font-semibold text-sm transition-colors flex items-center gap-2"
          >
            <Phone className="w-4 h-4 text-[#E48AA0]" />
            <span>Call Hotline: 056-493798</span>
          </a>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
