import { restaurantConfig } from '../data/config.js';
import { getIconSvg } from './icons.js';

/**
 * Serendipity Burger — Historia de la Marca
 * Texto textual y auténtico extraído de la carta física oficial.
 * Sin frases inventadas ni adornos robóticos.
 */
export function createBrandStory() {
  const section = document.createElement('section');
  section.id = 'historia';
  section.className = 'brand-story-section';

  const story = restaurantConfig.story;

  section.innerHTML = `
    <div class="container">
      <div class="story-card">
        <span class="story-tagline">${story.tagline}</span>
        <h2 class="story-title">${story.title}</h2>

        <div class="story-divider" aria-hidden="true">
          <span class="story-divider-line"></span>
          <span class="story-divider-gem"></span>
          <span class="story-divider-line"></span>
        </div>
        
        <div class="story-body">
          ${story.paragraphs.map(p => `<p class="story-paragraph">${p}</p>`).join('')}
        </div>

        <div class="story-pillars-grid">
          <div class="story-pillar-item">
            <span class="pillar-icon">
              ${getIconSvg('spark', { width: 20, height: 20, className: 'luxury-svg-icon' })}
            </span>
            <h4 class="pillar-title">Materias Primas</h4>
            <p class="pillar-text">Garantizamos confiabilidad utilizando las mejores materias primas del mercado.</p>
          </div>
          <div class="story-pillar-item">
            <span class="pillar-icon">
              ${getIconSvg('grill', { width: 20, height: 20, className: 'luxury-svg-icon' })}
            </span>
            <h4 class="pillar-title">Técnica & Fuego Lento</h4>
            <p class="pillar-text">Cortes selectos a la parrilla, fuego lento y el punto perfecto de sabor.</p>
          </div>
          <div class="story-pillar-item">
            <span class="pillar-icon">
              ${getIconSvg('cloche', { width: 20, height: 20, className: 'luxury-svg-icon' })}
            </span>
            <h4 class="pillar-title">Hospitalidad</h4>
            <p class="pillar-text">Atención cálida y personalizada, recibiéndolos siempre con una sonrisa.</p>
          </div>
        </div>

        <blockquote class="story-quote">
          ${story.highlight}
        </blockquote>
      </div>
    </div>
  `;

  return section;
}
