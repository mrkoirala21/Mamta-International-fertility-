import React, { useState, useEffect, useRef } from 'react';
import { TESTIMONIALS } from '../data/fertilityData';
import { IMAGES } from '../assets/images';
import {
  Star,
  Quote,
  CheckCircle2,
  Heart,
  ChevronLeft,
  ChevronRight,
  Baby,
  Calendar,
  ArrowRight,
  ShieldCheck,
  Pause,
  Play,
  Sparkles,
  MapPin,
  Clock,
} from 'lucide-react';

interface TestimonialsSectionProps {
  onOpenBooking: (doctorName?: string, branchId?: string, treatmentName?: string) => void;
  onNavigate?: (path: string) => void;
  language?: 'en' | 'ne';
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
  onOpenBooking,
  onNavigate,
  language = 'en',
}) => {
  const [activeStoryIdx, setActiveStoryIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  const storiesCount = TESTIMONIALS.length;

  const prevStory = () => {
    setActiveStoryIdx((prev) => (prev === 0 ? storiesCount - 1 : prev - 1));
  };

  const nextStory = () => {
    setActiveStoryIdx((prev) => (prev === storiesCount - 1 ? 0 : prev + 1));
  };

  // Auto-play timer (6.5s interval, pauses when hovering or tab is unfocused)
  useEffect(() => {
    if (isPaused) {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
      return;
    }

    autoPlayRef.current = setInterval(() => {
      setActiveStoryIdx((prev) => (prev === storiesCount - 1 ? 0 : prev + 1));
    }, 6500);

    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [isPaused, storiesCount]);

  // Touch swipe support for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;

    if (diff > 50) {
      nextStory();
    } else if (diff < -50) {
      prevStory();
    }
    setTouchStartX(null);
  };

  const activeStory = TESTIMONIALS[activeStoryIdx] || TESTIMONIALS[0];

  const content = {
    en: {
      badge: 'Verified Parenthood Journeys · Real Patient Stories',
      heading: 'Patient Success Stories',
      subtitle:
        'Over 130+ couples have realized their dream of holding their baby through personalized fertility protocols, advanced micromanipulation, and tender emotional care at Mamta International Fertility Center, Maulakalika Hospital Chitwan.',
      viewAll: 'View All 130+ Stories',
      verifiedTag: 'Verified Patient Journey · Maulakalika Hospital Chitwan',
      yearsWaiting: 'Years Trying',
      babyBorn: 'Baby Milestone',
      bookConsultation: 'Book Consultation Like This',
      readFullStory: 'Explore All Patient Reviews',
      autoPlayPaused: 'Autoplay Paused',
      autoPlayActive: 'Autoplay Active',
      trustStats: [
        { label: 'Families Blessed', value: '130+', sub: 'Healthy deliveries across Nepal & abroad' },
        { label: 'Cumulative Clinical Pregnancy', value: '74.8%', sub: 'Blastocyst transfer protocol' },
        { label: 'Clinical Leadership Experience', value: '9+ Yrs', sub: 'Dedicated fertility & maternity care' },
        { label: 'Transparent Pricing & Ethics', value: '100%', sub: 'Zero hidden fees or forced add-ons' },
      ],
    },
    ne: {
      badge: 'प्रमाणित बिरामी सफलताका अनुभवहरू · वास्तविक कथाहरू',
      heading: 'बिरामी सफलताका कथाहरू (Patient Success Stories)',
      subtitle:
        'चितवनको मौलकालिका अस्पतालस्थित ममता इन्टरनेशनल फर्टिलिटी सेन्टरमा १३० भन्दा बढी दम्पतीहरूले अत्याधुनिक प्रविधि, उच्च सफलता दर र आत्मीय सेवाका साथ आफ्नो सन्तान सुखको सपना पूरा गरेका छन्।',
      viewAll: 'सबै १३०+ कथाहरू हेर्नुहोस्',
      verifiedTag: 'प्रमाणित उपचार विवरण · मौलकालिका अस्पताल, चितवन',
      yearsWaiting: 'प्रतीक्षाको वर्ष',
      babyBorn: 'शिशुको विवरण',
      bookConsultation: 'डाक्टरसँग परामर्श लिनुहोस्',
      readFullStory: 'सबै बिरामी अनुभवहरू हेर्नुहोस्',
      autoPlayPaused: 'स्वतः सञ्चालन रोकिएको',
      autoPlayActive: 'स्वतः सञ्चालन चालु',
      trustStats: [
        { label: 'सन्तान सुख प्राप्त दम्पती', value: '१३०+', sub: 'नेपाल तथा विदेशका सन्तुष्ट अभिभावकहरू' },
        { label: 'ब्लास्टोसिस्ट सफलता दर', value: '७४.८%', sub: 'अन्तर्राष्ट्रिय मापदण्डको भ्रूणविज्ञान' },
        { label: 'विशेषज्ञ क्लिनिकल अनुभव', value: '९+ वर्ष', sub: 'वरिष्ठ डाक्टरहरूको प्रत्यक्ष संलग्नता' },
        { label: 'पारदर्शी खर्च र इमान्दारिता', value: '१००%', sub: 'कुनै लुकेको शुल्क वा अतिरिक्त भार नभएको' },
      ],
    },
  }[language];

  return (
    <section
      id="patient-success-stories"
      aria-label="Patient Success Stories Carousel"
      className="py-16 md:py-24 bg-gradient-to-b from-white via-[#F9FAFC] to-white border-y border-slate-100"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* SECTION HEADER & CONTROLS */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#C96D83] bg-[#FCEEF1] px-3.5 py-1.5 rounded-full">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{content.badge}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1D3B58] tracking-tight">
              {content.heading}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              {content.subtitle}
            </p>
          </div>

          {/* CAROUSEL CONTROLS & LINK */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            {onNavigate && (
              <button
                onClick={() => onNavigate('/testimonials')}
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#1D3B58] hover:text-[#C96D83] transition-colors py-2 px-3 rounded-xl hover:bg-slate-100 cursor-pointer"
              >
                <span>{content.viewAll}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}

            {/* Pagination badge & Navigation arrows */}
            <div className="inline-flex items-center bg-white border border-slate-200/90 rounded-2xl p-1 shadow-2xs gap-1">
              <button
                onClick={prevStory}
                className="w-9 h-9 flex items-center justify-center rounded-xl text-slate-700 hover:text-[#1D3B58] hover:bg-slate-100 transition-colors cursor-pointer"
                aria-label="Previous patient story"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <span className="px-2.5 text-xs font-mono font-bold text-[#1D3B58]">
                {String(activeStoryIdx + 1).padStart(2, '0')} / {String(storiesCount).padStart(2, '0')}
              </span>

              <button
                onClick={nextStory}
                className="w-9 h-9 flex items-center justify-center rounded-xl text-slate-700 hover:text-[#1D3B58] hover:bg-slate-100 transition-colors cursor-pointer"
                aria-label="Next patient story"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              <button
                onClick={() => setIsPaused((prev) => !prev)}
                className="w-8 h-8 flex items-center justify-center rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer ml-0.5"
                title={isPaused ? content.autoPlayPaused : content.autoPlayActive}
                aria-label={isPaused ? 'Resume autoplay' : 'Pause autoplay'}
              >
                {isPaused ? <Play className="w-3.5 h-3.5 text-[#C96D83]" /> : <Pause className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>
        </div>

        {/* MAIN FEATURED STORY CARD */}
        <div
          className="relative bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden transition-all duration-300"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            {/* LEFT PHOTO & BABY HIGHLIGHT PANEL */}
            <div className="lg:col-span-5 relative min-h-[340px] sm:min-h-[400px] lg:min-h-full bg-slate-100 overflow-hidden">
              <img
                src={IMAGES.parentsNewborn}
                alt={`${activeStory.parentNames} holding baby born at Mamta International Fertility Center`}
                className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
                referrerPolicy="no-referrer"
                loading="lazy"
                decoding="async"
                width={600}
                height={450}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-900/30 to-transparent" />

              {/* Verified badge top left */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-white bg-slate-950/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 shadow-xs">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{activeStory.verifiedPatient ? 'Verified Clinical Record' : 'Verified Review'}</span>
                </span>

                <span className="text-[11px] font-bold text-white bg-[#C96D83]/90 backdrop-blur-md px-3 py-1.5 rounded-full shadow-xs">
                  {activeStory.yearsTrying}
                </span>
              </div>

              {/* Floating Baby Info Card over image */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-white/60">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#FCEEF1] text-[#C96D83] flex items-center justify-center shrink-0">
                      <Baby className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block">
                        {content.babyBorn}
                      </span>
                      <h4 className="text-sm font-extrabold text-[#1D3B58]">
                        {activeStory.babyName ? `Baby ${activeStory.babyName}` : 'Healthy Baby Born'}
                      </h4>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="flex items-center justify-end gap-0.5 text-amber-400">
                      {[...Array(activeStory.rating || 5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                      ))}
                    </div>
                    <span className="text-[10px] text-slate-500 font-semibold mt-0.5 block">
                      5.0 Patient Rating
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT QUOTE & DETAILED STORY CONTENT */}
            <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 flex flex-col justify-between space-y-6">
              <div className="space-y-5">
                {/* METADATA STRIP */}
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className="font-bold text-[#C96D83] bg-[#FCEEF1] px-3 py-1 rounded-lg">
                    {activeStory.treatment}
                  </span>
                  <span className="text-slate-400">·</span>
                  <span className="font-semibold text-slate-600 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    {activeStory.location}
                  </span>
                  <span className="text-slate-400">·</span>
                  <span className="text-emerald-700 font-medium flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Maulakalika Hospital Patient</span>
                  </span>
                </div>

                {/* QUOTE ICON & TESTIMONIAL HEADLINE */}
                <div className="relative pt-1">
                  <Quote className="w-12 h-12 text-[#E48AA0]/25 absolute -top-4 -left-2 pointer-events-none" />
                  <blockquote className="text-lg sm:text-xl lg:text-2xl font-bold text-[#1D3B58] leading-snug relative z-10">
                    "{activeStory.quote}"
                  </blockquote>
                </div>

                {/* DETAILED NARRATIVE */}
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  {activeStory.fullStory}
                </p>
              </div>

              {/* PARENT SIGNATURE & ACTION BUTTONS */}
              <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-base sm:text-lg font-extrabold text-[#1D3B58]">
                    {activeStory.parentNames}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Parents of {activeStory.babyName || 'Newborn'} · Treated at Mamta International Fertility Center
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2.5">
                  <button
                    onClick={() => onOpenBooking(undefined, 'chitwan', activeStory.treatment)}
                    className="inline-flex items-center gap-2 bg-[#E48AA0] hover:bg-[#D4748B] text-white px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-xs transition-colors cursor-pointer"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>{content.bookConsultation}</span>
                  </button>
                  {onNavigate && (
                    <button
                      onClick={() => onNavigate('/testimonials')}
                      className="inline-flex items-center gap-1.5 bg-slate-100 hover:bg-[#FCEEF1] text-[#1D3B58] hover:text-[#C96D83] px-3.5 py-2.5 rounded-xl font-bold text-xs transition-colors cursor-pointer border border-slate-200"
                    >
                      <span>Read Reviews</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* THUMBNAIL SELECTOR BAR (CLICKABLE DIRECT JUMP) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {TESTIMONIALS.map((story, idx) => {
            const isActive = activeStoryIdx === idx;
            return (
              <button
                key={story.id}
                onClick={() => setActiveStoryIdx(idx)}
                className={`text-left p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer relative flex flex-col justify-between ${
                  isActive
                    ? 'bg-white border-[#E48AA0] shadow-md ring-2 ring-[#E48AA0]/20'
                    : 'bg-white hover:bg-slate-50 border-slate-200/80 hover:border-slate-300'
                }`}
                aria-label={`Jump to story by ${story.parentNames}`}
              >
                {isActive && (
                  <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-[#E48AA0] animate-pulse" />
                )}

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-semibold text-slate-500 truncate">{story.location}</span>
                    <span className="font-bold text-[#C96D83]">{story.yearsTrying}</span>
                  </div>

                  <h4 className="font-bold text-xs sm:text-sm text-[#1D3B58] line-clamp-1">
                    {story.parentNames}
                  </h4>

                  <p className="text-[11px] text-slate-600 line-clamp-2 italic leading-relaxed">
                    "{story.quote}"
                  </p>
                </div>

                <div className="pt-2.5 mt-2 border-t border-slate-100 flex items-center justify-between text-[10px] font-semibold text-slate-500">
                  <span className="truncate max-w-[140px] text-[#1D3B58]">{story.treatment}</span>
                  <span className="text-[#C96D83] font-bold">0{idx + 1}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* TRUST METRICS BAR */}
        <div className="bg-[#1D3B58] text-white rounded-3xl p-6 sm:p-8 shadow-sm">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left">
            {content.trustStats.map((item, i) => (
              <div
                key={i}
                className={`space-y-1 ${
                  i < 3 ? 'md:border-r md:border-white/10 md:pr-4' : ''
                }`}
              >
                <div className="text-2xl sm:text-3xl font-extrabold text-[#E48AA0] tracking-tight">
                  {item.value}
                </div>
                <div className="text-xs sm:text-sm font-bold text-white">
                  {item.label}
                </div>
                <div className="text-[11px] text-slate-300">
                  {item.sub}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
