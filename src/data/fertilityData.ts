import { IMAGES } from '../assets/images';

export interface Treatment {
  id: string;
  category: 'assisted' | 'preservation' | 'male' | 'surgical';
  title: string;
  nepaliTitle: string;
  subtitle: string;
  badge: string;
  summary: string;
  description: string;
  idealFor: string[];
  processSteps: string[];
  duration: string;
  successIndicator: string;
  techHighlight: string;
}

export interface Doctor {
  id: string;
  name: string;
  nepaliName: string;
  role: string;
  nepaliRole: string;
  qualifications: string;
  fellowships: string[];
  experienceYears: number;
  fertilityExperienceYears?: number;
  obstetricsExperienceYears?: number;
  department?: 'fertility' | 'ultrasound' | 'obstetrics' | 'laparoscopic' | 'embryology' | 'andrology';
  pendingConfirmation?: boolean;
  serviceArea?: string;
  verificationNote?: string;
  image: string;
  specialties: string[];
  bio: string;
  availableDays: string;
  consultationFee: string;
  patientSatisfaction: string;
  subSpecialtyHighlight?: string;
  keyProcedures?: string[];
  clinicalHighlights?: string[];
}

export interface FertilityServiceItem {
  id: string;
  title: string;
  nepaliTitle: string;
  description: string;
  keyIncludes: string[];
  badge: string;
  icon: string;
}

export interface MaternityServiceItem {
  id: string;
  title: string;
  nepaliTitle: string;
  description: string;
  features: string[];
  badge: string;
  icon: string;
}

export interface SuccessStatItem {
  stat: string;
  title: string;
  nepaliTitle: string;
  subtitle: string;
  nepaliSubtitle: string;
  period: string;
  verificationStatus: string;
  highlight?: boolean;
}

export interface Branch {
  id: string;
  name: string;
  nepaliName: string;
  badge: string;
  address: string;
  district: string;
  phone: string;
  hotline: string;
  email: string;
  hours: string;
  saturdayHours: string;
  facilities: string[];
  mapEmbedUrl: string;
  whatsappNumber: string;
}

export interface Testimonial {
  id: string;
  parentNames: string;
  location: string;
  treatment: string;
  yearsTrying: string;
  quote: string;
  fullStory: string;
  babyName?: string;
  rating: number;
  verifiedPatient: boolean;
}

export interface CostPackage {
  id: string;
  name: string;
  subtitle: string;
  nprPrice: number;
  usdPrice: number;
  includes: string[];
  excludes: string[];
  popular?: boolean;
}

export interface FAQItem {
  id?: string;
  question: string;
  nepaliQuestion: string;
  answer: string;
  category: 'ivf' | 'cost' | 'process' | 'general' | 'male';
  keyTakeaway?: string;
  authorBadge?: string;
}

