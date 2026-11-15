import { restaurantConfig } from '../data/config.js';
import { getIconSvg } from './icons.js';

/**
 * Serendipity Burger — Social Media Luxury Experience Section
 * F17: Editorial luxury cards for Instagram, Facebook, and TikTok.
 * Verified official channels with bespoke SVG icons, behind-the-scenes
 * grill artistry narrative, zero fabricated statistics, zero emojis.
 */
export function createSocialSection() {
  const section = document.createElement('section');
  section.id = 'redes';
  section.className = 'social-section';

  const social = restaurantConfig.social;

  const channels = [
    {
      key: 'instagram',
      name: social.instagram.name,
      handle: social.instagram.handle,
      url: social.instagram.url,
      label: social.instagram.label,
      iconKey: 'social-instagram',
      description: 'Detrás de escena en cocina, fotografía gastronómica y lanzamientos exclusivos de temporada.',
      highlight: 'Momentos & Novedades'
    },
    {
      key: 'facebook',
      name: social.facebook.name,
      handle: social.facebook.handle,
      url: social.facebook.url,
      label: social.facebook.label,
      iconKey: 'social-facebook',
      description: 'Novedades de la comunidad, eventos especiales y anuncios oficiales de nuestro local.',
      highlight: 'Comunidad Oficial'
    },
    {
      key: 'tiktok',
      name: social.tiktok.name,
      handle: social.tiktok.handle,
      url: social.tiktok.url,
      label: social.tiktok.label,
      iconKey: 'social-tiktok',
      description: 'El arte del fuego lento, técnica smash y la preparación artesanal de nuestras hamburguesas en video.',
      highlight: 'Grill Artistry en Video'
    }
  ];

  const cardsHtml = channels.map(channel => `
    <a 
      href="${channel.url}" 
      target="_blank" 
      rel="noopener noreferrer" 
      class="social-card"
      aria-label="${channel.name}: ${channel.handle}"
    >
      <div class="social-card-top">
        <div class="social-card-icon" aria-hidden="true">
          ${getIconSvg(channel.iconKey, { width: 24, height: 24, className: 'luxury-svg-icon' })}
        </div>
        <span class="social-card-pill">${channel.highlight}</span>
      </div>

      <div class="social-card-content">
        <span class="social-card-title">${channel.name}</span>
        <span class="social-card-handle">${channel.handle}</span>
        <p class="social-card-desc">${channel.description}</p>
        <span class="social-card-action">
          <span>${channel.label}</span>
          ${getIconSvg('arrow-right', { width: 14, height: 14, className: 'luxury-svg-icon' })}
        </span>
      </div>
    </a>
  `).join('');

  section.innerHTML = `
    <div class="container">
      <div class="section-header">
        <span class="section-pretitle">Comunidad & Vanguardia</span>
        <h2 class="section-title">Sigue la Experiencia</h2>
        <p class="section-subtitle">
          Siga de cerca nuestra pasión por la parrilla, creaciones de autor y el día a día en Serendipity Burger.
        </p>
      </div>

      <div class="social-cards-grid">
        ${cardsHtml}
      </div>
    </div>
  `;

  return section;
}
