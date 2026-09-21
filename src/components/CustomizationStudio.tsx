import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  GarmentConfig, 
  GarmentSilhouette, 
  VisualLanguageType, 
  TransformationMode, 
  TextureIntensity,
  ReactivePalette
} from '../types';
import { VISUAL_LANGUAGES, REACTIVE_PALETTES } from '../data/mockData';
import { SmartGarmentVisualizer } from './SmartGarmentVisualizer';
import { 
  Sparkles, 
  Droplets, 
  Check, 
  RotateCcw, 
  Archive,
  Layers,
  Activity,
  Wind,
  Gauge
} from 'lucide-react';

interface CustomizationStudioProps {
  initialConfig?: GarmentConfig;
  onSaveBespoke: (config: GarmentConfig) => void;
}

export const CustomizationStudio: React.FC<CustomizationStudioProps> = ({
  initialConfig,
  onSaveBespoke
}) => {
  // Studio state
  const [silhouette, setSilhouette] = useState<GarmentSilhouette>(initialConfig?.silhouette || 'tech_tee');
  const [visualLanguage, setVisualLanguage] = useState<VisualLanguageType>(initialConfig?.visualLanguage || 'branching_veins');
  const [transformationMode, setTransformationMode] = useState<TransformationMode>(initialConfig?.transformationMode || 'color_and_texture');
  const [textureIntensity, setTextureIntensity] = useState<TextureIntensity>(initialConfig?.textureIntensity || 'pronounced');
  const [palette, setPalette] = useState<ReactivePalette>(initialConfig?.palette || REACTIVE_PALETTES[0]);
  const [customName, setCustomName] = useState<string>(initialConfig?.name || 'Bio-Specimen AC-Lab-01');
  const [sensitivity, setSensitivity] = useState<number>(initialConfig?.sensitivity || 1.05);
  const [sweatSim, setSweatSim] = useState<number>(55);
  const [activeView, setActiveView] = useState<'front' | 'back'>('front');
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);

  // Assembled live config
  const currentConfig: GarmentConfig = {
    id: `lab-specimen-${Date.now()}`,
    name: customName,
    editionCode: `LAB-${visualLanguage.slice(0, 4).toUpperCase()}`,
    silhouette,
    palette,
    visualLanguage,
    transformationMode,
    textureIntensity,
    baseColor: palette.dryBase,
    sensitivity,
    materialComposition: '78% Circular Bio-Chitin, 22% Moisture-Responsive Matrix',
    isEquipped: true
  };

  const handleSynthesize = () => {
    onSaveBespoke(currentConfig);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3500);
  };

  const activeLanguageInfo = VISUAL_LANGUAGES.find((v) => v.id === visualLanguage) || VISUAL_LANGUAGES[0];

  // Dynamic telemetry calculations
  const reliefHeightMm = transformationMode === 'color_only' 
    ? 0.1 
    : (textureIntensity === 'subtle' ? 0.5 : textureIntensity === 'pronounced' ? 1.4 : 2.4) * (sweatSim / 100);
  
  const permeabilityLiftPercent = Math.round(100 + (sweatSim * 2.2));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 space-y-16">
      {/* Toast Alert */}
      <AnimatePresence>
        {saveSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-24 right-8 z-50 bg-[#141518] text-[#FAF9F6] px-5 py-3 border border-[#30343C] font-mono text-xs uppercase tracking-widest flex items-center gap-3 shadow-xl"
          >
            <Check size={14} className="text-[#A3B18A]" />
            <span>Specimen Synthesized & Added to Folio</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lab Header */}
      <div className="border-b border-[#E8E5DE] pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.25em] text-[#7A756A] mb-2">
            <span>STATION 03</span>
            <span>//</span>
            <span>BIO-SYNTHESIS CHAMBER</span>
            <span>//</span>
            <span>MATERIAL RESEARCH LABORATORY</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light text-[#141518]">
            Material Laboratory
          </h1>
        </div>
        <p className="text-xs sm:text-sm font-mono text-[#69707D] max-w-md font-light leading-relaxed">
          Calibrate an experimental living garment. Adjust fiber dilation height, select biological venation architectures, and observe dynamic moisture equilibrium on the testing vitrine.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Column: Interactive Testing Vitrine & Telemetry (Sticky on desktop) */}
        <div className="lg:col-span-5 sticky top-28 space-y-6">
          <div className="specimen-glass p-6 sm:p-8">
            {/* Vitrine Top Banner */}
            <div className="flex items-center justify-between border-b border-[#E8E5DE] pb-4 mb-6">
              <div>
                <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-[#8C867B] block">
                  SYNTHESIS VITRINE // LIVE RIG
                </span>
                <div className="font-serif text-xl text-[#141518]">
                  {customName}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveView(activeView === 'front' ? 'back' : 'front')}
                  className="text-[10px] font-mono uppercase tracking-widest px-3 py-1.5 border border-[#D5D0C5] hover:border-[#141518] transition-colors"
                >
                  {activeView}
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

            {/* Specimen Visualizer Canvas */}
            <div className="relative py-6 flex items-center justify-center bg-radial from-[#FFFFFF] via-[#FAF9F6] to-[#F3F1EC] border border-[#EDEAE3] min-h-[420px]">
              <SmartGarmentVisualizer
                config={currentConfig}
                sweatLevel={sweatSim}
                view={activeView}
                interactiveSpray={true}
                size="lg"
                className="mx-auto"
              />

              <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[10px] font-mono text-[#7A756C] bg-white/90 backdrop-blur-xs px-3 py-1.5 border border-[#E6E3DC]">
                <span>{activeLanguageInfo.name.toUpperCase()}</span>
                <span className="text-[#2E4A34] font-semibold">
                  {sweatSim === 0 ? 'DORMANT CHALK' : `${Math.round(sweatSim)}% PERSPIRED`}
                </span>
              </div>
            </div>

            {/* Exertion Moisture Titration Slider */}
            <div className="mt-6 space-y-3 pt-4 border-t border-[#E8E5DE]">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-[#69707D] flex items-center gap-2">
                  <Droplets size={13} className="text-[#2E4A34]" />
                  <span>TRANSPIRATION TITRATION</span>
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

            {/* Scientific Telemetry Readout Box */}
            <div className="mt-6 pt-4 border-t border-[#E8E5DE] grid grid-cols-2 gap-4 font-mono text-xs">
              <div>
                <div className="text-[#8C867B] text-[10px] uppercase">Pore Relief Height</div>
                <div className="text-[#141518] font-medium text-base mt-0.5">
                  +{reliefHeightMm.toFixed(2)} mm
                </div>
              </div>

              <div>
                <div className="text-[#8C867B] text-[10px] uppercase">Permeability Lift</div>
                <div className="text-[#141518] font-medium text-base mt-0.5">
                  +{permeabilityLiftPercent}%
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Material Synthesis Parameters (The Lab Bench) */}
        <div className="lg:col-span-7 space-y-12">
          {/* Phase 01: Silhouette Morphology */}
          <div className="space-y-4 border-b border-[#E8E5DE] pb-10">
            <div className="flex items-center justify-between font-mono text-xs">
              <span className="text-[#7A756A] uppercase tracking-widest">
                PHASE 01 // SILHOUETTE MORPHOLOGY
              </span>
              <span className="text-[#141518] uppercase font-semibold">
                {silhouette.replace('_', ' ')}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                { id: 'tech_tee', name: 'Aero Tech Tee', desc: 'Short sleeve thoracic focus' },
                { id: 'longsleeve', name: 'Osmotic Longsleeve', desc: 'Extended vascular coverage' },
                { id: 'tank', name: 'Auxetic Tank', desc: 'Minimal aerodynamic cut' },
                { id: 'crop', name: 'Cellular Crop', desc: 'High-breathability diaphragm' },
                { id: 'aero_hoodie', name: 'Aero Hoodie', desc: 'Thermal convective hood' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setSilhouette(item.id as GarmentSilhouette)}
                  className={`p-4 text-left border transition-all ${
                    silhouette === item.id
                      ? 'border-[#141518] bg-[#FAF9F6]'
                      : 'border-[#E0DBD0] hover:border-[#141518]'
                  }`}
                >
                  <div className="font-serif text-base text-[#141518]">{item.name}</div>
                  <div className="font-mono text-[10px] text-[#7A756C] mt-1">{item.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Phase 02: Mineral Pigment Chromatics */}
          <div className="space-y-4 border-b border-[#E8E5DE] pb-10">
            <div className="flex items-center justify-between font-mono text-xs">
              <span className="text-[#7A756A] uppercase tracking-widest">
                PHASE 02 // MINERAL CHROMATIC PALETTES
              </span>
              <span className="text-[#141518] uppercase font-semibold">
                {palette.name}
              </span>
            </div>

            <div className="space-y-3">
              {REACTIVE_PALETTES.map((p) => {
                const isSelected = p.id === palette.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => setPalette(p)}
                    className={`w-full p-4 border text-left transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                      isSelected
                        ? 'border-[#141518] bg-[#FAF9F6]'
                        : 'border-[#E0DBD0] hover:border-[#141518]'
                    }`}
                  >
                    <div>
                      <div className="font-serif text-lg text-[#141518]">{p.name}</div>
                      <div className="font-mono text-[10px] text-[#7A756C] mt-0.5">{p.inspiration}</div>
                    </div>

                    {/* Dual Swatch Display: Dry Resting vs Wet Saturation Bloom */}
                    <div className="flex items-center gap-3 self-start sm:self-auto font-mono text-[10px]">
                      <div className="text-right hidden sm:block">
                        <span className="text-[#8C867B] block text-[9px]">DRY → WET</span>
                      </div>
                      <div className="flex items-center border border-[#D5D0C5] p-1 gap-1.5 bg-white">
                        <div 
                          className="w-5 h-5 rounded-none border border-[#DDD8CE]"
                          style={{ backgroundColor: p.dryBase }}
                          title="Dry Base Hue"
                        />
                        <span className="text-[#A6A196]">→</span>
                        <div 
                          className="w-5 h-5 rounded-none"
                          style={{ backgroundColor: p.wetPrimary }}
                          title="Wet Primary Bloom"
                        />
                        <div 
                          className="w-5 h-5 rounded-none"
                          style={{ backgroundColor: p.wetSecondary }}
                          title="Wet Gradient Tone"
                        />
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Phase 03: Biomorphic Visual Language (8 Non-Circular Systems) */}
          <div className="space-y-4 border-b border-[#E8E5DE] pb-10">
            <div className="flex items-center justify-between font-mono text-xs">
              <span className="text-[#7A756A] uppercase tracking-widest">
                PHASE 03 // TEXTILE VISUAL LANGUAGE
              </span>
              <span className="text-[#141518] uppercase font-semibold">
                {activeLanguageInfo.name}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {VISUAL_LANGUAGES.map((lang, idx) => {
                const isSelected = lang.id === visualLanguage;
                return (
                  <button
                    key={lang.id}
                    onClick={() => setVisualLanguage(lang.id)}
                    className={`p-4 text-left border transition-all ${
                      isSelected
                        ? 'border-[#141518] bg-[#FAF9F6]'
                        : 'border-[#E0DBD0] hover:border-[#141518]'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px] font-mono text-[#8C867B] mb-1">
                      <span>FORM 0{idx + 1}</span>
                      {isSelected && <span className="text-[#2E4A34] font-semibold">ACTIVE</span>}
                    </div>
                    <div className="font-serif text-base text-[#141518]">{lang.name}</div>
                    <div className="text-xs text-[#525761] mt-1.5 line-clamp-2 font-light">
                      {lang.description}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Phase 04: Integrated Transformation Mechanics */}
          <div className="space-y-4 border-b border-[#E8E5DE] pb-10">
            <div className="flex items-center justify-between font-mono text-xs">
              <span className="text-[#7A756A] uppercase tracking-widest">
                PHASE 04 // STRUCTURAL INTEGRATION
              </span>
              <span className="text-[#141518] uppercase font-semibold">
                {transformationMode === 'color_only' ? 'Chromatic Only' : 'Chromatic + 3D Pores'}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                onClick={() => setTransformationMode('color_only')}
                className={`p-5 text-left border transition-all ${
                  transformationMode === 'color_only'
                    ? 'border-[#141518] bg-[#FAF9F6]'
                    : 'border-[#E0DBD0] hover:border-[#141518]'
                }`}
              >
                <div className="font-serif text-lg text-[#141518]">01 // Color Shift Only</div>
                <p className="text-xs text-[#69707D] font-mono mt-1">
                  Flat textile surface. Pigment capsules bloom optically into mineral gradients without physical swelling.
                </p>
              </button>

              <button
                onClick={() => setTransformationMode('color_and_texture')}
                className={`p-5 text-left border transition-all ${
                  transformationMode === 'color_and_texture'
                    ? 'border-[#141518] bg-[#FAF9F6]'
                    : 'border-[#E0DBD0] hover:border-[#141518]'
                }`}
              >
                <div className="font-serif text-lg text-[#141518]">02 // Color + 3D Micro-Pores</div>
                <p className="text-xs text-[#69707D] font-mono mt-1">
                  Unified physical morphing. Fibers dilate into 3D relief chimneys to elevate wet fabric away from skin.
                </p>
              </button>
            </div>
          </div>

          {/* Phase 05: Tactile Relief Amplitude (Enabled for 3D mode) */}
          {transformationMode === 'color_and_texture' && (
            <div className="space-y-4 border-b border-[#E8E5DE] pb-10">
              <div className="flex items-center justify-between font-mono text-xs">
                <span className="text-[#7A756A] uppercase tracking-widest">
                  PHASE 05 // TACTILE RELIEF AMPLITUDE
                </span>
                <span className="text-[#141518] uppercase font-semibold">
                  {textureIntensity}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: 'subtle', name: 'Subtle', relief: '0.5mm', desc: 'Ultra low-profile micro-ribs' },
                  { id: 'pronounced', name: 'Pronounced', relief: '1.4mm', desc: 'Balanced convection chimneys' },
                  { id: 'sculptural', name: 'Sculptural', relief: '2.4mm', desc: 'Maximum auxetic air lift' }
                ].map((tier) => (
                  <button
                    key={tier.id}
                    onClick={() => setTextureIntensity(tier.id as TextureIntensity)}
                    className={`p-4 text-left border transition-all ${
                      textureIntensity === tier.id
                        ? 'border-[#141518] bg-[#FAF9F6]'
                        : 'border-[#E0DBD0] hover:border-[#141518]'
                    }`}
                  >
                    <div className="font-serif text-base text-[#141518]">{tier.name}</div>
                    <div className="font-mono text-xs text-[#2E4A34] mt-0.5">{tier.relief}</div>
                    <div className="text-[10px] text-[#7A756C] mt-1 font-light">{tier.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Phase 06: Bio-Sensitivity Calibration */}
          <div className="space-y-4 border-b border-[#E8E5DE] pb-10">
            <div className="flex items-center justify-between font-mono text-xs">
              <span className="text-[#7A756A] uppercase tracking-widest">
                PHASE 06 // OSMOTIC TRIGGER SENSITIVITY
              </span>
              <span className="text-[#141518] font-semibold">
                {sensitivity.toFixed(2)}x Multiplier
              </span>
            </div>

            <div className="space-y-2">
              <input
                type="range"
                min="0.7"
                max="1.4"
                step="0.05"
                value={sensitivity}
                onChange={(e) => setSensitivity(Number(e.target.value))}
                className="w-full h-1 bg-[#E0DBD0] rounded-none appearance-none cursor-pointer accent-[#141518]"
              />
              <div className="flex justify-between font-mono text-[9px] text-[#8C867B]">
                <span>0.70x (High-Heat Tolerance)</span>
                <span>1.05x (Calibrated Standard)</span>
                <span>1.40x (Instant Osmosis)</span>
              </div>
            </div>
          </div>

          {/* Phase 07: Specimen Nomenclature & Research Archive */}
          <div className="space-y-6 pt-2">
            <div className="space-y-2">
              <label className="font-mono text-xs text-[#7A756A] uppercase tracking-widest block">
                PHASE 07 // SPECIMEN RESEARCH DESIGNATION
              </label>
              <input
                type="text"
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                className="w-full p-4 border border-[#141518] bg-[#FAF9F6] font-serif text-xl text-[#141518] focus:outline-none"
                placeholder="Name your living specimen..."
              />
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                onClick={handleSynthesize}
                className="px-8 py-4 bg-[#141518] text-[#FAF9F6] text-xs font-mono uppercase tracking-[0.2em] hover:bg-[#2A2E35] transition-all flex items-center gap-3"
              >
                <Archive size={14} className="text-[#A3B18A]" />
                <span>Synthesize Specimen & Archive to Folio</span>
              </button>

              <button
                onClick={() => setSweatSim(sweatSim === 0 ? 90 : 0)}
                className="px-6 py-4 border border-[#141518] text-[#141518] text-xs font-mono uppercase tracking-[0.2em] hover:bg-[#EFECE5] transition-all"
              >
                Toggle Saturation Rig
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
