import React, { useState } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Calendar,
  Menu,
  X,
  Clock,
  ChevronDown,
  MessageSquare,
  Microscope,
  Activity,
  Heart,
  Baby,
  Stethoscope,
  BookOpen,
  Eye,
  Building2,
  Banknote,
  HelpCircle,
  Calculator,
} from 'lucide-react';
import MamataLogo from './MamataLogo';
import { TREATMENTS, CONDITIONS, DOCTORS } from '../data/fertilityData';

interface HeaderProps {
  onOpenBooking: (doctorName?: string, branchId?: string, treatmentName?: string) => void;
  currentPage: string;
  onNavigate: (path: string) => void;
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
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  // Mobile accordion state
  const [mobileTreatmentsOpen, setMobileTreatmentsOpen] = useState(false);
  const [mobileConditionsOpen, setMobileConditionsOpen] = useState(false);
  const [mobileDoctorsOpen, setMobileDoctorsOpen] = useState(false);
  const [mobileResourcesOpen, setMobileResourcesOpen] = useState(false);

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
        treatments: 'Treatments',
        conditions: 'Conditions',
        pregnancyCare: 'Pregnancy Care',
        diagnostics: 'Diagnostics',
        doctors: 'Doctors',
        resources: 'Resources',
        contact: 'Contact Us',
      },
      cta: 'Book Consultation',
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
        treatments: 'उपचार सेवा',
        conditions: 'रोग तथा अवस्था',
        pregnancyCare: 'प्रसूति हेरचाह',
        diagnostics: 'परीक्षण तथा ल्याब',
        doctors: 'डाक्टरहरू',
        resources: 'जानकारी स्रोत',
        contact: 'सम्पर्क',
      },
      cta: 'परामर्श बुक गर्नुहोस्',
    },
  }[language];

  const handleNavClick = (path: string) => {
    onNavigate(path);
    setMobileMenuOpen(false);
    setOpenDropdown(null);
  };

  const isCurrent = (pathPrefix: string) => {
    if (pathPrefix === '/' && (currentPage === '/' || currentPage === 'home')) return true;
    if (pathPrefix !== '/' && (currentPage === pathPrefix || currentPage.startsWith(pathPrefix))) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-40 bg-white shadow-xs border-b border-slate-100 w-full">
      {/* 1. TOP ANNOUNCEMENT & CONTACT BAR */}
      <div className="bg-[#1D3B58] text-white text-xs py-1.5 px-4 sm:px-6 lg:px-8 border-b border-[#2A4D70] w-full overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col xl:flex-row xl:items-center justify-between gap-1.5 xl:gap-4">
          {/* Row 1: Hotlines & WhatsApp */}
          <div className="flex flex-wrap items-center gap-x-2.5 sm:gap-x-4 gap-y-1 text-slate-200">
            <a
              href="tel:056493798"
              className="flex items-center gap-1.5 hover:text-white transition-colors"
              title="Call 24/7 Hotline"
            >
              <Phone className="w-3.5 h-3.5 text-[#E48AA0] shrink-0" />
              <span className="font-semibold tracking-wide whitespace-nowrap">{t.hotline}</span>
            </a>
            <span className="text-slate-500 hidden sm:inline">|</span>
            <a
              href="tel:056493738"
              className="hover:text-white transition-colors text-slate-300 hidden sm:inline whitespace-nowrap"
            >
              {t.telSecondary}
            </a>
            <span className="text-slate-500">|</span>
            <a
              href="https://wa.me/9779855088798"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-semibold transition-colors whitespace-nowrap"
            >
              <MessageSquare className="w-3.5 h-3.5 shrink-0" />
              <span>{t.whatsapp}</span>
            </a>
          </div>

          {/* Row 2: Location, Hours, & Language toggle */}
          <div className="flex flex-wrap items-center justify-between xl:justify-end gap-x-3 gap-y-1.5 pt-1 xl:pt-0 border-t xl:border-t-0 border-[#2A4D70]/60">
            <button
              onClick={() => handleNavClick('/contact')}
              className="flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors text-left text-[11px] sm:text-xs cursor-pointer max-w-full"
            >
              <MapPin className="w-3 h-3 text-[#E48AA0] shrink-0" />
              <span className="truncate max-w-[210px] sm:max-w-xs md:max-w-md xl:max-w-none">{t.location}</span>
            </button>

            <div className="flex items-center gap-2 shrink-0">
              <span className="text-slate-500 hidden lg:inline">|</span>
              <div className="hidden lg:flex items-center gap-1 text-slate-300 text-[11px] whitespace-nowrap">
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

      {/* 2. BRAND LOGO & DIRECT CONSULTATION BAR */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Brand Logo - Returns visitors to Homepage */}
          <button
            onClick={() => handleNavClick('/')}
            className="flex items-center py-1 shrink-0 text-left cursor-pointer"
            aria-label="Mamta International Fertility Center - Home"
          >
            <MamataLogo size="md" />
          </button>

          {/* Quick Highlight Info (Desktop Only) */}
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

            {/* Mobile menu toggle */}
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

      {/* 3. DEDICATED FULL-WIDTH MULTI-PAGE NAVIGATION (DESKTOP) */}
      <div className="hidden lg:block border-t border-slate-100 bg-white/95 backdrop-blur-xs w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center justify-between gap-x-2 xl:gap-x-4 py-2 text-xs xl:text-sm font-semibold text-slate-700">
            {/* 1. Home */}
            <button
              onClick={() => handleNavClick('/')}
              className={`transition-colors py-1 cursor-pointer whitespace-nowrap ${
                isCurrent('/')
                  ? 'text-[#1D3B58] font-bold border-b-2 border-[#E48AA0]'
                  : 'hover:text-[#1D3B58] hover:border-b-2 hover:border-[#E48AA0]'
              }`}
            >
              {t.nav.home}
            </button>

            {/* 2. About Us */}
            <button
              onClick={() => handleNavClick('/about')}
              className={`transition-colors py-1 cursor-pointer whitespace-nowrap ${
                isCurrent('/about')
                  ? 'text-[#1D3B58] font-bold border-b-2 border-[#E48AA0]'
                  : 'hover:text-[#1D3B58] hover:border-b-2 hover:border-[#E48AA0]'
              }`}
            >
              {t.nav.about}
            </button>

            {/* 3. Treatments (Dropdown) */}
            <div
              className="relative"
              onMouseEnter={() => setOpenDropdown('treatments')}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <button
                onClick={() => handleNavClick('/fertility-treatments')}
                className={`flex items-center gap-1 transition-colors py-1 cursor-pointer whitespace-nowrap ${
                  isCurrent('/treatments') || isCurrent('/fertility-treatments')
                    ? 'text-[#1D3B58] font-bold border-b-2 border-[#E48AA0]'
                    : 'hover:text-[#1D3B58] hover:border-b-2 hover:border-[#E48AA0]'
                }`}
              >
                <span>{t.nav.treatments}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-700 transition-transform" />
              </button>

              {openDropdown === 'treatments' && (
                <div className="absolute top-full left-0 w-84 bg-white rounded-2xl shadow-xl border border-slate-100 py-3 px-2 z-50 mt-1">
                  <button
                    onClick={() => handleNavClick('/fertility-treatments')}
                    className="w-full text-left px-3 py-2 rounded-xl text-xs font-bold text-[#1D3B58] bg-slate-50 hover:bg-[#FCEEF1] hover:text-[#C96D83] transition-colors mb-1.5 flex items-center justify-between cursor-pointer"
                  >
                    <span>All Treatments Overview</span>
                    <span className="text-[10px] bg-[#E48AA0] text-white px-1.5 py-0.5 rounded">Hub</span>
                  </button>
                  <div className="border-t border-slate-100 my-1" />
                  <div className="space-y-0.5">
                    {TREATMENTS.map((tr) => (
                      <button
                        key={tr.id}
                        onClick={() => handleNavClick(`/treatments/${tr.id}`)}
                        className="w-full text-left px-3 py-1.5 rounded-xl text-xs hover:bg-slate-50 text-slate-700 hover:text-[#1D3B58] transition-colors flex items-center justify-between cursor-pointer"
                      >
                        <span className="font-semibold">{tr.title}</span>
                        <span className="text-[10px] text-[#C96D83] font-medium bg-[#FCEEF1] px-2 py-0.5 rounded-full">
                          {tr.badge}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* 4. Conditions (Dropdown) */}
            <div
              className="relative"
              onMouseEnter={() => setOpenDropdown('conditions')}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <button
                onClick={() => handleNavClick('/conditions')}
                className={`flex items-center gap-1 transition-colors py-1 cursor-pointer whitespace-nowrap ${
                  isCurrent('/conditions')
                    ? 'text-[#1D3B58] font-bold border-b-2 border-[#E48AA0]'
                    : 'hover:text-[#1D3B58] hover:border-b-2 hover:border-[#E48AA0]'
                }`}
              >
                <span>{t.nav.conditions}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {openDropdown === 'conditions' && (
                <div className="absolute top-full left-0 w-80 bg-white rounded-2xl shadow-xl border border-slate-100 py-3 px-2 z-50 mt-1">
                  <button
                    onClick={() => handleNavClick('/conditions')}
                    className="w-full text-left px-3 py-2 rounded-xl text-xs font-bold text-[#1D3B58] bg-slate-50 hover:bg-[#FCEEF1] hover:text-[#C96D83] transition-colors mb-1.5 flex items-center justify-between cursor-pointer"
                  >
                    <span>All Infertility Conditions</span>
                    <span className="text-[10px] bg-[#E48AA0] text-white px-1.5 py-0.5 rounded">Guide</span>
                  </button>
                  <div className="border-t border-slate-100 my-1" />
                  <div className="space-y-0.5">
                    {CONDITIONS.map((cond) => (
                      <button
                        key={cond.id}
                        onClick={() => handleNavClick(`/conditions/${cond.id}`)}
                        className="w-full text-left px-3 py-1.5 rounded-xl text-xs hover:bg-slate-50 text-slate-700 hover:text-[#1D3B58] transition-colors flex items-center justify-between cursor-pointer"
                      >
                        <span className="font-semibold">{cond.title}</span>
                        <span className="text-[10px] text-slate-400 capitalize">{cond.category}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* 5. Pregnancy Care */}
            <button
              onClick={() => handleNavClick('/pregnancy-care')}
              className={`transition-colors py-1 cursor-pointer whitespace-nowrap ${
                isCurrent('/pregnancy-care')
                  ? 'text-[#1D3B58] font-bold border-b-2 border-[#E48AA0]'
                  : 'hover:text-[#1D3B58] hover:border-b-2 hover:border-[#E48AA0]'
              }`}
            >
              {t.nav.pregnancyCare}
            </button>

            {/* 6. Diagnostics */}
            <button
              onClick={() => handleNavClick('/diagnostics')}
              className={`transition-colors py-1 cursor-pointer whitespace-nowrap ${
                isCurrent('/diagnostics')
                  ? 'text-[#1D3B58] font-bold border-b-2 border-[#E48AA0]'
                  : 'hover:text-[#1D3B58] hover:border-b-2 hover:border-[#E48AA0]'
              }`}
            >
              {t.nav.diagnostics}
            </button>

            {/* 7. Doctors & Specialists (Dropdown) */}
            <div
              className="relative"
              onMouseEnter={() => setOpenDropdown('doctors')}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <button
                onClick={() => handleNavClick('/doctors')}
                className={`flex items-center gap-1 transition-colors py-1 cursor-pointer whitespace-nowrap ${
                  isCurrent('/doctors')
                    ? 'text-[#1D3B58] font-bold border-b-2 border-[#E48AA0]'
                    : 'hover:text-[#1D3B58] hover:border-b-2 hover:border-[#E48AA0]'
                }`}
              >
                <span>{t.nav.doctors}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {openDropdown === 'doctors' && (
                <div className="absolute top-full left-0 w-84 bg-white rounded-2xl shadow-xl border border-slate-100 py-3 px-2 z-50 mt-1">
                  <button
                    onClick={() => handleNavClick('/doctors')}
                    className="w-full text-left px-3 py-2 rounded-xl text-xs font-bold text-[#1D3B58] bg-slate-50 hover:bg-[#FCEEF1] hover:text-[#C96D83] transition-colors mb-1.5 flex items-center justify-between cursor-pointer"
                  >
                    <span>All Specialists Directory</span>
                    <span className="text-[10px] bg-[#E48AA0] text-white px-1.5 py-0.5 rounded">All 8</span>
                  </button>
                  <div className="border-t border-slate-100 my-1" />
                  <div className="space-y-0.5">
                    {DOCTORS.slice(0, 5).map((doc) => (
                      <button
                        key={doc.id}
                        onClick={() => handleNavClick(`/doctors/${doc.id}`)}
                        className="w-full text-left px-3 py-1.5 rounded-xl text-xs hover:bg-slate-50 text-slate-700 hover:text-[#1D3B58] transition-colors flex items-center justify-between cursor-pointer"
                      >
                        <span className="font-semibold">{doc.name}</span>
                        <span className="text-[10px] text-slate-400 line-clamp-1 max-w-[100px] text-right">
                          {doc.role.split('&')[0]}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* 8. Patient Resources (Dropdown) */}
            <div
              className="relative"
              onMouseEnter={() => setOpenDropdown('resources')}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <button
                onClick={() => handleNavClick('/patient-resources')}
                className={`flex items-center gap-1 transition-colors py-1 cursor-pointer whitespace-nowrap ${
                  isCurrent('/patient-resources') ||
                  isCurrent('/facilities') ||
                  isCurrent('/pricing') ||
                  isCurrent('/faq') ||
                  isCurrent('/calculator') ||
                  isCurrent('/journey') ||
                  isCurrent('/stories')
                    ? 'text-[#1D3B58] font-bold border-b-2 border-[#E48AA0]'
                    : 'hover:text-[#1D3B58] hover:border-b-2 hover:border-[#E48AA0]'
                }`}
              >
                <span>{t.nav.resources}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {openDropdown === 'resources' && (
                <div className="absolute top-full right-0 w-72 bg-white rounded-2xl shadow-xl border border-slate-100 py-3 px-2 z-50 mt-1">
                  <button
                    onClick={() => handleNavClick('/patient-resources')}
                    className="w-full text-left px-3 py-2 rounded-xl text-xs font-bold text-[#1D3B58] bg-slate-50 hover:bg-[#FCEEF1] hover:text-[#C96D83] transition-colors mb-1.5 flex items-center justify-between cursor-pointer"
                  >
                    <span>Patient Resources Hub</span>
                    <span className="text-[10px] bg-[#E48AA0] text-white px-1.5 py-0.5 rounded">All Guides</span>
                  </button>
                  <div className="border-t border-slate-100 my-1" />
                  <div className="space-y-0.5">
                    <button
                      onClick={() => handleNavClick('/facilities')}
                      className="w-full text-left px-3 py-1.5 rounded-xl text-xs hover:bg-slate-50 text-slate-700 hover:text-[#1D3B58] transition-colors flex items-center justify-between cursor-pointer"
                    >
                      <span>Facilities & Cleanroom Tech</span>
                      <Building2 className="w-3.5 h-3.5 text-slate-400" />
                    </button>
                    <button
                      onClick={() => handleNavClick('/pricing')}
                      className="w-full text-left px-3 py-1.5 rounded-xl text-xs hover:bg-slate-50 text-slate-700 hover:text-[#1D3B58] transition-colors flex items-center justify-between cursor-pointer"
                    >
                      <span>Treatment Costs & Packages</span>
                      <Banknote className="w-3.5 h-3.5 text-slate-400" />
                    </button>
                    <button
                      onClick={() => handleNavClick('/calculator')}
                      className="w-full text-left px-3 py-1.5 rounded-xl text-xs hover:bg-slate-50 text-slate-700 hover:text-[#1D3B58] transition-colors flex items-center justify-between cursor-pointer"
                    >
                      <span>Pregnancy Due Date Calculator</span>
                      <Calculator className="w-3.5 h-3.5 text-slate-400" />
                    </button>
                    <button
                      onClick={() => handleNavClick('/journey')}
                      className="w-full text-left px-3 py-1.5 rounded-xl text-xs hover:bg-slate-50 text-slate-700 hover:text-[#1D3B58] transition-colors flex items-center justify-between cursor-pointer"
                    >
                      <span>Step-by-Step IVF Journey</span>
                      <Heart className="w-3.5 h-3.5 text-slate-400" />
                    </button>
                    <button
                      onClick={() => handleNavClick('/stories')}
                      className="w-full text-left px-3 py-1.5 rounded-xl text-xs hover:bg-slate-50 text-slate-700 hover:text-[#1D3B58] transition-colors flex items-center justify-between cursor-pointer"
                    >
                      <span>Patient Success Stories</span>
                      <BookOpen className="w-3.5 h-3.5 text-slate-400" />
                    </button>
                    <button
                      onClick={() => handleNavClick('/faq')}
                      className="w-full text-left px-3 py-1.5 rounded-xl text-xs hover:bg-slate-50 text-slate-700 hover:text-[#1D3B58] transition-colors flex items-center justify-between cursor-pointer"
                    >
                      <span>Frequently Asked Questions</span>
                      <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* 9. Contact Us */}
            <button
              onClick={() => handleNavClick('/contact')}
              className={`transition-colors py-1 cursor-pointer whitespace-nowrap ${
                isCurrent('/contact')
                  ? 'text-[#1D3B58] font-bold border-b-2 border-[#E48AA0]'
                  : 'hover:text-[#1D3B58] hover:border-b-2 hover:border-[#E48AA0]'
              }`}
            >
              {t.nav.contact}
            </button>
          </nav>
        </div>
      </div>

      {/* 4. MOBILE DRAWER WITH EXPANDABLE SUBMENUS */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 shadow-lg animate-in fade-in slide-in-from-top-2 max-h-[85vh] overflow-y-auto">
          <div className="flex flex-col space-y-1.5 py-2 text-sm font-medium text-slate-800">
            {/* 1. Home */}
            <button
              onClick={() => handleNavClick('/')}
              className={`w-full text-left px-3 py-2 rounded-lg ${
                isCurrent('/') ? 'bg-[#FCEEF1] text-[#C96D83] font-bold' : 'hover:bg-slate-50'
              }`}
            >
              {t.nav.home}
            </button>

            {/* 2. About Us */}
            <button
              onClick={() => handleNavClick('/about')}
              className={`w-full text-left px-3 py-2 rounded-lg ${
                isCurrent('/about') ? 'bg-[#FCEEF1] text-[#C96D83] font-bold' : 'hover:bg-slate-50'
              }`}
            >
              {t.nav.about}
            </button>

            {/* 3. Treatments (Accordion) */}
            <div className="border-y border-slate-100 py-1.5">
              <button
                onClick={() => setMobileTreatmentsOpen(!mobileTreatmentsOpen)}
                className="w-full flex items-center justify-between px-3 py-2 rounded-lg font-bold text-[#1D3B58] hover:bg-slate-50"
              >
                <span>{t.nav.treatments}</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileTreatmentsOpen ? 'rotate-180' : ''}`} />
              </button>
              {mobileTreatmentsOpen && (
                <div className="pl-4 space-y-1 mt-1">
                  <button
                    onClick={() => handleNavClick('/fertility-treatments')}
                    className="w-full text-left px-3 py-1.5 text-xs text-[#C96D83] font-bold rounded-md hover:bg-slate-50"
                  >
                    All Treatments Overview
                  </button>
                  {TREATMENTS.map((tr) => (
                    <button
                      key={tr.id}
                      onClick={() => handleNavClick(`/treatments/${tr.id}`)}
                      className="w-full text-left px-3 py-1.5 text-xs text-slate-600 hover:text-[#1D3B58] rounded-md hover:bg-slate-50 flex items-center justify-between"
                    >
                      <span>{tr.title}</span>
                      <span className="text-[10px] text-[#C96D83] bg-[#FCEEF1] px-2 py-0.5 rounded-full">
                        {tr.badge}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* 4. Conditions (Accordion) */}
            <div className="border-b border-slate-100 py-1.5">
              <button
                onClick={() => setMobileConditionsOpen(!mobileConditionsOpen)}
                className="w-full flex items-center justify-between px-3 py-2 rounded-lg font-bold text-[#1D3B58] hover:bg-slate-50"
              >
                <span>{t.nav.conditions}</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileConditionsOpen ? 'rotate-180' : ''}`} />
              </button>
              {mobileConditionsOpen && (
                <div className="pl-4 space-y-1 mt-1">
                  <button
                    onClick={() => handleNavClick('/conditions')}
                    className="w-full text-left px-3 py-1.5 text-xs text-[#C96D83] font-bold rounded-md hover:bg-slate-50"
                  >
                    All Infertility Conditions
                  </button>
                  {CONDITIONS.map((cond) => (
                    <button
                      key={cond.id}
                      onClick={() => handleNavClick(`/conditions/${cond.id}`)}
                      className="w-full text-left px-3 py-1.5 text-xs text-slate-600 hover:text-[#1D3B58] rounded-md hover:bg-slate-50 flex items-center justify-between"
                    >
                      <span>{cond.title}</span>
                      <span className="text-[10px] text-slate-400 capitalize">{cond.category}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* 5. Pregnancy Care */}
            <button
              onClick={() => handleNavClick('/pregnancy-care')}
              className={`w-full text-left px-3 py-2 rounded-lg ${
                isCurrent('/pregnancy-care') ? 'bg-[#FCEEF1] text-[#C96D83] font-bold' : 'hover:bg-slate-50'
              }`}
            >
              {t.nav.pregnancyCare}
            </button>

            {/* 6. Diagnostics */}
            <button
              onClick={() => handleNavClick('/diagnostics')}
              className={`w-full text-left px-3 py-2 rounded-lg ${
                isCurrent('/diagnostics') ? 'bg-[#FCEEF1] text-[#C96D83] font-bold' : 'hover:bg-slate-50'
              }`}
            >
              {t.nav.diagnostics}
            </button>

            {/* 7. Doctors (Accordion) */}
            <div className="border-y border-slate-100 py-1.5">
              <button
                onClick={() => setMobileDoctorsOpen(!mobileDoctorsOpen)}
                className="w-full flex items-center justify-between px-3 py-2 rounded-lg font-bold text-[#1D3B58] hover:bg-slate-50"
              >
                <span>{t.nav.doctors}</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileDoctorsOpen ? 'rotate-180' : ''}`} />
              </button>
              {mobileDoctorsOpen && (
                <div className="pl-4 space-y-1 mt-1">
                  <button
                    onClick={() => handleNavClick('/doctors')}
                    className="w-full text-left px-3 py-1.5 text-xs text-[#C96D83] font-bold rounded-md hover:bg-slate-50"
                  >
                    All Specialists Directory
                  </button>
                  {DOCTORS.map((doc) => (
                    <button
                      key={doc.id}
                      onClick={() => handleNavClick(`/doctors/${doc.id}`)}
                      className="w-full text-left px-3 py-1.5 text-xs text-slate-600 hover:text-[#1D3B58] rounded-md hover:bg-slate-50 flex items-center justify-between"
                    >
                      <span>{doc.name}</span>
                      <span className="text-[10px] text-slate-400">{doc.role.split('&')[0]}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* 8. Resources (Accordion) */}
            <div className="border-b border-slate-100 py-1.5">
              <button
                onClick={() => setMobileResourcesOpen(!mobileResourcesOpen)}
                className="w-full flex items-center justify-between px-3 py-2 rounded-lg font-bold text-[#1D3B58] hover:bg-slate-50"
              >
                <span>{t.nav.resources}</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileResourcesOpen ? 'rotate-180' : ''}`} />
              </button>
              {mobileResourcesOpen && (
                <div className="pl-4 space-y-1 mt-1">
                  <button
                    onClick={() => handleNavClick('/patient-resources')}
                    className="w-full text-left px-3 py-1.5 text-xs text-[#C96D83] font-bold rounded-md hover:bg-slate-50"
                  >
                    Patient Resources Hub
                  </button>
                  <button
                    onClick={() => handleNavClick('/facilities')}
                    className="w-full text-left px-3 py-1.5 text-xs text-slate-600 hover:text-[#1D3B58] rounded-md hover:bg-slate-50"
                  >
                    Facilities & Cleanroom Tech
                  </button>
                  <button
                    onClick={() => handleNavClick('/pricing')}
                    className="w-full text-left px-3 py-1.5 text-xs text-slate-600 hover:text-[#1D3B58] rounded-md hover:bg-slate-50"
                  >
                    Treatment Costs & Packages
                  </button>
                  <button
                    onClick={() => handleNavClick('/calculator')}
                    className="w-full text-left px-3 py-1.5 text-xs text-slate-600 hover:text-[#1D3B58] rounded-md hover:bg-slate-50"
                  >
                    Pregnancy Due Date Calculator
                  </button>
                  <button
                    onClick={() => handleNavClick('/journey')}
                    className="w-full text-left px-3 py-1.5 text-xs text-slate-600 hover:text-[#1D3B58] rounded-md hover:bg-slate-50"
                  >
                    Step-by-Step IVF Journey
                  </button>
                  <button
                    onClick={() => handleNavClick('/stories')}
                    className="w-full text-left px-3 py-1.5 text-xs text-slate-600 hover:text-[#1D3B58] rounded-md hover:bg-slate-50"
                  >
                    Patient Success Stories
                  </button>
                  <button
                    onClick={() => handleNavClick('/faq')}
                    className="w-full text-left px-3 py-1.5 text-xs text-slate-600 hover:text-[#1D3B58] rounded-md hover:bg-slate-50"
                  >
                    Frequently Asked Questions
                  </button>
                </div>
              )}
            </div>

            {/* 9. Contact */}
            <button
              onClick={() => handleNavClick('/contact')}
              className={`w-full text-left px-3 py-2 rounded-lg ${
                isCurrent('/contact') ? 'bg-[#FCEEF1] text-[#C96D83] font-bold' : 'hover:bg-slate-50'
              }`}
            >
              {t.nav.contact}
            </button>

            {/* Mobile Call-To-Action & Emergency Hotlines */}
            <div className="pt-3 border-t border-slate-200 space-y-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full bg-[#E48AA0] hover:bg-[#D4748B] text-white py-3 rounded-xl font-bold text-center text-sm shadow-xs flex items-center justify-center gap-2 cursor-pointer"
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
