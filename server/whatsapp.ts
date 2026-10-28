/**
 * WhatsApp Business Platform Cloud API Integration
 * Handles sending automated consultation booking notifications to the clinic's WhatsApp number.
 */

export interface WhatsAppNotificationPayload {
  bookingId: string;
  patientName: string;
  patientPhone: string;
  patientEmail?: string;
  doctorName: string;
  preferredDate: string;
  preferredTime: string;
  consultationType: 'In-person' | 'Online';
  reason?: string;
}

export interface WhatsAppNotificationResult {
  success: boolean;
  status: 'sent' | 'failed' | 'not_configured';
  messageId?: string;
  error?: string;
  recipientNumber: string;
  timestamp: string;
}

/**
 * Generates the standardized consultation notification template
 */
export function formatWhatsAppBookingMessage(data: WhatsAppNotificationPayload): string {
  const emailLine = data.patientEmail && data.patientEmail.trim() ? data.patientEmail.trim() : 'Not Provided';
  const reasonLine = data.reason && data.reason.trim() ? data.reason.trim() : 'Not Provided';

  return `*New Consultation Booking — Mamata International Fertility Center*

A new patient has requested a consultation.

- Booking ID: ${data.bookingId}
- Patient Name: ${data.patientName}
- Mobile Number: ${data.patientPhone}
- Email: ${emailLine}
- Doctor/Specialist: ${data.doctorName}
- Preferred Date: ${data.preferredDate}
- Preferred Time: ${data.preferredTime}
- Consultation Type: ${data.consultationType}
- Reason for Consultation: ${reasonLine}

Booking Status: Pending Confirmation

Please review the booking and contact the patient to confirm the appointment.

Mamata International Fertility Center`;
}

/**
 * Sends a WhatsApp notification to the clinic's designated number
 * using the official Meta WhatsApp Business Platform Cloud API.
 */
export async function sendWhatsAppBookingNotification(
  payload: WhatsAppNotificationPayload
): Promise<WhatsAppNotificationResult> {
  const token = process.env.WHATSAPP_ACCESS_TOKEN?.trim();
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID?.trim();
  // Default to clinic hotline/WhatsApp 9855088798 (+977 9855088798)
  const defaultClinicNumber = '9779855088798';
  const rawRecipient = process.env.WHATSAPP_RECIPIENT_NUMBER?.trim() || defaultClinicNumber;
  const recipientNumber = rawRecipient.replace(/[^\d]/g, '');
  const apiVersion = process.env.WHATSAPP_API_VERSION?.trim() || 'v21.0';

  const timestamp = new Date().toISOString();

  // 1. Check if WhatsApp API credentials are configured in environment variables
  if (!token || !phoneNumberId) {
    console.warn(
      `[WhatsApp] WhatsApp credentials not configured. Set WHATSAPP_ACCESS_TOKEN and WHATSAPP_PHONE_NUMBER_ID in environment variables. (Recipient: ${recipientNumber})`
    );
    return {
      success: false,
      status: 'not_configured',
      error: 'WhatsApp Business API credentials (WHATSAPP_ACCESS_TOKEN / WHATSAPP_PHONE_NUMBER_ID) not configured in server environment.',
      recipientNumber,
      timestamp,
    };
  }

  const messageBody = formatWhatsAppBookingMessage(payload);
  const endpoint = `https://graph.facebook.com/${apiVersion}/${phoneNumberId}/messages`;

  // 2. Dispatch request to Meta WhatsApp Business Platform Cloud API
  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messaging_product: 'whatsapp',
        recipient_type: 'individual',
        to: recipientNumber,
        type: 'text',
        text: {
          preview_url: false,
          body: messageBody,
        },
      }),
    });

    const data = (await res.json().catch(() => ({}))) as Record<string, any>;

    if (!res.ok) {
      const errMsg =
        data?.error?.message ||
        data?.error?.error_user_msg ||
        `Meta WhatsApp API returned HTTP ${res.status}`;
      console.error(`[WhatsApp] Meta API error for booking ${payload.bookingId}:`, errMsg);
      return {
        success: false,
        status: 'failed',
        error: errMsg,
        recipientNumber,
        timestamp,
      };
    }

    const messageId = data?.messages?.[0]?.id || `wamid.${Date.now()}`;
    console.log(
      `[WhatsApp] Successfully delivered booking alert for ${payload.bookingId} to clinic WhatsApp ${recipientNumber}. Message ID: ${messageId}`
    );

    return {
      success: true,
      status: 'sent',
      messageId,
      recipientNumber,
      timestamp,
    };
  } catch (err: any) {
    const errorMsg = err?.message || 'Network exception while connecting to Meta WhatsApp API';
    console.error(`[WhatsApp] Network failure for booking ${payload.bookingId}:`, errorMsg);
    return {
      success: false,
      status: 'failed',
      error: errorMsg,
      recipientNumber,
      timestamp,
    };
  }
}
