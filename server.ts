import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import {
  sendWhatsAppBookingNotification,
  WhatsAppNotificationResult,
} from './whatsapp.js';

dotenv.config();

const app = express();
// Environment constraint: Dev server must run on port 3000
const PORT = 3000;
const isProduction = process.env.NODE_ENV === 'production';

app.use(express.json());

// Initialize Google Gen AI if key exists
let aiClient: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY) {
  try {
    aiClient = new GoogleGenAI();
  } catch (err) {
    console.warn('Failed to initialize GoogleGenAI client:', err);
  }
}

// In-Memory Appointment Storage with file persistence fallback
interface StoredAppointment {
  id: string;
  referenceCode: string;
  doctorId: string;
  doctorName: string;
  branchId: string;
  branchName: string;
  date: string;
  timeSlot: string;
  consultationType: 'In-person' | 'Online';
  patientName: string;
  countryCode?: string;
  patientPhone: string;
  patientEmail: string;
  treatmentType: string;
  notes?: string;
  reason?: string;
  previousIvf: boolean;
  status: 'Pending Confirmation' | 'Confirmed' | 'Rescheduled' | 'Cancelled';
  createdAt: string;
  whatsappNotification?: {
    status: 'sent' | 'failed' | 'not_configured';
    sentAt?: string;
    messageId?: string;
    recipientNumber: string;
    error?: string;
    attempts: number;
    lastAttemptAt: string;
  };
}

const APPOINTMENTS_FILE = path.join(process.cwd(), 'appointments_data.json');

function loadAppointments(): StoredAppointment[] {
  try {
    if (fs.existsSync(APPOINTMENTS_FILE)) {
      const data = fs.readFileSync(APPOINTMENTS_FILE, 'utf-8');
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed)) {
        return parsed.map((item: any) => ({
          ...item,
          status:
            item.status === 'confirmed'
              ? 'Confirmed'
              : item.status === 'rescheduled'
              ? 'Rescheduled'
              : item.status === 'cancelled'
              ? 'Cancelled'
              : item.status || 'Pending Confirmation',
          consultationType:
            item.consultationType === 'online' || item.consultationType === 'video'
              ? 'Online'
              : 'In-person',
          whatsappNotification: item.whatsappNotification || {
            status: 'sent',
            sentAt: item.createdAt,
            recipientNumber: '9779855088798',
            attempts: 1,
            lastAttemptAt: item.createdAt,
          },
        }));
      }
    }
  } catch (e) {
    console.error('Error reading appointments file:', e);
  }
  // Initial seed appointments for Chitwan flagship
  return [
    {
      id: 'apt-001',
      referenceCode: 'MIFC-CHW-1042',
      doctorId: 'dr-anusha',
      doctorName: 'Dr. Anusha Tiwari',
      branchId: 'chitwan',
      branchName: 'Maulakalika Hospital Pvt. Ltd., Bharatpur-11, Chitwan',
      date: '2026-10-15',
      timeSlot: '10:00 AM',
      consultationType: 'In-person',
      patientName: 'Aayusha Koirala',
      patientPhone: '+977-9855088798',
      patientEmail: 'aayusha.k@example.com',
      treatmentType: 'IVF Consultation',
      notes: 'Initial evaluation for secondary infertility.',
      reason: 'Initial evaluation for secondary infertility.',
      previousIvf: false,
      status: 'Confirmed',
      createdAt: '2026-10-12T09:00:00Z',
      whatsappNotification: {
        status: 'sent',
        sentAt: '2026-10-12T09:00:02Z',
        messageId: 'wamid.HBgLM...',
        recipientNumber: '9779855088798',
        attempts: 1,
        lastAttemptAt: '2026-10-12T09:00:02Z',
      },
    },
    {
      id: 'apt-002',
      referenceCode: 'MIFC-CHW-2091',
      doctorId: 'dr-suresh',
      doctorName: 'Dr. Suresh Thapa',
      branchId: 'chitwan',
      branchName: 'Maulakalika Hospital Pvt. Ltd., Bharatpur-11, Chitwan',
      date: '2026-10-16',
      timeSlot: '02:00 PM',
      consultationType: 'In-person',
      patientName: 'Rabin Shrestha',
      patientPhone: '+977-9855088798',
      patientEmail: 'rabin.s@example.com',
      treatmentType: 'Male Infertility & Andrology',
      notes: 'Second opinion on semen analysis parameters.',
      reason: 'Second opinion on semen analysis parameters.',
      previousIvf: true,
      status: 'Confirmed',
      createdAt: '2026-10-13T08:30:00Z',
      whatsappNotification: {
        status: 'sent',
        sentAt: '2026-10-13T08:30:03Z',
        messageId: 'wamid.HBgLM2...',
        recipientNumber: '9779855088798',
        attempts: 1,
        lastAttemptAt: '2026-10-13T08:30:03Z',
      },
    },
  ];
}

