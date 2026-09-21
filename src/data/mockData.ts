import { 
  ReactivePalette, 
  VisualLanguageInfo, 
  TransformationStageDetail, 
  LifestyleWearer, 
  ProductGarment, 
  GarmentConfig 
} from '../types';

export const REACTIVE_PALETTES: ReactivePalette[] = [
  {
    id: 'mineral_sage',
    name: 'Celadon // Mineral Sage',
    inspiration: 'Sub-glacial river silt and oxidized copper ore in mountain springs',
    dryBase: '#F6F8F5',       // Soft chalk sage white
    dryAccent: '#E2E8E0',     // Gentle stone tint
    wetPrimary: '#3A5A40',    // Deep forest celadon
    wetSecondary: '#588157',  // Fresh botanical green
    wetHighlight: '#A3B18A',  // Luminous morning leaf
    textColor: '#1B2E20',
    tag: 'Botanical Respiration'
  },
  {
    id: 'terracotta_sand',
    name: 'Raw Dune // Terracotta',
    inspiration: 'Sun-baked Mediterranean sedimentary clay and desert sandstone',
    dryBase: '#FAF7F2',       // Warm alabaster dune
    dryAccent: '#EFE7DA',     // Pale clay weave
    wetPrimary: '#A44A3F',    // Rich terracotta crimson
    wetSecondary: '#C96A52',  // Sunlit warm ochre
    wetHighlight: '#E8A598',  // Soft ceramic petal
    textColor: '#381611',
    tag: 'Solar Thermoregulation'
  },
  {
    id: 'ocean_indigo',
    name: 'Pumice // Deep Abyss',
    inspiration: 'Basalt volcanic sand emerging from oceanic marine foam',
    dryBase: '#F5F7FA',       // Crisp coastal pumice
    dryAccent: '#E1E6EC',     // Mineral ocean mist
    wetPrimary: '#1D3557',    // Deep marine indigo
    wetSecondary: '#457B9D',  // Tidal blue azure
    wetHighlight: '#A8DADC',  // Sea spray luminescence
    textColor: '#0B1B30',
    tag: 'Aquatic Osmosis'
  },
  {
    id: 'smoked_obsidian',
    name: 'Flint // Smoked Obsidian',
    inspiration: 'Polished volcanic glass and carbon graphite structures',
    dryBase: '#EFEFEF',       // Pale concrete quartz
    dryAccent: '#DDDCDA',     // Slate graphite line
    wetPrimary: '#22252A',    // Deep smoked obsidian
    wetSecondary: '#4B535E',  // Brushed titanium
    wetHighlight: '#8A95A5',  // Ambient metallic luster
    textColor: '#111317',
    tag: 'Kinetic Monochrome'
  },
  {
    id: 'dusk_amethyst',
    name: 'Limestone // Dusk Mauve',
    inspiration: 'High-altitude alpine twilight cast on dolomite limestone',
    dryBase: '#F9F6F8',       // Chalk rose white
    dryAccent: '#EBE2E7',     // Soft mauve overcast
    wetPrimary: '#4A304D',    // Deep twilight violet
    wetSecondary: '#7A5980',  // Velvety thistle
    wetHighlight: '#C0A7C5',  // Ethereal dawn halo
    textColor: '#28172A',
    tag: 'Spectral Twilight'
  }
];

