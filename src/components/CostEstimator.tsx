import React, { useState } from 'react';
import { COST_PACKAGES, CostPackage } from '../data/fertilityData';
import { Check, ShieldCheck, Sparkles, HelpCircle, ArrowRight, DollarSign } from 'lucide-react';

interface CostEstimatorProps {
  onSelectPackageForBooking: (packageName: string) => void;
  language?: 'en' | 'ne';
}

export const CostEstimator: React.FC<CostEstimatorProps> = ({
  onSelectPackageForBooking,
  language = 'en',
}) => {
  const [currency, setCurrency] = useState<'NPR' | 'USD'>('NPR');
  const [selectedPkgId, setSelectedPkgId] = useState<string>('pkg-ivf-standard');
  const [includeLaserHatching, setIncludeLaserHatching] = useState(false);
  const [includeExtraStorage, setIncludeExtraStorage] = useState(false);

  const activePackage = COST_PACKAGES.find((p) => p.id === selectedPkgId) || COST_PACKAGES[1];

  // Calculate dynamic total
  const baseCost = currency === 'NPR' ? activePackage.nprPrice : activePackage.usdPrice;
  const laserAddon = currency === 'NPR' ? 25000 : 190;
  const storageAddon = currency === 'NPR' ? 15000 : 115;

  const totalCost =
    baseCost +
    (includeLaserHatching ? laserAddon : 0) +
    (includeExtraStorage ? storageAddon : 0);

  const formatPrice = (amount: number) => {
    if (currency === 'NPR') {
      return `NPR ${amount.toLocaleString('en-IN')}`;
    }
    return `$${amount.toLocaleString('en-US')}`;
  };

  return (
    <section id="cost" className="py-16 md:py-24 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="text-xs font-bold text-[#E48AA0] uppercase tracking-wider">
            {language === 'en' ? 'Transparent Financial Counseling' : 'पूर्ण पारदर्शी शुल्क संरचना'}
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1D3B58] tracking-tight">
            {language === 'en' ? 'Clear, Honest Fertility Treatment Pricing' : 'निःसन्तानता उपचार शुल्क विवरण'}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            {language === 'en'
              ? 'We reject hidden hospital bills. Every cycle is mapped with an itemized breakdown so you can plan your family journey with total peace of mind.'
              : 'कुनै लुकेको अतिरिक्त बिलिङ हुँदैन। उपचार सुरु हुनुअघि नै सम्पूर्ण खर्चको पारदर्शी तालिका उपलब्ध गराइन्छ।'}
          </p>

          {/* CURRENCY TOGGLE */}
          <div className="pt-2 flex items-center justify-center gap-2">
            <span className="text-xs font-semibold text-slate-500">Currency:</span>
            <div className="inline-flex p-1 bg-slate-100 rounded-xl border border-slate-200">
              <button
                onClick={() => setCurrency('NPR')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  currency === 'NPR'
                    ? 'bg-[#1D3B58] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                NPR (रू)
              </button>
              <button
                onClick={() => setCurrency('USD')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  currency === 'USD'
                    ? 'bg-[#1D3B58] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                USD ($)
              </button>
            </div>
          </div>
        </div>

        {/* PACKAGE SELECTOR BUTTONS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {COST_PACKAGES.map((pkg) => {
            const isSelected = selectedPkgId === pkg.id;
            return (
              <button
                key={pkg.id}
                onClick={() => setSelectedPkgId(pkg.id)}
                className={`p-4 rounded-xl text-left border transition-all relative ${
                  isSelected
                    ? 'bg-[#1D3B58] text-white border-[#1D3B58] shadow-md ring-2 ring-[#E48AA0]'
                    : 'bg-[#F9FAFC] hover:bg-slate-50 text-slate-800 border-slate-200'
                }`}
              >
                {pkg.popular && (
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full absolute -top-2.5 right-3 ${
                    isSelected ? 'bg-[#E48AA0] text-white' : 'bg-[#E48AA0] text-white'
                  }`}>
                    Most Chosen
                  </span>
                )}
                <div className="text-xs sm:text-sm font-bold line-clamp-1">{pkg.name}</div>
                <div className={`text-base sm:text-lg font-extrabold mt-1 tabular-nums ${
                  isSelected ? 'text-[#E48AA0]' : 'text-[#1D3B58]'
                }`}>
                  {currency === 'NPR' ? `NPR ${pkg.nprPrice.toLocaleString()}` : `$${pkg.usdPrice}`}
                </div>
              </button>
            );
          })}
        </div>

        {/* DETAILED PACKAGE BREAKDOWN CARD */}
        <div className="bg-[#F9FAFC] rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
            <div>
              <span className="text-xs font-semibold text-[#C96D83] uppercase tracking-wider">
                Selected Clinical Plan
              </span>
              <h3 className="text-2xl font-bold text-[#1D3B58] mt-0.5">
                {activePackage.name}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                {activePackage.subtitle}
              </p>
            </div>

            <div className="text-left md:text-right">
              <span className="text-xs text-slate-500 block">Estimated Package Investment</span>
              <div className="text-3xl sm:text-4xl font-extrabold text-[#1D3B58] tabular-nums tracking-tight">
                {formatPrice(totalCost)}
              </div>
              <span className="text-[11px] text-slate-400">
                Transparent package estimate
              </span>
            </div>
          </div>

          {/* INCLUSIONS & EXCLUSIONS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* What is covered */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5 text-emerald-700">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>What is Fully Included:</span>
              </h4>
              <ul className="space-y-2">
                {activePackage.includes.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Customization options & transparent exclusions */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider text-slate-600">
                Custom Clinical Add-ons (Optional)
              </h4>

              <div className="space-y-2.5">
                <label className="flex items-center justify-between p-3 bg-white rounded-xl border border-slate-200 cursor-pointer hover:border-[#E48AA0] transition-colors">
                  <div className="flex items-center gap-2.5">
                    <input
                      type="checkbox"
                      checked={includeLaserHatching}
                      onChange={(e) => setIncludeLaserHatching(e.target.checked)}
                      className="rounded-sm text-[#E48AA0] focus:ring-[#E48AA0]"
                    />
                    <div className="text-xs">
                      <span className="font-semibold text-slate-900 block">Laser-Assisted Zona Hatching</span>
                      <span className="text-slate-500 text-[11px]">Recommended for older maternal age or prior thick shell</span>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-[#1D3B58] shrink-0 ml-2">
                    +{formatPrice(laserAddon)}
                  </span>
                </label>

                <label className="flex items-center justify-between p-3 bg-white rounded-xl border border-slate-200 cursor-pointer hover:border-[#E48AA0] transition-colors">
                  <div className="flex items-center gap-2.5">
                    <input
                      type="checkbox"
                      checked={includeExtraStorage}
                      onChange={(e) => setIncludeExtraStorage(e.target.checked)}
                      className="rounded-sm text-[#E48AA0] focus:ring-[#E48AA0]"
                    />
                    <div className="text-xs">
                      <span className="font-semibold text-slate-900 block">Surplus Embryo Bio-banking (Year 2+)</span>
                      <span className="text-slate-500 text-[11px]">Extend cryogenic tank storage beyond Year 1</span>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-[#1D3B58] shrink-0 ml-2">
                    +{formatPrice(storageAddon)}
                  </span>
                </label>
              </div>

              {/* Exclusions honesty note */}
              <div className="p-3.5 bg-amber-50/70 rounded-xl border border-amber-200/60 text-xs text-amber-900 space-y-1">
                <span className="font-bold flex items-center gap-1.5">
                  <HelpCircle className="w-3.5 h-3.5 text-amber-700" />
                  <span>Important Note on Medications:</span>
                </span>
                <p className="text-[11px] text-amber-800 leading-relaxed">
                  Daily hormonal stimulation injections depend on each woman’s individual AMH and follicle response. Medications typically range from NPR 60,000 to 90,000 and are purchased incrementally as prescribed.
                </p>
              </div>
            </div>
          </div>

          {/* ACTION BUTTON */}
          <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-slate-500">
              Have questions regarding installment options or insurance?
            </span>
            <button
              onClick={() => onSelectPackageForBooking(activePackage.name)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#E48AA0] hover:bg-[#D4748B] text-white px-6 py-3 rounded-xl font-bold text-sm shadow-sm transition-all"
            >
              <span>Get Detailed Financial Counseling</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default CostEstimator;
