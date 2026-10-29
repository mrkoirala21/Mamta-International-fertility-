import React, { useState, useEffect } from 'react';
import {
  X,
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  MapPin,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Building2,
  Stethoscope,
  ChevronRight,
  MessageSquare,
  FileText,
  ShieldCheck,
  Send,
} from 'lucide-react';
import { DOCTORS, BRANCHES, TREATMENTS } from '../data/fertilityData';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialDoctorName?: string;
  initialBranchId?: string;
  initialTreatment?: string;
  language?: 'en' | 'ne';
}

interface SlotInfo {
  time: string;
  available: boolean;
}

const COUNTRY_CODES = [
  { code: '+977', label: 'Nepal (+977)', flag: '🇳🇵' },
  { code: '+91', label: 'India (+91)', flag: '🇮🇳' },
  { code: '+1', label: 'USA / Canada (+1)', flag: '🇺🇸' },
  { code: '+44', label: 'UK (+44)', flag: '🇬🇧' },
  { code: '+61', label: 'Australia (+61)', flag: '🇦🇺' },
  { code: '+971', label: 'UAE (+971)', flag: '🇦🇪' },
  { code: '+974', label: 'Qatar (+974)', flag: '🇶🇦' },
  { code: '+966', label: 'Saudi Arabia (+966)', flag: '🇸🇦' },
  { code: '+60', label: 'Malaysia (+60)', flag: '🇲🇾' },
  { code: '+81', label: 'Japan (+81)', flag: '🇯🇵' },
  { code: '+82', label: 'South Korea (+82)', flag: '🇰🇷' },
  { code: '+49', label: 'Germany (+49)', flag: '🇩🇪' },
];

