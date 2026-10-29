import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  MessageCircle,
  X,
  Send,
  Bot,
  User,
  Sparkles,
  Phone,
  ExternalLink,
  RefreshCw,
  Calendar,
  Calculator,
  TrendingUp,
  MapPin,
  Clock,
  CheckCircle2,
  ChevronRight,
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  actionType?: 'book_consultation' | 'view_calculators' | 'view_success_rates' | 'whatsapp';
  actionLabel?: string;
  actionData?: any;
}

interface LiveChatWidgetProps {
  onOpenBooking?: (doctorName?: string, branchId?: string, treatmentName?: string) => void;
  onNavigate?: (path: string) => void;
}

// Function to compute current time in Nepal Standard Time (UTC+5:45)
function getNepalTimeInfo(): { isStaffed: boolean; timeString: string; statusText: string } {
  try {
    const now = new Date();
    // UTC milliseconds + local offset in ms
    const utcMs = now.getTime() + now.getTimezoneOffset() * 60000;
    // Nepal is UTC + 5:45 (345 minutes)
    const nptDate = new Date(utcMs + 345 * 60000);

    const day = nptDate.getDay(); // 0 is Sunday, 6 is Saturday
    const hours = nptDate.getHours();
    const minutes = nptDate.getMinutes();
    const timeInHours = hours + minutes / 60;

    let isStaffed = false;
    // Sunday (0) through Friday (5): 7:30 AM to 7:30 PM (7.5 to 19.5)
    // Saturday (6): 9:00 AM to 3:00 PM (9.0 to 15.0)
    if (day === 6) {
      isStaffed = timeInHours >= 9 && timeInHours <= 15;
    } else {
      isStaffed = timeInHours >= 7.5 && timeInHours <= 19.5;
    }

    const timeString = nptDate.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });

    const statusText = isStaffed
      ? 'Staffed Now (Clinic Desk Active)'
      : 'After Hours (AI & WhatsApp Active)';

    return { isStaffed, timeString, statusText };
  } catch {
    return { isStaffed: true, timeString: '', statusText: 'Clinic Desk Active' };
  }
}

const STORAGE_KEY = 'mamata_chat_history_v3';