let appointments: StoredAppointment[] = loadAppointments();

function saveAppointments() {
  try {
    fs.writeFileSync(APPOINTMENTS_FILE, JSON.stringify(appointments, null, 2), 'utf-8');
  } catch (e) {
    console.error('Failed to save appointments to disk:', e);
  }
}

// DOCTOR DEFAULT TIME SLOTS
const STANDARD_SLOTS = [
  '09:00 AM',
  '09:30 AM',
  '10:00 AM',
  '10:30 AM',
  '11:00 AM',
  '11:30 AM',
  '01:00 PM',
  '01:30 PM',
  '02:00 PM',
  '02:30 PM',
  '03:00 PM',
  '03:30 PM',
  '04:00 PM',
];

// API ROUTES

// 1. Health check
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    service: 'Mamata International Fertility Centre Backend',
    appointmentsCount: appointments.length,
    serverTime: new Date().toISOString(),
  });
});

// 2. Available slots for doctor + date + branch
app.get('/api/slots', (req: Request, res: Response) => {
  const { doctorId, date, branchId } = req.query;

  if (!date || typeof date !== 'string') {
    return res.status(400).json({ error: 'Date is required (YYYY-MM-DD)' });
  }

  // Find booked slots for this doctor/date
  const bookedSlots = appointments
    .filter(
      (apt) =>
        apt.date === date &&
        apt.status !== 'Cancelled' &&
        (!doctorId || apt.doctorId === doctorId) &&
        (!branchId || apt.branchId === branchId)
    )
    .map((apt) => apt.timeSlot);

  // Filter slots
  const slots = STANDARD_SLOTS.map((slot) => ({
    time: slot,
    available: !bookedSlots.includes(slot),
  }));

  return res.json({
    date,
    doctorId,
    branchId,
    totalSlots: slots.length,
    availableCount: slots.filter((s) => s.available).length,
    slots,
  });
});

// 3. List appointments
app.get('/api/appointments', (_req: Request, res: Response) => {
  // Sort latest first
  const sorted = [...appointments].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  res.json({
    count: sorted.length,
    appointments: sorted,
  });
});

// 4. Create appointment with WhatsApp notification and spam protection
// In-Memory Rate Limiting: max 6 bookings per 10 mins per IP
interface RateLimitRecord {
  count: number;
  firstRequestAt: number;
}
const bookingRateLimitMap = new Map<string, RateLimitRecord>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const MAX_BOOKINGS_PER_WINDOW = 6;

function checkRateLimit(key: string): boolean {
  const now = Date.now();
  const record = bookingRateLimitMap.get(key);
  if (!record) {
    bookingRateLimitMap.set(key, { count: 1, firstRequestAt: now });
    return false;
  }
  if (now - record.firstRequestAt > RATE_LIMIT_WINDOW_MS) {
    bookingRateLimitMap.set(key, { count: 1, firstRequestAt: now });
    return false;
  }
  record.count += 1;
  return record.count > MAX_BOOKINGS_PER_WINDOW;
}

