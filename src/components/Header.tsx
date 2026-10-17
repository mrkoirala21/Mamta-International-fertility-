import React, { useState } from 'react';
import { Phone, Mail, MapPin, Calendar, Menu, X, Clock, ChevronDown, MessageSquare } from 'lucide-react';
import MamataLogo from './MamataLogo';
import { TREATMENTS } from '../data/fertilityData';

interface HeaderProps {
  onOpenBooking: (doctorName?: string, branchId?: string, treatmentName?: string) => void;
  currentPage: string;
  onNavigate: (page: string, param?: string) => void;
  language: 'en' | 'ne';
  onToggleLanguage: (lang: 'en' | 'ne') => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenBooking,
  currentPage,
  onNavigate,
  language,
  onToggleLanguage,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);

  const t = {
    en: {
      hotline: 'Hotline: 056-493798',
      telSecondary: '056-493738',
      whatsapp: 'WhatsApp: 9855088798',
      location: 'Maulakalika Hospital Pvt. Ltd., Bharatpur-11, Chitwan',
      hours: 'Sun–Fri: 7:30 AM – 7:30 PM',
      nav: {
        home: 'Home',
        about: 'About Us',
        treatments: 'Treatments & Services',
        allServices: 'All Treatments Overview',
        doctors: 'Doctors & Team',
        cost: 'Treatment Packages',
        calculator: 'Due Date Tool',
        journey: 'Patient Journey',
        stories: 'Success Stories',
        faq: 'FAQs',
        contact: 'Contact & Location',
      },
      cta: 'Book Free Consultation',
    },
    ne: {
      hotline: 'हटलाइन: ०५६-४९३७९८',
      telSecondary: '०५६-४९३७३८',
      whatsapp: 'ह्वाट्सएप: ९८५५०८८७९८',
      location: 'मौलकालिका अस्पताल, भरतपुर-११, चितवन',
      hours: 'आइत–शुक्र: ७:३० बिहान – ७:३० बेलुका',
      nav: {
        home: 'गृहपृष्ठ',
        about: 'हाम्रोबारे',
        treatments: 'सेवा तथा उपचारहरू',
        allServices: 'सबै सेवाहरूको सूची',
        doctors: 'विशेषज्ञ डाक्टरहरू',
        cost: 'उपचार प्याकेजहरू',
        calculator: 'डेलिभरी क्यालकुलेटर',
        journey: 'उपचार प्रक्रिया',
        stories: 'सफलताका कथाहरू',
        faq: 'जिज्ञासाहरू',
        contact: 'सम्पर्क तथा ठेगाना',
      },
      cta: 'निःशुल्क परामर्श बुक गर्नुहोस्',
    },
  }[language];

  const handleNavClick = (page: string, param?: string) => {
    onNavigate(page, param);
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white shadow-xs border-b border-slate-100 w-full">
      {/* TOP ANNOUNCEMENT & CONTACT BAR */}
      <div className="bg-[#1D3B58] text-white text-xs py-1.5 px-4 sm:px-6 lg:px-8 border-b border-[#2A4D70] w-full">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-1.5 md:gap-3">
          {/* Row 1: Hotlines & WhatsApp */}
          <div className="flex flex-wrap items-center gap-x-3 sm:gap-x-4 gap-y-1 text-slate-200">
            <a
              href="tel:056493798"
              className="flex items-center gap-1.5 hover:text-white transition-colors"
              title="Call 24/7 Hotline"
            >
              <Phone className="w-3.5 h-3.5 text-[#E48AA0] shrink-0" />
              <span className="font-semibold tracking-wide">{t.hotline}</span>
            </a>
            <span className="text-slate-500 hidden sm:inline">|</span>
            <a
              href="tel:056493738"
              className="hover:text-white transition-colors text-slate-300 hidden sm:inline"
            >
              {t.telSecondary}
            </a>
            <span className="text-slate-500">|</span>
            <a
              href="https://wa.me/9779855088798"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-semibold transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5 shrink-0" />
              <span>{t.whatsapp}</span>
            </a>
          </div>

          {/* Row 2: Location, Hours, & Language toggle */}
          <div className="flex flex-wrap items-center justify-between md:justify-end gap-x-3 gap-y-1 pt-1 md:pt-0 border-t md:border-t-0 border-[#2A4D70]/60">
            <button
              onClick={() => handleNavClick('contact')}
              className="flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors text-left text-[11px] sm:text-xs cursor-pointer"
            >
              <MapPin className="w-3 h-3 text-[#E48AA0] shrink-0" />
              <span className="truncate max-w-[240px] sm:max-w-none">{t.location}</span>
            </button>

            <div className="flex items-center gap-2 shrink-0">
              <span className="text-slate-500 hidden lg:inline">|</span>
              <div className="hidden lg:flex items-center gap-1 text-slate-300 text-[11px]">
                <Clock className="w-3 h-3 text-[#E48AA0] shrink-0" />
                <span>{t.hours}</span>
              </div>

              {/* Language toggle */}
              <div className="flex items-center bg-[#244566] border border-[#335B84] rounded-md overflow-hidden text-xs shrink-0">
                <button
                  onClick={() => onToggleLanguage('en')}
                  className={`px-2 py-0.5 transition-colors cursor-pointer ${
                    language === 'en'
                      ? 'bg-[#E48AA0] text-white font-semibold'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  EN
                </button>
                <button
                  onClick={() => onToggleLanguage('ne')}
                  className={`px-2 py-0.5 transition-colors cursor-pointer ${
                    language === 'ne'
                      ? 'bg-[#E48AA0] text-white font-semibold'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  नेपाली
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* LINE 1: BRAND LOGO & ACTION BAR */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center py-1 shrink-0 text-left cursor-pointer"
          >
            <MamataLogo size="md" />
          </button>

          {/* Quick Highlight Info Pill (Desktop Only) */}
          <div className="hidden xl:flex items-center gap-3 text-xs text-slate-600 bg-slate-50 px-3.5 py-1.5 rounded-full border border-slate-200/80">
            <span className="flex items-center gap-1.5 font-semibold text-[#1D3B58]">
              <MapPin className="w-3.5 h-3.5 text-[#E48AA0]" />
              Maulakalika Hospital, Bharatpur-11
            </span>
            <span className="text-slate-300">|</span>
            <a href="tel:056493798" className="hover:text-[#E48AA0] font-medium transition-colors">
              056-493798
            </a>
          </div>

          {/* Right Action: Booking Button & Mobile Toggle */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => onOpenBooking()}
              className="hidden sm:inline-flex items-center gap-2 bg-[#E48AA0] hover:bg-[#D4748B] text-white px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-sm transition-all duration-150 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>{t.cta}</span>
            </button>

            {/* Mobile menu button */}
            <div className="flex lg:hidden items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-slate-700 hover:text-slate-900 hover:bg-slate-100 cursor-pointer"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* LINE 2: DEDICATED FULL-WIDTH NAVIGATION ROW (DESKTOP) */}
      <div className="hidden lg:block border-t border-slate-100 bg-white/95 backdrop-blur-xs w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex flex-wrap items-center justify-between gap-x-3 xl:gap-x-6 gap-y-1.5 py-2 text-xs xl:text-sm font-semibold text-slate-700">
            <button
              onClick={() => handleNavClick('home')}
              className={`transition-colors py-1 cursor-pointer whitespace-nowrap ${
                currentPage === 'home'
                  ? 'text-[#1D3B58] font-bold border-b-2 border-[#E48AA0]'
                  : 'hover:text-[#1D3B58] hover:border-b-2 hover:border-[#E48AA0]'
              }`}
            >
              {t.nav.home}
            </button>

            <button
              onClick={() => handleNavClick('about')}
              className={`transition-colors py-1 cursor-pointer whitespace-nowrap ${
                currentPage === 'about'
                  ? 'text-[#1D3B58] font-bold border-b-2 border-[#E48AA0]'
                  : 'hover:text-[#1D3B58] hover:border-b-2 hover:border-[#E48AA0]'
              }`}
            >
              {t.nav.about}
            </button>

            {/* Treatments Dropdown Menu */}
            <div className="relative group">
              <button
                onClick={() => handleNavClick('services')}
                onMouseEnter={() => setServicesDropdownOpen(true)}
                className={`flex items-center gap-1 transition-colors py-1 cursor-pointer whitespace-nowrap ${
                  currentPage === 'services' || currentPage === 'service'
                    ? 'text-[#1D3B58] font-bold border-b-2 border-[#E48AA0]'
                    : 'hover:text-[#1D3B58] hover:border-b-2 hover:border-[#E48AA0]'
                }`}
              >
                <span>{t.nav.treatments}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-700 transition-transform group-hover:rotate-180" />
              </button>

              <div
                onMouseLeave={() => setServicesDropdownOpen(false)}
                className="absolute top-full left-0 w-80 bg-white rounded-2xl shadow-xl border border-slate-100 py-3 px-2 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-150 z-50 mt-1"
              >
                <button
                  onClick={() => handleNavClick('services')}
                  className="w-full text-left px-3 py-2 rounded-xl text-xs font-bold text-[#1D3B58] bg-slate-50 hover:bg-[#FCEEF1] hover:text-[#C96D83] transition-colors mb-1.5 flex items-center justify-between cursor-pointer"
                >
                  <span>{t.nav.allServices}</span>
                  <span className="text-[10px] bg-[#E48AA0] text-white px-1.5 py-0.5 rounded">All 7</span>
                </button>
                <div className="border-t border-slate-100 my-1" />
                <div className="space-y-0.5">
                  {TREATMENTS.map((tr) => (
                    <button
                      key={tr.id}
                      onClick={() => handleNavClick('service', tr.id)}
                      className="w-full text-left px-3 py-2 rounded-xl text-xs hover:bg-slate-50 text-slate-700 hover:text-[#1D3B58] transition-colors flex items-center justify-between cursor-pointer"
                    >
                      <span className="font-semibold">{tr.title}</span>
                      <span className="text-[10px] text-[#C96D83] font-medium bg-[#FCEEF1] px-2 py-0.5 rounded-full">
                        {tr.badge}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={() => handleNavClick('doctors')}
              className={`transition-colors py-1 cursor-pointer whitespace-nowrap ${
                currentPage === 'doctors'
                  ? 'text-[#1D3B58] font-bold border-b-2 border-[#E48AA0]'
                  : 'hover:text-[#1D3B58] hover:border-b-2 hover:border-[#E48AA0]'
              }`}
            >
              {t.nav.doctors}
            </button>

            <button
              onClick={() => handleNavClick('pricing')}
              className={`transition-colors py-1 cursor-pointer whitespace-nowrap ${
                currentPage === 'pricing'
                  ? 'text-[#1D3B58] font-bold border-b-2 border-[#E48AA0]'
                  : 'hover:text-[#1D3B58] hover:border-b-2 hover:border-[#E48AA0]'
              }`}
            >
              {t.nav.cost}
            </button>

            <button
              onClick={() => handleNavClick('calculator')}
              className={`transition-colors py-1 cursor-pointer whitespace-nowrap ${
                currentPage === 'calculator'
                  ? 'text-[#1D3B58] font-bold border-b-2 border-[#E48AA0]'
                  : 'hover:text-[#1D3B58] hover:border-b-2 hover:border-[#E48AA0]'
              }`}
            >
              {t.nav.calculator}
            </button>

            <button
              onClick={() => handleNavClick('journey')}
              className={`transition-colors py-1 cursor-pointer whitespace-nowrap ${
                currentPage === 'journey'
                  ? 'text-[#1D3B58] font-bold border-b-2 border-[#E48AA0]'
                  : 'hover:text-[#1D3B58] hover:border-b-2 hover:border-[#E48AA0]'
              }`}
            >
              {t.nav.journey}
            </button>

            <button
              onClick={() => handleNavClick('stories')}
              className={`transition-colors py-1 cursor-pointer whitespace-nowrap ${
                currentPage === 'stories'
                  ? 'text-[#1D3B58] font-bold border-b-2 border-[#E48AA0]'
                  : 'hover:text-[#1D3B58] hover:border-b-2 hover:border-[#E48AA0]'
              }`}
            >
              {t.nav.stories}
            </button>

            <button
              onClick={() => handleNavClick('faq')}
              className={`transition-colors py-1 cursor-pointer whitespace-nowrap ${
                currentPage === 'faq'
                  ? 'text-[#1D3B58] font-bold border-b-2 border-[#E48AA0]'
                  : 'hover:text-[#1D3B58] hover:border-b-2 hover:border-[#E48AA0]'
              }`}
            >
              {t.nav.faq}
            </button>

            <button
              onClick={() => handleNavClick('contact')}
              className={`transition-colors py-1 cursor-pointer whitespace-nowrap ${
                currentPage === 'contact'
                  ? 'text-[#1D3B58] font-bold border-b-2 border-[#E48AA0]'
                  : 'hover:text-[#1D3B58] hover:border-b-2 hover:border-[#E48AA0]'
              }`}
            >
              {t.nav.contact}
            </button>
          </nav>
        </div>
      </div>

      {/* MOBILE DRAWER */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 shadow-lg animate-in fade-in slide-in-from-top-2 max-h-[85vh] overflow-y-auto">
          <div className="flex flex-col space-y-1.5 py-2 text-sm font-medium text-slate-800">
            <button
              onClick={() => handleNavClick('home')}
              className={`w-full text-left px-3 py-2 rounded-lg ${
                currentPage === 'home' ? 'bg-[#FCEEF1] text-[#C96D83] font-bold' : 'hover:bg-slate-50'
              }`}
            >
              {t.nav.home}
            </button>

            <button
              onClick={() => handleNavClick('about')}
              className={`w-full text-left px-3 py-2 rounded-lg ${
                currentPage === 'about' ? 'bg-[#FCEEF1] text-[#C96D83] font-bold' : 'hover:bg-slate-50'
              }`}
            >
              {t.nav.about}
            </button>

            {/* Mobile Treatments Sub-group */}
            <div className="border-y border-slate-100 py-1.5">
              <button
                onClick={() => handleNavClick('services')}
                className={`w-full text-left px-3 py-2 rounded-lg font-bold ${
                  currentPage === 'services' ? 'bg-[#FCEEF1] text-[#C96D83]' : 'text-[#1D3B58]'
                }`}
              >
                {t.nav.treatments}
              </button>
              <div className="pl-4 space-y-1 mt-1">
                {TREATMENTS.map((tr) => (
                  <button
                    key={tr.id}
                    onClick={() => handleNavClick('service', tr.id)}
                    className="w-full text-left px-3 py-1.5 text-xs text-slate-600 hover:text-[#1D3B58] rounded-md hover:bg-slate-50 flex items-center justify-between"
                  >
                    <span>{tr.title}</span>
                    <span className="text-[10px] text-[#C96D83] bg-[#FCEEF1] px-2 py-0.5 rounded-full">
                      Page
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => handleNavClick('doctors')}
              className={`w-full text-left px-3 py-2 rounded-lg ${
                currentPage === 'doctors' ? 'bg-[#FCEEF1] text-[#C96D83] font-bold' : 'hover:bg-slate-50'
              }`}
            >
              {t.nav.doctors}
            </button>

            <button
              onClick={() => handleNavClick('pricing')}
              className={`w-full text-left px-3 py-2 rounded-lg ${
                currentPage === 'pricing' ? 'bg-[#FCEEF1] text-[#C96D83] font-bold' : 'hover:bg-slate-50'
              }`}
            >
              {t.nav.cost}
            </button>

            <button
              onClick={() => handleNavClick('calculator')}
              className={`w-full text-left px-3 py-2 rounded-lg ${
                currentPage === 'calculator' ? 'bg-[#FCEEF1] text-[#C96D83] font-bold' : 'hover:bg-slate-50'
              }`}
            >
              {t.nav.calculator}
            </button>

            <button
              onClick={() => handleNavClick('journey')}
              className={`w-full text-left px-3 py-2 rounded-lg ${
                currentPage === 'journey' ? 'bg-[#FCEEF1] text-[#C96D83] font-bold' : 'hover:bg-slate-50'
              }`}
            >
              {t.nav.journey}
            </button>

            <button
              onClick={() => handleNavClick('stories')}
              className={`w-full text-left px-3 py-2 rounded-lg ${
                currentPage === 'stories' ? 'bg-[#FCEEF1] text-[#C96D83] font-bold' : 'hover:bg-slate-50'
              }`}
            >
              {t.nav.stories}
            </button>

            <button
              onClick={() => handleNavClick('faq')}
              className={`w-full text-left px-3 py-2 rounded-lg ${
                currentPage === 'faq' ? 'bg-[#FCEEF1] text-[#C96D83] font-bold' : 'hover:bg-slate-50'
              }`}
            >
              {t.nav.faq}
            </button>

            <button
              onClick={() => handleNavClick('contact')}
              className={`w-full text-left px-3 py-2 rounded-lg ${
                currentPage === 'contact' ? 'bg-[#FCEEF1] text-[#C96D83] font-bold' : 'hover:bg-slate-50'
              }`}
            >
              {t.nav.contact}
            </button>

            <div className="pt-3 border-t border-slate-200 space-y-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full bg-[#E48AA0] hover:bg-[#D4748B] text-white py-3 rounded-xl font-bold text-center text-sm shadow-xs flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>{t.cta}</span>
              </button>

              <div className="flex gap-2">
                <a
                  href="tel:056493798"
                  className="flex-1 bg-[#1D3B58] text-white py-2.5 rounded-xl font-semibold text-xs flex items-center justify-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5 text-[#E48AA0]" />
                  <span>Call 056-493798</span>
                </a>
                <a
                  href="https://wa.me/9779855088798"
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 bg-[#25D366] text-white py-2.5 rounded-xl font-semibold text-xs flex items-center justify-center gap-1.5"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
