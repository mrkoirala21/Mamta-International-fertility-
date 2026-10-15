import React from 'react';
import { HOSPITAL_LOCATION } from '../data/fertilityData';
import { MapPin, Phone, Mail, Clock, MessageSquare, ExternalLink, Calendar, CheckCircle2 } from 'lucide-react';

interface LocationsSectionProps {
  onOpenBookingForBranch?: (branchId: string) => void;
  selectedBranchId?: string;
  onBranchChange?: (branchId: string) => void;
  language?: 'en' | 'ne';
}

export const LocationsSection: React.FC<LocationsSectionProps> = ({
  onOpenBookingForBranch,
  language = 'en',
}) => {
  const hospital = HOSPITAL_LOCATION;

  return (
    <section id="locations" className="py-16 md:py-24 bg-[#F9FAFC] border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="text-xs font-bold text-[#E48AA0] uppercase tracking-wider">
            {language === 'en' ? 'Clinic Location & Contact' : 'अस्पतालको ठेगाना तथा सम्पर्क'}
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1D3B58] tracking-tight">
            {language === 'en' ? 'Visit Our Centre at Maulakalika Hospital' : 'मौलकालिका अस्पतालमा हाम्रो सेन्टर'}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            {language === 'en'
              ? 'Mamata International Fertility Centre is located at Maulakalika Hospital Pvt. Ltd., Bharatpur-11, Chitwan, Nepal with full IVF laboratories, ultra-clean embryology theaters, and clinical consultation suites.'
              : 'ममता इन्टरनेसनल फर्टिलिटी सेन्टर मौलकालिका अस्पताल प्रा.लि., भरतपुर-११, चितवनमा अवस्थित छ।'}
          </p>
        </div>

        {/* ACTIVE HOSPITAL DETAILS & MAP PREVIEW */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* HOSPITAL INFO CARD */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 flex flex-col justify-between shadow-xs">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#C96D83] bg-[#FCEEF1] px-2.5 py-0.5 rounded-full">
                    {hospital.badge}
                  </span>
                  <h3 className="text-2xl font-bold text-[#1D3B58] mt-2">
                    {hospital.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1 flex items-start gap-1.5 font-medium">
                    <MapPin className="w-4 h-4 text-[#E48AA0] shrink-0 mt-0.5" />
                    <span>{hospital.address}</span>
                  </p>
                </div>
              </div>

              {/* CONTACT DETAILS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                <div className="p-3.5 bg-slate-50 rounded-xl space-y-1">
                  <div className="flex items-center gap-1.5 text-slate-500 font-semibold">
                    <Phone className="w-4 h-4 text-[#E48AA0]" />
                    <span>24/7 Hotline</span>
                  </div>
                  <a
                    href="tel:056493798"
                    className="font-bold text-[#1D3B58] hover:text-[#E48AA0] block text-base font-mono"
                  >
                    056-493798
                  </a>
                  <p className="text-[11px] text-slate-500">
                    Additional Landline: <a href="tel:056493738" className="font-semibold text-slate-700 hover:underline">056-493738</a>
                  </p>
                </div>

                <div className="p-3.5 bg-emerald-50/60 rounded-xl space-y-1 border border-emerald-100">
                  <div className="flex items-center gap-1.5 text-emerald-800 font-semibold">
                    <MessageSquare className="w-4 h-4 text-emerald-600" />
                    <span>Official WhatsApp Desk</span>
                  </div>
                  <a
                    href="https://wa.me/9779855088798"
                    target="_blank"
                    rel="noreferrer"
                    className="font-bold text-emerald-700 hover:text-emerald-800 block text-base font-mono"
                  >
                    9855088798
                  </a>
                  <p className="text-[11px] text-emerald-700">
                    Direct chat with senior fertility care coordinators
                  </p>
                </div>

                <div className="p-3.5 bg-slate-50 rounded-xl space-y-1">
                  <div className="flex items-center gap-1.5 text-slate-500 font-semibold">
                    <Clock className="w-4 h-4 text-[#E48AA0]" />
                    <span>Consultation Hours</span>
                  </div>
                  <p className="font-medium text-slate-800">{hospital.hours}</p>
                  <p className="text-[11px] text-slate-500">{hospital.saturdayHours}</p>
                </div>

                <div className="p-3.5 bg-slate-50 rounded-xl space-y-1">
                  <div className="flex items-center gap-1.5 text-slate-500 font-semibold">
                    <Mail className="w-4 h-4 text-[#E48AA0]" />
                    <span>Email Inquiries</span>
                  </div>
                  <p className="font-medium text-slate-800">{hospital.email}</p>
                  <p className="text-[11px] text-slate-500">Reports evaluation & second opinions</p>
                </div>
              </div>

              {/* FACILITIES LIST */}
              <div className="space-y-2.5 pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  On-Premise Hospital Facilities at Bharatpur-11:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600">
                  {hospital.facilities.map((fac, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{fac}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ACTION BUTTONS */}
            <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center gap-3">
              <button
                onClick={() => onOpenBookingForBranch && onOpenBookingForBranch('chitwan')}
                className="flex-1 bg-[#E48AA0] hover:bg-[#D4748B] text-white py-3 px-5 rounded-xl text-xs sm:text-sm font-bold shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Consultation at Chitwan</span>
              </button>

              <a
                href="https://wa.me/9779855088798"
                target="_blank"
                rel="noreferrer"
                className="bg-[#25D366] hover:bg-[#1EBE5D] text-white py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-colors flex items-center gap-1.5 shadow-xs"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp 9855088798</span>
              </a>
            </div>
          </div>

          {/* MAP & ARRIVAL GUIDE */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between shadow-xs space-y-6">
            <div className="space-y-4">
              <h4 className="text-base font-bold text-[#1D3B58] flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#E48AA0]" />
                <span>Location & Directions</span>
              </h4>

              {/* Interactive Visual Map Representation */}
              <div className="w-full h-56 bg-slate-100 rounded-xl overflow-hidden relative border border-slate-200">
                <div className="w-full h-full bg-[#1D3B58]/10 flex flex-col items-center justify-center p-4 text-center space-y-2">
                  <div className="w-12 h-12 rounded-full bg-[#E48AA0] text-white flex items-center justify-center shadow-lg animate-pulse">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h5 className="font-bold text-sm text-[#1D3B58]">
                      Maulakalika Hospital Pvt. Ltd.
                    </h5>
                    <p className="text-xs text-slate-600">Bharatpur-11, Chitwan, Nepal</p>
                  </div>
                  <a
                    href={hospital.mapEmbedUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#C96D83] bg-white px-3 py-1.5 rounded-lg shadow-xs hover:bg-[#FCEEF1] transition-colors"
                  >
                    <span>Open in Google Maps</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Getting Here Guide */}
              <div className="space-y-2 text-xs text-slate-600">
                <h5 className="font-bold text-slate-800">Visiting Instructions:</h5>
                <ul className="space-y-1.5 list-disc pl-4 text-slate-600">
                  <li>Located conveniently inside Maulakalika Hospital premises in Bharatpur-11.</li>
                  <li>Ample dedicated car and bike parking available on hospital grounds.</li>
                  <li>Special assistance & fast-track appointments available for couples traveling from surrounding districts or abroad.</li>
                  <li>Please carry previous medical records, semen analysis reports, and ultrasound scans.</li>
                </ul>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <div className="p-3 bg-[#FCEEF1] text-[#C96D83] rounded-xl text-xs font-semibold flex items-center justify-between">
                <span>Direct Hotline Assistance:</span>
                <span className="font-mono text-sm font-bold text-[#1D3B58]">056-493798</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default LocationsSection;
