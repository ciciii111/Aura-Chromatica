import React, { useState, useId, useMemo } from 'react';
import { motion } from 'motion/react';
import { GarmentConfig, TransformationStageId, VisualLanguageType } from '../types';

interface SmartGarmentVisualizerProps {
  config: GarmentConfig;
  sweatLevel?: number; // 0 to 100
  stageMode?: TransformationStageId;
  view?: 'front' | 'back';
  interactiveSpray?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'full';
  showAnatomyLines?: boolean;
  className?: string;
  onTapLocation?: (x: number, y: number) => void;
}

interface LocalSprayDrop {
  id: number;
  x: number;
  y: number;
  radius: number;
}

export const SmartGarmentVisualizer: React.FC<SmartGarmentVisualizerProps> = ({
  config,
  sweatLevel,
  stageMode,
  view = 'front',
  interactiveSpray = false,
  size = 'md',
  showAnatomyLines = true,
  className = '',
  onTapLocation
}) => {
  const uniqueId = useId().replace(/:/g, '');
  const [localDrops, setLocalDrops] = useState<LocalSprayDrop[]>([]);

  // Compute resolved sweat percentage
  const resolvedSweat = useMemo(() => {
    if (stageMode === 'dry') return 0;
    if (stageMode === 'light_sweat') return 22;
    if (stageMode === 'medium_sweat') return 55;
    if (stageMode === 'heavy_sweat') return 92;
    if (stageMode === 'cooldown') return 35;
    return sweatLevel !== undefined ? sweatLevel : 0;
  }, [stageMode, sweatLevel]);

  // Scaled sweat with sensitivity factor
  const effectiveSweat = Math.min(100, Math.max(0, resolvedSweat * (config.sensitivity || 1.0)));
  const sweatRatio = effectiveSweat / 100;
  const isCooldown = stageMode === 'cooldown';

  // Handle tactile spray/tap
  const handleSvgClick = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!interactiveSpray) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 300;
    const y = ((e.clientY - rect.top) / rect.height) * 400;

    const newDrop: LocalSprayDrop = {
      id: Date.now(),
      x,
      y,
      radius: Math.random() * 18 + 22
    };
    setLocalDrops((prev) => [...prev.slice(-5), newDrop]);
    if (onTapLocation) onTapLocation(x, y);
  };

  const { palette, silhouette, visualLanguage, transformationMode, textureIntensity } = config;

  // Integrated system modifiers
  const hasTexture = transformationMode === 'color_and_texture';
  const intensityMultiplier = useMemo(() => {
    if (!hasTexture) return 0.15; // minimal micro-texture
    if (textureIntensity === 'subtle') return 0.45;
    if (textureIntensity === 'pronounced') return 1.0;
    if (textureIntensity === 'sculptural') return 1.7;
    return 1.0;
  }, [hasTexture, textureIntensity]);

  // Viewport sizes
  const sizeClasses = {
    sm: 'w-48 h-60',
    md: 'w-64 h-80',
    lg: 'w-80 h-96',
    full: 'w-full h-full max-h-[480px]'
  }[size];

  // Silhouette Paths for diverse activewear cuts
  const silhouettePaths = useMemo(() => {
    if (silhouette === 'tank') {
      return {
        body: 'M95,65 Q115,82 150,82 Q185,82 205,65 L225,98 Q205,130 215,160 L212,330 Q150,342 88,330 L85,160 Q95,130 75,98 Z',
        armholes: 'M75,98 Q102,130 85,160 M225,98 Q198,130 215,160',
        neckline: 'M95,65 Q150,85 205,65',
        seams: [
          'M150,85 L150,335',
          'M115,140 Q150,175 185,140',
          'M95,205 Q150,230 205,205',
          'M92,275 Q150,295 208,275'
        ]
      };
    }
    if (silhouette === 'crop') {
      return {
        body: 'M85,55 Q115,75 150,75 Q185,75 215,55 L245,100 L215,135 L205,230 Q150,238 95,230 L85,135 L55,100 Z',
        armholes: 'M85,135 L55,100 M215,135 L245,100',
        neckline: 'M85,55 Q150,78 215,55',
        seams: [
          'M150,78 L150,234',
          'M105,130 Q150,160 195,130',
          'M95,190 Q150,210 205,190'
        ]
      };
    }
    if (silhouette === 'longsleeve') {
      return {
        body: 'M95,55 Q118,72 150,72 Q182,72 205,55 L260,95 L275,270 L250,278 L220,150 L215,340 Q150,350 85,340 L80,150 L50,278 L25,270 L40,95 Z',
        armholes: 'M80,150 L40,95 M220,150 L260,95',
        neckline: 'M95,55 Q150,75 205,55',
        seams: [
          'M150,75 L150,345',
          'M80,150 L215,150',
          'M82,230 Q150,250 218,230',
          'M40,95 L50,278',
          'M260,95 L250,278'
        ]
      };
    }
    if (silhouette === 'aero_hoodie') {
      return {
        body: 'M90,50 Q118,66 150,66 Q182,66 210,50 L265,95 L280,285 L252,295 L222,160 L218,348 Q150,360 82,348 L78,160 L48,295 L20,285 L35,95 Z',
        armholes: 'M78,160 L35,95 M222,160 L265,95',
        neckline: 'M90,50 Q150,75 210,50',
        seams: [
          'M150,66 L150,354',
          'M110,240 Q150,265 190,240 L190,320 Q150,335 110,320 Z', // Kangaroo pocket
          'M78,160 L222,160'
        ]
      };
    }
    // Default Tech Tee
    return {
      body: 'M85,55 Q115,74 150,74 Q185,74 215,55 L260,105 L230,140 L216,145 L214,338 Q150,350 86,338 L84,145 L70,140 L40,105 Z',
      armholes: 'M70,140 L40,105 M230,140 L260,105',
      neckline: 'M85,55 Q150,78 215,55',
      seams: [
        'M150,78 L150,344',
        'M84,145 Q150,175 216,145',
        'M85,225 Q150,248 215,225',
        'M86,290 Q150,310 214,290'
      ]
    };
  }, [silhouette]);

  // Base and wet color calculations
  const dryBaseColor = palette.dryBase || '#FAF9F6';
  const dryAccentColor = palette.dryAccent || '#E6E3DC';
  const wetPrimaryColor = palette.wetPrimary;
  const wetSecondaryColor = palette.wetSecondary;
  const wetHighlightColor = palette.wetHighlight;

  return (
    <div className={`relative flex items-center justify-center select-none ${className}`}>
      <svg
        viewBox="0 0 300 400"
        className={`${sizeClasses} overflow-visible transition-all duration-300 drop-shadow-sm`}
        onClick={handleSvgClick}
        style={{ cursor: interactiveSpray ? 'crosshair' : 'default' }}
      >
        <defs>
          {/* Garment silhouette clip path */}
          <clipPath id={`garment-clip-${uniqueId}`}>
            <path d={silhouettePaths.body} />
          </clipPath>

          {/* Smooth Fabric Base Gradient */}
          <linearGradient id={`fabric-base-${uniqueId}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={dryBaseColor} />
            <stop offset="50%" stopColor={dryBaseColor} />
            <stop offset="100%" stopColor={dryAccentColor} />
          </linearGradient>

          {/* Soft Organic Dispersion Filter */}
          <filter id={`soft-diffusion-${uniqueId}`} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation={1.5} result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          {/* 3D Texture Emboss Filter for tactile relief */}
          <filter id={`relief-filter-${uniqueId}`} x="-10%" y="-10%" width="120%" height="120%">
            <feGaussianBlur in="SourceAlpha" stdDeviation={0.8 * intensityMultiplier} result="blur" />
            <feSpecularLighting in="blur" surfaceScale={2 * intensityMultiplier} specularConstant={1.2} specularExponent={16} lightingColor="#ffffff" result="specOut">
              <fePointLight x={view === 'front' ? 120 : 180} y="80" z="180" />
            </feSpecularLighting>
            <feComposite in="SourceGraphic" in2="specOut" operator="arithmetic" k1="0" k2="1" k3="0.8" k4="0" />
          </filter>

          {/* Central Thoracic / Spinal Moisture Driver Gradient */}
          <radialGradient id={`core-flow-${uniqueId}`} cx="50%" cy={view === 'front' ? '38%' : '42%'} r="60%">
            <stop offset="0%" stopColor={wetPrimaryColor} stopOpacity={0.96 * sweatRatio} />
            <stop offset="35%" stopColor={wetSecondaryColor} stopOpacity={0.85 * sweatRatio} />
            <stop offset="70%" stopColor={wetHighlightColor} stopOpacity={0.5 * sweatRatio} />
            <stop offset="100%" stopColor={dryBaseColor} stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* 1. Subtle Outer Ambient Shadow */}
        <path
          d={silhouettePaths.body}
          fill="none"
          stroke="#000000"
          strokeWidth="6"
          className="opacity-5 blur-xs"
        />

        {/* 2. Main Garment Canvas (Clipped) */}
        <g clipPath={`url(#garment-clip-${uniqueId})`}>
          {/* Base Fabric Color */}
          <path d={silhouettePaths.body} fill={`url(#fabric-base-${uniqueId})`} />

          {/* Underlying Color Bloom Layer (Active for both modes) */}
          <rect
            x="0"
            y="0"
            width="300"
            height="400"
            fill={`url(#core-flow-${uniqueId})`}
            className="transition-opacity duration-500"
          />

          {/* ------------------------------------------------------------- */}
          {/* 8 DIVERSE VISUAL TRANSFORMATION LANGUAGES (NO REPEATED CIRCLES) */}
          {/* ------------------------------------------------------------- */}

          {/* LANGUAGE 1: ORGANIC GRADIENT (Fluid Anatomical Dispersion) */}
          {visualLanguage === 'organic_gradient' && (
            <g opacity={Math.min(1, sweatRatio * 1.2)} className="transition-all duration-300">
              {/* Layered fluid contour fields */}
              <path
                d={view === 'front'
                  ? `M100,100 C130,${120 - sweatRatio * 15} 170,${120 - sweatRatio * 15} 200,100 C215,160 220,240 190,300 C150,${320 + sweatRatio * 10} 150,${320 + sweatRatio * 10} 110,300 C80,240 85,160 100,100 Z`
                  : `M120,90 C135,${100 - sweatRatio * 10} 165,${100 - sweatRatio * 10} 180,90 C200,170 205,260 185,320 C150,335 150,335 115,320 C95,260 100,170 120,90 Z`
                }
                fill={wetSecondaryColor}
                opacity={0.7}
                filter={`url(#soft-diffusion-${uniqueId})`}
              />
              <path
                d={view === 'front'
                  ? `M120,130 C135,140 165,140 180,130 C190,180 195,230 175,270 C150,285 150,285 125,270 C105,230 110,180 120,130 Z`
                  : `M130,110 C140,115 160,115 170,110 C180,180 185,250 170,295 C150,305 150,305 130,295 C115,250 120,180 130,110 Z`
                }
                fill={wetPrimaryColor}
                opacity={0.85}
              />
              {/* Subtle dynamic contour elevation lines */}
              {hasTexture && [0.2, 0.4, 0.6, 0.8].map((lvl, idx) => (
                <path
                  key={idx}
                  d={`M${110 + idx * 8},${140 + idx * 25} Q150,${165 + idx * 30} ${190 - idx * 8},${140 + idx * 25}`}
                  fill="none"
                  stroke={wetHighlightColor}
                  strokeWidth={0.8 * intensityMultiplier}
                  strokeDasharray="4,4"
                  opacity={sweatRatio > lvl ? 0.8 : 0.2}
                />
              ))}
            </g>
          )}

          {/* LANGUAGE 2: RIPPLE PATTERNS (Concentric Kinetic Wave Propagation) */}
          {visualLanguage === 'ripple' && (
            <g
              filter={hasTexture ? `url(#relief-filter-${uniqueId})` : undefined}
              className="transition-all duration-300"
            >
              {/* Concentric harmonic ripple rings expanding from center */}
              {[18, 36, 56, 78, 102, 130, 160, 195].map((baseRadius, idx) => {
                const ringProgress = Math.max(0, (sweatRatio * 200 - baseRadius) / 40);
                const isActivated = sweatRatio * 220 >= baseRadius;
                const ringOpacity = isActivated ? Math.min(0.9, 0.3 + ringProgress * 0.5) : 0.08;
                const strokeW = hasTexture ? (1 + ringProgress * 1.8) * intensityMultiplier : 1.2;

                const cx = 150;
                const cy = view === 'front' ? 160 : 180;

                return (
                  <ellipse
                    key={idx}
                    cx={cx}
                    cy={cy}
                    rx={baseRadius * (1 + sweatRatio * 0.15)}
                    ry={baseRadius * (0.85 + sweatRatio * 0.1)}
                    fill="none"
                    stroke={isActivated ? (idx % 2 === 0 ? wetPrimaryColor : wetSecondaryColor) : dryAccentColor}
                    strokeWidth={strokeW}
                    strokeDasharray={idx % 3 === 0 ? '8,4' : undefined}
                    opacity={ringOpacity}
                    className="transition-all duration-500"
                  />
                );
              })}
              {/* Harmonic radiating velocity axes */}
              <line x1="150" y1="80" x2="150" y2="330" stroke={wetHighlightColor} strokeWidth={hasTexture ? 1.5 * intensityMultiplier : 0.8} strokeDasharray="3,3" opacity={sweatRatio * 0.7} />
              <line x1="80" y1="160" x2="220" y2="160" stroke={wetHighlightColor} strokeWidth={hasTexture ? 1.2 * intensityMultiplier : 0.6} strokeDasharray="3,3" opacity={sweatRatio * 0.6} />
            </g>
          )}

          {/* LANGUAGE 3: MESH EXPANSION (Auxetic Mechanical Dilation Lattices) */}
          {visualLanguage === 'mesh_expansion' && (
            <g
              filter={hasTexture ? `url(#relief-filter-${uniqueId})` : undefined}
              className="transition-all duration-300"
            >
              {/* 7 rows of auxetic expanding hexagons */}
              {[0, 1, 2, 3, 4, 5, 6, 7].map((row) => (
                <g key={row}>
                  {[0, 1, 2, 3, 4, 5].map((col) => {
                    const cx = 80 + col * 28 + (row % 2) * 14;
                    const cy = 100 + row * 30;
                    // Proximity to thoracic center (150, 180)
                    const dist = Math.hypot(cx - 150, cy - 180);
                    const cellActivation = Math.max(0, 1 - dist / 140) * sweatRatio * 1.5;
                    const cellScale = Math.min(1.4, 0.6 + cellActivation * 0.8 * intensityMultiplier);
                    const isOpen = cellActivation > 0.3;

                    return (
                      <g key={col} transform={`translate(${cx}, ${cy}) scale(${cellScale})`}>
                        {/* Outer diamond / auxetic cell */}
                        <polygon
                          points="0,-12 10,-4 10,6 0,14 -10,6 -10,-4"
                          fill={isOpen ? wetPrimaryColor : 'none'}
                          fillOpacity={isOpen ? Math.min(0.85, cellActivation * 0.9) : 0}
                          stroke={isOpen ? wetSecondaryColor : dryAccentColor}
                          strokeWidth={hasTexture ? (0.8 + cellActivation * 1.2) * intensityMultiplier : 0.6}
                        />
                        {/* Internal breathing pore */}
                        {isOpen && hasTexture && (
                          <circle
                            cx="0"
                            cy="1"
                            r={Math.min(5, cellActivation * 3.5 * intensityMultiplier)}
                            fill={wetHighlightColor}
                            opacity={0.8}
                          />
                        )}
                      </g>
                    );
                  })}
                </g>
              ))}
            </g>
          )}

          {/* LANGUAGE 4: SCALE STRUCTURE (Biomimetic Overlapping Shingle Aerators) */}
          {visualLanguage === 'scale_structure' && (
            <g
              filter={hasTexture ? `url(#relief-filter-${uniqueId})` : undefined}
              className="transition-all duration-300"
            >
              {/* Overlapping shingle scales that pivot & elevate when damp */}
              {[0, 1, 2, 3, 4, 5, 6, 7].map((row) => (
                <g key={row}>
                  {[0, 1, 2, 3, 4, 5].map((col) => {
                    const sx = 75 + col * 30 + (row % 2) * 15;
                    const sy = 90 + row * 28;
                    const distFromCenter = Math.hypot(sx - 150, sy - 170);
                    const activation = Math.max(0, 1 - distFromCenter / 130) * sweatRatio * 1.4;
                    // When activated, scale lifts with drop shadow and reveals rich underlayer
                    const liftOffset = hasTexture ? activation * 6 * intensityMultiplier : 0;

                    return (
                      <g key={col} transform={`translate(${sx}, ${sy})`}>
                        {/* Underlayer reveal color when scale lifts */}
                        {activation > 0.2 && (
                          <path
                            d="M-12,0 C-10,12 10,12 12,0 Z"
                            fill={wetPrimaryColor}
                            opacity={Math.min(0.95, activation * 1.1)}
                          />
                        )}
                        {/* Scale Plate */}
                        <path
                          d={`M-14,0 C-12,${14 + liftOffset} 12,${14 + liftOffset} 14,0 C10,-4 -10,-4 -14,0 Z`}
                          fill={activation > 0.3 ? wetSecondaryColor : dryBaseColor}
                          stroke={activation > 0.2 ? wetHighlightColor : dryAccentColor}
                          strokeWidth={hasTexture ? 1.1 * intensityMultiplier : 0.6}
                          transform={`translate(0, ${-liftOffset * 0.4})`}
                          opacity={0.9}
                          className="transition-transform duration-300"
                        />
                      </g>
                    );
                  })}
                </g>
              ))}
            </g>
          )}

          {/* LANGUAGE 5: BRANCHING VEINS (Dendritic Vascular Leaf & Capillary Paths) */}
          {visualLanguage === 'branching_veins' && (
            <g
              filter={hasTexture ? `url(#relief-filter-${uniqueId})` : undefined}
              className="transition-all duration-300"
            >
              {/* Central Primary Vascular Trunk */}
              <path
                d="M150,80 Q150,190 150,335"
                fill="none"
                stroke={sweatRatio > 0.1 ? wetPrimaryColor : dryAccentColor}
                strokeWidth={hasTexture ? (2 + sweatRatio * 3.5) * intensityMultiplier : 2}
                strokeLinecap="round"
                opacity={Math.min(1, 0.4 + sweatRatio * 0.6)}
              />

              {/* Major Vascular Tributaries branching left and right */}
              {[
                // Upper Pectoral / Clavicle branches
                { d: 'M150,110 Q120,105 85,120', t: 0.15 },
                { d: 'M150,110 Q180,105 215,120', t: 0.15 },
                // Mid-Thoracic branches
                { d: 'M150,150 Q115,140 75,170', t: 0.25 },
                { d: 'M150,150 Q185,140 225,170', t: 0.25 },
                // Lower Ribcage / Intercostal branches
                { d: 'M150,195 Q115,200 80,235', t: 0.35 },
                { d: 'M150,195 Q185,200 220,235', t: 0.35 },
                // Abdominal / Lumbar branches
                { d: 'M150,245 Q125,265 90,290', t: 0.45 },
                { d: 'M150,245 Q175,265 210,290', t: 0.45 },
                // Secondary Capillary twigs
                { d: 'M120,135 Q100,125 88,140', t: 0.5 },
                { d: 'M180,135 Q200,125 212,140', t: 0.5 },
                { d: 'M115,190 Q95,185 85,205', t: 0.6 },
                { d: 'M185,190 Q205,185 215,205', t: 0.6 },
                { d: 'M125,255 Q105,265 95,275', t: 0.7 },
                { d: 'M175,255 Q195,265 205,275', t: 0.7 }
              ].map((branch, bIdx) => {
                const isFlowing = sweatRatio >= branch.t;
                const progress = Math.max(0, (sweatRatio - branch.t) / (1 - branch.t));
                return (
                  <path
                    key={bIdx}
                    d={branch.d}
                    fill="none"
                    stroke={isFlowing ? (bIdx % 2 === 0 ? wetPrimaryColor : wetSecondaryColor) : dryAccentColor}
                    strokeWidth={hasTexture ? (0.8 + progress * 2.2) * intensityMultiplier : 1}
                    strokeLinecap="round"
                    opacity={isFlowing ? Math.min(0.95, 0.4 + progress * 0.6) : 0.15}
                    className="transition-all duration-300"
                  />
                );
              })}

              {/* Capillary nodes where droplets coalesce */}
              {hasTexture && [
                { cx: 85, cy: 120 }, { cx: 215, cy: 120 },
                { cx: 75, cy: 170 }, { cx: 225, cy: 170 },
                { cx: 80, cy: 235 }, { cx: 220, cy: 235 }
              ].map((node, nIdx) => (
                <circle
                  key={nIdx}
                  cx={node.cx}
                  cy={node.cy}
                  r={sweatRatio > 0.4 ? (2 + sweatRatio * 3) * intensityMultiplier : 1}
                  fill={wetHighlightColor}
                  opacity={sweatRatio > 0.4 ? 0.9 : 0.1}
                />
              ))}
            </g>
          )}

          {/* LANGUAGE 6: CELLULAR VORONOI (Organic Bio-Membrane Chambers) */}
          {visualLanguage === 'cellular_voronoi' && (
            <g
              filter={hasTexture ? `url(#relief-filter-${uniqueId})` : undefined}
              className="transition-all duration-300"
            >
              {/* Organic polygonal Voronoi cells that swell when moist */}
              {[
                { pts: '130,90 170,90 185,120 150,135 115,120', cx: 150, cy: 110, thresh: 0.1 },
                { pts: '115,120 150,135 145,170 100,165 85,135', cx: 120, cy: 145, thresh: 0.2 },
                { pts: '150,135 185,120 215,135 200,165 155,170', cx: 180, cy: 145, thresh: 0.2 },
                { pts: '100,165 145,170 140,215 90,210', cx: 120, cy: 190, thresh: 0.35 },
                { pts: '155,170 200,165 210,210 160,215', cx: 180, cy: 190, thresh: 0.35 },
                { pts: '140,215 160,215 170,265 130,265', cx: 150, cy: 240, thresh: 0.3 },
                { pts: '90,210 140,215 130,265 80,260', cx: 110, cy: 240, thresh: 0.45 },
                { pts: '160,215 210,210 220,260 170,265', cx: 190, cy: 240, thresh: 0.45 },
                { pts: '130,265 170,265 175,320 125,320', cx: 150, cy: 290, thresh: 0.5 },
                { pts: '80,260 130,265 125,320 85,315', cx: 105, cy: 290, thresh: 0.6 },
                { pts: '170,265 220,260 215,315 175,320', cx: 195, cy: 290, thresh: 0.6 }
              ].map((cell, cIdx) => {
                const isActive = sweatRatio >= cell.thresh;
                const saturation = Math.max(0, (sweatRatio - cell.thresh) / (1 - cell.thresh));
                return (
                  <g key={cIdx}>
                    <polygon
                      points={cell.pts}
                      fill={isActive ? wetPrimaryColor : 'none'}
                      fillOpacity={isActive ? Math.min(0.85, 0.2 + saturation * 0.7) : 0}
                      stroke={isActive ? wetSecondaryColor : dryAccentColor}
                      strokeWidth={hasTexture ? (1 + saturation * 1.5) * intensityMultiplier : 0.7}
                      strokeLinejoin="round"
                    />
                    {/* Intracellular nucleus pore */}
                    {isActive && hasTexture && (
                      <circle
                        cx={cell.cx}
                        cy={cell.cy}
                        r={(1.5 + saturation * 3) * intensityMultiplier}
                        fill={wetHighlightColor}
                        opacity={0.8}
                      />
                    )}
                  </g>
                );
              })}
            </g>
          )}

          {/* LANGUAGE 7: STRIPE DIFFUSION (Kinetic Directional Striations) */}
          {visualLanguage === 'stripe_diffusion' && (
            <g
              filter={hasTexture ? `url(#relief-filter-${uniqueId})` : undefined}
              className="transition-all duration-300"
            >
              {/* Longitudinal striated compression ribs along body muscle lines */}
              {[-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5].map((lineIndex) => {
                const xOffset = 150 + lineIndex * 15;
                const curvature = lineIndex * 6;
                const distCenter = Math.abs(lineIndex);
                const activation = Math.max(0, 1 - distCenter / 6) * sweatRatio * 1.3;
                const isLit = activation > 0.15;

                return (
                  <g key={lineIndex}>
                    <path
                      d={`M${xOffset},80 Q${xOffset + curvature},200 ${xOffset + curvature * 0.5},340`}
                      fill="none"
                      stroke={isLit ? (distCenter % 2 === 0 ? wetPrimaryColor : wetSecondaryColor) : dryAccentColor}
                      strokeWidth={hasTexture ? (1 + activation * 3.2) * intensityMultiplier : 1.5}
                      strokeDasharray={distCenter > 2 ? '6,3' : undefined}
                      opacity={isLit ? Math.min(0.95, 0.3 + activation * 0.7) : 0.12}
                    />
                    {/* Cross-vent wicks */}
                    {isLit && hasTexture && (
                      <line
                        x1={xOffset - 4}
                        y1={170 + lineIndex * 10}
                        x2={xOffset + 4}
                        y2={170 + lineIndex * 10}
                        stroke={wetHighlightColor}
                        strokeWidth={1.5 * intensityMultiplier}
                      />
                    )}
                  </g>
                );
              })}
            </g>
          )}

          {/* LANGUAGE 8: FEATHER FIBRILS (Micro-Cilia Alignment & Surface Erection) */}
          {visualLanguage === 'feather_fibrils' && (
            <g
              filter={hasTexture ? `url(#relief-filter-${uniqueId})` : undefined}
              className="transition-all duration-300"
            >
              {/* Directional feather shafts with delicate side fibrils */}
              {[120, 175, 230, 285].map((yCenter, sIdx) => {
                const shaftProgress = Math.max(0, (sweatRatio * 320 - yCenter) / 70);
                const isActivated = sweatRatio * 340 >= yCenter;

                return (
                  <g key={sIdx} opacity={isActivated ? Math.min(1, 0.3 + shaftProgress * 0.7) : 0.15}>
                    {/* Central plume shaft */}
                    <path
                      d={`M75,${yCenter} Q150,${yCenter + 15} 225,${yCenter}`}
                      fill="none"
                      stroke={wetPrimaryColor}
                      strokeWidth={hasTexture ? (1.2 + shaftProgress * 1.5) * intensityMultiplier : 1}
                    />
                    {/* Feather barbs / fibrils angling out */}
                    {[-40, -25, -10, 5, 20, 35, 50].map((dx, fIdx) => {
                      const fx = 150 + dx;
                      const angle = dx < 0 ? -12 : 12;
                      const fibrilLength = hasTexture ? (8 + sweatRatio * 10) * intensityMultiplier : 8;

                      return (
                        <line
                          key={fIdx}
                          x1={fx}
                          y1={yCenter + 8}
                          x2={fx + angle}
                          y2={yCenter + 8 - fibrilLength}
                          stroke={fIdx % 2 === 0 ? wetSecondaryColor : wetHighlightColor}
                          strokeWidth={hasTexture ? 0.9 * intensityMultiplier : 0.6}
                          strokeLinecap="round"
                        />
                      );
                    })}
                  </g>
                );
              })}
            </g>
          )}

          {/* Localized Spray Droplet Splashes (Interactive Mode) */}
          {localDrops.map((drop) => (
            <g key={drop.id} className="animate-ping-once">
              <circle
                cx={drop.x}
                cy={drop.y}
                r={drop.radius}
                fill={wetPrimaryColor}
                opacity={0.8}
                filter={`url(#soft-diffusion-${uniqueId})`}
              />
              <circle
                cx={drop.x}
                cy={drop.y}
                r={drop.radius * 0.5}
                fill={wetHighlightColor}
                opacity={0.9}
              />
            </g>
          ))}

          {/* Evaporative Crystalline Frost Matrix (Visible only in Cooldown / Recovery) */}
          {isCooldown && (
            <g opacity={0.85} className="transition-opacity duration-700">
              {[
                { cx: 150, cy: 160, r: 24 },
                { cx: 125, cy: 190, r: 18 },
                { cx: 175, cy: 190, r: 18 },
                { cx: 150, cy: 240, r: 26 }
              ].map((frost, fIdx) => (
                <g key={fIdx}>
                  <circle
                    cx={frost.cx}
                    cy={frost.cy}
                    r={frost.r}
                    fill="none"
                    stroke="#FFFFFF"
                    strokeWidth="1.2"
                    strokeDasharray="2,3"
                    className="animate-pulse"
                  />
                  <line x1={frost.cx - frost.r} y1={frost.cy} x2={frost.cx + frost.r} y2={frost.cy} stroke="#FFFFFF" strokeWidth="0.8" opacity="0.6" />
                  <line x1={frost.cx} y1={frost.cy - frost.r} x2={frost.cx} y2={frost.cy + frost.r} stroke="#FFFFFF" strokeWidth="0.8" opacity="0.6" />
                </g>
              ))}
            </g>
          )}

          {/* Seam Stitching & Construction Architecture */}
          {silhouettePaths.seams.map((seam, sIdx) => (
            <path
              key={sIdx}
              d={seam}
              fill="none"
              stroke={sweatRatio > 0.4 ? wetHighlightColor : dryAccentColor}
              strokeWidth="0.75"
              strokeDasharray="3,2"
              opacity={0.6}
            />
          ))}

          {/* Armhole & Neckline binding edge */}
          <path d={silhouettePaths.neckline} fill="none" stroke={dryAccentColor} strokeWidth="2.5" />
          <path d={silhouettePaths.armholes} fill="none" stroke={dryAccentColor} strokeWidth="1.8" />
        </g>

        {/* 3. Outer Silhouette High-Definition Clean Perimeter */}
        <path
          d={silhouettePaths.body}
          fill="none"
          stroke="#2D3139"
          strokeWidth="1.2"
          className="opacity-40"
        />

        {/* Optional Editorial Technical Annotation Markings */}
        {showAnatomyLines && (
          <g className="text-[7px] font-mono select-none" fill="#8C929C" opacity="0.75">
            <line x1="28" y1="65" x2="68" y2="65" stroke="#B8BEC8" strokeWidth="0.5" strokeDasharray="2,2" />
            <text x="10" y="68">AXIS.01</text>

            <line x1="235" y1="160" x2="280" y2="160" stroke="#B8BEC8" strokeWidth="0.5" strokeDasharray="2,2" />
            <text x="245" y="156">VENT.02</text>

            <line x1="28" y1="330" x2="68" y2="330" stroke="#B8BEC8" strokeWidth="0.5" strokeDasharray="2,2" />
            <text x="10" y="333">HEM.03</text>
          </g>
        )}
      </svg>
    </div>
  );
};
