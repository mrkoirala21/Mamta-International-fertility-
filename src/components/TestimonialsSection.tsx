import React, { useState } from 'react';
import { TESTIMONIALS } from '../data/fertilityData';
import { IMAGES } from '../assets/images';
import { Star, Quote, CheckCircle2, Heart, ChevronLeft, ChevronRight } from 'lucide-react';

interface TestimonialsSectionProps {
  onOpenBooking: () => void;
  language?: 'en' | 'ne';
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
  onOpenBooking,
  language = 'en',
}) => {
  const [activeStoryIdx, setActiveStoryIdx] = useState(0);

  const prevStory = () => {
    setActiveStoryIdx((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const nextStory = () => {
    setActiveStoryIdx((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  const activeStory = TESTIMONIALS[activeStoryIdx];

  return (
    <section id="stories" className="py-16 md:py-24 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="text-xs font-bold text-[#E48AA0] uppercase tracking-wider">
            {language === 'en' ? 'Stories of Hope & Joy' : 'सफलता तथा खुसीका कथाहरू'}
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1D3B58] tracking-tight">
            {language === 'en' ? '130+ Parenthood Journeys Blessed with New Life' : '१३०+ दम्पतीहरू अभिभावक बन्न सफल'}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            {language === 'en'
              ? 'Behind every clinical statistic is a tender journey of patience, scientific precision, and enduring love — welcoming families from everywhere across Nepal and beyond.'
              : 'हाम्रो सफलताको वास्तविक मापदण्ड ती देश-विदेश सबैतिरबाट आएका दम्पतीहरूको मुहारमा छाएको खुसी हो।'}
          </p>
        </div>

        {/* FEATURED STORY SHOWCASE WITH REAL PARENT PHOTOGRAPHY */}
        <div className="bg-[#F9FAFC] rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            
            {/* PARENT & BABY PHOTO */}
            <div className="lg:col-span-5 relative min-h-[300px] lg:min-h-full">
              <img
                src={IMAGES.parentsNewborn}
                alt="Joyful parents holding their baby born through IVF at Mamata Fertility Centre"
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent lg:hidden" />
              
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-xs p-3 rounded-xl shadow-md border border-white/60">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-slate-500 font-medium block">
                      Miracle Journey
                    </span>
                    <span className="text-xs font-bold text-[#1D3B58]">
                      {activeStory.babyName ? `Baby ${activeStory.babyName}` : 'Healthy Delivery'}
                    </span>
                  </div>
                  <span className="text-xs font-bold text-[#C96D83] bg-[#FCEEF1] px-2.5 py-0.5 rounded-full">
                    {activeStory.yearsTrying} of Waiting
                  </span>
                </div>
              </div>
            </div>

            {/* QUOTE & STORY CONTENT */}
            <div className="lg:col-span-7 p-7 sm:p-10 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                {/* Rating & Verified badge */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  <span className="flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Verified Patient Journey</span>
                  </span>
                </div>

                <Quote className="w-8 h-8 text-[#E48AA0]/40" />

                <blockquote className="text-base sm:text-lg text-slate-800 font-medium italic leading-relaxed">
                  "{activeStory.quote}"
                </blockquote>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {activeStory.fullStory}
                </p>
              </div>

              {/* Author signature & navigation */}
              <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h4 className="text-base font-bold text-[#1D3B58]">
                    {activeStory.parentNames}
                  </h4>
                  <div className="text-xs text-slate-500 mt-0.5 flex items-center gap-2">
                    <span>{activeStory.location}</span>
                    <span>·</span>
                    <span className="text-[#C96D83] font-semibold">{activeStory.treatment}</span>
                  </div>
                </div>

                {/* Slider Controls */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={prevStory}
                    className="p-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-black hover:border-[#1D3B58] transition-colors"
                    aria-label="Previous story"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <span className="text-xs font-mono font-semibold text-slate-500">
                    {activeStoryIdx + 1} / {TESTIMONIALS.length}
                  </span>
                  <button
                    onClick={nextStory}
                    className="p-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-black hover:border-[#1D3B58] transition-colors"
                    aria-label="Next story"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* 3 STORY SUMMARY CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.slice(0, 3).map((story, i) => (
            <div
              key={story.id}
              onClick={() => setActiveStoryIdx(i)}
              className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                activeStoryIdx === i
                  ? 'bg-[#FCEEF1]/50 border-[#E48AA0] shadow-xs'
                  : 'bg-white border-slate-200/80 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-semibold text-slate-500">{story.location}</span>
                <span className="text-[#C96D83] font-bold">{story.yearsTrying} trying</span>
              </div>
              <h4 className="font-bold text-sm text-[#1D3B58] mb-1">
                {story.parentNames}
              </h4>
              <p className="text-xs text-slate-600 line-clamp-2 italic">
                "{story.quote}"
              </p>
              <div className="mt-3 text-[11px] font-semibold text-slate-500">
                {story.treatment}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default TestimonialsSection;
