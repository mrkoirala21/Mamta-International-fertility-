import React, { useState } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  AreaChart,
  Area,
  Line,
  ComposedChart,
} from 'recharts';
import {
  TrendingUp,
  Award,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Info,
  Layers,
  Activity,
  Heart,
  Phone,
} from 'lucide-react';

interface SuccessRateProps {
  onOpenBooking?: () => void;
  language?: 'en' | 'ne';
}

// 1. AGE-BASED SUCCESS RATE COMPARISON DATA
const AGE_SUCCESS_DATA = [
  {
    ageGroup: '< 35 Years',
    mamataRate: 72,
    nationalAvg: 48,
    globalAvg: 52,
    description: 'Optimal ovarian reserve with Day 5 blastocyst transfer',
  },
  {
    ageGroup: '35 - 37 Years',
    mamataRate: 64,
    nationalAvg: 40,
    globalAvg: 44,
    description: 'Individualized stimulation & ICSI optimization',
  },
  {
    ageGroup: '38 - 40 Years',
    mamataRate: 51,
    nationalAvg: 30,
    globalAvg: 33,
    description: 'Laser-assisted hatching & blastocyst selection',
  },
  {
    ageGroup: '41 - 42 Years',
    mamataRate: 38,
    nationalAvg: 18,
    globalAvg: 20,
    description: 'Dual stimulation (DuoStim) & sequential transfers',
  },
  {
    ageGroup: '43+ Years',
    mamataRate: 25,
    nationalAvg: 9,
    globalAvg: 11,
    description: 'Personalized luteal support & PGT-A embryo grading',
  },
];

// 2. TREATMENT MODALITY SUCCESS RATES
const TREATMENT_SUCCESS_DATA = [
  {
    treatment: 'Donor Egg IVF',
    shortName: 'Donor Egg',
    rate: 78,
    benchmark: 65,
    description: 'Young screened donor eggs with blastocyst transfer',
  },
  {
    treatment: 'Day 5 Blastocyst FET',
    shortName: 'Blastocyst FET',
    rate: 72,
    benchmark: 50,
    description: 'ESCO MIRI® incubator cultured blastocyst transfer',
  },
  {
    treatment: 'ICSI + Laser Hatching',
    shortName: 'ICSI + Laser',
    rate: 68,
    benchmark: 48,
    description: 'Robotic single-sperm micromanipulation',
  },
  {
    treatment: 'Surgical Sperm (TESA) + ICSI',
    shortName: 'TESA + ICSI',
    rate: 63,
    benchmark: 45,
    description: 'Microsurgical testicular sperm aspiration in azoospermia',
  },
  {
    treatment: 'Standard IVF Cycle',
    shortName: 'Standard IVF',
    rate: 61,
    benchmark: 42,
    description: 'First-line IVF for tubal or unexplained factor',
  },
  {
    treatment: 'Cumulative IUI (3 Cycles)',
    shortName: 'IUI (3 Cycles)',
    rate: 46,
    benchmark: 32,
    description: 'Sequential intrauterine insemination attempts',
  },
  {
    treatment: 'Single IUI Cycle',
    shortName: 'Single IUI',
    rate: 24,
    benchmark: 15,
    description: 'Mild stimulation with swim-up sperm wash',
  },
];

// 3. CUMULATIVE PREGNANCY PROGRESSION ACROSS CYCLES
const CUMULATIVE_CYCLE_DATA = [
  {
    cycle: 'Cycle 1',
    singleCycleRate: 65,
    cumulativeRate: 65,
    patientsSuccess: 65,
    note: 'Initial personalized protocol based on AMH/FSH',
  },
  {
    cycle: 'Cycle 2',
    singleCycleRate: 58,
    cumulativeRate: 84,
    patientsSuccess: 84,
    note: 'Protocol fine-tuning with surplus frozen blastocysts',
  },
  {
    cycle: 'Cycle 3',
    singleCycleRate: 52,
    cumulativeRate: 92,
    patientsSuccess: 92,
    note: 'Cumulative success reaches peak international benchmarks',
  },
];

// CUSTOM TOOLTIP COMPONENT
interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
  type?: 'age' | 'treatment' | 'cumulative';
}

const CustomChartTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label, type }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#1D3B58] text-white p-3.5 rounded-xl shadow-xl border border-white/10 text-xs space-y-1.5 max-w-xs z-50">
        <p className="font-bold text-sm text-[#E48AA0] pb-1 border-b border-white/10">{label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={`item-${index}`} className="flex items-center justify-between gap-4 py-0.5">
            <span className="flex items-center gap-1.5 text-slate-200">
              <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ backgroundColor: entry.color }} />
              <span>{entry.name}:</span>
            </span>
            <span className="font-extrabold text-white">{entry.value}%</span>
          </div>
        ))}
        {type === 'age' && (
          <p className="text-[11px] text-slate-300 pt-1 border-t border-white/10">
            Clinical pregnancy confirmed by fetal cardiac activity on ultrasound at Maulakalika Hospital.
          </p>
        )}
      </div>
    );
  }
  return null;
};