export const VISUAL_LANGUAGES: VisualLanguageInfo[] = [
  {
    id: 'branching_veins',
    name: 'Branching Capillaries',
    subtitle: 'Dendritic vascular channels',
    description: 'Bionic vascular tributaries that channel perspiration away from high-heat thoracic hubs toward evaporative perimeter zones.',
    inspiration: 'Leaf venation networks and human micro-circulatory capillary beds',
    tactileFeel: 'Subtle raised micro-gutters that direct fluid movement across muscle contours'
  },
  {
    id: 'ripple',
    name: 'Harmonic Ripples',
    subtitle: 'Concentric kinetic wave propagation',
    description: 'Concentric acoustic-style rings that ripple outward from cardiac and spine nodes as heart rate and thermal output escalate.',
    inspiration: 'Wave interference on water droplets and kinetic vibration ripples',
    tactileFeel: 'Concentric ribbing that creates micro-cushioning and enhanced airflow channels'
  },
  {
    id: 'mesh_expansion',
    name: 'Auxetic Geometric Mesh',
    subtitle: 'Mechanical dilation lattices',
    description: 'Engineered hexagonal and diamond lattices that expand laterally when damp, physically opening structural vents for maximum ventilation.',
    inspiration: 'Auxetic cellular materials and honeycomb breathing architecture',
    tactileFeel: 'Tactile hexagonal relief that opens porous apertures up to 1.8mm upon saturation'
  },
  {
    id: 'scale_structure',
    name: 'Biomimetic Scales',
    subtitle: 'Overlapping shingle aerators',
    description: 'Overlapping hydro-sensitive platelets that tilt upward like pinecones or pangolin scales to create shaded convection chimneys over the skin.',
    inspiration: 'Pinecone cone bracts and aquatic fish scale fluid dynamics',
    tactileFeel: 'Layered imbricated shingle texture that lifts 2.2mm off the base fabric'
  },
  {
    id: 'cellular_voronoi',
    name: 'Cellular Voronoi',
    subtitle: 'Organic bio-membrane tessellations',
    description: 'Non-uniform organic cellular clusters that dilate at varying rates based on localized skin temperature and sweat concentration.',
    inspiration: 'Plant cell walls, dragonfly wing membranes, and microscopic tissue cross-sections',
    tactileFeel: 'Soft polygonal cushions separated by recessed drainage valleys'
  },
  {
    id: 'organic_gradient',
    name: 'Anatomical Gradients',
    subtitle: 'Fluid continuous osmosis',
    description: 'A seamless, smokeless fluid transition without hard lines, blooming smoothly from deep core exertion to sheer outer hems.',
    inspiration: 'Atmospheric pressure transitions and water-color pigment absorption on raw washi paper',
    tactileFeel: 'Smooth velvety brushed face with variable hydro-capillary yarn tension'
  },
  {
    id: 'stripe_diffusion',
    name: 'Kinetic Striations',
    subtitle: 'Directional moisture channels',
    description: 'Longitudinal compression lines that accelerate directional wicking along active muscle groups like lats, deltoids, and spinal erectors.',
    inspiration: 'Skeletal muscle fiber fascicles and high-speed wind-tunnel streamlines',
    tactileFeel: 'Alternating raised matte ridges and recessed high-wicking valleys'
  },
  {
    id: 'feather_fibrils',
    name: 'Feather Fibrils',
    subtitle: 'Micro-cilia air entrainment',
    description: 'Delicate filamentous micro-structures that stand upright upon moisture contact, creating an insulating air cushion that prevents garment cling.',
    inspiration: 'Aquatic bird down feathers and micro-cilia bio-mechanics',
    tactileFeel: 'Ultra-plush velvety tufting that actively prevents sweaty fabric from sticking to warm skin'
  }
];

