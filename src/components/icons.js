/**
 * ============================================================================
 * SERENDIPITY BURGER — CENTRALIZED SVG ICON SYSTEM
 * ============================================================================
 * Haute-Cuisine Luxury Stroke Line Icons
 * Strict Zero-Emoji compliance across all templates and UI components.
 * ViewBox: 0 0 24 24 | Stroke: 1.5 | Stroke-LineCap: round | Stroke-LineJoin: round
 * ============================================================================
 */

const iconDefinitions = {
  // --- Culinary & Dishes ---
  burger: `
    <path d="M3 11h18"/>
    <path d="M5 11a7 7 0 0 1 14 0"/>
    <path d="M4 18h16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Z"/>
    <path d="M4 14h16"/>
  `,
  grill: `
    <circle cx="12" cy="12" r="10"/>
    <path d="m8 8 8 8"/>
    <path d="m16 8-8 8"/>
    <path d="M12 2v20"/>
  `,
  flame: `
    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>
  `,
  crown: `
    <path d="M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.735H5.81a1 1 0 0 1-.957-.735L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z"/>
  `,
  spark: `
    <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z"/>
  `,
  cloche: `
    <path d="M3 18h18"/>
    <path d="M4 18a8 8 0 0 1 16 0"/>
    <path d="M12 4v2"/>
    <circle cx="12" cy="4" r="1"/>
  `,
  fries: `
    <path d="M18 2v8a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V2"/>
    <path d="M6 2v6"/>
    <path d="M10 2v6"/>
    <path d="M14 2v6"/>
    <path d="M10 14v8"/>
  `,
  sliders: `
    <line x1="4" x2="4" y1="21" y2="14"/>
    <line x1="4" x2="4" y1="10" y2="3"/>
    <line x1="12" x2="12" y1="21" y2="12"/>
    <line x1="12" x2="12" y1="8" y2="3"/>
    <line x1="20" x2="20" y1="21" y2="16"/>
    <line x1="20" x2="20" y1="12" y2="3"/>
    <line x1="1" x2="7" y1="14" y2="14"/>
    <line x1="9" x2="15" y1="8" y2="8"/>
    <line x1="17" x2="23" y1="16" y2="16"/>
  `,
  sundae: `
    <path d="M7 21h10"/>
    <path d="M12 17v4"/>
    <path d="m5 3 7 14 7-14Z"/>
    <path d="M5 3h14"/>
  `,
  cocktail: `
    <path d="M8 22h8"/>
    <path d="M12 15v7"/>
    <path d="m4 4 8 11 8-11Z"/>
    <path d="M3 4h18"/>
  `,
  carafe: `
    <path d="M15 2H9a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1Z"/>
    <path d="M6 6h12l-1.5 14.5a2 2 0 0 1-2 1.5H9.5a2 2 0 0 1-2-1.5Z"/>
  `,
  dessert: `
    <path d="M12 21a9 9 0 0 0 9-9H3a9 9 0 0 0 9 9Z"/>
    <path d="M12 3a9 9 0 0 1 9 9H3a9 9 0 0 1 9-9Z"/>
  `,
  cup: `
    <path d="M17 8h1a4 4 0 1 1 0 8h-1"/>
    <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"/>
    <line x1="6" x2="6" y1="2" y2="4"/>
    <line x1="10" x2="10" y1="2" y2="4"/>
    <line x1="14" x2="14" y1="2" y2="4"/>
  `,
  wine: `
    <path d="M8 2h8v4H8z"/>
    <path d="M6 6h12l1 15H5z"/>
    <path d="M6 13h12"/>
  `,
  beverage: `
    <path d="M8 22h8"/>
    <path d="M12 15v7"/>
    <path d="m4 4 8 11 8-11Z"/>
    <path d="M3 4h18"/>
  `,

  // --- Hospitality, Place & Direction ---
  book: `
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
  `,
  pin: `
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
    <circle cx="12" cy="10" r="3"/>
  `,
  clock: `
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12 6 12 12 16 14"/>
  `,
  compass: `
    <circle cx="12" cy="12" r="10"/>
    <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>
  `,
  guests: `
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  `,

  // --- Actions & UI Glyphs ---
  search: `
    <circle cx="11" cy="11" r="8"/>
    <path d="m21 21-4.3-4.3"/>
  `,
  close: `
    <path d="M18 6 6 18"/>
    <path d="m6 6 12 12"/>
  `,
  star: `
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  `,
  quote: `
    <path d="M3 21c3 0 7-1 7-8V5c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2 0 4-1.5 6-3 8z"/>
    <path d="M15 21c3 0 7-1 7-8V5c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2 0 4-1.5 6-3 8z"/>
  `,
  check: `
    <polyline points="20 6 9 17 4 12"/>
  `,
  'arrow-right': `
    <line x1="5" y1="12" x2="19" y2="12"/>
    <polyline points="12 5 19 12 12 19"/>
  `,

  // --- Official Social Media Channels ---
  'social-instagram': `
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  `,
  'social-facebook': `
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  `,
  'social-tiktok': `
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/>
  `
};

/**
 * Returns a refined, lightweight inline SVG icon string.
 * @param {string} iconKey - Unique identifier from iconDefinitions
 * @param {object} options - Customizations: width, height, className, strokeWidth, color
 * @returns {string} Inline SVG markup
 */
export function getIconSvg(iconKey, options = {}) {
  const content = iconDefinitions[iconKey] || iconDefinitions.spark;
  const width = options.width || 18;
  const height = options.height || 18;
  const strokeWidth = options.strokeWidth || 1.5;
  const className = options.className ? ` class="${options.className}"` : ' class="luxury-svg-icon"';
  const color = options.color ? ` stroke="${options.color}"` : ' stroke="currentColor"';

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 24 24" fill="none"${color} stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round"${className} aria-hidden="true">${content.trim()}</svg>`;
}
