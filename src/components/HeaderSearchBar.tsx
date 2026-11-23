import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Search,
  X,
  Stethoscope,
  Activity,
  Heart,
  Microscope,
  Baby,
  Calculator,
  TrendingUp,
  ChevronRight,
  Sparkles,
  Command,
} from 'lucide-react';
import { TREATMENTS, CONDITIONS, DOCTORS } from '../data/fertilityData';

export interface SearchResultItem {
  id: string;
  type: 'treatment' | 'condition' | 'doctor' | 'resource';
  title: string;
  nepaliTitle?: string;
  subtitle: string;
  path: string;
  badge: string;
  keywords: string[];
}

interface HeaderSearchBarProps {
  onNavigate: (path: string) => void;
  language?: 'en' | 'ne';
  isMobileModal?: boolean;
  onCloseMobile?: () => void;
  className?: string;
}

export const HeaderSearchBar: React.FC<HeaderSearchBarProps> = ({
  onNavigate,
  language = 'en',
  isMobileModal = false,
  onCloseMobile,
  className = '',
}) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Build indexed search items
  const allSearchItems: SearchResultItem[] = useMemo(() => {
    const items: SearchResultItem[] = [];

    // 1. Treatments
    TREATMENTS.forEach((tr) => {
      items.push({
        id: `treatment-${tr.id}`,
        type: 'treatment',
        title: tr.title,
        nepaliTitle: tr.nepaliTitle,
        subtitle: tr.subtitle || tr.summary,
        path: `/treatments/${tr.id}`,
        badge: tr.badge || 'Treatment',
        keywords: [
          tr.id,
          tr.category,
          'treatment',
          'procedure',
          'ivf',
          'therapy',
          tr.techHighlight || '',
          ...(tr.idealFor || []),
        ],
      });
    });

    // 2. Conditions
    CONDITIONS.forEach((cond) => {
      items.push({
        id: `condition-${cond.id}`,
        type: 'condition',
        title: cond.title,
        nepaliTitle: cond.nepaliTitle,
        subtitle: cond.subtitle || cond.summary,
        path: `/conditions/${cond.id}`,
        badge: cond.category === 'female' ? 'Female Factor' : cond.category === 'male' ? 'Male Factor' : 'Condition',
        keywords: [
          cond.id,
          cond.category,
          'disease',
          'problem',
          'infertility',
          'symptoms',
          ...(cond.symptoms || []),
        ],
      });
    });

    // 3. Doctors
    DOCTORS.forEach((doc) => {
      items.push({
        id: `doctor-${doc.id}`,
        type: 'doctor',
        title: doc.name,
        nepaliTitle: doc.nepaliName,
        subtitle: doc.role,
        path: `/doctors/${doc.id}`,
        badge: doc.department ? doc.department.toUpperCase() : 'SPECIALIST',
        keywords: [
          doc.id,
          doc.name,
          doc.qualifications,
          doc.role,
          'doctor',
          'specialist',
          'gynecologist',
          'consultant',
          ...(doc.specialties || []),
        ],
      });
    });

    // 4. Tools & Key Resources
    items.push(
      {
        id: 'res-success-rates',
        type: 'resource',
        title: 'Audited Success Rates Dashboard',
        nepaliTitle: 'सफलता दर चार्ट तथा नतिजाहरू',
        subtitle: 'ESHRE-audited clinical pregnancy statistics by age & treatment',
        path: '/success-rates',
        badge: 'Audited Data',
        keywords: ['success', 'rate', 'percentage', 'statistics', 'eshre', 'chances', 'cumulative'],
      },
      {
        id: 'res-ovulation-calc',
        type: 'resource',
        title: 'Ovulation & Fertile Window Tracker',
        nepaliTitle: 'अण्डा निष्कासन (Ovulation) क्यालकुलेटर',
        subtitle: 'Calculate peak fertility days, LH surge, & cycle timeline',
        path: '/calculators',
        badge: 'Calculator',
        keywords: ['ovulation', 'fertile', 'fertile window', 'period', 'cycle', 'calculator', 'lh surge'],
      },
      {
        id: 'res-due-date-calc',
        type: 'resource',
        title: 'Pregnancy Due Date & IVF Gestational Calculator',
        nepaliTitle: 'गर्भावस्था मिति तथा डेलिभरी क्यालकुलेटर',
        subtitle: 'Estimate delivery date via LMP, conception, or Day 5 IVF transfer',
        path: '/calculators',
        badge: 'Calculator',
        keywords: ['due date', 'edd', 'pregnancy', 'gestational age', 'trimester', 'ivf transfer date', 'blastocyst'],
      },
      {
        id: 'res-pricing',
        type: 'resource',
        title: 'Treatment Costs & Transparent Packages',
        nepaliTitle: 'उपचार खर्च तथा पारदर्शी प्याकेजहरू',
        subtitle: 'Itemized IVF, IUI, and egg freezing packages with zero hidden fees',
        path: '/pricing',
        badge: 'Pricing',
        keywords: ['cost', 'price', 'pricing', 'fee', 'package', 'charges', 'ivf cost in nepal', 'iui cost', 'npr'],
      },
      {
        id: 'res-diagnostics',
        type: 'resource',
        title: '5D Ultrasound & Fertility Testing',
        nepaliTitle: '५D भिडियो एक्सरे तथा ल्याब परीक्षण',
        subtitle: 'GE Voluson 5D scans by Dr. Ramesh Ghimire and hormone assays',
        path: '/diagnostics',
        badge: 'Diagnostics',
        keywords: ['ultrasound', '5d', 'video xray', 'scan', 'hormone test', 'amh', 'semen analysis', 'blood test'],
      },
      {
        id: 'res-journey',
        type: 'resource',
        title: 'Step-by-Step IVF Journey Roadmap',
        nepaliTitle: 'आईभिएफ उपचारका ४ मुख्य चरणहरू',
        subtitle: 'Complete 4-stage guide from initial visit to positive pregnancy',
        path: '/journey',
        badge: 'Guide',
        keywords: ['journey', 'process', 'steps', 'timeline', 'stimulation', 'retrieval', 'transfer'],
      },
      {
        id: 'res-stories',
        type: 'resource',
        title: 'Patient Success Stories & Testimonials',
        nepaliTitle: 'सफल दम्पतीहरूका अनुभव तथा कथाहरू',
        subtitle: 'Real stories from families across Nepal and NRI parents',
        path: '/stories',
        badge: 'Stories',
        keywords: ['stories', 'testimonials', 'reviews', 'experiences', 'miracle babies', 'feedback'],
      },
      {
        id: 'res-faq',
        type: 'resource',
        title: 'Frequently Asked Questions (Clinical FAQs)',
        nepaliTitle: 'प्रायः सोधिने प्रश्नहरू (FAQs)',
        subtitle: 'Medical answers regarding IVF safety, pain, injections, and stay in Chitwan',
        path: '/faq',
        badge: 'FAQ',
        keywords: ['faq', 'questions', 'answers', 'help', 'pain', 'safety', 'injections', 'stay'],
      },
      {
        id: 'res-facilities',
        type: 'resource',
        title: 'Embryology Lab & Cleanroom Tech',
        nepaliTitle: 'प्रयोगशाला तथा उच्च प्रविधि',
        subtitle: 'ISO 5 cleanroom with ESCO MIRI incubators and 24/7 Level II/III NICU',
        path: '/facilities',
        badge: 'Facility',
        keywords: ['lab', 'cleanroom', 'incubator', 'esco miri', 'technology', 'nicu', 'hospital', 'facilities'],
      },
      {
        id: 'res-contact',
        type: 'resource',
        title: 'Clinic Location, Map & Appointments',
        nepaliTitle: 'सम्पर्क, ठेगाना तथा परामर्श समय',
        subtitle: 'Maulakalika Hospital Bharatpur-11, Chitwan · Hotline: 056-493798',
        path: '/contact',
        badge: 'Contact',
        keywords: ['contact', 'address', 'location', 'phone', 'hotline', 'whatsapp', 'chitwan', 'maulakalika', 'timing'],
      }
    );

    return items;
  }, []);

  // Filter items matching query
  const filteredResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];

    return allSearchItems
      .filter((item) => {
        const titleMatch = item.title.toLowerCase().includes(q);
        const nepaliMatch = item.nepaliTitle?.toLowerCase().includes(q);
        const subtitleMatch = item.subtitle.toLowerCase().includes(q);
        const keywordMatch = item.keywords.some((kw) => kw.toLowerCase().includes(q));
        return titleMatch || nepaliMatch || subtitleMatch || keywordMatch;
      })
      .slice(0, 8); // Max 8 high-relevance results
  }, [query, allSearchItems]);

  // Group results by category
  const groupedResults = useMemo(() => {
    const groups: { [key: string]: SearchResultItem[] } = {};
    filteredResults.forEach((item) => {
      if (!groups[item.type]) groups[item.type] = [];
      groups[item.type].push(item);
    });
    return groups;
  }, [filteredResults]);

  // Global hotkey: Ctrl+K or Cmd+K to focus search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
        setIsOpen(true);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Click outside listener
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle keyboard navigation inside search list
  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen || filteredResults.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % filteredResults.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredResults.length) % filteredResults.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const chosen = filteredResults[selectedIndex];
      if (chosen) {
        handleSelect(chosen.path);
      }
    }
  };

  const handleSelect = (path: string) => {
    onNavigate(path);
    setQuery('');
    setIsOpen(false);
    if (onCloseMobile) onCloseMobile();
  };

  const getCategoryIcon = (type: string) => {
    switch (type) {
      case 'treatment':
        return <Microscope className="w-3.5 h-3.5 text-[#E48AA0]" />;
      case 'condition':
        return <Activity className="w-3.5 h-3.5 text-amber-500" />;
      case 'doctor':
        return <Stethoscope className="w-3.5 h-3.5 text-sky-600" />;
      default:
        return <Sparkles className="w-3.5 h-3.5 text-emerald-600" />;
    }
  };

  const getCategoryLabel = (type: string) => {
    switch (type) {
      case 'treatment':
        return 'Fertility Treatments';
      case 'condition':
        return 'Medical Conditions';
      case 'doctor':
        return 'Doctors & Specialists';
      default:
        return 'Tools & Resources';
    }
  };

  return (
    <div className={`relative ${className}`}>
      {/* SEARCH INPUT BAR */}
      <div className="relative flex items-center">
        <div className="absolute left-3.5 pointer-events-none text-slate-400">
          <Search className="w-4 h-4" />
        </div>

        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
            setSelectedIndex(0);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleInputKeyDown}
          placeholder={
            language === 'ne'
              ? 'उपचार, रोग वा डाक्टर खोज्नुहोस्...'
              : 'Search treatments, conditions, doctors...'
          }
          className="w-full bg-slate-50 hover:bg-slate-100/80 focus:bg-white text-xs sm:text-sm text-[#1D3B58] placeholder-slate-400 pl-9 pr-16 sm:pr-20 py-2 sm:py-2.5 rounded-full border border-slate-200 focus:border-[#E48AA0] focus:ring-2 focus:ring-[#E48AA0]/20 focus:outline-none transition-all shadow-2xs"
          aria-label="Search treatments, conditions, and doctor profiles"
          aria-expanded={isOpen}
          autoComplete="off"
        />

        <div className="absolute right-2.5 flex items-center gap-1">
          {query ? (
            <button
              type="button"
              onClick={() => {
                setQuery('');
                setIsOpen(false);
                inputRef.current?.focus();
              }}
              className="p-1 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-200 transition-colors cursor-pointer"
              aria-label="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          ) : (
            <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-mono font-medium text-slate-400 bg-slate-200/60 border border-slate-300/50 rounded-md">
              <span className="text-[10px]">⌘</span>K
            </kbd>
          )}
        </div>
      </div>

      {/* DROPDOWN RESULTS CONTAINER */}
      {isOpen && query.trim().length > 0 && (
        <div
          ref={dropdownRef}
          className={`absolute left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 ${
            isMobileModal ? 'max-h-[70vh]' : 'max-h-[460px]'
          } overflow-y-auto`}
        >
          {filteredResults.length > 0 ? (
            <div className="py-2">
              <div className="px-3 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between border-b border-slate-100 mb-1">
                <span>{filteredResults.length} matching results</span>
                <span className="text-[10px] font-normal text-slate-400">Press ↑↓ to navigate</span>
              </div>

              {['treatment', 'condition', 'doctor', 'resource'].map((catType) => {
                const items = groupedResults[catType];
                if (!items || items.length === 0) return null;

                return (
                  <div key={catType} className="mb-2 last:mb-0">
                    <div className="px-3.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-slate-50/70 flex items-center gap-1.5">
                      {getCategoryIcon(catType)}
                      <span>{getCategoryLabel(catType)}</span>
                    </div>

                    <div className="divide-y divide-slate-50">
                      {items.map((item) => {
                        const globalIndex = filteredResults.findIndex((r) => r.id === item.id);
                        const isSelected = selectedIndex === globalIndex;

                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => handleSelect(item.path)}
                            onMouseEnter={() => setSelectedIndex(globalIndex)}
                            className={`w-full px-3.5 py-2.5 text-left flex items-center justify-between gap-3 transition-colors cursor-pointer ${
                              isSelected ? 'bg-[#FCEEF1] text-[#1D3B58]' : 'hover:bg-slate-50 text-slate-800'
                            }`}
                          >
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-2">
                                <span className="font-semibold text-xs sm:text-sm text-[#1D3B58] truncate">
                                  {language === 'ne' && item.nepaliTitle ? item.nepaliTitle : item.title}
                                </span>
                                <span className="text-[10px] font-medium bg-white text-slate-500 border border-slate-200 px-1.5 py-0.2 rounded-md shrink-0">
                                  {item.badge}
                                </span>
                              </div>
                              <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5 font-normal">
                                {item.subtitle}
                              </p>
                            </div>

                            <ChevronRight
                              className={`w-4 h-4 shrink-0 transition-transform ${
                                isSelected ? 'text-[#E48AA0] translate-x-0.5' : 'text-slate-300'
                              }`}
                            />
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="p-6 text-center space-y-2">
              <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                <Search className="w-5 h-5" />
              </div>
              <p className="text-xs font-semibold text-slate-700">
                No matching results for "{query}"
              </p>
              <p className="text-[11px] text-slate-400 max-w-xs mx-auto">
                Try searching for popular terms like <strong>IVF</strong>, <strong>PCOS</strong>, <strong>Dr. Anusha</strong>, <strong>5D Ultrasound</strong>, or <strong>Cost</strong>.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default HeaderSearchBar;
