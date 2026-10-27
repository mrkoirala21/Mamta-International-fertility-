import React from 'react';
import Breadcrumbs from '../components/Breadcrumbs';
import {
  Activity,
  Microscope,
  Eye,
  Calendar,
  CheckCircle2,
  FileText,
  Clock,
  Phone,
  ArrowRight,
  ShieldCheck,
  Stethoscope,
} from 'lucide-react';

interface DiagnosticsPageProps {
  onNavigate: (path: string) => void;
  onOpenBooking: (doctorName?: string, branchId?: string, treatment?: string) => void;
  language?: 'en' | 'ne';
}

export const DiagnosticsPage: React.FC<DiagnosticsPageProps> = ({
  onNavigate,
  onOpenBooking,
  language = 'en',
}) => {
  const diagnosticServices = [
    {
      id: 'hormone-profile',
      title: 'Complete Reproductive Hormonal Profile',
      nepaliTitle: 'हर्मोनल प्रोफाइल परीक्षण (AMH, FSH, LH)',
      category: 'Endocrinology',
      summary: 'Precision blood panels measuring vital reproductive hormones to formulate tailored stimulation protocols.',
      tests: [
        'Serum AMH (Anti-Müllerian Hormone) quantification for ovarian reserve',
        'Day 2/3 Pituitary gonadotropins (FSH & LH ratio)',
        'Serum Estradiol (E2) and Progesterone baseline and luteal checks',
        'Metabolic exclusion: Thyroid (Free T3, Free T4, TSH) & Serum Prolactin',
        'Male endocrine evaluation: Serum Total Testosterone, LH & FSH'
      ],
      turnaround: 'Same-day report (3–4 hours)'
    },
    {
      id: 'ultrasound-scans',
      title: 'High-Resolution Pelvic & 5D Sonography Scans',
      nepaliTitle: '५D तथा ट्रान्सभेजाइनल अल्ट्रासाउन्ड परीक्षण',
      category: 'Imaging',
      summary: 'Supervised under Diagnostic Sonography Specialist Dr. Ramesh Ghimire with advanced high-definition acoustic profiling.',
      tests: [
        'Transvaginal Antral Follicle Count (AFC) & ovarian volume assessment',
        'Serial Follicular Tracking for ovulation induction and IVF cycles',
        'High-definition 3D Uterine Cavity Reconstruction for anomalies and septa',
        '5D Real-Time Volumetric Fetal Anomaly and Growth Doppler Scans',
        'Scrotal Color Doppler Sonography for male varicocele diagnosis'
      ],
      turnaround: 'Immediate live report with physician review'
    },
    {
      id: 'semen-analysis',
      title: 'Computer-Assisted Semen Analysis (CASA & DFI)',
      nepaliTitle: 'कम्प्युटर-असिस्टेड वीर्य परीक्षण (CASA & DFI)',
      category: 'Andrology Lab',
      summary: 'Strict adherence to WHO 6th edition laboratory invariants, evaluating sperm count, progressive motility, and DNA fragmentation.',
      tests: [
        'Microscopic sperm concentration, vitality, and progressive motility',
        'Strict Kruger morphological evaluation under high magnification',
        'Sperm DNA Fragmentation Index (DFI) for unexplained or recurrent failure',
        'Post-centrifugation pellet search in suspected severe azoospermia',
        'Semen culture and sensitivity testing for asymptomatic micro-infections'
      ],
      turnaround: 'Report delivered within 2 hours'
    },
    {
      id: 'tubal-patency',
      title: 'Fallopian Tubal Patency (HSG & HyCoSy)',
      nepaliTitle: 'डिम्बवाहिनी नली खुला रहेको जाँच (HSG / HyCoSy)',
      category: 'Tubal Diagnostics',
      summary: 'Evaluating bilateral fallopian tube openness and uterine contour to ensure smooth natural sperm-egg transport.',
      tests: [
        'Digital Hysterosalpingography (HSG) with gentle water-soluble contrast',
        'Hysterosalpingo-Foam/Contrast Sonography (HyCoSy) without radiation exposure',
        'Hydrosalpinx detection and fluid leakage risk assessment prior to IVF',
        'Uterine synechiae (Asherman syndrome) and endometrial polyp mapping'
      ],
      turnaround: 'Performed post-menstrual (Days 7–10); instant report'
    },
    {
      id: 'hysteroscopy',
      title: 'Office Diagnostic & Operative Hysteroscopy',
      nepaliTitle: 'अत्याधुनिक अफिस हिस्टेरोस्कोपी',
      category: 'Endoscopic Examination',
      summary: 'Direct visual inspection of the uterine cavity using ultra-fine Karl Storz micro-telescopes without cervical dilatation.',
      tests: [
        'Direct 4K optical visualization of the endometrial cavity',
        'Targeted micro-polypectomy and submucosal fibroid resection',
        'Endometrial scratching and cytokine priming for recurrent implantation failure',
        'Gentle release of intrauterine adhesions (Asherman syndrome)'
      ],
      turnaround: 'Day procedure; 15–20 minutes with zero downtime'
    }
  ];

  return (
    <div className="min-w-0 bg-[#F9FAFC] pb-20">
      <div className="bg-white border-b border-slate-100">
        <Breadcrumbs
          items={[{ label: 'Diagnostics & Fertility Testing' }]}
          onNavigate={onNavigate}
        />
      </div>

      {/* HERO */}
      <section className="bg-gradient-to-b from-white to-[#F9FAFC] pt-12 pb-14 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5 text-center max-w-4xl">
          <div className="text-xs font-bold text-[#E48AA0] uppercase tracking-wider">
            Precision Clinical Pathology & Imaging
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1D3B58] tracking-tight">
            Comprehensive Diagnostics & Fertility Testing
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Accurate diagnosis is the foundation of successful treatment. At Maulakalika Hospital Pvt. Ltd., our in-house hormone laboratory, 5D ultrasound suite, and computer-assisted andrology lab deliver same-day verified answers without redundant tests.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
            <button
              onClick={() => onOpenBooking(undefined, 'chitwan', 'Diagnostic Workup')}
              className="bg-[#E48AA0] hover:bg-[#D4748B] text-white px-6 py-3 rounded-xl font-bold text-sm shadow-sm transition-all cursor-pointer flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Diagnostic Evaluation</span>
            </button>
            <a
              href="tel:056493798"
              className="bg-white hover:bg-slate-50 text-[#1D3B58] border border-slate-200 px-5 py-3 rounded-xl font-bold text-sm transition-colors cursor-pointer flex items-center gap-2"
            >
              <Phone className="w-4 h-4 text-[#E48AA0]" />
              <span>Diagnostic Helpline: 056-493798</span>
            </a>
          </div>
        </div>
      </section>

      {/* DIAGNOSTIC INVESTIGATIONS LIST */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        <div className="space-y-8">
          {diagnosticServices.map((service, idx) => (
            <div
              key={service.id}
              className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-5"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
                <div>
                  <span className="text-xs font-bold text-[#E48AA0] uppercase tracking-wider">
                    {service.category} · Investigation 0{idx + 1}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#1D3B58] mt-0.5">
                    {language === 'en' ? service.title : service.nepaliTitle}
                  </h3>
                </div>
                <div className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-lg shrink-0 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>{service.turnaround}</span>
                </div>
              </div>

              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                {service.summary}
              </p>

              <div className="space-y-2.5 pt-2">
                <span className="text-xs font-bold text-[#1D3B58] block">Key Investigations Included:</span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {service.tests.map((test, i) => (
                    <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-[#F9FAFC] border border-slate-200/70 text-xs sm:text-sm text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{test}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => onOpenBooking(undefined, 'chitwan', service.title)}
                  className="bg-[#1D3B58] hover:bg-[#2B5A88] text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                >
                  Book This Diagnostic Test
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default DiagnosticsPage;
