import React from 'react';

/**
 * Official Modus Logo Component
 * Matches the 5-petal swirl aperture 'O' and clean geometric typography.
 */
export function ModusIcon({ className = "h-6 w-6", color = "currentColor", cutoutColor = "#080c14" }) {
  return (
    <svg 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
    >
      {/* 5 Petals Background Silhouette */}
      <g fill={color}>
        {/* Top Petal (0 deg / 12 o'clock) */}
        <circle cx="50" cy="28" r="18" />
        {/* Top-Right Petal (72 deg) */}
        <circle cx="70.9" cy="43.2" r="18" />
        {/* Bottom-Right Petal (144 deg) */}
        <circle cx="62.9" cy="67.8" r="18" />
        {/* Bottom-Left Petal (216 deg) */}
        <circle cx="37.1" cy="67.8" r="18" />
        {/* Top-Left Petal (288 deg) */}
        <circle cx="29.1" cy="43.2" r="18" />
        {/* Central Hub Fill */}
        <circle cx="50" cy="50" r="22" />
      </g>

      {/* Negative Space Aperture */}
      <circle cx="50" cy="50" r="12" fill={cutoutColor} />

      {/* 5 Swirl Pinwheel Cutout Blades */}
      <g stroke={cutoutColor} strokeWidth="3.2" strokeLinecap="round" fill="none">
        <path d="M 50 38 C 58 38 62 42 62 50" />
        <path d="M 61.4 46.3 C 66.3 52.7 65.1 57.6 57.4 60.1" />
        <path d="M 57.1 59.7 C 54.6 67.4 49.8 68.6 43.4 63.7" />
        <path d="M 42.9 59.7 C 36.5 54.8 35.3 50.0 37.8 42.3" />
        <path d="M 38.6 46.3 C 41.1 38.6 45.9 37.4 52.3 42.3" />
      </g>
    </svg>
  );
}

export default function ModusLogo({ className = "", iconSize = "h-6 w-6", textSize = "text-xl", iconColor = "#00dae8" }) {
  return (
    <div className={`inline-flex items-center tracking-tight font-display font-semibold text-white select-none ${className}`}>
      <span className={`${textSize} mr-0.5`}>M</span>
      <div className="inline-flex items-center justify-center mx-0.5">
        <ModusIcon className={iconSize} color={iconColor} />
      </div>
      <span className={`${textSize} ml-0.5 tracking-wider`}>DUS</span>
    </div>
  );
}
