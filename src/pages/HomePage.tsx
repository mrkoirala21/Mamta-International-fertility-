import React from 'react';
import { DOCTORS, BRANCHES } from '../data/fertilityData';
import { IMAGES } from '../assets/images';
import {
  ArrowRight,
  ShieldCheck,
  Heart,
  Award,
  Sparkles,
  Calendar,
  CheckCircle2,
  Clock,
  Phone,
  Microscope,
  Baby,
  MapPin,
  Eye,
  Activity,
  Layers,
  Building2,
  Stethoscope,
  MessageSquare,
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (path: string) => void;
  onOpenBooking: (doctorName?: string, branchId?: string, treatmentName?: string) => void;
  language?: 'en' | 'ne';
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onOpenBooking, language = 'en' }) => {
  const primaryBranch = BRANCHES[0];
  const drAnusha = DOCTORS.find((d) => d.id === 'dr-anusha') || DOCTORS[0];
  const drRamesh = DOCTORS.find((d) => d.id === 'dr-ramesh-ghimire') || DOCTORS[1];

  const t = {
    en: {
      badge: 'Nepal’s Premier Assisted Reproductive & Maternity Care Centre',
      headline: 'Empowering Your Journey to Parenthood with Care & Excellence',
      intro: 'Mamta International Fertility Center at Maulakalika Hospital Pvt. Ltd., Bharatpur-11, Chitwan delivers gold-standard fertility treatment, advanced embryology science, 5D prenatal imaging, and high-risk maternity care in one integrated campus.',
      bookCta: 'Book Consultation',
      exploreCta: 'Explore Services',
      aboutTitle: 'About Mamta International Fertility Center',
      aboutSubtitle: 'A benchmark centre dedicated to ethical, science-backed reproductive and maternity care.',
      aboutText1: 'Established within Maulakalika Hospital Pvt. Ltd. in Bharatpur-11, Chitwan, Mamta International Fertility Center was created to provide families across Nepal and abroad with international-grade assisted reproductive technology (ART) without having to travel across borders.',
      aboutText2: 'Under the clinical leadership of Dr. Anusha Tiwari and a multidisciplinary team of fetal imaging specialists, obstetricians, and embryologists, we unite advanced micromanipulation science with deep empathy. Every couple receives personalized protocols, transparent counseling, and continuous medical support from initial diagnosis to delivery.',
      mvTitle: 'Mission, Vision & Core Values',
      missionTitle: 'Our Mission',
      missionText: 'To deliver compassionate, ethically sound, and scientifically advanced fertility and maternity healthcare, making the dream of parenthood achievable for every aspiring family.',
      visionTitle: 'Our Vision',
      visionText: 'To stand as South Asia’s benchmark fertility institution, recognized for clinical excellence, transparent treatment pathways, and unmatched patient trust.',
      valuesTitle: 'Our Core Values',
      values: [
        { label: 'Compassionate Empathy', desc: 'Personalized emotional and medical care tailored to each couple.' },
        { label: 'Scientific Rigor', desc: 'ISO cleanroom embryology standards and evidence-based protocols.' },
        { label: 'Total Transparency', desc: 'Clear cost disclosures, realistic odds, and no hidden surprises.' },
        { label: 'Patient-First Integrity', desc: 'Strict ethical adherence with zero commercial pressure.' },
      ],
      pillarsTitle: 'Our Major Healthcare Pillars',
      pillarsSubtitle: 'Four specialized medical wings working collaboratively under one roof.',
      pillars: [
        {
          title: 'Advanced Fertility & IVF',
          desc: 'Individualized ovarian stimulation, laser ICSI, Day 5 blastocyst culture, cryopreservation, and male infertility solutions.',
          link: '/fertility-treatments',
          action: 'Explore Treatments',
          icon: Microscope,
          badge: 'IVF / ICSI / Vitrification',
        },
        {
          title: '5D Fetal Ultrasound & Diagnostics',
          desc: 'Ultra-high-definition 5D imaging led by Dr. Ramesh Ghimire, genetic screening, detailed anomaly scans, and fetal doppler.',
          link: '/diagnostics',
          action: 'Explore Diagnostics',
          icon: Eye,
          badge: '5D HD Scans & Lab Panels',
        },
        {
          title: 'Pregnancy & Maternity Care',
          desc: 'Complete continuum from conception through delivery, high-risk obstetrics, maternal monitoring, and 24/7 Level II/III NICU.',
          link: '/pregnancy-care',
          action: 'Explore Maternity',
          icon: Baby,
          badge: 'Antenatal to Postnatal',
        },
        {
          title: 'Reproductive Surgery & Laparoscopy',
          desc: 'Minimally invasive 4K laparoscopy and office hysteroscopy for endometriosis, fibroids, uterine septa, and tubal recanalization.',
          link: '/treatments/laparoscopy',
          action: 'Explore Endoscopy',
          icon: Activity,
          badge: 'Minimally Invasive Surgery',
        },
      ],
      facilitiesTitle: 'World-Class Clinical Strengths & Facilities',
      facilitiesSubtitle: 'Cutting-edge technology engineered for maximal embryo viability and maternal safety.',
      facilities: [
        {
          title: 'Class 10,000 / ISO 5 Cleanroom Lab',
          desc: 'Filtered laminar air flow with zero volatile organic compounds (VOCs) to mimic maternal uterine conditions.',
        },
        {
          title: 'ESCO MIRI Multi-Room Incubators',
          desc: 'Independent incubator chambers ensure undisturbed embryo development with rapid temperature recovery.',
        },
        {
          title: 'Narishige Robotic Micromanipulation',
          desc: 'Ultra-precise micro-injection (ICSI) ensuring minimal cellular stress and superior fertilization rates.',
        },
        {
          title: 'On-Site 24/7 Level II/III NICU',
          desc: 'Direct hospital access at Maulakalika Hospital for premature or high-risk newborns, guaranteeing immediate neonatal care.',
        },
      ],
      learnFacilities: 'View Complete Facilities & Technology',
      specialistsTitle: 'Clinical Leadership',
      specialistsSubtitle: 'Meet the clinical leaders directing reproductive and prenatal care at our Chitwan hospital.',
      viewAllDoctors: 'Meet All 8 Doctors & Team Members',
      ctaTitle: 'Ready to Begin Your Parenthood Journey?',
      ctaSubtitle: 'Schedule a confidential clinical consultation with Dr. Anusha Tiwari and our specialized medical team at Maulakalika Hospital, Chitwan.',
      ctaButton: 'Book Free Consultation',
    },
    ne: {
      badge: 'नेपालकै अग्रणी निसन्तान तथा प्रसूति उपचार केन्द्र',
      headline: 'अभिभावक बन्ने तपाईंको सपनालाई माया र विश्वासका साथ साकार पार्दै',
      intro: 'मौलकालिका अस्पताल, भरतपुर-११, चितवनमा अवस्थित ममता इन्टरनेशनल फर्टिलिटी सेन्टरले अत्याधुनिक टेस्ट ट्युब बेबी (IVF), ५D अल्ट्रासाउन्ड, उच्च जोखिम प्रसूति तथा नवजात शिशु सघन उपचार (NICU) सेवा प्रदान गर्दछ।',
      bookCta: 'परामर्श बुक गर्नुहोस्',
      exploreCta: 'हाम्रा सेवाहरू',
      aboutTitle: 'ममता इन्टरनेशनल फर्टिलिटी सेन्टरको परिचय',
      aboutSubtitle: 'विज्ञता, इमान्दारिता र उच्च प्रविधिमा आधारित अन्तर्राष्ट्रिय स्तरको प्रजनन स्वास्थ्य केन्द्र।',
      aboutText1: 'चितवनको भरतपुर-११ स्थित मौलकालिका अस्पतालको प्रांगणमा स्थापित यस केन्द्रले अन्तर्राष्ट्रिय मापदण्ड अनुसारको टेस्ट ट्युब बेबी र प्रजनन उपचार आफ्नै देशमा सुपथ मूल्यमा उपलब्ध गराउँदै आएको छ।',
      aboutText2: 'डा. अनुषा तिवारीको क्लिनिकल नेतृत्वमा ५D फिटल मेडिसिन विशेषज्ञ डा. रमेश घिमिरे, प्रसूति विशेषज्ञहरू र वरिष्ठ भ्रूणविज्ञहरूको एकीकृत समूहले हरेक दम्पतीलाई व्यक्तिगत परामर्श र विशेष हेरचाह प्रदान गर्दछ।',
      mvTitle: 'उद्देश्य, दूरदृष्टि र मुख्य मूल्यमान्यता',
      missionTitle: 'हाम्रो उद्देश्य (Mission)',
      missionText: 'प्रत्येक दम्पतीलाई नैतिक, पारदर्शी र आधुनिक प्रविधिमा आधारित प्रजनन सेवा उपलब्ध गराउँदै उनीहरूको सन्तान सुखको सपना पूरा गर्नु।',
      visionTitle: 'हाम्रो दूरदृष्टि (Vision)',
      visionText: 'नेपाल तथा दक्षिण एसियाकै सर्वाधिक विश्वसनीय, सफल र बिरामीमैत्री प्रजनन स्वास्थ्य संस्थाको रूपमा स्थापित हुनु।',
      valuesTitle: 'हाम्रा मूल मान्यताहरू (Core Values)',
      values: [
        { label: 'आत्मीय हेरचाह', desc: 'हरेक बिरामीलाई सम्मानजनक र मायालु वातावरणमा व्यक्तिगत सेवा।' },
        { label: 'वैज्ञानिक शुद्धता', desc: 'ISO स्तरको भ्रूणविज्ञान प्रयोगशाला र आधुनिक उपचार पद्धति।' },
        { label: 'पूर्ण पारदर्शिता', desc: 'उपचार खर्च र सफलता दरबारे स्पष्ट र इमान्दार जानकारी।' },
        { label: 'नैतिक प्रतिबद्धता', desc: 'नेपाल सरकारको स्वास्थ्य मन्त्रालय र NMC का मापदण्डहरूको पूर्ण पालना।' },
      ],
      pillarsTitle: 'हाम्रा मुख्य स्वास्थ्य सेवाहरू',
      pillarsSubtitle: 'एउटै अस्पताल परिसरभित्र उपलब्ध चार मुख्य विशेषज्ञ सेवाहरू।',
      pillars: [
        {
          title: 'निःसन्तान तथा IVF उपचार',
          desc: 'अण्डाशय उत्तेजना, लेजर ICSI, ब्लास्टोसिस्ट कल्चर, अण्डा तथा वीर्य भण्डारण (Vitrification) सेवा।',
          link: '/fertility-treatments',
          action: 'उपचारहरू हेर्नुहोस्',
          icon: Microscope,
          badge: 'IVF / ICSI / वीर्य विश्लेषण',
        },
        {
          title: '५D भिडियो एक्सरे तथा परीक्षण',
          desc: 'डा. रमेश घिमिरेद्वारा ५D अल्ट्रासाउन्ड, गर्भस्थ शिशुको मुटु तथा अंगहरूको विस्तृत स्क्यान।',
          link: '/diagnostics',
          action: 'परीक्षणहरू हेर्नुहोस्',
          icon: Eye,
          badge: '५D स्क्यान तथा हर्मोन ल्याब',
        },
        {
          title: 'प्रसूति तथा नवजात शिशु स्याहार',
          desc: 'गर्भधारणदेखि सुरक्षित प्रसूति, उच्च जोखिम गर्भावस्था व्यवस्थापन र २४सै घण्टा NICU सुविधा।',
          link: '/pregnancy-care',
          action: 'प्रसूति सेवा हेर्नुहोस्',
          icon: Baby,
          badge: 'सुरक्षित डेलिभरी र नवजात शिशु',
        },
        {
          title: 'ल्यापारोस्कोपी तथा हिस्टेरोस्कोपी',
          desc: 'पाठेघर र डिम्बनली सम्बन्धी समस्याहरूको बिनाचिरफार अत्याधुनिक क्यामेराद्वारा शल्यक्रिया।',
          link: '/treatments/laparoscopy',
          action: 'शल्यक्रिया सेवा हेर्नुहोस्',
          icon: Activity,
          badge: 'आधुनिक दूरबिन शल्यक्रिया',
        },
      ],
      facilitiesTitle: 'हाम्रा सुविधाहरू तथा प्रयोगशालाको क्षमता',
      facilitiesSubtitle: 'शिशुको भ्रूण सुरक्षित राख्न र सफलता दर उच्च बनाउन प्रयोग गरिएका प्रविधिहरू।',
      facilities: [
        {
          title: 'क्लास १०,००० / ISO ५ क्लिनरुम ल्याब',
          desc: 'हावाको शुद्धता र तापक्रम नियन्त्रित प्रयोगशाला, जसले पाठेघर जस्तै वातावरण प्रदान गर्दछ।',
        },
        {
          title: 'ESCO MIRI मल्टिरुम इन्क्युबेटर',
          desc: 'हरेक बिरामीको भ्रूणलाई छुट्टाछुट्टै च्याम्बरमा बिनाकुनै बाधा हुर्काउने आधुनिक उपकरण।',
        },
        {
          title: 'Narishige रोबोटिक माइक्रोम्यानिपुलेटर',
          desc: 'एउटा मात्र उत्कृष्ट शुक्रकिट छानेर डिम्बभित्र प्रवेश गराउने (ICSI) जापानी प्रविधि।',
        },
        {
          title: 'अस्पतालभित्र २४सै घण्टा Level II/III NICU',
          desc: 'समयभन्दा अगाडि जन्मिने वा विशेष हेरचाह चाहिने नवजात शिशुका लागि मौलकालिका अस्पतालमा २४सै घण्टा भेन्टिलेटर र बालरोग विशेषज्ञ उपलब्ध।',
        },
      ],
      learnFacilities: 'सम्पूर्ण प्रविधि तथा सुविधाहरू हेर्नुहोस्',
      specialistsTitle: 'हाम्रो चिकित्सक नेतृत्व',
      specialistsSubtitle: 'चितवनमा प्रजनन तथा प्रसूति सेवाको नेतृत्व गरिरहनुभएका प्रमुख विशेषज्ञहरू।',
      viewAllDoctors: 'सबै ८ जना विशेषज्ञ डाक्टरहरूको विवरण',
      ctaTitle: 'सन्तान सुखको यात्रा आजै सुरु गर्नुहोस्',
      ctaSubtitle: 'मौलकालिका अस्पताल, भरतपुर-११, चितवनमा डा. अनुषा तिवारी तथा विशेषज्ञ समूहसँग निःशुल्क परामर्श लिनुहोस्।',
      ctaButton: 'परामर्श बुक गर्नुहोस्',
    },
  }[language];

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#F9FAFC] via-white to-white pt-8 pb-16 md:pt-14 md:pb-24 border-b border-slate-100">
        <div className="absolute top-0 right-0 -mr-32 -mt-32 w-96 h-96 rounded-full bg-[#FCEEF1] blur-3xl opacity-60 pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-32 -mb-32 w-96 h-96 rounded-full bg-slate-100 blur-3xl opacity-70 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* HERO PROPOSITION */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 text-xs font-semibold bg-[#FCEEF1] text-[#C96D83] px-3.5 py-1.5 rounded-full">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{t.badge}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-extrabold text-[#1D3B58] tracking-tight leading-[1.15] text-balance">
                {t.headline}
              </h1>

              <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                {t.intro}
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <button
                  onClick={() => onOpenBooking(undefined, 'chitwan')}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#E48AA0] hover:bg-[#D4748B] text-white px-7 py-3.5 rounded-xl font-bold text-base shadow-md transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                >
                  <Calendar className="w-5 h-5" />
                  <span>{t.bookCta}</span>
                  <ArrowRight className="w-5 h-5" />
                </button>

                <button
                  onClick={() => onNavigate('/about')}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-slate-300 hover:border-[#1D3B58] text-[#1D3B58] bg-white hover:bg-slate-50 px-6 py-3.5 rounded-xl font-semibold text-base transition-colors cursor-pointer"
                >
                  <span>About Our Clinic</span>
                </button>
              </div>

              {/* REASSURANCE STRIP */}
              <div className="pt-2 flex items-center justify-center lg:justify-start gap-6 text-xs text-slate-500">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>NMC Registered Specialists</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <Heart className="w-4 h-4 text-[#E48AA0]" />
                  <span>Ethical Transparency</span>
                </span>
                <span className="hidden sm:flex items-center gap-1.5">
                  <Building2 className="w-4 h-4 text-[#2B5A88]" />
                  <span>Maulakalika Hospital, Chitwan</span>
                </span>
              </div>
            </div>

            {/* HERO PHOTOGRAPHY */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="relative rounded-2xl overflow-hidden shadow-xl border-4 border-white aspect-4/3 sm:aspect-16/11">
                  <img
                    src={IMAGES.heroConsultation}
                    alt="Doctor consulting warmly with couple at Mamata International Fertility Centre"
                    className="w-full h-full object-cover object-center"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />

                  <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-xs p-3.5 rounded-xl shadow-lg border border-white/50 flex items-center justify-between">
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-[#1D3B58]">
                        Dr. Anusha Tiwari & Clinical Team
                      </h4>
                      <p className="text-[11px] text-slate-500 font-medium">
                        Focal Person · MBBS, MD (OBG/GYN), Fellow Repro Med
                      </p>
                    </div>
                    <button
                      onClick={() => onOpenBooking(drAnusha.name, 'chitwan')}
                      className="bg-[#E48AA0] hover:bg-[#D4748B] text-white text-[11px] font-semibold px-3 py-1.5 rounded-lg shrink-0 transition-colors cursor-pointer"
                    >
                      Book Slot
                    </button>
                  </div>
                </div>

                <div className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 bg-[#1D3B58] text-white py-2 px-3.5 rounded-xl shadow-md border-2 border-white flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#E48AA0]" />
                  <span className="text-xs font-bold tracking-tight">Maulakalika Hospital, Bharatpur-11</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. CLINIC PROFILE & INTRODUCTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-bold text-[#E48AA0] uppercase tracking-wider">
                Clinic Profile
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1D3B58] tracking-tight">
                {t.aboutTitle}
              </h2>
              <p className="text-slate-500 font-medium text-sm sm:text-base">
                {t.aboutSubtitle}
              </p>
              <p className="text-slate-600 text-sm leading-relaxed">
                {t.aboutText1}
              </p>
              <p className="text-slate-600 text-sm leading-relaxed">
                {t.aboutText2}
              </p>

              <div className="pt-2">
                <button
                  onClick={() => onNavigate('/about')}
                  className="inline-flex items-center gap-2 text-sm font-bold text-[#1D3B58] hover:text-[#E48AA0] transition-colors cursor-pointer"
                >
                  <span>Read Full Clinic History & Leadership</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 bg-[#F9FAFC] p-6 sm:p-8 rounded-2xl border border-slate-200 space-y-4">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Clinic at a Glance
              </div>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-700">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Campus:</strong> Maulakalika Hospital Pvt. Ltd., Bharatpur-11, Chitwan</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Embryology:</strong> Class 10,000 cleanroom with ESCO MIRI incubators</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Fetal Ultrasound:</strong> High-definition 5D imaging with Dr. Ramesh Ghimire</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Emergency / Neonatal:</strong> 24/7 on-site Level II/III NICU and OT facilities</span>
                </li>
              </ul>
              <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
                <span>OPD Hours: Sun–Fri 7:30 AM – 7:30 PM</span>
                <span className="font-semibold text-[#1D3B58]">056-493798</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. MISSION, VISION & CORE VALUES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold text-[#E48AA0] uppercase tracking-wider">
            Our Guiding Philosophy
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1D3B58] tracking-tight">
            {t.mvTitle}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-[#1D3B58] to-[#2B5A88] text-white p-8 rounded-3xl space-y-3 shadow-sm">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#E48AA0] bg-white/10 px-3 py-1 rounded-full">
              <span>{t.missionTitle}</span>
            </div>
            <p className="text-sm sm:text-base text-slate-100 leading-relaxed font-normal">
              {t.missionText}
            </p>
          </div>

          <div className="bg-[#122538] text-white p-8 rounded-3xl space-y-3 shadow-sm">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#E48AA0] bg-white/10 px-3 py-1 rounded-full">
              <span>{t.visionTitle}</span>
            </div>
            <p className="text-sm sm:text-base text-slate-100 leading-relaxed font-normal">
              {t.visionText}
            </p>
          </div>
        </div>

        {/* 4 Core Values */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          {t.values.map((val, idx) => (
            <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-200/90 space-y-1.5 shadow-2xs">
              <span className="text-xs font-bold text-[#C96D83] block uppercase tracking-wider">
                0{idx + 1}. {val.label}
              </span>
              <p className="text-xs text-slate-600 leading-relaxed">
                {val.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. OVERVIEW OF MAJOR HEALTHCARE SERVICES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <span className="text-xs font-bold text-[#E48AA0] uppercase tracking-wider">
              Clinical Specializations
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1D3B58] tracking-tight">
              {t.pillarsTitle}
            </h2>
            <p className="text-slate-600 text-sm max-w-xl">
              {t.pillarsSubtitle}
            </p>
          </div>

          <button
            onClick={() => onNavigate('/fertility-treatments')}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#1D3B58] hover:text-[#E48AA0] transition-colors shrink-0 cursor-pointer"
          >
            <span>View All Treatments & Services</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-[#E48AA0] hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-[#FCEEF1] text-[#C96D83] flex items-center justify-center group-hover:bg-[#E48AA0] group-hover:text-white transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider bg-slate-100 px-2 py-0.5 rounded">
                      {pillar.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-bold text-base text-[#1D3B58] group-hover:text-[#2B5A88] transition-colors">
                      {pillar.title}
                    </h3>
                    <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>
                </div>

                <div className="pt-5 mt-4 border-t border-slate-100">
                  <button
                    onClick={() => onNavigate(pillar.link)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1D3B58] hover:text-[#E48AA0] transition-colors cursor-pointer"
                  >
                    <span>{pillar.action}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. CLINIC'S FACILITIES & STRENGTHS */}
      <section className="bg-[#F9FAFC] py-16 border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2">
              <span className="text-xs font-bold text-[#E48AA0] uppercase tracking-wider">
                Laboratory & Hospital Infrastructure
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1D3B58] tracking-tight">
                {t.facilitiesTitle}
              </h2>
              <p className="text-slate-600 text-sm max-w-xl">
                {t.facilitiesSubtitle}
              </p>
            </div>

            <button
              onClick={() => onNavigate('/facilities')}
              className="inline-flex items-center gap-1.5 bg-[#1D3B58] hover:bg-[#2B5A88] text-white px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold shadow-xs transition-colors shrink-0 cursor-pointer"
            >
              <span>{t.learnFacilities}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.facilities.map((fac, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 space-y-2 shadow-2xs">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center text-xs font-bold">
                  ✓
                </div>
                <h3 className="font-bold text-sm text-[#1D3B58]">
                  {fac.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {fac.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. BRIEF SPECIALIST SPOTLIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <span className="text-xs font-bold text-[#E48AA0] uppercase tracking-wider">
              Specialist Leadership
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1D3B58] tracking-tight">
              {t.specialistsTitle}
            </h2>
            <p className="text-slate-600 text-sm max-w-xl">
              {t.specialistsSubtitle}
            </p>
          </div>

          <button
            onClick={() => onNavigate('/doctors')}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#1D3B58] hover:text-[#E48AA0] transition-colors shrink-0 cursor-pointer"
          >
            <span>{t.viewAllDoctors}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Dr. Anusha Tiwari */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 flex flex-col sm:flex-row gap-6 items-center shadow-xs">
            <div className="w-32 h-32 sm:w-40 sm:h-40 shrink-0 rounded-2xl overflow-hidden bg-slate-100 border-2 border-slate-100">
              {drAnusha.image ? (
                <img
                  src={drAnusha.image}
                  alt={drAnusha.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top"
                />
              ) : (
                <div className="w-full h-full bg-[#1D3B58] text-white flex items-center justify-center font-bold">
                  {drAnusha.name}
                </div>
              )}
            </div>

            <div className="space-y-2 text-center sm:text-left flex-1">
              <span className="text-[11px] font-bold text-[#C96D83] uppercase tracking-wider bg-[#FCEEF1] px-2.5 py-0.5 rounded-full inline-block">
                Clinical Focal Person
              </span>
              <h3 className="text-xl font-bold text-[#1D3B58]">{drAnusha.name}</h3>
              <p className="text-xs font-semibold text-[#E48AA0]">{drAnusha.role}</p>
              <p className="text-xs text-slate-500 line-clamp-2">{drAnusha.bio}</p>

              <div className="pt-2 flex flex-wrap gap-2 justify-center sm:justify-start">
                <button
                  onClick={() => onNavigate(`/doctors/${drAnusha.id}`)}
                  className="text-xs font-bold text-[#1D3B58] hover:text-[#E48AA0] py-1.5 px-3 bg-slate-50 hover:bg-[#FCEEF1] rounded-lg border border-slate-200 transition-colors cursor-pointer"
                >
                  View Full Bio
                </button>
                <button
                  onClick={() => onOpenBooking(drAnusha.name, 'chitwan')}
                  className="text-xs font-bold text-white bg-[#E48AA0] hover:bg-[#D4748B] py-1.5 px-3 rounded-lg transition-colors cursor-pointer"
                >
                  Book Slot
                </button>
              </div>
            </div>
          </div>

          {/* Dr. Ramesh Ghimire */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 flex flex-col sm:flex-row gap-6 items-center shadow-xs">
            <div className="w-32 h-32 sm:w-40 sm:h-40 shrink-0 rounded-2xl overflow-hidden bg-slate-100 border-2 border-slate-100">
              {drRamesh.image ? (
                <img
                  src={drRamesh.image}
                  alt={drRamesh.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top"
                />
              ) : (
                <div className="w-full h-full bg-[#1D3B58] text-white flex items-center justify-center font-bold">
                  {drRamesh.name}
                </div>
              )}
            </div>

            <div className="space-y-2 text-center sm:text-left flex-1">
              <span className="text-[11px] font-bold text-purple-700 uppercase tracking-wider bg-purple-50 px-2.5 py-0.5 rounded-full inline-block">
                Lead Ultrasound & 5D Sonologist
              </span>
              <h3 className="text-xl font-bold text-[#1D3B58]">{drRamesh.name}</h3>
              <p className="text-xs font-semibold text-[#E48AA0]">{drRamesh.role}</p>
              <p className="text-xs text-slate-500 line-clamp-2">{drRamesh.bio}</p>

              <div className="pt-2 flex flex-wrap gap-2 justify-center sm:justify-start">
                <button
                  onClick={() => onNavigate(`/doctors/${drRamesh.id}`)}
                  className="text-xs font-bold text-[#1D3B58] hover:text-[#E48AA0] py-1.5 px-3 bg-slate-50 hover:bg-[#FCEEF1] rounded-lg border border-slate-200 transition-colors cursor-pointer"
                >
                  View Full Bio
                </button>
                <button
                  onClick={() => onOpenBooking(drRamesh.name, 'chitwan')}
                  className="text-xs font-bold text-white bg-[#E48AA0] hover:bg-[#D4748B] py-1.5 px-3 rounded-lg transition-colors cursor-pointer"
                >
                  Book Slot
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. CLEAR APPOINTMENT CALL-TO-ACTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#1D3B58] via-[#244566] to-[#2B5A88] text-white rounded-3xl p-8 sm:p-12 shadow-lg">
          <div className="max-w-3xl space-y-4">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#E48AA0] bg-white/10 px-3 py-1 rounded-full">
              <Calendar className="w-4 h-4" />
              <span>Begin With Confidence</span>
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight">
              {t.ctaTitle}
            </h2>
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-normal">
              {t.ctaSubtitle}
            </p>
            <div className="pt-2 flex flex-wrap gap-4">
              <button
                onClick={() => onOpenBooking(undefined, 'chitwan')}
                className="bg-[#E48AA0] hover:bg-[#D4748B] text-white px-7 py-3.5 rounded-xl font-bold text-sm shadow-md transition-all cursor-pointer flex items-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>{t.ctaButton}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => onNavigate('/contact')}
                className="border border-white/40 hover:border-white text-white px-6 py-3.5 rounded-xl font-semibold text-sm transition-colors cursor-pointer"
              >
                Contact & Hospital Details
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 8. CHITWAN HOSPITAL CONTACT & INQUIRIES STRIP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-1.5">
              <span className="text-xs font-bold text-[#E48AA0] uppercase tracking-wider flex items-center gap-1.5">
                <MapPin className="w-4 h-4" />
                <span>Hospital Location & Direct Lines</span>
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-[#1D3B58]">
                Maulakalika Hospital Pvt. Ltd., Bharatpur-11, Chitwan
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Direct Hotline: <strong className="text-[#1D3B58] font-mono">056-493798 | 056-493738</strong> · Official WhatsApp: <strong className="text-emerald-700 font-mono">9855088798</strong>
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href="tel:056493798"
                className="bg-[#1D3B58] hover:bg-[#2B5A88] text-white px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-colors flex items-center gap-2 cursor-pointer"
              >
                <Phone className="w-4 h-4 text-[#E48AA0]" />
                <span>Call 056-493798</span>
              </a>
              <a
                href="https://wa.me/9779855088798"
                target="_blank"
                rel="noreferrer"
                className="bg-[#25D366] hover:bg-[#1EBE5D] text-white px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-colors flex items-center gap-2 shadow-xs cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>
              <button
                onClick={() => onNavigate('/contact')}
                className="bg-slate-100 hover:bg-[#FCEEF1] text-[#1D3B58] hover:text-[#C96D83] px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-colors cursor-pointer border border-slate-200"
              >
                Map & Directions
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
