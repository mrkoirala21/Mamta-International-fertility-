import React from 'react';
import DueDateCalculator from '../components/DueDateCalculator';
import {
  Baby,
  Sparkles,
  Calendar,
  Phone,
  MessageSquare,
  ShieldCheck,
  CheckCircle2,
  MapPin,
  Clock,
} from 'lucide-react';

interface DueDateCalculatorPageProps {
  onOpenBooking: (doctorName?: string, branchId?: string, treatmentName?: string) => void;
  language?: 'en' | 'ne';
}

export const DueDateCalculatorPage: React.FC<DueDateCalculatorPageProps> = ({
  onOpenBooking,
  language = 'en',
}) => {
  return (
    <div className="space-y-12 pb-20">
      {/* 1. HERO BANNER */}
      <section className="bg-gradient-to-b from-[#1D3B58] to-[#122538] text-white py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-semibold bg-white/10 text-[#E48AA0] px-3.5 py-1.5 rounded-full">
            <Baby className="w-3.5 h-3.5" />
            <span>Interactive Clinical Tool</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            Pregnancy Due Date & Ultrasound Schedule Calculator
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
            Whether you conceived naturally, through Intrauterine Insemination (IUI), or via an IVF Day 5 Blastocyst transfer, calculate your exact estimated delivery date (EDD), trimester milestones, and recommended ultrasound scans at Maulakalika Hospital, Chitwan.
          </p>
        </div>
      </section>

      {/* 2. THE INTERACTIVE CALCULATOR TOOL */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <DueDateCalculator
          onOpenBookingForScan={(scanName) =>
            onOpenBooking(undefined, 'chitwan', scanName || 'Pregnancy Ultrasound Scan')
          }
          language={language}
        />
      </section>

      {/* 3. ULTRASOUND SERVICES AT MAULAKALIKA HOSPITAL */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#F9FAFC] rounded-3xl border border-slate-200 p-8 sm:p-12 space-y-8">
          <div className="max-w-3xl space-y-2">
            <span className="text-xs font-bold text-[#E48AA0] uppercase tracking-wider">
              High-Resolution Imaging
            </span>
            <h3 className="text-2xl font-bold text-[#1D3B58]">
              Advanced 4D Obstetric Ultrasound at Maulakalika Hospital
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Our Chitwan centre features high-definition GE Voluson™ 4D ultrasound technology operated by consultant gynecological sonologists, ensuring crystalline visualization of early embryonic heartbeats, nuchal translucency, and fetal anatomy.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-2">
              <span className="font-bold text-[#1D3B58] text-sm block">1. Viability Scan (6–8 Wks)</span>
              <p className="text-slate-600">Confirms intrauterine gestational sac, crown-rump length, and fetal cardiac activity.</p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-2">
              <span className="font-bold text-[#1D3B58] text-sm block">2. NT Scan (11–13.6 Wks)</span>
              <p className="text-slate-600">Measures fetal nuchal translucency and nasal bone for chromosomal screening.</p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-2">
              <span className="font-bold text-[#1D3B58] text-sm block">3. Anomaly Scan (18–20 Wks)</span>
              <p className="text-slate-600">Comprehensive head-to-toe structural anatomical survey and placenta localization.</p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-2">
              <span className="font-bold text-[#1D3B58] text-sm block">4. Growth Doppler (28–32 Wks)</span>
              <p className="text-slate-600">Assesses fetal weight velocity, amniotic fluid index (AFI), and umbilical blood flow.</p>
            </div>
          </div>

          <div className="pt-4 flex flex-wrap gap-4 items-center justify-between border-t border-slate-200">
            <div className="flex items-center gap-2 text-xs text-slate-600">
              <MapPin className="w-4 h-4 text-[#E48AA0]" />
              <span>Ultrasound Suite: Maulakalika Hospital Pvt. Ltd., Bharatpur-11, Chitwan</span>
            </div>

            <div className="flex gap-3">
              <a
                href="tel:056493798"
                className="bg-[#1D3B58] hover:bg-[#2B5A88] text-white px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#E48AA0]" />
                <span>Call: 056-493798</span>
              </a>
              <a
                href="https://wa.me/9779855088798"
                target="_blank"
                rel="noreferrer"
                className="bg-[#25D366] hover:bg-[#1EBE5D] text-white px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp 9855088798</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DueDateCalculatorPage;
