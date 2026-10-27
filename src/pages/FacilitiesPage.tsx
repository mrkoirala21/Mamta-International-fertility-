import React from 'react';
import { IMAGES } from '../assets/images';
import Breadcrumbs from '../components/Breadcrumbs';
import {
  Building2,
  Microscope,
  ShieldCheck,
  CheckCircle2,
  Activity,
  Layers,
  Thermometer,
  Eye,
  Calendar,
  Phone,
} from 'lucide-react';

interface FacilitiesPageProps {
  onNavigate: (path: string) => void;
  onOpenBooking: (doctorName?: string, branchId?: string, treatment?: string) => void;
  language?: 'en' | 'ne';
}

export const FacilitiesPage: React.FC<FacilitiesPageProps> = ({
  onNavigate,
  onOpenBooking,
  language = 'en',
}) => {
  const facilityItems = [
    {
      title: 'Class 10,000 / ISO 5 Positive Pressure Embryology Cleanroom',
      nepaliTitle: 'अन्तर्राष्ट्रिय स्तरको ISO 5 एम्ब्रियोलोजी क्लिनरुम ल्याब',
      icon: Microscope,
      highlight: 'Ultra-Pure Air with VOC & Carbon Filtration',
      description: 'Human embryos are exceptionally vulnerable to volatile organic compounds (VOCs) and temperature fluctuations. Our embryology laboratory maintains continuous positive air pressure, 24/7 HEPA air purification, and strict zero-particulate invariants to maximize blastocyst viability.'
    },
    {
      title: 'ESCO MIRI® Multi-Room Benchtop Time-Lapse Incubators',
      nepaliTitle: 'ESCO MIRI® मल्टि-रुम इन्क्युबेटर प्रविधि',
      icon: Thermometer,
      highlight: 'Independent Chambers for Every Patient',
      description: 'Unlike old box incubators where opening the door affects all embryos, our ESCO MIRI system provides individual heated chambers for each couple. Temperature recovers in under 1 minute, maintaining continuous optimal osmolarity, tri-gas ratios (5% O2, 6% CO2), and zero metabolic stress.'
    },
    {
      title: 'Nikon / Narishige Motorized ICSI Micromanipulators',
      nepaliTitle: 'रोबोटिक ICSI माइक्रो-म्यानुपुलेटर स्टेसन',
      icon: Layers,
      highlight: 'Sub-Micron Precision Injection',
      description: 'Equipped with anti-vibration air tables, heated glass stages, and inverted high-magnification optics, our senior embryologists execute delicate single-sperm injections into mature oocytes with minimal cellular trauma.'
    },
    {
      title: 'CryoLock® Liquid Nitrogen Bio-Banking Suite (-196°C)',
      nepaliTitle: 'तरल नाइट्रोजन क्रायो-बैंकिङ बायो-बैंक (-१९६°C)',
      icon: ShieldCheck,
      highlight: 'Automated 24/7 Telemetry Alarms',
      description: 'Our cryogenic bio-bank features specialized vacuum-insulated liquid nitrogen tanks storing vitrified eggs, sperm, and blastocysts with indefinite biological viability. Telemetry sensors monitor liquid nitrogen levels and temperature around the clock.'
    },
    {
      title: 'Karl Storz 4K Ultra-HD Surgical Endoscopy Towers',
      nepaliTitle: 'Karl Storz 4K अल्ट्रा-HD ल्यापारोस्कोपी शल्यक्रिया कक्ष',
      icon: Activity,
      highlight: 'Sub-Millimeter Tissue Preservation',
      description: 'At Maulakalika Hospital, our minimally invasive operating theaters feature 4K optical visualization for laparoscopic endometriosis excision, tubal recanalization, and hysteroscopic uterine septum repair with rapid 24-hour discharge.'
    },
    {
      title: 'On-Site Level II / III Neonatal Intensive Care Unit (NICU)',
      nepaliTitle: 'अस्पताल परिसरमै चौबिसै घण्टा Level II/III NICU सुविधा',
      icon: Building2,
      highlight: 'Immediate Newborn Safety',
      description: 'Integrated directly within Maulakalika Hospital Pvt. Ltd., our on-site Level II/III NICU provides servo-controlled incubators, phototherapy, and specialized neonatal pediatricians ready 24/7 for premature or vulnerable babies.'
    }
  ];

  return (
    <div className="min-w-0 bg-[#F9FAFC] pb-20">
      <div className="bg-white border-b border-slate-100">
        <Breadcrumbs
          items={[{ label: 'Facilities & Technology' }]}
          onNavigate={onNavigate}
        />
      </div>

      {/* HERO */}
      <section className="bg-gradient-to-b from-white to-[#F9FAFC] pt-12 pb-14 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5 text-center max-w-4xl">
          <div className="text-xs font-bold text-[#E48AA0] uppercase tracking-wider">
            Hospital Infrastructure & Embryology Lab
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1D3B58] tracking-tight">
            World-Class Embryology Lab & Hospital Facilities
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Clinical success in IVF is determined by embryology laboratory precision. Mamta International operates an advanced positive-pressure cleanroom and multi-room time-lapse incubators hosted within the full multi-specialty infrastructure of Maulakalika Hospital Pvt. Ltd., Chitwan.
          </p>
        </div>
      </section>

      {/* LAB SHOWCASE BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="rounded-3xl overflow-hidden border border-slate-200 bg-white shadow-xs grid grid-cols-1 lg:grid-cols-2 items-center">
          <div className="h-72 sm:h-96 lg:h-full relative overflow-hidden bg-slate-100">
            <img
              src={IMAGES.advancedLab}
              alt="Advanced Embryology Lab at Mamta International"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1D3B58]/60 via-transparent to-transparent flex items-end p-6">
              <span className="text-white text-xs font-bold bg-[#1D3B58]/80 backdrop-blur-xs px-3 py-1.5 rounded-lg border border-white/20">
                Maulakalika Hospital Embryology Suite
              </span>
            </div>
          </div>

          <div className="p-6 sm:p-10 space-y-4">
            <span className="text-xs font-bold text-[#E48AA0] uppercase tracking-wider block">
              Rigorous Laboratory Standards
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1D3B58]">
              Zero-Compromise Environmental Control for Growing Embryos
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Every stage of egg fertilization, cleavage, and blastocyst development occurs in a micro-environment calibrated to match the natural human fallopian tube and womb. From positive air pressure locks to medical grade gases, our lab safeguards your embryos at every second.
            </p>

            <div className="space-y-2 pt-2">
              <div className="flex items-center gap-2 text-xs font-bold text-[#1D3B58]">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Continuous 24/7 VOC & Particulate Filtration</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-[#1D3B58]">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Dual Backup Uninterruptible Power Supply (UPS) & Generators</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-[#1D3B58]">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Strict Laboratory Identification & Electronic Double-Check Protocol</span>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={() => onOpenBooking()}
                className="bg-[#E48AA0] hover:bg-[#D4748B] text-white px-6 py-3 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer shadow-sm"
              >
                Schedule Consultation & Center Tour
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FACILITIES GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <div>
          <span className="text-xs font-bold text-[#E48AA0] uppercase tracking-wider block">
            Core Infrastructure
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1D3B58] mt-1">
            Technology & Patient Amenities
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {facilityItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-7 space-y-4 shadow-xs flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#FCEEF1] text-[#C96D83] flex items-center justify-center shrink-0">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-bold text-[#E48AA0] block">{item.highlight}</span>
                  <h3 className="text-lg font-bold text-[#1D3B58] leading-snug">
                    {language === 'en' ? item.title : item.nepaliTitle}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default FacilitiesPage;