export const SuccessRateStatistics: React.FC<SuccessRateProps> = ({ onOpenBooking, language = 'en' }) => {
  const [activeTab, setActiveTab] = useState<'age' | 'treatment' | 'cumulative'>('age');

  return (
    <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs space-y-8">
      {/* SECTION HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-100">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-[#E48AA0] uppercase tracking-wider bg-[#FCEEF1] px-3 py-1 rounded-full">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Audited Clinical Performance</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1D3B58] tracking-tight">
            Success Rate Statistics & Clinical Outcomes
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Transparent, audited data from our embryology laboratory at Maulakalika Hospital Pvt. Ltd., Bharatpur-11, Chitwan. We track clinical pregnancy rates confirmed by fetal heartbeat ultrasound, adhering to international ESHRE registry guidelines.
          </p>
        </div>

        {/* TAB TOGGLES */}
        <div className="inline-flex p-1.5 bg-slate-100 rounded-2xl shrink-0 self-start md:self-auto flex-wrap gap-1">
          <button
            onClick={() => setActiveTab('age')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'age'
                ? 'bg-[#1D3B58] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
            }`}
          >
            By Maternal Age
          </button>
          <button
            onClick={() => setActiveTab('treatment')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'treatment'
                ? 'bg-[#1D3B58] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
            }`}
          >
            By Treatment Type
          </button>
          <button
            onClick={() => setActiveTab('cumulative')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'cumulative'
                ? 'bg-[#1D3B58] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
            }`}
          >
            Cumulative (3 Cycles)
          </button>
        </div>
      </div>

      {/* TOP STAT CARDS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 sm:p-5 bg-[#F9FAFC] rounded-2xl border border-slate-200/80 space-y-1">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Peak Pregnancy Rate</span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-3xl font-extrabold text-[#1D3B58]">72%</span>
            <span className="text-xs font-semibold text-emerald-600">+24% vs benchmark</span>
          </div>
          <p className="text-[11px] text-slate-500">Day 5 Blastocyst transfers (Women &lt; 35)</p>
        </div>

        <div className="p-4 sm:p-5 bg-[#F9FAFC] rounded-2xl border border-slate-200/80 space-y-1">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">3-Cycle Cumulative</span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-3xl font-extrabold text-[#1D3B58]">92%</span>
            <span className="text-xs font-semibold text-emerald-600">High Confidence</span>
          </div>
          <p className="text-[11px] text-slate-500">Cumulative success through personalized cycles</p>
        </div>

        <div className="p-4 sm:p-5 bg-[#F9FAFC] rounded-2xl border border-slate-200/80 space-y-1">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Blastocyst Rate</span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-3xl font-extrabold text-[#1D3B58]">65%+</span>
            <span className="text-xs font-semibold text-emerald-600">ESCO MIRI®</span>
          </div>
          <p className="text-[11px] text-slate-500">Fertilized eggs reaching Day 5 stage in cleanroom</p>
        </div>

        <div className="p-4 sm:p-5 bg-[#F9FAFC] rounded-2xl border border-slate-200/80 space-y-1">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Families Guided</span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-3xl font-extrabold text-[#1D3B58]">10,000+</span>
            <span className="text-xs font-semibold text-[#E48AA0]">Since 2005</span>
          </div>
          <p className="text-[11px] text-slate-500">Dedicated care at Maulakalika Hospital Chitwan</p>
        </div>
      </div>

      {/* VISUALIZATION CONTAINER */}
      <div className="bg-[#FAFBFD] p-5 sm:p-8 rounded-2xl border border-slate-200 space-y-4">
        {/* TAB 1: BY MATERNAL AGE */}
        {activeTab === 'age' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="font-bold text-base text-[#1D3B58] flex items-center gap-2">
                  <Activity className="w-4 h-4 text-[#E48AA0]" />
                  <span>Clinical Pregnancy Rate by Age Bracket vs. Benchmarks</span>
                </h3>
                <p className="text-xs text-slate-500">
                  Comparison between Mamata Fertility Centre Chitwan, Nepal National Average, and International ESHRE Average.
                </p>
              </div>
              <div className="flex items-center gap-4 text-xs font-semibold">
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-sm bg-[#1D3B58] inline-block" />
                  <span>Mamata Centre</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-sm bg-[#E48AA0] inline-block" />
                  <span>Global Average</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-sm bg-slate-300 inline-block" />
                  <span>Nepal Benchmark</span>
                </span>
              </div>
            </div>

            <div className="h-80 w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={AGE_SUCCESS_DATA} margin={{ top: 20, right: 20, left: -10, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                  <XAxis dataKey="ageGroup" stroke="#64748B" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis
                    stroke="#64748B"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    domain={[0, 100]}
                    unit="%"
                  />
                  <Tooltip content={<CustomChartTooltip type="age" />} />
                  <Bar
                    dataKey="mamataRate"
                    name="Mamata Fertility Centre"
                    fill="#1D3B58"
                    radius={[6, 6, 0, 0]}
                    barSize={24}
                  />
                  <Bar
                    dataKey="globalAvg"
                    name="Global ESHRE Average"
                    fill="#E48AA0"
                    radius={[6, 6, 0, 0]}
                    barSize={18}
                  />
                  <Bar
                    dataKey="nationalAvg"
                    name="Nepal Benchmark Average"
                    fill="#CBD5E1"
                    radius={[6, 6, 0, 0]}
                    barSize={18}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* AGE TAKEAWAY */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 text-xs text-slate-600 bg-white p-4 rounded-xl border border-slate-200">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Blastocyst culture Advantage:</strong> Culturing embryos to Day 5 allows our embryologists to select the most chromosomally robust embryos, outperforming standard Day 3 transfers.
                </span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Advanced Age Strategies:</strong> For patients over 38, Dr. Anusha Tiwari utilizes personalized DuoStim protocols and laser hatching to optimize implantation despite reduced ovarian reserve.
                </span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: BY TREATMENT TYPE */}
        {activeTab === 'treatment' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="font-bold text-base text-[#1D3B58] flex items-center gap-2">
                  <Layers className="w-4 h-4 text-[#E48AA0]" />
                  <span>Clinical Pregnancy Rate by Reproductive Modality</span>
                </h3>
                <p className="text-xs text-slate-500">
                  Success per embryo transfer / procedure across individual assisted reproductive technology (ART) categories.
                </p>
              </div>
              <div className="flex items-center gap-4 text-xs font-semibold">
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-sm bg-[#1D3B58] inline-block" />
                  <span>Mamata Success Rate</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-sm bg-[#E48AA0] inline-block" />
                  <span>Standard Benchmark</span>
                </span>
              </div>
            </div>

            <div className="h-84 w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={TREATMENT_SUCCESS_DATA}
                  layout="vertical"
                  margin={{ top: 10, right: 30, left: 40, bottom: 10 }}
                >
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E2E8F0" />
                  <XAxis type="number" stroke="#64748B" fontSize={12} tickLine={false} axisLine={false} domain={[0, 100]} unit="%" />
                  <YAxis
                    dataKey="shortName"
                    type="category"
                    stroke="#1D3B58"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    width={110}
                  />
                  <Tooltip content={<CustomChartTooltip type="treatment" />} />
                  <Bar
                    dataKey="rate"
                    name="Mamata Success Rate"
                    fill="#1D3B58"
                    radius={[0, 6, 6, 0]}
                    barSize={16}
                  />
                  <Bar
                    dataKey="benchmark"
                    name="Standard Benchmark"
                    fill="#E48AA0"
                    radius={[0, 6, 6, 0]}
                    barSize={12}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* TREATMENT EXPLANATORY */}
            <div className="p-4 bg-white rounded-xl border border-slate-200 text-xs text-slate-600 flex items-start gap-2.5">
              <Info className="w-4 h-4 text-[#E48AA0] shrink-0 mt-0.5" />
              <p>
                <strong>Why Frozen Embryo Transfer (FET) excels:</strong> Elective cryopreservation allows the patient's uterine endometrium to recover from hormonal stimulation injections, mimicking natural hormonal physiology during transfer.
              </p>
            </div>
          </div>
        )}

        {/* TAB 3: CUMULATIVE 3 CYCLES */}
        {activeTab === 'cumulative' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="font-bold text-base text-[#1D3B58] flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-[#E48AA0]" />
                  <span>Cumulative Pregnancy Progression Across 3 Cycles</span>
                </h3>
                <p className="text-xs text-slate-500">
                  Demonstrating how tailored protocol adjustments compound to over 92% cumulative pregnancy across sequential transfers.
                </p>
              </div>
              <div className="flex items-center gap-4 text-xs font-semibold">
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-sm bg-[#1D3B58] inline-block" />
                  <span>Cumulative Take-Home Rate</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-sm bg-[#E48AA0] inline-block" />
                  <span>Single Cycle Rate</span>
                </span>
              </div>
            </div>

            <div className="h-80 w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={CUMULATIVE_CYCLE_DATA} margin={{ top: 20, right: 30, left: -10, bottom: 20 }}>
                  <defs>
                    <linearGradient id="colorCumulative" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#1D3B58" stopOpacity={0.25} />
                      <stop offset="95%" stopColor="#1D3B58" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                  <XAxis dataKey="cycle" stroke="#64748B" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#64748B" fontSize={12} tickLine={false} axisLine={false} domain={[0, 100]} unit="%" />
                  <Tooltip content={<CustomChartTooltip type="cumulative" />} />
                  <Area
                    type="monotone"
                    dataKey="cumulativeRate"
                    name="Cumulative Pregnancy Rate"
                    fill="url(#colorCumulative)"
                    stroke="#1D3B58"
                    strokeWidth={3}
                  />
                  <Bar
                    dataKey="singleCycleRate"
                    name="Per Cycle Success Rate"
                    fill="#E48AA0"
                    radius={[6, 6, 0, 0]}
                    barSize={32}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>

            {/* CUMULATIVE NOTE */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
              <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs">
                <div className="font-bold text-[#1D3B58] mb-1">Cycle 1: 65%</div>
                <p className="text-slate-500 text-[11px]">Primary transfer utilizing top-grade morphologically evaluated blastocyst.</p>
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs">
                <div className="font-bold text-[#1D3B58] mb-1">Cycle 2: 84% (Cumulative)</div>
                <p className="text-slate-500 text-[11px]">Adjusting endometrial receptivity timing (window of implantation) with vitrified blastocysts.</p>
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs">
                <div className="font-bold text-[#1D3B58] mb-1">Cycle 3: 92% (Cumulative)</div>
                <p className="text-slate-500 text-[11px]">Nearly all couples achieve clinical pregnancy with consecutive tailored cycles.</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* WHY OUR CLINIC OUTPERFORMS: 3 SCIENTIFIC ENABLERS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
        <div className="p-5 rounded-2xl border border-slate-200 bg-[#F9FAFC] space-y-2">
          <div className="w-9 h-9 rounded-xl bg-[#FCEEF1] text-[#C96D83] flex items-center justify-center font-bold text-sm">
            01
          </div>
          <h4 className="font-bold text-sm text-[#1D3B58]">Class 10,000 Cleanroom</h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            Multi-room ESCO MIRI® incubators with independent gas mixtures maintain constant pH and osmolarity for zero stress on human embryos.
          </p>
        </div>

        <div className="p-5 rounded-2xl border border-slate-200 bg-[#F9FAFC] space-y-2">
          <div className="w-9 h-9 rounded-xl bg-[#FCEEF1] text-[#C96D83] flex items-center justify-center font-bold text-sm">
            02
          </div>
          <h4 className="font-bold text-sm text-[#1D3B58]">Day 5 Blastocyst Standard</h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            We avoid premature Day 2/3 transfers whenever viable, letting natural cellular selection reveal embryos with superior implantation potential.
          </p>
        </div>

        <div className="p-5 rounded-2xl border border-slate-200 bg-[#F9FAFC] space-y-2">
          <div className="w-9 h-9 rounded-xl bg-[#FCEEF1] text-[#C96D83] flex items-center justify-center font-bold text-sm">
            03
          </div>
          <h4 className="font-bold text-sm text-[#1D3B58]">ESHRE Standard Verification</h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            All reported statistics represent ultrasound-proven clinical pregnancies with viable heartbeats, avoiding deceptive chemical pregnancy counts.
          </p>
        </div>
      </div>

      {/* FOOTER CTA */}
      <div className="bg-gradient-to-r from-[#1D3B58] to-[#122538] text-white p-6 sm:p-8 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center sm:text-left">
          <h4 className="font-bold text-base sm:text-lg">Want to Know Your Personalized Prognosis?</h4>
          <p className="text-xs sm:text-sm text-slate-300">
            Book a dedicated consultation with Dr. Anusha Tiwari at Maulakalika Hospital Chitwan.
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          {onOpenBooking && (
            <button
              onClick={onOpenBooking}
              className="bg-[#E48AA0] hover:bg-[#D4748B] text-white px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-sm transition-all cursor-pointer flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Assessment</span>
            </button>
          )}
          <a
            href="tel:056493798"
            className="bg-white/10 hover:bg-white/20 text-white px-4 py-2.5 rounded-xl font-semibold text-xs transition-colors flex items-center gap-1.5"
          >
            <Phone className="w-3.5 h-3.5 text-[#E48AA0]" />
            <span>056-493798</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default SuccessRateStatistics;