export const LiveChatWidget: React.FC<LiveChatWidgetProps> = ({
  onOpenBooking,
  onNavigate,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [clinicTimeInfo, setClinicTimeInfo] = useState(() => getNepalTimeInfo());

  // Poll clinic time every 60 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setClinicTimeInfo(getNepalTimeInfo());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // Initial welcome message
  const initialGreeting: ChatMessage = {
    id: 'msg-init',
    sender: 'assistant',
    text: "Namaste! I'm Aarati, Senior Fertility Care Counselor at Mamata International Fertility Centre (Maulakalika Hospital, Chitwan).\n\nWhether you need details on IVF packages, success rates by age, our ovulation and due date calculators, or booking a consultation with Dr. Anusha Tiwari, I am here to help.",
    timestamp: 'Just now',
    actionType: 'book_consultation',
    actionLabel: 'Book Consultation with Dr. Anusha Tiwari',
  };

  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    try {
      if (typeof window !== 'undefined') {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) {
            return parsed;
          }
        }
      }
    } catch (e) {
      console.warn('Failed to parse saved chat history:', e);
    }
    return [initialGreeting];
  });

  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Save to localStorage
  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
      }
    } catch (e) {
      console.warn('Failed to persist chat messages:', e);
    }
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      setUnreadCount(0);
      scrollToBottom();
    }
  }, [isOpen, messages]);

  const handleSendMessage = async (customText?: string) => {
    const textToSend = customText || inputText;
    if (!textToSend.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: textToSend.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setLoading(true);

    // Immediate client-side intent recognition for quick routing actions
    const lower = textToSend.toLowerCase();
    let actionType: ChatMessage['actionType'] = undefined;
    let actionLabel: string | undefined = undefined;

    if (lower.includes('book') || lower.includes('appointment') || lower.includes('consult') || lower.includes('dr anusha') || lower.includes('doctor')) {
      actionType = 'book_consultation';
      actionLabel = 'Open Consultation Booking Form';
    } else if (lower.includes('calculator') || lower.includes('ovulation') || lower.includes('due date') || lower.includes('fertile')) {
      actionType = 'view_calculators';
      actionLabel = 'Explore Fertility & Due Date Calculators';
    } else if (lower.includes('success') || lower.includes('rate') || lower.includes('percentage') || lower.includes('chance')) {
      actionType = 'view_success_rates';
      actionLabel = 'View Audited Success Rates Dashboard';
    } else if (lower.includes('whatsapp') || lower.includes('contact') || lower.includes('number') || lower.includes('phone')) {
      actionType = 'whatsapp';
      actionLabel = 'Chat Directly on WhatsApp (9855088798)';
    }

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMsg.text,
          history: messages.slice(-6).map((m) => ({
            role: m.sender === 'user' ? 'user' : 'assistant',
            text: m.text,
          })),
        }),
      });

      const data = await response.json();
      const replyMsg: ChatMessage = {
        id: `ast-${Date.now()}`,
        sender: 'assistant',
        text:
          data.reply ||
          'Thank you. Our care coordinators at Maulakalika Hospital Chitwan are always here to assist. You can reach our direct hospital hotline at 056-493798 or WhatsApp 9855088798.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        actionType,
        actionLabel,
      };

      setMessages((prev) => [...prev, replyMsg]);
    } catch {
      // Local fallback with rich response
      let fallbackText =
        'Thank you for reaching out to Mamata International Fertility Centre at Maulakalika Hospital, Chitwan.\n\nOur team is available daily (Sun–Fri 7:30 AM – 7:30 PM, Sat 9 AM – 3 PM NPT). You can also call us directly at 056-493798 or WhatsApp our desk at 9855088798.';

      if (lower.includes('cost') || lower.includes('price')) {
        fallbackText =
          'Our Complete IVF / ICSI Blastocyst Program is NPR 2,45,000 (USD $1,850) + medication, with zero hidden fees. Single IUI is NPR 28,000 and Egg Vitrification is NPR 1,65,000. Would you like to schedule an initial evaluation with Dr. Anusha Tiwari?';
        actionType = 'book_consultation';
        actionLabel = 'Book Consultation with Dr. Anusha';
      }

      const fallbackMsg: ChatMessage = {
        id: `ast-${Date.now()}`,
        sender: 'assistant',
        text: fallbackText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        actionType,
        actionLabel,
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleActionClick = (actionType?: string) => {
    if (actionType === 'book_consultation') {
      if (onOpenBooking) {
        onOpenBooking('Dr. Anusha Tiwari', 'chitwan', 'IVF Assessment');
      }
    } else if (actionType === 'view_calculators') {
      if (onNavigate) {
        onNavigate('/calculators');
        setIsOpen(false);
      }
    } else if (actionType === 'view_success_rates') {
      if (onNavigate) {
        onNavigate('/success-rates');
        setIsOpen(false);
      }
    } else if (actionType === 'whatsapp') {
      window.open('https://wa.me/9779855088798?text=Hello%20Mamata%20Fertility%2C%20I%20have%20an%20inquiry%20from%20the%20website', '_blank');
    }
  };

  const quickTriageOptions = [
    { label: '💰 IVF Packages & Costs', text: 'What is the full cost of an IVF cycle at Mamata Centre?' },
    { label: '📅 Book Dr. Anusha Tiwari', text: 'I would like to book a consultation with Dr. Anusha Tiwari.' },
    { label: '📊 Success Rates by Age', text: 'What are your clinical success rates for IVF and blastocyst transfer?' },
    { label: '🧮 Ovulation & Due Date Tools', text: 'How do your ovulation and pregnancy due date calculators work?' },
    { label: '📍 Location in Chitwan', text: 'Where is the hospital located and what are your visiting hours?' },
  ];

  return (
    <>
      {/* 1. FLOATING ACTION TRIGGER */}
      {!isOpen && (
        <div className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-40">
          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-3 bg-gradient-to-r from-[#1D3B58] to-[#2B5A88] text-white pl-3.5 pr-4 py-3 rounded-full shadow-2xl hover:shadow-pink-900/20 transition-all duration-300 transform hover:scale-105 active:scale-95 border-2 border-white/90 group cursor-pointer"
            aria-label="Open Live Fertility Support Chat"
          >
            <div className="relative">
              <div className="w-9 h-9 rounded-full bg-[#E48AA0] flex items-center justify-center text-white font-black text-sm shadow-inner">
                M
              </div>
              <span
                className={`absolute -top-1 -right-1 w-3.5 h-3.5 border-2 border-white rounded-full ${
                  clinicTimeInfo.isStaffed ? 'bg-emerald-500 animate-pulse' : 'bg-amber-400'
                }`}
                title={clinicTimeInfo.statusText}
              />
            </div>

            <div className="text-left hidden sm:block">
              <div className="text-xs font-bold leading-tight flex items-center gap-1.5">
                <span>Live Fertility Desk</span>
                <span className="text-[10px] text-[#E48AA0] font-semibold">Online</span>
              </div>
              <div className="text-[10px] text-slate-200 font-normal truncate max-w-[140px]">
                {clinicTimeInfo.isStaffed ? 'Counselor Staffed Now' : 'AI Counselor Active'}
              </div>
            </div>

            {unreadCount > 0 && (
              <span className="bg-[#E48AA0] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                {unreadCount}
              </span>
            )}
          </button>
        </div>
      )}

      {/* 2. CHAT WINDOW DIALOG */}
      {isOpen && (
        <div className="fixed inset-x-2 bottom-20 sm:bottom-6 sm:inset-auto sm:right-6 z-50 w-auto sm:w-[400px] max-w-[calc(100vw-1rem)] bg-white rounded-3xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden max-h-[82vh] h-[580px] animate-in fade-in slide-in-from-bottom-5">
          {/* HEADER */}
          <div className="bg-gradient-to-r from-[#1D3B58] to-[#2B5A88] text-white p-4 flex items-center justify-between shrink-0 shadow-xs">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-[#E48AA0] flex items-center justify-center text-white font-extrabold text-sm shadow-sm">
                  M
                </div>
                <span
                  className={`absolute bottom-0 right-0 w-3 h-3 border-2 border-[#1D3B58] rounded-full ${
                    clinicTimeInfo.isStaffed ? 'bg-emerald-400' : 'bg-amber-400'
                  }`}
                />
              </div>
              <div>
                <h4 className="text-sm font-bold flex items-center gap-1.5">
                  <span>Sister Aarati</span>
                  <span className="text-[10px] bg-white/20 text-[#E48AA0] font-semibold px-1.5 py-0.5 rounded-full">
                    Senior Counselor
                  </span>
                </h4>
                <div className="text-[11px] text-slate-200 flex items-center gap-1">
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      clinicTimeInfo.isStaffed ? 'bg-emerald-400' : 'bg-amber-400'
                    }`}
                  />
                  <span>
                    {clinicTimeInfo.isStaffed
                      ? 'Desk Staffed Now (Nepal Time)'
                      : 'After Hours (AI & WhatsApp)'}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => {
                  setMessages([initialGreeting]);
                  localStorage.removeItem(STORAGE_KEY);
                }}
                title="Reset conversation"
                className="p-1.5 text-slate-300 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-slate-300 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Close Chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* HOSPITAL LOCATION & HOURS STRIP */}
          <div className="bg-[#FCEEF1] text-[#1D3B58] px-3.5 py-1.5 text-[11px] flex items-center justify-between border-b border-[#F5D8E0] shrink-0 font-medium">
            <span className="flex items-center gap-1.5 text-slate-700">
              <MapPin className="w-3.5 h-3.5 text-[#E48AA0]" />
              <span className="truncate max-w-[200px] sm:max-w-[240px]">
                Maulakalika Hospital, Chitwan
              </span>
            </span>
            <a
              href="https://wa.me/9779855088798"
              target="_blank"
              rel="noreferrer"
              className="text-[#C96D83] font-bold hover:underline flex items-center gap-1"
            >
              <span>WhatsApp: 9855088798</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* MESSAGES SCROLL CONTAINER */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#FAFBFD] text-xs">
            {messages.map((msg) => {
              const isUser = msg.sender === 'user';
              return (
                <div
                  key={msg.id}
                  className={`flex items-start gap-2 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
                >
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-[10px] font-bold shadow-xs ${
                      isUser ? 'bg-[#2B5A88] text-white' : 'bg-[#E48AA0] text-white'
                    }`}
                  >
                    {isUser ? <User className="w-3.5 h-3.5" /> : <Bot className="w-4 h-4" />}
                  </div>
                  <div
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 shadow-2xs whitespace-pre-line leading-relaxed ${
                      isUser
                        ? 'bg-[#1D3B58] text-white rounded-tr-xs'
                        : 'bg-white text-slate-800 border border-slate-200 rounded-tl-xs'
                    }`}
                  >
                    <div>{msg.text}</div>

                    {/* INTERACTIVE ACTION BUTTON IN MESSAGE */}
                    {!isUser && msg.actionType && msg.actionLabel && (
                      <div className="mt-2.5 pt-2 border-t border-slate-100">
                        <button
                          type="button"
                          onClick={() => handleActionClick(msg.actionType)}
                          className="w-full bg-[#1D3B58] hover:bg-[#2B5A88] text-white font-bold py-1.5 px-3 rounded-xl text-[11px] flex items-center justify-between transition-colors shadow-2xs cursor-pointer group"
                        >
                          <span className="flex items-center gap-1.5">
                            {msg.actionType === 'book_consultation' && <Calendar className="w-3.5 h-3.5 text-[#E48AA0]" />}
                            {msg.actionType === 'view_calculators' && <Calculator className="w-3.5 h-3.5 text-[#E48AA0]" />}
                            {msg.actionType === 'view_success_rates' && <TrendingUp className="w-3.5 h-3.5 text-[#E48AA0]" />}
                            {msg.actionType === 'whatsapp' && <Phone className="w-3.5 h-3.5 text-emerald-400" />}
                            <span>{msg.actionLabel}</span>
                          </span>
                          <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                        </button>
                      </div>
                    )}

                    <div
                      className={`text-[9px] mt-1.5 text-right ${
                        isUser ? 'text-slate-300' : 'text-slate-400'
                      }`}
                    >
                      {msg.timestamp}
                    </div>
                  </div>
                </div>
              );
            })}

            {loading && (
              <div className="flex items-center gap-2 text-slate-500 text-xs pl-9">
                <div className="w-2 h-2 rounded-full bg-[#E48AA0] animate-bounce" />
                <div className="w-2 h-2 rounded-full bg-[#E48AA0] animate-bounce [animation-delay:0.2s]" />
                <div className="w-2 h-2 rounded-full bg-[#E48AA0] animate-bounce [animation-delay:0.4s]" />
                <span className="text-[11px] text-slate-400">Sister Aarati is replying...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* QUICK TOPIC PILLS */}
          <div className="p-2.5 bg-white border-t border-slate-100 flex gap-1.5 overflow-x-auto shrink-0 scrollbar-none">
            {quickTriageOptions.map((opt, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleSendMessage(opt.text)}
                className="text-[11px] bg-slate-50 hover:bg-[#FCEEF1] text-slate-700 hover:text-[#C96D83] border border-slate-200 rounded-xl px-2.5 py-1 whitespace-nowrap transition-colors cursor-pointer shrink-0 font-medium"
              >
                {opt.label}
              </button>
            ))}
          </div>

          {/* INPUT FORM */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-white border-t border-slate-200 flex items-center gap-2 shrink-0"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask about costs, timings, doctor..."
              className="flex-1 text-xs border border-slate-200 rounded-xl px-3.5 py-2.5 focus:outline-hidden focus:border-[#E48AA0] focus:ring-1 focus:ring-[#E48AA0] bg-slate-50 focus:bg-white text-slate-800"
            />
            <button
              type="submit"
              disabled={!inputText.trim() || loading}
              className="p-2.5 bg-[#E48AA0] hover:bg-[#D4748B] text-white rounded-xl disabled:opacity-50 transition-colors shrink-0 shadow-2xs cursor-pointer"
              aria-label="Send Message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default LiveChatWidget;
