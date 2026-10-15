import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Bot, User, Sparkles, Phone, ExternalLink, RefreshCw } from 'lucide-react';
import MamataLogo from './MamataLogo';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

export const LiveChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-init',
      sender: 'assistant',
      text: "Namaste! I'm Aarati, Senior Fertility Care Counselor at Mamata International Fertility Centre. Whether you have questions regarding IVF costs in Nepal, treatment procedures, or doctor availability, I am here to help you with warmth and clarity.",
      timestamp: 'Just now',
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [unreadCount, setUnreadCount] = useState(1);
  const messagesEndRef = useRef<HTMLDivElement>(null);

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
        text: data.reply || "Thank you. Our care coordinators are always here to assist. Please call our direct hospital hotline at 056-493798 or WhatsApp 9855088798.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, replyMsg]);
    } catch (err) {
      const fallbackMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        sender: 'assistant',
        text: "We received your message! For immediate confidential support, feel free to call our direct hospital hotline at 056-493798 or WhatsApp our care desk at 9855088798.",
        timestamp: 'Now',
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setLoading(false);
    }
  };

  const quickPrompts = [
    'What is the total cost of an IVF cycle?',
    'How do I book at Maulakalika Hospital Chitwan?',
    'What is your WhatsApp and hotline number?',
    'Can severe male infertility be treated?',
  ];

  return (
    <>
      {/* FLOATING ACTION TRIGGER */}
      {!isOpen && (
        <div className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-40 animate-bounce-subtle">
          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-2.5 bg-gradient-to-r from-[#1D3B58] to-[#2B5A88] text-white px-4 py-3 rounded-full shadow-xl hover:shadow-2xl transition-all duration-200 transform hover:scale-105 active:scale-95 border-2 border-white/80 group"
            aria-label="Open Live Fertility Chat"
          >
            <div className="relative">
              <div className="w-8 h-8 rounded-full bg-[#E48AA0] flex items-center justify-center text-white font-bold text-xs">
                M
              </div>
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full"></span>
            </div>
            <div className="text-left hidden sm:block">
              <div className="text-xs font-bold leading-tight">Live Fertility Chat</div>
              <div className="text-[10px] text-slate-200 font-normal">Ask Sister Aarati</div>
            </div>
            {unreadCount > 0 && (
              <span className="bg-[#E48AA0] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                {unreadCount}
              </span>
            )}
          </button>
        </div>
      )}

      {/* CHAT WINDOW MODAL */}
      {isOpen && (
        <div className="fixed inset-x-2 bottom-2 sm:inset-auto sm:bottom-6 sm:right-6 z-50 w-auto sm:w-96 max-w-[calc(100vw-1rem)] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden max-h-[85vh] h-[560px] animate-in fade-in slide-in-from-bottom-5">
          {/* HEADER */}
          <div className="bg-gradient-to-r from-[#1D3B58] to-[#2B5A88] text-white p-4 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-9 h-9 rounded-full bg-[#E48AA0] flex items-center justify-center text-white font-bold text-sm shadow-xs">
                  M
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 border border-[#1D3B58] rounded-full"></span>
              </div>
              <div>
                <h4 className="text-sm font-bold flex items-center gap-1.5">
                  <span>Sister Aarati</span>
                  <span className="text-[10px] bg-white/20 px-1.5 py-0.2 rounded-sm font-normal">
                    AI Care Guide
                  </span>
                </h4>
                <p className="text-[11px] text-slate-200">
                  Maulakalika Hospital, Bharatpur-11, Chitwan
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() =>
                  setMessages([
                    {
                      id: 'reset',
                      sender: 'assistant',
                      text: 'Chat history cleared. How can I assist you with your fertility questions today?',
                      timestamp: 'Just now',
                    },
                  ])
                }
                title="Restart chat"
                className="p-1.5 text-slate-300 hover:text-white rounded-lg hover:bg-white/10"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-slate-300 hover:text-white rounded-lg hover:bg-white/10"
                aria-label="Close Chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* QUICK DIRECT CONTACT CALLOUT */}
          <div className="bg-[#FCEEF1] text-[#C96D83] px-3.5 py-2 text-[11px] flex items-center justify-between border-b border-[#F5D8E0] shrink-0">
            <span className="flex items-center gap-1.5 font-medium">
              <Phone className="w-3.5 h-3.5" />
              <span>Need human counselor?</span>
            </span>
            <a
              href="https://wa.me/9779855088798"
              target="_blank"
              rel="noreferrer"
              className="font-bold underline flex items-center gap-1 hover:text-[#B0556C]"
            >
              <span>WhatsApp: 9855088798</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* MESSAGES SCROLL CONTAINER */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#F9FAFC] text-xs">
            {messages.map((msg) => {
              const isUser = msg.sender === 'user';
              return (
                <div
                  key={msg.id}
                  className={`flex items-start gap-2 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
                >
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-[10px] font-bold ${
                      isUser ? 'bg-[#2B5A88] text-white' : 'bg-[#E48AA0] text-white'
                    }`}
                  >
                    {isUser ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
                  </div>
                  <div
                    className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 shadow-2xs whitespace-pre-line leading-relaxed ${
                      isUser
                        ? 'bg-[#1D3B58] text-white rounded-tr-xs'
                        : 'bg-white text-slate-800 border border-slate-200 rounded-tl-xs'
                    }`}
                  >
                    {msg.text}
                    <div
                      className={`text-[9px] mt-1 text-right ${
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
              <div className="flex items-center gap-2 text-slate-500 text-xs pl-8">
                <div className="w-2 h-2 rounded-full bg-[#E48AA0] animate-bounce" />
                <div className="w-2 h-2 rounded-full bg-[#E48AA0] animate-bounce [animation-delay:0.2s]" />
                <div className="w-2 h-2 rounded-full bg-[#E48AA0] animate-bounce [animation-delay:0.4s]" />
                <span className="text-[11px] text-slate-400">Aarati is typing...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* QUICK PROMPT SUGGESTIONS */}
          {messages.length <= 3 && (
            <div className="p-2.5 bg-white border-t border-slate-100 flex flex-wrap gap-1.5 shrink-0">
              {quickPrompts.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => handleSendMessage(prompt)}
                  className="text-[11px] bg-slate-50 hover:bg-[#FCEEF1] text-slate-700 hover:text-[#C96D83] border border-slate-200 rounded-lg px-2.5 py-1 text-left transition-colors"
                >
                  {prompt}
                </button>
              ))}
            </div>
          )}

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
              placeholder="Ask about IVF cost, timings, doctor..."
              className="flex-1 text-xs border border-slate-200 rounded-xl px-3.5 py-2.5 focus:outline-hidden focus:border-[#E48AA0] focus:ring-1 focus:ring-[#E48AA0] bg-slate-50 focus:bg-white"
            />
            <button
              type="submit"
              disabled={!inputText.trim() || loading}
              className="p-2.5 bg-[#E48AA0] hover:bg-[#D4748B] text-white rounded-xl disabled:opacity-50 transition-colors shrink-0 shadow-2xs"
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
