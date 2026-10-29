import React, { useState, useMemo } from 'react';
import {
  Calendar,
  Heart,
  Sparkles,
  Clock,
  Info,
  AlertCircle,
  CheckCircle2,
  HelpCircle,
  ChevronRight,
  TrendingUp,
  Stethoscope,
  Activity,
  ArrowRight,
} from 'lucide-react';

interface OvulationCalculatorProps {
  onOpenBookingForConsultation?: (doctorName?: string, branchId?: string, treatmentName?: string) => void;
  language?: 'en' | 'ne';
}

export const OvulationCalculator: React.FC<OvulationCalculatorProps> = ({
  onOpenBookingForConsultation,
  language = 'en',
}) => {
  // Inputs
  const [lmpDate, setLmpDate] = useState<string>(() => {
    // Default to 12 days ago
    const d = new Date();
    d.setDate(d.getDate() - 12);
    return d.toISOString().split('T')[0];
  });
  const [cycleLength, setCycleLength] = useState<number>(28);
  const [lutealPhase, setLutealPhase] = useState<number>(14);
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);
  const [selectedCycleIndex, setSelectedCycleIndex] = useState<number>(0);

  // Calculation logic
  const results = useMemo(() => {
    if (!lmpDate) return null;
    const baseLmp = new Date(lmpDate);
    if (isNaN(baseLmp.getTime())) return null;

    // We project 3 consecutive cycles
    const cycles = [0, 1, 2].map((cycleOffset) => {
      const cycleStart = new Date(baseLmp);
      cycleStart.setDate(baseLmp.getDate() + cycleOffset * cycleLength);

      // Ovulation day = Cycle Start + Cycle Length - Luteal Phase
      const ovulationDate = new Date(cycleStart);
      ovulationDate.setDate(cycleStart.getDate() + cycleLength - lutealPhase);

      // Fertile window: 5 days before ovulation to 1 day after ovulation
      const fertileStart = new Date(ovulationDate);
      fertileStart.setDate(ovulationDate.getDate() - 5);

      const fertileEnd = new Date(ovulationDate);
      fertileEnd.setDate(ovulationDate.getDate() + 1);

      // Peak fertility: 2 days leading up to and day of ovulation
      const peakStart = new Date(ovulationDate);
      peakStart.setDate(ovulationDate.getDate() - 2);

      // Implantation window: 6 to 10 days post ovulation
      const implantationStart = new Date(ovulationDate);
      implantationStart.setDate(ovulationDate.getDate() + 6);

      const implantationEnd = new Date(ovulationDate);
      implantationEnd.setDate(ovulationDate.getDate() + 10);

      // Next expected period
      const nextPeriod = new Date(cycleStart);
      nextPeriod.setDate(cycleStart.getDate() + cycleLength);

      // Earliest pregnancy test date (day of expected period or ovulation + 14)
      const earliestTestDate = new Date(ovulationDate);
      earliestTestDate.setDate(ovulationDate.getDate() + 14);

      return {
        cycleNumber: cycleOffset + 1,
        cycleStart,
        ovulationDate,
        fertileStart,
        fertileEnd,
        peakStart,
        implantationStart,
        implantationEnd,
        nextPeriod,
        earliestTestDate,
      };
    });

    const activeCycle = cycles[selectedCycleIndex] || cycles[0];
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Days until next ovulation in active cycle
    const diffTime = activeCycle.ovulationDate.getTime() - today.getTime();
    const daysUntilOvulation = Math.round(diffTime / (1000 * 60 * 60 * 24));

    // Determine current phase today relative to cycle 0
    let currentPhase = 'Follicular Phase';
    let phaseDescription = 'Estrogen is gradually rising as follicles mature in your ovaries.';
    const cycle0 = cycles[0];
    const todayDiff = Math.round((today.getTime() - cycle0.cycleStart.getTime()) / (1000 * 60 * 60 * 24));

    if (todayDiff < 0) {
      currentPhase = 'Pre-Cycle';
      phaseDescription = 'Your selected LMP date is in the future. Please adjust your date.';
    } else if (todayDiff < 5) {
      currentPhase = 'Menstrual Phase (Days 1–5)';
      phaseDescription = 'The uterine lining is shedding. Low hormones, early follicular recruitment starts.';
    } else if (today.getTime() >= cycle0.fertileStart.getTime() && today.getTime() < cycle0.peakStart.getTime()) {
      currentPhase = 'High Fertility Window';
      phaseDescription = 'Sperm can survive up to 5 days in cervical mucus awaiting ovulation.';
    } else if (today.getTime() >= cycle0.peakStart.getTime() && today.getTime() <= cycle0.ovulationDate.getTime()) {
      currentPhase = 'Peak Fertility (Ovulation Imminent)';
      phaseDescription = 'LH surge has triggered or is triggering egg release. Optimum time for conception or IUI.';
    } else if (today.getTime() > cycle0.ovulationDate.getTime() && today.getTime() <= cycle0.implantationEnd.getTime()) {
      currentPhase = 'Luteal Phase / Implantation Window';
      phaseDescription = 'Progesterone dominates to prepare the endometrium for blastocyst attachment.';
    } else if (today.getTime() > cycle0.implantationEnd.getTime() && today.getTime() < cycle0.nextPeriod.getTime()) {
      currentPhase = 'Late Luteal Phase';
      phaseDescription = 'Progesterone remains elevated if conception occurred; earliest high-sensitivity pregnancy test approaches.';
    }

    return {
      cycles,
      activeCycle,
      daysUntilOvulation,
      currentPhase,
      phaseDescription,
      todayDiff,
    };
  }, [lmpDate, cycleLength, lutealPhase, selectedCycleIndex]);

  const formatDate = (d: Date) => {
    return d.toLocaleDateString(language === 'ne' ? 'ne-NP' : 'en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const formatShortDate = (d: Date) => {
    return d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="space-y-8">
      {/* 1. INPUT CARD */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs">
        <div className="max-w-3xl space-y-2 mb-6">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-[#E48AA0] uppercase tracking-wider bg-[#FCEEF1] px-3 py-1 rounded-full">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Biological Ovulation & Fertile Window Tracker</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1D3B58] tracking-tight">
            Calculate Your Fertile Days & Peak Ovulation
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Enter the first day of your last period and your typical cycle length. Our algorithm calculates your most fertile window, estimated LH surge, and optimal conception days based on clinical reproductive medicine standards.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          {/* Input 1: LMP */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-[#1D3B58] uppercase tracking-wider">
              1. First Day of Last Period (LMP)
            </label>
            <div className="relative">
              <input
                type="date"
                value={lmpDate}
                onChange={(e) => setLmpDate(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-[#1D3B58] focus:outline-none focus:ring-2 focus:ring-[#E48AA0] focus:border-transparent cursor-pointer"
              />
            </div>
            <span className="text-[11px] text-slate-500 block">
              The date fresh red bleeding started.
            </span>
          </div>

          {/* Input 2: Cycle Length */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-[#1D3B58] uppercase tracking-wider">
                2. Average Cycle Length
              </label>
              <span className="text-xs font-extrabold text-[#E48AA0] bg-[#FCEEF1] px-2 py-0.5 rounded-full">
                {cycleLength} Days
              </span>
            </div>
            <input
              type="range"
              min={21}
              max={45}
              value={cycleLength}
              onChange={(e) => setCycleLength(Number(e.target.value))}
              className="w-full accent-[#E48AA0] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>21 Days (Short)</span>
              <span className="font-semibold text-slate-600">28 Days (Standard)</span>
              <span>45 Days (Long)</span>
            </div>
          </div>

          {/* Input 3: Luteal Phase (Advanced) */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-[#1D3B58] uppercase tracking-wider flex items-center gap-1">
                <span>3. Luteal Phase</span>
                <button
                  type="button"
                  onClick={() => setShowAdvanced(!showAdvanced)}
                  className="text-slate-400 hover:text-slate-600 cursor-pointer"
                  title="Click to toggle explanation"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                </button>
              </label>
              <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full">
                {lutealPhase} Days (Normal: 12-16)
              </span>
            </div>
            <input
              type="range"
              min={10}
              max={16}
              value={lutealPhase}
              onChange={(e) => setLutealPhase(Number(e.target.value))}
              className="w-full accent-[#1D3B58] cursor-pointer"
            />
            <span className="text-[11px] text-slate-500 block">
              Days from ovulation to next period (Default is 14 days).
            </span>
          </div>
        </div>

        {showAdvanced && (
          <div className="mt-4 p-4 rounded-2xl bg-amber-50/70 border border-amber-200/60 text-xs text-amber-900 space-y-1">
            <div className="font-bold flex items-center gap-1.5">
              <Info className="w-4 h-4 text-amber-600" />
              <span>Understanding Your Luteal Phase</span>
            </div>
            <p className="leading-relaxed text-[11px]">
              While follicular phases vary between women (causing cycle lengths from 21 to 45 days), the luteal phase (post-ovulation) remains remarkably constant at 12 to 14 days. If your luteal phase is consistently under 10 days, this may indicate a <em>luteal phase defect</em> or low progesterone, which Dr. Anusha Tiwari can treat with targeted luteal support.
            </p>
          </div>
        )}
      </div>

      {/* 2. RESULTS DASHBOARD */}
      {results && results.activeCycle && (
        <div className="space-y-6">
          {/* Cycle Selector Pills (Cycle 1, 2, 3) */}
          <div className="flex items-center justify-between flex-wrap gap-3 pb-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Select Cycle:
              </span>
              <div className="inline-flex p-1 bg-slate-100 rounded-xl">
                {results.cycles.map((c, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedCycleIndex(idx)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      selectedCycleIndex === idx
                        ? 'bg-[#1D3B58] text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Cycle {c.cycleNumber} ({formatShortDate(c.cycleStart)})
                  </button>
                ))}
              </div>
            </div>

            <div className="text-xs font-semibold text-slate-600 flex items-center gap-1.5">
              <Activity className="w-4 h-4 text-[#E48AA0]" />
              <span>Current Status: <strong className="text-[#1D3B58]">{results.currentPhase}</strong></span>
            </div>
          </div>

          {/* 4 PRIMARY METRICS TILES */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Tile 1: Peak Ovulation */}
            <div className="bg-gradient-to-br from-[#1D3B58] to-[#122538] text-white p-5 rounded-3xl shadow-sm space-y-2 relative overflow-hidden">
              <div className="absolute top-2 right-2 opacity-10">
                <Heart className="w-20 h-20 text-white" />
              </div>
              <span className="text-xs font-bold text-[#E48AA0] uppercase tracking-wider block">
                Peak Ovulation Day
              </span>
              <div className="text-2xl font-extrabold tracking-tight">
                {formatDate(results.activeCycle.ovulationDate)}
              </div>
              <div className="inline-flex items-center gap-1.5 text-xs bg-white/10 text-slate-200 px-2.5 py-1 rounded-lg">
                <Clock className="w-3.5 h-3.5 text-[#E48AA0]" />
                <span>
                  {results.daysUntilOvulation > 0
                    ? `In ${results.daysUntilOvulation} days`
                    : results.daysUntilOvulation === 0
                    ? 'Today!'
                    : `${Math.abs(results.daysUntilOvulation)} days ago`}
                </span>
              </div>
            </div>

            {/* Tile 2: Fertile Window */}
            <div className="bg-[#FCEEF1] border border-[#F5C2CD] p-5 rounded-3xl space-y-2">
              <span className="text-xs font-bold text-[#C96D83] uppercase tracking-wider block">
                Most Fertile Window
              </span>
              <div className="text-xl font-extrabold text-[#1D3B58]">
                {formatShortDate(results.activeCycle.fertileStart)} – {formatShortDate(results.activeCycle.fertileEnd)}
              </div>
              <p className="text-xs text-slate-600 leading-tight">
                Highest likelihood of conception. Intercourse recommended every 1–2 days during this window.
              </p>
            </div>

            {/* Tile 3: Implantation Window */}
            <div className="bg-white border border-slate-200 p-5 rounded-3xl space-y-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                Likely Implantation Window
              </span>
              <div className="text-xl font-extrabold text-[#1D3B58]">
                {formatShortDate(results.activeCycle.implantationStart)} – {formatShortDate(results.activeCycle.implantationEnd)}
              </div>
              <p className="text-xs text-slate-600 leading-tight">
                6 to 10 days post-ovulation, when a fertilized blastocyst may attach to the uterine lining.
              </p>
            </div>

            {/* Tile 4: Earliest Pregnancy Test */}
            <div className="bg-white border border-slate-200 p-5 rounded-3xl space-y-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                Earliest Pregnancy Test
              </span>
              <div className="text-xl font-extrabold text-[#1D3B58]">
                {formatDate(results.activeCycle.earliestTestDate)}
              </div>
              <p className="text-xs text-slate-600 leading-tight">
                Expected first day of missed period. High-sensitivity urine hCG test gives reliable accuracy.
              </p>
            </div>
          </div>

          {/* 3. VISUAL 28-DAY HORMONAL CYCLE TIMELINE */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-[#1D3B58]">
                  Cycle Timeline & Phase Visualization (Cycle {results.activeCycle.cycleNumber})
                </h3>
                <p className="text-xs text-slate-500">
                  Visual roadmap from period onset through fertile peak to the two-week wait.
                </p>
              </div>

              {/* Legend */}
              <div className="flex flex-wrap items-center gap-3 text-xs">
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-rose-400 inline-block" />
                  <span className="text-slate-600">Period (1–5)</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-pink-300 inline-block" />
                  <span className="text-slate-600">Fertile Window</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-[#1D3B58] inline-block" />
                  <span className="text-slate-900 font-bold">Ovulation Day</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-teal-400 inline-block" />
                  <span className="text-slate-600">Implantation</span>
                </span>
              </div>
            </div>

            {/* Interactive Day Cards Grid */}
            <div className="grid grid-cols-7 sm:grid-cols-14 md:grid-cols-28 gap-1.5 pt-2">
              {Array.from({ length: cycleLength }).map((_, dayIndex) => {
                const dayNum = dayIndex + 1;
                const cardDate = new Date(results.activeCycle.cycleStart);
                cardDate.setDate(results.activeCycle.cycleStart.getDate() + dayIndex);

                const isMenstrual = dayNum <= 5;
                const isOvulation = cardDate.toDateString() === results.activeCycle.ovulationDate.toDateString();
                const isPeak =
                  cardDate.getTime() >= results.activeCycle.peakStart.getTime() &&
                  cardDate.getTime() <= results.activeCycle.ovulationDate.getTime();
                const isFertile =
                  cardDate.getTime() >= results.activeCycle.fertileStart.getTime() &&
                  cardDate.getTime() <= results.activeCycle.fertileEnd.getTime();
                const isImplantation =
                  cardDate.getTime() >= results.activeCycle.implantationStart.getTime() &&
                  cardDate.getTime() <= results.activeCycle.implantationEnd.getTime();

                let bgClass = 'bg-slate-50 border-slate-200 text-slate-700';
                let tag = '';

                if (isOvulation) {
                  bgClass = 'bg-[#1D3B58] text-white border-[#1D3B58] ring-2 ring-[#E48AA0] scale-105 shadow-md z-10';
                  tag = '★ PEAK';
                } else if (isPeak) {
                  bgClass = 'bg-[#FCEEF1] text-[#C96D83] border-[#F5C2CD] font-bold';
                  tag = 'High';
                } else if (isFertile) {
                  bgClass = 'bg-pink-50 text-pink-700 border-pink-200';
                  tag = 'Fertile';
                } else if (isMenstrual) {
                  bgClass = 'bg-rose-50 text-rose-700 border-rose-200';
                  tag = 'Period';
                } else if (isImplantation) {
                  bgClass = 'bg-teal-50 text-teal-800 border-teal-200';
                  tag = 'Implant';
                }

                return (
                  <div
                    key={dayIndex}
                    className={`rounded-xl border p-1.5 flex flex-col items-center justify-between min-h-[58px] transition-all text-center ${bgClass}`}
                    title={`Day ${dayNum} (${formatShortDate(cardDate)}): ${tag || 'Low fertility'}`}
                  >
                    <span className="text-[10px] opacity-75 font-mono">D{dayNum}</span>
                    <span className="text-xs font-bold leading-none">{cardDate.getDate()}</span>
                    <span className="text-[9px] font-semibold tracking-tighter truncate w-full">
                      {tag || '·'}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Upcoming 3-Cycle Forecast Table */}
            <div className="pt-4 border-t border-slate-100">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
                Upcoming 3-Month Ovulation Forecast
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {results.cycles.map((c, i) => (
                  <div
                    key={i}
                    onClick={() => setSelectedCycleIndex(i)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                      selectedCycleIndex === i
                        ? 'border-[#1D3B58] bg-[#F9FAFC] shadow-xs'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs font-bold text-[#1D3B58] mb-1">
                      <span>Cycle {c.cycleNumber}</span>
                      <span className="text-[11px] font-normal text-slate-500">
                        Starts {formatShortDate(c.cycleStart)}
                      </span>
                    </div>
                    <div className="text-sm font-extrabold text-[#E48AA0]">
                      Ovulation: {formatShortDate(c.ovulationDate)}
                    </div>
                    <div className="text-xs text-slate-600 mt-1">
                      Fertile: {formatShortDate(c.fertileStart)} – {formatShortDate(c.fertileEnd)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. CLINICAL EXPLANATIONS & MEDICAL LIMITATIONS (ETHICAL TRANSPARENCY) */}
      <div className="bg-[#F9FAFC] rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 mt-0.5">
            <AlertCircle className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-[#1D3B58]">
              Clinical Limitations & When to Seek Specialist Care
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              While mathematical ovulation calculators provide a valuable guideline, biological cycles are influenced by subtle neuroendocrine variations. Understanding these limitations empowers you to make informed fertility decisions.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-1.5">
            <span className="font-bold text-[#1D3B58] text-sm flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-rose-500 shrink-0" />
              <span>Irregular Cycles & PCOS/PCOD</span>
            </span>
            <p className="text-slate-600 leading-relaxed">
              If your cycle fluctuates by more than 4–5 days each month or you have Polycystic Ovarian Syndrome (PCOS), calendar algorithms may mispredict your fertile window. Ultrasound follicular tracking is the gold standard for irregular ovulation.
            </p>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-1.5">
            <span className="font-bold text-[#1D3B58] text-sm flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-rose-500 shrink-0" />
              <span>Anovulatory Cycles (No Egg Released)</span>
            </span>
            <p className="text-slate-600 leading-relaxed">
              Menstrual bleeding can occasionally occur without true follicle rupture (anovulation), common in hyperprolactinemia, thyroid dysfunction, or extreme stress. Progesterone blood tests confirm true ovulation.
            </p>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-1.5">
            <span className="font-bold text-[#1D3B58] text-sm flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-rose-500 shrink-0" />
              <span>Luteal Phase Defect (&lt; 10 Days)</span>
            </span>
            <p className="text-slate-600 leading-relaxed">
              A short interval between ovulation and menstruation prevents embryo implantation. This is easily identified and successfully managed with natural micronized progesterone support during your consultation.
            </p>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-1.5">
            <span className="font-bold text-[#1D3B58] text-sm flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-rose-500 shrink-0" />
              <span>Follicular Tracking Ultrasound (TVS)</span>
            </span>
            <p className="text-slate-600 leading-relaxed">
              At Maulakalika Hospital Chitwan, Dr. Anusha Tiwari performs serial transvaginal ultrasound scans (Days 9, 11, 13) to measure dominant follicle growth (18–20 mm) and endometrial thickness (triple-line pattern).
            </p>
          </div>
        </div>

        {/* CONSULTATION BANNER */}
        <div className="bg-gradient-to-r from-[#1D3B58] to-[#122538] text-white p-6 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="font-bold text-base">Trying to Conceive for Over 6 to 12 Months?</h4>
            <p className="text-xs text-slate-300">
              Schedule an advanced follicular tracking scan and ovarian reserve (AMH) evaluation at Maulakalika Hospital Chitwan.
            </p>
          </div>
          {onOpenBookingForConsultation && (
            <button
              type="button"
              onClick={() => onOpenBookingForConsultation('Dr. Anusha Tiwari', 'chitwan', 'Follicular Tracking & Ovulation Study')}
              className="bg-[#E48AA0] hover:bg-[#D4748B] text-white px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-sm transition-all cursor-pointer whitespace-nowrap flex items-center gap-2"
            >
              <Stethoscope className="w-4 h-4" />
              <span>Book Ovulation Scan</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OvulationCalculator;
