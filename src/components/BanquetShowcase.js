import { banquetesHighlights } from '../data/menu.js';
import { getIconSvg } from './icons.js';

export function createBanquetShowcase() {
  const section = document.createElement('section');
  section.id = 'banquetes';
  section.className = 'banquetes-section';

  const cardsHtml = banquetesHighlights.map(banquete => `
    <article class="banquete-card">
      <span class="banquete-badge">${banquete.badge}</span>
      <h3 class="banquete-name">${banquete.name}</h3>
      <p class="banquete-tagline">“${banquete.tagline}”</p>
      <p class="banquete-description">${banquete.description}</p>
      <div class="banquete-footer">
        <span class="banquete-servings">${getIconSvg('guests')} <span>${banquete.servings}</span></span>
        <span class="banquete-price" aria-label="S/. ${banquete.price.toFixed(2)}"><span class="currency">S/</span> <span class="amount">${banquete.price.toFixed(2)}</span></span>
      </div>
    </article>
  `).join('');

  section.innerHTML = `
    <div class="container" id="experiencias">
      <div class="section-header">
        <span class="section-pretitle">Parrillas & Banquetes · Experiencias Para Compartir</span>
        <h2 class="section-title">Grandes Banquetes de Selección</h2>
        <p class="section-subtitle">
          Cortes selectos a fuego lento, anticuchos tiernizados, chaufa ahumado y papas crujientes preparados para la mesa.
        </p>
      </div>

      <div class="banquetes-grid">
        ${cardsHtml}
      </div>
    </div>
  `;

  return section;
}
