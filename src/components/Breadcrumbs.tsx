import React from 'react';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  onClick?: () => void;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  onNavigate?: (path: string) => void;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, onNavigate }) => {
  return (
    <nav
      aria-label="Breadcrumb"
      className="py-3 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full flex items-center text-xs text-slate-500 font-medium overflow-x-auto whitespace-nowrap"
    >
      <button
        onClick={() => onNavigate ? onNavigate('/') : (window.location.pathname = '/')}
        className="flex items-center gap-1 hover:text-[#1D3B58] transition-colors cursor-pointer shrink-0"
      >
        <Home className="w-3.5 h-3.5 text-slate-400" />
        <span>Home</span>
      </button>

      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <React.Fragment key={index}>
            <ChevronRight className="w-3.5 h-3.5 text-slate-300 mx-2 shrink-0" />
            {isLast || (!item.href && !item.onClick) ? (
              <span className="text-[#1D3B58] font-semibold truncate max-w-[200px] sm:max-w-none">
                {item.label}
              </span>
            ) : (
              <button
                onClick={() => {
                  if (item.onClick) {
                    item.onClick();
                  } else if (item.href && onNavigate) {
                    onNavigate(item.href);
                  } else if (item.href) {
                    window.location.pathname = item.href;
                  }
                }}
                className="hover:text-[#1D3B58] transition-colors cursor-pointer shrink-0"
              >
                {item.label}
              </button>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};

export default Breadcrumbs;
