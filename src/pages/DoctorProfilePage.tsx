import React from 'react';
import { DOCTORS, Doctor } from '../data/fertilityData';
import Breadcrumbs from '../components/Breadcrumbs';
import {
  Calendar,
  Award,
  Star,
  Clock,
  CheckCircle2,
  Phone,
  Building2,
  Stethoscope,
  ArrowRight,
  ShieldCheck,
  Eye,
  Activity,
  Layers,
  Heart,
  Scissors,
} from 'lucide-react';

interface DoctorProfilePageProps {
  doctorId: string;
  onNavigate: (path: string) => void;
  onOpenBooking: (doctorName?: string, branchId?: string, treatment?: string) => void;
  language?: 'en' | 'ne';
}

export const DoctorProfilePage: React.FC<DoctorProfilePageProps> = ({
  doctorId,
  onNavigate,
  onOpenBooking,
  language = 'en',
}) => {
  const doctor = DOCTORS.find((d) => d.id === doctorId) || DOCTORS[0];
  const otherDoctors = DOCTORS.filter((d) => d.id !== doctor.id).slice(0, 3);

  return (
    <div className="min-w-0 bg-[#F9FAFC] pb-20">
      {/* 1. BREADCRUMBS */}
      <div className="bg-white border-b border-slate-100">
        <Breadcrumbs
          items={[
            { label: 'Doctors & Specialists', href: '/doctors' },
            { label: doctor.name },
          ]}
          onNavigate={onNavigate}
        />
      </div>

      {/* 2. DOCTOR HERO DOSSIER */}
      <section className="bg-gradient-to-b from-white via-white to-[#F9FAFC] pt-10 pb-12 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* PHOTO CARD */}
            <div className="lg:col-span-4 space-y-4">
              <div className="aspect-[3/4] rounded-3xl overflow-hidden bg-slate-200 border-2 border-slate-100 shadow-sm relative">
                {doctor.image ? (
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-tr from-[#1D3B58] to-[#2B5A88] text-white flex flex-col items-center justify-center p-6 text-center">
                    <Stethoscope className="w-12 h-12 text-[#E48AA0] mb-2 opacity-90" />
                    <span className="text-3xl font-bold tracking-tight">
                      {doctor.name.replace('Dr. ', '').split(' ')[0]}
                    </span>
                    <span className="text-xs text-slate-300 uppercase tracking-wider font-semibold mt-1">
                      {doctor.department || 'Clinical Specialist'}
                    </span>
                  </div>
                )}

                <div className="absolute top-3 left-3 bg-white/95 text-[#1D3B58] text-xs font-bold px-3 py-1 rounded-md shadow-xs border border-white/60 flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-[#E48AA0]" />
                  <span>{doctor.experienceYears}+ Years Clinical Exp</span>
                </div>

                <div className="absolute bottom-3 right-3 bg-emerald-600/95 text-white text-xs font-bold px-2.5 py-1 rounded-md shadow-xs flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-white" />
                  <span>{doctor.patientSatisfaction} Patient Satisfaction</span>
                </div>
              </div>

              {/* QUICK CONSULTATION CARD */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-3.5 text-xs shadow-xs">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <span className="text-slate-500 font-medium">Consultation Fee</span>
                  <span className="text-[#1D3B58] font-extrabold text-sm">{doctor.consultationFee}</span>
                </div>

                <div className="space-y-1">
                  <span className="text-slate-500 font-medium flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>OPD Hours</span>
                  </span>
                  <p className="text-[#1D3B58] font-bold">{doctor.availableDays}</p>
                </div>

                <div className="space-y-1">
                  <span className="text-slate-500 font-medium flex items-center gap-1">
                    <Building2 className="w-3.5 h-3.5 text-slate-400" />
                    <span>Practice Location</span>
                  </span>
                  <p className="text-[#1D3B58] font-bold">Maulakalika Hospital Pvt. Ltd., Chitwan</p>
                </div>

                <button
                  onClick={() => onOpenBooking(doctor.name, 'chitwan')}
                  className="w-full bg-[#E48AA0] hover:bg-[#D4748B] text-white py-3 rounded-xl font-bold text-xs transition-colors cursor-pointer shadow-xs flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Schedule Consultation with {doctor.name.split(' ')[1]}</span>
                </button>
              </div>
            </div>

            {/* BIO & CREDENTIALS */}
            <div className="lg:col-span-8 space-y-6">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  {doctor.id === 'dr-anusha' && (
                    <span className="text-xs font-bold text-[#C96D83] bg-[#FCEEF1] px-3 py-1 rounded-full">
                      Focal Person · Lead Fertility Specialist
                    </span>
                  )}
                  {doctor.department === 'ultrasound' && (
                    <span className="text-xs font-bold text-purple-800 bg-purple-50 px-3 py-1 rounded-full flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5" />
                      5D Ultrasound Specialist
                    </span>
                  )}
                  {doctor.department === 'obstetrics' && (
                    <span className="text-xs font-bold text-sky-800 bg-sky-50 px-3 py-1 rounded-full">
                      Obstetrics & High-Risk Delivery Lead
                    </span>
                  )}
                  {doctor.department === 'laparoscopic' && (
                    <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full">
                      4K Laparoscopic Surgery Team
                    </span>
                  )}
                </div>

                <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1D3B58] tracking-tight">
                  {language === 'en' ? doctor.name : doctor.nepaliName}
                </h1>
                <p className="text-base sm:text-lg font-bold text-[#E48AA0]">
                  {language === 'en' ? doctor.role : doctor.nepaliRole}
                </p>
                <p className="text-sm font-semibold text-slate-700">
                  {doctor.qualifications}
                </p>
              </div>

              {/* BIOGRAPHY */}
              <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 space-y-4 shadow-xs">
                <h2 className="text-lg font-bold text-[#1D3B58]">
                  Professional Profile & Clinical Philosophy
                </h2>
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                  {doctor.bio}
                </p>

                {doctor.verificationNote && (
                  <div className="p-3 bg-amber-50/60 border border-amber-200/60 rounded-xl text-xs text-amber-900 leading-relaxed">
                    <strong>Note:</strong> {doctor.verificationNote}
                  </div>
                )}
              </div>

              {/* CLINICAL FELLOWSHIPS & ACCREDITATIONS */}
              <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 space-y-4 shadow-xs">
                <h2 className="text-lg font-bold text-[#1D3B58]">
                  Fellowships & Specialized Clinical Training
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {doctor.fellowships.map((f, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-[#F9FAFC] border border-slate-200/80">
                      <ShieldCheck className="w-4 h-4 text-[#E48AA0] shrink-0 mt-0.5" />
                      <span className="text-xs font-medium text-slate-700 leading-relaxed">{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CORE SPECIALTIES */}
              <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 space-y-4 shadow-xs">
                <h2 className="text-lg font-bold text-[#1D3B58]">
                  Core Clinical Practice Areas
                </h2>
                <div className="flex flex-wrap gap-2">
                  {doctor.specialties.map((spec, idx) => (
                    <span
                      key={idx}
                      className="text-xs font-semibold text-slate-700 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200/70"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              {/* KEY PROCEDURES IF AVAILABLE */}
              {doctor.keyProcedures && doctor.keyProcedures.length > 0 && (
                <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 space-y-4 shadow-xs">
                  <h2 className="text-lg font-bold text-[#1D3B58]">
                    Key Surgical & Clinical Procedures
                  </h2>
                  <div className="space-y-2.5">
                    {doctor.keyProcedures.map((proc, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{proc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 3. OTHER SPECIALISTS CAROUSEL */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-[#1D3B58]">
            Other Specialists on the Care Panel
          </h2>
          <button
            onClick={() => onNavigate('/doctors')}
            className="text-xs font-bold text-[#E48AA0] hover:text-[#C96D83] flex items-center gap-1 cursor-pointer"
          >
            <span>View All Doctors</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {otherDoctors.map((doc) => (
            <div
              key={doc.id}
              onClick={() => onNavigate(`/doctors/${doc.id}`)}
              className="bg-white rounded-2xl border border-slate-200 p-5 space-y-3 hover:border-[#E48AA0] hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                  {doc.image ? (
                    <img
                      src={doc.image}
                      alt={doc.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-top"
                    />
                  ) : (
                    <div className="w-full h-full bg-[#1D3B58] text-white flex items-center justify-center font-bold text-lg">
                      {doc.name.split(' ')[1]?.[0] || 'D'}
                    </div>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-bold text-sm text-[#1D3B58] group-hover:text-[#2B5A88] transition-colors truncate">
                    {doc.name}
                  </h3>
                  <p className="text-[11px] text-[#E48AA0] font-semibold truncate">{doc.role.split('&')[0]}</p>
                  <p className="text-[10px] text-slate-500 truncate">{doc.experienceYears}+ Years Exp</p>
                </div>
              </div>

              <div className="pt-2 text-xs font-bold text-[#E48AA0] flex items-center gap-1">
                <span>View Full Profile</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default DoctorProfilePage;
