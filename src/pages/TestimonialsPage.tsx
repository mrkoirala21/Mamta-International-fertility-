import React, { useState } from 'react';
import { TESTIMONIALS } from '../data/fertilityData';
import { IMAGES } from '../assets/images';
import {
  Star,
  Quote,
  CheckCircle2,
  Heart,
  Sparkles,
  Baby,
  Calendar,
  MessageSquare,
  Phone,
} from 'lucide-react';

import SuccessStoriesStatsSection from '../components/SuccessStoriesStatsSection';

interface TestimonialsPageProps {
  onOpenBooking: (doctorName?: string, branchId?: string, treatmentName?: string) => void;
  onNavigate?: (page: string) => void;
  language?: 'en' | 'ne';
}

export const TestimonialsPage: React.FC<TestimonialsPageProps> = ({
  onOpenBooking,
  onNavigate,
  language = 'en',
}) => {
  return (
    <div className="space-y-16 pb-20">
      {/* 1. HERO HEADER */}
      <section className="bg-gradient-to-b from-[#1D3B58] to-[#122538] text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-semibold bg-white/10 text-[#E48AA0] px-3.5 py-1.5 rounded-full">
            <Heart className="w-3.5 h-3.5" />
            <span>130+ Verified Parenthood Journeys</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            Patient Stories & Success Journeys
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
            Behind every milestone is a tender story of perseverance, trust, and clinical excellence. Read verified reviews from parents who trusted Mamta International Fertility Center at Maulakalika Hospital Chitwan.
          </p>
        </div>
      </section>

      {/* 1.5 OUR SUCCESS STORIES — YOUR JOURNEY TO PARENTHOOD */}
      <SuccessStoriesStatsSection
        onOpenBooking={onOpenBooking}
        onNavigate={onNavigate}
        language={language}
      />

      {/* 2. EMOTIONAL HIGHLIGHT STORY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm grid grid-cols-1 lg:grid-cols-12 items-center">
          <div className="lg:col-span-5 h-80 lg:h-full min-h-[320px] relative">
            <img
              src={IMAGES.parentsNewborn}
              alt="Joyful parents with baby"
              className="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
              width={600}
              height={450}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent lg:hidden" />
          </div>

          <div className="lg:col-span-7 p-6 sm:p-10 space-y-5">
            <div className="flex items-center gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-amber-400" />
              ))}
              <span className="text-xs text-slate-500 font-bold ml-2">Verified Patient Story</span>
            </div>

            <Quote className="w-10 h-10 text-[#E48AA0]/40" />

            <h3 className="text-xl sm:text-2xl font-bold text-[#1D3B58]">
              "After 7 years of waiting and two failed cycles elsewhere, Dr. Anusha listened with open arms."
            </h3>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              "We had almost given up on our dream of becoming parents. The transparent guidance, zero hidden costs, and daily reassuring calls from the embryology team at Maulakalika Hospital made all the difference in the world. Today our twin daughters Aaradhya and Aayushi are 8 months old and healthy."
            </p>

            <div className="pt-2 flex items-center justify-between border-t border-slate-100 text-xs">
              <div>
                <span className="font-bold text-[#1D3B58] block text-sm">Sunita & Rajesh Adhikari</span>
                <span className="text-slate-500">IVF with ICSI & Blastocyst Transfer</span>
              </div>
              <span className="text-[#C96D83] font-bold bg-[#FCEEF1] px-3 py-1 rounded-full">
                7 Years Waiting
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. STORIES GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <h2 className="text-2xl font-bold text-[#1D3B58]">
          More Inspiring Parenthood Journeys
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TESTIMONIALS.map((test) => (
            <div
              key={test.id}
              className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 flex flex-col justify-between space-y-5 shadow-xs hover:border-[#E48AA0] transition-all"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(test.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    <span>Verified</span>
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed">
                  "{test.quote}"
                </p>

                <p className="text-xs text-slate-500 leading-relaxed">
                  {test.fullStory}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 space-y-1 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#1D3B58]">{test.parentNames}</span>
                  <span className="text-[#C96D83] font-semibold bg-[#FCEEF1] px-2 py-0.5 rounded-md text-[10px]">
                    {test.yearsTrying}
                  </span>
                </div>
                <div className="flex items-center justify-between text-slate-400 text-[11px]">
                  <span>{test.treatment}</span>
                  {test.babyName && <span className="text-slate-600 font-medium">Baby {test.babyName}</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. SHARE YOUR STORY / BOOK CONSULTATION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <div className="bg-[#1D3B58] text-white rounded-3xl p-8 sm:p-12 space-y-4 max-w-4xl mx-auto">
          <Baby className="w-10 h-10 text-[#E48AA0] mx-auto" />
          <h3 className="text-2xl font-bold">
            Write Your Own Miracle Chapter
          </h3>
          <p className="text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
            No matter how long you have been trying or what previous setbacks you have encountered, our team at Maulakalika Hospital Chitwan is here to walk with you every single step.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-4">
            <button
              onClick={() => onOpenBooking()}
              className="bg-[#E48AA0] hover:bg-[#D4748B] text-white px-6 py-3 rounded-xl font-bold text-sm shadow-md transition-all cursor-pointer"
            >
              Book Free Consultation
            </button>
            <a
              href="https://wa.me/9779855088798"
              target="_blank"
              rel="noreferrer"
              className="bg-[#25D366] hover:bg-[#1EBE5D] text-white px-6 py-3 rounded-xl font-bold text-sm transition-colors flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp Our Counselors (9855088798)</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TestimonialsPage;