export const TREATMENTS: Treatment[] = [
  {
    id: 'ivf',
    category: 'assisted',
    title: 'In-Vitro Fertilization (IVF)',
    nepaliTitle: 'इन-भिट्रो फर्टिलाइजेसन (IVF)',
    subtitle: 'Comprehensive assisted reproduction with individualized stimulation',
    badge: 'Core Program',
    summary: 'Nepal’s gold standard IVF protocol combining advanced hormonal profiling, gentle stimulation, and precision embryology.',
    description: 'Our IVF program is tailored specifically to each couple’s reproductive biology. Eggs are carefully retrieved and fertilized with sperm in our ultra-pure cleanroom laboratory, nurtured until peak blastocyst stage before gentle embryo transfer.',
    idealFor: [
      'Blocked, damaged, or absent fallopian tubes',
      'Advanced maternal age or reduced ovarian reserve',
      'Endometriosis and polycystic ovary syndrome (PCOS)',
      'Unexplained fertility challenges after previous failed cycles'
    ],
    processSteps: [
      'Ovarian Stimulation & Ultrasound Tracking (10–12 days)',
      'Gentle Egg Retrieval under mild sedation (20–30 mins)',
      'Laboratory Fertilization & Culture in Tri-Gas Incubators',
      'Single/Double Blastocyst Transfer & Post-transfer support'
    ],
    duration: 'Approx. 3–4 weeks per cycle',
    successIndicator: 'Up to 72% cumulative clinical pregnancy rate',
    techHighlight: 'ESCO MIRI® Multi-room incubators with continuous time-lapse monitoring'
  },
  {
    id: 'icsi',
    category: 'assisted',
    title: 'Intracytoplasmic Sperm Injection (ICSI)',
    nepaliTitle: 'इन्ट्रासाइटोप्लाज्मिक स्पर्म इन्जेक्सन (ICSI)',
    subtitle: 'Single sperm micromanipulation for severe male factor infertility',
    badge: 'Micro-Tech',
    summary: 'A single high-motility, healthy sperm is injected directly into each mature egg using robotic micro-manipulators.',
    description: 'ICSI overcomes severe sperm count deficiencies, morphological abnormalities, or previous non-fertilization in standard IVF. Our senior embryologists utilize inverted high-magnification optics to select the most viable sperm.',
    idealFor: [
      'Very low sperm count (oligozoospermia)',
      'Poor sperm motility (asthenozoospermia) or abnormal morphology',
      'Sperm retrieved surgically via TESA or PESA',
      'Couples with prior IVF cycle fertilization failure'
    ],
    processSteps: [
      'Standardized egg retrieval and cumulus denudation',
      'High-magnification morphological sperm selection',
      'Direct micro-injection under Nikon Narishige micromanipulators',
      'Embryo culture to blastocyst stage'
    ],
    duration: 'Integrated seamlessly into IVF cycle',
    successIndicator: '75–85% fertilization rate per injected mature oocyte',
    techHighlight: 'Narishige motorized micromanipulator stations with heated stages'
  },
  {
    id: 'iui',
    category: 'assisted',
    title: 'Intrauterine Insemination (IUI)',
    nepaliTitle: 'इन्ट्राउटेरिन इन्सेमिनेसन (IUI)',
    subtitle: 'Gentle, minimally-invasive first-line fertility assistance',
    badge: 'First Line',
    summary: 'Specially concentrated, washed sperm is placed directly inside the uterus right at the precise hour of ovulation.',
    description: 'IUI is often recommended as a gentle, non-surgical first step for couples. We track ovulation through transvaginal follicular scans and trigger hCG precisely for optimal timing.',
    idealFor: [
      'Mild male factor infertility or boundary sperm parameters',
      'Cervical mucus hostility or unexplained short-term infertility',
      'Ejaculatory dysfunction or donor sperm insemination',
      'Younger couples starting assisted reproductive treatment'
    ],
    processSteps: [
      'Mild ovulation induction (oral tablets or low-dose gonadotropins)',
      'Serial transvaginal follicular tracking',
      'Laboratory sperm preparation (gradient separation & wash)',
      'Painless catheter insertion directly into the uterine cavity'
    ],
    duration: 'Single 15-minute procedure at ovulation',
    successIndicator: '18–25% clinical pregnancy rate per timed cycle',
    techHighlight: 'Double-density gradient wash optimizing progressive motility'
  },
  {
    id: 'blastocyst',
    category: 'assisted',
    title: 'Blastocyst Culture & Transfer',
    nepaliTitle: 'ब्लास्टोसिस्ट कल्चर र ट्रान्सफर',
    subtitle: 'Extended 5-day embryo growth for maximum implantation potential',
    badge: 'Lab Excellence',
    summary: 'Allowing embryos to develop until Day 5/6 (blastocyst stage) naturally filters the strongest embryos for transfer.',
    description: 'Extended culture mimics natural physiology, where embryos only enter the uterus on Day 5. This allows our embryology team to transfer a single high-grade blastocyst, maximizing pregnancy chances while drastically minimizing twin or triplet risks.',
    idealFor: [
      'Couples with multiple good embryos on Day 3',
      'Patients seeking single embryo transfer (eSET) to avoid multiples',
      'Recurrent early implantation failure after Day 3 transfers',
      'Candidates preparing for pre-implantation genetic testing (PGT)'
    ],
    processSteps: [
      'Extended incubation in sequential media up to Day 5/6',
      'Gardner grading of inner cell mass (ICM) and trophectoderm',
      'Selection of top-tier blastocyst for uterine transfer',
      'Vitrification of surplus surplus blastocysts for future siblings'
    ],
    duration: '5 to 6 days laboratory culture',
    successIndicator: '65–70% single-transfer implantation success',
    techHighlight: 'Closed multi-gas environmental control eliminating osmotic stress'
  },
  {
    id: 'cryopreservation',
    category: 'preservation',
    title: 'Egg & Sperm Freezing (Cryopreservation)',
    nepaliTitle: 'अण्डा तथा वीर्य फ्रिजिङ (क्रायोप्रिजर्भेसन)',
    subtitle: 'Preserve your biological fertility for the future with zero age-decay',
    badge: 'Preservation',
    summary: 'Ultra-fast vitrification technology freezes oocytes, sperm, or surplus embryos in liquid nitrogen at -196°C.',
    description: 'Whether you wish to pursue career milestones, travel, or are facing medical treatments such as oncology therapies, fertility preservation locks your current biological egg and sperm quality in time.',
    idealFor: [
      'Women in their 20s or 30s wishing to pause the biological clock',
      'Patients preparing for chemotherapy, radiation, or pelvic surgery',
      'Couples with surplus embryos from an ongoing IVF cycle',
      'Men traveling abroad (foreign employment / military) or facing low count'
    ],
    processSteps: [
      'Ovarian reserve check (AMH & AFC) or semen analysis',
      'Gentle stimulation protocol and retrieval',
      'Cryo-protectant dehydration and ultra-fast flash freeze (-196°C)',
      'Secure dual-monitored liquid nitrogen bio-banking tank storage'
    ],
    duration: '10–14 days for egg freezing; 1 day for sperm freezing',
    successIndicator: '95%+ post-thaw oocyte survival rate with vitrification',
    techHighlight: 'CryoLock® closed vitrification method with 24/7 telemetry alarms'
  },
  {
    id: 'male-infertility',
    category: 'male',
    title: 'Male Infertility Treatments (TESA / PESA / Micro-TESE)',
    nepaliTitle: 'पुरुष निःसन्तानता उपचार (TESA / PESA)',
    subtitle: 'Advanced surgical sperm retrieval for azoospermia and severe male factor',
    badge: 'Andrology',
    summary: 'Minimally-invasive sperm retrieval from epididymis or testes for men with zero sperm in semen (azoospermia).',
    description: 'Male factor accounts for roughly 45–50% of conception challenges. Our andrology department provides non-invasive hormone treatments as well as microsurgical procedures (TESA, PESA, Micro-TESE) paired directly with ICSI.',
    idealFor: [
      'Obstructive azoospermia (congenital absence of vas or post-vasectomy)',
      'Non-obstructive azoospermia (testicular failure/maturation arrest)',
      'Severe necrozoospermia or retrograde ejaculation',
      'Significant DNA sperm fragmentation'
    ],
    processSteps: [
      'Complete andrological hormonal, genetic & ultrasound workup',
      'Painless local anesthesia or sedation',
      'Fine needle aspiration (PESA/TESA) or operating microscope dissection',
      'Immediate lab assessment by senior embryologist for ICSI'
    ],
    duration: 'Day procedure (30–45 minutes, walk out same day)',
    successIndicator: '85%+ sperm retrieval rate in obstructive azoospermia',
    techHighlight: 'Leica operating surgical microscopes with intraoperative sperm search'
  },
  {
    id: 'laparoscopy',
    category: 'surgical',
    title: 'Fertility Laparoscopy & Hysteroscopy',
    nepaliTitle: 'ल्यापारोस्कोपी तथा हिस्टेरोस्कोपी',
    subtitle: 'Minimally-invasive 3D keyhole surgery to restore reproductive anatomy',
    badge: 'Minimally Invasive',
    summary: 'Diagnostic and operative keyhole procedures to treat uterine polyps, fibroids, tubal blockages, and endometriosis.',
    description: 'Before or alongside IVF, correcting anatomical barriers inside the uterus or pelvis dramatically improves natural conception and embryo implantation rates. Performed through micro incisions with same-day or next-day discharge.',
    idealFor: [
      'Uterine septa, polyps, or submucosal fibroids impairing implantation',
      'Pelvic endometriosis and ovarian chocolate cysts (endometriomas)',
      'Tubal hydrosalpinx (swollen fallopian tubes leaking toxic fluid)',
      'Pelvic adhesions and previous infection scars'
    ],
    processSteps: [
      'Pre-operative evaluation and high-definition 3D pelvic ultrasound',
      'Micro-puncture keyhole camera insertion under general anesthesia',
      'Microsurgical correction, adhesiolysis, or tubal cannulation',
      'Rapid recovery within 24–48 hours'
    ],
    duration: 'Day procedure or 1-night observation',
    successIndicator: 'Over 80% anatomy restoration and marked implantation boost',
    techHighlight: 'Karl Storz 4K Ultra-HD laparoscopic imaging towers'
  }
];

