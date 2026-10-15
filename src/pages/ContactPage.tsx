import React, { useState } from 'react';
import { HOSPITAL_LOCATION } from '../data/fertilityData';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageSquare,
  ExternalLink,
  Calendar,
  CheckCircle2,
  Send,
  Building2,
  Sparkles,
} from 'lucide-react';

interface ContactPageProps {
  onOpenBooking: (doctorName?: string, branchId?: string, treatmentName?: string) => void;
  language?: 'en' | 'ne';
}

export const ContactPage: React.FC<ContactPageProps> = ({ onOpenBooking, language = 'en' }) => {
  const hospital = HOSPITAL_LOCATION;

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    inquiryType: 'IVF Treatment Inquiries',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
    setSubmitted(true);
  };

  return (
    <div className="space-y-16 pb-20">
      {/* 1. HERO HEADER */}
      <section className="bg-gradient-to-b from-[#1D3B58] to-[#122538] text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-semibold bg-white/10 text-[#E48AA0] px-3.5 py-1.5 rounded-full">
            <MapPin className="w-3.5 h-3.5" />
            <span>Chitwan Flagship Hospital Facility</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            Contact & Hospital Location
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
            Mamata International Fertility Centre is situated inside Maulakalika Hospital Pvt. Ltd., Bharatpur-11, Chitwan, Nepal. Our clinical desk is available 24/7 to answer your calls and coordinate consultations.
          </p>
        </div>
      </section>

      {/* 2. CONTACT CARDS STRIP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#FCEEF1] text-[#C96D83] flex items-center justify-center">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
                24/7 Hospital Hotline
              </span>
              <a
                href="tel:056493798"
                className="text-lg font-bold text-[#1D3B58] hover:text-[#E48AA0] block font-mono mt-0.5"
              >
                056-493798
              </a>
              <a
                href="tel:056493738"
                className="text-xs text-slate-500 hover:text-slate-800 block mt-0.5 font-mono"
              >
                Tel: 056-493738
              </a>
            </div>
          </div>

          <div className="bg-emerald-50/70 p-6 rounded-2xl border border-emerald-100 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-semibold text-emerald-800 uppercase tracking-wider block">
                Official WhatsApp Desk
              </span>
              <a
                href="https://wa.me/9779855088798"
                target="_blank"
                rel="noreferrer"
                className="text-lg font-bold text-emerald-700 hover:text-emerald-800 block font-mono mt-0.5"
              >
                9855088798
              </a>
              <span className="text-xs text-emerald-600 block mt-0.5">
                Instant Chat & Reports Review
              </span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#FCEEF1] text-[#C96D83] flex items-center justify-center">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
                Hospital Address
              </span>
              <p className="text-sm font-bold text-[#1D3B58] mt-0.5 leading-snug">
                Maulakalika Hospital Pvt. Ltd.
              </p>
              <p className="text-xs text-slate-500 mt-0.5">
                Bharatpur-11, Chitwan, Nepal
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#FCEEF1] text-[#C96D83] flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
                Working Timings
              </span>
              <p className="text-xs font-bold text-[#1D3B58] mt-0.5">
                Sun–Fri: 7:30 AM – 7:30 PM
              </p>
              <p className="text-xs text-slate-500 mt-0.5">
                Sat: 9:00 AM – 3:00 PM (OPD & Labs)
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. MAIN GRID: MAP & VISITING GUIDE + DIRECT MESSAGE FORM */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* LOCATION DETAILS & MAP */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6 flex flex-col justify-between shadow-xs">
            <div className="space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-bold text-[#C96D83] bg-[#FCEEF1] px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  Flagship Facility
                </span>
                <h3 className="text-2xl font-bold text-[#1D3B58]">
                  Maulakalika Hospital Pvt. Ltd., Bharatpur-11
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Our premises in Bharatpur-11 house the full Mamata International clinical departments, andrology semen analysis suite, class 10,000 cleanroom embryology labs, high-definition 4D ultrasound rooms, and patient recovery beds.
                </p>
              </div>

              {/* MAP VISUAL CONTAINER */}
              <div className="w-full h-72 bg-slate-100 rounded-2xl overflow-hidden relative border border-slate-200 flex flex-col items-center justify-center p-6 text-center space-y-3">
                <div className="w-14 h-14 rounded-2xl bg-[#E48AA0] text-white flex items-center justify-center shadow-lg animate-pulse">
                  <MapPin className="w-7 h-7" />
                </div>
                <div>
                  <h4 className="font-bold text-base text-[#1D3B58]">
                    Maulakalika Hospital Pvt. Ltd.
                  </h4>
                  <p className="text-xs text-slate-500">
                    Bharatpur-11, Chitwan District, Bagmati Province, Nepal
                  </p>
                </div>
                <div className="pt-1">
                  <a
                    href="https://www.google.com/maps?q=Maulakalika+Hospital+Bharatpur+Chitwan"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-[#1D3B58] hover:bg-[#2B5A88] px-4 py-2 rounded-xl shadow-xs transition-colors"
                  >
                    <span>Open in Google Maps App</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* HOSPITAL AMENITIES */}
              <div className="space-y-2 text-xs text-slate-600">
                <h4 className="font-bold text-slate-800">Hospital Facilities & Patient Comfort:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Free dedicated vehicle parking</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>24/7 Pathology & Blood Bank</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Private counseling rooms</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Wheelchair accessible entrances</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 flex flex-wrap gap-3">
              <button
                onClick={() => onOpenBooking(undefined, 'chitwan')}
                className="flex-1 bg-[#E48AA0] hover:bg-[#D4748B] text-white py-3 rounded-xl font-bold text-xs sm:text-sm shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Appointment Online</span>
              </button>
              <a
                href="https://wa.me/9779855088798"
                target="_blank"
                rel="noreferrer"
                className="bg-[#25D366] hover:bg-[#1EBE5D] text-white py-3 px-5 rounded-xl font-bold text-xs sm:text-sm transition-colors flex items-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp 9855088798</span>
              </a>
            </div>
          </div>

          {/* CONTACT INQUIRY FORM */}
          <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
            <div className="space-y-1">
              <span className="text-xs font-bold text-[#E48AA0] uppercase tracking-wider">
                Direct Inquiry Form
              </span>
              <h3 className="text-2xl font-bold text-[#1D3B58]">
                Send Us a Message
              </h3>
              <p className="text-xs text-slate-500">
                Our care coordinators will review your query and reply within 2 working hours.
              </p>
            </div>

            {submitted ? (
              <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-slate-800 text-base">Inquiry Registered!</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Thank you, {formData.name}. Our fertility desk at Maulakalika Hospital Chitwan has received your message and will call you on <strong>{formData.phone}</strong> shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-xs font-bold text-[#C96D83] underline pt-2 cursor-pointer"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh or Maya Shrestha"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 focus:border-[#E48AA0] focus:ring-1 focus:ring-[#E48AA0] bg-slate-50 focus:bg-white text-xs"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Contact Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 9855088798 or 9841..."
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 focus:border-[#E48AA0] focus:ring-1 focus:ring-[#E48AA0] bg-slate-50 focus:bg-white text-xs"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    placeholder="e.g. care@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 focus:border-[#E48AA0] focus:ring-1 focus:ring-[#E48AA0] bg-slate-50 focus:bg-white text-xs"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Inquiry Topic
                  </label>
                  <select
                    value={formData.inquiryType}
                    onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                    className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 bg-slate-50 focus:bg-white text-xs"
                  >
                    <option value="IVF Treatment Inquiries">IVF Treatment Inquiries</option>
                    <option value="Doctor Appointment Booking">Doctor Appointment Booking</option>
                    <option value="Male Infertility & TESA">Male Infertility & TESA</option>
                    <option value="Egg / Sperm Freezing">Egg / Sperm Freezing</option>
                    <option value="Cost & Installment Plans">Cost & Installment Plans</option>
                    <option value="Second Opinion On Previous Failed IVF">Second Opinion On Previous Failed IVF</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Your Message or Medical Background
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Tell us briefly about your situation, previous tests, or specific questions..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 focus:border-[#E48AA0] focus:ring-1 focus:ring-[#E48AA0] bg-slate-50 focus:bg-white text-xs"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#1D3B58] hover:bg-[#2B5A88] text-white py-3 rounded-xl font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4 text-[#E48AA0]" />
                  <span>Send Message to Care Desk</span>
                </button>
              </form>
            )}
          </div>

        </div>
      </section>
    </div>
  );
};

export default ContactPage;