// Idempotency cache: prevent duplicate submissions within 2 minutes
interface IdempotencyRecord {
  timestamp: number;
  appointment: StoredAppointment;
}
const idempotencyCache = new Map<string, IdempotencyRecord>();
const IDEMPOTENCY_WINDOW_MS = 2 * 60 * 1000;

function sanitizeInput(val: any, maxLength = 200): string {
  if (typeof val !== 'string') return '';
  return val.trim().replace(/[<>]/g, '').slice(0, maxLength);
}

app.post('/api/appointments', async (req: Request, res: Response) => {
  try {
    const rawIp = req.ip || req.socket.remoteAddress || 'unknown';
    if (checkRateLimit(rawIp)) {
      return res.status(429).json({
        error: 'Too many booking attempts from this connection. Please contact our clinic hotline at 056-493798 or WhatsApp 9855088798.',
      });
    }

    const {
      doctorId,
      doctorName,
      branchId,
      branchName,
      date,
      timeSlot,
      consultationType = 'In-person',
      countryCode = '+977',
      patientName,
      patientPhone,
      patientEmail,
      treatmentType = 'General Fertility Consultation',
      notes = '',
      reason = '',
      previousIvf = false,
    } = req.body;

    const cleanName = sanitizeInput(patientName, 80);
    const cleanPhone = sanitizeInput(patientPhone, 35);
    const cleanEmail = sanitizeInput(patientEmail, 100);
    const cleanDoctor = sanitizeInput(doctorName, 80);
    const cleanDate = sanitizeInput(date, 20);
    const cleanTimeSlot = sanitizeInput(timeSlot, 25);
    const cleanReason = sanitizeInput(reason || notes, 300);
    const cleanTreatment = sanitizeInput(treatmentType, 100) || 'General Fertility Consultation';
    const cleanType: 'In-person' | 'Online' =
      consultationType === 'Online' || consultationType === 'online' || consultationType === 'video'
        ? 'Online'
        : 'In-person';

    // Validation
    if (!cleanName || cleanName.length < 2) {
      return res.status(400).json({
        error: "Please enter the patient's full name (at least 2 characters).",
      });
    }

    const phoneDigits = cleanPhone.replace(/[^\d]/g, '');
    if (!cleanPhone || phoneDigits.length < 7) {
      return res.status(400).json({
        error: 'Please enter a valid mobile number with country code (e.g. +977-98XXXXXXXX).',
      });
    }

    if (!cleanDoctor || !cleanDate || !cleanTimeSlot) {
      return res.status(400).json({
        error: 'Missing required consultation details: doctor, date, and time slot are required.',
      });
    }

    // Idempotency check: if identical request submitted within 2 minutes, return existing without double-booking
    const idempotencyKey = `${cleanPhone}_${cleanDoctor}_${cleanDate}_${cleanTimeSlot}`;
    const cached = idempotencyCache.get(idempotencyKey);
    const now = Date.now();
    if (cached && now - cached.timestamp < IDEMPOTENCY_WINDOW_MS) {
      return res.status(200).json({
        success: true,
        isDuplicate: true,
        message:
          'Thank you for choosing Mamata International Fertility Center. Your consultation request has been received successfully. Our team will contact you to confirm your appointment.',
        appointment: cached.appointment,
        instructions: {
          status: 'Pending Confirmation',
          arrival:
            'Please arrive 15 minutes before your slot time at Maulakalika Hospital Pvt. Ltd., Bharatpur-11, Chitwan with previous medical files and ultrasound reports.',
          contactLine: 'Hotline: 056-493798 | 056-493738 (WhatsApp: 9855088798)',
          whatsappConfirmation: `A consultation request notification has been dispatched to our clinic desk.`,
          whatsappDirectUrl: `https://wa.me/9779855088798?text=Hello%20Mamata%20Fertility%2C%20I%20have%20submitted%20consultation%20booking%20${encodeURIComponent(cached.appointment.referenceCode)}%20for%20${encodeURIComponent(cleanName)}`,
        },
      });
    }

    // Check if slot is already reserved by another patient (case-insensitive check for Cancelled)
    const existing = appointments.find(
      (a) =>
        a.doctorId === doctorId &&
        a.date === cleanDate &&
        a.timeSlot === cleanTimeSlot &&
        a.status !== 'Cancelled' &&
        (a as any).status !== 'cancelled'
    );

    if (existing) {
      return res.status(409).json({
        error: `This slot (${cleanTimeSlot} on ${cleanDate}) was just reserved. Please select another convenient time slot.`,
      });
    }

    // Generate unique booking reference code
    const randomCode = Math.floor(1000 + Math.random() * 9000);
    const referenceCode = `MIFC-CHW-${randomCode}`;

    // Status is always "Pending Confirmation" until clinic staff reviews
    const bookingStatus: 'Pending Confirmation' = 'Pending Confirmation';

    // 1. Send WhatsApp Business notification to clinic's designated WhatsApp number
    const whatsappResult: WhatsAppNotificationResult = await sendWhatsAppBookingNotification({
      bookingId: referenceCode,
      patientName: cleanName,
      patientPhone: cleanPhone,
      patientEmail: cleanEmail || undefined,
      doctorName: cleanDoctor,
      preferredDate: cleanDate,
      preferredTime: cleanTimeSlot,
      consultationType: cleanType,
      reason: cleanReason || undefined,
    });

    const newAppointment: StoredAppointment = {
      id: `apt-${Date.now()}`,
      referenceCode,
      doctorId: doctorId || 'general',
      doctorName: cleanDoctor,
      branchId: 'chitwan',
      branchName: 'Maulakalika Hospital Pvt. Ltd., Bharatpur-11, Chitwan',
      date: cleanDate,
      timeSlot: cleanTimeSlot,
      consultationType: cleanType,
      patientName: cleanName,
      countryCode: sanitizeInput(countryCode, 8) || '+977',
      patientPhone: cleanPhone,
      patientEmail: cleanEmail || '',
      treatmentType: cleanTreatment,
      notes: cleanReason,
      reason: cleanReason,
      previousIvf: Boolean(previousIvf),
      status: bookingStatus,
      createdAt: new Date().toISOString(),
      whatsappNotification: {
        status: whatsappResult.status,
        sentAt: whatsappResult.success ? whatsappResult.timestamp : undefined,
        messageId: whatsappResult.messageId,
        recipientNumber: whatsappResult.recipientNumber,
        error: whatsappResult.error,
        attempts: 1,
        lastAttemptAt: whatsappResult.timestamp,
      },
    };

    appointments.push(newAppointment);
    saveAppointments();

    // Cache for duplicate protection
    idempotencyCache.set(idempotencyKey, {
      timestamp: now,
      appointment: newAppointment,
    });

    return res.status(201).json({
      success: true,
      message:
        'Thank you for choosing Mamata International Fertility Center. Your consultation request has been received successfully. Our team will contact you to confirm your appointment.',
      appointment: newAppointment,
      whatsappStatus: whatsappResult.status,
      instructions: {
        status: 'Pending Confirmation',
        message:
          'Thank you for choosing Mamata International Fertility Center. Your consultation request has been received successfully. Our team will contact you to confirm your appointment.',
        arrival:
          'Please arrive 15 minutes before your slot time at Maulakalika Hospital Pvt. Ltd., Bharatpur-11, Chitwan with previous medical files and ultrasound reports.',
        contactLine: 'Hotline: 056-493798 | 056-493738 (WhatsApp: 9855088798)',
        whatsappConfirmation:
          whatsappResult.status === 'sent'
            ? 'Booking notification successfully delivered to the clinic WhatsApp desk.'
            : 'Booking recorded in clinic database; notification queued for coordinator review.',
        whatsappDirectUrl: `https://wa.me/9779855088798?text=Hello%20Mamata%20Fertility%2C%20I%20have%20submitted%20consultation%20booking%20${encodeURIComponent(referenceCode)}%20for%20${encodeURIComponent(cleanName)}`,
      },
    });
  } catch (err: any) {
    console.error('Error creating appointment:', err);
    return res.status(500).json({ error: 'Internal server error while saving appointment' });
  }
});

