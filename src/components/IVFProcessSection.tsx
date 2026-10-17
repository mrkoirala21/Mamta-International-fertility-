import React, { useState } from 'react';
import {
  Calendar,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight,
  Microscope,
  Heart,
  Baby,
  ShieldCheck,
  Activity,
  ChevronRight,
  Phone,
  MessageSquare,
  Thermometer,
  Layers,
  FileText
} from 'lucide-react';

interface IVFProcessSectionProps {
  onOpenBooking: (doctorName?: string, branchId?: string, treatmentName?: string) => void;
  onNavigate?: (page: string, param?: string) => void;
  language?: 'en' | 'ne';
}

interface IVFStep {
  stepNumber: string;
  stageName: string;
  nepaliStageName: string;
  duration: string;
  overview: string;
  nepaliOverview: string;
  clinicalActions: string[];
  patientExperience: string;
  labStandard: string;
  iconName: 'consult' | 'stimulation' | 'retrieval' | 'lab' | 'transfer' | 'pregnancy';
}

const IVF_STEPS: IVFStep[] = [
  {
    stepNumber: '01',
    stageName: 'Initial Consultation & Diagnostic Evaluation',
    nepaliStageName: 'प्रारम्भिक परामर्श तथा शारीरिक परीक्षण',
    duration: 'Day 1–3 of Cycle',
    overview: 'Thorough reproductive assessment to identify the root biological factors and create a personalized stimulation protocol.',
    nepaliOverview: 'महिनावारीको पहिलो २-३ दिनभित्र डा. अनुषा तिवारीसँग विस्तृत परामर्श, पाठेघर तथा डिम्बाशयको भिडियो एक्सरे र हर्मोन जाँच।',
    clinicalActions: [
      'High-resolution transvaginal ultrasound for Antral Follicle Count (AFC)',
      'Baseline hormonal profiling: Serum AMH, FSH, LH, E2, and Thyroid Panel',
      'Advanced computer-assisted semen analysis (CASA) for male partner',
      'Individualized medication blueprint & confidential clinical consultation'
    ],
    patientExperience: 'Completely non-invasive outpatient visit. Discussion of medical history with Dr. Anusha Tiwari.',
    labStandard: 'Mindray DC-80 high-definition gynecological 3D/4D ultrasound scan',
    iconName: 'consult'
  },
  {
    stepNumber: '02',
    stageName: 'Controlled Ovarian Stimulation & Follicular Tracking',
    nepaliStageName: 'अण्डाशय उत्तेजना तथा फोलिकल ट्र्याकिङ',
    duration: 'Approx. 8–12 Days',
    overview: 'Gentle subcutaneous hormonal injections stimulate multiple follicles to maturity simultaneously rather than just one.',
    nepaliOverview: 'स्वस्थ र गुणस्तरीय अण्डाहरू विकास गर्न ८ देखि १२ दिनसम्म दैनिक सुई र नियमित सोनोग्राफी मार्फत अण्डाको आकार अनुगमन गरिन्छ।',
    clinicalActions: [
      'Self-administered or clinic-assisted ultra-fine subcutaneous injections (rFSH/hMG)',
      'Regular follicular monitoring via ultrasound (every 2–3 days)',
      'Serum Estradiol (E2) tracking to safeguard against ovarian hyperstimulation (OHSS)',
      'Final "Trigger Shot" (hCG or GnRH agonist) administered precisely 35–36 hours before retrieval'
    ],
    patientExperience: 'Very mild sensations, similar to light pre-menstrual fullness. Injections use microscopic needles with minimal discomfort.',
    labStandard: 'Cold-chain certified bio-identical gonadotropins with strict temperature adherence',
    iconName: 'stimulation'
  },
  {
    stepNumber: '03',
    stageName: 'Gentle Egg Retrieval (OPU) & Semen Preparation',
    nepaliStageName: 'अण्डा संकलन (OPU) तथा वीर्य तयारी',
    duration: 'Day 13–14 (20–30 min procedure)',
    overview: 'Mature oocytes are gently retrieved through ultrasound guidance while under mild twilight sedation. Zero surgical incisions.',
    nepaliOverview: 'बिरामीलाई कुनै दुखाइ नहुने गरी हल्का बेहोस बनाएर २०-३० मिनेटभित्र अल्ट्रासाउन्डको सहयोगले अण्डाहरू निकालिन्छ। सोही दिन वीर्य पनि संकलन गरिन्छ।',
    clinicalActions: [
      'Painless transvaginal ultrasound-guided follicular aspiration',
      'Immediate handover to adjacent embryology suite',
      'Density-gradient washing & swim-up motility harvesting of husband’s semen sample',
      'Patient rests comfortably in day-care recovery suite for 1–2 hours before going home'
    ],
    patientExperience: 'Completely asleep under twilight sedation; no stitches, no scars, and walk out comfortably on the same day.',
    labStandard: 'Advanced embryology suite with HEPA VOC filtration & heated stage aspiration pumps',
    iconName: 'retrieval'
  },
  {
    stepNumber: '04',
    stageName: 'ICSI Precision Fertilization & Day 5 Blastocyst Culture',
    nepaliStageName: 'ICSI प्रविधिद्वारा निषेचन र ब्लास्टोसिस्ट कल्चर',
    duration: 'Day 14–19 (5 Days in Lab)',
    overview: 'Using high-magnification micromanipulators, a single healthy sperm is injected into each mature egg, then nurtured to Day 5 blastocyst stage.',
    nepaliOverview: 'प्रयोगशालामा माइक्रोस्कोपको मद्दतले प्रत्येक स्वस्थ अण्डामा एक उत्कृष्ट शुक्रकिट प्रवेश गराइन्छ (ICSI) र ५ दिनसम्म अत्याधुनिक इन्क्युबेटरमा हुर्काइन्छ।',
    clinicalActions: [
      'Nikon Narishige micromanipulator-guided single sperm injection (ICSI)',
      'Continuous incubation inside ESCO MIRI® multi-room tri-gas chamber',
      'Rigorous monitoring of cleavage, compaction, and inner cell mass expansion',
      'Vitrification (ultra-rapid freezing) of surplus high-grade embryos in liquid nitrogen (-196°C)'
    ],
    patientExperience: 'Embryologists monitor your embryos daily and provide phone/WhatsApp updates on fertilization and blastocyst counts.',
    labStandard: 'ESCO MIRI® Multi-Room Incubators with independent 6-chamber temperature/gas regulation',
    iconName: 'lab'
  },
  {
    stepNumber: '05',
    stageName: 'Ultrasound-Guided Embryo Transfer (Fresh or Frozen FET)',
    nepaliStageName: 'पाठेघरमा भ्रूण प्रत्यारोपण (Embryo Transfer)',
    duration: 'Day 19–20 (or planned FET cycle)',
    overview: 'The highest-quality blastocyst is softly placed into the primed uterine cavity under direct abdominal ultrasound guidance.',
    nepaliOverview: 'तयार भएको उत्कृष्ट भ्रूणलाई नरम क्याथेटर मार्फत पाठेघरको भित्तामा राखिन्छ। यो प्रक्रिया बिल्कुलै दुखाइरहित हुन्छ र एनेस्थेसिया चाहिँदैन।',
    clinicalActions: [
      'Endometrial thickness optimization (8–12 mm trilaminar stripe)',
      'Soft catheter embryo loading under stereomicroscope',
      'Painless abdominal ultrasound-guided placement at ideal uterine fundus position',
      'Optional Laser-Assisted Hatching for enhanced implantation in indicated cases'
    ],
    patientExperience: 'Feels just like a standard pap smear or gentle routine pelvic checkup. No anesthesia needed. Rest for 20 minutes then return home.',
    labStandard: 'Wallace® soft echogenic embryo transfer catheters with dual-operator verification',
    iconName: 'transfer'
  },
  {
    stepNumber: '06',
    stageName: 'Luteal Phase Support & Pregnancy Confirmation',
    nepaliStageName: 'हर्मोनल सपोर्ट तथा गर्भावस्था परीक्षण',
    duration: '14 Days Post-Transfer',
    overview: 'Supportive progesterone and estrogen sustain the uterine lining. A blood beta-hCG test definitively confirms clinical pregnancy.',
    nepaliOverview: 'भ्रूण टाँसिन मद्दत गर्न प्रोजेस्टेरोन औषधि दिइन्छ। १४ औं दिनमा रगत जाँच (Beta-hCG) गरी गर्भावस्थाको खुसीको खबर पुष्टि गरिन्छ।',
    clinicalActions: [
      'Customized micronized progesterone support (vaginal, oral, or injectable)',
      'Continuous nursing team check-in and 24/7 hotline helpline support',
      'Day 14 Quantitative Serum Beta-hCG blood test confirmation',
      'First viability ultrasound scan at 6 weeks to confirm gestational sac and fetal heartbeat'
    ],
    patientExperience: 'Two weeks of gentle normal activities (no bed rest required). Dedicated WhatsApp reassurance from our clinical coordinators.',
    labStandard: 'Automated chemiluminescence analyzer for quantitative Beta-hCG hormone titers',
    iconName: 'pregnancy'
  }
];