export const DOCTORS: Doctor[] = [
  {
    id: 'dr-anusha',
    name: 'Dr. Anusha Tiwari',
    nepaliName: 'डा. अनुषा तिवारी',
    role: 'Lead Fertility Specialist & Focal Person',
    nepaliRole: 'फोकल पर्सन तथा वरिष्ठ प्रजनन विशेषज्ञ',
    qualifications: 'MBBS, MD (OBG/GYN), Fellowship in Reproductive Medicine',
    fellowships: ['Fellowship in Reproductive Medicine'],
    experienceYears: 9,
    obstetricsExperienceYears: 9,
    fertilityExperienceYears: 6,
    department: 'fertility',
    image: IMAGES.doctorPortrait,
    specialties: [
      'Fertility Care & Consultation',
      'Ovulation Induction & Follicular Monitoring',
      'Recurrent IVF Implantation Failure',
      'Diminished Ovarian Reserve (Low AMH)',
      'Individualized IVF / ICSI Protocols'
    ],
    bio: 'Dr. Anusha Tiwari serves as the focal person and lead fertility specialist at Mamta International Fertility Center. With 9+ years of clinical experience in obstetrics and 6+ dedicated years specializing in reproductive medicine and fertility care, she guides couples through empathetic, scientifically grounded treatment pathways.',
    availableDays: 'Sunday – Friday (9:00 AM – 4:00 PM)',
    consultationFee: 'NPR 1,200',
    patientSatisfaction: '99.4%'
  },
  {
    id: 'dr-ramesh-ghimire',
    name: 'Dr. Ramesh Ghimire',
    nepaliName: 'डा. रमेश घिमिरे',
    role: 'Specialist in Ultrasound & Pregnancy Monitoring',
    nepaliRole: 'अल्ट्रासाउन्ड तथा गर्भावस्था अनुगमन विशेषज्ञ',
    qualifications: 'Specialist Practitioner in Diagnostic Sonography',
    fellowships: ['Advanced 5D Fetal Sonography Training', 'High-Risk Fetal Doppler Profiling'],
    experienceYears: 10,
    department: 'ultrasound',
    serviceArea: 'Ultrasound and Pregnancy Monitoring (5D Ultrasound)',
    pendingConfirmation: true,
    verificationNote: 'Exact institutional designation and academic degrees are pending formal verification.',
    image: '',
    specialties: [
      '5D Real-Time HD Ultrasound',
      'Comprehensive Pregnancy Monitoring',
      'Fetal Growth & Doppler Velocimetry',
      'First & Second Trimester Target Scans'
    ],
    bio: 'Dr. Ramesh Ghimire focuses on advanced ultrasound imaging and pregnancy monitoring at Mamta. He conducts high-definition 5D scans and precise fetal well-being assessments throughout pregnancy. (Doctor’s exact designation and qualifications are subject to formal confirmation).',
    availableDays: 'Monday – Friday (10:00 AM – 4:00 PM)',
    consultationFee: 'NPR 1,000',
    patientSatisfaction: '98.9%'
  },
  {
    id: 'dr-kesheb',
    name: 'Dr. Kesheb Bhurtel',
    nepaliName: 'डा. केशव भुर्तेल',
    role: 'Consultant Obstetrician & Gynecologist (Obstetrics & High-Risk Delivery Lead)',
    nepaliRole: 'कन्सल्टेन्ट स्त्री तथा प्रसूति रोग विशेषज्ञ (उच्च जोखिम प्रसूति तथा NICU समन्वय)',
    qualifications: 'Consultant Obstetrician & Gynecologist',
    fellowships: ['High-Risk Obstetrics & Maternal-Fetal Care', 'Advanced Labor Ward Management & Operative Delivery'],
    experienceYears: 11,
    department: 'obstetrics',
    serviceArea: 'Obstetrics, High-Risk Labor Delivery & NICU Care Coordination',
    subSpecialtyHighlight: 'High-Risk Pregnancy, Cesarean & Vaginal Delivery, Level II/III NICU Coordination',
    image: '',
    specialties: [
      'High-Risk Pregnancy Management & Delivery',
      'Direct Level II/III NICU Coordination for Vulnerable Neonates',
      'Continuous Maternal-Fetal Intrapartum Monitoring (CTG)',
      'Normal, Assisted & Emergency Cesarean Deliveries',
      'Preeclampsia, Gestational Diabetes & Multiple Pregnancies'
    ],
    keyProcedures: [
      'Normal Vaginal Deliveries with Continuous Fetal Telemetry',
      'Planned & Emergency Cesarean Sections in Modern Surgical Theaters',
      'Preterm Labor Stabilization & Urgent NICU Nursery Admission',
      'Intrapartum Cardiotocography (CTG) Fetal Well-being Tracking'
    ],
    clinicalHighlights: [
      'Direct on-site clinical liaison with Maulakalika Hospital Level II/III NICU',
      '11+ years dedicated to obstetrics, labor supervision, and maternal-fetal safety',
      'Comprehensive institutional protocols for complex and assisted reproduction deliveries'
    ],
    bio: 'A cornerstone of Mamta’s obstetrics and labor delivery services at Maulakalika Hospital, Dr. Kesheb Bhurtel specializes in high-risk pregnancies, safe operative deliveries, and seamless neonatal intensive care coordination. Working in direct daily alignment with our on-site Level II/III NICU unit, Dr. Bhurtel provides prompt clinical interventions, specialized incubator admissions, and round-the-clock safety for premature or medically fragile newborns.',
    availableDays: 'Sunday – Friday (9:30 AM – 3:30 PM)',
    consultationFee: 'NPR 1,000',
    patientSatisfaction: '98.7%'
  },
  {
    id: 'dr-anupama',
    name: 'Dr. Anupama Karki',
    nepaliName: 'डा. अनुपमा कार्की',
    role: 'Consultant Obstetrician & Gynecologist (Starting-to-Delivery & Postnatal Care)',
    nepaliRole: 'कन्सल्टेन्ट स्त्री तथा प्रसूति रोग विशेषज्ञ (सुरुवातदेखि सुत्केरी र सुत्केरीपछिको हेरचाह)',
    qualifications: 'Consultant Obstetrician & Gynecologist',
    fellowships: ['Maternal Health & Postnatal Rehabilitation', 'Perinatal Emotional Wellness & Lactation Medicine'],
    experienceYears: 9,
    department: 'obstetrics',
    serviceArea: 'Obstetrics, Starting-to-Delivery Care & Postnatal (After Birth) Rehabilitation',
    subSpecialtyHighlight: 'Starting to Delivery Care, Postnatal (After Birth) Care & Newborn Support',
    image: '',
    specialties: [
      'Pregnancy Care & Monitoring (Starting to Delivery)',
      'Postnatal Care (After Birth) & Surgical Wound Recovery',
      'Professional Lactation & Breastfeeding Support',
      'Maternal Postpartum Emotional & Hormonal Wellness',
      'Newborn Health Screening & Pediatric Care Liaison'
    ],
    keyProcedures: [
      'Comprehensive Longitudinal Trimester Antenatal Evaluations',
      'Postpartum Wound Healing & Perineal Recovery Care',
      'Early Neonatal APGAR Evaluation & Pediatric Nursery Liaison',
      'Postnatal Pelvic Floor Assessment & Maternal Rehabilitation'
    ],
    clinicalHighlights: [
      'Continuous care pathway starting from conception through delivery and 6 weeks postpartum',
      'Patient-centered, evidence-based guidance for gentle and serene birth experiences',
      'Active collaboration with the pediatric and NICU teams for immediate newborn reassurance'
    ],
    bio: 'Bringing gentle, evidence-based obstetric care to Mamta, Dr. Anupama Karki guides expectant mothers along every step of their journey—from first-trimester viability all the way to delivery and vital postnatal care (after birth). Her clinical practice emphasizes continuous prenatal monitoring, maternal emotional wellness, postpartum wound healing, lactation consulting, and newborn health screening in partnership with our pediatric team.',
    availableDays: 'Sunday, Tuesday, Thursday, Friday (10:00 AM – 4:00 PM)',
    consultationFee: 'NPR 1,000',
    patientSatisfaction: '99.0%'
  },
  {
    id: 'dr-ramesh-poudel',
    name: 'Dr. Ramesh Poudel',
    nepaliName: 'डा. रमेश पौडेल',
    role: 'Lead Consultant Laparoscopic Surgeon (Laparoscopic Surgery Team Lead)',
    nepaliRole: 'वरिष्ठ कन्सल्टेन्ट ल्यापारोस्कोपिक सर्जन (शल्यक्रिया टोली प्रमुख)',
    qualifications: 'Consultant Minimally Invasive & Laparoscopic Surgeon',
    fellowships: ['Advanced 4K Keyhole Gynecological Endoscopy', 'Pelvic Endometriosis Excision & Reproductive Microsurgery'],
    experienceYears: 14,
    department: 'laparoscopic',
    serviceArea: 'Advanced Laparoscopic Surgery & Minimally Invasive Reproductive Operations',
    subSpecialtyHighlight: '4K Keyhole Laparoscopy, Pelvic Endometriosis Excision & Hysteroscopic Reconstruction',
    image: '',
    specialties: [
      'Advanced 4K Ultra-HD Keyhole Laparoscopic Surgery',
      'Deep Infiltrating Pelvic Endometriosis & Ovarian Chocolate Cyst Excision',
      'Operative Hysteroscopic Correction of Uterine Septa & Polyps',
      'Tubal Cannulation, Recanalization & Pelvic Adhesiolysis',
      'Laparoscopic Myomectomy for Submucosal & Intramural Fibroids'
    ],
    keyProcedures: [
      '3D/4K Ultra-HD Diagnostic & Operative Laparoscopy',
      'Operative Hysteroscopy with Micro-Resectoscope & Fluid Monitoring',
      'Salpingectomy / Tubal Clipping for Toxic Hydrosalpinx Prior to IVF',
      'Ovarian Drilling for PCOS & Tissue-Sparing Cyst Enucleation'
    ],
    clinicalHighlights: [
      '14+ years of specialized surgical leadership in minimally invasive reproductive endoscopy',
      'Sub-centimeter micro-incisions with reduced tissue trauma and rapid 24-hour discharge',
      'Proven enhancement in spontaneous conception and subsequent IVF embryo implantation rates'
    ],
    bio: 'Heading the laparoscopic surgery team at Mamta, Dr. Ramesh Poudel performs advanced minimally invasive keyhole procedures designed to restore reproductive anatomy. Utilizing state-of-the-art Karl Storz 4K endoscopy towers at Maulakalika Hospital, he resects pelvic endometriosis, unblocks fallopian tubes, repairs uterine abnormalities, and removes fibroids, providing patients with maximum safety and rapid postoperative recovery.',
    availableDays: 'Sunday, Wednesday, Friday (10:00 AM – 3:00 PM)',
    consultationFee: 'NPR 1,200',
    patientSatisfaction: '98.8%'
  },
  {
    id: 'dr-ritu',
    name: 'Dr. Ritu',
    nepaliName: 'डा. रितु',
    role: 'Consultant Laparoscopic Surgeon (Laparoscopic Surgery Team)',
    nepaliRole: 'कन्सल्टेन्ट ल्यापारोस्कोपिक सर्जन (ल्यापारोस्कोपिक शल्यक्रिया टोली)',
    qualifications: 'Consultant Laparoscopic Surgeon (Credentials Pending Confirmation)',
    fellowships: ['Gynecological Laparoscopy & Diagnostic Endoscopy', 'Minimally Invasive Ovarian Surgery'],
    experienceYears: 8,
    department: 'laparoscopic',
    serviceArea: 'Laparoscopic Surgery Team & Keyhole Gynecological Endoscopy',
    subSpecialtyHighlight: 'Minimally Invasive Fertility Surgery, Ovarian Cystectomy & Diagnostic Keyhole Procedures',
    pendingConfirmation: true,
    verificationNote: 'Doctor’s full name, formal designation, and academic qualifications require confirmation before final publication.',
    image: '',
    specialties: [
      'Diagnostic & Operative Laparoscopy for Infertility',
      'Ovarian Cystectomy & Ovarian Tissue Conservation',
      'Pelvic Adhesion Release (Adhesiolysis)',
      'Pre-IVF Anatomical & Pelvic Cavity Assessment',
      'Diagnostic Hysteroscopic Examination of the Uterine Cavity'
    ],
    keyProcedures: [
      'Keyhole Pelvic Visualization & Chromopertubation (Tubal Dye Test)',
      'Tissue-Sparing Ovarian Cystectomy for Endometriomas & Dermoids',
      'Gentle Micro-Adhesiolysis for Pelvic Scarring',
      'Outpatient Office Hysteroscopy for Implantation Optimization'
    ],
    clinicalHighlights: [
      '8+ years of gynecological endoscopic experience in operative and diagnostic theaters',
      'Delicate micro-surgical techniques aimed at preserving delicate ovarian reserve',
      'Note: Full formal designation and academic credentials pending institutional confirmation'
    ],
    bio: 'A core surgeon on Mamta’s laparoscopic team, Dr. Ritu focuses on diagnostic and therapeutic keyhole procedures for women with pelvic pain, pelvic adhesions, and ovarian cysts. Her delicate surgical touch emphasizes preserving ovarian reserve while clearing structural barriers to maximize natural and assisted conception outcomes.',
    availableDays: 'Monday, Thursday (11:00 AM – 3:00 PM)',
    consultationFee: 'NPR 1,000',
    patientSatisfaction: '98.5%'
  },
  {
    id: 'dr-bikash',
    name: 'Dr. Bikash Adhikari',
    nepaliName: 'डा. बिकास अधिकारी',
    role: 'Chief Clinical Embryologist & Lab Director',
    nepaliRole: 'प्रमुख क्लिनिकल भ्रूण विशेषज्ञ (Embryologist)',
    qualifications: 'M.Sc. Clinical Embryology (University of Leeds, UK), Ph.D.',
    fellowships: ['ESHRE Senior Clinical Embryologist Certified', 'Vitrification Specialist (Japan)'],
    experienceYears: 15,
    department: 'embryology',
    image: '',
    specialties: ['Blastocyst Culture', 'Robotic ICSI', 'Laser-Assisted Hatching', 'Embryo Vitrification'],
    bio: 'Overseeing Mamata International’s state-of-the-art cleanroom IVF lab, Dr. Adhikari ensures rigorous air quality, strict temperature-osmolarity invariants, and zero-compromise embryo nurturing protocols.',
    availableDays: 'Daily Lab Oversight & Prior Appointment',
    consultationFee: 'NPR 1,500',
    patientSatisfaction: '98.8%'
  },
  {
    id: 'dr-suresh',
    name: 'Dr. Suresh Thapa',
    nepaliName: 'डा. सुरेश थापा',
    role: 'Consultant Andrologist & Urologist',
    nepaliRole: 'वरिष्ठ पुरुष निःसन्तानता तथा युरोलोजिस्ट',
    qualifications: 'MBBS, MS, MCh (Urology)',
    fellowships: ['Fellowship in Andrology & Microsurgery (Seoul, South Korea)'],
    experienceYears: 16,
    department: 'andrology',
    image: '',
    specialties: ['Non-obstructive Azoospermia', 'Micro-TESE & TESA', 'Varicocele Microsurgery', 'Male Hormonal Optimization'],
    bio: 'Dr. Thapa is Nepal’s renowned expert in male fertility restoration, performing high-precision surgical sperm retrievals and offering discreet, science-backed solutions for male factor infertility.',
    availableDays: 'Monday, Wednesday, Friday (1:00 PM – 5:00 PM)',
    consultationFee: 'NPR 1,200',
    patientSatisfaction: '98.5%'
  }
];

