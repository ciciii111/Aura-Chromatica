export type GarmentSilhouette = 'tech_tee' | 'longsleeve' | 'tank' | 'crop' | 'aero_hoodie';

export type TransformationMode = 'color_only' | 'color_and_texture';

export type TextureIntensity = 'subtle' | 'pronounced' | 'sculptural';

export type VisualLanguageType = 
  | 'organic_gradient'
  | 'ripple'
  | 'mesh_expansion'
  | 'scale_structure'
  | 'branching_veins'
  | 'cellular_voronoi'
  | 'stripe_diffusion'
  | 'feather_fibrils';

export interface VisualLanguageInfo {
  id: VisualLanguageType;
  name: string;
  subtitle: string;
  description: string;
  inspiration: string; // e.g. "Arterial botany & mycelial nutrient flow"
  tactileFeel: string; // e.g. "Micro-channeled capillary ribs"
}

export interface ReactivePalette {
  id: string;
  name: string;
  inspiration: string;
  dryBase: string;       // Background fabric color when dry (e.g. warm ecru, chalk, pumice, soft stone)
  dryAccent: string;     // Subtle tone-on-tone seam or fiber weave
  wetPrimary: string;    // Main transformation hue (refined mineral/natural tone)
  wetSecondary: string;  // Secondary gradient hue
  wetHighlight: string;  // Delicate highlight for fiber tips or pore edges
  textColor: string;     // High contrast text
  tag: string;
}

export interface GarmentConfig {
  id: string;
  name: string;
  editionCode: string;
  silhouette: GarmentSilhouette;
  palette: ReactivePalette;
  visualLanguage: VisualLanguageType;
  transformationMode: TransformationMode;
  textureIntensity: TextureIntensity;
  baseColor: string;
  sensitivity: number; // 0.7 to 1.4
  materialComposition: string;
  isEquipped?: boolean;
}

export type TransformationStageId = 'dry' | 'light_sweat' | 'medium_sweat' | 'heavy_sweat' | 'cooldown';

export interface TransformationStageDetail {
  id: TransformationStageId;
  label: string;
  stageName: string;
  moisturePercent: number;
  tactileReliefMm: number; // physical height change (0mm to 2.8mm)
  airPermeabilityCfm: number; // breathability change
  textileExpression: string;
  colorEvolution: string;
  structuralReaction: string;
  lifestyleContext: string;
}

export interface LifestyleWearer {
  id: string;
  name: string;
  location: string;
  lifestyleScene: 'gym' | 'outdoors' | 'travel' | 'city' | 'casual';
  sceneTitle: string;
  activityDescription: string;
  quote: string;
  modelPhotoUrl: string;
  modelPhotoAlt: string;
  wearDurationHours: number;
  sweatOutput: string;
  garmentConfig: GarmentConfig;
  activeStage: TransformationStageId;
  resonanceCount: number;
  hasResonated?: boolean;
}

export interface ProductGarment {
  id: string;
  title: string;
  subtitle: string;
  price: string;
  edition: string;
  silhouette: GarmentSilhouette;
  defaultPalette: ReactivePalette;
  defaultVisualLanguage: VisualLanguageType;
  defaultMode: TransformationMode;
  defaultIntensity: TextureIntensity;
  lifestyleCategory: 'Urban Mobility' | 'High-Alpine Trail' | 'Studio Movement' | 'Restorative Travel';
  modelImageUrl: string;
  description: string;
  fabricSpecs: {
    composition: string;
    weight: string;
    origin: string;
    biopolymerTech: string;
  };
}

export type WebSection = 'home' | 'collection' | 'studio' | 'community' | 'history';