// 4.1 Admin Endpoint: Retry WhatsApp Notification
app.post('/api/appointments/:id/retry-whatsapp', async (req: Request, res: Response) => {
  const { id } = req.params;
  const apt = appointments.find((a) => a.id === id || a.referenceCode === id);

  if (!apt) {
    return res.status(404).json({ error: 'Appointment not found.' });
  }

  try {
    const whatsappResult = await sendWhatsAppBookingNotification({
      bookingId: apt.referenceCode,
      patientName: apt.patientName,
      patientPhone: apt.patientPhone,
      patientEmail: apt.patientEmail || undefined,
      doctorName: apt.doctorName,
      preferredDate: apt.date,
      preferredTime: apt.timeSlot,
      consultationType: apt.consultationType,
      reason: apt.reason || apt.notes || undefined,
    });

    const prevAttempts = apt.whatsappNotification?.attempts || 0;
    apt.whatsappNotification = {
      status: whatsappResult.status,
      sentAt: whatsappResult.success ? whatsappResult.timestamp : apt.whatsappNotification?.sentAt,
      messageId: whatsappResult.messageId || apt.whatsappNotification?.messageId,
      recipientNumber: whatsappResult.recipientNumber,
      error: whatsappResult.error,
      attempts: prevAttempts + 1,
      lastAttemptAt: whatsappResult.timestamp,
    };

    saveAppointments();

    return res.json({
      success: whatsappResult.success,
      status: whatsappResult.status,
      message: whatsappResult.success
        ? 'WhatsApp notification sent successfully.'
        : `Notification failed: ${whatsappResult.error || 'Unknown error'}`,
      appointment: apt,
    });
  } catch (err: any) {
    return res.status(500).json({ error: err?.message || 'Failed to retry notification' });
  }
});

