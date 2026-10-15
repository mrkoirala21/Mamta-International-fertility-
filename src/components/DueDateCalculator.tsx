import React, { useState, useMemo } from 'react';
import { Calendar, Baby, Heart, Sparkles, Clock, CheckCircle2, ArrowRight, ShieldCheck, Info } from 'lucide-react';

interface DueDateCalculatorProps {
  onOpenBookingForScan: (serviceName?: string) => void;
  language?: 'en' | 'ne';
}

type CalculationMethod = 'lmp' | 'ivf_day5' | 'ivf_day3' | 'conception';

export const DueDateCalculator: React.FC<DueDateCalculatorProps> = ({
  onOpenBookingForScan,
  language = 'en',
}) => {
  const [method, setMethod] = useState<CalculationMethod>('lmp');
  
  // Default to 6 weeks ago for realistic initial calculation
  const [inputDate, setInputDate] = useState<string>(() => {
    const d = new Date();
    d.setDate(d.getDate() - 42); // 6 weeks ago
    return d.toISOString().split('T')[0];
  });
  
  const [cycleLength, setCycleLength] = useState<number>(28);

  // Calculation Logic
  const calculationResult = useMemo(() => {
    if (!inputDate) return null;

    const baseDate = new Date(inputDate);
    if (isNaN(baseDate.getTime())) return null;

    let dueDate = new Date(baseDate);
    let conceptionDate = new Date(baseDate);

    if (method === 'lmp') {
      // Naegele's rule adjusted for cycle length:
      // LMP + 280 days + (cycleLength - 28) days
      const cycleAdjustment = cycleLength - 28;
      dueDate.setDate(baseDate.getDate() + 280 + cycleAdjustment);
      conceptionDate.setDate(baseDate.getDate() + 14 + cycleAdjustment);
    } else if (method === 'ivf_day5') {
      // Transfer of Day 5 blastocyst: Due date = Transfer date + 261 days (266 - 5)
      dueDate.setDate(baseDate.getDate() + 261);
      conceptionDate.setDate(baseDate.getDate() - 5);
    } else if (method === 'ivf_day3') {
      // Transfer of Day 3 embryo: Due date = Transfer date + 263 days (266 - 3)
      dueDate.setDate(baseDate.getDate() + 263);
      conceptionDate.setDate(baseDate.getDate() - 3);
    } else if (method === 'conception') {
      // Conception / IUI Date: Due date = Date + 266 days
      dueDate.setDate(baseDate.getDate() + 266);
      conceptionDate = new Date(baseDate);
    }

    const today = new Date();
    // Calculate gestational age from LMP (or equivalent conception + 14 days)
    const effectiveLMP = new Date(conceptionDate);
    effectiveLMP.setDate(conceptionDate.getDate() - 14);

    const diffMs = today.getTime() - effectiveLMP.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    const weeks = Math.max(0, Math.floor(diffDays / 7));
    const days = Math.max(0, diffDays % 7);

    // Days remaining until due date
    const daysRemaining = Math.max(0, Math.ceil((dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)));

    // Trimester
    let trimester = 'First Trimester';
    let trimesterProgress = 0;
    if (weeks < 13) {
      trimester = 'First Trimester (Weeks 1–12)';
      trimesterProgress = Math.min(100, (weeks / 12) * 100);
    } else if (weeks < 28) {
      trimester = 'Second Trimester (Weeks 13–27)';
      trimesterProgress = Math.min(100, ((weeks - 12) / 15) * 100);
    } else {
      trimester = 'Third Trimester (Weeks 28–40)';
      trimesterProgress = Math.min(100, ((weeks - 27) / 13) * 100);
    }

    // Baby size comparison
    const sizeComparisons: { [key: number]: { size: string; length: string; weight: string } } = {
      4: { size: 'Poppy seed', length: '1 mm', weight: '< 1 g' },
      5: { size: 'Sesame seed', length: '2 mm', weight: '< 1 g' },
      6: { size: 'Sweet pea', length: '5 mm', weight: '< 1 g' },
      7: { size: 'Blueberry', length: '1.2 cm', weight: '< 1 g' },
      8: { size: 'Raspberry', length: '1.6 cm', weight: '1 g' },
      9: { size: 'Green olive', length: '2.3 cm', weight: '2 g' },
      10: { size: 'Prune / Kumquat', length: '3.1 cm', weight: '4 g' },
      11: { size: 'Lime', length: '4.1 cm', weight: '7 g' },
      12: { size: 'Plum', length: '5.4 cm', weight: '14 g' },
      14: { size: 'Lemon', length: '8.7 cm', weight: '43 g' },
      16: { size: 'Avocado', length: '11.6 cm', weight: '100 g' },
      20: { size: 'Banana', length: '16.4 cm', weight: '300 g' },
      24: { size: 'Corn on the cob', length: '30 cm', weight: '600 g' },
      28: { size: 'Eggplant', length: '37.6 cm', weight: '1 kg' },
      32: { size: 'Squash', length: '42.4 cm', weight: '1.7 kg' },
      36: { size: 'Papaya', length: '47.4 cm', weight: '2.6 kg' },
      40: { size: 'Watermelon / Jackfruit', length: '51.2 cm', weight: '3.4 kg' },
    };

    // Find nearest milestone
    const availableWeeks = Object.keys(sizeComparisons).map(Number);
    const closestWeek = availableWeeks.reduce((prev, curr) => 
      Math.abs(curr - weeks) < Math.abs(prev - weeks) ? curr : prev, 6);
    const babyMilestone = sizeComparisons[closestWeek] || sizeComparisons[6];

    // Key milestones
    const milestones = [
      {
        name: 'First Viability & Heartbeat Scan',
        timing: 'Weeks 6–7',
        status: weeks >= 7 ? 'Completed' : 'Upcoming',
        description: 'Transvaginal scan confirming intrauterine gestational sac and cardiac activity.',
        date: new Date(new Date(effectiveLMP).setDate(effectiveLMP.getDate() + 45)).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      },
      {
        name: 'Nuchal Translucency (NT) & Dual Marker',
        timing: 'Weeks 11–13',
        status: weeks >= 13 ? 'Completed' : 'Upcoming',
        description: 'First trimester genetic and chromosomal risk assessment screening.',
        date: new Date(new Date(effectiveLMP).setDate(effectiveLMP.getDate() + 84)).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      },
      {
        name: 'Anomaly & Structural Anatomy Scan',
        timing: 'Weeks 18–20',
        status: weeks >= 20 ? 'Completed' : 'Upcoming',
        description: 'Comprehensive 4D ultrasound assessing fetal anatomy and organ development.',
        date: new Date(new Date(effectiveLMP).setDate(effectiveLMP.getDate() + 133)).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      },
      {
        name: 'Full Term Milestone',
        timing: 'Week 37',
        status: weeks >= 37 ? 'Completed' : 'Upcoming',
        description: 'Baby is fully developed and ready for safe delivery.',
        date: new Date(new Date(effectiveLMP).setDate(effectiveLMP.getDate() + 259)).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      }
    ];

    return {
      dueDateFormatted: dueDate.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      }),
      dueDayOfWeek: dueDate.toLocaleDateString('en-US', { weekday: 'long' }),
      conceptionDateFormatted: conceptionDate.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
      weeks,
      days,
      daysRemaining,
      trimester,
      trimesterProgress,
      babyMilestone,
      milestones,
    };
  }, [inputDate, method, cycleLength]);

  return (
    <section id="calculator" className="py-16 md:py-24 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="text-xs font-bold text-[#E48AA0] uppercase tracking-wider flex items-center justify-center gap-1.5">
            <Sparkles className="w-4 h-4" />
            <span>{language === 'en' ? 'Interactive Patient Resources' : 'बिरामी स्रोत तथा क्यालकुलेटर'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1D3B58] tracking-tight">
            {language === 'en' ? 'Pregnancy Due Date & Milestone Calculator' : 'डेलिभरी मिति तथा गर्भावस्था क्यालकुलेटर'}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            {language === 'en'
              ? 'Calculate your estimated delivery date using your Last Menstrual Period (LMP) or IVF embryo transfer date, and map your crucial prenatal scan milestones.'
              : 'अन्तिम महिनावारी मिति वा IVF भ्रूण स्थानान्तरण मिति राखेर सम्भावित डेलिभरी मिति र मुख्य अल्ट्रासाउन्ड मितिहरू पत्ता लगाउनुहोस्।'}
          </p>
        </div>

        {/* MAIN CALCULATOR CONTAINER */}
        <div className="bg-[#F9FAFC] rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* LEFT INPUT CONTROLS */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  1. Select Calculation Method:
                </label>
                
                {/* Method Tabs */}
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setMethod('lmp')}
                    className={`p-3 rounded-xl text-left border transition-all text-xs font-semibold ${
                      method === 'lmp'
                        ? 'bg-[#1D3B58] text-white border-[#1D3B58] shadow-sm'
                        : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
                    }`}
                  >
                    🌸 Last Period (LMP)
                  </button>

                  <button
                    type="button"
                    onClick={() => setMethod('ivf_day5')}
                    className={`p-3 rounded-xl text-left border transition-all text-xs font-semibold ${
                      method === 'ivf_day5'
                        ? 'bg-[#1D3B58] text-white border-[#1D3B58] shadow-sm'
                        : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
                    }`}
                  >
                    🔬 IVF Day 5 Blastocyst
                  </button>

                  <button
                    type="button"
                    onClick={() => setMethod('ivf_day3')}
                    className={`p-3 rounded-xl text-left border transition-all text-xs font-semibold ${
                      method === 'ivf_day3'
                        ? 'bg-[#1D3B58] text-white border-[#1D3B58] shadow-sm'
                        : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
                    }`}
                  >
                    🧬 IVF Day 3 Embryo
                  </button>

                  <button
                    type="button"
                    onClick={() => setMethod('conception')}
                    className={`p-3 rounded-xl text-left border transition-all text-xs font-semibold ${
                      method === 'conception'
                        ? 'bg-[#1D3B58] text-white border-[#1D3B58] shadow-sm'
                        : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
                    }`}
                  >
                    ✨ Conception / IUI Date
                  </button>
                </div>
              </div>

              {/* DATE PICKER */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center justify-between">
                  <span>
                    {method === 'lmp'
                      ? 'First Day of Last Period (LMP):'
                      : method === 'ivf_day5'
                      ? 'Date of Day 5 Blastocyst Transfer:'
                      : method === 'ivf_day3'
                      ? 'Date of Day 3 Embryo Transfer:'
                      : 'Date of Ovulation / Insemination:'}
                  </span>
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={inputDate}
                    onChange={(e) => setInputDate(e.target.value)}
                    max={new Date().toISOString().split('T')[0]}
                    className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-hidden focus:border-[#E48AA0] focus:ring-1 focus:ring-[#E48AA0] shadow-2xs"
                  />
                </div>
                <p className="text-[11px] text-slate-500">
                  {method === 'lmp'
                    ? 'Enter the date your last menstrual cycle began.'
                    : 'Enter the exact procedure date logged in your clinic record.'}
                </p>
              </div>

              {/* CYCLE LENGTH (Only shown for LMP) */}
              {method === 'lmp' && (
                <div className="space-y-2 p-4 bg-white rounded-xl border border-slate-200">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-700">Average Menstrual Cycle Length:</span>
                    <span className="font-bold text-[#E48AA0] tabular-nums text-sm">
                      {cycleLength} Days
                    </span>
                  </div>
                  <input
                    type="range"
                    min="21"
                    max="35"
                    value={cycleLength}
                    onChange={(e) => setCycleLength(parseInt(e.target.value, 10))}
                    className="w-full accent-[#E48AA0] cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400">
                    <span>21 Days (Shorter)</span>
                    <span>28 Days (Standard)</span>
                    <span>35 Days (Longer)</span>
                  </div>
                </div>
              )}

              {/* Clinical note */}
              <div className="p-3.5 bg-blue-50/60 rounded-xl border border-blue-100 flex items-start gap-2.5 text-xs text-blue-900">
                <Info className="w-4 h-4 text-[#2B5A88] shrink-0 mt-0.5" />
                <p className="leading-relaxed text-[11px]">
                  <strong>Clinical Accuracy Note:</strong> Only ~5% of babies arrive precisely on their calculated due date. Most healthy deliveries safely occur between 37 and 42 weeks. An early viability ultrasound scan at Mamata Centre confirms gestational age with millimeter precision.
                </p>
              </div>
            </div>

            {/* RIGHT RESULTS DISPLAY CARD */}
            <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-sm">
              {calculationResult ? (
                <>
                  {/* BIG HERO ESTIMATED DUE DATE */}
                  <div className="text-center sm:text-left pb-6 border-b border-slate-100 space-y-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#C96D83] bg-[#FCEEF1] px-3 py-1 rounded-full inline-block">
                      Estimated Due Date (EDD)
                    </span>
                    <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1D3B58] tracking-tight">
                      {calculationResult.dueDateFormatted}
                    </div>
                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 text-xs text-slate-600 pt-1">
                      <span className="flex items-center gap-1 font-semibold text-slate-800">
                        <Clock className="w-3.5 h-3.5 text-[#E48AA0]" />
                        <span>Approx. {calculationResult.daysRemaining} days remaining</span>
                      </span>
                      <span>·</span>
                      <span>Estimated Conception: {calculationResult.conceptionDateFormatted}</span>
                    </div>
                  </div>

                  {/* CURRENT GESTATIONAL AGE & TRIMESTER */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 bg-[#F9FAFC] rounded-xl border border-slate-200/80">
                      <span className="text-xs text-slate-500 font-medium block">
                        Current Gestational Age
                      </span>
                      <div className="text-xl sm:text-2xl font-bold text-[#1D3B58] tabular-nums mt-0.5">
                        {calculationResult.weeks} Weeks, {calculationResult.days} Days
                      </div>
                      <span className="text-[11px] text-slate-500 mt-1 block">
                        From biological cycle baseline
                      </span>
                    </div>

                    <div className="p-4 bg-[#F9FAFC] rounded-xl border border-slate-200/80">
                      <span className="text-xs text-slate-500 font-medium block">
                        Current Phase
                      </span>
                      <div className="text-base sm:text-lg font-bold text-[#1D3B58] mt-0.5">
                        {calculationResult.trimester.split('(')[0]}
                      </div>
                      {/* Trimester progress bar */}
                      <div className="w-full bg-slate-200 rounded-full h-2 mt-2 overflow-hidden">
                        <div
                          className="bg-[#E48AA0] h-2 rounded-full transition-all duration-500"
                          style={{ width: `${Math.max(5, calculationResult.trimesterProgress)}%` }}
                        />
                      </div>
                      <span className="text-[10px] text-slate-400 mt-1 block">
                        {calculationResult.trimester}
                      </span>
                    </div>
                  </div>

                  {/* BABY DEVELOPMENT SIZE HIGHLIGHT */}
                  <div className="p-4 bg-[#FCEEF1] rounded-2xl border border-[#F5D8E0] flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-[#E48AA0] shadow-2xs shrink-0">
                        <Baby className="w-6 h-6" />
                      </div>
                      <div>
                        <span className="text-[11px] font-bold text-[#C96D83] uppercase tracking-wider block">
                          Current Baby Milestone (Week {calculationResult.weeks || 6}):
                        </span>
                        <div className="text-sm sm:text-base font-bold text-[#1D3B58]">
                          Size of a {calculationResult.babyMilestone.size}
                        </div>
                        <div className="text-xs text-slate-600 mt-0.5">
                          Approx. {calculationResult.babyMilestone.length} · {calculationResult.babyMilestone.weight}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* PRENATAL SCAN TIMELINE CHECKLIST */}
                  <div className="space-y-3 pt-2">
                    <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      Crucial Ultrasound & Clinical Milestones:
                    </h4>

                    <div className="space-y-2">
                      {calculationResult.milestones.map((m, idx) => (
                        <div
                          key={idx}
                          className="flex items-start justify-between p-3 rounded-xl bg-[#F9FAFC] border border-slate-200/70 text-xs"
                        >
                          <div className="space-y-0.5 pr-2">
                            <div className="font-bold text-[#1D3B58] flex items-center gap-2">
                              <span>{m.name}</span>
                              <span className="text-[10px] bg-slate-200/70 text-slate-700 px-1.5 py-0.2 rounded-sm font-semibold">
                                {m.timing}
                              </span>
                            </div>
                            <p className="text-slate-500 text-[11px] leading-relaxed">
                              {m.description}
                            </p>
                          </div>
                          <span className="text-right shrink-0 font-semibold text-[#1D3B58] text-[11px]">
                            {m.date}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA BUTTON */}
                  <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <span className="text-xs text-slate-500">
                      Need an early viability scan or hormone support?
                    </span>
                    <button
                      onClick={() => onOpenBookingForScan('Early Pregnancy & Viability Ultrasound Scan')}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#E48AA0] hover:bg-[#D4748B] text-white px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-xs transition-all"
                    >
                      <Heart className="w-4 h-4" />
                      <span>Book Early Pregnancy Viability Scan</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </>
              ) : (
                <div className="text-center py-12 text-slate-500 text-sm">
                  Please select your last period or transfer date on the left to calculate your due date.
                </div>
              )}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default DueDateCalculator;