export const IVFProcessSection: React.FC<IVFProcessSectionProps> = ({
  onOpenBooking,
  onNavigate,
  language = 'en',
}) => {
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const activeStep = IVF_STEPS[activeStepIndex];

  return (
    <section id="ivf-process" className="py-16 md:py-24 bg-white border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* SECTION HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#E48AA0] uppercase tracking-wider bg-[#FCEEF1] px-3.5 py-1.5 rounded-full">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{language === 'en' ? 'Clinical Treatment Pathway' : 'क्लिनिकल उपचार मार्ग'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1D3B58] tracking-tight">
              {language === 'en'
                ? 'IVF Process Step by Step: Your Journey to Parenthood'
                : 'आईभीएफ उपचारको सम्पूर्ण चरणबद्ध प्रक्रिया'}
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              {language === 'en'
                ? 'We demystify every clinical milestone into clear, transparent, and gentle stages. At Maulakalika Hospital Chitwan, you are supported by our senior faculty and advanced embryologists every single day.'
                : 'महिनावारीको पहिलो परामर्शदेखि सफल गर्भावस्था परीक्षणसम्मका ६ वटा मुख्य चरणहरूको सम्पूर्ण जानकारी। कुनै अन्योल र डर बिना पूर्ण आत्मविश्वासका साथ उपचार अघि बढाउनुहोस्।'}
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => onOpenBooking(undefined, 'chitwan', 'IVF')}
              className="inline-flex items-center gap-2 bg-[#E48AA0] hover:bg-[#D4748B] text-white px-5 py-3 rounded-xl font-bold text-xs sm:text-sm shadow-sm transition-all"
            >
              <Calendar className="w-4 h-4" />
              <span>{language === 'en' ? 'Start Your Cycle Consultation' : 'परामर्श बुक गर्नुहोस्'}</span>
            </button>
            {onNavigate && (
              <button
                onClick={() => onNavigate('journey')}
                className="inline-flex items-center gap-1.5 border border-slate-300 hover:border-[#1D3B58] text-[#1D3B58] px-4 py-3 rounded-xl font-semibold text-xs sm:text-sm bg-white hover:bg-slate-50 transition-colors"
              >
                <span>Full Journey Guide</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* STEP BUTTONS / TIMELINE SELECTOR */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
          {IVF_STEPS.map((step, idx) => {
            const isCurrent = activeStepIndex === idx;
            return (
              <button
                key={step.stepNumber}
                onClick={() => setActiveStepIndex(idx)}
                className={`p-3.5 sm:p-4 rounded-2xl text-left border transition-all relative flex flex-col justify-between group cursor-pointer ${
                  isCurrent
                    ? 'bg-[#1D3B58] text-white border-[#1D3B58] shadow-md ring-2 ring-[#E48AA0]'
                    : 'bg-[#F9FAFC] hover:bg-white text-slate-800 border-slate-200 hover:border-slate-300 shadow-2xs'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span
                    className={`text-xs font-mono font-extrabold px-2 py-0.5 rounded-md ${
                      isCurrent ? 'bg-[#E48AA0] text-white' : 'bg-slate-200 text-slate-700'
                    }`}
                  >
                    Step {step.stepNumber}
                  </span>
                  <span
                    className={`text-[10px] font-semibold ${
                      isCurrent ? 'text-slate-300' : 'text-slate-400'
                    }`}
                  >
                    {step.duration.split('(')[0].trim()}
                  </span>
                </div>

                <div className="mt-3">
                  <h4
                    className={`text-xs sm:text-sm font-bold line-clamp-2 leading-tight ${
                      isCurrent ? 'text-white' : 'text-[#1D3B58] group-hover:text-[#2B5A88]'
                    }`}
                  >
                    {language === 'en' ? step.stageName : step.nepaliStageName}
                  </h4>
                </div>

                {isCurrent && (
                  <div className="w-full h-1 bg-[#E48AA0] rounded-full mt-2.5" />
                )}
              </button>
            );
          })}
        </div>

        {/* ACTIVE STEP SPOTLIGHT CARD */}
        <div className="bg-[#F9FAFC] rounded-3xl border border-slate-200/90 p-6 sm:p-10 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* LEFT 7 COLS: STEP DETAILS */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="bg-[#1D3B58] text-white text-xs font-mono font-bold px-3 py-1 rounded-lg">
                    STAGE {activeStep.stepNumber} OF 06
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#C96D83] bg-[#FCEEF1] px-3 py-1 rounded-full">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{activeStep.duration}</span>
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#1D3B58] tracking-tight">
                  {language === 'en' ? activeStep.stageName : activeStep.nepaliStageName}
                </h3>

                <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                  {language === 'en' ? activeStep.overview : activeStep.nepaliOverview}
                </p>
              </div>

              {/* WHAT HAPPENS IN THIS STEP */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                  <Activity className="w-4 h-4 text-[#E48AA0]" />
                  <span>Clinical Milestones & Procedures:</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {activeStep.clinicalActions.map((action, i) => (
                    <div
                      key={i}
                      className="bg-white p-3.5 rounded-xl border border-slate-200 flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 shadow-2xs"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="leading-snug">{action}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* PATIENT COMFORT & EXPERIENCE */}
              <div className="p-4 bg-white rounded-2xl border border-slate-200 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-[#1D3B58] uppercase tracking-wider">
                  <Heart className="w-4 h-4 text-[#E48AA0]" />
                  <span>Patient Comfort & Experience:</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {activeStep.patientExperience}
                </p>
              </div>

              {/* LAB & TECHNOLOGY SPECIFICATION */}
              <div className="p-3.5 bg-[#FCEEF1] rounded-xl border border-[#F5D8E0] text-xs text-slate-700 flex items-start gap-2.5">
                <Microscope className="w-4 h-4 text-[#C96D83] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-[#C96D83] mr-1.5">Lab Standard:</span>
                  <span>{activeStep.labStandard}</span>
                </div>
              </div>

              {/* PREV / NEXT NAVIGATION BUTTONS */}
              <div className="flex items-center justify-between pt-2">
                <button
                  disabled={activeStepIndex === 0}
                  onClick={() => setActiveStepIndex((prev) => Math.max(0, prev - 1))}
                  className={`text-xs font-bold px-4 py-2 rounded-xl transition-colors ${
                    activeStepIndex === 0
                      ? 'text-slate-300 cursor-not-allowed'
                      : 'text-[#1D3B58] bg-white border border-slate-200 hover:bg-slate-100 cursor-pointer'
                  }`}
                >
                  ← Previous Step
                </button>

                <span className="text-xs text-slate-400 font-medium">
                  Step {activeStepIndex + 1} of {IVF_STEPS.length}
                </span>

                <button
                  disabled={activeStepIndex === IVF_STEPS.length - 1}
                  onClick={() => setActiveStepIndex((prev) => Math.min(IVF_STEPS.length - 1, prev + 1))}
                  className={`text-xs font-bold px-4 py-2 rounded-xl transition-colors ${
                    activeStepIndex === IVF_STEPS.length - 1
                      ? 'text-slate-300 cursor-not-allowed'
                      : 'text-white bg-[#1D3B58] hover:bg-[#2B5A88] cursor-pointer'
                  }`}
                >
                  Next Step →
                </button>
              </div>
            </div>

            {/* RIGHT 5 COLS: CLINIC SUMMARY & ONE-CLICK BOOKING */}
            <div className="lg:col-span-5 space-y-5">
              <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-5 shadow-xs">
                <div className="space-y-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#C96D83]">
                    Compassionate Chitwan Care
                  </span>
                  <h4 className="text-lg font-bold text-[#1D3B58]">
                    Questions About This IVF Phase?
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Every cycle is coordinated at Maulakalika Hospital Pvt. Ltd., Bharatpur-11 with individualized medication dosage and zero hidden billing.
                  </p>
                </div>

                <div className="space-y-2.5 pt-2 border-t border-slate-100 text-xs text-slate-700">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Strict ESHRE European laboratory protocols</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Continuous time-lapse multi-room incubation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-[#E48AA0] shrink-0" />
                    <span>Dedicated 1-on-1 embryology updates</span>
                  </div>
                </div>

                <div className="pt-2 space-y-2">
                  <button
                    onClick={() => onOpenBooking(undefined, 'chitwan', 'IVF Process')}
                    className="w-full bg-[#E48AA0] hover:bg-[#D4748B] text-white py-3 rounded-xl font-bold text-xs sm:text-sm shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Book Diagnostic Evaluation</span>
                  </button>

                  <div className="grid grid-cols-2 gap-2">
                    <a
                      href="tel:056493798"
                      className="inline-flex items-center justify-center gap-1.5 bg-[#1D3B58] hover:bg-[#152B40] text-white py-2.5 px-3 rounded-xl text-xs font-bold transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5 text-[#E48AA0]" />
                      <span>056-493798</span>
                    </a>
                    <a
                      href="https://wa.me/9779855088798"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 bg-[#25D366] hover:bg-[#1EBE5D] text-white py-2.5 px-3 rounded-xl text-xs font-bold transition-colors"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>WhatsApp</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* QUICK CLINIC STATS */}
              <div className="bg-gradient-to-br from-[#1D3B58] to-[#2B5A88] text-white p-5 rounded-2xl space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#E48AA0] uppercase tracking-wider">
                    Chitwan Embryology Lab
                  </span>
                  <span className="text-[11px] bg-white/20 px-2 py-0.5 rounded-full font-mono">
                    Advanced Suite
                  </span>
                </div>
                <p className="text-xs text-slate-200 leading-relaxed">
                  Located on the specialized IVF floor at Maulakalika Hospital, Bharatpur-11, equipped with medical gas manifolds and inverted micro-manipulator rigs.
                </p>
                <div className="pt-1 flex items-center justify-between text-xs font-semibold text-slate-300 border-t border-white/10">
                  <span>Maulakalika Hospital, Bharatpur</span>
                  <span className="text-[#E48AA0]">9855088798</span>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default IVFProcessSection;
