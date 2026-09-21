import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { WebSection } from '../types';

interface FooterProps {
  onSelectSection: (section: WebSection) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectSection }) => {
  return (
    <footer className="bg-[#141618] text-[#E8E6E1] pt-16 pb-12 border-t border-[#26282B]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Top Editorial Quote */}
        <div className="border-b border-[#2C2F35] pb-12 mb-12">
          <p className="font-mono text-xs text-[#8A919D] uppercase tracking-widest mb-3">
            Design Philosophy // Material Synthesis
          </p>
          <blockquote className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#F5F3EF] leading-snug max-w-4xl font-normal">
            “When biological moisture ceases to be treated as a defect to conceal, it becomes an expressive architectural medium—morphing color and structural volume across the living human body.”
          </blockquote>
          <p className="mt-4 font-mono text-xs text-[#9FA6B3]">
            — Department of Responsive Wearable Matter, Zürich Atelier
          </p>
        </div>

        {/* Multi-column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-16">
          {/* Col 1: Brand & Origin */}
          <div className="space-y-4">
            <h4 className="font-serif text-xl tracking-tight text-[#FFFFFF]">AURA CHROMATICA</h4>
            <p className="text-sm text-[#9FA6B3] leading-relaxed">
              Living activewear engineered from bio-fermented chitin and osmotic capillaries. Designed for gym exertion, alpine ridges, urban commutes, and everyday living.
            </p>
            <div className="pt-2 text-xs font-mono text-[#78808E]">
              ISO 14044 Certified Circular Bio-Polymer
            </div>
          </div>

          {/* Col 2: Navigation Directory */}
          <div className="space-y-3">
            <h5 className="font-mono text-xs uppercase tracking-widest text-[#8A919D]">Navigation</h5>
            <ul className="space-y-2 text-sm text-[#C9CDD4]">
              <li>
                <button onClick={() => onSelectSection('home')} className="hover:text-white transition-colors">
                  Material Philosophy
                </button>
              </li>
              <li>
                <button onClick={() => onSelectSection('collection')} className="hover:text-white transition-colors">
                  Garment Collection
                </button>
              </li>
              <li>
                <button onClick={() => onSelectSection('studio')} className="hover:text-white transition-colors flex items-center gap-1">
                  Bespoke Customizer <ArrowUpRight size={13} className="text-[#A3B18A]" />
                </button>
              </li>
              <li>
                <button onClick={() => onSelectSection('community')} className="hover:text-white transition-colors">
                  Everyday Wearers (Gym to Street)
                </button>
              </li>
              <li>
                <button onClick={() => onSelectSection('history')} className="hover:text-white transition-colors">
                  Transformation Archive
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Research & Biome Laboratories */}
          <div className="space-y-3">
            <h5 className="font-mono text-xs uppercase tracking-widest text-[#8A919D]">Ateliers & Biomes</h5>
            <ul className="space-y-2 text-sm text-[#A9B0BC]">
              <li>
                <span className="text-white block font-medium">Zürich Creative Atelier</span>
                <span className="text-xs text-[#7F8693]">Hardturmstrasse 66, 8005 Zürich</span>
              </li>
              <li>
                <span className="text-white block font-medium">Kobe Textile Mill</span>
                <span className="text-xs text-[#7F8693]">Bio-Polymer Spinning Division, Hyogo</span>
              </li>
              <li>
                <span className="text-white block font-medium">New York Fitting Room</span>
                <span className="text-xs text-[#7F8693]">Crosby St, Soho, NY</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Monograph Dispatch Signup */}
          <div className="space-y-3">
            <h5 className="font-mono text-xs uppercase tracking-widest text-[#8A919D]">Research Dispatch</h5>
            <p className="text-xs text-[#9FA6B3] leading-relaxed">
              Quarterly monographs documenting tactile biopolymers, moisture-activated mechanics, and limited garment editions.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <input
                type="email"
                placeholder="colleague@domain.edu"
                className="bg-[#1F2226] border border-[#33373E] text-xs px-3 py-2 rounded text-white placeholder-[#68707E] focus:outline-none focus:border-[#A3B18A] flex-1 font-mono"
              />
              <button className="bg-[#FAF9F6] text-[#141618] px-3.5 py-2 text-xs font-mono uppercase tracking-wider rounded font-medium hover:bg-[#E2DFD8] transition-colors">
                Join
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#26282B] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#6E7582]">
          <div>
            © {new Date().getFullYear()} AURA CHROMATICA INC. ALL BIOMIMETIC TEXTILES REGISTERED.
          </div>
          <div className="flex items-center gap-6">
            <span>TERMS OF BIOME WEAR</span>
            <span>DATA PRIVACY</span>
            <span>CIRCULAR RECYCLING</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
