# Multi-Page Architecture & Website Reorganization Plan
## Mamta International Fertility Center (Maulakalika Hospital, Chitwan)

Transform the current single-page heavy layout into a modern, multi-page fertility and maternity hospital website. The homepage is streamlined to serve strictly as an executive clinic profile, while all treatments, medical conditions, obstetrics/maternity pathways, diagnostics, doctor dossiers, facilities, and patient education resources are separated into dedicated subpages with clean standard URL routes (`/about`, `/treatments/ivf`, `/conditions/pcos`, `/doctors/dr-anusha`, etc.).

---

### User Review & Critical Decisions

> [!IMPORTANT]
> The following architectural decisions were confirmed during Phase 1 clarification:
> - **Routing Format**: Clean standard paths (e.g., `/about`, `/fertility-treatments`, `/treatments/ivf`, `/conditions/pcos`, `/doctors/dr-anusha`) backed by browser History API and Express SPA wildcard routing for direct URL access.
> - **Treatment & Condition Structure**: Dedicated, comprehensive individual subpages for every major treatment and infertility condition with medical indications, step-by-step clinical workflows, and doctor correlations.
> - **Doctor Profile Architecture**: Dedicated individual specialist subpages (`/doctors/dr-anusha`, `/doctors/dr-ramesh-ghimire`, etc.) featuring verified academic qualifications, department designations, clinical fellowships, procedures, and direct scheduling.

---

### 1. Overview & Core Concept

- **What It Delivers**: A comprehensive, hospital-grade multi-page web application reflecting the clinical excellence of Mamta International Fertility Center at Maulakalika Hospital Pvt. Ltd., Bharatpur-11, Chitwan.
- **Audience**: Intending parents across Chitwan, Bagmati/Gandaki provinces, national referrals, and international/NRI couples seeking IVF, ICSI, 5D fetal scans, high-risk maternity care, and endoscopic surgery.
- **Key Transformation**:
  - **Before**: Heavy homepage attempting to display all medical explanations, all treatment protocols, doctor rosters, patient journeys, cost estimators, and FAQs in a single scrolling feed.
  - **After**: High-trust, concise homepage focused strictly on the clinic profile, accreditations, and key pathways, complemented by organized dedicated pages and intuitive dropdown navigation.

---

### 2. User Experience & Visual Design

#### Visual Identity & Theme
- **Brand Palette**:
  - Primary Trust Blue: `#1D3B58` (Deep clinical navy for typography and structural authority)
  - Secondary Slate Blue: `#2B5A88` (Interactive hover states and secondary banners)
  - Compassion Pink: `#E48AA0` & Dark Pink: `#C96D83` (Warm empathetic accent for CTAs and highlights)
  - Warm Clinical Canvas: `#F9FAFC` & Pure White `#FFFFFF`
  - Subtle Hairline Borders: `#E2E8F0` / `#F1F5F9` (Strict anti-slop hairline borders, no heavy shadows)
- **Typography & Layout Principles**:
  - Headings: `Plus Jakarta Sans` with `tracking-tight` and balanced measure.
  - Zero-Pill Discipline: Unboxed metadata with clean typographic separators (`·`, `•`) rather than static candy capsules.
  - Operational Utility Bar: Clean header with emergency hotline (`056-493798`), location badge (`Maulakalika Hospital, Chitwan`), and Nepali/English toggle.
  - Breadcrumbs: Integrated at the top of every internal page (`Home > Treatments > IVF (In Vitro Fertilization)`).

#### Page Structure & Content Allocation

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       TOP NAVIGATION BAR (DESKTOP & MOBILE)                 │
│  [Mamta Logo]  Home  About  Treatments▾  Conditions▾  Maternity▾  Diagnostics  Doctors▾  Resources▾  Contact  [Book Consultation] │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │
     ┌─────────────────────────────────┼─────────────────────────────────┐
     │                                 │                                 │
