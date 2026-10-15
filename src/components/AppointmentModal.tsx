import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, User, Phone, Mail, MapPin, CheckCircle2, AlertCircle, Sparkles, Building2, Stethoscope, ChevronRight } from 'lucide-react';
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
    // Tomorrow's date in YYYY-MM-DD
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [timeSlot, setTimeSlot] = useState('10:00 AM');
  const [consultationType, setConsultationType] = useState<'in-person' | 'video'>('in-person');
  const [patientName, setPatientName] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [patientEmail, setPatientEmail] = useState('');
  const [treatmentType, setTreatmentType] = useState(initialTreatment || 'General Fertility Consultation');
  const [previousIvf, setPreviousIvf] = useState(false);
  const [notes, setNotes] = useState('');

  // UI state
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [availableSlots, setAvailableSlots] = useState<SlotInfo[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [confirmedBooking, setConfirmedBooking] = useState<any | null>(null);

  // Sync initial props
  useEffect(() => {
    if (initialDoctorName) setDoctorName(initialDoctorName);
    if (initialBranchId) setBranchId(initialBranchId);
    if (initialTreatment) setTreatmentType(initialTreatment);
  }, [initialDoctorName, initialBranchId, initialTreatment]);

  // Find doctor id
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
          // auto-select first available slot if current isn't available
          const isCurrentValid = data.slots.some((s: SlotInfo) => s.time === timeSlot && s.available);
          if (!isCurrentValid) {
            const firstAvailable = data.slots.find((s: SlotInfo) => s.available);
            if (firstAvailable) setTimeSlot(firstAvailable.time);
          }
        } else {
          // fallback default slots
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
      .catch((_err) => {
        if (isMounted) {
          // Fallback slots
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

    if (!patientName.trim()) {
      setErrorMsg('Please enter your full name');
      return;
    }
    if (!patientPhone.trim() || patientPhone.length < 8) {
      setErrorMsg('Please enter a valid phone or mobile number');
      return;
    }

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
          patientName,
          patientPhone,
          patientEmail,
          treatmentType,
          previousIvf,
          notes,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Unable to confirm appointment at this time.');
      }

      setConfirmedBooking(data.appointment);
    } catch (err: any) {
      setErrorMsg(err?.message || 'Error communicating with booking system. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setConfirmedBooking(null);
    setPatientName('');
    setPatientPhone('');
    setPatientEmail('');
    setNotes('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden my-8 animate-in fade-in zoom-in-95">
        
        {/* MODAL HEADER */}
        <div className="bg-gradient-to-r from-[#1D3B58] to-[#2B5A88] text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-1.5 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 text-[#E48AA0] text-xs font-semibold uppercase tracking-wider mb-1">
            <Sparkles className="w-4 h-4" />
            <span>Confidential Fertility Assessment</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
            Schedule Your Consultation
          </h2>
          <p className="text-xs sm:text-sm text-slate-200 mt-1">
            Meet our senior fertility specialists at Maulakalika Hospital Pvt. Ltd., Bharatpur-11, Chitwan.
          </p>
        </div>

        {/* CONFIRMATION SCREEN */}
        {confirmedBooking ? (
          <div className="p-6 sm:p-8 space-y-6">
            <div className="text-center space-y-2">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 mb-2">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">
                Consultation Confirmed!
              </h3>
              <p className="text-sm text-slate-600 max-w-md mx-auto">
                Your appointment has been registered at Maulakalika Hospital, Bharatpur-11. A confirmation message has been dispatched to WhatsApp 9855088798.
              </p>
            </div>

            {/* APPOINTMENT PASS TICKET */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <div>
                  <span className="text-xs text-slate-500 font-medium">Reference Code</span>
                  <div className="text-lg font-bold font-mono text-[#1D3B58]">
                    {confirmedBooking.referenceCode}
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-500 font-medium">Status</span>
                  <div className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full inline-block mt-0.5">
                    Confirmed
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm pt-1">
                <div>
                  <span className="text-slate-500 block text-xs">Specialist</span>
                  <span className="font-semibold text-slate-900">{confirmedBooking.doctorName}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-xs">Branch Location</span>
                  <span className="font-semibold text-slate-900">{confirmedBooking.branchName}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-xs">Date & Time</span>
                  <span className="font-semibold text-slate-900">
                    {confirmedBooking.date} at {confirmedBooking.timeSlot}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block text-xs">Patient</span>
                  <span className="font-semibold text-slate-900">
                    {confirmedBooking.patientName} ({confirmedBooking.patientPhone})
                  </span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200 text-xs text-slate-600 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>
                  Please arrive 15 minutes prior with all previous medical records, hormone scans, or semen analysis reports.
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={handleReset}
                className="flex-1 bg-[#1D3B58] hover:bg-[#152B40] text-white py-3 rounded-xl font-semibold text-sm transition-colors text-center"
              >
                Done
              </button>
              <a
                href={`https://wa.me/9779855088798?text=Hello%20Mamata%20Fertility%20Maulakalika%20Hospital,%20I%20have%20scheduled%20consultation%20ref%20${confirmedBooking.referenceCode}`}
                target="_blank"
                rel="noreferrer"
                className="flex-1 border border-[#E48AA0] text-[#C96D83] hover:bg-[#FCEEF1] py-3 rounded-xl font-semibold text-sm transition-colors text-center"
              >
                WhatsApp Desk (9855088798)
              </a>
            </div>
          </div>
        ) : (
          /* BOOKING FORM */
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            {errorMsg && (
              <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* STEP 1: DOCTOR & BRANCH SELECTION */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
                  <Stethoscope className="w-3.5 h-3.5 text-[#E48AA0]" />
                  <span>Consulting Specialist *</span>
                </label>
                <select
                  value={doctorName}
                  onChange={(e) => setDoctorName(e.target.value)}
                  className="w-full text-xs sm:text-sm border border-slate-200 rounded-xl px-3 py-2.5 bg-slate-50 focus:bg-white focus:border-[#E48AA0] focus:ring-1 focus:ring-[#E48AA0] transition-colors"
                >
                  {DOCTORS.map((doc) => (
                    <option key={doc.id} value={doc.name}>
                      {doc.name} — {doc.role.split('&')[0]}
                    </option>
                  ))}
                </select>
                <p className="text-[11px] text-slate-500 mt-1">
                  Availability: {currentDoctorObj?.availableDays}
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-[#E48AA0]" />
                  <span>Hospital Centre *</span>
                </label>
                <div className="w-full text-xs sm:text-sm border border-slate-200 rounded-xl px-3 py-2.5 bg-slate-100/80 font-medium text-[#1D3B58] flex items-center justify-between">
                  <span>Maulakalika Hospital Pvt. Ltd. (Chitwan)</span>
                  <span className="text-[10px] bg-[#E48AA0] text-white px-2 py-0.5 rounded-full font-bold">Main Centre</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  Bharatpur-11, Chitwan, Nepal · Hotline: 056-493798
                </p>
              </div>
            </div>

            {/* STEP 2: DATE & TIME SLOTS */}
            <div className="space-y-2">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-1">
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#E48AA0]" />
                    <span>Preferred Date *</span>
                  </label>
                  <input
                    type="date"
                    value={selectedDate}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full text-xs sm:text-sm border border-slate-200 rounded-xl px-3 py-2.5 bg-slate-50 focus:bg-white focus:border-[#E48AA0] focus:ring-1 focus:ring-[#E48AA0]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#E48AA0]" />
                      <span>Select Available Time Slot *</span>
                    </span>
                    {loadingSlots && <span className="text-[11px] text-slate-400">Loading slots...</span>}
                  </label>

                  {/* SLOTS GRID */}
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-1.5 max-h-32 overflow-y-auto pr-1">
                    {availableSlots.length > 0 ? (
                      availableSlots.map((slot) => {
                        const isSelected = timeSlot === slot.time;
                        return (
                          <button
                            type="button"
                            key={slot.time}
                            disabled={!slot.available}
                            onClick={() => setTimeSlot(slot.time)}
                            className={`py-1.5 px-2 rounded-lg text-xs font-medium text-center transition-all ${
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
                      <div className="col-span-4 text-xs text-slate-500 py-2">
                        No slots found for this date.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* STEP 3: PATIENT PARTICULARS */}
            <div className="border-t border-slate-100 pt-4 space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-[#E48AA0]" />
                    <span>Patient / Couple Full Name *</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Anjali & Binod Sharma"
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    className="w-full text-xs sm:text-sm border border-slate-200 rounded-xl px-3 py-2 bg-slate-50 focus:bg-white focus:border-[#E48AA0] focus:ring-1 focus:ring-[#E48AA0]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-[#E48AA0]" />
                    <span>Phone / WhatsApp Number *</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+977-98XXXXXXXX"
                    value={patientPhone}
                    onChange={(e) => setPatientPhone(e.target.value)}
                    className="w-full text-xs sm:text-sm border border-slate-200 rounded-xl px-3 py-2 bg-slate-50 focus:bg-white focus:border-[#E48AA0] focus:ring-1 focus:ring-[#E48AA0]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-[#E48AA0]" />
                    <span>Email Address (Optional)</span>
                  </label>
                  <input
                    type="email"
                    placeholder="name@example.com"
                    value={patientEmail}
                    onChange={(e) => setPatientEmail(e.target.value)}
                    className="w-full text-xs sm:text-sm border border-slate-200 rounded-xl px-3 py-2 bg-slate-50 focus:bg-white focus:border-[#E48AA0] focus:ring-1 focus:ring-[#E48AA0]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Primary Service of Interest
                  </label>
                  <select
                    value={treatmentType}
                    onChange={(e) => setTreatmentType(e.target.value)}
                    className="w-full text-xs sm:text-sm border border-slate-200 rounded-xl px-3 py-2 bg-slate-50 focus:bg-white focus:border-[#E48AA0] focus:ring-1 focus:ring-[#E48AA0]"
                  >
                    <option value="General Fertility Consultation">Initial Fertility Consultation</option>
                    <option value="IVF (In-Vitro Fertilization)">In-Vitro Fertilization (IVF)</option>
                    <option value="ICSI Micro-injection">ICSI (Male / Sperm Factor)</option>
                    <option value="IUI Program">Intrauterine Insemination (IUI)</option>
                    <option value="Egg Freezing">Social / Medical Egg Freezing</option>
                    <option value="Male Infertility / TESA">TESA / PESA / Andrology</option>
                    <option value="Laparoscopic Surgery">Fertility Laparoscopy / Surgery</option>
                  </select>
                </div>
              </div>

              {/* Previous cycle checkbox & quick notes */}
              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="prevIvf"
                  checked={previousIvf}
                  onChange={(e) => setPreviousIvf(e.target.checked)}
                  className="rounded-sm border-slate-300 text-[#E48AA0] focus:ring-[#E48AA0] cursor-pointer"
                />
                <label htmlFor="prevIvf" className="text-xs text-slate-600 cursor-pointer">
                  We have undergone previous fertility / IVF cycles elsewhere (Second opinion)
                </label>
              </div>

              <div>
                <textarea
                  rows={2}
                  placeholder="Any specific questions or concerns for the doctor? (Confidential)"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full text-xs border border-slate-200 rounded-xl px-3 py-2 bg-slate-50 focus:bg-white focus:border-[#E48AA0] focus:ring-1 focus:ring-[#E48AA0]"
                />
              </div>
            </div>

            {/* ACTION FOOTER */}
            <div className="border-t border-slate-100 pt-3 flex items-center justify-between gap-3">
              <span className="text-[11px] text-slate-500 hidden sm:inline">
                🔒 100% Confidential medical privacy guaranteed.
              </span>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 text-xs font-medium text-slate-600 hover:text-slate-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 bg-[#E48AA0] hover:bg-[#D4748B] text-white px-6 py-2.5 rounded-xl font-semibold text-xs sm:text-sm shadow-sm transition-all disabled:opacity-70"
                >
                  {submitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Reserving Slot...</span>
                    </>
                  ) : (
                    <>
                      <span>Confirm Appointment</span>
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
