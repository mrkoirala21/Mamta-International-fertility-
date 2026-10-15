import React from 'react';

interface MamataLogoProps {
  variant?: 'color' | 'white';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
  className?: string;
}

export const MamataLogo: React.FC<MamataLogoProps> = ({
  variant = 'color',
  size = 'md',
  showTagline = true,
  className = '',
}) => {
  const isWhite = variant === 'white';
  const strokeColor = isWhite ? '#FFFFFF' : '#E48AA0';
  const textColor = isWhite ? '#FFFFFF' : '#2B5A88';
  const subTextColor = isWhite ? 'rgba(255, 255, 255, 0.85)' : '#2B5A88';

  const sizeClasses = {
    sm: 'h-8',
    md: 'h-11',
    lg: 'h-14',
    xl: 'h-20',
  };

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      <svg
        viewBox="0 0 160 120"
        className={`${sizeClasses[size]} w-auto shrink-0`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Mamata International Fertility Centre Logo"
      >
        {/* Abstract Mother & Child / Lotus Embryo Curves */}
        <g stroke={strokeColor} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
          {/* Base foundation line */}
          <path d="M 22 104 L 88 104" />
          
          {/* Outer left gentle curve */}
          <path d="M 26 102 C 40 102, 58 92, 58 72 C 58 54, 46 54, 40 68 C 36 78, 52 98, 88 104" />
          
          {/* Center ascending petal */}
          <path d="M 45 92 C 60 76, 76 46, 76 26 C 76 14, 62 14, 56 32 C 50 50, 64 88, 90 104" />
          
          {/* Right upright oval womb / life loop */}
          <path d="M 88 104 C 98 84, 114 46, 114 26 C 114 8, 86 8, 86 36 C 86 64, 96 92, 106 104" />
        </g>
      </svg>

      <div className="flex flex-col leading-none">
        <span
          className="font-bold tracking-tight text-xl md:text-2xl transition-colors lowercase"
          style={{
            color: textColor,
            fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
            letterSpacing: '-0.02em',
          }}
        >
          mamata
        </span>
        {showTagline && (
          <span
            className="text-[9px] md:text-[10px] uppercase font-semibold tracking-[0.14em] mt-0.5"
            style={{ color: subTextColor }}
          >
            International Fertility Centre
          </span>
        )}
      </div>
    </div>
  );
};

export default MamataLogo;
