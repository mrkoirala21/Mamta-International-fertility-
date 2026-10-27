import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import AppointmentModal from './components/AppointmentModal';
import LiveChatWidget from './components/LiveChatWidget';
import MobileStickyBar from './components/MobileStickyBar';

// 1. Hub & Core Pages
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import ConditionsHubPage from './pages/ConditionsHubPage';
import MaternityHubPage from './pages/MaternityHubPage';
import DiagnosticsPage from './pages/DiagnosticsPage';
import DoctorsPage from './pages/DoctorsPage';
import FacilitiesPage from './pages/FacilitiesPage';
import PatientResourcesHubPage from './pages/PatientResourcesHubPage';
import ContactPage from './pages/ContactPage';

// 2. Dedicated Detail Pages
import TreatmentDetailPage from './pages/TreatmentDetailPage';
import ConditionDetailPage from './pages/ConditionDetailPage';
import DoctorProfilePage from './pages/DoctorProfilePage';

// 3. Specialized Patient Resource Pages
import PricingPage from './pages/PricingPage';
import DueDateCalculatorPage from './pages/DueDateCalculatorPage';
import PatientJourneyPage from './pages/PatientJourneyPage';
import TestimonialsPage from './pages/TestimonialsPage';
import FAQPage from './pages/FAQPage';

interface ParsedRoute {
  page: string;
  param?: string;
  rawPath: string;
}

function parseLocation(): ParsedRoute {
  // Support both standard pathname and hash fallback
  let path = window.location.pathname || '/';
  const hash = window.location.hash || '';

  if (hash.startsWith('#/')) {
    path = hash.substring(1); // convert '#/about' to '/about'
  } else if (hash.startsWith('#') && hash.length > 1) {
    path = `/${hash.substring(1)}`;
  }

  // Normalize path: strip trailing slash (except for root)
  if (path.length > 1 && path.endsWith('/')) {
    path = path.slice(0, -1);
  }

  // Route matching
  if (path === '' || path === '/' || path === '/home') {
    return { page: 'home', rawPath: '/' };
  }
  if (path === '/about') {
    return { page: 'about', rawPath: path };
  }

  // Treatments Hub & Subpages
  if (path === '/fertility-treatments' || path === '/treatments' || path === '/services') {
    return { page: 'fertility-treatments', rawPath: path };
  }
  if (path.startsWith('/treatments/')) {
    const id = path.replace('/treatments/', '').trim();
    return { page: 'treatment-detail', param: id, rawPath: path };
  }
  if (path.startsWith('/service/')) {
    const id = path.replace('/service/', '').trim();
    return { page: 'treatment-detail', param: id, rawPath: path };
  }

  // Conditions Hub & Subpages
  if (path === '/conditions' || path === '/infertility-conditions') {
    return { page: 'conditions', rawPath: path };
  }
  if (path.startsWith('/conditions/')) {
    const id = path.replace('/conditions/', '').trim();
    return { page: 'condition-detail', param: id, rawPath: path };
  }

  // Maternity Care Hub
  if (path === '/pregnancy-care' || path === '/maternity' || path === '/maternity-care') {
    return { page: 'pregnancy-care', rawPath: path };
  }

  // Diagnostics Hub
  if (path === '/diagnostics' || path === '/testing' || path === '/investigations') {
    return { page: 'diagnostics', rawPath: path };
  }

  // Doctors & Specialist Subpages
  if (path === '/doctors' || path === '/specialists' || path === '/team') {
    return { page: 'doctors', rawPath: path };
  }
  if (path.startsWith('/doctors/')) {
    const id = path.replace('/doctors/', '').trim();
    return { page: 'doctor-profile', param: id, rawPath: path };
  }

  // Facilities & Technology
  if (path === '/facilities' || path === '/technology' || path === '/lab') {
    return { page: 'facilities', rawPath: path };
  }

  // Patient Resources Hub & Subpages
  if (path === '/patient-resources' || path === '/resources') {
    return { page: 'patient-resources', rawPath: path };
  }
  if (path === '/pricing' || path === '/cost' || path === '/packages') {
    return { page: 'pricing', rawPath: path };
  }
  if (path === '/calculator' || path === '/due-date' || path === '/due-date-calculator') {
    return { page: 'calculator', rawPath: path };
  }
  if (path === '/journey' || path === '/ivf-process' || path === '/patient-journey') {
    return { page: 'journey', rawPath: path };
  }
  if (path === '/stories' || path === '/testimonials' || path === '/success-stories') {
    return { page: 'stories', rawPath: path };
  }
  if (path === '/faq' || path === '/faqs') {
    return { page: 'faq', rawPath: path };
  }

  // Contact
  if (path === '/contact' || path === '/location' || path === '/locations' || path === '/appointment') {
    return { page: 'contact', rawPath: path };
  }

  // Fallback to home
  return { page: 'home', rawPath: '/' };
}