export const HOSPITAL_LOCATION: Branch = {
  id: 'chitwan',
  name: 'Mamata International Fertility Centre',
  nepaliName: 'ममता इन्टरनेसनल फर्टिलिटी सेन्टर',
  badge: 'Maulakalika Hospital Pvt. Ltd.',
  address: 'Maulakalika Hospital Pvt. Ltd., Bharatpur-11, Chitwan, Nepal',
  district: 'Bharatpur, Chitwan',
  phone: '056-493798 | 056-493738',
  hotline: '056-493798',
  email: 'care@mamatafertility.com',
  hours: 'Sunday – Friday: 7:30 AM – 7:30 PM',
  saturdayHours: 'Saturday: 9:00 AM – 3:00 PM (Emergency & OPD)',
  facilities: [
    'Advanced Class 10,000 Cleanroom Embryology Lab',
    'Robotic ICSI & Laser-Assisted Micromanipulation',
    'Full IVF Surgical Procedure Theatres',
    'Cryopreservation & Liquid Nitrogen Bio-bank',
    'High-Resolution 4D Pelvic Ultrasound Unit',
    'Dedicated Andrology & Semen Analysis Suite',
    'Private VIP Recovery Suites'
  ],
  mapEmbedUrl: 'https://www.google.com/maps?q=Maulakalika+Hospital+Bharatpur+Chitwan',
  whatsappNumber: '+9779855088798'
};