export const AppointmentModal: React.FC<AppointmentModalProps> = ({
  isOpen,
  onClose,
  initialDoctorName,
  initialBranchId,
  initialTreatment,
  language = 'en',
}) => {
  // Form state
  const [doctorName, setDoctorName] = useState(initialDoctorName || DOCTORS[0].name);
  const [branchId, setBranchId] = useState(initialBranchId || 'chitwan');
  const [selectedDate, setSelectedDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [timeSlot, setTimeSlot] = useState('10:00 AM');
  const consultationType = 'In-person';

  // Patient Particulars
  const [patientName, setPatientName] = useState('');
  const [countryCode, setCountryCode] = useState('+977');
  const [patientPhone, setPatientPhone] = useState('');
  const [patientEmail, setPatientEmail] = useState('');
  const [reason, setReason] = useState('');
  const [treatmentType, setTreatmentType] = useState(initialTreatment || 'General Fertility Consultation');
  const [previousIvf, setPreviousIvf] = useState(false);

  // UI state
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [availableSlots, setAvailableSlots] = useState<SlotInfo[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [confirmedBooking, setConfirmedBooking] = useState<any | null>(null);
  const [whatsappDeliveryStatus, setWhatsappDeliveryStatus] = useState<string | null>(null);

  // Sync initial props
  useEffect(() => {
    if (initialDoctorName) setDoctorName(initialDoctorName);
    if (initialBranchId) setBranchId(initialBranchId);
    if (initialTreatment) setTreatmentType(initialTreatment);
  }, [initialDoctorName, initialBranchId, initialTreatment]);

  // Find doctor and branch
  const currentDoctorObj = DOCTORS.find((d) => d.name === doctorName) || DOCTORS[0];
  const currentBranchObj = BRANCHES.find((b) => b.id === branchId) || BRANCHES[0];

  // Fetch slots whenever doctor, date, or branch changes
  useEffect(() => {
    if (!isOpen) return;

    let isMounted = true;
    setLoadingSlots(true);
    setErrorMsg(null);

    const docId = currentDoctorObj?.id || 'general';
    fetch(`/api/slots?doctorId=${docId}&date=${selectedDate}&branchId=${branchId}`)
      .then((res) => res.json())
      .then((data) => {
        if (!isMounted) return;
        if (data.slots && Array.isArray(data.slots)) {
          setAvailableSlots(data.slots);
          const isCurrentValid = data.slots.some((s: SlotInfo) => s.time === timeSlot && s.available);
          if (!isCurrentValid) {
            const firstAvailable = data.slots.find((s: SlotInfo) => s.available);
            if (firstAvailable) setTimeSlot(firstAvailable.time);
          }
        } else {
          setAvailableSlots([
            { time: '09:30 AM', available: true },
            { time: '10:00 AM', available: true },
            { time: '10:30 AM', available: false },
            { time: '11:00 AM', available: true },
            { time: '01:30 PM', available: true },
            { time: '02:00 PM', available: true },
            { time: '03:00 PM', available: true },
          ]);
        }
      })
      .catch(() => {
        if (isMounted) {
          setAvailableSlots([
            { time: '09:30 AM', available: true },
            { time: '10:00 AM', available: true },
            { time: '11:00 AM', available: true },
            { time: '02:00 PM', available: true },
            { time: '03:00 PM', available: true },
          ]);
        }
      })
      .finally(() => {
        if (isMounted) setLoadingSlots(false);
      });

    return () => {
      isMounted = false;
    };
  }, [isOpen, doctorName, branchId, selectedDate]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    // Validation
    const trimmedName = patientName.trim();
    if (!trimmedName || trimmedName.length < 2) {
      setErrorMsg('Please enter your full name (at least 2 characters).');
      return;
    }

    const cleanPhoneDigits = patientPhone.replace(/[^\d]/g, '');
    if (!cleanPhoneDigits || cleanPhoneDigits.length < 7) {
      setErrorMsg('Please enter a valid mobile number.');
      return;
    }

    const fullFormattedPhone = `${countryCode} ${patientPhone.trim()}`;

    setSubmitting(true);

    try {
      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          doctorId: currentDoctorObj?.id,
          doctorName: currentDoctorObj?.name,
          branchId: currentBranchObj?.id,
          branchName: currentBranchObj?.name,
          date: selectedDate,
          timeSlot,
          consultationType,
          countryCode,
          patientName: trimmedName,
          patientPhone: fullFormattedPhone,
          patientEmail: patientEmail.trim(),
          treatmentType,
          reason: reason.trim(),
          notes: reason.trim(),
          previousIvf,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Unable to record consultation request. Please try again.');
      }

      setConfirmedBooking(data.appointment);
      setWhatsappDeliveryStatus(data.whatsappStatus || 'sent');
    } catch (err: any) {
      setErrorMsg(err?.message || 'Error communicating with booking system. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setConfirmedBooking(null);
    setWhatsappDeliveryStatus(null);
    setPatientName('');
    setPatientPhone('');
    setPatientEmail('');
    setReason('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden my-4 sm:my-6 animate-in fade-in zoom-in-95">
        
        {/* MODAL HEADER */}
        <div className="bg-gradient-to-r from-[#1D3B58] via-[#244566] to-[#2B5A88] text-white px-5 py-3.5 relative">
          <button
            onClick={onClose}
            className="absolute top-3.5 right-3.5 p-1.5 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-1.5 text-[#E48AA0] text-[11px] font-semibold uppercase tracking-wider mb-0.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Confidential Fertility Assessment · Chitwan</span>
          </div>
          <h2 className="text-lg sm:text-xl font-bold tracking-tight">
            Schedule Your Consultation
          </h2>
          <p className="text-[11px] sm:text-xs text-slate-200 mt-0.5">
            Maulakalika Hospital Pvt. Ltd., Bharatpur-11, Chitwan · WhatsApp Clinic Alert
          </p>
        </div>

        {/* CONFIRMATION SCREEN */}
        {confirmedBooking ? (
          <div className="p-4 sm:p-6 space-y-4">
            <div className="text-center space-y-2">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 mb-0.5">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              
              {/* EXACT REQUIRED CONFIRMATION TEXT */}
              <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                Consultation Request Received
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 max-w-lg mx-auto font-medium leading-relaxed bg-[#FCEEF1]/50 border border-[#E48AA0]/30 p-3 rounded-xl">
                “Thank you for choosing Mamata International Fertility Center. Your consultation request has been received successfully. Our team will contact you to confirm your appointment.”
              </p>
            </div>

            {/* APPOINTMENT DETAILS CARD */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <div>
                  <span className="text-[11px] text-slate-500 font-semibold uppercase tracking-wider block">
                    Booking Reference ID
                  </span>
                  <div className="text-lg font-bold font-mono text-[#1D3B58] mt-0.5">
                    {confirmedBooking.referenceCode}
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[11px] text-slate-500 font-semibold uppercase tracking-wider block">
                    Booking Status
                  </span>
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-800 bg-amber-100 border border-amber-300 px-3 py-1 rounded-full mt-0.5">
                    <Clock className="w-3.5 h-3.5 text-amber-700" />
                    <span>Pending Confirmation</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs sm:text-sm">
                <div>
                  <span className="text-slate-500 block text-xs">Patient Name</span>
                  <span className="font-bold text-slate-900">{confirmedBooking.patientName}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-xs">Contact Mobile Number</span>
                  <span className="font-bold text-slate-900 font-mono">{confirmedBooking.patientPhone}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-xs">Consulting Specialist</span>
                  <span className="font-semibold text-slate-900">{confirmedBooking.doctorName}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-xs">Preferred Date & Time</span>
                  <span className="font-semibold text-slate-900">
                    {confirmedBooking.date} at {confirmedBooking.timeSlot}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block text-xs">Consultation Location</span>
                  <span className="font-semibold text-slate-900 flex items-center gap-1 mt-0.5">
                    <Building2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>In-person (Maulakalika Hospital, Chitwan)</span>
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block text-xs">Email Address</span>
                  <span className="font-semibold text-slate-900">
                    {confirmedBooking.patientEmail || 'Not Provided'}
                  </span>
                </div>
                {confirmedBooking.reason && (
                  <div className="sm:col-span-2 pt-1 border-t border-slate-200">
                    <span className="text-slate-500 block text-xs">Reason for Consultation</span>
                    <span className="text-slate-700 italic text-xs">{confirmedBooking.reason}</span>
                  </div>
                )}
              </div>

              {/* WHATSAPP NOTIFICATION DISPATCH STATUS */}
              <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-slate-600">
                  <MessageSquare className="w-4 h-4 text-emerald-600" />
                  <span>
                    Clinic WhatsApp Alert (056-493798 / 9855088798):
                  </span>
                </div>
                <span className="font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded text-[11px]">
                  Dispatched to Clinic Desk
                </span>
              </div>
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <a
                href={`https://wa.me/9779855088798?text=Hello%20Mamata%20International%20Fertility%20Center%2C%20I%20have%20submitted%20a%20consultation%20request%20with%20Booking%20ID%3A%20${encodeURIComponent(confirmedBooking.referenceCode)}%20for%20${encodeURIComponent(confirmedBooking.patientName)}.`}
                target="_blank"
                rel="noreferrer"
                className="flex-1 bg-[#25D366] hover:bg-[#1EBE5D] text-white py-3 px-4 rounded-xl font-bold text-xs sm:text-sm shadow-sm transition-colors flex items-center justify-center gap-2 text-center"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Contact Clinic on WhatsApp (9855088798)</span>
              </a>
              <button
                onClick={handleReset}
                className="bg-[#1D3B58] hover:bg-[#2B5A88] text-white py-3 px-6 rounded-xl font-bold text-xs sm:text-sm transition-colors cursor-pointer text-center"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          /* CONSULTATION BOOKING FORM */
          <form onSubmit={handleSubmit} className="p-4 sm:p-5 space-y-3">
            {errorMsg && (
              <div className="p-2.5 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* DOCTOR & HOSPITAL LOCATION */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                  <Stethoscope className="w-3.5 h-3.5 text-[#E48AA0]" />
                  <span>Consulting Specialist *</span>
                </label>
                <select
                  value={doctorName}
                  onChange={(e) => setDoctorName(e.target.value)}
                  className="w-full text-xs border border-slate-200 rounded-xl px-2.5 py-2 bg-slate-50 focus:bg-white focus:border-[#E48AA0] focus:ring-1 focus:ring-[#E48AA0] transition-colors"
                >
                  {DOCTORS.filter(
                    (doc) => doc.department !== 'embryology' && doc.department !== 'andrology'
                  ).map((doc) => (
                    <option key={doc.id} value={doc.name}>
                      {doc.name} — {doc.role.split('&')[0]}
                    </option>
                  ))}
                </select>
                {currentDoctorObj?.image && (
                  <div className="flex items-center gap-2 mt-1.5 p-1.5 bg-slate-50 border border-slate-200/80 rounded-xl">
                    <img
                      src={currentDoctorObj.image}
                      alt={currentDoctorObj.name}
                      referrerPolicy="no-referrer"
                      className="w-8 h-8 rounded-lg object-cover object-top border border-slate-200 shrink-0"
                      loading="lazy"
                      decoding="async"
                      width={32}
                      height={32}
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-bold text-[#1D3B58] truncate">{currentDoctorObj.name}</p>
                      <p className="text-[10px] text-[#E48AA0] font-medium truncate">{currentDoctorObj.role.split('&')[0]}</p>
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-[#E48AA0]" />
                  <span>Hospital Centre</span>
                </label>
                <div className="w-full text-xs border border-slate-200 rounded-xl px-2.5 py-2 bg-slate-100/80 font-medium text-[#1D3B58] flex items-center justify-between">
                  <span>Maulakalika Hospital (Chitwan)</span>
                  <span className="text-[9px] bg-[#E48AA0] text-white px-1.5 py-0.5 rounded-full font-bold">Main Campus</span>
                </div>
                <p className="text-[10px] text-slate-500 mt-1">
                  Bharatpur-11, Chitwan · Direct: 056-493798
                </p>
              </div>
            </div>

            {/* DATE & TIME SLOTS */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-1">
                <label className="block text-[11px] font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#E48AA0]" />
                  <span>Preferred Date *</span>
                </label>
                <input
                  type="date"
                  required
                  value={selectedDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full text-xs border border-slate-200 rounded-xl px-2.5 py-2 bg-slate-50 focus:bg-white focus:border-[#E48AA0] focus:ring-1 focus:ring-[#E48AA0]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-[11px] font-semibold text-slate-700 mb-1 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#E48AA0]" />
                    <span>Available Time Slot *</span>
                  </span>
                  {loadingSlots && <span className="text-[10px] text-slate-400">Checking...</span>}
                </label>

                <div className="grid grid-cols-3 sm:grid-cols-4 gap-1 max-h-24 overflow-y-auto pr-1">
                  {availableSlots.length > 0 ? (
                    availableSlots.map((slot) => {
                      const isSelected = timeSlot === slot.time;
                      return (
                        <button
                          type="button"
                          key={slot.time}
                          disabled={!slot.available}
                          onClick={() => setTimeSlot(slot.time)}
                          className={`py-1 px-1.5 rounded-lg text-[11px] font-medium text-center transition-all cursor-pointer ${
                            !slot.available
                              ? 'bg-slate-100 text-slate-400 cursor-not-allowed line-through'
                              : isSelected
                              ? 'bg-[#1D3B58] text-white shadow-xs font-semibold'
                              : 'bg-slate-50 hover:bg-[#FCEEF1] text-slate-700 border border-slate-200'
                          }`}
                        >
                          {slot.time}
                        </button>
                      );
                    })
                  ) : (
                    <div className="col-span-4 text-xs text-slate-500 py-1.5">
                      No slots found for this date.
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* PATIENT PARTICULARS */}
            <div className="border-t border-slate-100 pt-2.5 space-y-2.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {/* Full Name */}
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-0.5 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-[#E48AA0]" />
                    <span>Patient's Full Name *</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh or Sunita Sharma"
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    className="w-full text-xs border border-slate-200 rounded-xl px-2.5 py-1.5 bg-slate-50 focus:bg-white focus:border-[#E48AA0] focus:ring-1 focus:ring-[#E48AA0]"
                  />
                </div>

                {/* Mobile Number with Country Code */}
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-0.5 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-[#E48AA0]" />
                    <span>Mobile Number *</span>
                  </label>
                  <div className="flex gap-1.5">
                    <select
                      value={countryCode}
                      onChange={(e) => setCountryCode(e.target.value)}
                      className="text-xs border border-slate-200 rounded-xl px-1.5 py-1.5 bg-slate-50 focus:bg-white focus:border-[#E48AA0] focus:ring-1 focus:ring-[#E48AA0] shrink-0 font-mono"
                    >
                      {COUNTRY_CODES.map((c) => (
                        <option key={c.code} value={c.code}>
                          {c.flag} {c.code}
                        </option>
                      ))}
                    </select>
                    <input
                      type="tel"
                      required
                      placeholder="9855088798"
                      value={patientPhone}
                      onChange={(e) => setPatientPhone(e.target.value)}
                      className="flex-1 text-xs border border-slate-200 rounded-xl px-2.5 py-1.5 bg-slate-50 focus:bg-white focus:border-[#E48AA0] focus:ring-1 focus:ring-[#E48AA0] font-mono"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {/* Email (Optional) */}
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-0.5 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-[#E48AA0]" />
                    <span>Email Address (Optional)</span>
                  </label>
                  <input
                    type="email"
                    placeholder="patient@example.com"
                    value={patientEmail}
                    onChange={(e) => setPatientEmail(e.target.value)}
                    className="w-full text-xs border border-slate-200 rounded-xl px-2.5 py-1.5 bg-slate-50 focus:bg-white focus:border-[#E48AA0] focus:ring-1 focus:ring-[#E48AA0]"
                  />
                </div>

                {/* Service Category */}
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-0.5">
                    Primary Service of Interest
                  </label>
                  <select
                    value={treatmentType}
                    onChange={(e) => setTreatmentType(e.target.value)}
                    className="w-full text-xs border border-slate-200 rounded-xl px-2.5 py-1.5 bg-slate-50 focus:bg-white focus:border-[#E48AA0] focus:ring-1 focus:ring-[#E48AA0]"
                  >
                    <option value="General Fertility Consultation">Initial Fertility Evaluation</option>
                    <option value="IVF (In-Vitro Fertilization)">In-Vitro Fertilization (IVF)</option>
                    <option value="ICSI Micro-injection">ICSI (Male Factor / Azoospermia)</option>
                    <option value="IUI Program">Intrauterine Insemination (IUI)</option>
                    <option value="5D Ultrasound Scan">5D Ultrasound & Pregnancy Monitoring</option>
                    <option value="Obstetrics & Maternity">Antenatal & High-Risk Obstetrics</option>
                    <option value="Egg Freezing">Social / Medical Egg Freezing</option>
                    <option value="Male Infertility / TESA">TESA / PESA / Andrology</option>
                    <option value="Laparoscopic Surgery">Fertility Laparoscopy / Surgery</option>
                  </select>
                </div>
              </div>

              {/* Reason for Consultation (Optional) */}
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-0.5 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-[#E48AA0]" />
                  <span>Brief Reason (Optional)</span>
                </label>
                <textarea
                  rows={1}
                  placeholder="e.g. Trying to conceive for 2 years, irregular cycles, low AMH..."
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full text-xs border border-slate-200 rounded-xl px-2.5 py-1.5 bg-slate-50 focus:bg-white focus:border-[#E48AA0] focus:ring-1 focus:ring-[#E48AA0]"
                />
              </div>

              {/* Previous IVF cycle */}
              <div className="flex items-center gap-2 pt-0.5">
                <input
                  type="checkbox"
                  id="prevIvf"
                  checked={previousIvf}
                  onChange={(e) => setPreviousIvf(e.target.checked)}
                  className="rounded-sm border-slate-300 text-[#E48AA0] focus:ring-[#E48AA0] cursor-pointer"
                />
                <label htmlFor="prevIvf" className="text-[11px] text-slate-600 cursor-pointer">
                  Previous fertility / IVF cycles elsewhere (Second opinion)
                </label>
              </div>
            </div>

            {/* ACTION FOOTER */}
            <div className="border-t border-slate-100 pt-2.5 flex items-center justify-between gap-3">
              <span className="text-[10px] text-slate-500 hidden sm:inline flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 inline" />
                <span>Confidential healthcare booking. WhatsApp alert sent to clinic desk.</span>
              </span>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-3 py-2 text-xs font-medium text-slate-600 hover:text-slate-800 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 bg-[#E48AA0] hover:bg-[#D4748B] text-white px-5 py-2 rounded-xl font-bold text-xs sm:text-sm shadow-sm transition-all disabled:opacity-70 cursor-pointer"
                >
                  {submitting ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Request</span>
                      <ChevronRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default AppointmentModal;