export const TRANSFORMATION_STAGES_HISTORY: TransformationStageDetail[] = [
  {
    id: 'dry',
    label: 'Stage 01 // Dry Resting',
    stageName: 'Resting Baseline',
    moisturePercent: 0,
    tactileReliefMm: 0.1,
    airPermeabilityCfm: 180,
    textileExpression: 'Smooth matte chalk-white surface with dormant micro-capsules. The weave lies completely flat and relaxed against the body.',
    colorEvolution: 'Zero pigment activation. Pure neutral base fabric hue with microscopic tonal texture.',
    structuralReaction: 'Pores closed. Natural drape with silky skin-feel, behaving like premium featherweight performance silk.',
    lifestyleContext: 'Morning warmup, putting on garment at home, casual walk to the training facility or coffee shop.'
  },
  {
    id: 'light_sweat',
    label: 'Stage 02 // Light Sweat',
    stageName: 'Incipient Perspiration',
    moisturePercent: 20,
    tactileReliefMm: 0.6,
    airPermeabilityCfm: 210,
    textileExpression: 'Early capillary absorption along the thoracic line and spine. Fibers begin subtle dimensional swelling.',
    colorEvolution: 'Delicate mineral tint emerges along sternum and spine channels, softly fading into dry borders.',
    structuralReaction: 'Micro-pores dilate slightly (+15%), allowing initial evaporative draft without cling.',
    lifestyleContext: 'First 10 minutes of running, moderate incline hike, brisk urban commute brisk walk.'
  },
  {
    id: 'medium_sweat',
    label: 'Stage 03 // Medium Sweat',
    stageName: 'Active Equilibrium',
    moisturePercent: 55,
    tactileReliefMm: 1.4,
    airPermeabilityCfm: 260,
    textileExpression: 'Full tactile relief deployment. Pattern geometry rises physically to create micro-chimneys over sweaty regions.',
    colorEvolution: 'Rich, vivid chromatic blooming across active heat zones (chest, underarms, upper back) with high optical definition.',
    structuralReaction: 'Structural channels elevate off the skin, actively lifting wet fiber away from body to eliminate friction.',
    lifestyleContext: 'Mid-workout tempo run, high-cadence cycling climb, intense indoor strength or pilates set.'
  },
  {
    id: 'heavy_sweat',
    label: 'Stage 04 // Heavy Sweat',
    stageName: 'Peak Saturation Bloom',
    moisturePercent: 92,
    tactileReliefMm: 2.4,
    airPermeabilityCfm: 320,
    textileExpression: 'Maximum dynamic architecture. Deepest dimensional relief, with auxetic vents fully open for maximum evaporative cooling.',
    colorEvolution: 'Intense, vibrant mineral gradient across 90%+ of torso. Deep jewel-toned center fading out to luminous highlight edges.',
    structuralReaction: 'Maximized 3D convective channels. 78% moisture pushed to outer atmospheric face to accelerate convective drying.',
    lifestyleContext: 'Final sprint intervals, hot summer trail summit, grueling threshold ergometer or marathon miles.'
  },
  {
    id: 'cooldown',
    label: 'Stage 05 // Cooldown & Recovery',
    stageName: 'Evaporative Recovery',
    moisturePercent: 35,
    tactileReliefMm: 0.9,
    airPermeabilityCfm: 225,
    textileExpression: 'Evaporative moisture diffusion with crystalline halo borders forming along capillary paths as core body temp normalizes.',
    colorEvolution: 'Pigment softens into an ethereal, muted watercolor wash with delicate frost-like highlight boundaries.',
    structuralReaction: 'Slowly returns toward baseline flat drape while maintaining anti-chill loft so the wearer doesn\'t get cold.',
    lifestyleContext: 'Post-workout stretch, walking into a cafe, cooling down on a subway car or terrace.'
  }
];