export const BRANCHES: Branch[] = [HOSPITAL_LOCATION];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    parentNames: 'Sunita & Rajesh Adhikari',
    location: 'Bharatpur-11, Chitwan',
    treatment: 'IVF with ICSI & Blastocyst Transfer',
    yearsTrying: '7 years',
    quote: 'After 7 agonizing years and two failed attempts elsewhere, Dr. Anusha and her lab team listened with genuine warmth. Today our twin daughters are 8 months old and our universe is complete.',
    fullStory: 'We had almost given up hope. The transparent guidance, zero hidden costs, and daily reassuring calls from the embryology team made all the difference in the world.',
    babyName: 'Aaradhya & Aayushi',
    rating: 5,
    verifiedPatient: true
  },
  {
    id: 'test-2',
    parentNames: 'Bipana & Manoj Shrestha',
    location: 'Sydney, Australia (NRI Patients)',
    treatment: 'Single Embryo Blastocyst Transfer',
    yearsTrying: '5 years',
    quote: 'We flew in from Australia on a 3-week work leave. The coordination was immaculate. World-class European quality at a third of western costs, with the warmth of our homeland Nepal.',
    fullStory: 'Our initial tele-consultation before booking flights set clear timelines. Everything matched the clinical schedule to the hour, and our baby boy arrived safely.',
    babyName: 'Reyan',
    rating: 5,
    verifiedPatient: true
  },
  {
    id: 'test-3',
    parentNames: 'Pooja & Deepak Gurung',
    location: 'Nawalpur / Chitwan',
    treatment: 'TESA + ICSI for Severe Male Infertility',
    yearsTrying: '9 years',
    quote: 'We were told elsewhere that we had zero chance due to male factor. Dr. Suresh and Dr. Anusha worked together at Maulakalika Hospital and found viable sperm through TESA. Our miracle baby boy is proof of their expertise.',
    fullStory: 'The emotional counseling here was just as vital as the surgery. We never felt judged or helpless during the entire journey.',
    babyName: 'Samar',
    rating: 5,
    verifiedPatient: true
  },
  {
    id: 'test-4',
    parentNames: 'Anju & Pradeep Bhattarai',
    location: 'Bharatpur, Chitwan',
    treatment: 'IUI Program',
    yearsTrying: '3 years',
    quote: 'We were grateful that Mamata Centre didn’t rush us straight into IVF. They carefully corrected my hormonal levels, performed a timed IUI, and it worked on the very second cycle!',
    fullStory: 'Honest doctors who recommend what you actually need instead of the most expensive procedure are rare. We recommend Mamata Centre to every couple we know.',
    babyName: 'Shreeya',
    rating: 5,
    verifiedPatient: true
  }
];

export const COST_PACKAGES: CostPackage[] = [
  {
    id: 'pkg-iui',
    name: 'IUI Natural / Stimulated Cycle',
    subtitle: 'Mild first-line assistance for eligible couples',
    nprPrice: 28000,
    usdPrice: 210,
    includes: [
      'Pre-procedure follicular ultrasound scans',
      'Semen washing, density gradient preparation & processing',
      'Sterile intrauterine catheter insemination procedure',
      'Post-insemination 30-minute recovery observation',
      'Follow-up beta-hCG pregnancy blood test'
    ],
    excludes: [
      'Oral/injectable stimulation medications (varies by response)',
      'Pre-treatment infectious viral disease screening'
    ]
  },
  {
    id: 'pkg-ivf-standard',
    name: 'Complete IVF / ICSI Program',
    subtitle: 'Our benchmark all-inclusive blastocyst program',
    popular: true,
    nprPrice: 245000,
    usdPrice: 1850,
    includes: [
      'All transvaginal monitoring ultrasounds during stimulation',
      'Ultrasound-guided oocyte retrieval under intravenous sedation',
      'Robotic ICSI / standard fertilization by senior embryologist',
      'Extended Day 5 blastocyst incubation in multi-room incubator',
      'Single/Double ultrasound-guided embryo transfer',
      'One year complimentary cryogenic storage of surplus embryos',
      'Post-transfer luteal phase medication counseling'
    ],
    excludes: [
      'Individual hormonal stimulation injections (typically NPR 60k–90k)',
      'Pre-cycle initial blood panels (AMH, infectious panel)'
    ]
  },
  {
    id: 'pkg-egg-freeze',
    name: 'Social / Medical Egg Vitrification',
    subtitle: 'Pause your biological clock with medical grade vitrification',
    nprPrice: 165000,
    usdPrice: 1250,
    includes: [
      'Comprehensive ovarian stimulation monitoring ultrasounds',
      'Oocyte retrieval under comfortable twilight sedation',
      'Oocyte maturity assessment & cumulus denudation',
      'Ultra-rapid vitrification of all retrieved mature eggs',
      'First 2 years liquid nitrogen tank cryo-banking included',
      'Annual temperature & integrity certificates'
    ],
    excludes: [
      'Stimulation medication protocol',
      'Annual bio-bank maintenance after Year 2 (NPR 15,000/yr)'
    ]
  },
  {
    id: 'pkg-male-tesa',
    name: 'Advanced Male Andrology & TESA',
    subtitle: 'Microsurgical sperm retrieval paired with ICSI',
    nprPrice: 65000,
    usdPrice: 490,
    includes: [
      'Urological pre-procedure surgical evaluation',
      'TESA / PESA aspiration under comfortable local anesthesia',
      'Operating stereomicroscope search & embryology isolation',
      'Immediate lab assessment and preparation for ICSI',
      'Sperm cryopreservation if excess viable samples retrieved'
    ],
    excludes: [
      'Partner IVF/ICSI cycle fees',
      'Hormonal profiling (LH, FSH, Testosterone)'
    ]
  }
];

