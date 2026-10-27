import React from 'react';
import { MATERNITY_SERVICES, DOCTORS, MaternityServiceItem } from '../data/fertilityData';
import Breadcrumbs from '../components/Breadcrumbs';
import {
  Heart,
  Eye,
  Stethoscope,
  Baby,
  Smile,
  ShieldCheck,
  Activity,
  Calendar,
  CheckCircle2,
  ArrowRight,
  Phone,
  Building2,
} from 'lucide-react';

interface MaternityHubPageProps {
  onNavigate: (path: string) => void;
  onOpenBooking: (doctorName?: string, branchId?: string, treatment?: string) => void;
  language?: 'en' | 'ne';
}

export const MaternityHubPage: React.FC<MaternityHubPageProps> = ({
  onNavigate,
  onOpenBooking,
  language = 'en',
}) => {
  const doctorRamesh = DOCTORS.find((d) => d.id === 'dr-ramesh-ghimire');
  const doctorKesheb = DOCTORS.find((d) => d.id === 'dr-kesheb');
  const doctorAnupama = DOCTORS.find((d) => d.id === 'dr-anupama');

  return (
    <div className="min-w-0 bg-[#F9FAFC] pb-20">
      <div className="bg-white border-b border-slate-100">
        <Breadcrumbs
          items={[{ label: 'Pregnancy & Maternity Care' }]}
          onNavigate={onNavigate}
        />
      </div>

      {/* HERO */}
      <section className="bg-gradient-to-b from-white to-[#F9FAFC] pt-12 pb-14 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5 text-center max-w-4xl">
          <div className="text-xs font-bold text-[#E48AA0] uppercase tracking-wider">
            Starting-to-Delivery Continuous Care
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1D3B58] tracking-tight">
            Complete Pregnancy, Fetal Monitoring & Maternity Care
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            At Maulakalika Hospital Pvt. Ltd., Chitwan, we safeguard maternal and infant health through every milestone—from first-trimester heartbeat detection and 5D fetal scans to safe labor delivery, postnatal recovery, and Level II/III NICU nursery support.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
            <button
              onClick={() => onOpenBooking(doctorRamesh?.name, 'chitwan', '5D Ultrasound')}
              className="bg-[#E48AA0] hover:bg-[#D4748B] text-white px-6 py-3 rounded-xl font-bold text-sm shadow-sm transition-all cursor-pointer flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Book 5D Ultrasound / Antenatal Visit</span>
            </button>
            <a
              href="tel:056493798"
              className="bg-white hover:bg-slate-50 text-[#1D3B58] border border-slate-200 px-5 py-3 rounded-xl font-bold text-sm transition-colors cursor-pointer flex items-center gap-2"
            >
              <Phone className="w-4 h-4 text-[#E48AA0]" />
              <span>Hospital Hotline: 056-493798</span>
            </a>
          </div>
        </div>
      </section>

      {/* LEADERSHIP SPECIALISTS ON THE MATERNITY TEAM */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-bold text-[#E48AA0] uppercase tracking-wider">
            Consultant Panel
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1D3B58]">
            Meet Your Obstetric & Fetal Monitoring Team
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Directly dedicated specialists monitoring every step of your pregnancy journey at Maulakalika Hospital.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* DR. RAMESH GHIMIRE */}
          {doctorRamesh && (
            <div className="bg-white rounded-3xl border border-slate-200/90 hover:border-[#E48AA0] p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4">
              <div className="space-y-4">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 relative border border-slate-200">
                  {doctorRamesh.image ? (
                    <img
                      src={doctorRamesh.image}
                      alt={doctorRamesh.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-top"
                    />
                  ) : null}
                  <span className="absolute bottom-2 left-2 bg-white/95 text-[11px] font-bold px-2 py-0.5 rounded text-[#1D3B58] shadow-xs">
                    5D Ultrasound Specialist
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-[#1D3B58]">{doctorRamesh.name}</h3>
                  <p className="text-xs font-semibold text-[#E48AA0]">{doctorRamesh.role}</p>
                  <p className="text-xs text-slate-600 mt-2 line-clamp-3">{doctorRamesh.bio}</p>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => onNavigate(`/doctors/${doctorRamesh.id}`)}
                  className="text-xs font-bold text-[#1D3B58] hover:text-[#E48AA0] cursor-pointer"
                >
                  View Profile
                </button>
                <button
                  onClick={() => onOpenBooking(doctorRamesh.name, 'chitwan', '5D Ultrasound')}
                  className="bg-[#E48AA0] hover:bg-[#D4748B] text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer"
                >
                  Book 5D Scan
                </button>
              </div>
            </div>
          )}

          {/* DR. KESHEB BHURTEL */}
          {doctorKesheb && (
            <div className="bg-white rounded-3xl border border-slate-200/90 hover:border-[#E48AA0] p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4">
              <div className="space-y-4">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-tr from-[#1D3B58] to-[#2B5A88] text-white flex flex-col items-center justify-center p-4 relative border border-slate-200">
                  <Stethoscope className="w-10 h-10 text-[#E48AA0] mb-2 opacity-90" />
                  <span className="text-xl font-bold">Dr. Kesheb</span>
                  <span className="text-[10px] text-slate-300 uppercase tracking-wider font-semibold">High-Risk Obstetrics</span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-[#1D3B58]">{doctorKesheb.name}</h3>
                  <p className="text-xs font-semibold text-[#E48AA0]">{doctorKesheb.role.split('(')[0]}</p>
                  <p className="text-xs text-slate-600 mt-2 line-clamp-3">{doctorKesheb.bio}</p>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => onNavigate(`/doctors/${doctorKesheb.id}`)}
                  className="text-xs font-bold text-[#1D3B58] hover:text-[#E48AA0] cursor-pointer"
                >
                  View Profile
                </button>
                <button
                  onClick={() => onOpenBooking(doctorKesheb.name, 'chitwan', 'Obstetrics')}
                  className="bg-[#1D3B58] hover:bg-[#2B5A88] text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer"
                >
                  Consultation
                </button>
              </div>
            </div>
          )}

          {/* DR. ANUPAMA KARKI */}
          {doctorAnupama && (
            <div className="bg-white rounded-3xl border border-slate-200/90 hover:border-[#E48AA0] p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4">
              <div className="space-y-4">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-tr from-[#1D3B58] to-[#2B5A88] text-white flex flex-col items-center justify-center p-4 relative border border-slate-200">
                  <Heart className="w-10 h-10 text-[#E48AA0] mb-2 opacity-90" />
                  <span className="text-xl font-bold">Dr. Anupama</span>
                  <span className="text-[10px] text-slate-300 uppercase tracking-wider font-semibold">Postnatal & Delivery</span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-[#1D3B58]">{doctorAnupama.name}</h3>
                  <p className="text-xs font-semibold text-[#E48AA0]">{doctorAnupama.role.split('(')[0]}</p>
                  <p className="text-xs text-slate-600 mt-2 line-clamp-3">{doctorAnupama.bio}</p>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => onNavigate(`/doctors/${doctorAnupama.id}`)}
                  className="text-xs font-bold text-[#1D3B58] hover:text-[#E48AA0] cursor-pointer"
                >
                  View Profile
                </button>
                <button
                  onClick={() => onOpenBooking(doctorAnupama.name, 'chitwan', 'Antenatal & Postnatal')}
                  className="bg-[#1D3B58] hover:bg-[#2B5A88] text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer"
                >
                  Consultation
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ALL MATERNITY SERVICES ACCORDION / GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        <div>
          <span className="text-xs font-bold text-[#E48AA0] uppercase tracking-wider block">
            Specialized Maternity Care Services
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1D3B58] mt-1">
            Complete Clinical Care Pillars
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {MATERNITY_SERVICES.map((serv) => (
            <div
              key={serv.id}
              className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 space-y-4 shadow-xs"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#E48AA0] uppercase tracking-wider">
                  {serv.badge}
                </span>
                <span className="text-xs text-slate-400 font-medium">Maulakalika Hospital</span>
              </div>

              <div>
                <h3 className="text-xl font-bold text-[#1D3B58]">
                  {language === 'en' ? serv.title : serv.nepaliTitle}
                </h3>
                <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                  {serv.description}
                </p>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-100">
                <span className="text-xs font-bold text-[#1D3B58] block">Key Program Highlights:</span>
                {serv.features.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              <div className="pt-3">
                <button
                  onClick={() => onOpenBooking(undefined, 'chitwan', serv.title)}
                  className="bg-slate-100 hover:bg-[#E48AA0] hover:text-white text-[#1D3B58] px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer"
                >
                  Schedule Appointment for {serv.badge}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default MaternityHubPage;
