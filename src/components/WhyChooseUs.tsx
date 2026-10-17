import React from 'react';
import { Microscope, Banknote, Users, HeartHandshake, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';
import { IMAGES } from '../assets/images';

interface WhyChooseUsProps {
  onOpenBooking: () => void;
  language?: 'en' | 'ne';
}

export const WhyChooseUs: React.FC<WhyChooseUsProps> = ({ onOpenBooking, language = 'en' }) => {
  const content = {
    en: {
      sectionKicker: 'Clinical Excellence & Compassion',
      title: 'Why Choose Mamata International Fertility Centre?',
      subtitle:
        'We blend world-class embryological science with deep human empathy, giving every couple their highest scientific chance of holding a healthy baby in their arms.',
      pillars: [
        {
          icon: Microscope,
          title: 'Advanced Reproductive Tech',
          subtitle: 'Advanced Embryology & Robotic ICSI',
          description:
            'Equipped with ESCO MIRI® multi-room time-lapse incubators, laser-assisted hatching, and Narishige motorized micromanipulators that maintain ideal physiological conditions.',
          highlights: ['Continuous time-lapse embryo imaging', 'Laser-assisted zona hatching', 'Ultra-rapid closed vitrification'],
        },
        {
          icon: Banknote,
          title: 'High Success & Transparent Pricing',
          subtitle: 'No Surprise Invoices. Real Answers.',
          description:
            'We provide an itemized financial roadmap before your cycle begins. No hidden add-ons or unexpected pharmacy bills, combined with cumulative success rates over 72%.',
          highlights: ['Up to 72% blastocyst pregnancy rate', 'All-inclusive itemized packages', 'Affordable interest-free payment guidance'],
        },
        {
          icon: Users,
          title: 'Expert Specialists & Embryologists',
          subtitle: 'UK & Singapore Trained Medical Team',
          description:
            'Led by focal person Dr. Anusha Tiwari (MBBS, MD OBG/GYN, Fellowship in Reproductive Medicine) alongside certified senior clinical embryologists with more than 15 years of dedicated laboratory mastery.',
          highlights: ['Senior ESHRE certified embryologists', 'Full-time dedicated andrology unit', '130+ Successful parenthood journeys'],
        },
        {
          icon: HeartHandshake,
          title: 'Empathetic & Confidential Support',
          subtitle: 'You Are More Than a Case Number',
          description:
            'Infertility is deeply emotional. Every patient is paired with a dedicated care nurse and clinical counselor who provides gentle guidance, 24/7 hotline support, and complete privacy.',
          highlights: ['Dedicated patient care coordinator', 'Free couple counseling sessions', 'Discreet VIP consultation wings'],
        },
      ],
      labBadge: 'Certified Embryology Laboratory',
      labDesc: 'Constant laminar air flow, HEPA VOC filtration, and calibrated gas levels for maximum embryo viability.',
    },
    ne: {
      sectionKicker: 'उत्कृष्ट प्रविधि र ममतामयी सेवा',
      title: 'ममता इन्टरनेसनल फर्टिलिटी सेन्टर किन रोज्ने?',
      subtitle:
        'हामी अत्याधुनिक प्रयोगशाला विज्ञान र आत्मीय हेरचाहलाई एकसाथ जोडेर तपाईंको सन्तान सुखको सपनालाई साकार बनाउन समर्पित छौं।',
      pillars: [
        {
          icon: Microscope,
          title: 'अत्याधुनिक प्रजनन प्रविधि',
          subtitle: 'अत्याधुनिक भ्रूण प्रयोगशाला र रोबोटिक ICSI',
          description:
            'ESCO MIRI® मल्टिरुम इन्क्युबेटर, लेजर-असिस्टेड ह्याचिङ तथा अत्याधुनिक माइक्रोम्यानुपुलेटरहरू जसले भ्रूणलाई आमाको गर्भजस्तै सुरक्षित वातावरण प्रदान गर्दछ।',
          highlights: ['निरन्तर टाइम-ल्याप्स भ्रूण अवलोकन', 'लेजर असिस्टेड ह्याचिङ सुविधा', 'सुरक्षित क्रायोप्रिजर्भेसन बैंक'],
        },
        {
          icon: Banknote,
          title: 'उच्च सफलता र पारदर्शी शुल्क',
          subtitle: 'कुनै लुकेको अतिरिक्त खर्च छैन',
          description:
            'उपचार सुरु हुनुअगावै सम्पूर्ण शुल्कको स्पष्ट विवरण प्रदान गरिन्छ। ७२% सम्मको उच्च सफलता दरका साथ आर्थिक रूपमा पनि सहज योजना।',
          highlights: ['७२% सम्म उच्च सफलता दर', 'पारदर्शी प्याकेज प्रणाली', 'सुलभ र इमानदार परामर्श'],
        },
        {
          icon: Users,
          title: 'अनुभवी चिकित्सक तथा भ्रूणविज्ञ',
          subtitle: 'बेलायत र सिङ्गापुरबाट तालिमप्राप्त टोली',
          description:
            'डा. अनुषा तिवारी (फोकल पर्सन, MBBS, MD OBG/GYN, फेलोसिप इन रिप्रोडक्टिभ मेडिसिन) को नेतृत्वमा वरिष्ठ स्त्रीरोग तथा निःसन्तानता विशेषज्ञ र अनुभवी क्लिनिकल एम्ब्रियोलोजिस्टहरूको निरन्तर रेखदेख।',
          highlights: ['अन्तर्राष्ट्रिय मान्यताप्राप्त विज्ञहरू', 'समर्पित पुरुष निःसन्तानता युनिट', '१३०+ सफल अभिभावकत्व यात्राहरू'],
        },
        {
          icon: HeartHandshake,
          title: 'आत्मीय र गोप्य हेरचाह',
          subtitle: 'हरेक बिरामी हाम्रो परिवारजस्तै',
          description:
            'हामी निःसन्तानताको मानसिक र भावनात्मक पक्षलाई गहिरोसँग बुझ्छौं। २४सै घण्टा केयर सपोर्ट र पूर्ण गोपनीयताको प्रत्याभूति।',
          highlights: ['व्यक्तिगत केयर कोअर्डिनेटर', 'निःशुल्क मनोवैज्ञानिक परामर्श', 'एकान्त तथा मर्यादित वातावरण'],
        },
      ],
      labBadge: 'प्रमाणित भ्रूण प्रयोगशाला',
      labDesc: 'हेपा फिल्टर, स्थिर तापक्रम र उच्च प्रविधिमार्फत भ्रूणको गुणस्तर संरक्षण।',
    },
  }[language];

  return (
    <section id="about" className="py-16 md:py-24 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* SECTION HEADER */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="text-xs font-bold text-[#E48AA0] uppercase tracking-wider">
            {content.sectionKicker}
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1D3B58] tracking-tight">
            {content.title}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            {content.subtitle}
          </p>
        </div>

        {/* 4 PILLARS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {content.pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="bg-[#F9FAFC] rounded-2xl p-7 border border-slate-200/80 hover:border-[#E48AA0]/50 transition-all duration-200 hover:shadow-md flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 shadow-2xs flex items-center justify-center text-[#E48AA0] group-hover:bg-[#E48AA0] group-hover:text-white transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-[#1D3B58]">
                        {pillar.title}
                      </h3>
                      <p className="text-xs font-semibold text-slate-500">
                        {pillar.subtitle}
                      </p>
                    </div>
                  </div>

                  <p className="text-sm text-slate-600 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="pt-5 mt-5 border-t border-slate-200/60 space-y-1.5">
                  {pillar.highlights.map((h, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs font-medium text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* EMBRYOLOGY LAB FEATURE CALLOUT */}
        <div className="bg-[#1D3B58] rounded-2xl overflow-hidden shadow-lg border border-[#2A4D70]">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            {/* Lab Image */}
            <div className="lg:col-span-6 relative min-h-[260px] lg:min-h-full">
              <img
                src={IMAGES.advancedLab}
                alt="State of the art IVF and embryology laboratory at Mamata Fertility Centre"
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent lg:hidden" />
            </div>

            {/* Content info */}
            <div className="lg:col-span-6 p-7 sm:p-10 text-white flex flex-col justify-center space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-[#E48AA0] uppercase tracking-wider">
                <Sparkles className="w-4 h-4" />
                <span>{content.labBadge}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
                Where Life Begins: Precision Embryology Laboratory
              </h3>
              <p className="text-sm text-slate-200 leading-relaxed">
                {content.labDesc} Our multi-gas incubation matrices isolate embryos from outside air disturbances, reproducing the precise biochemistry of the human fallopian tube and uterus.
              </p>
              <div className="pt-2 flex flex-wrap gap-4">
                <button
                  onClick={onOpenBooking}
                  className="bg-[#E48AA0] hover:bg-[#D4748B] text-white px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-colors shadow-sm"
                >
                  Consult Our Specialists
                </button>
                <a
                  href="#treatments"
                  className="border border-slate-400 hover:border-white text-white px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition-colors"
                >
                  Learn About ICSI & Labs
                </a>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default WhyChooseUs;
