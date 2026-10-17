import React from 'react';
import { MATERNITY_SERVICES } from '../data/fertilityData';
import {
  Heart,
  Eye,
  Stethoscope,
  Baby,
  Smile,
  ShieldCheck,
  Activity,
  Calendar,
  Phone,
  CheckCircle2,
  Building2,
  Sparkles,
} from 'lucide-react';

interface MaternityCareSectionProps {
  onOpenBooking: (doctorName?: string, branchId?: string, treatmentName?: string) => void;
  onNavigate?: (page: string) => void;
  language?: 'en' | 'ne';
}

const iconMap: Record<string, React.ElementType> = {
  Heart,
  Eye,
  Stethoscope,
  Baby,
  Smile,
  ShieldCheck,
  Activity,
};

export const MaternityCareSection: React.FC<MaternityCareSectionProps> = ({
  onOpenBooking,
  onNavigate,
  language = 'en',
}) => {
  return (
    <section id="maternity-care" className="py-16 md:py-24 bg-gradient-to-b from-[#F9FAFC] via-white to-[#F9FAFC] border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-[#C96D83] bg-[#FCEEF1] px-3.5 py-1 rounded-full uppercase tracking-wider">
            <Baby className="w-3.5 h-3.5" />
            <span>{language === 'en' ? 'Maternal & Newborn Continuum' : 'मातृत्व तथा शिशु स्वास्थ्य'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1D3B58] tracking-tight">
            {language === 'en'
              ? 'Complete Care from Conception to Delivery'
              : 'गर्भाधानदेखि सुत्केरीसम्मको सम्पूर्ण ममतामयी हेरचाह'}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            {language === 'en'
              ? 'At Mamta International Fertility Center within Maulakalika Hospital Chitwan, your care does not end with a positive pregnancy test. We guide expectant mothers seamlessly through 5D ultrasound, obstetrics consultations, safe hospital delivery, newborn care, and Level II/III NICU support.'
              : 'मौलकालिका अस्पताल चितवनमा गर्भावस्थाको परीक्षण, ५D अल्ट्रासाउन्ड, विशेषज्ञ प्रसूति सेवा, नवजात शिशु हेरचाह र एन.आई.सि.यु (NICU) सुविधा।'}
          </p>
        </div>

        {/* 7 MATERNITY CARE PILLARS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {MATERNITY_SERVICES.map((srv, idx) => {
            const IconComponent = iconMap[srv.icon] || Heart;
            const isNICU = srv.id === 'nicu-services';
            const is5D = srv.id === '5d-ultrasound';

            return (
              <div
                key={srv.id}
                className={`rounded-3xl border transition-all duration-300 p-6 sm:p-7 flex flex-col justify-between group ${
                  isNICU
                    ? 'md:col-span-2 lg:col-span-3 bg-gradient-to-r from-[#1D3B58] to-[#122538] text-white border-[#2A4D70] shadow-md'
                    : is5D
                    ? 'bg-gradient-to-b from-white to-purple-50/40 border-purple-200/80 shadow-xs hover:border-purple-400'
                    : 'bg-white border-slate-200/90 hover:border-[#E48AA0] shadow-2xs hover:shadow-sm'
                }`}
              >
                <div className="space-y-4">
                  {/* ICON & BADGE */}
                  <div className="flex items-center justify-between gap-3">
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-2xs ${
                        isNICU
                          ? 'bg-white/10 text-[#E48AA0]'
                          : is5D
                          ? 'bg-purple-100 text-purple-700'
                          : 'bg-[#FCEEF1] text-[#C96D83]'
                      }`}
                    >
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span
                      className={`text-[11px] font-bold px-3 py-1 rounded-full ${
                        isNICU
                          ? 'bg-white/15 text-[#E48AA0]'
                          : is5D
                          ? 'bg-purple-100/80 text-purple-800'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {srv.badge}
                    </span>
                  </div>

                  {/* TITLE & DESCRIPTION */}
                  <div className="space-y-1.5">
                    <h3
                      className={`text-lg sm:text-xl font-bold ${
                        isNICU ? 'text-white' : 'text-[#1D3B58]'
                      }`}
                    >
                      {language === 'en' ? srv.title : srv.nepaliTitle}
                    </h3>
                    <p
                      className={`text-xs sm:text-sm leading-relaxed ${
                        isNICU ? 'text-slate-300' : 'text-slate-600'
                      }`}
                    >
                      {srv.description}
                    </p>
                  </div>

                  {/* FEATURES */}
                  <div
                    className={`pt-2 border-t space-y-1.5 ${
                      isNICU ? 'border-white/10' : 'border-slate-100'
                    }`}
                  >
                    {srv.features.map((ft, i) => (
                      <div
                        key={i}
                        className={`flex items-start gap-2 text-xs ${
                          isNICU ? 'text-slate-300' : 'text-slate-600'
                        }`}
                      >
                        <CheckCircle2
                          className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${
                            isNICU ? 'text-[#E48AA0]' : 'text-emerald-600'
                          }`}
                        />
                        <span>{ft}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* BOTTOM ACTION */}
                <div
                  className={`pt-4 mt-4 border-t flex items-center justify-between gap-3 ${
                    isNICU ? 'border-white/10' : 'border-slate-100'
                  }`}
                >
                  <button
                    onClick={() =>
                      onOpenBooking(
                        srv.id === '5d-ultrasound' ? 'Dr. Ramesh Ghimire' : 'Dr. Kesheb Bhurtel',
                        'chitwan',
                        srv.title
                      )
                    }
                    className={`text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 ${
                      isNICU
                        ? 'text-[#E48AA0] hover:text-white'
                        : 'text-[#C96D83] hover:text-[#1D3B58]'
                    }`}
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Book {srv.badge} Consultation</span>
                  </button>

                  <span
                    className={`text-[11px] ${
                      isNICU ? 'text-slate-400' : 'text-slate-500'
                    }`}
                  >
                    Maulakalika Hospital
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* HOSPITAL CAMPUS REASSURANCE CALLOUT */}
        <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-2xs flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 text-[#1D3B58] flex items-center justify-center shrink-0">
              <Building2 className="w-6 h-6 text-[#1D3B58]" />
            </div>
            <div>
              <h4 className="font-bold text-sm sm:text-base text-[#1D3B58]">
                Integrated Medical Care at Maulakalika Hospital Pvt. Ltd.
              </h4>
              <p className="text-xs text-slate-500">
                Bharatpur-11, Chitwan · Complete institutional facilities including labor rooms, emergency support, pathology, and newborn intensive care.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => onOpenBooking(undefined, 'chitwan', 'Maternity Care')}
              className="bg-[#E48AA0] hover:bg-[#D4748B] text-white px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-xs transition-colors cursor-pointer"
            >
              Book Maternity Consultation
            </button>
            <a
              href="tel:056493798"
              className="border border-slate-300 hover:border-[#1D3B58] text-[#1D3B58] px-4 py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition-colors flex items-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5 text-slate-500" />
              <span>056-493798</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MaternityCareSection;
