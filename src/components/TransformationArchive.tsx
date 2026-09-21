import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  GarmentConfig, 
  TransformationStageId, 
  TransformationStageDetail 
} from '../types';
import { TRANSFORMATION_STAGES_HISTORY, DEFAULT_WARDROBE } from '../data/mockData';
import { SmartGarmentVisualizer } from './SmartGarmentVisualizer';
import { 
  Droplets, 
  RotateCcw,
  Sparkles,
  SplitSquareVertical,
  Activity,
  Wind,
  Layers,
  Compass,
  ArrowRight
} from 'lucide-react';

interface TransformationArchiveProps {
  wardrobe: GarmentConfig[];
  onOpenStudio: (config: GarmentConfig) => void;
}

export const TransformationArchive: React.FC<TransformationArchiveProps> = ({
  wardrobe,
  onOpenStudio
}) => {
  const availableGarments = wardrobe.length > 0 ? wardrobe : DEFAULT_WARDROBE;
  const [selectedGarmentId, setSelectedGarmentId] = useState<string>(availableGarments[0].id);
  const [activeStageId, setActiveStageId] = useState<TransformationStageId>('medium_sweat');
  const [view, setView] = useState<'front' | 'back'>('front');
  
  // Side-by-Side Comparison Mode
  const [compareMode, setCompareMode] = useState<boolean>(false);
  const [compareStageA, setCompareStageA] = useState<TransformationStageId>('dry');
  const [compareStageB, setCompareStageB] = useState<TransformationStageId>('heavy_sweat');

  // Continuous Fluid Scrubber
  const [continuousMoisture, setContinuousMoisture] = useState<number>(55);
  const [useContinuousSlider, setUseContinuousSlider] = useState<boolean>(false);

  const selectedGarment = availableGarments.find((g) => g.id === selectedGarmentId) || availableGarments[0];
  const activeStageDetail = TRANSFORMATION_STAGES_HISTORY.find((s) => s.id === activeStageId) || TRANSFORMATION_STAGES_HISTORY[2];

  const handleStageSelect = (stageId: TransformationStageId) => {
    setActiveStageId(stageId);
    setUseContinuousSlider(false);
    const stage = TRANSFORMATION_STAGES_HISTORY.find((s) => s.id === stageId);
    if (stage) {
      setContinuousMoisture(stage.moisturePercent);
    }
  };

  const poeticActs = [
    { id: 'dry', act: 'ACT I', title: 'The Dormant Weave', sub: '0% Moisture Baseline' },
    { id: 'light_sweat', act: 'ACT II', title: 'Sternal Awakening', sub: '20% Incipient Exertion' },
    { id: 'medium_sweat', act: 'ACT III', title: 'Harmonic Equilibrium', sub: '55% Active Coupling' },
    { id: 'heavy_sweat', act: 'ACT IV', title: 'Peak Saturation Bloom', sub: '92% Cresting Horizon' },
    { id: 'cooldown', act: 'ACT V', title: 'Atmospheric Dissipation', sub: '35% Crystalline Recovery' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 space-y-16">
      {/* Curatorial Header */}
      <div className="border-b border-[#E8E5DE] pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.25em] text-[#7A756A] mb-2">
            <span>EXHIBITION 05</span>
            <span>//</span>
            <span>METAMORPHOSIS IN FIVE ACTS</span>
            <span>//</span>
            <span>LONGITUDINAL SPECIMEN STUDY</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light text-[#141518]">
            Transformation Archive
          </h1>
        </div>
        <p className="text-xs sm:text-sm font-mono text-[#69707D] max-w-md font-light leading-relaxed">
          A poetic and scientific investigation of single-garment transfiguration: tracking the paired evolution of mineral chromatism and 3D micro-pore relief through bodily exertion.
        </p>
      </div>

      {/* Specimen Selector & Exhibition View Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E8E5DE]">
        <div className="flex items-center gap-3 font-mono text-xs">
          <span className="text-[#8C867B] uppercase tracking-wider">Investigated Specimen:</span>
          <select
            value={selectedGarment.id}
            onChange={(e) => setSelectedGarmentId(e.target.value)}
            className="bg-[#FAF9F6] border border-[#141518] px-3 py-1.5 font-serif text-base text-[#141518] focus:outline-none"
          >
            {availableGarments.map((g) => (
              <option key={g.id} value={g.id}>
                {g.name} ({g.editionCode})
              </option>
            ))}
          </select>
        </div>

        {/* View toggles */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setView(view === 'front' ? 'back' : 'front')}
            className="px-4 py-2 border border-[#D5D0C5] hover:border-[#141518] font-mono text-xs uppercase tracking-widest text-[#141518] transition-colors"
          >
            Angle: {view}
          </button>

          <button
            onClick={() => setCompareMode(!compareMode)}
            className={`px-4 py-2 border font-mono text-xs uppercase tracking-widest transition-all flex items-center gap-2 ${
              compareMode
                ? 'border-[#141518] bg-[#141518] text-[#FAF9F6]'
                : 'border-[#141518] text-[#141518] hover:bg-[#EFECE5]'
            }`}
          >
            <SplitSquareVertical size={13} />
            <span>{compareMode ? 'Single Vitrine' : 'Dual Vitrine Comparator'}</span>
          </button>
        </div>
      </div>

      {/* 1. SINGLE VITRINE SEQUENTIAL EXHIBITION */}
      {!compareMode ? (
        <div className="space-y-12">
          {/* Act Progression Timeline Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 border-b border-[#E8E5DE] pb-6">
            {poeticActs.map((item) => {
              const isSelected = activeStageId === item.id && !useContinuousSlider;
              return (
                <button
                  key={item.id}
                  onClick={() => handleStageSelect(item.id as TransformationStageId)}
                  className={`text-left p-3 border transition-all ${
                    isSelected
                      ? 'border-[#141518] bg-[#FAF9F6]'
                      : 'border-[#E0DBD0] hover:border-[#141518]'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] font-mono text-[#8C867B]">
                    <span>{item.act}</span>
                    {isSelected && <span className="text-[#2E4A34] font-semibold">OBSERVING</span>}
                  </div>
                  <div className="font-serif text-base text-[#141518] mt-1">
                    {item.title}
                  </div>
                  <div className="text-[10px] font-mono text-[#7A756C] mt-0.5">
                    {item.sub}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Main Asymmetrical Vitrine & Dossier Display */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left: Illuminated Kinetic Glass Vitrine */}
            <div className="lg:col-span-6 space-y-6">
              <div className="specimen-glass p-6 sm:p-8">
                <div className="flex items-center justify-between border-b border-[#E8E5DE] pb-4 mb-6 font-mono text-xs">
                  <span className="text-[#2E4A34] font-semibold uppercase tracking-wider">
                    {useContinuousSlider ? 'Continuous Dial Mode' : activeStageDetail.label}
                  </span>
                  <span className="text-[#8C867B]">
                    {useContinuousSlider ? `${Math.round(continuousMoisture)}% Saturation` : `${activeStageDetail.moisturePercent}% Moisture Saturation`}
                  </span>
                </div>

                {/* Vitrine Visualizer */}
                <div className="relative py-6 flex items-center justify-center bg-radial from-[#FFFFFF] via-[#FAF9F6] to-[#F3F1EC] border border-[#EDEAE3] min-h-[440px]">
                  <SmartGarmentVisualizer
                    config={selectedGarment}
                    stageMode={useContinuousSlider ? undefined : activeStageId}
                    sweatLevel={useContinuousSlider ? continuousMoisture : undefined}
                    view={view}
                    interactiveSpray={true}
                    size="lg"
                    className="mx-auto"
                  />

                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[10px] font-mono text-[#7A756C] bg-white/90 backdrop-blur-xs px-3 py-1.5 border border-[#E6E3DC]">
                    <span>[ CLICK TEXTILE TO CONDENSE SPRAY ]</span>
                    <span className="text-[#2E4A34] font-semibold">
                      RELIEF: +{activeStageDetail.tactileReliefMm}MM
                    </span>
                  </div>
                </div>

                {/* Fluid Scrubbing Bar */}
                <div className="mt-6 space-y-3 pt-4 border-t border-[#E8E5DE]">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-[#69707D] uppercase tracking-wider flex items-center gap-2">
                      <Droplets size={13} className="text-[#2E4A34]" />
                      <span>FLUID PERSISTENT SCRUBBER</span>
                    </span>
                    <span className="font-semibold text-[#141518]">
                      {useContinuousSlider ? continuousMoisture : activeStageDetail.moisturePercent}%
                    </span>
                  </div>

                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={useContinuousSlider ? continuousMoisture : activeStageDetail.moisturePercent}
                    onChange={(e) => {
                      setUseContinuousSlider(true);
                      setContinuousMoisture(Number(e.target.value));
                    }}
                    className="w-full h-1 bg-[#E0DBD0] rounded-none appearance-none cursor-pointer accent-[#141518]"
                  />
                </div>
              </div>
            </div>

            {/* Right: Curatorial & Scientific Monograph */}
            <div className="lg:col-span-6 space-y-8">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#7A756A] block mb-2">
                  ACT PHENOMENOLOGICAL DOSSIER
                </span>
                <h2 className="font-serif text-4xl text-[#141518] font-light">
                  {activeStageDetail.stageName}
                </h2>
                <div className="font-mono text-xs text-[#2E4A34] mt-1">
                  TACTILE RELIEF: +{activeStageDetail.tactileReliefMm}MM • AIR PERMEABILITY: {activeStageDetail.airPermeabilityCfm} CFM
                </div>
              </div>

              {/* Poetic & Physical Descriptions */}
              <div className="space-y-6 text-sm leading-relaxed font-light text-[#525761]">
                <div className="border-t border-[#E8E5DE] pt-4">
                  <div className="font-mono text-[11px] uppercase tracking-wider text-[#141518] font-medium mb-1">
                    01 // Textile Surface & Tactile Expression
                  </div>
                  <p>{activeStageDetail.textileExpression}</p>
                </div>

                <div className="border-t border-[#E8E5DE] pt-4">
                  <div className="font-mono text-[11px] uppercase tracking-wider text-[#141518] font-medium mb-1">
                    02 // Chromatic Bloom & Mineral Halos
                  </div>
                  <p>{activeStageDetail.colorEvolution}</p>
                </div>

                <div className="border-t border-[#E8E5DE] pt-4">
                  <div className="font-mono text-[11px] uppercase tracking-wider text-[#141518] font-medium mb-1">
                    03 // Micro-Structural Convection & Zero-Cling
                  </div>
                  <p>{activeStageDetail.structuralReaction}</p>
                </div>

                <div className="border-t border-[#E8E5DE] pt-4">
                  <div className="font-mono text-[11px] uppercase tracking-wider text-[#141518] font-medium mb-1">
                    04 // Daily Life & Bodily Horizon
                  </div>
                  <p className="font-serif italic text-base text-[#141518]">{activeStageDetail.lifestyleContext}</p>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4">
                <button
                  onClick={() => onOpenStudio(selectedGarment)}
                  className="px-8 py-4 bg-[#141518] text-[#FAF9F6] text-xs font-mono uppercase tracking-[0.2em] hover:bg-[#2A2E35] transition-all flex items-center gap-3"
                >
                  <Sparkles size={13} className="text-[#A3B18A]" />
                  <span>Synthesize Variant in Material Lab</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* 2. DUAL VITRINE SIDE-BY-SIDE COMPARATOR */
        <div className="space-y-12">
          <div className="border-b border-[#E8E5DE] pb-4">
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#7A756A] block">
              DUAL OBSERVATION COMPARATOR
            </span>
            <p className="text-xs font-mono text-[#69707D] mt-1">
              Directly compare two distinct evolutionary states of the exact same living specimen.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {/* Specimen Vitrine A */}
            <div className="specimen-glass p-6 sm:p-8 space-y-4">
              <div className="flex items-center justify-between border-b border-[#E8E5DE] pb-3">
                <span className="font-mono text-xs uppercase tracking-wider text-[#7A756A]">
                  VITRINE A // BASELINE
                </span>
                <select
                  value={compareStageA}
                  onChange={(e) => setCompareStageA(e.target.value as TransformationStageId)}
                  className="bg-[#FAF9F6] border border-[#141518] text-xs font-mono uppercase px-3 py-1 text-[#141518]"
                >
                  {TRANSFORMATION_STAGES_HISTORY.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="relative py-6 flex items-center justify-center bg-radial from-[#FFFFFF] via-[#FAF9F6] to-[#F3F1EC] border border-[#EDEAE3] min-h-[380px]">
                <SmartGarmentVisualizer
                  config={selectedGarment}
                  stageMode={compareStageA}
                  view={view}
                  interactiveSpray={false}
                  size="md"
                  className="mx-auto"
                />
              </div>

              <div className="font-mono text-xs text-[#525761] space-y-1 pt-2">
                <div className="text-[#141518] font-serif text-lg font-normal">
                  {TRANSFORMATION_STAGES_HISTORY.find((s) => s.id === compareStageA)?.stageName}
                </div>
                <div className="text-[11px]">
                  Relief Lift: +{TRANSFORMATION_STAGES_HISTORY.find((s) => s.id === compareStageA)?.tactileReliefMm}mm
                </div>
              </div>
            </div>

            {/* Specimen Vitrine B */}
            <div className="specimen-glass p-6 sm:p-8 space-y-4">
              <div className="flex items-center justify-between border-b border-[#E8E5DE] pb-3">
                <span className="font-mono text-xs uppercase tracking-wider text-[#2E4A34]">
                  VITRINE B // ACTIVATION
                </span>
                <select
                  value={compareStageB}
                  onChange={(e) => setCompareStageB(e.target.value as TransformationStageId)}
                  className="bg-[#FAF9F6] border border-[#141518] text-xs font-mono uppercase px-3 py-1 text-[#141518]"
                >
                  {TRANSFORMATION_STAGES_HISTORY.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="relative py-6 flex items-center justify-center bg-radial from-[#FFFFFF] via-[#FAF9F6] to-[#F3F1EC] border border-[#EDEAE3] min-h-[380px]">
                <SmartGarmentVisualizer
                  config={selectedGarment}
                  stageMode={compareStageB}
                  view={view}
                  interactiveSpray={false}
                  size="md"
                  className="mx-auto"
                />
              </div>

              <div className="font-mono text-xs text-[#525761] space-y-1 pt-2">
                <div className="text-[#141518] font-serif text-lg font-normal">
                  {TRANSFORMATION_STAGES_HISTORY.find((s) => s.id === compareStageB)?.stageName}
                </div>
                <div className="text-[11px]">
                  Relief Lift: +{TRANSFORMATION_STAGES_HISTORY.find((s) => s.id === compareStageB)?.tactileReliefMm}mm
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
