import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ProductGarment, GarmentConfig } from '../types';
import { PRODUCT_COLLECTION } from '../data/mockData';
import { SmartGarmentVisualizer } from './SmartGarmentVisualizer';
import { 
  Check, 
  ArrowRight, 
  Droplets, 
  RotateCcw, 
  Sparkles, 
  Archive, 
  Info,
  Layers,
  Wind
} from 'lucide-react';

interface CollectionSectionProps {
  onAddToWardrobe: (garment: GarmentConfig) => void;
  onCustomizeBespoke: (garment: GarmentConfig) => void;
  selectedProductId?: string;
}

export const CollectionSection: React.FC<CollectionSectionProps> = ({
  onAddToWardrobe,
  onCustomizeBespoke,
  selectedProductId
}) => {
  const [activeProductId, setActiveProductId] = useState<string>(
    selectedProductId || PRODUCT_COLLECTION[0].id
  );
  const [sweatSim, setSweatSim] = useState<number>(50);
  const [activeView, setActiveView] = useState<'front' | 'back'>('front');
  const [modeOverride, setModeOverride] = useState<'color_only' | 'color_and_texture'>('color_and_texture');
  const [intensityOverride, setIntensityOverride] = useState<'subtle' | 'pronounced' | 'sculptural'>('pronounced');
  const [archivedToast, setArchivedToast] = useState<string | null>(null);

  const activeProduct = PRODUCT_COLLECTION.find((p) => p.id === activeProductId) || PRODUCT_COLLECTION[0];

  // Derive garment config for visualizer
  const currentGarmentConfig: GarmentConfig = {
    id: activeProduct.id,
    name: activeProduct.title,
    editionCode: activeProduct.edition,
    silhouette: activeProduct.silhouette,
    palette: activeProduct.defaultPalette,
    visualLanguage: activeProduct.defaultVisualLanguage,
    transformationMode: modeOverride,
    textureIntensity: intensityOverride,
    baseColor: activeProduct.defaultPalette.dryBase,
    sensitivity: 1.05,
    materialComposition: activeProduct.fabricSpecs.composition
  };

  const handleArchiveToFolio = () => {
    onAddToWardrobe(currentGarmentConfig);
    setArchivedToast(`Archived ${activeProduct.title} to Specimen Folio`);
    setTimeout(() => setArchivedToast(null), 3200);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 space-y-16">
      {/* Archival Toast Alert */}
      <AnimatePresence>
        {archivedToast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-24 right-8 z-50 bg-[#141518] text-[#FAF9F6] px-5 py-3 border border-[#30343C] font-mono text-xs uppercase tracking-widest flex items-center gap-3 shadow-xl"
          >
            <Check size={14} className="text-[#A3B18A]" />
            <span>{archivedToast}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Curatorial Header */}
      <div className="border-b border-[#E8E5DE] pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.25em] text-[#7A756A] mb-2">
            <span>SERIES IV</span>
            <span>//</span>
            <span>LIVING MORPHOLOGIES</span>
            <span>//</span>
            <span>MUSEUM SPECIMEN INDEX</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light text-[#141518]">
            Morphological Specimens
          </h1>
        </div>
        <p className="text-xs sm:text-sm font-mono text-[#69707D] max-w-md font-light leading-relaxed">
          Four foundational activewear silhouettes knitted with moisture-dilating chitin bio-polymers. Examine their behavioral state shifts under exertion and on-body performance in real life.
        </p>
      </div>

      {/* Specimen Index Nav (Editorial Numbered Tabs) */}
      <div className="flex items-center gap-6 overflow-x-auto pb-3 border-b border-[#E8E5DE] scrollbar-none">
        {PRODUCT_COLLECTION.map((product, idx) => {
          const isSelected = product.id === activeProductId;
          return (
            <button
              key={product.id}
              onClick={() => {
                setActiveProductId(product.id);
                setModeOverride(product.defaultMode);
                setIntensityOverride(product.defaultIntensity);
              }}
              className={`group py-2 font-mono text-xs uppercase tracking-[0.15em] whitespace-nowrap transition-all flex items-center gap-2 relative ${
                isSelected ? 'text-[#141518] font-medium' : 'text-[#8C867B] hover:text-[#141518]'
              }`}
            >
              <span className="text-[10px] text-[#A6A196]">0{idx + 1}</span>
              <span>{product.title}</span>
              {isSelected && (
                <span className="absolute -bottom-3 left-0 right-0 h-[2px] bg-[#141518]" />
              )}
            </button>
          );
        })}
      </div>

      {/* Main Asymmetrical Specimen Exhibition Display */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Column: Real Life On-Model Context & Curatorial Notes */}
        <div className="lg:col-span-6 space-y-8">
          {/* Lifestyle Photographic Specimen */}
          <div className="relative aspect-4/5 overflow-hidden bg-[#EFECE5] border border-[#E8E5DE]">
            <img
              src={activeProduct.modelImageUrl}
              alt={activeProduct.title}
              className="w-full h-full object-cover filter contrast-[1.03]"
            />

            {/* Contextual Exhibition Marker */}
            <div className="absolute top-4 left-4 bg-[#141518] text-[#FAF9F6] font-mono text-[9px] uppercase tracking-[0.2em] px-3 py-1">
              FIELD STUDY // {activeProduct.lifestyleCategory}
            </div>

            <div className="absolute bottom-4 left-4 right-4 bg-[#FAF9F6]/95 backdrop-blur-xs p-4 border border-[#E0DBD0]">
              <span className="font-mono text-[9px] uppercase tracking-widest text-[#7A756A] block">
                HABITAT SYMBIOSIS NOTE
              </span>
              <p className="font-serif italic text-sm text-[#141518] mt-1">
                Worn in continuous transition between intensive physical output and natural everyday recovery.
              </p>
            </div>
          </div>

          {/* Curatorial Specimen Dossier */}
          <div className="space-y-6 pt-2">
            <div className="space-y-2">
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#7A756A]">
                SPECIMEN MANIFEST // {activeProduct.edition}
              </span>
              <h2 className="font-serif text-3xl text-[#141518] font-light">
                {activeProduct.title}
              </h2>
              <p className="font-mono text-xs text-[#2E4A34]">
                {activeProduct.subtitle}
              </p>
            </div>

            <p className="text-sm text-[#525761] leading-relaxed font-light">
              {activeProduct.description}
            </p>

            {/* Material Science & Micro-Weave Parameters */}
            <div className="border-t border-[#E8E5DE] pt-6 space-y-3 font-mono text-xs">
              <div className="flex justify-between py-1 border-b border-[#F0EDE5]">
                <span className="text-[#8C867B] uppercase tracking-wider">Polymer Origin</span>
                <span className="text-[#141518] font-medium">{activeProduct.fabricSpecs.composition}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#F0EDE5]">
                <span className="text-[#8C867B] uppercase tracking-wider">Areal Weight</span>
                <span className="text-[#141518] font-medium">{activeProduct.fabricSpecs.weight}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#F0EDE5]">
                <span className="text-[#8C867B] uppercase tracking-wider">Laboratory Assembly</span>
                <span className="text-[#141518] font-medium">{activeProduct.fabricSpecs.origin}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#F0EDE5]">
                <span className="text-[#8C867B] uppercase tracking-wider">Biological Mechanism</span>
                <span className="text-[#2E4A34] font-medium">{activeProduct.fabricSpecs.biopolymerTech}</span>
              </div>
            </div>

            {/* Archival Actions */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                onClick={handleArchiveToFolio}
                className="px-6 py-3.5 bg-[#141518] text-[#FAF9F6] text-xs font-mono uppercase tracking-[0.2em] hover:bg-[#2A2E35] transition-all flex items-center gap-3"
              >
                <Archive size={14} className="text-[#A3B18A]" />
                <span>Archive to Specimen Folio</span>
              </button>

              <button
                onClick={() => onCustomizeBespoke(currentGarmentConfig)}
                className="px-6 py-3.5 border border-[#141518] text-[#141518] text-xs font-mono uppercase tracking-[0.2em] hover:bg-[#EFECE5] transition-all flex items-center gap-2"
              >
                <Sparkles size={13} className="text-[#2E4A34]" />
                <span>Calibrate in Material Lab</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Live Kinetic Vitrine & Morphological Controls */}
        <div className="lg:col-span-6 space-y-6">
          <div className="specimen-glass p-6 sm:p-8">
            {/* Vitrine Top Controls */}
            <div className="flex items-center justify-between border-b border-[#E8E5DE] pb-4 mb-6">
              <div>
                <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-[#8C867B] block">
                  KINETIC SPECIMEN OBSERVATION
                </span>
                <div className="text-xs font-mono text-[#141518]">
                  PERSISTENT MOISTURE TRIGGER
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveView(activeView === 'front' ? 'back' : 'front')}
                  className="text-[10px] font-mono uppercase tracking-widest px-3 py-1.5 border border-[#D5D0C5] hover:border-[#141518] transition-colors"
                >
                  View: {activeView}
                </button>
                <button
                  onClick={() => setSweatSim(0)}
                  title="Reset to 0% Dormancy"
                  className="p-1.5 hover:bg-[#EFECE5] text-[#7A756C] transition-colors"
                >
                  <RotateCcw size={14} />
                </button>
              </div>
            </div>

            {/* The Visualizer Canvas */}
            <div className="relative py-6 flex items-center justify-center bg-radial from-[#FFFFFF] via-[#FAF9F6] to-[#F3F1EC] border border-[#EDEAE3] min-h-[420px]">
              <SmartGarmentVisualizer
                config={currentGarmentConfig}
                sweatLevel={sweatSim}
                view={activeView}
                interactiveSpray={true}
                size="lg"
                className="mx-auto"
              />

              <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[10px] font-mono text-[#7A756C] bg-white/90 backdrop-blur-xs px-3 py-1.5 border border-[#E6E3DC]">
                <span>[ TAP FABRIC TO SPRAY LOCALLY ]</span>
                <span className="text-[#2E4A34] font-semibold">
                  {sweatSim === 0 ? 'DORMANT' : `${Math.round(sweatSim)}% ACTIVE`}
                </span>
              </div>
            </div>

            {/* Moisture Simulator Slider */}
            <div className="mt-6 space-y-3 pt-4 border-t border-[#E8E5DE]">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-[#69707D] flex items-center gap-2">
                  <Droplets size={13} className="text-[#2E4A34]" />
                  <span>TRANSPIRATION LEVEL / EXERTION</span>
                </span>
                <span className="font-semibold text-[#141518]">{sweatSim}%</span>
              </div>

              <input
                type="range"
                min="0"
                max="100"
                value={sweatSim}
                onChange={(e) => setSweatSim(Number(e.target.value))}
                className="w-full h-1 bg-[#E0DBD0] rounded-none appearance-none cursor-pointer accent-[#141518]"
              />

              <div className="flex justify-between text-[9px] font-mono text-[#8C867B] uppercase tracking-wider">
                <button onClick={() => setSweatSim(0)} className="hover:text-[#141518]">0% Dormant</button>
                <button onClick={() => setSweatSim(25)} className="hover:text-[#141518]">25% Light</button>
                <button onClick={() => setSweatSim(55)} className="hover:text-[#141518]">55% Medium</button>
                <button onClick={() => setSweatSim(95)} className="hover:text-[#141518]">95% Peak</button>
              </div>
            </div>

            {/* Integrated Transformation Mode Selector */}
            <div className="mt-8 pt-6 border-t border-[#E8E5DE] space-y-4">
              <div className="flex items-center justify-between font-mono text-xs">
                <span className="text-[#8C867B] uppercase tracking-wider">System Integration Mode</span>
                <span className="text-[#2E4A34] font-medium">
                  {modeOverride === 'color_only' ? 'Color Shift Only' : 'Color + 3D Micro-Pores'}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setModeOverride('color_only')}
                  className={`py-3 px-4 text-xs font-mono uppercase tracking-wider text-left border transition-all ${
                    modeOverride === 'color_only'
                      ? 'border-[#141518] bg-[#141518] text-[#FAF9F6]'
                      : 'border-[#D5D0C5] text-[#69707D] hover:border-[#141518]'
                  }`}
                >
                  <div className="font-semibold">Color Only</div>
                  <div className="text-[10px] opacity-75 font-normal mt-0.5">Two-dimensional pigment</div>
                </button>

                <button
                  onClick={() => setModeOverride('color_and_texture')}
                  className={`py-3 px-4 text-xs font-mono uppercase tracking-wider text-left border transition-all ${
                    modeOverride === 'color_and_texture'
                      ? 'border-[#141518] bg-[#141518] text-[#FAF9F6]'
                      : 'border-[#D5D0C5] text-[#69707D] hover:border-[#141518]'
                  }`}
                >
                  <div className="font-semibold">Color + Texture</div>
                  <div className="text-[10px] opacity-75 font-normal mt-0.5">3D physical pore dilation</div>
                </button>
              </div>
            </div>

            {/* Tactile Intensity Tiers (Visible when mode is color + texture) */}
            {modeOverride === 'color_and_texture' && (
              <div className="mt-6 pt-4 border-t border-[#F0EDE5] space-y-3">
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="text-[#8C867B] uppercase tracking-wider">Tactile Relief Amplitude</span>
                  <span className="text-[#141518] font-medium">
                    {intensityOverride === 'subtle' && '0.5mm Relief'}
                    {intensityOverride === 'pronounced' && '1.4mm Relief'}
                    {intensityOverride === 'sculptural' && '2.4mm Relief'}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {(['subtle', 'pronounced', 'sculptural'] as const).map((tier) => (
                    <button
                      key={tier}
                      onClick={() => setIntensityOverride(tier)}
                      className={`py-2 text-[11px] font-mono uppercase tracking-wider border text-center transition-all ${
                        intensityOverride === tier
                          ? 'border-[#141518] bg-[#EFECE5] text-[#141518] font-semibold'
                          : 'border-[#E0DBD0] text-[#7A756C] hover:border-[#141518]'
                      }`}
                    >
                      {tier}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