// 4.2 Admin Endpoint: Update Appointment Status
app.patch('/api/appointments/:id/status', (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;

  const validStatuses = ['Pending Confirmation', 'Confirmed', 'Rescheduled', 'Cancelled'];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({
      error: `Invalid status. Must be one of: ${validStatuses.join(', ')}`,
    });
  }

  const apt = appointments.find((a) => a.id === id || a.referenceCode === id);
  if (!apt) {
    return res.status(404).json({ error: 'Appointment not found.' });
  }

  apt.status = status;
  saveAppointments();

  return res.json({
    success: true,
    message: `Appointment status updated to ${status}.`,
    appointment: apt,
  });
});

// 4.3 Diagnostic Endpoint: Check WhatsApp configuration status
app.get('/api/whatsapp/config', (_req: Request, res: Response) => {
  const hasToken = Boolean(process.env.WHATSAPP_ACCESS_TOKEN?.trim());
  const hasPhoneId = Boolean(process.env.WHATSAPP_PHONE_NUMBER_ID?.trim());
  const recipient = (process.env.WHATSAPP_RECIPIENT_NUMBER || '9779855088798').replace(/[^\d]/g, '');

  res.json({
    configured: hasToken && hasPhoneId,
    hasToken,
    hasPhoneId,
    recipientNumber: recipient,
    apiVersion: process.env.WHATSAPP_API_VERSION || 'v21.0',
    status: hasToken && hasPhoneId ? 'ready' : 'credentials_missing',
  });
});