export const LIFESTYLE_WEARERS: LifestyleWearer[] = [
  {
    id: 'wearer-01',
    name: 'Maya Lin-Rhodes',
    location: 'Brooklyn Navy Yard & Fort Greene, NY',
    lifestyleScene: 'gym',
    sceneTitle: 'Morning Track Intervals & Strength Studio',
    activityDescription: '45-minute threshold running intervals followed by barbell mechanics in a sunlit industrial gym.',
    quote: '“It completely changes your relationship with exertion. Instead of feeling self-conscious about sweat marks, the shirt turns your effort into this beautiful living topographic sculpture.”',
    modelPhotoUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1000&q=80',
    modelPhotoAlt: 'Athletic woman resting gracefully after track workout in bright architectural gym space',
    wearDurationHours: 1.5,
    sweatOutput: '380 ml',
    garmentConfig: {
      id: 'g-maya-01',
      name: 'Aura Kinetic Aero Tee',
      editionCode: 'ED-01-SAGE',
      silhouette: 'tech_tee',
      palette: REACTIVE_PALETTES[0], // Celadon // Mineral Sage
      visualLanguage: 'ripple',
      transformationMode: 'color_and_texture',
      textureIntensity: 'pronounced',
      baseColor: REACTIVE_PALETTES[0].dryBase,
      sensitivity: 1.1,
      materialComposition: '76% Chitin Bio-Polymer, 24% Recycled Elastane'
    },
    activeStage: 'heavy_sweat',
    resonanceCount: 142
  },
  {
    id: 'wearer-02',
    name: 'Julian Vance & Kaito S.',
    location: 'Tre Cime di Lavaredo, Italian Dolomites',
    lifestyleScene: 'outdoors',
    sceneTitle: 'High-Alpine Trail Running & Ridge Scrambling',
    activityDescription: '18km technical alpine ascent in 14°C mountain air with rapid shifts from intense sun to shaded ridge winds.',
    quote: '“At 2,400 meters, when you push hard uphill you sweat profusely, but on the exposed windy ridge you can freeze. The way this fabric lifts off the skin when soaked prevented any post-climb chill.”',
    modelPhotoUrl: 'https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?auto=format&fit=crop&w=1000&q=80',
    modelPhotoAlt: 'Trail runner traversing a breathtaking mountain trail bathed in soft natural morning sunlight',
    wearDurationHours: 3.5,
    sweatOutput: '620 ml',
    garmentConfig: {
      id: 'g-julian-02',
      name: 'Alpine Osmotic Longsleeve',
      editionCode: 'ED-04-TERRA',
      silhouette: 'longsleeve',
      palette: REACTIVE_PALETTES[1], // Terracotta Sand
      visualLanguage: 'branching_veins',
      transformationMode: 'color_and_texture',
      textureIntensity: 'sculptural',
      baseColor: REACTIVE_PALETTES[1].dryBase,
      sensitivity: 1.0,
      materialComposition: '68% Bio-Nylon 5.6, 22% Chitin Fiber, 10% Lycra'
    },
    activeStage: 'heavy_sweat',
    resonanceCount: 289
  },
  {
    id: 'wearer-03',
    name: 'Amara Chen',
    location: 'Shibuya to Daikanyama, Tokyo',
    lifestyleScene: 'city',
    sceneTitle: 'Daily Cycling Commute & Studio Architecture',
    activityDescription: '8.5km humid urban bicycle commute across hill climbs, stepping directly into client presentations.',
    quote: '“I ride my bike hard through Tokyo traffic, then immediately walk into meetings. The fabric’s transition into deep mineral indigo looks like intentional avant-garde Japanese tailoring rather than a sweaty shirt.”',
    modelPhotoUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1000&q=80',
    modelPhotoAlt: 'Urban professional and cyclist standing calmly in clean architectural city setting',
    wearDurationHours: 4.0,
    sweatOutput: '290 ml',
    garmentConfig: {
      id: 'g-amara-03',
      name: 'Metropolitan Auxetic Tank',
      editionCode: 'ED-02-OCEAN',
      silhouette: 'tank',
      palette: REACTIVE_PALETTES[2], // Pumice // Deep Abyss
      visualLanguage: 'mesh_expansion',
      transformationMode: 'color_and_texture',
      textureIntensity: 'pronounced',
      baseColor: REACTIVE_PALETTES[2].dryBase,
      sensitivity: 0.95,
      materialComposition: '80% Regenerated Sea-Silk, 20% Bio-Elastane'
    },
    activeStage: 'medium_sweat',
    resonanceCount: 198
  },
  {
    id: 'wearer-04',
    name: 'Soren & Lea Lindqvist',
    location: 'Zürich Airport & S-Bahn Transit, Switzerland',
    lifestyleScene: 'travel',
    sceneTitle: 'Intercontinental Travel & S-Bahn Dash',
    activityDescription: 'Fast transit between terminals with luggage, flight cabin pressure, and outdoor train platforms.',
    quote: '“Travel is the ultimate test of smart clothing. You sprint to catch a boarding gate, carry heavy duffels, and sit in stuffy cabins. The fabric breathes with your body’s autonomic rhythm.”',
    modelPhotoUrl: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1000&q=80',
    modelPhotoAlt: 'Modern traveler pausing at an airy modern transit terminal with travel pack',
    wearDurationHours: 6.2,
    sweatOutput: '410 ml',
    garmentConfig: {
      id: 'g-soren-04',
      name: 'Voyage Cellular Crop Tee',
      editionCode: 'ED-05-DUSK',
      silhouette: 'crop',
      palette: REACTIVE_PALETTES[4], // Dusk Amethyst
      visualLanguage: 'cellular_voronoi',
      transformationMode: 'color_only',
      textureIntensity: 'subtle',
      baseColor: REACTIVE_PALETTES[4].dryBase,
      sensitivity: 1.0,
      materialComposition: '82% Eucalyptus Micro-Modal, 18% Responsive Matrix'
    },
    activeStage: 'light_sweat',
    resonanceCount: 115
  },
  {
    id: 'wearer-05',
    name: 'Gabriel Morales',
    location: 'Born District Cafe, Barcelona',
    lifestyleScene: 'casual',
    sceneTitle: 'Post-Run Espresso & Ceramics Atelier',
    activityDescription: 'Morning beachfront 6k tempo run seamlessly transitioning into an espresso on a cobblestone terrace and ceramic sculpting.',
    quote: '“I love that it doesn’t scream ‘neon athletic gear’. It feels like an exquisite piece of Scandinavian or Japanese linen that happens to be biologically responsive.”',
    modelPhotoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1000&q=80',
    modelPhotoAlt: 'Gentleman sitting casually at a sidewalk cafe in warm Mediterranean morning sunlight',
    wearDurationHours: 2.0,
    sweatOutput: '250 ml',
    garmentConfig: {
      id: 'g-gabriel-05',
      name: 'Resonance Aero Hoodie',
      editionCode: 'ED-03-FLINT',
      silhouette: 'aero_hoodie',
      palette: REACTIVE_PALETTES[3], // Flint // Smoked Obsidian
      visualLanguage: 'stripe_diffusion',
      transformationMode: 'color_and_texture',
      textureIntensity: 'subtle',
      baseColor: REACTIVE_PALETTES[3].dryBase,
      sensitivity: 1.05,
      materialComposition: '74% Chitin-Merino Hybrid, 26% Bio-Polymer'
    },
    activeStage: 'cooldown',
    resonanceCount: 167
  }
];

