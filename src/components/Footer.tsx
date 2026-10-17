import React, { useState } from 'react';
import MamataLogo from './MamataLogo';
import { Phone, Mail, MapPin, CheckCircle2, ArrowRight, MessageSquare, ShieldCheck, Heart } from 'lucide-react';

interface FooterProps {
  onOpenBooking: () => void;
  onNavigate?: (page: string, param?: string) => void;
  language?: 'en' | 'ne';
}

export const Footer: React.FC<FooterProps> = ({ onOpenBooking, onNavigate, language = 'en' }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setNewsletterSubscribed(true);
    setNewsletterEmail('');
  };

  const handleLink = (page: string, param?: string) => {
    if (onNavigate) {
      onNavigate(page, param);
    } else {
      window.location.hash = param ? `#/${page}/${param}` : `#/${page}`;
    }
  };

  return (
    <footer className="bg-[#122538] text-white pt-16 pb-24 md:pb-12 border-t border-[#1D3B58]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* TOP ROW: BRAND & NEWSLETTER */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-12 border-b border-white/10 items-center">
          <div className="lg:col-span-6 space-y-3">
            <div className="cursor-pointer" onClick={() => handleLink('home')}>
              <MamataLogo variant="white" size="lg" />
            </div>
            <p className="text-slate-300 text-xs sm:text-sm max-w-md mt-2 leading-relaxed">
              Nepal’s benchmark centre for advanced assisted reproduction, robotic ICSI, and compassionate parenthood care at Maulakalika Hospital Pvt. Ltd., Chitwan.
            </p>
            <div className="flex flex-wrap items-center gap-3 text-xs text-[#E48AA0] font-semibold pt-1">
              <span>NMC Registered Specialists</span>
              <span>·</span>
              <span>Advanced Embryology Lab</span>
              <span>·</span>
              <span>130+ Successful Journeys</span>
            </div>
          </div>

          <div className="lg:col-span-6 bg-white/5 p-6 rounded-2xl border border-white/10 space-y-3">
            <h4 className="text-sm font-bold text-white">
              Stay Informed on Fertility Health & Updates
            </h4>
            <p className="text-xs text-slate-300">
              Receive monthly medical insights from Dr. Anusha Tiwari on ovarian reserve, diet, and fertility wellness.
            </p>

            {newsletterSubscribed ? (
              <div className="p-3 bg-emerald-900/40 border border-emerald-500/50 rounded-xl text-xs text-emerald-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Thank you for subscribing to our fertility health updates.</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="flex-1 bg-white/10 border border-white/20 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-hidden focus:border-[#E48AA0]"
                />
                <button
                  type="submit"
                  className="bg-[#E48AA0] hover:bg-[#D4748B] text-white px-4 py-2.5 rounded-xl text-xs font-bold transition-colors shrink-0 cursor-pointer"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>

        {/* MIDDLE ROW: 4 COLUMNS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-xs sm:text-sm text-slate-300">
          
          {/* Col 1: Chitwan Location */}
          <div className="space-y-3">
            <h5 className="font-bold text-white text-sm uppercase tracking-wider">
              Hospital Location
            </h5>
            <div className="space-y-3 text-xs">
              <div>
                <strong className="text-white block text-sm">Maulakalika Hospital Pvt. Ltd.</strong>
                <span className="block text-slate-300 mt-1">Bharatpur-11, Chitwan, Nepal</span>
                <div className="mt-2 space-y-1">
                  <a
                    href="tel:056493798"
                    className="block text-[#E48AA0] font-bold hover:underline"
                  >
                    Hotline: 056-493798
                  </a>
                  <a
                    href="tel:056493738"
                    className="block text-slate-300 hover:text-white"
                  >
                    Landline: 056-493738
                  </a>
                  <a
                    href="https://wa.me/9779855088798"
                    target="_blank"
                    rel="noreferrer"
                    className="block text-emerald-400 font-bold hover:underline flex items-center gap-1 mt-1"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>WhatsApp: 9855088798</span>
                  </a>
                </div>
              </div>
              <div className="pt-2 border-t border-white/10 text-[11px] text-slate-400">
                <span>OPD & Lab Hours:</span>
                <span className="block text-white font-medium">Sun–Fri: 7:30 AM – 7:30 PM</span>
                <span className="block text-white font-medium">Sat: 9:00 AM – 3:00 PM</span>
              </div>
            </div>
          </div>

          {/* Col 2: Treatments Single-Service Pages */}
          <div className="space-y-3">
            <h5 className="font-bold text-white text-sm uppercase tracking-wider">
              Dedicated Service Pages
            </h5>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => handleLink('service', 'ivf')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  In-Vitro Fertilization (IVF) Page
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink('service', 'icsi')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Intracytoplasmic Sperm Injection (ICSI)
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink('service', 'blastocyst')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Day 5 Blastocyst Culture & Transfer
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink('service', 'iui')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Intrauterine Insemination (IUI)
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink('service', 'cryopreservation')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Egg & Sperm Vitrification (Freezing)
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink('service', 'male-infertility')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Male Infertility & TESA / PESA
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink('service', 'laparoscopy')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Fertility Enhancing Laparoscopy
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Dedicated Website Pages */}
          <div className="space-y-3">
            <h5 className="font-bold text-white text-sm uppercase tracking-wider">
              Website Pages
            </h5>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => handleLink('home')} className="hover:text-white transition-colors cursor-pointer">
                  Home Overview
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('about')} className="hover:text-white transition-colors cursor-pointer">
                  About Us & Lab Technology
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('services')} className="hover:text-white transition-colors cursor-pointer">
                  All Treatments Directory
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('doctors')} className="hover:text-white transition-colors cursor-pointer">
                  Doctors & Specialists Profiles
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('pricing')} className="hover:text-white transition-colors cursor-pointer">
                  Treatment Packages & Clinical Plans
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('calculator')} className="hover:text-white transition-colors cursor-pointer">
                  Pregnancy Due Date Calculator
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('journey')} className="hover:text-white transition-colors cursor-pointer">
                  Step-by-Step Patient Journey
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('stories')} className="hover:text-white transition-colors cursor-pointer">
                  Patient Success Stories
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('faq')} className="hover:text-white transition-colors cursor-pointer">
                  Fertility FAQ Guide
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('contact')} className="hover:text-white transition-colors cursor-pointer">
                  Contact & Location (Chitwan)
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Quality & Quick Booking */}
          <div className="space-y-4">
            <h5 className="font-bold text-white text-sm uppercase tracking-wider">
              Direct Assistance
            </h5>
            <p className="text-xs text-slate-300 leading-relaxed">
              Have questions about your reports, doctor consultation, or IVF cycle timeline?
            </p>
            <div className="space-y-2">
              <button
                onClick={onOpenBooking}
                className="w-full bg-[#E48AA0] hover:bg-[#D4748B] text-white py-2.5 px-4 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer"
              >
                <span>Book Consultation</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <a
                href="https://wa.me/9779855088798"
                target="_blank"
                rel="noreferrer"
                className="w-full bg-[#25D366] hover:bg-[#1EBE5D] text-white py-2 px-4 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp 9855088798</span>
              </a>
            </div>
            <p className="text-[11px] text-slate-400">
              Email: care@mamatafertility.com
            </p>
          </div>
        </div>

        {/* BOTTOM LEGAL ROW */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            © {new Date().getFullYear()} Mamata International Fertility Centre. All Rights Reserved. Located at Maulakalika Hospital Pvt. Ltd., Bharatpur-11, Chitwan, Nepal.
          </p>
          <div className="flex items-center gap-6 text-[11px]">
            <span>Privacy Policy</span>
            <span>·</span>
            <span>Medical Ethics & Transparency</span>
            <span>·</span>
            <span>Ministry of Health Nepal Compliant</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