// 5. Live Chat / AI Fertility Assistant
app.post('/api/chat', async (req: Request, res: Response) => {
  const { message, history = [] } = req.body;

  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'Message is required' });
  }

  const systemInstructions = `
You are Aarati, the Senior Fertility Care Counselor & AI Assistant at "Mamata International Fertility Centre" (Nepal's premier IVF & Reproductive Medicine clinic).
Website identity: Mamata International Fertility Centre.
Key Location & Contact Facts:
- Hospital Location: Maulakalika Hospital Pvt. Ltd., Bharatpur-11, Chitwan, Nepal.
- Official Hotline: 056-493798
- Additional Landline: 056-493738
- Official WhatsApp / Direct Mobile: 9855088798
- Email: care@mamatafertility.com
- Lead Fertility Specialist & Focal Person: Dr. Anusha Tiwari (MBBS, MD OBG/GYN, Fellowship in Reproductive Medicine, 9+ years obstetrics experience, 6+ years in fertility care).
- Ultrasound & Pregnancy Monitoring: Dr. Ramesh Ghimire (5D ultrasound, every step monitored with professional doctor care).
- Obstetrics Team (OBS): Dr. Kesheb Bhurtel & Dr. Anupama Karki (Antenatal care from starting to delivery, postnatal care after birth).
- Laparoscopic Surgery Team: Dr. Ramesh Poudel & Dr. Ritu (Minimally invasive reproductive surgery).
- Chief Clinical Embryologist & Lab Director: Dr. Bikash Adhikari (M.Sc Leeds UK, ESHRE certified).
- Andrologist & Male Infertility Specialist: Dr. Suresh Thapa (Micro-TESE, TESA/PESA).
- Treatments: In-Vitro Fertilization (IVF), ICSI, IUI, Blastocyst Culture (Day 5), Cryopreservation (Egg/Sperm Freezing), Male Infertility (TESA/PESA), Laparoscopy, 5D Ultrasound, Complete Maternity Care, Level II/III NICU.
- Costs & Packages:
  * Complete IVF / ICSI Blastocyst Program: NPR 2,45,000 (USD $1,850) + medication.
  * IUI Program: NPR 28,000 (USD $210).
  * Egg Vitrification: NPR 1,65,000 (USD $1,250) including 2 years storage.
  * TESA/PESA Sperm Retrieval: NPR 65,000 (USD $490).
- Transparent pricing with zero hidden fees.
- Clinic hours: Sun-Fri 7:30 AM - 7:30 PM, Sat 9:00 AM - 3:00 PM.
- International & NRI friendly: customized 16-21 day protocols with preliminary remote consultations.

Tone: Deeply empathetic, compassionate, professional, clear, and reassuring. Always provide the phone numbers (Hotline: 056-493798, WhatsApp: 9855088798) and remind patients that the hospital is located at Maulakalika Hospital Pvt. Ltd., Bharatpur-11, Chitwan.
`;

  // Try Gemini AI if available
  if (aiClient) {
    try {
      // Build conversation history
      const formattedContents = [
        { role: 'user' as const, parts: [{ text: systemInstructions }] },
        { role: 'model' as const, parts: [{ text: "Understood. I am Aarati, Senior Fertility Care Counselor at Mamata International Fertility Centre based at Maulakalika Hospital Pvt. Ltd., Bharatpur-11, Chitwan. I am here to guide patients with warmth, clinical accuracy, and compassion." }] },
        ...history.slice(-8).map((h: any) => ({
          role: (h.role === 'user' ? 'user' : 'model') as 'user' | 'model',
          parts: [{ text: h.text }],
        })),
        { role: 'user' as const, parts: [{ text: message }] },
      ];

      const response = await aiClient.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: formattedContents,
      });

      const replyText = response.text || "Thank you for reaching out to Mamata International Fertility Centre. We are here to support your parenthood journey every step of the way.";
      return res.json({ reply: replyText, agent: 'Aarati (AI Fertility Care Counselor)' });
    } catch (err: any) {
      console.warn('Gemini chat API error, switching to clinical counselor engine:', err?.message || err);
    }
  }

  // Clinical Rule-based fallback engine
  const lower = message.toLowerCase();
  let reply = '';

  if (lower.includes('cost') || lower.includes('price') || lower.includes('fee') || lower.includes('खर्च') || lower.includes('पैसा')) {
    reply = `At Mamata International Fertility Centre (Maulakalika Hospital, Chitwan), we take pride in complete transparency with zero hidden costs:\n\n• **Complete IVF / ICSI Program**: NPR 2,45,000 (approx. USD $1,850) — includes egg retrieval under sedation, ICSI, Day-5 blastocyst culture, embryo transfer, and 1 year cryo-storage.\n• **IUI Program**: NPR 28,000 (approx. USD $210).\n• **Egg Vitrification (Freezing)**: NPR 1,65,000 (approx. USD $1,250) including 2 years storage.\n• **Male TESA/PESA**: NPR 65,000 (approx. USD $490).\n\nWould you like me to connect you on WhatsApp (9855088798) or book an initial appointment?`;
  } else if (lower.includes('contact') || lower.includes('phone') || lower.includes('number') || lower.includes('whatsapp') || lower.includes('hotline') || lower.includes('सम्पर्क') || lower.includes('फोन')) {
    reply = `You can reach Mamata International Fertility Centre directly through:\n\n• **Hotline Line**: 056-493798\n• **Secondary Landline**: 056-493738\n• **Official WhatsApp / Mobile**: 9855088798\n• **Location**: Maulakalika Hospital Pvt. Ltd., Bharatpur-11, Chitwan, Nepal\n\nOur team is available Sunday to Friday from 7:30 AM to 7:30 PM.`;
  } else if (lower.includes('location') || lower.includes('branch') || lower.includes('where') || lower.includes('address') || lower.includes('कहाँ') || lower.includes('chitwan') || lower.includes('चितवन')) {
    reply = `Our premier fertility centre is located at:\n\n📍 **Maulakalika Hospital Pvt. Ltd., Bharatpur-11, Chitwan, Nepal**\n\n• **Hotline**: 056-493798\n• **Secondary Landline**: 056-493738\n• **WhatsApp**: 9855088798\n• **Hours**: Sunday to Friday 7:30 AM – 7:30 PM (Saturday 9:00 AM – 3:00 PM)\n\nWe provide complete IVF cleanroom labs, consultations, and day-care procedure suites on-premise at Maulakalika Hospital.`;
  } else if (lower.includes('success rate') || lower.includes('chance') || lower.includes('सफलता')) {
    reply = `Our cumulative clinical pregnancy rate reaches **up to 72%** per blastocyst transfer for women under 35, and over **84%** across two consecutive cycles. Dr. Anusha Tiwari conducts individualized AMH and pelvic assessments at Maulakalika Hospital so we can choose the exact stimulation protocol that maximizes your egg quality and implantation chances.`;
  } else if (lower.includes('appointment') || lower.includes('book') || lower.includes('meet') || lower.includes('doctor') || lower.includes('डाक्टर')) {
    reply = `You can easily schedule a consultation right here on our website or by messaging our WhatsApp at **9855088798**!\n\nSpecialists available:\n1. **Dr. Anusha Tiwari** (Lead Fertility Specialist & Focal Person — 9+ yrs OBS, 6+ yrs Fertility)\n2. **Dr. Ramesh Ghimire** (Ultrasound & 5D Pregnancy Monitoring)\n3. **Obstetrics Team**: Dr. Kesheb Bhurtel & Dr. Anupama Karki\n4. **Laparoscopic Surgery Team**: Dr. Ramesh Poudel & Dr. Ritu\n5. **Dr. Bikash Adhikari** (Chief Clinical Embryologist)\n6. **Dr. Suresh Thapa** (Andrologist & Male Infertility)\n\nLocation: Maulakalika Hospital Pvt. Ltd., Bharatpur-11, Chitwan. Hotline: 056-493798.`;
  } else if (lower.includes('due date') || lower.includes('calculator') || lower.includes('delivery date') || lower.includes('pregnant') || lower.includes('डेलिभरी') || lower.includes('क्यालकुलेटर')) {
    reply = `You can estimate your delivery date right here using our interactive **Due Date Calculator**! You can calculate based on:\n\n• **First Day of Last Period (LMP)** (with your exact cycle length)\n• **IVF Day 5 Blastocyst Transfer Date**\n• **IVF Day 3 Embryo Transfer Date**\n• **Date of Conception or IUI**\n\nIt will also reveal your current gestational week, trimester progress bar, baby growth size milestones, and estimated dates for your 6-week viability scan and 20-week anatomy ultrasound at Maulakalika Hospital!`;
  } else if (lower.includes('male') || lower.includes('sperm') || lower.includes('azoospermia') || lower.includes('शुक्राणु') || lower.includes('पुरुष')) {
    reply = `Male factor challenges account for nearly half of all conception delays, and there is immense hope today. Under **Dr. Suresh Thapa**, we provide microsurgical procedures including **TESA, PESA, and Micro-TESE** at Maulakalika Hospital, which retrieve healthy viable sperm directly from testicular tissue even when semen analysis shows zero sperm. These are immediately paired with ICSI by our embryology team.`;
  } else if (lower.includes('pain') || lower.includes('hurt') || lower.includes('दुखाइ') || lower.includes('दुख्छ')) {
    reply = `Patient comfort is our utmost priority. The egg retrieval procedure is performed under gentle intravenous sedation (twilight sleep) by a senior anesthesiologist. You will be comfortably asleep during the 15–20 minute retrieval and will not feel any pain. Most patients relax in our recovery lounge at Maulakalika Hospital for about 2 hours and go home the same day feeling relaxed.`;
  } else {
    reply = `Hello, I'm Aarati from Mamata International Fertility Centre at Maulakalika Hospital Pvt. Ltd., Bharatpur-11, Chitwan. We understand that navigating fertility care can feel overwhelming, but you are not alone.\n\nWhether you have questions about **IVF or ICSI**, **treatment costs**, **doctor appointments**, or **egg/sperm freezing**, I am here to help you. You can also call our hotline directly at **056-493798** or WhatsApp **9855088798**. How can we support you today?`;
  }

  res.json({ reply, agent: 'Aarati (Fertility Care Counselor)' });
});

// VITE OR STATIC SERVING SETUP
async function startServer() {
  if (!isProduction) {
    // Development mode: attach Vite middleware
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);

    // Development SPA index.html fallback for multi-page routing
    app.use('*', async (req: Request, res: Response, next) => {
      const url = req.originalUrl;
      try {
        const indexPath = path.resolve(process.cwd(), 'index.html');
        let template = fs.readFileSync(indexPath, 'utf-8');
        template = await vite.transformIndexHtml(url, template);
        res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
      } catch (e: any) {
        vite.ssrFixStacktrace(e);
        next(e);
      }
    });
  } else {
    // Production mode: serve built assets from dist
    const distPath = path.resolve(process.cwd(), 'dist');
    if (fs.existsSync(distPath)) {
      app.use(express.static(distPath));
      app.get('*', (_req: Request, res: Response) => {
        res.sendFile(path.join(distPath, 'index.html'));
      });
    } else {
      console.warn('Production build dist folder not found. Please run npm run build.');
    }
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Mamata International Fertility Centre Server running on port ${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Fatal error starting server:', err);
  process.exit(1);
});
