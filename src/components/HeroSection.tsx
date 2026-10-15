import React from 'react';
import { ArrowRight, ShieldCheck, Heart, Award, Sparkles, PhoneCall } from 'lucide-react';

interface HeroSectionProps {
  onOpenBooking: () => void;
  language?: 'en' | 'ne';
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenBooking, language = 'en' }) => {
  const content = {
    en: {
      kicker: 'Nepal’s Premier Assisted Reproductive & IVF Centre',
      headline: 'Empowering Your Journey to Parenthood with Care & Excellence',
      subheadline:
        'World-class IVF and fertility treatments in Nepal with advanced cleanroom embryology labs, transparent pricing, and deeply compassionate personalized care.',
      primaryCta: 'Book a Free Consultation',
      secondaryCta: 'Explore Treatments',
      proof: [
        { label: 'Cleanroom Embryology Lab', value: 'Class 10,000', sub: 'Ultra-Pure ISO Standard' },
        { label: 'Happy Families', value: '10,000+', sub: 'From everywhere' },
        { label: 'Clinical Pregnancy Rate', value: 'Up to 72%', sub: 'Day 5 Blastocyst FET' },
        { label: 'Couples & Families Served', value: 'From Everywhere', sub: 'Across Nepal & Abroad' },
      ],
      badgeTitle: 'Led by Dr. Anusha Tiwari',
      badgeSubtitle: 'Focal Person | MBBS, MD (OBG/GYN), Fellow Repro Med',
    },
    ne: {
      kicker: 'नेपालकै अग्रणी आइ.भि.एफ. तथा प्रजनन उपचार केन्द्र',
      headline: 'अभिभावक बन्ने तपाईंको सपनालाई माया र विश्वासका साथ साकार पार्दै',
      subheadline:
        'नेपालमै अन्तर्राष्ट्रिय स्तरको प्रविधि, अत्याधुनिक भ्रूण प्रयोगशाला, पारदर्शी शुल्क र ममतामयी व्यक्तिगत हेरचाहका साथ विश्वस्तरीय निःसन्तानता उपचार।',
      primaryCta: 'निःशुल्क परामर्श लिनुहोस्',
      secondaryCta: 'उपचार तथा सेवाहरू हेर्नुहोस्',
      proof: [
        { label: 'क्लिनरुम भ्रूण ल्याब', value: 'क्लास १०,०००', sub: 'अन्तर्राष्ट्रिय मापदण्ड' },
        { label: 'खुसी दम्पतीहरू', value: '१०,०००+', sub: 'सबैतिरबाट' },
        { label: 'क्लिनिकल सफलता दर', value: '७२% सम्म', sub: 'ब्लास्टोसिस्ट FET' },
        { label: 'दम्पतीहरूको रोजाइ', value: 'सबैतिरबाट', sub: 'नेपाल तथा विदेश' },
      ],
      badgeTitle: 'डा. अनुषा तिवारी (फोकल पर्सन)',
      badgeSubtitle: 'MBBS, MD (OBG/GYN), फेलोसिप इन रिप्रोडक्टिभ मेडिसिन',
    },
  }[language];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#F9FAFC] via-white to-white pt-8 pb-16 md:pt-12 md:pb-24 border-b border-slate-100">
      {/* Background Soft Glow Orbs */}
      <div className="absolute top-0 right-0 -mr-32 -mt-32 w-96 h-96 rounded-full bg-[#FCEEF1] blur-3xl opacity-60 pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-32 -mb-32 w-96 h-96 rounded-full bg-slate-100 blur-3xl opacity-70 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* LEFT COLUMN: HERO PROPOSITION */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Top kicker */}
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#1D3B58] bg-[#FCEEF1] text-[#C96D83] px-3.5 py-1.5 rounded-full">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{content.kicker}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-extrabold text-[#1D3B58] tracking-tight leading-[1.15] text-balance">
              {content.headline}
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              {content.subheadline}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={onOpenBooking}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#E48AA0] hover:bg-[#D4748B] text-white px-7 py-3.5 rounded-xl font-bold text-base shadow-md transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>{content.primaryCta}</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <a
                href="#treatments"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-slate-300 hover:border-[#1D3B58] text-[#1D3B58] bg-white hover:bg-slate-50 px-6 py-3.5 rounded-xl font-semibold text-base transition-colors"
              >
                <span>{content.secondaryCta}</span>
              </a>
            </div>

            {/* Quick emergency reassurance */}
            <div className="pt-2 flex items-center justify-center lg:justify-start gap-6 text-xs text-slate-500">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>100% Confidential Care</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Heart className="w-4 h-4 text-[#E48AA0]" />
                <span>Zero Hidden Fees</span>
              </span>
              <span className="hidden sm:flex items-center gap-1.5">
                <Award className="w-4 h-4 text-[#2B5A88]" />
                <span>Government Certified</span>
              </span>
            </div>
          </div>

          {/* RIGHT COLUMN: HERO MEDIA CARD */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main Image Container */}
              <div className="relative rounded-2xl overflow-hidden shadow-xl border-4 border-white aspect-4/3 sm:aspect-16/11">
                <img
                  src="/src/assets/images/hero_fertility_consultation_1791911165896.jpg"
                  alt="Doctor consulting warmly with couple at Mamata International Fertility Centre"
                  className="w-full h-full object-cover object-center"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />

                {/* Floating Doctor Signature Tag */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-xs p-3.5 rounded-xl shadow-lg border border-white/50 flex items-center justify-between">
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-[#1D3B58]">
                      {content.badgeTitle}
                    </h4>
                    <p className="text-[11px] text-slate-500 font-medium">
                      {content.badgeSubtitle}
                    </p>
                  </div>
                  <button
                    onClick={onOpenBooking}
                    className="bg-[#E48AA0] hover:bg-[#D4748B] text-white text-[11px] font-semibold px-3 py-1.5 rounded-lg shrink-0 transition-colors"
                  >
                    Book Slot
                  </button>
                </div>
              </div>

              {/* Decorative Trust Badge */}
              <div className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 bg-[#1D3B58] text-white py-2 px-3.5 rounded-xl shadow-md border-2 border-white flex items-center gap-2">
                <Award className="w-4 h-4 text-[#E48AA0]" />
                <span className="text-xs font-bold tracking-tight">Maulakalika Hospital, Bharatpur-11, Chitwan</span>
              </div>
            </div>
          </div>

        </div>

        {/* SOCIAL PROOF BAR: METRIC STRIP */}
        <div className="mt-14 pt-8 border-t border-slate-200">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {content.proof.map((item, index) => (
              <div key={index} className="space-y-1">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1D3B58] tabular-nums tracking-tight">
                  {item.value}
                </div>
                <div className="text-xs sm:text-sm font-semibold text-slate-600">
                  {item.label}
                </div>
                {item.sub && (
                  <div className="text-[11px] font-bold text-[#C96D83]">
                    {item.sub}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default HeroSection;
