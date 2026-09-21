import React from 'react';
import { WebSection } from '../types';
import { Sparkles, Archive, Menu, X, ArrowUpRight, Compass } from 'lucide-react';

interface NavbarProps {
  currentSection: WebSection;
  onSelectSection: (section: WebSection) => void;
  wardrobeCount: number;
  onOpenWardrobe?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentSection,
  onSelectSection,
  wardrobeCount,
  onOpenWardrobe
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navItems: { id: WebSection; index: string; label: string; tag?: string }[] = [
    { id: 'home', index: '01', label: 'Exposition' },
    { id: 'collection', index: '02', label: 'Specimens' },
    { id: 'studio', index: '03', label: 'Material Lab', tag: 'Synthesize' },
    { id: 'community', index: '04', label: 'Field Studies', tag: 'Everyday' },
    { id: 'history', index: '05', label: 'Metamorphosis' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FAF9F6]/92 backdrop-blur-md border-b border-[#E8E5DE] transition-all">
      {/* Editorial Research Bulletin */}
      <div className="bg-[#141518] text-[#EBE7DF] text-[10px] tracking-[0.22em] py-1.5 px-4 text-center font-mono flex items-center justify-center gap-3 border-b border-[#25282E]">
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#A3B18A] animate-pulse" />
        <span className="uppercase">PAVILION FOR LIVING MATERIAL SYSTEMS // EXP. IV: HYDRO-DILATING CHITIN FIBER</span>
        <span className="hidden md:inline text-[#69707D]">•</span>
        <span className="hidden md:inline text-[#9DA3AF] uppercase">METRIC ACCREDITED DESIGN RESEARCH</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 h-20 flex items-center justify-between">
        {/* Brand Wordmark & Pavilion Identity */}
        <button
          onClick={() => onSelectSection('home')}
          className="text-left group focus:outline-none flex items-baseline gap-3"
        >
          <div>
            <span className="block text-[10px] font-mono tracking-[0.25em] text-[#69707D] uppercase">
              BIOMIMETIC ACTIVEWEAR
            </span>
            <span className="font-serif text-2xl sm:text-3xl font-light tracking-[-0.02em] text-[#141518] group-hover:text-[#2E4A34] transition-colors">
              AURA CHROMATICA
            </span>
          </div>
          <span className="hidden sm:inline font-mono text-[9px] text-[#9A958A] border border-[#E0DBD0] px-1.5 py-0.5 rounded tracking-widest uppercase">
            EST. 2026
          </span>
        </button>

        {/* Avant-Garde Minimalist Navigation */}
        <nav className="hidden lg:flex items-center gap-6">
          {navItems.map((item) => {
            const isActive = currentSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectSection(item.id)}
                className={`group relative py-2 text-xs uppercase tracking-[0.14em] font-mono transition-all flex items-center gap-1.5 ${
                  isActive ? 'text-[#141518] font-semibold' : 'text-[#69707D] hover:text-[#141518]'
                }`}
              >
                <span className="text-[9px] text-[#A6A196] group-hover:text-[#141518] transition-colors">
                  {item.index}
                </span>
                <span>{item.label}</span>
                {item.tag && (
                  <span className={`text-[8px] font-mono px-1.5 py-0.2 uppercase tracking-widest border ${
                    isActive 
                      ? 'border-[#141518] text-[#141518] bg-[#EFECE5]' 
                      : 'border-[#DDD8CE] text-[#7A756C]'
                  }`}>
                    {item.tag}
                  </span>
                )}
                {/* Active Hairline Underline */}
                {isActive && (
                  <span className="absolute -bottom-2.5 left-0 right-0 h-[1.5px] bg-[#141518]" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Archival Actions */}
        <div className="flex items-center gap-3">
          {/* Quick Lab Synthesis Button */}
          <button
            onClick={() => onSelectSection('studio')}
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-[11px] font-mono tracking-[0.15em] uppercase border border-[#141518] text-[#141518] hover:bg-[#141518] hover:text-[#FAF9F6] transition-all"
          >
            <Sparkles size={12} className="text-[#3A5A40]" />
            <span>Enter Material Lab</span>
          </button>

          {/* Specimen Folio Archival Drawer Trigger */}
          <button
            onClick={onOpenWardrobe}
            aria-label="View Specimen Folio"
            className="relative px-3 py-2 border border-[#DDD8CE] hover:border-[#141518] text-[#141518] hover:bg-[#F3F1EC] transition-all flex items-center gap-2 text-xs font-mono"
          >
            <Archive size={14} />
            <span className="hidden sm:inline uppercase tracking-widest text-[10px]">Folio</span>
            <span className="w-4 h-4 rounded-full bg-[#141518] text-[#FAF9F6] text-[9px] font-mono flex items-center justify-center font-bold">
              {wardrobeCount}
            </span>
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#141518] hover:bg-[#EFECE5]"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FAF9F6] border-b border-[#E8E5DE] px-6 py-6 space-y-4">
          <div className="text-[10px] font-mono tracking-[0.2em] text-[#8C867A] uppercase border-b border-[#E8E5DE] pb-2">
            Pavilion Sections
          </div>
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onSelectSection(item.id);
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left py-2.5 px-3 text-sm flex items-center justify-between border-b border-[#F0EDE5] ${
                currentSection === item.id
                  ? 'font-medium text-[#141518] bg-[#EFECE5]'
                  : 'text-[#69707D]'
              }`}
            >
              <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider">
                <span className="text-[#A6A196]">{item.index}</span>
                <span>{item.label}</span>
              </div>
              <ArrowUpRight size={14} className="opacity-50" />
            </button>
          ))}
          <div className="pt-2">
            <button
              onClick={() => {
                onSelectSection('studio');
                setMobileMenuOpen(false);
              }}
              className="w-full py-3 text-center text-xs font-mono uppercase tracking-[0.2em] bg-[#141518] text-[#FAF9F6]"
            >
              Enter Material Laboratory
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