┌────┴────────────────┐      ┌─────────┴──────────┐            ┌─────────┴──────────┐
│   HOMEPAGE (/)      │      │ TREATMENTS HUB     │            │ CONDITIONS HUB     │
│  • Clinic Profile   │      │ /fertility-        │            │ /conditions        │
│  • Core Mission     │      │ treatments         │            │  • Male Factor     │
│  • 4 Core Pillars   │      │  • /treatments/ivf │            │  • PCOS / PCOD     │
│  • Hospital Tie-up  │      │  • /treatments/icsi│            │  • Endometriosis   │
│  • Quick Doctor Intro│     │  • /treatments/iui │            │  • Blocked Tubes   │
│  • Consultation CTA │      │  • /treatments/... │            │  • Azoospermia     │
└─────────────────────┘      └────────────────────┘            └────────────────────┘
     │                                 │                                 │
┌────┴────────────────┐      ┌─────────┴──────────┐            ┌─────────┴──────────┐
│ MATERNITY CARE      │      │ DOCTORS DIRECTORY  │            │ PATIENT RESOURCES  │
│ /pregnancy-care     │      │ /doctors           │            │ /patient-resources │
│  • 5D Ultrasound    │      │  • /doctors/anusha │            │  • /pricing        │
│  • Obstetrics Lead  │      │  • /doctors/ramesh │            │  • /faq            │
│  • Normal/Cesarean  │      │  • /doctors/kesheb │            │  • /calculator     │
│  • Postnatal & NICU │      │  • /doctors/...    │            │  • /journey        │
└─────────────────────┘      └────────────────────┘            └────────────────────┘
```

---

### 3. Key Product Decisions & Information Architecture

#### 1. Homepage — Executive Clinic Profile Only
- **Hero Section**: Introduces Mamta International Fertility Center at Maulakalika Hospital, highlighting 25+ recent verified success stories and compassionate medical care with direct CTAs.
- **About the Clinic Snapshot**: Founding philosophy, affiliation with Maulakalika Hospital, ISO/clinical laboratory invariants, and compassionate patient-first ethos.
- **Core Clinical Pillars**: 4 concise gateway cards (Reproductive Endocrinology, 5D Fetal Sonography, High-Risk Labor Delivery, Advanced Laparoscopic Surgery) linking to respective hub pages.
- **Technology & Infrastructure Teaser**: Clean 3-column overview of the ESCO MIRI incubators, robotic micromanipulation, and on-site Level II/III NICU.
- **Clinical Leadership Spotlight**: Brief introductory showcase of Focal Person Dr. Anusha Tiwari and 5D Specialist Dr. Ramesh Ghimire with link to "Meet All 8 Specialists".
- **Consultation & Booking Gateway**: Clear booking action with hotline and address.

#### 2. Dedicated Pages & Route Mapping

| URL Route | Page Title & Scope | Content Included |
| :--- | :--- | :--- |
| `/` | Homepage (Clinic Profile) | Concise clinic profile, core strengths, gateway cards, CTA |
| `/about` | About the Clinic | Full institutional profile, history, mission & vision, patient care ethos, quality standards |
| `/fertility-treatments` | Fertility Treatments Hub | Comprehensive overview of all assisted reproductive services with filtering |
| `/treatments/ivf` | In Vitro Fertilization (IVF) | Ovarian stimulation, egg retrieval, blastocyst culture, embryo transfer, success rates |
| `/treatments/icsi` | Intracytoplasmic Sperm Injection | Micro-manipulation, severe male factor, indications, step-by-step process |
| `/treatments/iui` | Intrauterine Insemination | First-line mild stimulation, sperm washing, timing, eligibility, gentle procedure |
| `/treatments/blastocyst` | Blastocyst Culture & Transfer | Extended Day 5/6 incubation, ESCO MIRI incubators, eSET single transfer benefits |
| `/treatments/egg-freezing` | Egg & Sperm Cryopreservation | Ultra-rapid vitrification at -196°C, social/medical freezing, bio-bank security |
| `/treatments/male-infertility` | Male Infertility & TESA/PESA | Surgical sperm retrieval under Dr. Suresh Thapa, micro-TESE, andrology workup |
| `/treatments/laparoscopy` | 4K Laparoscopy & Hysteroscopy | Karl Storz 4K towers, endometriosis excision, septum repair, tubal cannulation |
| `/conditions` | Infertility Conditions Hub | Overview of physiological causes with diagnostic pathways |
| `/conditions/pcos` | PCOS / PCOD Management | Ovulation induction, metabolic optimization, individualized stimulation |
| `/conditions/endometriosis` | Endometriosis & Ovarian Cysts | Staging, laparoscopic excision, pelvic pain relief, IVF optimization |
| `/conditions/blocked-tubes` | Tubal Factor & Hydrosalpinx | HSG assessment, laparoscopic salpingectomy, direct IVF bypass |
| `/conditions/male-factor` | Male Factor & Azoospermia | Semen analysis, sperm DNA fragmentation, hormonal balance, TESA options |
| `/conditions/ovulation-disorders` | Anovulation & Low AMH | Diminished ovarian reserve protocols, mild stimulation, luteal support |
| `/pregnancy-care` | Pregnancy & Maternity Hub | Longitudinal continuum from conception through delivery and newborn care |
| `/pregnancy-care/5d-ultrasound` | 5D Ultrasound & Fetal Monitoring | Dedicated clinic run by Dr. Ramesh Ghimire: HD scans, Doppler, anomaly screening |
| `/pregnancy-care/obstetrics-team` | Obstetrics & High-Risk Delivery | Dr. Kesheb Bhurtel & Dr. Anupama Karki: prenatal surveillance & birth planning |
| `/pregnancy-care/postnatal-nicu` | Postnatal Recovery & NICU | Wound healing, lactation medicine, nursery liaison, on-site Level II/III NICU |
| `/diagnostics` | Diagnostics & Fertility Testing | Hormone testing (AMH), 3D/5D scans, semen analysis, HSG patency, hysterosonography |
| `/doctors` | Doctors & Specialists Directory | Multi-department specialist roster with filter tabs (Fertility, OBS, Laparoscopy, etc.) |
| `/doctors/:doctorId` | Dedicated Doctor Profile Pages | Full dossier for Dr. Anusha Tiwari, Dr. Ramesh Ghimire, Dr. Kesheb Bhurtel, Dr. Anupama Karki, Dr. Ramesh Poudel, Dr. Ritu, Dr. Bikash Adhikari, Dr. Suresh Thapa |
| `/facilities` | Facilities & Technology | Positive pressure embryology cleanroom, time-lapse incubators, surgical theaters, bio-bank |
| `/patient-resources` | Patient Resources Hub | Gateway to transparent pricing, calculators, patient guides, and FAQs |
| `/pricing` | Treatment Packages & Fees | Itemized pricing for IUI, IVF, egg freezing, TESA, installment options |
| `/faq` | Frequently Asked Questions | Categorized clinical FAQs with expert answers and takeaways |
| `/calculator` | Pregnancy Due Date Calculator | Interactive LMP, conception date, and IVF transfer due date estimator |
| `/journey` | Patient Step-by-Step Journey | 4-step roadmap from initial consult to positive test and pregnancy care |
| `/stories` | Verified Patient Stories | Documented patient reviews, baby names, years trying, verified badges |
| `/contact` | Contact & Hospital Location | Maulakalika Hospital map embed, hotlines, OPD hours, inquiry form, appointment booking |

---

### 4. Technical Architecture & Implementation Strategy

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          ROUTING & STATE ARCHITECTURE                       │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   Browser URL (e.g., /treatments/ivf or /doctors/dr-ramesh-ghimire)         │
│                                │                                            │
│                                ▼                                            │
│   Client-Side Router (HTML5 History API with popstate & pushState listener)  │
│   Supported by Express fallback `app.get('*', (req, res) => index.html)`   │
│                                │                                            │
│                                ▼                                            │
│   Active Route Parser:                                                      │
│    ├── Exact Hub Matches: '/', '/about', '/diagnostics', '/facilities', ... │
│    ├── Dynamic Treatment Subpage: '/treatments/:treatmentId'                │
│    ├── Dynamic Condition Subpage: '/conditions/:conditionId'                │
│    ├── Dynamic Maternity Subpage: '/pregnancy-care/:serviceId'              │
│    └── Dynamic Doctor Bio Subpage: '/doctors/:doctorId'                     │
│                                │                                            │
│                                ▼                                            │
│   Shared Layout Wrapper:                                                    │
│    ├── Header: Multi-Level Dropdowns, Mobile Drawer, Language Toggle        │
│    ├── Breadcrumbs Navigation Component                                    │
│    ├── Active Page Component (Lazy/Component rendering)                    │
│    ├── AppointmentModal & LiveChatWidget (Context/State managed)            │
│    └── Footer: Organized Sitemap Links matching new URL structure           │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

#### Reusable Layout Components & System Enhancements
1. **`src/components/Header.tsx`**:
   - Upgraded with responsive hover/click dropdown menus for:
     - **Treatments**: All Treatments Hub, IVF, ICSI, IUI, Blastocyst Culture, Cryopreservation, Male Surgery, Laparoscopy
     - **Conditions**: All Conditions, PCOS/PCOD, Endometriosis, Blocked Tubes, Male Infertility, Low AMH
     - **Maternity Care**: Maternity Overview, 5D Ultrasound, Obstetrics Team, Postnatal & NICU
     - **Doctors**: All Specialists, Dr. Anusha Tiwari, Dr. Ramesh Ghimire, Dr. Kesheb Bhurtel, Dr. Anupama Karki, Dr. Ramesh Poudel, etc.
     - **Resources**: Pricing & Packages, Patient Journey, Due Date Calculator, FAQs, Patient Stories
   - Mobile navigation drawer with smooth accordion menus.
2. **`src/components/Breadcrumbs.tsx`**:
   - Universal breadcrumb indicator displayed above page titles with clean semantic schema markup.
3. **`src/pages/TreatmentDetailPage.tsx`**:
   - Deep-dive treatment page rendering clinical summary, medical indications ("Ideal For"), step-by-step procedure timeline, technology highlights, success expectations, and primary consulting doctor card.
4. **`src/pages/ConditionDetailPage.tsx`**:
   - Patient-friendly clinical guide for specific infertility conditions, symptoms, diagnostic tests, treatment options at Mamta, and success outlook.
5. **`src/pages/DoctorProfilePage.tsx`**:
   - Comprehensive individual specialist dossier featuring authentic profile photo, verified qualifications, clinical fellowships, department leadership, key surgical procedures, patient testimonials, consultation hours, and instant booking modal trigger.
6. **`src/pages/FacilitiesPage.tsx`**:
   - Visual and technical showcase of the embryology cleanroom, ESCO MIRI incubators, Narishige micromanipulators, cryogenic bio-bank, 4K endoscopy towers, and Maulakalika Hospital NICU partnership.
7. **`src/pages/DiagnosticsPage.tsx`**:
   - Detailed breakdown of all investigative services (AMH, semen analysis, HSG, 5D ultrasound, hysteroscopy) with preparation instructions.
8. **`src/pages/ConditionsHubPage.tsx`**:
   - Categorized directory of female, male, and combined infertility conditions with direct links to condition subpages.
9. **`src/pages/MaternityHubPage.tsx`**:
   - Complete guide to pregnancy care from starting to delivery, featuring 5D ultrasound monitoring by Dr. Ramesh Ghimire, obstetric supervision by Dr. Kesheb Bhurtel and Dr. Anupama Karki, and NICU care.
10. **`src/pages/HomePage.tsx` (Refactored)**:
    - Cleaned and focused strictly on the clinic profile, hospital partnership, accreditations, overview gateways, and primary appointment booking CTA. Lengthy content moved to dedicated subpages.

---

### 5. Verification Plan

- **Compilation & TypeScript Check**: Execute `compile_applet` and `lint_applet` to confirm 100% clean builds with zero type errors.
- **URL & History Navigation**: Test all standard paths (`/`, `/about`, `/fertility-treatments`, `/treatments/ivf`, `/conditions/pcos`, `/doctors/dr-anusha`, etc.) for direct loading, browser back/forward buttons, and smooth scrolling.
- **Dropdown & Mobile Menu Verification**: Confirm that all desktop dropdowns and mobile drawer accordions expand reliably and close upon page navigation.
- **Functional Interactivity**: Verify that the Appointment Booking Modal, Due Date Calculator, Live Chat, and Language Toggle continue to work flawlessly across all routes.
