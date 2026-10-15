import React from 'react';
import { DOCTORS } from '../data/fertilityData';
import {
  Calendar,
  Award,
  Star,
  Clock,
  Sparkles,
  CheckCircle2,
  Phone,
  MessageSquare,
  Building2,
  Stethoscope,
} from 'lucide-react';

interface DoctorsPageProps {
  onOpenBooking: (doctorName?: string, branchId?: string, treatmentName?: string) => void;
  language?: 'en' | 'ne';
}

export const DoctorsPage: React.FC<DoctorsPageProps> = ({ onOpenBooking, language = 'en' }) => {
  return (
    <div className="space-y-16 pb-20">
      {/* 1. HERO HEADER */}
      <section className="bg-gradient-to-b from-[#1D3B58] to-[#122538] text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-semibold bg-white/10 text-[#E48AA0] px-3.5 py-1.5 rounded-full">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Senior Medical Directorate & Clinical Team</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            Fertility Specialists & Embryologists
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
            Meet our esteemed clinical specialists practicing at Maulakalika Hospital Pvt. Ltd., Bharatpur-11, Chitwan. Combining international training from Singapore, the UK, Germany, and South Korea with deep compassionate dedication.
          </p>
          <div className="pt-2 flex items-center gap-4 text-xs text-[#E48AA0] font-semibold">
            <span>✓ Book Available Slots Directly</span>
            <span>·</span>
            <span>✓ NMC Registered & ESHRE Certified</span>
            <span>·</span>
            <span>✓ Second Opinion Consultations</span>
          </div>
        </div>
      </section>

      {/* 2. DOCTORS DETAILED PROFILES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {DOCTORS.map((doc) => (
            <div
              key={doc.id}
              className="bg-white rounded-3xl border border-slate-200/90 hover:border-[#E48AA0] p-6 sm:p-8 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-6"
            >
              <div className="space-y-6">
                {/* PHOTO & BASIC INFO */}
                <div className="flex flex-col sm:flex-row gap-5 items-start">
                  <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden bg-slate-100 shrink-0 border-2 border-slate-100 shadow-xs relative">
                    {doc.image ? (
                      <img
                        src={doc.image}
                        alt={doc.name}
                        className="w-full h-full object-cover object-top"
                      />
                    ) : (
                      <div className="w-full h-full bg-[#1D3B58] text-white flex items-center justify-center text-3xl font-bold">
                        {doc.name.split(' ')[1]?.[0] || 'D'}
                      </div>
                    )}
                    <span className="absolute bottom-1 right-1 bg-white text-[#1D3B58] text-[10px] font-bold px-2 py-0.5 rounded shadow-xs">
                      {doc.experienceYears}+ Yrs
                    </span>
                  </div>

                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-bold text-[#C96D83] bg-[#FCEEF1] px-2.5 py-0.5 rounded-full">
                        {doc.patientSatisfaction} Satisfaction
                      </span>
                    </div>

                    <h2 className="text-xl sm:text-2xl font-bold text-[#1D3B58]">
                      {doc.name}
                    </h2>
                    <p className="text-xs sm:text-sm font-semibold text-[#E48AA0]">
                      {doc.role}
                    </p>
                    <p className="text-xs text-slate-500 font-medium">
                      {doc.qualifications}
                    </p>
                  </div>
                </div>

                {/* BIOGRAPHY */}
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {doc.bio}
                </p>

                {/* FELLOWSHIPS */}
                <div className="space-y-1.5 pt-2 border-t border-slate-100 text-xs">
                  <span className="font-bold text-slate-800 block">International Fellowships & Credentials:</span>
                  <ul className="space-y-1">
                    {doc.fellowships.map((f, i) => (
                      <li key={i} className="flex items-center gap-1.5 text-slate-600">
                        <Award className="w-3.5 h-3.5 text-[#E48AA0] shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CLINICAL SPECIALTIES TAGS */}
                <div className="space-y-1.5 text-xs">
                  <span className="font-bold text-slate-800 block">Areas of Clinical Focus:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {doc.specialties.map((spec, i) => (
                      <span
                        key={i}
                        className="bg-slate-50 border border-slate-200 text-slate-700 px-2.5 py-1 rounded-lg text-[11px] font-medium"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                {/* OPD SCHEDULE AT MAULAKALIKA HOSPITAL */}
                <div className="p-3.5 bg-slate-50 rounded-xl space-y-1 text-xs border border-slate-200/80">
                  <div className="flex items-center justify-between text-slate-700">
                    <span className="font-semibold flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#E48AA0]" />
                      <span>Consultation Schedule:</span>
                    </span>
                    <span className="font-bold text-[#1D3B58]">{doc.availableDays}</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-500 pt-1 border-t border-slate-200">
                    <span>OPD Location:</span>
                    <span className="font-medium text-slate-700">Maulakalika Hospital, Bharatpur-11</span>
                  </div>
                </div>
              </div>

              {/* ACTION: BOOK APPOINTMENT FOR THIS DOCTOR */}
              <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
                <button
                  onClick={() => onOpenBooking(doc.name, 'chitwan')}
                  className="flex-1 bg-[#E48AA0] hover:bg-[#D4748B] text-white py-3 px-4 rounded-xl font-bold text-xs sm:text-sm shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Appointment with {doc.name.split(' ')[1]}</span>
                </button>
                <a
                  href="https://wa.me/9779855088798"
                  target="_blank"
                  rel="noreferrer"
                  className="bg-[#25D366] hover:bg-[#1EBE5D] text-white p-3 rounded-xl transition-colors shrink-0 shadow-xs"
                  title="Inquire on WhatsApp"
                >
                  <MessageSquare className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. MULTI-DISCIPLINARY CARE STRIP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#1D3B58] text-white rounded-3xl p-8 sm:p-12 space-y-6">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-bold text-[#E48AA0] uppercase tracking-wider">
              Comprehensive Care Board
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold">
              Every Patient Case is Reviewed by a Collaborative Board
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              At Mamata International Fertility Centre, difficult or recurrent IVF cases are never managed in isolation. Dr. Anusha Tiwari, Chief Embryologist Dr. Bikash Adhikari, and Consultant Andrologist Dr. Suresh Thapa meet in weekly clinical review rounds to calibrate stimulation protocols, fertilization strategies, and implantation windows for each couple.
            </p>
          </div>

          <div className="pt-2 flex flex-wrap gap-4 text-xs sm:text-sm">
            <a
              href="tel:056493798"
              className="bg-white/10 hover:bg-white/20 text-white px-5 py-2.5 rounded-xl font-bold transition-colors flex items-center gap-2"
            >
              <Phone className="w-4 h-4 text-[#E48AA0]" />
              <span>Call Doctor Desk: 056-493798</span>
            </a>
            <a
              href="https://wa.me/9779855088798"
              target="_blank"
              rel="noreferrer"
              className="bg-[#25D366] hover:bg-[#1EBE5D] text-white px-5 py-2.5 rounded-xl font-bold transition-colors flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp Inquiries (9855088798)</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DoctorsPage;
