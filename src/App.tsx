import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { WebSection, GarmentConfig } from './types';
import { DEFAULT_WARDROBE, PRODUCT_COLLECTION } from './data/mockData';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomeSection } from './components/HomeSection';
import { CollectionSection } from './components/CollectionSection';
import { CustomizationStudio } from './components/CustomizationStudio';
import { CommunitySection } from './components/CommunitySection';
import { TransformationArchive } from './components/TransformationArchive';
import { WardrobeDrawer } from './components/WardrobeDrawer';

export default function App() {
  const [currentSection, setCurrentSection] = useState<WebSection>('home');
  const [isWardrobeOpen, setIsWardrobeOpen] = useState<boolean>(false);
  const [selectedProductId, setSelectedProductId] = useState<string>(PRODUCT_COLLECTION[0].id);

  // Wardrobe state with local storage fallback
  const [wardrobe, setWardrobe] = useState<GarmentConfig[]>(() => {
    try {
      const stored = localStorage.getItem('aura_chromatica_wardrobe');
      return stored ? JSON.parse(stored) : DEFAULT_WARDROBE;
    } catch {
      return DEFAULT_WARDROBE;
    }
  });

  // Preloaded bespoke config for customizer
  const [bespokePreset, setBespokePreset] = useState<GarmentConfig>(DEFAULT_WARDROBE[0]);

  // Persist wardrobe
  useEffect(() => {
    try {
      localStorage.setItem('aura_chromatica_wardrobe', JSON.stringify(wardrobe));
    } catch (e) {
      console.error(e);
    }
  }, [wardrobe]);

  // Smooth scroll to top on section switch
  const navigateTo = (section: WebSection) => {
    setCurrentSection(section);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Add piece to wardrobe
  const handleAddToWardrobe = (garment: GarmentConfig) => {
    setWardrobe((prev) => {
      const exists = prev.find((g) => g.id === garment.id);
      if (exists) return prev;
      return [garment, ...prev];
    });
  };

  // Equip piece
  const handleEquip = (id: string) => {
    setWardrobe((prev) =>
      prev.map((g) => ({
        ...g,
        isEquipped: g.id === id
      }))
    );
  };

  // Remove piece
  const handleRemove = (id: string) => {
    setWardrobe((prev) => prev.filter((g) => g.id !== id));
  };

  // Jump to studio with preset
  const handleCustomizeBespoke = (garment: GarmentConfig) => {
    setBespokePreset(garment);
    navigateTo('studio');
  };

  // Jump to collection with specific product
  const handleSelectProduct = (productId: string) => {
    setSelectedProductId(productId);
    navigateTo('collection');
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#191B1F] flex flex-col selection:bg-[#E2E8E1] selection:text-[#19271E]">
      {/* Editorial Website Header */}
      <Navbar
        currentSection={currentSection}
        onSelectSection={navigateTo}
        wardrobeCount={wardrobe.length}
        onOpenWardrobe={() => setIsWardrobeOpen(true)}
      />

      {/* Main Dynamic Web Page Content */}
      <main className="flex-1">
        <AnimatePresence mode="wait">
          {currentSection === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              <HomeSection
                onNavigate={navigateTo}
                onSelectProduct={handleSelectProduct}
              />
            </motion.div>
          )}

          {currentSection === 'collection' && (
            <motion.div
              key="collection"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              <CollectionSection
                onAddToWardrobe={handleAddToWardrobe}
                onCustomizeBespoke={handleCustomizeBespoke}
                selectedProductId={selectedProductId}
              />
            </motion.div>
          )}

          {currentSection === 'studio' && (
            <motion.div
              key="studio"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              <CustomizationStudio
                initialConfig={bespokePreset}
                onSaveBespoke={(newConfig) => {
                  handleAddToWardrobe(newConfig);
                }}
              />
            </motion.div>
          )}

          {currentSection === 'community' && (
            <motion.div
              key="community"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              <CommunitySection
                onInspectGarment={(garment) => {
                  handleCustomizeBespoke(garment);
                }}
              />
            </motion.div>
          )}

          {currentSection === 'history' && (
            <motion.div
              key="history"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              <TransformationArchive
                wardrobe={wardrobe}
                onOpenStudio={handleCustomizeBespoke}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Wardrobe Drawer */}
      <WardrobeDrawer
        isOpen={isWardrobeOpen}
        onClose={() => setIsWardrobeOpen(false)}
        wardrobe={wardrobe}
        onEquip={handleEquip}
        onRemove={handleRemove}
        onCustomize={handleCustomizeBespoke}
      />

      {/* Elevated Studio Footer */}
      <Footer onSelectSection={navigateTo} />
    </div>
  );
}
