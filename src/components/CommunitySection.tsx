import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LifestyleWearer, GarmentConfig } from '../types';
import { LIFESTYLE_WEARERS } from '../data/mockData';
import { SmartGarmentVisualizer } from './SmartGarmentVisualizer';
import { 
  Heart, 
  MapPin, 
  Sparkles, 
  ArrowRight, 
  X,
  Droplets,
  RotateCcw,
  Activity,
  Compass
} from 'lucide-react';

interface CommunitySectionProps {
  onInspectGarment: (config: GarmentConfig) => void;
}

type SceneFilter = 'all' | 'gym' | 'outdoors' | 'city' | 'travel' | 'casual';

export const CommunitySection: React.FC<CommunitySectionProps> = ({ onInspectGarment }) => {
  const [activeFilter, setActiveFilter] = useState<SceneFilter>('all');
  const [wearers, setWearers] = useState<LifestyleWearer[]>(LIFESTYLE_WEARERS);
  const [inspectedWearerId, setInspectedWearerId] = useState<string | null>(null);
  const [modalSweat, setModalSweat] = useState<number>(65);

  const toggleResonance = (id: string) => {
    setWearers((prev) =>
      prev.map((w) => {
        if (w.id === id) {
          const isLiked = !w.hasResonated;
          return {
            ...w,
            hasResonated: isLiked,
            resonanceCount: w.resonanceCount + (isLiked ? 1 : -1)
          };
        }
        return w;
      })
    );
  };

  const filteredWearers = activeFilter === 'all'
    ? wearers
    : wearers.filter((w) => w.lifestyleScene === activeFilter);

  const filterOptions: { id: SceneFilter; label: string }[] = [
    { id: 'all', label: 'All Habitats' },
    { id: 'gym', label: 'Gym & High Exertion' },
    { id: 'outdoors', label: 'High-Alpine Trails' },
    { id: 'city', label: 'Metropolitan Transit' },
    { id: 'travel', label: 'Intercontinental Travel' },
    { id: 'casual', label: 'Atelier & Rest' }
  ];

  const activeModalWearer = wearers.find((w) => w.id === inspectedWearerId);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 space-y-16">
      {/* Field Studies Header */}
      <div className="border-b border-[#E8E5DE] pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.25em] text-[#7A756A] mb-2">
            <span>CHRONICLES 04</span>
            <span>//</span>
            <span>HUMAN SYMBIOSIS ARCHIVE</span>
            <span>//</span>
            <span>EVERYDAY FIELD STUDIES</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light text-[#141518]">
            Living Field Studies
          </h1>
        </div>
        <p className="text-xs sm:text-sm font-mono text-[#69707D] max-w-md font-light leading-relaxed">
          Garments observed in actual bodily immersion across divergent climates and exertion thresholds: sprint intervals, alpine scree, humid transit, airport dashes, and tranquil cafe terraces.
        </p>
      </div>

      {/* Habitat Filter Tabs */}
      <div className="flex items-center gap-6 overflow-x-auto pb-3 border-b border-[#E8E5DE] scrollbar-none font-mono text-xs uppercase tracking-[0.15em]">
        {filterOptions.map((opt) => {
          const isActive = activeFilter === opt.id;
          return (
            <button
              key={opt.id}
              onClick={() => setActiveFilter(opt.id)}
              className={`py-2 whitespace-nowrap transition-all relative ${
                isActive ? 'text-[#141518] font-semibold' : 'text-[#8C867B] hover:text-[#141518]'
              }`}
            >
              <span>{opt.label}</span>
              {isActive && (
                <span className="absolute -bottom-3 left-0 right-0 h-[2px] bg-[#141518]" />
              )}
            </button>
          );
        })}
      </div>

      {/* Curatorial Photographic Exposition (Asymmetrical Non-Boxed Layout) */}
      <div className="space-y-24">
        {filteredWearers.map((wearer, index) => {
          const isEven = index % 2 === 0;
          return (
            <div
              key={wearer.id}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center border-b border-[#E8E5DE] pb-20"
            >
              {/* Image Section */}
              <div className={`lg:col-span-7 relative overflow-hidden bg-[#EFECE5] ${!isEven ? 'lg:order-2' : ''}`}>
                <img
                  src={wearer.modelPhotoUrl}
                  alt={wearer.modelPhotoAlt}
                  className="w-full aspect-16/10 object-cover filter contrast-[1.03]"
                />

                {/* Badges */}
                <div className="absolute top-4 left-4 bg-[#141518] text-[#FAF9F6] font-mono text-[9px] uppercase tracking-[0.2em] px-3 py-1">
                  CASE STUDY 0{index + 1} // {wearer.sceneTitle.toUpperCase()}
                </div>

                <div className="absolute bottom-4 right-4 bg-[#FAF9F6]/95 backdrop-blur-xs font-mono text-[9px] text-[#141518] px-3 py-1.5 border border-[#E0DBD0]">
                  TRANSPIRATION: {wearer.sweatOutput} • {wearer.wearDurationHours}H WEAR
                </div>
              </div>

              {/* Dossier Text Section */}
              <div className={`lg:col-span-5 space-y-6 ${!isEven ? 'lg:order-1' : ''}`}>
                <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-[#7A756A]">
                  <MapPin size={11} className="text-[#2E4A34]" />
                  <span>{wearer.location}</span>
                </div>

                <h3 className="font-serif text-3xl font-light text-[#141518] leading-snug">
                  {wearer.quote}
                </h3>

                <p className="text-sm text-[#525761] leading-relaxed font-light">
                  {wearer.activityDescription}
                </p>

                {/* Garment Identification */}
                <div className="p-4 border border-[#E0DBD0] bg-[#FAF9F6] space-y-2 font-mono text-xs">
                  <div className="flex justify-between">
                    <span className="text-[#8C867B] uppercase">Equipped Specimen</span>
                    <span className="text-[#141518] font-medium">{wearer.garmentConfig.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#8C867B] uppercase">Visual Morphology</span>
                    <span className="text-[#2E4A34]">{wearer.garmentConfig.visualLanguage.replace('_', ' ')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#8C867B] uppercase">Reaction Mode</span>
                    <span className="text-[#141518]">{wearer.garmentConfig.transformationMode.replace('_', ' ')}</span>
                  </div>
                </div>

                {/* Interactive Actions */}
                <div className="pt-2 flex items-center justify-between">
                  <button
                    onClick={() => {
                      setInspectedWearerId(wearer.id);
                      setModalSweat(wearer.activeStage === 'heavy_sweat' ? 88 : wearer.activeStage === 'medium_sweat' ? 55 : 30);
                    }}
                    className="px-5 py-2.5 border border-[#141518] text-[#141518] text-xs font-mono uppercase tracking-[0.15em] hover:bg-[#141518] hover:text-[#FAF9F6] transition-all flex items-center gap-2"
                  >
                    <Sparkles size={12} className="text-[#A3B18A]" />
                    <span>Examine Living Specimen</span>
                  </button>

                  <button
                    onClick={() => toggleResonance(wearer.id)}
                    className="flex items-center gap-2 font-mono text-xs text-[#7A756C] hover:text-[#141518] transition-colors"
                  >
                    <Heart
                      size={14}
                      className={wearer.hasResonated ? 'fill-[#A44A3F] text-[#A44A3F]' : ''}
                    />
                    <span>{wearer.resonanceCount} Resonances</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Specimen Examination Dossier Modal */}
      <AnimatePresence>
        {activeModalWearer && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="bg-[#FAF9F6] border border-[#141518] max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-10 shadow-2xl relative space-y-8"
            >
              {/* Modal Close */}
              <button
                onClick={() => setInspectedWearerId(null)}
                className="absolute top-6 right-6 p-2 text-[#141518] hover:bg-[#EFECE5]"
              >
                <X size={20} />
              </button>

              <div className="border-b border-[#E8E5DE] pb-4">
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#7A756A] block">
                  FIELD SPECIMEN INVESTIGATION
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl text-[#141518] font-light mt-1">
                  {activeModalWearer.garmentConfig.name}
                </h2>
                <div className="font-mono text-xs text-[#2E4A34] mt-1">
                  WORN BY {activeModalWearer.name.toUpperCase()} // {activeModalWearer.location.toUpperCase()}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                {/* Visualizer */}
                <div className="relative py-4 bg-radial from-white via-[#FAF9F6] to-[#F3F1EC] border border-[#E0DBD0] flex items-center justify-center min-h-[360px]">
                  <SmartGarmentVisualizer
                    config={activeModalWearer.garmentConfig}
                    sweatLevel={modalSweat}
                    interactiveSpray={true}
                    size="md"
                    className="mx-auto"
                  />
                  <div className="absolute bottom-2 left-3 right-3 text-[10px] font-mono text-[#7A756C] bg-white/90 px-3 py-1 border border-[#E0DBD0] flex justify-between">
                    <span>INTERACTIVE CONDENSATION TEST</span>
                    <span className="text-[#2E4A34] font-semibold">{modalSweat}% SATURATION</span>
                  </div>
                </div>

                {/* Telemetry & Actions */}
                <div className="space-y-6">
                  <div className="space-y-2">
                    <span className="font-mono text-[10px] uppercase text-[#7A756A]">
                      OBSERVED FIELD NOTE
                    </span>
                    <p className="font-serif italic text-lg text-[#141518] leading-relaxed">
                      {activeModalWearer.quote}
                    </p>
                    <p className="text-xs text-[#525761] leading-relaxed font-light pt-1">
                      {activeModalWearer.activityDescription}
                    </p>
                  </div>

                  {/* Transpiration slider */}
                  <div className="space-y-2 pt-2 border-t border-[#E8E5DE]">
                    <div className="flex justify-between font-mono text-xs">
                      <span className="text-[#69707D]">SIMULATE PERSISTENT TRANSPIRATION</span>
                      <span className="font-semibold text-[#141518]">{modalSweat}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={modalSweat}
                      onChange={(e) => setModalSweat(Number(e.target.value))}
                      className="w-full h-1 bg-[#E0DBD0] rounded-none appearance-none cursor-pointer accent-[#141518]"
                    />
                  </div>

                  <div className="pt-4 flex items-center gap-4">
                    <button
                      onClick={() => {
                        onInspectGarment(activeModalWearer.garmentConfig);
                        setInspectedWearerId(null);
                      }}
                      className="px-6 py-3.5 bg-[#141518] text-[#FAF9F6] text-xs font-mono uppercase tracking-[0.2em] hover:bg-[#2A2E35] transition-all flex items-center gap-2"
                    >
                      <Sparkles size={12} className="text-[#A3B18A]" />
                      <span>Synthesize Replica in Lab</span>
                    </button>
                    <button
                      onClick={() => setInspectedWearerId(null)}
                      className="px-6 py-3.5 border border-[#141518] text-[#141518] text-xs font-mono uppercase tracking-[0.2em] hover:bg-[#EFECE5] transition-all"
                    >
                      Close Dossier
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