export const PRODUCT_COLLECTION: ProductGarment[] = [
  {
    id: 'prod-01',
    title: 'Aura Kinetic Aero Tee',
    subtitle: 'Micro-channeled bio-respiration short sleeve',
    price: '$185',
    edition: 'Edition 01 // Spring Respiration',
    silhouette: 'tech_tee',
    defaultPalette: REACTIVE_PALETTES[0],
    defaultVisualLanguage: 'ripple',
    defaultMode: 'color_and_texture',
    defaultIntensity: 'pronounced',
    lifestyleCategory: 'Studio Movement',
    modelImageUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1000&q=80',
    description: 'Constructed from bio-fermented chitin micro-filaments that react to body humidity and perspiration. As core thermal output rises, concentric micro-ribs expand into 3D airflow chimneys while pigments bloom into deep forest mineral celadon.',
    fabricSpecs: {
      composition: '76% Recycled Chitin Bio-Polymer, 24% Spandex',
      weight: '118 g/m² (ultra-featherweight)',
      origin: 'Knitted in Biella, Italy & Assembled in Zürich',
      biopolymerTech: 'Moisture-Dilating Osmotic Channels (Patent Pend.)'
    }
  },
  {
    id: 'prod-02',
    title: 'Alpine Osmotic Longsleeve',
    subtitle: 'Vascular dendritic thermoregulating base layer',
    price: '$230',
    edition: 'Edition 02 // Altitude Biome',
    silhouette: 'longsleeve',
    defaultPalette: REACTIVE_PALETTES[1],
    defaultVisualLanguage: 'branching_veins',
    defaultMode: 'color_and_texture',
    defaultIntensity: 'sculptural',
    lifestyleCategory: 'High-Alpine Trail',
    modelImageUrl: 'https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?auto=format&fit=crop&w=1000&q=80',
    description: 'Designed for drastic thermal swings in high mountain environments. Vascular capillary pathways pull perspiration away from cold-sensitive kidneys and lumbar spine, diffusing heat across broader surface areas in a terracotta gradient.',
    fabricSpecs: {
      composition: '68% Bio-Nylon 5.6, 22% Chitin Fiber, 10% Lycra',
      weight: '145 g/m² (mid-density thermal mesh)',
      origin: 'Kobe, Japan & Basel Studio',
      biopolymerTech: 'Dendritic Capillary Wicking Matrix'
    }
  },
  {
    id: 'prod-03',
    title: 'Metropolitan Auxetic Tank',
    subtitle: 'Dilating geometric lattice race tank',
    price: '$150',
    edition: 'Edition 03 // Urban Transit',
    silhouette: 'tank',
    defaultPalette: REACTIVE_PALETTES[2],
    defaultVisualLanguage: 'mesh_expansion',
    defaultMode: 'color_and_texture',
    defaultIntensity: 'pronounced',
    lifestyleCategory: 'Urban Mobility',
    modelImageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1000&q=80',
    description: 'Engineered for dense urban humidity and high-intensity speed work. When dry, it hangs like liquid chalk-white crepe. With exertion, auxetic geometric apertures dilate to double air intake while revealing oceanic abyss indigo depth.',
    fabricSpecs: {
      composition: '80% Regenerated Sea-Silk, 20% Bio-Elastane',
      weight: '98 g/m² (barely-there skin layer)',
      origin: 'Como, Italy',
      biopolymerTech: 'Auxetic Pore Dilation Geometry'
    }
  },
  {
    id: 'prod-04',
    title: 'Voyage Cellular Crop',
    subtitle: 'Organic voronoi air-cushioned crop',
    price: '$165',
    edition: 'Edition 04 // Restorative Travel',
    silhouette: 'crop',
    defaultPalette: REACTIVE_PALETTES[4],
    defaultVisualLanguage: 'cellular_voronoi',
    defaultMode: 'color_only',
    defaultIntensity: 'subtle',
    lifestyleCategory: 'Restorative Travel',
    modelImageUrl: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1000&q=80',
    description: 'Tessellated cellular chambers adapt organically to thoracic expansion and variable cabin or cafe climates. Soft dusk mauve blooms smoothly without sharp boundaries, maintaining exceptional drape and silky non-cling comfort.',
    fabricSpecs: {
      composition: '82% Eucalyptus Micro-Modal, 18% Responsive Matrix',
      weight: '125 g/m²',
      origin: 'Porto, Portugal',
      biopolymerTech: 'Cellular Osmotic Pressure Membrane'
    }
  }
];