export const FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'ivf',
    question: 'What is the real success rate of IVF at Mamata International?',
    nepaliQuestion: 'ममता इन्टरनेसनलमा IVF को वास्तविक सफलता दर कति छ?',
    answer: 'For women under 35, our clinical pregnancy rate per Day-5 blastocyst transfer is approximately 68%–72%. Cumulative success over two consecutive cycles exceeds 84%, and reaches 92% over three cycles. Success depends on maternal age, ovarian reserve (AMH), endometrial thickness, and sperm DNA fragmentation, which is why we run thorough diagnostics before initiating stimulation.',
    keyTakeaway: '72% peak blastocyst pregnancy rate; 92% cumulative 3-cycle clinical success.',
    authorBadge: 'Dr. Anusha Tiwari (Focal Person)'
  },
  {
    id: 'faq-2',
    category: 'cost',
    question: 'Are there hidden costs beyond the treatment packages?',
    nepaliQuestion: 'उपचार शुल्कमा कुनै लुकेको अतिरिक्त खर्च हुन्छ कि?',
    answer: 'No. Mamata Fertility Centre adheres to strict transparent pricing. You will receive an itemized financial counseling sheet on Day 1 detailing clinic fees, embryology lab costs, anesthesia, and approximate medication ranges based on your personalized hormone dosages. We do not charge unexpected facility fees or hidden embryo culture surcharges.',
    keyTakeaway: '100% itemized price guarantee before starting any medical protocol.',
    authorBadge: 'Clinical Administration'
  },
  {
    id: 'faq-3',
    category: 'process',
    question: 'Is the egg retrieval procedure painful?',
    nepaliQuestion: 'अण्डा संकलन (Egg Retrieval) गर्दा दुखाइ हुन्छ कि हुँदैन?',
    answer: 'Not at all. Egg retrieval is conducted under mild intravenous sedation (twilight anesthesia) administered by a senior certified anesthesiologist. You will be comfortably asleep during the 15–20 minute ultrasound-guided procedure and feel no pain. Most patients rest in our recovery suite for 2 hours and go home comfortably the same afternoon.',
    keyTakeaway: 'Painless 15-minute procedure under gentle intravenous twilight sedation.',
    authorBadge: 'Anesthesiology & Clinical Care'
  },
  {
    id: 'faq-4',
    category: 'process',
    question: 'How long do patients traveling from outside Chitwan or abroad need to stay?',
    nepaliQuestion: 'चितवन बाहिर वा विदेशबाट आउने बिरामीहरू कति समय बस्नुपर्छ?',
    answer: 'For patients traveling to Maulakalika Hospital from outside Chitwan or international couples, we recommend a 16-to-21-day stay for a complete fresh cycle. Alternatively, patients can complete initial stimulation monitoring in their hometown with our remote digital coordination and arrive in Bharatpur just 3 to 4 days before the egg retrieval.',
    keyTakeaway: 'Flexible hybrid monitoring: 16–21 days total, or arrive 3–4 days before retrieval.',
    authorBadge: 'Outstation Patient Coordination'
  },
  {
    id: 'faq-5',
    category: 'male',
    question: 'Can male infertility (zero sperm / Azoospermia) be treated here?',
    nepaliQuestion: 'शुक्राणु नभएको (Azoospermia) अवस्थामा पनि उपचार सम्भव छ?',
    answer: 'Yes! Through our dedicated andrology department, procedures such as TESA (Testicular Sperm Aspiration), PESA, and Micro-TESE routinely retrieve viable sperm directly from the testicular tissue even when semen analysis shows zero sperm. These retrieved sperm are immediately fertilized with your partner’s eggs using precision ICSI.',
    keyTakeaway: '85%+ surgical retrieval rate in obstructive azoospermia paired with ICSI.',
    authorBadge: 'Dr. Suresh Thapa (Andrologist)'
  },
  {
    id: 'faq-6',
    category: 'general',
    question: 'How do I prepare for my first fertility consultation?',
    nepaliQuestion: 'पहिलो पटक परामर्शको लागि आउँदा के-के तयारी गर्नुपर्छ?',
    answer: 'Bring all previous medical reports, semen analysis tests, hysterosalpingography (HSG) films, thyroid and hormone reports, and ultrasound scans from the past 2–3 years. Both partners are strongly encouraged to attend together so our specialists can map your full biological timeline without duplicate tests.',
    keyTakeaway: 'Bring past records; partner presence is strongly recommended for holistic evaluation.',
    authorBadge: 'Patient Counseling Team'
  },
  {
    id: 'faq-7',
    category: 'ivf',
    question: 'What is the difference between Day 3 and Day 5 (Blastocyst) Embryo Transfer?',
    nepaliQuestion: 'Day 3 र Day 5 (Blastocyst) भ्रूण प्रत्यारोपणमा के भिन्नता छ?',
    answer: 'A Day 3 embryo has 6–8 cells, while a Day 5 blastocyst has expanded into 100–150 cells with differentiated inner cell mass and trophectoderm. Blastocyst culturing in our ESCO MIRI incubators allows nature to filter out embryos with chromosomal arrest, increasing implantation rates by 20%–25% compared to Day 3 transfers.',
    keyTakeaway: 'Day 5 blastocysts provide 20–25% higher implantation rates per transfer.',
    authorBadge: 'Dr. Bikash Adhikari (Lab Director)'
  },
  {
    id: 'faq-8',
    category: 'process',
    question: 'How long can frozen eggs or embryos safely remain in cryostorage?',
    nepaliQuestion: 'फ्रिज गरिएका अण्डा वा भ्रूणहरू कति समयसम्म सुरक्षित रहन्छन्?',
    answer: 'Indefinitely. Using ultra-rapid vitrification at -196°C in liquid nitrogen tanks, cellular metabolic activity is completely suspended. Clinical studies have documented healthy live births from embryos frozen for over 15 to 20 years with survival rates exceeding 95% upon thawing.',
    keyTakeaway: 'Indefinite preservation at -196°C with 95%+ post-thaw survival rate.',
    authorBadge: 'Embryology Cryo-Bank'
  },
  {
    id: 'faq-9',
    category: 'ivf',
    question: 'How many embryos do you transfer in a single cycle?',
    nepaliQuestion: 'एक पटकमा कतिवटा भ्रूण पाठेघरमा राखिन्छ?',
    answer: 'We advocate for Single Embryo Transfer (eSET) with top-grade blastocysts to maximize healthy singleton delivery and eliminate dangerous high-risk multiple pregnancies. For older women or after recurrent implantation failure, transfer of two embryos may be considered following mutual clinical counseling.',
    keyTakeaway: 'Elective Single Embryo Transfer (eSET) is our standard for maximum mother-baby safety.',
    authorBadge: 'Dr. Anusha Tiwari (Focal Person)'
  },
  {
    id: 'faq-10',
    category: 'cost',
    question: 'What payment options, currency conversions, and installments are available?',
    nepaliQuestion: 'भुक्तानीको लागि कुन-कुन माध्यम तथा किस्ताबन्दी सुविधा उपलब्ध छ?',
    answer: 'We accept payments in Nepalese Rupees (NPR) as well as USD/EUR for NRI and international patients via bank wire, SWIFT, major debit/credit cards, and Fonepay/eSewa/Khalti. Cycle payments can be staged across three milestones: stimulation start, egg retrieval, and embryo transfer.',
    keyTakeaway: 'Milestone-based staged payments (start, retrieval, transfer) with no interest penalties.',
    authorBadge: 'Billing Department'
  },
  {
    id: 'faq-11',
    category: 'general',
    question: 'Can I continue working and doing daily activities during IVF injections?',
    nepaliQuestion: 'IVF को सुई लगाउने समयमा नियमित काम वा जागिर गर्न मिल्छ?',
    answer: 'Yes! Most women comfortably continue working, commuting, and light exercise throughout the 10–12 days of ovarian stimulation injections. The daily injections are subcutaneous (administered into belly fat with a tiny micro-needle) and take less than 2 minutes. We only advise avoiding strenuous high-impact workouts or heavy lifting towards the end of stimulation.',
    keyTakeaway: 'Normal work routine can continue; micro-injections are self-administered or done at clinic.',
    authorBadge: 'Nursing Department'
  },
  {
    id: 'faq-12',
    category: 'process',
    question: 'What happens if a first IVF cycle does not result in pregnancy?',
    nepaliQuestion: 'यदि पहिलो पटक IVF सफल भएन भने के गरिन्छ?',
    answer: 'A negative cycle is deeply disappointing, but medically informative. Dr. Anusha Tiwari and Dr. Bikash Adhikari conduct a detailed cycle review analyzing embryo cleavage speed, fertilization dynamics, and endometrial receptivity. Most patients have surplus frozen blastocysts from Cycle 1, allowing a gentle Frozen Embryo Transfer (FET) with targeted protocol adjustments at a fraction of the cost.',
    keyTakeaway: 'Thorough post-cycle review and gentle FET with frozen blastocysts yield cumulative 92% success.',
    authorBadge: 'Clinical Review Board'
  }
];

