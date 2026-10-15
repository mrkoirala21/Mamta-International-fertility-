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
  image: string;
  specialties: string[];
  bio: string;
  availableDays: string;
  consultationFee: string;
  patientSatisfaction: string;
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
    role: 'Focal Person & Consultant in Reproductive Medicine (OBG/GYN)',
    nepaliRole: 'फोकल पर्सन तथा कन्सल्टेन्ट प्रजनन विशेषज्ञ',
    qualifications: 'MBBS, MD (OBG/GYN)',
    fellowships: ['Fellowship in Reproductive Medicine'],
    experienceYears: 12,
    image: '/src/assets/images/doctor_mamata_portrait_1791911168054.jpg',
    specialties: ['Recurrent IVF Failure', 'Diminished Ovarian Reserve (Low AMH)', 'PCOS Management', 'Fertility Preservation'],
    bio: 'Dr. Anusha Tiwari (MBBS, MD OBG/GYN, Fellowship in Reproductive Medicine) is the focal person and lead reproductive specialist at Mamata Fertility Centre. Known for her compassionate patient-centered ethos and clinical precision, she designs individualized treatment and IVF pathways for couples seeking parenthood.',
    availableDays: 'Sunday – Friday (9:00 AM – 4:00 PM)',
    consultationFee: 'NPR 1,200',
    patientSatisfaction: '99.4%'
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
    image: '',
    specialties: ['Blastocyst Culture', 'Robotic ICSI', 'Laser-Assisted Hatching', 'Embryo Vitrification'],
    bio: 'Overseeing Mamata International’s state-of-the-art cleanroom IVF lab, Dr. Adhikari ensures rigorous air quality, strict temperature-osmolarity invariants, and zero-compromise embryo nurturing protocols.',
    availableDays: 'Daily Lab Oversight & Prior Appointment',
    consultationFee: 'NPR 1,500',
    patientSatisfaction: '98.8%'
  },
  {
    id: 'dr-priya',
    name: 'Dr. Priya Shrestha',
    nepaliName: 'डा. प्रिया श्रेष्ठ',
    role: 'Senior Consultant Gynecologist & Laparoscopic Surgeon',
    nepaliRole: 'वरिष्ठ स्त्रीरोग तथा ल्यापारोस्कोपिक सर्जन',
    qualifications: 'MBBS, MS (OB/GYN), FMAS, DMAS',
    fellowships: ['Fellow in Advanced Gynecological Endoscopy (Kiel, Germany)'],
    experienceYears: 13,
    image: '',
    specialties: ['Fertility Enhancing Laparoscopy', 'Hysteroscopic Septum Resection', 'Endometriosis Surgery', 'Tubal Recanalization'],
    bio: 'Specializing in minimally-invasive keyhole surgery, Dr. Shrestha rectifies uterine anomalies and complex pelvic endometriosis, optimizing the uterine lining for maximum implantation success.',
    availableDays: 'Sunday, Tuesday, Thursday (10:00 AM – 3:00 PM)',
    consultationFee: 'NPR 1,000',
    patientSatisfaction: '99.1%'
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
    quote: 'After 7 agonizing years and two failed attempts elsewhere, Dr. Mamata and her lab team listened with genuine warmth. Today our twin daughters are 8 months old and our universe is complete.',
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
    quote: 'We were told elsewhere that we had zero chance due to male factor. Dr. Suresh and Dr. Mamata worked together at Maulakalika Hospital and found viable sperm through TESA. Our miracle baby boy is proof of their expertise.',
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
    answer: 'A negative cycle is deeply disappointing, but medically informative. Dr. Mamata and Dr. Bikash conduct a detailed cycle review analyzing embryo cleavage speed, fertilization dynamics, and endometrial receptivity. Most patients have surplus frozen blastocysts from Cycle 1, allowing a gentle Frozen Embryo Transfer (FET) with targeted protocol adjustments at a fraction of the cost.',
    keyTakeaway: 'Thorough post-cycle review and gentle FET with frozen blastocysts yield cumulative 92% success.',
    authorBadge: 'Clinical Review Board'
  }
];

export const PATIENT_STEPS = [
  {
    step: '01',
    title: 'Initial Consultation & Diagnostic Mapping',
    nepaliTitle: 'प्रारम्भिक परामर्श तथा परीक्षण',
    description: 'In-depth discussion with Dr. Mamata and our team. We evaluate ovarian reserve (AMH), semen quality, tubal patency, and pelvic ultrasound to determine the exact biological landscape.',
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
