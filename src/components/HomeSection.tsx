import React, { useState } from 'react';
import { motion } from 'motion/react';
import { WebSection, GarmentConfig } from '../types';
import { VISUAL_LANGUAGES, DEFAULT_WARDROBE, PRODUCT_COLLECTION } from '../data/mockData';
import { SmartGarmentVisualizer } from './SmartGarmentVisualizer';
import { 
  ArrowRight, 
  Sparkles, 
  Droplets,
  RotateCcw,
  Compass,
  Maximize2,
  Activity,
  Wind,
  Layers
} from 'lucide-react';

interface HomeSectionProps {
  onNavigate: (section: WebSection) => void;
  onSelectProduct?: (productId: string) => void;
}

export const HomeSection: React.FC<HomeSectionProps> = ({ onNavigate, onSelectProduct }) => {
  // Hero interactive specimen configuration
  const [heroSweat, setHeroSweat] = useState<number>(48);
  const [activeSpecimenIndex, setActiveSpecimenIndex] = useState<number>(0);
  const [heroView, setHeroView] = useState<'front' | 'back'>('front');

  const activeGarment = DEFAULT_WARDROBE[activeSpecimenIndex] || DEFAULT_WARDROBE[0];

  return (
    <div className="space-y-36 pb-32">
      {/* 1. MONUMENTAL EXHIBITION OPENING (ASYMMETRICAL EDITORIAL INTRO) */}
      <section className="relative pt-12 sm:pt-20 border-b border-[#E8E5DE] pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          {/* Exhibition Folio Index */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-10 pb-4 border-b border-[#EBE7DF]">
            <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.25em] text-[#69707D]">
              <span className="text-[#141518] font-semibold">EXHIBITION 04</span>
              <span>/</span>
              <span>BIOMIMETIC MATERIAL RESEARCH</span>
              <span>/</span>
              <span className="text-[#2E4A34]">STATE: LIVE INTERFACE</span>
            </div>
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#9E988D]">
              ZÜRICH • TOKYO • CAMBRIDGE
            </div>
          </div>

          {/* Asymmetrical Hero Statement */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <div className="lg:col-span-7 space-y-8">
              <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#7A756A] block">
                [ SPECIMEN REF. AC-BIO-26 ]
              </span>
              
              <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-light text-[#141518] leading-[1.04] tracking-[-0.03em]">
                Activewear as a <span className="italic font-normal text-[#2E4A34]">living metabolic organ</span> that responds to human exertion.
              </h1>

              <div className="space-y-4 max-w-xl text-[#525761] text-base sm:text-lg font-light leading-relaxed">
                <p>
                  We reject the paradigm of activewear as an inert chemical coating designed to mask sweat. In our pavilion, perspiration is received as a biological nutrient—triggering real-time mineral chromatism and opening three-dimensional relief pores to breathe in unison with the wearer.
                </p>
              </div>

              {/* Research Metrics - Scientific Exhibition Telemetry */}
              <div className="pt-8 border-t border-[#E8E5DE] grid grid-cols-3 gap-8">
                <div>
                  <div className="font-mono text-xs text-[#8C867B] uppercase tracking-wider mb-1">
                    01 // Permeability
                  </div>
                  <div className="font-serif text-3xl text-[#141518]">
                    +320<span className="text-lg font-mono">%</span>
                  </div>
                  <div className="text-[11px] text-[#69707D] mt-1 font-light">
                    Auxetic air flow dilation under saturation
                  </div>
                </div>

                <div>
                  <div className="font-mono text-xs text-[#8C867B] uppercase tracking-wider mb-1">
                    02 // Relief Lift
                  </div>
                  <div className="font-serif text-3xl text-[#141518]">
                    2.4<span className="text-lg font-mono">mm</span>
                  </div>
                  <div className="text-[11px] text-[#69707D] mt-1 font-light">
                    Elevates wet fiber away from skin
                  </div>
                </div>

                <div>
                  <div className="font-mono text-xs text-[#8C867B] uppercase tracking-wider mb-1">
                    03 // Bio-Origin
                  </div>
                  <div className="font-serif text-3xl text-[#141518]">
                    100<span className="text-lg font-mono">%</span>
                  </div>
                  <div className="text-[11px] text-[#69707D] mt-1 font-light">
                    Circular fermented chitin polymer
                  </div>
                </div>
              </div>

              {/* Navigation CTAs */}
              <div className="flex flex-wrap items-center gap-5 pt-4">
                <button
                  onClick={() => onNavigate('studio')}
                  className="px-7 py-3.5 bg-[#141518] text-[#FAF9F6] text-xs uppercase tracking-[0.2em] font-mono hover:bg-[#2A2E35] transition-all flex items-center gap-3"
                >
                  <Sparkles size={13} className="text-[#A3B18A]" />
                  <span>Enter Material Lab</span>
                </button>

                <button
                  onClick={() => onNavigate('history')}
                  className="px-7 py-3.5 border border-[#D5D0C5] text-[#141518] text-xs uppercase tracking-[0.2em] font-mono hover:bg-[#EFECE5] transition-all flex items-center gap-2"
                >
                  <span>Transformation Archive</span>
                  <ArrowRight size={13} />
                </button>
              </div>
            </div>

            {/* Right Column: Floating Museum Vitrine */}
            <div className="lg:col-span-5 relative">
              {/* Vitrine Frame */}
              <div className="specimen-glass p-6 sm:p-8 relative">
                {/* Vitrine Calipers & Header */}
                <div className="flex items-center justify-between border-b border-[#E8E5DE] pb-4 mb-6">
                  <div>
                    <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-[#8C867B] block">
                      KINETIC SPECIMEN VITRINE
                    </span>
                    <h3 className="font-serif text-2xl text-[#141518] font-light">
                      {activeGarment.name}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setHeroView(heroView === 'front' ? 'back' : 'front')}
                      className="text-[10px] font-mono uppercase tracking-widest px-3 py-1.5 border border-[#D5D0C5] hover:border-[#141518] transition-colors"
                    >
                      {heroView}
                    </button>
                    <button
                      onClick={() => setHeroSweat(0)}
                      title="Reset to 0% Dormancy"
                      className="p-1.5 hover:bg-[#EFECE5] text-[#7A756C] transition-colors"
                    >
                      <RotateCcw size={14} />
                    </button>
                  </div>
                </div>

                {/* Garment Visualizer Center */}
                <div className="relative py-4 flex items-center justify-center bg-radial from-[#FFFFFF] via-[#FAF9F6] to-[#F3F1EC] border border-[#EDEAE3] min-h-[380px]">
                  <SmartGarmentVisualizer
                    config={activeGarment}
                    sweatLevel={heroSweat}
                    view={heroView}
                    interactiveSpray={true}
                    size="lg"
                    className="mx-auto"
                  />

                  {/* Interactive Micro-Label */}
                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[10px] font-mono text-[#7A756C] bg-white/90 backdrop-blur-xs px-3 py-1.5 border border-[#E6E3DC]">
                    <span>[ CLICK FABRIC TO INDUCE CONDENSATION ]</span>
                    <span className="text-[#2E4A34] font-semibold">
                      {heroSweat === 0 ? 'DORMANT' : `${Math.round(heroSweat)}% SATURATED`}
                    </span>
                  </div>
                </div>

                {/* Real-time Exertion Moisture Titrator */}
                <div className="mt-6 space-y-3 pt-4 border-t border-[#E8E5DE]">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-[#69707D] flex items-center gap-2">
                      <Droplets size={13} className="text-[#2E4A34]" />
                      <span>EXERTION TITRATION / SWEAT SATURATION</span>
                    </span>
                    <span className="font-semibold text-[#141518]">{heroSweat}%</span>
                  </div>

                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={heroSweat}
                    onChange={(e) => setHeroSweat(Number(e.target.value))}
                    className="w-full h-1 bg-[#E0DBD0] rounded-none appearance-none cursor-pointer accent-[#141518]"
                  />

                  {/* Precision Presets */}
                  <div className="flex justify-between text-[9px] font-mono text-[#8C867B] uppercase tracking-wider">
                    <button onClick={() => setHeroSweat(0)} className="hover:text-[#141518]">0% Dormant</button>
                    <button onClick={() => setHeroSweat(25)} className="hover:text-[#141518]">25% Incipient</button>
                    <button onClick={() => setHeroSweat(55)} className="hover:text-[#141518]">55% Equilibrium</button>
                    <button onClick={() => setHeroSweat(95)} className="hover:text-[#141518]">95% Peak Bloom</button>
                  </div>
                </div>

                {/* Specimen Switcher */}
                <div className="mt-6 pt-4 border-t border-[#E8E5DE] flex items-center justify-between text-[10px] font-mono text-[#69707D]">
                  <span className="uppercase tracking-widest">EXAMINE OTHER SPECIMENS:</span>
                  <div className="flex gap-2">
                    {DEFAULT_WARDROBE.map((g, idx) => (
                      <button
                        key={g.id}
                        onClick={() => setActiveSpecimenIndex(idx)}
                        className={`w-6 h-6 flex items-center justify-center border text-[10px] transition-all ${
                          activeSpecimenIndex === idx
                            ? 'border-[#141518] bg-[#141518] text-[#FAF9F6]'
                            : 'border-[#D5D0C5] text-[#141518] hover:border-[#141518]'
                        }`}
                      >
                        0{idx + 1}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE THREE PHENOMENA // SCIENTIFIC EXHIBITION INSTALLATION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="border-b border-[#E8E5DE] pb-6 mb-16 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#7A756A] block mb-2">
              MATERIAL PHYSIOLOGY
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#141518]">
              Three Biological Phenomena
            </h2>
          </div>
          <p className="text-xs font-mono text-[#69707D] max-w-sm">
            Integrated chromatic osmosis and 3D architectural dilation operating as a continuous organic system.
          </p>
        </div>

        {/* Asymmetrical 3-Column Exhibition Panels */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          <div className="space-y-4">
            <div className="font-mono text-3xl text-[#141518] border-b border-[#E8E5DE] pb-3">
              01
            </div>
            <div className="font-mono text-xs uppercase tracking-widest text-[#2E4A34]">
              Saline Osmotic Chromatism
            </div>
            <h3 className="font-serif text-2xl text-[#141518] font-normal">
              Pigment Blooming with Exertion
            </h3>
            <p className="text-sm text-[#525761] leading-relaxed font-light">
              Encapsulated natural mineral pigments (silt, terracotta, indigo, volcanic graphite) remain quiescent in dry conditions, blooming into vibrant gradients exclusively when activated by bodily electrolytes and body heat.
            </p>
          </div>

          <div className="space-y-4">
            <div className="font-mono text-3xl text-[#141518] border-b border-[#E8E5DE] pb-3">
              02
            </div>
            <div className="font-mono text-xs uppercase tracking-widest text-[#2E4A34]">
              Auxetic Structural Relief
            </div>
            <h3 className="font-serif text-2xl text-[#141518] font-normal">
              Dimensional Micro-Chimneys
            </h3>
            <p className="text-sm text-[#525761] leading-relaxed font-light">
              Fibers swell along predetermined vascular ribs or hexagonal lattices, expanding up to 2.4mm vertically. This creates physical convective chimneys that lift damp fabric away from the skin, totally eliminating friction and cold clamminess.
            </p>
          </div>

          <div className="space-y-4">
            <div className="font-mono text-3xl text-[#141518] border-b border-[#E8E5DE] pb-3">
              03
            </div>
            <div className="font-mono text-xs uppercase tracking-widest text-[#2E4A34]">
              Atmospheric Convection
            </div>
            <h3 className="font-serif text-2xl text-[#141518] font-normal">
              Directional Evaporative Wicking
            </h3>
            <p className="text-sm text-[#525761] leading-relaxed font-light">
              Perspiration is driven outward by osmotic capillary yarn pressure to the external textile face. 78% of water molecules evaporate directly into the atmosphere without cooling the skin excessively during post-workout recovery.
            </p>
          </div>
        </div>
      </section>

      {/* 3. FIELD STUDIES // EVERYDAY LIFE INTEGRATION (LARGE EDITORIAL PHOTOGRAPHY) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="border-b border-[#E8E5DE] pb-6 mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#7A756A] block mb-2">
              LIVING FIELD CHRONICLES
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#141518]">
              Human Symbiosis in Real Habitats
            </h2>
          </div>
          <div className="space-y-2">
            <p className="text-xs font-mono text-[#69707D]">
              Garments worn in continuous living situations: track workouts, alpine climbs, transit commutes, and quiet rest.
            </p>
            <button
              onClick={() => onNavigate('community')}
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.15em] text-[#141518] hover:text-[#2E4A34] transition-colors border-b border-[#141518] pb-0.5"
            >
              <span>Examine All Field Studies</span>
              <ArrowRight size={12} />
            </button>
          </div>
        </div>

        {/* Asymmetrical Curated Photographic Documentary Gallery */}
        <div className="space-y-20">
          {/* Study 01: Gym & High Exertion */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
            <div className="lg:col-span-7 relative overflow-hidden bg-[#EFECE5]">
              <img
                src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1200&q=85"
                alt="Track interval exertion in industrial sunlit gymnasium"
                className="w-full aspect-16/10 object-cover filter contrast-[1.02]"
              />
              <div className="absolute top-4 left-4 bg-[#141518] text-[#FAF9F6] font-mono text-[9px] uppercase tracking-[0.2em] px-3 py-1">
                STUDY 01 // INDOOR TRACK & STRENGTH ATELIER
              </div>
              <div className="absolute bottom-4 right-4 bg-[#FAF9F6]/95 backdrop-blur-xs font-mono text-[9px] text-[#141518] px-3 py-1.5 border border-[#E0DBD0]">
                TELEMETRY: 380 ML TRANSPIRATION • 1.5 HOURS ACTIVE
              </div>
            </div>

            <div className="lg:col-span-5 space-y-6">
              <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#7A756A]">
                BROOKLYN NAVY YARD // MAYA LIN-RHODES
              </div>
              <h3 className="font-serif text-3xl font-light text-[#141518] leading-snug">
                “Instead of hiding sweat, it transfigures your physical output into topographic sculpture.”
              </h3>
              <p className="text-sm text-[#525761] leading-relaxed font-light">
                During 45 minutes of threshold 400m track repeats, the garment’s concentric ripple channels dilated across the sternum and thoracic spine. The Celadon mineral sage hue bloomed precisely where heat concentration crested, lifting the moist textile 1.6mm off the skin.
              </p>
              <div className="pt-2 flex items-center gap-4 text-xs font-mono">
                <span className="text-[#8C867B]">SPECIMEN:</span>
                <span className="text-[#141518] font-medium uppercase tracking-wider">Aero Kinetic Tee (Celadon)</span>
              </div>
            </div>
          </div>

          {/* Study 02: High-Alpine Outdoors Scramble */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
            <div className="lg:col-span-5 space-y-6 order-2 lg:order-1">
              <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#7A756A]">
                DOLOMITES, ITALY // JULIAN VANCE & KAITO S.
              </div>
              <h3 className="font-serif text-3xl font-light text-[#141518] leading-snug">
                “At 2,400m altitude, you sweat heavily on steep inclines but risk freezing on the exposed windy ridge.”
              </h3>
              <p className="text-sm text-[#525761] leading-relaxed font-light">
                Traversing 18 kilometers of technical scree, Julian experienced sudden temperature swings from radiant valley heat to freezing mountain drafts. The branching dendritic capillaries of the longsleeve wicked perspiration swiftly to the outer atmospheric face, preventing post-climb evaporative hypothermia.
              </p>
              <div className="pt-2 flex items-center gap-4 text-xs font-mono">
                <span className="text-[#8C867B]">SPECIMEN:</span>
                <span className="text-[#141518] font-medium uppercase tracking-wider">Osmotic Longsleeve (Terracotta)</span>
              </div>
            </div>

            <div className="lg:col-span-7 relative overflow-hidden bg-[#EFECE5] order-1 lg:order-2">
              <img
                src="https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?auto=format&fit=crop&w=1200&q=85"
                alt="High alpine trail running across mountain ridge"
                className="w-full aspect-16/10 object-cover filter contrast-[1.02]"
              />
              <div className="absolute top-4 left-4 bg-[#141518] text-[#FAF9F6] font-mono text-[9px] uppercase tracking-[0.2em] px-3 py-1">
                STUDY 02 // HIGH-ALPINE SCRAMBLING & RIDGE TRAIL
              </div>
              <div className="absolute bottom-4 right-4 bg-[#FAF9F6]/95 backdrop-blur-xs font-mono text-[9px] text-[#141518] px-3 py-1.5 border border-[#E0DBD0]">
                TELEMETRY: 620 ML TRANSPIRATION • 2,400M ALTITUDE
              </div>
            </div>
          </div>

          {/* Study 03: Metropolitan Transit & Urban Cycling */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
            <div className="lg:col-span-7 relative overflow-hidden bg-[#EFECE5]">
              <img
                src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=85"
                alt="Cyclist in Tokyo architectural landscape"
                className="w-full aspect-16/10 object-cover filter contrast-[1.02]"
              />
              <div className="absolute top-4 left-4 bg-[#141518] text-[#FAF9F6] font-mono text-[9px] uppercase tracking-[0.2em] px-3 py-1">
                STUDY 03 // METROPOLITAN COMMUTE & ARCHITECTURE ATELIER
              </div>
              <div className="absolute bottom-4 right-4 bg-[#FAF9F6]/95 backdrop-blur-xs font-mono text-[9px] text-[#141518] px-3 py-1.5 border border-[#E0DBD0]">
                TELEMETRY: 290 ML TRANSPIRATION • TRANSIT TO STUDIO
              </div>
            </div>

            <div className="lg:col-span-5 space-y-6">
              <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#7A756A]">
                SHIBUYA TO DAIKANYAMA, TOKYO // AMARA CHEN
              </div>
              <h3 className="font-serif text-3xl font-light text-[#141518] leading-snug">
                “I cycle hard up humid hill climbs, then walk straight into client design presentations.”
              </h3>
              <p className="text-sm text-[#525761] leading-relaxed font-light">
                The auxetic mesh dilated during the brisk uphill ride, ventilating heat. By the time Amara stepped into the air-conditioned architectural studio, the deep marine indigo had begun its crystallization cooldown, appearing as an intentional tailored gradient rather than soaked activewear.
              </p>
              <div className="pt-2 flex items-center gap-4 text-xs font-mono">
                <span className="text-[#8C867B]">SPECIMEN:</span>
                <span className="text-[#141518] font-medium uppercase tracking-wider">Auxetic Tank (Deep Abyss)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. THE 8 BIOMORPHIC VISUAL LANGUAGES // BEYOND CIRCLES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="border-b border-[#E8E5DE] pb-6 mb-16 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#7A756A] block mb-2">
              TAXONOMY OF FORM
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#141518]">
              Eight Biological Visual Languages
            </h2>
          </div>
          <p className="text-xs font-mono text-[#69707D] max-w-sm">
            Strictly eschewing repetitive circular dots. Engineered around anatomical venation, auxetic lattices, pinecone imbrications, and fluid gradients.
          </p>
        </div>

        {/* Clean, Non-Boxed Architectural Directory */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {VISUAL_LANGUAGES.map((lang, idx) => (
            <div
              key={lang.id}
              onClick={() => onNavigate('studio')}
              className="cursor-pointer group space-y-3 border-t border-[#E8E5DE] pt-4 hover:border-[#141518] transition-colors"
            >
              <div className="flex items-center justify-between text-[10px] font-mono text-[#8C867B]">
                <span>MORPH. 0{idx + 1}</span>
                <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity text-[#141518]" />
              </div>
              <h3 className="font-serif text-xl text-[#141518] font-normal group-hover:text-[#2E4A34] transition-colors">
                {lang.name}
              </h3>
              <p className="text-xs font-mono text-[#7A756C]">
                {lang.subtitle}
              </p>
              <p className="text-xs text-[#525761] leading-relaxed font-light">
                {lang.description}
              </p>
              <div className="pt-2 text-[10px] font-mono text-[#8C867B] border-t border-[#F0EDE5]">
                Inspiration: <span className="text-[#141518]">{lang.inspiration.split('&')[0]}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. CURATORIAL MANIFESTO & TRANSITION TO LAB */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="border border-[#141518] p-8 sm:p-16 relative bg-[#FAF9F6]">
          <div className="max-w-3xl space-y-8">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#7A756A] block">
              MATERIAL SYNTHESIS INVITATION
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#141518] leading-[1.12]">
              Configure your bespoke living specimen in the Material Laboratory.
            </h2>
            <p className="text-base sm:text-lg text-[#525761] leading-relaxed font-light">
              Calibrate mineral dye formulas, dial in auxetic pore relief from 0.3mm to 2.4mm, choose between pure color shifts or integrated 3D fiber dilation, and examine real-time perspiration response on the interactive testing bench.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-6">
              <button
                onClick={() => onNavigate('studio')}
                className="px-8 py-4 bg-[#141518] text-[#FAF9F6] text-xs font-mono uppercase tracking-[0.2em] hover:bg-[#2A2E35] transition-all flex items-center gap-3"
              >
                <Sparkles size={14} className="text-[#A3B18A]" />
                <span>Launch Synthesis Lab</span>
              </button>
              <button
                onClick={() => onNavigate('collection')}
                className="px-8 py-4 border border-[#141518] text-[#141518] text-xs font-mono uppercase tracking-[0.2em] hover:bg-[#EFECE5] transition-all"
              >
                Inspect Specimen Series
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
