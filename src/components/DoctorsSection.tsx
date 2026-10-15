import React from 'react';
import { DOCTORS } from '../data/fertilityData';
import { Calendar, Award, Star, Clock, UserCheck, Stethoscope, Sparkles } from 'lucide-react';

interface DoctorsSectionProps {
  onBookDoctor: (doctorName: string) => void;
  language?: 'en' | 'ne';
}

export const DoctorsSection: React.FC<DoctorsSectionProps> = ({ onBookDoctor, language = 'en' }) => {
  return (
    <section id="doctors" className="py-16 md:py-24 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="text-xs font-bold text-[#E48AA0] uppercase tracking-wider">
            {language === 'en' ? 'Clinical Leadership & Care Team' : 'हाम्रा अनुभवी विशेषज्ञहरू'}
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1D3B58] tracking-tight">
            {language === 'en' ? 'Meet Our Doctors & Fertility Specialists' : 'प्रजनन तथा भ्रूण विशेषज्ञ टोली'}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            {language === 'en'
              ? 'Our multidisciplinary panel combines senior reproductive endocrinologists, certified clinical embryologists, laparoscopic surgeons, and andrologists with over 60 cumulative years of clinical experience.'
              : 'वरिष्ठ स्त्रीरोग तथा प्रजनन विशेषज्ञ, क्लिनिकल एम्ब्रियोलोजिस्ट, युरोलोजिस्ट र शल्यचिकित्सकहरूको विशेषज्ञ समूहबाट उच्चस्तरीय परामर्श लिनुहोस्।'}
          </p>
        </div>

        {/* DOCTORS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {DOCTORS.map((doc) => (
            <div
              key={doc.id}
              className="bg-[#F9FAFC] rounded-2xl border border-slate-200/90 overflow-hidden hover:border-[#E48AA0] transition-all duration-200 hover:shadow-lg flex flex-col justify-between group"
            >
              <div>
                {/* PHOTO CONTAINER */}
                <div className="relative aspect-square w-full bg-slate-200 overflow-hidden">
                  {doc.image ? (
                    <img
                      src={doc.image}
                      alt={doc.name}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-tr from-[#1D3B58] to-[#2B5A88] flex flex-col items-center justify-center text-white p-6 text-center">
                      <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center text-2xl font-bold mb-2">
                        {doc.name.split(' ')[1]?.[0] || 'D'}
                      </div>
                      <span className="text-sm font-semibold">{doc.name}</span>
                      <span className="text-[11px] text-slate-300 mt-1">{doc.qualifications}</span>
                    </div>
                  )}

                  {/* Experience Badge */}
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs text-[#1D3B58] text-[11px] font-bold px-2.5 py-1 rounded-md shadow-2xs border border-white/60 flex items-center gap-1">
                    <Award className="w-3.5 h-3.5 text-[#E48AA0]" />
                    <span>{doc.experienceYears}+ Yrs Exp</span>
                  </div>

                  {/* Satisfaction badge */}
                  <div className="absolute bottom-3 right-3 bg-emerald-600/95 text-white text-[11px] font-bold px-2 py-0.5 rounded-md shadow-2xs flex items-center gap-1">
                    <Star className="w-3 h-3 fill-white" />
                    <span>{doc.patientSatisfaction} Rating</span>
                  </div>
                </div>

                {/* DOCTOR DETAILS */}
                <div className="p-5 space-y-3">
                  <div>
                    <h3 className="text-base font-bold text-[#1D3B58] group-hover:text-[#2B5A88] transition-colors">
                      {language === 'en' ? doc.name : doc.nepaliName}
                    </h3>
                    <p className="text-xs font-semibold text-[#E48AA0] mt-0.5">
                      {language === 'en' ? doc.role : doc.nepaliRole}
                    </p>
                    <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                      {doc.qualifications}
                    </p>
                  </div>

                  {/* Fellowships */}
                  <div className="space-y-1">
                    {doc.fellowships.map((f, i) => (
                      <div key={i} className="text-[11px] text-slate-600 flex items-start gap-1">
                        <span className="text-[#E48AA0] font-bold">·</span>
                        <span className="line-clamp-1">{f}</span>
                      </div>
                    ))}
                  </div>

                  {/* Schedule */}
                  <div className="pt-2 border-t border-slate-200/60 flex items-start gap-1.5 text-[11px] text-slate-600">
                    <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                    <span>{doc.availableDays}</span>
                  </div>
                </div>
              </div>

              {/* ACTION: BOOK APPOINTMENT FOR THIS DOCTOR */}
              <div className="p-4 pt-0">
                <button
                  onClick={() => onBookDoctor(doc.name)}
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#E48AA0] hover:bg-[#D4748B] text-white py-2.5 px-4 rounded-xl font-bold text-xs shadow-2xs transition-all duration-150 transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Book with {doc.name.split(' ')[1]}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* CLINICAL STANDARDS NOTE */}
        <div className="bg-[#FCEEF1] rounded-2xl p-6 border border-[#F5D8E0] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-[#C96D83] shadow-2xs shrink-0">
              <Stethoscope className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#1D3B58]">
                Personalized One-on-One Consultations
              </h4>
              <p className="text-xs text-slate-600 mt-0.5">
                Every consultation includes detailed pelvic ultrasound evaluation and comprehensive review of prior records.
              </p>
            </div>
          </div>
          <button
            onClick={() => onBookDoctor(DOCTORS[0].name)}
            className="bg-[#1D3B58] hover:bg-[#152B40] text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-colors shrink-0"
          >
            Check Available Slots
          </button>
        </div>

      </div>
    </section>
  );
};

export default DoctorsSection;
