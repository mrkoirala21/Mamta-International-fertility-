import React, { useState } from 'react';
import { DOCTORS, Doctor } from '../data/fertilityData';
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
  Eye,
  Baby,
  Activity,
  AlertCircle,
  HelpCircle,
  ArrowRight,
  Scissors,
  Heart,
  Layers,
  ShieldCheck,
} from 'lucide-react';

interface DoctorsPageProps {
  onOpenBooking: (doctorName?: string, branchId?: string, treatmentName?: string) => void;
  language?: 'en' | 'ne';
}

export const DoctorsPage: React.FC<DoctorsPageProps> = ({ onOpenBooking, language = 'en' }) => {
  const [activeDepartment, setActiveDepartment] = useState<string>('all');

  const departments = [
    { id: 'all', label: language === 'en' ? 'All Specialists (8)' : 'सबै विशेषज्ञहरू' },
    { id: 'fertility', label: language === 'en' ? 'Fertility Care' : 'प्रजनन विशेषज्ञ' },
    { id: 'ultrasound', label: language === 'en' ? 'Ultrasound & 5D Imaging' : 'अल्ट्रासाउन्ड तथा ५D' },
    { id: 'obstetrics', label: language === 'en' ? 'Obstetrics & NICU Team' : 'प्रसूति तथा NICU समूह' },
    { id: 'laparoscopic', label: language === 'en' ? 'Laparoscopic Surgery Team' : 'ल्यापारोस्कोपिक शल्यक्रिया समूह' },
    { id: 'embryology', label: language === 'en' ? 'Embryology & Andrology' : 'भ्रूण तथा पुरुष प्रजनन' },
  ];

  const filteredDoctors = DOCTORS.filter((doc) => {
    if (activeDepartment === 'all') return true;
    if (activeDepartment === 'embryology') {
      return doc.department === 'embryology' || doc.department === 'andrology';
    }
    return doc.department === activeDepartment;
  });

  return (
    <div className="space-y-16 pb-20">
      {/* 1. HERO HEADER */}
      <section className="bg-gradient-to-b from-[#1D3B58] to-[#122538] text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-semibold bg-white/10 text-[#E48AA0] px-3.5 py-1.5 rounded-full">
            <Sparkles className="w-3.5 h-3.5" />
            <span>
              {language === 'en'
                ? 'Clinical Leadership & Care Teams · Maulakalika Hospital Chitwan'
                : 'अनुभवी चिकित्सक तथा स्वास्थ्य टोली'}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            {language === 'en'
              ? 'Our Doctors & Medical Specialists'
              : 'हाम्रा विशेषज्ञ डाक्टरहरू'}
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
            {language === 'en'
              ? 'Meet the dedicated multidisciplinary medical specialists at Mamta International Fertility Center, practicing at Maulakalika Hospital Pvt. Ltd., Bharatpur-11, Chitwan. From fertility investigations to 5D ultrasound, obstetrics, and laparoscopic care.'
              : 'मौलकालिका अस्पताल, भरतपुर-११, चितवनमा कार्यरत हाम्रा वरिष्ठ प्रजनन विशेषज्ञ, स्त्री तथा प्रसूति रोग विशेषज्ञ, अल्ट्रासाउन्ड विशेषज्ञ र शल्यचिकित्सकहरूको समूह।'}
          </p>
          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-[#E48AA0] font-semibold">
            <span>✓ Verified Medical Practitioners</span>
            <span>·</span>
            <span>✓ Maulakalika Hospital Campus</span>
            <span>·</span>
            <span>✓ Compassionate Patient-Centered Focus</span>
          </div>
        </div>
      </section>

      {/* 2. DEPARTMENT FILTER TABS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {departments.map((dept) => (
            <button
              key={dept.id}
              onClick={() => setActiveDepartment(dept.id)}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                activeDepartment === dept.id
                  ? 'bg-[#1D3B58] text-white shadow-sm ring-2 ring-[#E48AA0]'
                  : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200'
              }`}
            >
              {dept.label}
            </button>
          ))}
        </div>
      </section>

      {/* 3. DOCTORS DETAILED PROFILES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredDoctors.map((doc) => (
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
                      <div className="w-full h-full bg-gradient-to-tr from-[#1D3B58] to-[#2B5A88] text-white flex flex-col items-center justify-center p-3 text-center">
                        <Stethoscope className="w-8 h-8 text-[#E48AA0] mb-1 opacity-90" />
                        <span className="text-xl font-bold tracking-tight">
                          {doc.name.replace('Dr. ', '').split(' ')[0]}
                        </span>
                        <span className="text-[10px] text-slate-300 uppercase tracking-wider font-semibold mt-0.5">
                          {doc.department || 'Clinical'}
                        </span>
                      </div>
                    )}
                    {doc.experienceYears && (
                      <span className="absolute bottom-1 right-1 bg-white text-[#1D3B58] text-[10px] font-bold px-2 py-0.5 rounded shadow-xs">
                        {doc.experienceYears}+ Yrs
                      </span>
                    )}
                  </div>

                  <div className="space-y-1.5 flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-1.5">
                      {doc.id === 'dr-anusha' && (
                        <span className="text-[11px] font-bold text-[#C96D83] bg-[#FCEEF1] px-2.5 py-0.5 rounded-full">
                          Focal Person · Fertility Care
                        </span>
                      )}
                      {doc.department === 'obstetrics' && (
                        <span className="text-[11px] font-bold text-sky-800 bg-sky-50 px-2.5 py-0.5 rounded-full">
                          Obstetrics Team
                        </span>
                      )}
                      {doc.department === 'laparoscopic' && (
                        <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                          Laparoscopic Surgery Team
                        </span>
                      )}
                      {doc.department === 'ultrasound' && (
                        <span className="text-[11px] font-bold text-purple-800 bg-purple-50 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          5D Ultrasound Services
                        </span>
                      )}
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

                    {/* Pending Confirmation Note */}
                    {doc.pendingConfirmation && (
                      <div className="mt-1.5 p-2 bg-amber-50 border border-amber-200/70 rounded-lg text-[11px] text-amber-800 flex items-start gap-1.5">
                        <AlertCircle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                        <span>{doc.verificationNote || 'Doctor designation and qualifications pending institutional confirmation.'}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* SPECIAL HIGHLIGHT: DR. ANUSHA TIWARI EXPERIENCE PILLARS */}
                {doc.id === 'dr-anusha' && (
                  <div className="grid grid-cols-2 gap-3 p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80 text-center">
                    <div className="border-r border-slate-200 pr-2">
                      <span className="text-xl font-extrabold text-[#1D3B58] block">9+ Years</span>
                      <span className="text-[11px] text-slate-600 font-medium">Obstetrics Experience</span>
                    </div>
                    <div className="pl-2">
                      <span className="text-xl font-extrabold text-[#C96D83] block">6+ Years</span>
                      <span className="text-[11px] text-slate-600 font-medium">Fertility Care Experience</span>
                    </div>
                  </div>
                )}

                {/* SPECIAL HIGHLIGHT: DR. RAMESH GHIMIRE 5D ULTRASOUND */}
                {doc.id === 'dr-ramesh-ghimire' && (
                  <div className="p-3.5 bg-purple-50/70 rounded-2xl border border-purple-200/60 text-xs text-purple-900 space-y-1">
                    <div className="font-bold flex items-center gap-1.5 text-purple-950">
                      <Eye className="w-4 h-4 text-purple-600" />
                      <span>Dedicated Service Area: 5D Ultrasound & Pregnancy Monitoring</span>
                    </div>
                    <p className="text-[11px] text-purple-800 leading-relaxed">
                      Every step monitored with professional doctor care: high-definition 5D ultrasound scans, comprehensive fetal well-being assessments, and continuous pregnancy monitoring at Maulakalika Hospital.
                    </p>
                  </div>
                )}

                {/* SPECIAL HIGHLIGHT: DR. KESHEB BHURTEL (OBSTETRICS & NICU) */}
                {doc.id === 'dr-kesheb' && (
                  <div className="p-3.5 bg-sky-50/80 rounded-2xl border border-sky-200/80 text-xs text-sky-950 space-y-1.5">
                    <div className="font-bold flex items-center justify-between text-sky-950">
                      <span className="flex items-center gap-1.5">
                        <Baby className="w-4 h-4 text-sky-600" />
                        <span>High-Risk Obstetrics & Level II/III NICU Coordination</span>
                      </span>
                      <span className="text-[10px] bg-sky-100 text-sky-800 font-bold px-2 py-0.5 rounded-full">
                        NICU Liaison
                      </span>
                    </div>
                    <p className="text-[11px] text-sky-800 leading-relaxed">
                      Lead obstetrician managing complex and high-risk pregnancies, normal & operative deliveries, with direct on-site alignment with Maulakalika Hospital’s Level II/III Neonatal Intensive Care Unit (NICU) for vulnerable or preterm newborns.
                    </p>
                  </div>
                )}

                {/* SPECIAL HIGHLIGHT: DR. ANUPAMA KARKI (STARTING TO DELIVERY & POSTNATAL) */}
                {doc.id === 'dr-anupama' && (
                  <div className="p-3.5 bg-rose-50/70 rounded-2xl border border-rose-200/70 text-xs text-rose-950 space-y-1.5">
                    <div className="font-bold flex items-center justify-between text-rose-950">
                      <span className="flex items-center gap-1.5">
                        <Heart className="w-4 h-4 text-rose-600" />
                        <span>Care from Conception to Delivery & Postnatal (After Birth) Care</span>
                      </span>
                      <span className="text-[10px] bg-rose-100 text-rose-800 font-bold px-2 py-0.5 rounded-full">
                        Starting to Delivery
                      </span>
                    </div>
                    <p className="text-[11px] text-rose-800 leading-relaxed">
                      Comprehensive care continuum from early pregnancy monitoring through safe delivery and dedicated postnatal care (after birth)—focusing on maternal physical recovery, wound healing, lactation guidance, and nursery transition.
                    </p>
                  </div>
                )}

                {/* SPECIAL HIGHLIGHT: DR. RAMESH POUDEL (LEAD LAPAROSCOPIC SURGERY) */}
                {doc.id === 'dr-ramesh-poudel' && (
                  <div className="p-3.5 bg-emerald-50/80 rounded-2xl border border-emerald-200/80 text-xs text-emerald-950 space-y-1.5">
                    <div className="font-bold flex items-center justify-between text-emerald-950">
                      <span className="flex items-center gap-1.5">
                        <Scissors className="w-4 h-4 text-emerald-600" />
                        <span>Lead Laparoscopic Surgeon · 4K Keyhole Reproductive Surgery</span>
                      </span>
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                        Surgical Lead
                      </span>
                    </div>
                    <p className="text-[11px] text-emerald-800 leading-relaxed">
                      Advanced minimally invasive 4K keyhole laparoscopy and operative hysteroscopy: precision excision of pelvic endometriosis, tubal cannulation, uterine septum correction, and fibroid removal to restore natural fertility and IVF receptivity.
                    </p>
                  </div>
                )}

                {/* SPECIAL HIGHLIGHT: DR. RITU (LAPAROSCOPIC SURGERY TEAM) */}
                {doc.id === 'dr-ritu' && (
                  <div className="p-3.5 bg-teal-50/80 rounded-2xl border border-teal-200/80 text-xs text-teal-950 space-y-1.5">
                    <div className="font-bold flex items-center justify-between text-teal-950">
                      <span className="flex items-center gap-1.5">
                        <Layers className="w-4 h-4 text-teal-600" />
                        <span>Laparoscopic Surgery Team · Minimally Invasive Fertility Evaluation</span>
                      </span>
                      <span className="text-[10px] bg-teal-100 text-teal-800 font-bold px-2 py-0.5 rounded-full">
                        Keyhole Surgery
                      </span>
                    </div>
                    <p className="text-[11px] text-teal-800 leading-relaxed">
                      Diagnostic and operative keyhole procedures prioritizing tissue-sparing ovarian cystectomy, pelvic scar relief (adhesiolysis), and uterine cavity assessment prior to assisted conception cycles.
                    </p>
                  </div>
                )}

                {/* BIOGRAPHY */}
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {doc.bio}
                </p>

                {/* KEY PROCEDURES / AREAS OF EXPERTISE GRID */}
                {doc.keyProcedures && doc.keyProcedures.length > 0 && (
                  <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
                    <span className="font-bold text-slate-800 flex items-center gap-1.5">
                      <Activity className="w-3.5 h-3.5 text-[#1D3B58]" />
                      <span>Key Clinical Procedures & Specific Expertise:</span>
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                      {doc.keyProcedures.map((proc, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-1.5 text-slate-700 bg-slate-50 p-2 rounded-xl border border-slate-200/70 text-[11px] font-medium leading-snug"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{proc}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* CLINICAL HIGHLIGHTS & INSTITUTIONAL SCOPE */}
                {doc.clinicalHighlights && doc.clinicalHighlights.length > 0 && (
                  <div className="space-y-1.5 bg-slate-50/70 p-3 rounded-2xl border border-slate-200/70 text-xs">
                    <span className="font-bold text-slate-800 text-[11px] flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-[#C96D83]" />
                      <span>Institutional Clinical Highlights:</span>
                    </span>
                    <ul className="space-y-1">
                      {doc.clinicalHighlights.map((hl, i) => (
                        <li key={i} className="flex items-start gap-1.5 text-slate-600 text-[11px] leading-relaxed">
                          <span className="text-[#C96D83] font-bold">✓</span>
                          <span>{hl}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* FELLOWSHIPS & CREDENTIALS */}
                {doc.fellowships && doc.fellowships.length > 0 && (
                  <div className="space-y-1.5 pt-2 border-t border-slate-100 text-xs">
                    <span className="font-bold text-slate-800 block">Focus Areas & Fellowships:</span>
                    <ul className="space-y-1">
                      {doc.fellowships.map((f, i) => (
                        <li key={i} className="flex items-center gap-1.5 text-slate-600">
                          <Award className="w-3.5 h-3.5 text-[#E48AA0] shrink-0" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* CLINICAL SPECIALTIES TAGS */}
                <div className="space-y-1.5 text-xs">
                  <span className="font-bold text-slate-800 block">Clinical Expertise & Scope:</span>
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

                {/* OPD SCHEDULE */}
                <div className="p-3.5 bg-slate-50 rounded-xl space-y-1 text-xs border border-slate-200/80">
                  <div className="flex items-center justify-between text-slate-700">
                    <span className="font-semibold flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#E48AA0]" />
                      <span>Consultation Schedule:</span>
                    </span>
                    <span className="font-bold text-[#1D3B58]">{doc.availableDays}</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-500 pt-1 border-t border-slate-200">
                    <span>Hospital Location:</span>
                    <span className="font-medium text-slate-700">Maulakalika Hospital, Bharatpur-11, Chitwan</span>
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
                  <span>Book Appointment</span>
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

      {/* 4. MULTI-DISCIPLINARY CARE STRIP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#1D3B58] text-white rounded-3xl p-8 sm:p-12 space-y-6">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-bold text-[#E48AA0] uppercase tracking-wider">
              Comprehensive Care Board
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold">
              Collaborative Care from Conception Through Delivery
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              At Mamta International Fertility Center, patient care is truly multidisciplinary. Dr. Anusha Tiwari (Fertility Lead), Dr. Ramesh Ghimire (Ultrasound & 5D Monitoring), our Obstetrics Team (Dr. Kesheb Bhurtel & Dr. Anupama Karki), our Laparoscopic Surgeons (Dr. Ramesh Poudel & Dr. Ritu), Chief Embryologist Dr. Bikash Adhikari, and Consultant Andrologist Dr. Suresh Thapa work in unified clinical coordination at Maulakalika Hospital.
            </p>
          </div>

          <div className="pt-2 flex flex-wrap gap-4 text-xs sm:text-sm">
            <button
              onClick={() => onOpenBooking(undefined, 'chitwan')}
              className="bg-[#E48AA0] hover:bg-[#D4748B] text-white px-5 py-2.5 rounded-xl font-bold transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
            >
              <Calendar className="w-4 h-4" />
              <span>Book an Appointment</span>
            </button>
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

