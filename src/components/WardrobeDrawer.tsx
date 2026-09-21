import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GarmentConfig } from '../types';
import { SmartGarmentVisualizer } from './SmartGarmentVisualizer';
import { X, Trash2, Check, Sparkles, Archive } from 'lucide-react';

interface WardrobeDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wardrobe: GarmentConfig[];
  onEquip: (id: string) => void;
  onRemove: (id: string) => void;
  onCustomize: (garment: GarmentConfig) => void;
}

export const WardrobeDrawer: React.FC<WardrobeDrawerProps> = ({
  isOpen,
  onClose,
  wardrobe,
  onEquip,
  onRemove,
  onCustomize
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/40 backdrop-blur-xs"
          />

          {/* Drawer Panel */}
          <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className="w-screen max-w-md bg-[#FAF9F6] border-l border-[#141518] p-6 sm:p-8 flex flex-col justify-between shadow-2xl"
            >
              {/* Top Header */}
              <div className="flex items-center justify-between border-b border-[#E8E5DE] pb-4">
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#7A756A] block">
                    INVESTIGATOR REPOSITORY
                  </span>
                  <h3 className="font-serif text-2xl font-light text-[#141518]">
                    Personal Specimen Folio
                  </h3>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 text-[#141518] hover:bg-[#EFECE5] transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto py-6 space-y-4">
                {wardrobe.length === 0 ? (
                  <div className="text-center py-16 space-y-3">
                    <p className="font-serif text-lg text-[#525761]">Your specimen folio is empty.</p>
                    <p className="text-xs text-[#7A756C] max-w-xs mx-auto font-mono">
                      Archive living silhouettes from the Collection or synthesize bespoke pieces in the Material Lab.
                    </p>
                  </div>
                ) : (
                  wardrobe.map((garment) => (
                    <div
                      key={garment.id}
                      className={`p-4 border transition-all flex items-center gap-4 bg-white ${
                        garment.isEquipped ? 'border-[#141518] shadow-xs' : 'border-[#E0DBD0]'
                      }`}
                    >
                      {/* Mini visualizer preview */}
                      <div className="w-18 h-22 bg-[#FAF9F6] border border-[#EDEAE3] flex items-center justify-center overflow-hidden shrink-0">
                        <SmartGarmentVisualizer
                          config={garment}
                          sweatLevel={50}
                          size="sm"
                          showAnatomyLines={false}
                          className="scale-65 -my-6"
                        />
                      </div>

                      {/* Details */}
                      <div className="flex-1 min-w-0 space-y-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-serif text-base text-[#141518] truncate">
                            {garment.name}
                          </h4>
                          {garment.isEquipped && (
                            <span className="text-[9px] font-mono uppercase tracking-wider bg-[#141518] text-[#FAF9F6] px-2 py-0.5">
                              Active
                            </span>
                          )}
                        </div>

                        <p className="text-[10px] font-mono text-[#7A756C] truncate uppercase">
                          {garment.visualLanguage.replace('_', ' ')} • {garment.transformationMode.replace('_', ' ')}
                        </p>

                        <div className="flex items-center gap-3 pt-1 text-xs font-mono">
                          {!garment.isEquipped && (
                            <button
                              onClick={() => onEquip(garment.id)}
                              className="text-[#141518] hover:underline flex items-center gap-1"
                            >
                              <Check size={11} />
                              <span>Equip</span>
                            </button>
                          )}
                          <button
                            onClick={() => {
                              onCustomize(garment);
                              onClose();
                            }}
                            className="text-[#2E4A34] hover:underline flex items-center gap-1"
                          >
                            <Sparkles size={11} />
                            <span>Recalibrate</span>
                          </button>
                          <button
                            onClick={() => onRemove(garment.id)}
                            className="text-[#A44A3F] hover:underline flex items-center gap-1 ml-auto"
                            title="Remove"
                          >
                            <Trash2 size={11} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Bottom Actions */}
              <div className="border-t border-[#E8E5DE] pt-4 space-y-2">
                <div className="flex justify-between text-xs font-mono text-[#69707D]">
                  <span className="uppercase tracking-wider">Archived Specimens</span>
                  <span className="font-bold text-[#141518]">{wardrobe.length}</span>
                </div>
                <p className="text-[10px] text-[#8C867B] font-mono leading-relaxed">
                  Specimens dynamically adapt to ambient temperature, perspiration volume, and physical exertion cycles.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