export default function App() {
  const [route, setRoute] = useState<ParsedRoute>(() => parseLocation());

  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedDoctorForBooking, setSelectedDoctorForBooking] = useState<string | undefined>(undefined);
  const [selectedTreatmentForBooking, setSelectedTreatmentForBooking] = useState<string | undefined>(undefined);
  const [language, setLanguage] = useState<'en' | 'ne'>('en');

  // Handle URL change
  useEffect(() => {
    const handleUrlChange = () => {
      const parsed = parseLocation();
      setRoute(parsed);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('popstate', handleUrlChange);
    window.addEventListener('hashchange', handleUrlChange);

    return () => {
      window.removeEventListener('popstate', handleUrlChange);
      window.removeEventListener('hashchange', handleUrlChange);
    };
  }, []);

  const navigateTo = useCallback((targetPath: string) => {
    // Normalize targetPath to start with /
    let cleanPath = targetPath;
    if (!cleanPath.startsWith('/')) {
      cleanPath = `/${cleanPath}`;
    }

    try {
      window.history.pushState(null, '', cleanPath);
    } catch {
      window.location.hash = `#${cleanPath}`;
    }

    setRoute(parseLocation());
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleOpenBooking = (doctorName?: string, branchId?: string, treatmentName?: string) => {
    setSelectedDoctorForBooking(doctorName);
    setSelectedTreatmentForBooking(treatmentName);
    setIsBookingOpen(true);
  };

  return (
    <div className="min-h-screen bg-white text-[#1D3B58] flex flex-col antialiased selection:bg-[#FCEEF1] selection:text-[#C96D83] overflow-x-hidden w-full max-w-full">
      {/* 1. Header with Top Announcement Bar, Logo, Multi-Page Navigation & Dropdowns */}
      <Header
        onOpenBooking={(doc, _br, tr) => handleOpenBooking(doc, 'chitwan', tr)}
        currentPage={route.rawPath}
        onNavigate={navigateTo}
        language={language}
        onToggleLanguage={(lang) => setLanguage(lang)}
      />

      {/* 2. Main Multi-Page Route Render */}
      <main className="flex-1">
        {/* HOMEPAGE: CLINIC PROFILE ONLY */}
        {route.page === 'home' && (
          <HomePage
            onNavigate={navigateTo}
            onOpenBooking={(doc, _br, tr) => handleOpenBooking(doc, 'chitwan', tr)}
            language={language}
          />
        )}

        {/* ABOUT THE CLINIC */}
        {route.page === 'about' && (
          <AboutPage
            onNavigate={navigateTo}
            onOpenBooking={(doc, _br, tr) => handleOpenBooking(doc, 'chitwan', tr)}
            language={language}
          />
        )}

        {/* FERTILITY TREATMENTS HUB */}
        {route.page === 'fertility-treatments' && (
          <ServicesPage
            onNavigate={(page, param) => {
              if (param) {
                navigateTo(`/treatments/${param}`);
              } else if (page.startsWith('/')) {
                navigateTo(page);
              } else {
                navigateTo(`/${page}`);
              }
            }}
            onOpenBooking={(doc, _br, tr) => handleOpenBooking(doc, 'chitwan', tr)}
            language={language}
          />
        )}

        {/* DEDICATED INDIVIDUAL TREATMENT DETAIL PAGES (/treatments/:id) */}
        {route.page === 'treatment-detail' && (
          <TreatmentDetailPage
            treatmentId={route.param || 'ivf'}
            onNavigate={navigateTo}
            onOpenBooking={(doc, _br, tr) => handleOpenBooking(doc, 'chitwan', tr)}
            language={language}
          />
        )}

        {/* INFERTILITY CONDITIONS HUB */}
        {route.page === 'conditions' && (
          <ConditionsHubPage
            onNavigate={navigateTo}
            onOpenBooking={(doc, _br, tr) => handleOpenBooking(doc, 'chitwan', tr)}
            language={language}
          />
        )}

        {/* DEDICATED INDIVIDUAL CONDITION DETAIL PAGES (/conditions/:id) */}
        {route.page === 'condition-detail' && (
          <ConditionDetailPage
            conditionId={route.param || 'pcos'}
            onNavigate={navigateTo}
            onOpenBooking={(doc, _br, tr) => handleOpenBooking(doc, 'chitwan', tr)}
            language={language}
          />
        )}

        {/* PREGNANCY AND MATERNITY CARE HUB */}
        {route.page === 'pregnancy-care' && (
          <MaternityHubPage
            onNavigate={navigateTo}
            onOpenBooking={(doc, _br, tr) => handleOpenBooking(doc, 'chitwan', tr)}
            language={language}
          />
        )}

        {/* DIAGNOSTICS AND FERTILITY TESTING HUB */}
        {route.page === 'diagnostics' && (
          <DiagnosticsPage
            onNavigate={navigateTo}
            onOpenBooking={(doc, _br, tr) => handleOpenBooking(doc, 'chitwan', tr)}
            language={language}
          />
        )}

        {/* DOCTORS DIRECTORY */}
        {route.page === 'doctors' && (
          <DoctorsPage
            onOpenBooking={(doc, _br, tr) => handleOpenBooking(doc, 'chitwan', tr)}
            onNavigate={navigateTo}
            language={language}
          />
        )}

        {/* DEDICATED DOCTOR PROFILE PAGES (/doctors/:id) */}
        {route.page === 'doctor-profile' && (
          <DoctorProfilePage
            doctorId={route.param || 'dr-anusha'}
            onNavigate={navigateTo}
            onOpenBooking={(doc, _br, tr) => handleOpenBooking(doc, 'chitwan', tr)}
            language={language}
          />
        )}

        {/* FACILITIES AND TECHNOLOGY */}
        {route.page === 'facilities' && (
          <FacilitiesPage
            onNavigate={navigateTo}
            onOpenBooking={(doc, _br, tr) => handleOpenBooking(doc, 'chitwan', tr)}
            language={language}
          />
        )}

        {/* PATIENT RESOURCES HUB */}
        {route.page === 'patient-resources' && (
          <PatientResourcesHubPage
            onNavigate={navigateTo}
            onOpenBooking={(doc, _br, tr) => handleOpenBooking(doc, 'chitwan', tr)}
            language={language}
          />
        )}

        {/* TREATMENT COSTS & PACKAGES */}
        {route.page === 'pricing' && (
          <PricingPage
            onOpenBooking={(doc, _br, tr) => handleOpenBooking(doc, 'chitwan', tr)}
            language={language}
          />
        )}

        {/* PREGNANCY DUE DATE CALCULATOR */}
        {route.page === 'calculator' && (
          <DueDateCalculatorPage
            onOpenBooking={(doc, _br, tr) => handleOpenBooking(doc, 'chitwan', tr)}
            language={language}
          />
        )}

        {/* STEP-BY-STEP PATIENT JOURNEY */}
        {route.page === 'journey' && (
          <PatientJourneyPage
            onOpenBooking={(doc, _br, tr) => handleOpenBooking(doc, 'chitwan', tr)}
            language={language}
          />
        )}

        {/* PATIENT SUCCESS STORIES */}
        {route.page === 'stories' && (
          <TestimonialsPage
            onNavigate={(p) => navigateTo(p.startsWith('/') ? p : `/${p}`)}
            onOpenBooking={(doc, _br, tr) => handleOpenBooking(doc, 'chitwan', tr)}
            language={language}
          />
        )}

        {/* FREQUENTLY ASKED QUESTIONS */}
        {route.page === 'faq' && (
          <FAQPage
            onOpenBooking={(doc, _br, tr) => handleOpenBooking(doc, 'chitwan', tr)}
            language={language}
          />
        )}

        {/* APPOINTMENTS & CONTACT */}
        {route.page === 'contact' && (
          <ContactPage
            onOpenBooking={(doc, _br, tr) => handleOpenBooking(doc, 'chitwan', tr)}
            language={language}
          />
        )}
      </main>

      {/* 3. Footer with White Logo, Maulakalika Hospital Chitwan details, & Multi-Page Navigation */}
      <Footer
        onOpenBooking={() => handleOpenBooking(undefined, 'chitwan')}
        onNavigate={navigateTo}
        language={language}
      />

      {/* 4. Persistent Mobile Sticky Quick Actions Bar (<15% viewport height) */}
      <MobileStickyBar
        onOpenBooking={() => handleOpenBooking(undefined, 'chitwan')}
      />

      {/* 5. Interactive Backend-Connected Appointment Modal */}
      <AppointmentModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        initialDoctorName={selectedDoctorForBooking}
        initialBranchId="chitwan"
        initialTreatment={selectedTreatmentForBooking}
        language={language}
      />

      {/* 6. Real-Time Live Chat Widget (Sister Aarati Assistant with 9855088798 / 056-493798) */}
      <LiveChatWidget />
    </div>
  );
}