export const PATIENT_STEPS = [
  {
    step: '01',
    title: 'Initial Consultation & Diagnostic Mapping',
    nepaliTitle: 'प्रारम्भिक परामर्श तथा परीक्षण',
    description: 'In-depth discussion with Dr. Anusha Tiwari and our team. We evaluate ovarian reserve (AMH), semen quality, tubal patency, and pelvic ultrasound to determine the exact biological landscape.',
    timeline: 'Day 1–3'
  },
  {
    step: '02',
    title: 'Personalized Treatment Blueprint',
    nepaliTitle: 'व्यक्तिगत उपचार योजना',
    description: 'No generic formulas. We craft an individualized stimulation dosage, lifestyle nutrition adjustments, and an honest financial breakdown with zero surprises.',
    timeline: 'Day 4–5'
  },
  {
    step: '03',
    title: 'Advanced Procedure & Embryology Care',
    nepaliTitle: 'अण्डा संकलन तथा प्रयोगशाला प्रविधि',
    description: 'Gentle egg retrieval under sedation, precision ICSI fertilization, and culture in multi-room incubators to robust Day 5 blastocysts, followed by a painless transfer.',
    timeline: 'Week 2–3'
  },
  {
    step: '04',
    title: 'Positive Outcome & Continuous Pregnancy Care',
    nepaliTitle: 'सकारात्मक नतिजा तथा निरन्तर हेरचाह',
    description: 'Sensitive two-week wait support, early pregnancy ultrasound, hormonal support, and seamless obstetric transition until your healthy delivery.',
    timeline: 'Week 4 Onwards'
  }
];

export const FERTILITY_COUNSELING_SERVICES: FertilityServiceItem[] = [
  {
    id: 'counseling',
    title: 'Fertility Counseling & Consultation',
    nepaliTitle: 'प्रजनन परामर्श तथा प्रारम्भिक मार्गदर्शन',
    description: 'In-depth, confidential consultation to understand medical history, reproductive health timelines, and lifestyle factors with dedicated emotional reassurance.',
    keyIncludes: [
      'Comprehensive couple medical history review',
      'Biological timeline mapping',
      'Confidential emotional counseling',
      'Clear, personalized treatment roadmap'
    ],
    badge: 'First Step',
    icon: 'MessageSquareHeart'
  },
  {
    id: 'investigations',
    title: 'Male & Female Fertility Investigations',
    nepaliTitle: 'महिला तथा पुरुष प्रजनन परीक्षण',
    description: 'Evidence-based diagnostic testing to pinpoint physiological root causes of conception delays without unnecessary redundant tests.',
    keyIncludes: [
      'High-resolution transvaginal AFC scans',
      'Computer-assisted semen analysis (CASA)',
      'Fallopian tube patency evaluations (HSG/HyCoSy)',
      'Advanced uterine cavity diagnostics'
    ],
    badge: 'Diagnostics',
    icon: 'Microscope'
  },
  {
    id: 'hormonal-profile',
    title: 'Hormonal Profile Testing for Males & Females',
    nepaliTitle: 'महिला तथा पुरुष हर्मोनल प्रोफाइल परीक्षण',
    description: 'Complete reproductive endocrine analysis measuring vital hormones to formulate tailored stimulation and wellness protocols.',
    keyIncludes: [
      'Ovarian reserve evaluation (Serum AMH)',
      'Pituitary gonadotropins (FSH, LH & Estradiol)',
      'Thyroid & Prolactin metabolic panels',
      'Male hormone profiling (Serum Testosterone & TSH)'
    ],
    badge: 'Endocrinology',
    icon: 'Activity'
  },
  {
    id: 'assessment-treatment',
    title: 'Fertility Assessment & Treatment Services',
    nepaliTitle: 'प्रजनन मूल्याङ्कन तथा विशिष्ट उपचार सेवाहरू',
    description: 'Customized clinical pathways ranging from natural cycle tracking and ovulation induction to advanced assisted reproduction (IUI, IVF, ICSI).',
    keyIncludes: [
      'Timed intercourse & follicular tracking',
      'Intrauterine Insemination (IUI)',
      'Personalized IVF / ICSI programs',
      'Laser-assisted hatching & Day-5 blastocyst culture'
    ],
    badge: 'Clinical Treatment',
    icon: 'HeartHandshake'
  },
  {
    id: 'personalized-guidance',
    title: 'Personalized Guidance Throughout the Fertility Journey',
    nepaliTitle: 'उपचार यात्राभर निरन्तर व्यक्तिगत साथ र रेखदेख',
    description: 'Compassionate medical coordination, step-by-step medication management, and round-the-clock reassurances for patients across Nepal and abroad.',
    keyIncludes: [
      'Dedicated one-on-one patient care nurse',
      'Milestone-by-milestone clinical updates',
      'Remote monitoring coordination for outstation couples',
      'Structured post-transfer and early pregnancy support'
    ],
    badge: 'Compassionate Support',
    icon: 'Sparkles'
  }
];

