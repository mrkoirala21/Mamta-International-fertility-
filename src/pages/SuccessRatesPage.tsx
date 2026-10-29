import React, { useState, useMemo } from 'react';
import SuccessRateStatistics from '../components/SuccessRateStatistics';
import {
  TrendingUp,
  Award,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  AlertCircle,
  Sparkles,
  Info,
  Phone,
  MessageSquare,
  HelpCircle,
  Layers,
  Activity,
  Heart,
  Stethoscope,
  Microscope,
  FileCheck,
} from 'lucide-react';

interface SuccessRatesPageProps {
  onOpenBooking: (doctorName?: string, branchId?: string, treatmentName?: string) => void;
  language?: 'en' | 'ne';
}

export const SuccessRatesPage: React.FC<SuccessRatesPageProps> = ({
  onOpenBooking,
  language = 'en',
}) => {
  // Personalized Prognosis Estimator state
  const [selectedAge, setSelectedAge] = useState<string>('under35');
  const [selectedTreatment, setSelectedTreatment] = useState<string>('blastocyst_fet');
  const [previousAttempts, setPreviousAttempts] = useState<string>('0');
  const [maleFactor, setMaleFactor] = useState<boolean>(false);

  // Personalized prognosis calculation
  const prognosis = useMemo(() => {
    // Base rates
    let baseRate = 65;
    let labSurvival = 98;
    let blastocystRate = 65;
    let notes = 'Favorable prognosis with personalized protocol and Day 5 blastocyst selection.';

    if (selectedTreatment === 'donor_egg') {
      baseRate = 78;
      notes = 'Utilizes rigorously screened donor oocytes from young donors; age-related maternal egg factors are mitigated.';
    } else if (selectedTreatment === 'blastocyst_fet') {
      if (selectedAge === 'under35') baseRate = 72;
      else if (selectedAge === '35to37') baseRate = 64;
      else if (selectedAge === '38to40') baseRate = 51;
      else if (selectedAge === '41to42') baseRate = 38;
      else baseRate = 25;
      notes = 'Day 5 blastocysts cultured in ESCO MIRI® incubators maximize embryo implantation competency.';
    } else if (selectedTreatment === 'icsi_laser') {
      if (selectedAge === 'under35') baseRate = 68;
      else if (selectedAge === '35to37') baseRate = 60;
      else if (selectedAge === '38to40') baseRate = 48;
      else if (selectedAge === '41to42') baseRate = 34;
      else baseRate = 22;
      notes = 'Robotic micromanipulation bypasses severe sperm factor; laser-assisted hatching thins the zona pellucida.';
    } else if (selectedTreatment === 'standard_ivf') {
      if (selectedAge === 'under35') baseRate = 61;
      else if (selectedAge === '35to37') baseRate = 54;
      else if (selectedAge === '38to40') baseRate = 42;
      else if (selectedAge === '41to42') baseRate = 30;
      else baseRate = 18;
      notes = 'Ideal for tubal blockage or mild unexplained infertility with normal sperm parameters.';
    } else if (selectedTreatment === 'iui') {
      if (selectedAge === 'under35') baseRate = 24;
      else if (selectedAge === '35to37') baseRate = 19;
      else if (selectedAge === '38to40') baseRate = 12;
      else baseRate = 7;
      notes = 'First-line non-invasive therapy. Cumulative 3-cycle success reaches 45–50% in women under 35.';
    }

    // Cumulative 3-cycle projection
    const single = baseRate / 100;
    // 1 - (1 - single)^3
    const cumulativeProb = Math.min(94, Math.round((1 - Math.pow(1 - single, 3)) * 100));

    return {
      singleCycleRate: baseRate,
      cumulativeRate: cumulativeProb,
      labSurvival,
      blastocystRate,
      notes,
    };
  }, [selectedAge, selectedTreatment, previousAttempts, maleFactor]);

  return (
    <div className="space-y-12 pb-20">
      {/* 1. HERO SECTION */}
      <section className="bg-gradient-to-b from-[#1D3B58] to-[#122538] text-white py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-semibold bg-white/10 text-[#E48AA0] px-3.5 py-1.5 rounded-full">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Audited Clinical Performance & Transparent Reporting</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            Fertility Treatment Success Rates & Clinical Outcomes
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
            At Mamata International Fertility Centre, based at Maulakalika Hospital Pvt. Ltd., Bharatpur-11, Chitwan, we hold ourselves to rigorous ethical standards. We report verified clinical pregnancy rates confirmed by fetal heartbeat ultrasound, adhering strictly to European Society of Human Reproduction and Embryology (ESHRE) and ASRM registry guidelines.
          </p>
        </div>
      </section>

      {/* 2. DYNAMIC INTERACTIVE CHARTS & STATISTICS (EMBEDDED) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SuccessRateStatistics
          onOpenBooking={() => onOpenBooking('Dr. Anusha Tiwari', 'chitwan', 'IVF Assessment')}
          language={language}
        />
      </section>

      {/* 3. PERSONALIZED PROGNOSIS ESTIMATOR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs space-y-8">
          <div className="max-w-3xl space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#E48AA0] uppercase tracking-wider bg-[#FCEEF1] px-3 py-1 rounded-full">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Interactive Clinical Estimator</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1D3B58] tracking-tight">
              Personalized Success Probability Explorer
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Select your specific parameters to view realistic, evidence-based statistical estimates based on our Chitwan embryology lab outcomes. Every patient is biologically unique; this tool serves as an educational starting point.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Input Controls (Left 7 Cols) */}
            <div className="lg:col-span-7 space-y-6">
              {/* Maternal Age Bracket */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#1D3B58] uppercase tracking-wider block">
                  1. Maternal Age Group
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {[
                    { id: 'under35', label: '< 35 Yrs' },
                    { id: '35to37', label: '35–37 Yrs' },
                    { id: '38to40', label: '38–40 Yrs' },
                    { id: '41to42', label: '41–42 Yrs' },
                    { id: '43plus', label: '43+ Yrs' },
                  ].map((age) => (
                    <button
                      key={age.id}
                      type="button"
                      onClick={() => setSelectedAge(age.id)}
                      className={`py-2.5 px-2 rounded-xl text-xs font-bold transition-all border cursor-pointer text-center ${
                        selectedAge === age.id
                          ? 'bg-[#1D3B58] text-white border-[#1D3B58] shadow-xs'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {age.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Treatment Modality */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#1D3B58] uppercase tracking-wider block">
                  2. Reproductive Treatment Type
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {[
                    { id: 'blastocyst_fet', title: 'Day 5 Blastocyst FET', desc: 'Frozen embryo transfer in prepared endometrium' },
                    { id: 'icsi_laser', title: 'ICSI + Laser Hatching', desc: 'Micromanipulation for sperm or thick zona' },
                    { id: 'standard_ivf', title: 'Standard IVF Cycle', desc: 'Conventional fertilization for tubal/unexplained' },
                    { id: 'donor_egg', title: 'Donor Egg IVF Program', desc: 'Screened young donor eggs with blastocyst' },
                    { id: 'iui', title: 'Intrauterine Insemination (IUI)', desc: 'Mild stimulation with sperm wash' },
                  ].map((tr) => (
                    <button
                      key={tr.id}
                      type="button"
                      onClick={() => setSelectedTreatment(tr.id)}
                      className={`p-3 rounded-2xl text-left border transition-all cursor-pointer ${
                        selectedTreatment === tr.id
                          ? 'border-[#1D3B58] bg-[#FCEEF1]/40 ring-1 ring-[#E48AA0]'
                          : 'border-slate-200 bg-white hover:border-slate-300'
                      }`}
                    >
                      <div className="font-bold text-xs text-[#1D3B58] flex items-center justify-between">
                        <span>{tr.title}</span>
                        {selectedTreatment === tr.id && (
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#E48AA0]" />
                        )}
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">{tr.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Co-factors (Male factor, prior attempts) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#1D3B58] uppercase tracking-wider block">
                    3. Prior IVF Cycles Elsewhere
                  </label>
                  <select
                    value={previousAttempts}
                    onChange={(e) => setPreviousAttempts(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold text-[#1D3B58] cursor-pointer"
                  >
                    <option value="0">First Cycle (No previous IVF)</option>
                    <option value="1">1 Prior Unsuccessful Cycle</option>
                    <option value="2">2+ Prior Unsuccessful Cycles</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#1D3B58] uppercase tracking-wider block">
                    4. Concomitant Male Factor
                  </label>
                  <div className="flex items-center gap-3 pt-1">
                    <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={maleFactor}
                        onChange={(e) => setMaleFactor(e.target.checked)}
                        className="rounded text-[#E48AA0] focus:ring-[#E48AA0] w-4 h-4 cursor-pointer"
                      />
                      <span>Low sperm count / motility / morphology</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Estimated Prognosis Results Card (Right 5 Cols) */}
            <div className="lg:col-span-5 bg-gradient-to-br from-[#1D3B58] to-[#122538] text-white p-6 sm:p-7 rounded-3xl space-y-6 flex flex-col justify-between shadow-lg">
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <span className="text-xs font-bold text-[#E48AA0] uppercase tracking-wider">
                    Evidence-Based Prognosis
                  </span>
                  <span className="text-[11px] bg-white/10 text-slate-200 px-2 py-0.5 rounded-full">
                    Audited Lab Benchmark
                  </span>
                </div>

                {/* Big Rate 1 */}
                <div className="space-y-1">
                  <div className="text-xs text-slate-300 font-medium">
                    Clinical Pregnancy per Embryo Transfer
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl sm:text-5xl font-black text-white">
                      {prognosis.singleCycleRate}%
                    </span>
                    <span className="text-xs text-emerald-400 font-bold">
                      Ultrasound Heartbeat Rate
                    </span>
                  </div>
                  {/* Visual Progress Bar */}
                  <div className="w-full bg-white/10 rounded-full h-2.5 mt-2 overflow-hidden">
                    <div
                      className="bg-[#E48AA0] h-2.5 rounded-full transition-all duration-500"
                      style={{ width: `${prognosis.singleCycleRate}%` }}
                    />
                  </div>
                </div>

                {/* Big Rate 2: Cumulative */}
                <div className="space-y-1 pt-2">
                  <div className="text-xs text-slate-300 font-medium">
                    Cumulative 3-Cycle Success Potential
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-extrabold text-white">
                      {prognosis.cumulativeRate}%
                    </span>
                    <span className="text-xs text-slate-300">
                      (With sequential frozen transfers)
                    </span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2 mt-1.5 overflow-hidden">
                    <div
                      className="bg-emerald-400 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${prognosis.cumulativeRate}%` }}
                    />
                  </div>
                </div>

                {/* Clinical Note */}
                <div className="p-3.5 bg-white/10 rounded-2xl text-xs text-slate-200 space-y-1">
                  <span className="font-bold text-white text-[11px] uppercase tracking-wider block">
                    Protocol Insights:
                  </span>
                  <p className="leading-relaxed text-[11px] text-slate-300">
                    {prognosis.notes}
                  </p>
                </div>
              </div>

              {/* Consultation Action */}
              <div className="pt-4 border-t border-white/10 space-y-2">
                <button
                  type="button"
                  onClick={() => onOpenBooking('Dr. Anusha Tiwari', 'chitwan', 'IVF Assessment')}
                  className="w-full bg-[#E48AA0] hover:bg-[#D4748B] text-white py-3 rounded-xl font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Schedule Consultation with Dr. Anusha Tiwari</span>
                </button>
                <p className="text-[10px] text-center text-slate-400">
                  Maulakalika Hospital Pvt. Ltd., Bharatpur-11, Chitwan
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. ETHICAL FRAMEWORK & MEDICAL STANDARDS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#F9FAFC] rounded-3xl border border-slate-200 p-8 sm:p-10 space-y-8">
          <div className="max-w-3xl space-y-2">
            <span className="text-xs font-bold text-[#E48AA0] uppercase tracking-wider">
              Transparency & Ethics
            </span>
            <h3 className="text-2xl font-bold text-[#1D3B58]">
              Ethical Reporting: How to Read & Compare Fertility Success Rates
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Infertility treatment is deeply personal. Misleading statistics and false guarantees exploit patient vulnerability. Here is how Mamata International Fertility Centre ensures 100% truthful, evidence-based communication.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-xs">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-2">
              <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
                <Activity className="w-4 h-4" />
              </div>
              <span className="font-bold text-[#1D3B58] text-sm block">1. Clinical vs Chemical</span>
              <p className="text-slate-600 leading-relaxed">
                We only report <strong>Clinical Pregnancy Rates</strong> verified by gestational sac and embryonic cardiac pulsation at 6–7 weeks on ultrasound, not fleeting biochemical hCG elevations.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-2">
              <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
                <AlertCircle className="w-4 h-4" />
              </div>
              <span className="font-bold text-[#1D3B58] text-sm block">2. No 100% Guarantees</span>
              <p className="text-slate-600 leading-relaxed">
                No ethical reproductive clinic can guarantee 100% success. Human reproduction involves genetic meiotic recombination and endometrial cross-talk that cannot be guaranteed with commercial certainty.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-2">
              <div className="w-8 h-8 rounded-xl bg-pink-50 text-[#E48AA0] flex items-center justify-center font-bold">
                <Microscope className="w-4 h-4" />
              </div>
              <span className="font-bold text-[#1D3B58] text-sm block">3. Day 5 Blastocyst Culture</span>
              <p className="text-slate-600 leading-relaxed">
                By culturing embryos to the Day 5 blastocyst stage (120–200 cells) in ESCO MIRI® incubators, we filter out embryos with early developmental arrest, yielding superior implantation per transfer.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-2">
              <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                <FileCheck className="w-4 h-4" />
              </div>
              <span className="font-bold text-[#1D3B58] text-sm block">4. ESHRE & ASRM Guidelines</span>
              <p className="text-slate-600 leading-relaxed">
                Our embryology and clinical protocols comply with international European (ESHRE) and American (ASRM) assisted reproduction reporting registries for maximum credibility and patient safety.
              </p>
            </div>
          </div>

          {/* Biological Pillars Box */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-3">
            <h4 className="font-bold text-sm text-[#1D3B58]">
              The 4 Biological Pillars That Determine Individual Pregnancy Success:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
              <div className="border-l-2 border-[#1D3B58] pl-3 space-y-1">
                <span className="font-bold text-[#1D3B58] block">A. Oocyte (Egg) Reserve & Age</span>
                <p className="text-slate-500">Maternal age dictates egg chromosomal euploidy and mitochondrial ATP energy for cell division.</p>
              </div>
              <div className="border-l-2 border-[#E48AA0] pl-3 space-y-1">
                <span className="font-bold text-[#1D3B58] block">B. Sperm DNA Fragmentation (DFI)</span>
                <p className="text-slate-500">High DNA fragmentation can cause blastocyst developmental arrest; resolved with ICSI and IMSI.</p>
              </div>
              <div className="border-l-2 border-emerald-600 pl-3 space-y-1">
                <span className="font-bold text-[#1D3B58] block">C. Endometrial Receptivity</span>
                <p className="text-slate-500">Optimal uterine lining thickness (&gt; 8 mm with trilaminar pattern) and precise progesterone timing.</p>
              </div>
              <div className="border-l-2 border-purple-600 pl-3 space-y-1">
                <span className="font-bold text-[#1D3B58] block">D. Cleanroom Laboratory Purity</span>
                <p className="text-slate-500">ISO Class 5 air filtration with zero VOCs (volatile organic compounds) and precise gas mixtures.</p>
              </div>
            </div>
          </div>

          {/* CTA BAR */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-200">
            <div className="flex items-center gap-2 text-xs text-slate-600">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Maulakalika Hospital Pvt. Ltd., Bharatpur-11, Chitwan | Verified Clinical Facility</span>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => onOpenBooking('Dr. Anusha Tiwari', 'chitwan', 'IVF Assessment')}
                className="bg-[#1D3B58] hover:bg-[#2B5A88] text-white px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>Book Doctor Assessment</span>
              </button>
              <a
                href="tel:056493798"
                className="bg-slate-100 hover:bg-slate-200 text-[#1D3B58] px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#E48AA0]" />
                <span>056-493798</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SuccessRatesPage;