export const DEFAULT_WARDROBE: GarmentConfig[] = [
  {
    id: 'garment-primary-01',
    name: 'Aura Kinetic Aero Tee',
    editionCode: 'ED-01-SAGE',
    silhouette: 'tech_tee',
    palette: REACTIVE_PALETTES[0],
    visualLanguage: 'ripple',
    transformationMode: 'color_and_texture',
    textureIntensity: 'pronounced',
    baseColor: REACTIVE_PALETTES[0].dryBase,
    sensitivity: 1.05,
    materialComposition: '76% Recycled Chitin Bio-Polymer, 24% Spandex',
    isEquipped: true
  },
  {
    id: 'garment-primary-02',
    name: 'Alpine Osmotic Longsleeve',
    editionCode: 'ED-02-TERRA',
    silhouette: 'longsleeve',
    palette: REACTIVE_PALETTES[1],
    visualLanguage: 'branching_veins',
    transformationMode: 'color_and_texture',
    textureIntensity: 'sculptural',
    baseColor: REACTIVE_PALETTES[1].dryBase,
    sensitivity: 1.0,
    materialComposition: '68% Bio-Nylon 5.6, 22% Chitin Fiber, 10% Lycra',
    isEquipped: false
  },
  {
    id: 'garment-primary-03',
    name: 'Metropolitan Auxetic Tank',
    editionCode: 'ED-03-OCEAN',
    silhouette: 'tank',
    palette: REACTIVE_PALETTES[2],
    visualLanguage: 'mesh_expansion',
    transformationMode: 'color_and_texture',
    textureIntensity: 'pronounced',
    baseColor: REACTIVE_PALETTES[2].dryBase,
    sensitivity: 1.1,
    materialComposition: '80% Regenerated Sea-Silk, 20% Bio-Elastane',
    isEquipped: false
  }
];