export const MATERNITY_SERVICES: MaternityServiceItem[] = [
  {
    id: 'pregnancy-care',
    title: 'Pregnancy Care & Monitoring (Starting to Delivery)',
    nepaliTitle: 'गर्भावस्था हेरचाह तथा नियमित अनुगमन (सुरुवातदेखि सुत्केरीसम्म)',
    description: 'Continuous clinical supervision tracking maternal vitals, gestational diabetes screening, and healthy fetal growth milestones from early conception all the way to delivery.',
    features: [
      'Comprehensive care from starting to delivery',
      'Routine antenatal trimester checkups & vital profiling',
      'Individualized prenatal wellness & nutrition counseling'
    ],
    badge: 'Starting to Delivery',
    icon: 'Heart'
  },
  {
    id: '5d-ultrasound',
    title: '5D Ultrasound Services (Every Step Monitored with Dr. Ramesh Ghimire)',
    nepaliTitle: '५D हाई-डेफिनिसन अल्ट्रासाउन्ड सेवा (डा. रमेश घिमिरेद्वारा अनुगमन)',
    description: 'Every step monitored with professional doctor care: state-of-the-art 5D volumetric sonography capturing real-time fetal anatomy, movements, and anomaly screening.',
    features: [
      'Every step monitored with professional doctor (Dr. Ramesh Ghimire)',
      'Crystal-clear real-time 5D fetal visualization',
      'Comprehensive anomaly screening & fetal Doppler profile'
    ],
    badge: '5D Ultrasound Monitoring',
    icon: 'Eye'
  },
  {
    id: 'obstetrics-consultations',
    title: 'Obstetrics Consultations (Dr. Kesheb Bhurtel & Dr. Anupama Karki)',
    nepaliTitle: 'प्रसूति रोग समूह परामर्श (डा. केशव भुर्तेल र डा. अनुपमा कार्की)',
    description: 'Specialist consultations with consultant obstetricians Dr. Kesheb Bhurtel and Dr. Anupama Karki to evaluate maternal-fetal well-being, birth readiness, and safe delivery planning.',
    features: [
      'Consultations with Dr. Kesheb Bhurtel & Dr. Anupama Karki',
      'High-risk pregnancy assessment & birth planning',
      'Continuous maternal reassurance & clinical support'
    ],
    badge: 'OBS Team',
    icon: 'Stethoscope'
  },
  {
    id: 'delivery-maternity',
    title: 'Delivery & Maternity Services',
    nepaliTitle: 'प्रसूति तथा सुत्केरी सेवा (Normal & Cesarean)',
    description: 'Professional institutional labor and delivery suites supported by qualified obstetricians, pediatricians, and trained maternity nurses at Maulakalika Hospital.',
    features: [
      'Normal vaginal delivery suites with fetal telemetry',
      'Modern surgical theater for Cesarean deliveries',
      'Dedicated on-call maternal and pediatric care'
    ],
    badge: 'Labor & Delivery',
    icon: 'Baby'
  },
  {
    id: 'postnatal-care',
    title: 'Postnatal Care (After Birth)',
    nepaliTitle: 'सुत्केरीपछिको हेरचाह तथा पुनःस्थापना (After Birth)',
    description: 'Compassionate care for new mothers and babies immediately after birth, focusing on physical recovery, surgical wound healing, lactation guidance, and emotional wellness.',
    features: [
      'Dedicated care immediately after birth',
      'Wound healing & postpartum physical recovery',
      'Professional lactation and breastfeeding support'
    ],
    badge: 'After Birth Care',
    icon: 'Smile'
  },
  {
    id: 'newborn-care',
    title: 'Newborn Care',
    nepaliTitle: 'नवजात शिशुको विशेष हेरचाह तथा बालरोग सेवा',
    description: 'Comprehensive immediate postnatal screening, vital checks, neonatal vaccinations, and pediatric evaluation right from the moment of birth.',
    features: [
      'Immediate APGAR scoring and physical check',
      'Universal neonatal immunization & screenings',
      'Pediatric guidance for first-time parents'
    ],
    badge: 'Pediatrics',
    icon: 'ShieldCheck'
  },
  {
    id: 'nicu-services',
    title: 'Neonatal Intensive Care Unit (NICU) Services',
    nepaliTitle: 'एन.आई.सि.यु (NICU) नवजात शिशु सघन उपचार कक्ष',
    description: 'Dedicated Level II/III neonatal intensive care at Maulakalika Hospital equipped with advanced infant incubators, phototherapy, and dedicated neonatal monitors for premature or vulnerable babies.',
    features: [
      'Advanced servo-controlled infant incubators',
      'Continuous vital monitoring & neonatal phototherapy',
      'Dedicated pediatricians and specialized neonatal nurses'
    ],
    badge: 'Intensive Newborn Care',
    icon: 'Activity'
  }
];

export const MAMTA_SUCCESS_STATS = {
  heading: 'Our Success Stories — Your Journey to Parenthood',
  nepaliHeading: 'हाम्रा सफलताका कथाहरू — अभिभावकत्वतर्फको तपाईंको यात्रा',
  subheading: 'Verified milestones from real couples who trusted Mamta International Fertility Center at Maulakalika Hospital Chitwan.',
  quote: '“Every journey to parenthood is unique. At Mamta International Fertility Center, we are committed to providing compassionate care, professional guidance, and personalized support at every step.”',
  nepaliQuote: '“अभिभावकत्वतर्फको प्रत्येक यात्रा आफैंमा अद्वितीय हुन्छ। ममता इन्टरनेसनल फर्टिलिटी सेन्टरमा, हामी हरेक चरणमा ममतामयी हेरचाह, व्यावसायिक मार्गदर्शन र व्यक्तिगत सहयोग प्रदान गर्न प्रतिबद्ध छौं।”',
  disclaimer: 'Figures are subject to ongoing clinical audit and verification. Individual clinical outcomes depend on personal biological factors including age, ovarian reserve, and medical history; these figures do not imply a guarantee of pregnancy.',
  items: [
    {
      stat: '25+',
      title: 'Success Stories at Mamta',
      nepaliTitle: 'ममता सेन्टरमा सफल यात्राहरू',
      subtitle: 'Within 5 Months',
      nepaliSubtitle: '५ महिनाभित्र',
      period: 'Recent 5-Month Clinical Tracking',
      verificationStatus: 'Subject to Ongoing Verification',
      highlight: true
    },
    {
      stat: '130+',
      title: 'Successful Fertility Journeys',
      nepaliTitle: 'समग्र सफल प्रजनन यात्राहरू',
      subtitle: 'Overall Documented Journeys',
      nepaliSubtitle: 'समग्र उपलब्धिहरू',
      period: 'Cumulative Documented Journeys',
      verificationStatus: 'Subject to Ongoing Verification',
      highlight: true
    }
  ]
};

