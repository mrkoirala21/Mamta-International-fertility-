import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import AppointmentModal from './components/AppointmentModal';
import LiveChatWidget from './components/LiveChatWidget';
import MobileStickyBar from './components/MobileStickyBar';
import ServiceDetailPage from './components/ServiceDetailPage';

// Dedicated Content Pages
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import DoctorsPage from './pages/DoctorsPage';
import PricingPage from './pages/PricingPage';
import DueDateCalculatorPage from './pages/DueDateCalculatorPage';
import PatientJourneyPage from './pages/PatientJourneyPage';
import TestimonialsPage from './pages/TestimonialsPage';
import FAQPage from './pages/FAQPage';
import ContactPage from './pages/ContactPage';

export type PageRoute =
  | 'home'
  | 'about'
  | 'services'
  | 'service'
  | 'doctors'
  | 'pricing'
  | 'calculator'
  | 'journey'
  | 'stories'
  | 'faq'
  | 'contact';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageRoute>('home');
  const [selectedServiceId, setSelectedServiceId] = useState<string>('ivf');

  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedDoctorForBooking, setSelectedDoctorForBooking] = useState<string | undefined>(undefined);
  const [selectedTreatmentForBooking, setSelectedTreatmentForBooking] = useState<string | undefined>(undefined);
  const [language, setLanguage] = useState<'en' | 'ne'>('en');

  // Hash-based client routing
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;

      if (hash.startsWith('#/service/')) {
        const id = hash.replace('#/service/', '').trim();
        if (id) {
          setSelectedServiceId(id);
          setCurrentPage('service');
          window.scrollTo({ top: 0, behavior: 'smooth' });
          return;
        }
      }

      switch (hash) {
        case '#/about':
        case '#about':
          setCurrentPage('about');
          break;
        case '#/services':
        case '#/treatments':
        case '#services':
        case '#treatments':
          setCurrentPage('services');
          break;
        case '#/doctors':
        case '#doctors':
          setCurrentPage('doctors');
          break;
        case '#/pricing':
        case '#/cost':
        case '#cost':
        case '#pricing':
          setCurrentPage('pricing');
          break;
        case '#/calculator':
        case '#/due-date':
        case '#calculator':
          setCurrentPage('calculator');
          break;
        case '#/journey':
        case '#journey':
          setCurrentPage('journey');
          break;
        case '#/stories':
        case '#/testimonials':
        case '#stories':
          setCurrentPage('stories');
          break;
        case '#/faq':
        case '#faq':
          setCurrentPage('faq');
          break;
        case '#/contact':
        case '#/location':
        case '#/locations':
        case '#contact':
        case '#locations':
          setCurrentPage('contact');
          break;
        case '':
        case '#':
        case '#/home':
        case '#home':
        default:
          setCurrentPage('home');
          break;
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (page: string, param?: string) => {
    if (page === 'service') {
      const id = param || 'ivf';
      setSelectedServiceId(id);
      setCurrentPage('service');
      window.location.hash = `#/service/${id}`;
    } else {
      setCurrentPage(page as PageRoute);
      window.location.hash = `#/${page}`;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenBooking = (doctorName?: string, branchId?: string, treatmentName?: string) => {
    setSelectedDoctorForBooking(doctorName);
    setSelectedTreatmentForBooking(treatmentName);
    setIsBookingOpen(true);
  };

  return (
    <div className="min-h-screen bg-white text-[#1D3B58] flex flex-col antialiased selection:bg-[#FCEEF1] selection:text-[#C96D83] overflow-x-hidden w-full max-w-full">
      {/* 1. Header with Top Announcement Bar, Logo, & Page Navigation */}
      <Header
        onOpenBooking={(doc, _br, tr) => handleOpenBooking(doc, 'chitwan', tr)}
        currentPage={currentPage}
        onNavigate={navigateTo}
        language={language}
        onToggleLanguage={(lang) => setLanguage(lang)}
      />

      {/* 2. Main Page Render: Each content has its own dedicated page! */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage
            onNavigate={navigateTo}
            onOpenBooking={(doc, _br, tr) => handleOpenBooking(doc, 'chitwan', tr)}
            language={language}
          />
        )}

        {currentPage === 'about' && (
          <AboutPage
            onNavigate={navigateTo}
            onOpenBooking={(doc, _br, tr) => handleOpenBooking(doc, 'chitwan', tr)}
            language={language}
          />
        )}

        {currentPage === 'services' && (
          <ServicesPage
            onNavigate={navigateTo}
            onOpenBooking={(doc, _br, tr) => handleOpenBooking(doc, 'chitwan', tr)}
            language={language}
          />
        )}

        {currentPage === 'service' && (
          <ServiceDetailPage
            treatmentId={selectedServiceId}
            onBackToHome={() => navigateTo('home')}
            onSelectTreatment={(id) => navigateTo('service', id)}
            onOpenBooking={(doc, _br, tr) => handleOpenBooking(doc, 'chitwan', tr)}
            language={language}
          />
        )}

        {currentPage === 'doctors' && (
          <DoctorsPage
            onOpenBooking={(doc, _br, tr) => handleOpenBooking(doc, 'chitwan', tr)}
            language={language}
          />
        )}

        {currentPage === 'pricing' && (
          <PricingPage
            onOpenBooking={(doc, _br, tr) => handleOpenBooking(doc, 'chitwan', tr)}
            language={language}
          />
        )}

        {currentPage === 'calculator' && (
          <DueDateCalculatorPage
            onOpenBooking={(doc, _br, tr) => handleOpenBooking(doc, 'chitwan', tr)}
            language={language}
          />
        )}

        {currentPage === 'journey' && (
          <PatientJourneyPage
            onOpenBooking={(doc, _br, tr) => handleOpenBooking(doc, 'chitwan', tr)}
            language={language}
          />
        )}

        {currentPage === 'stories' && (
          <TestimonialsPage
            onNavigate={navigateTo}
            onOpenBooking={(doc, _br, tr) => handleOpenBooking(doc, 'chitwan', tr)}
            language={language}
          />
        )}

        {currentPage === 'faq' && (
          <FAQPage
            onOpenBooking={(doc, _br, tr) => handleOpenBooking(doc, 'chitwan', tr)}
            language={language}
          />
        )}

        {currentPage === 'contact' && (
          <ContactPage
            onOpenBooking={(doc, _br, tr) => handleOpenBooking(doc, 'chitwan', tr)}
            language={language}
          />
        )}
      </main>

      {/* 3. Footer with White Logo, Maulakalika Hospital Chitwan details, & links */}
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

      {/* 6. Real-Time Live Chat Widget (Sister Aarati AI Assistant with 9855088798 / 056-493798) */}
      <LiveChatWidget />
    </div>
  );
}
