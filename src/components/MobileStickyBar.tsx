import React from 'react';
import { Phone, Calendar } from 'lucide-react';

interface MobileStickyBarProps {
  onOpenBooking: () => void;
}

export const MobileStickyBar: React.FC<MobileStickyBarProps> = ({ onOpenBooking }) => {
  return (
    <div className="md:hidden fixed bottom-0 inset-x-0 z-30 bg-white/95 backdrop-blur-md border-t border-slate-200 px-3 py-2 shadow-lg">
      <div className="flex items-center gap-2 max-w-md mx-auto">
        <a
          href="tel:056493798"
          className="flex-1 flex items-center justify-center gap-1.5 bg-[#1D3B58] text-white py-2.5 px-3 rounded-xl font-bold text-xs active:bg-[#122538] transition-colors"
        >
          <Phone className="w-3.5 h-3.5 text-[#E48AA0]" />
          <span>Hotline: 056-493798</span>
        </a>
        <button
          onClick={onOpenBooking}
          className="flex-1 flex items-center justify-center gap-1.5 bg-[#E48AA0] text-white py-2.5 px-3 rounded-xl font-bold text-xs active:bg-[#C96D83] transition-colors shadow-xs"
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>Book Free Consult</span>
        </button>
      </div>
    </div>
  );
};

export default MobileStickyBar;
