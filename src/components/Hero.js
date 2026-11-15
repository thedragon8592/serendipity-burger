import { restaurantConfig } from '../data/config.js';
import { getIconSvg } from './icons.js';

export function createHero(onCategoryClick) {
  const section = document.createElement('section');
  section.id = 'inicio';
  section.className = 'hero-section';
  
  section.innerHTML = `
    <div class="hero-backdrop" aria-hidden="true"></div>
    <div class="container hero-content">
      
      <!-- Distintivo Superior / Horario Oficial -->
      <div class="hero-top-badge">
        <span class="hero-badge-dot"></span>
        <span class="hero-badge-text">Abierto · ${restaurantConfig.location.schedule}</span>
      </div>

      <!-- Título de Marca y Pregunta Provocativa -->
      <h1 class="hero-brand-name">
        ${restaurantConfig.brandName}
      </h1>

      <h2 class="hero-provocative-title">
        ¿Qué te provoca hoy?
      </h2>

      <p class="hero-tagline">
        ${restaurantConfig.slogan}. Cortes selectos al carbón, hamburguesas a la parrilla, banquetes para compartir y repostería artesanal.
      </p>

      <!-- Botones Principales de Acción Rápida -->
      <div class="hero-actions">
        <a href="#menu-nav" class="btn-primary">
          <span>${getIconSvg('book')}</span>
          <span>EXPLORAR LA CARTA</span>
        </a>
        <a href="#ubicacion" class="btn-secondary">
          <span>${getIconSvg('pin')}</span>
          <span>UBÍCANOS</span>
        </a>
      </div>

      <!-- Tarjetas Visuales de Selección Directa (Estilo Rosa Café, nivel 1000x) -->
      <div class="hero-visual-categories">
        <div class="hero-cat-grid">
          
          <button type="button" class="hero-cat-card" data-cat="hamburguesas">
            <div class="hero-cat-icon-wrap">
              ${getIconSvg('burger', { width: 26, height: 26 })}
            </div>
            <div class="hero-cat-info">
              <span class="hero-cat-title">Hamburguesas</span>
              <span class="hero-cat-desc">A la parrilla & clásicas</span>
            </div>
            <span class="hero-cat-arrow">→</span>
          </button>

          <button type="button" class="hero-cat-card" data-cat="parrillas-banquetes">
            <div class="hero-cat-icon-wrap">
              ${getIconSvg('grill', { width: 26, height: 26 })}
            </div>
            <div class="hero-cat-info">
              <span class="hero-cat-title">Parrillas & Banquetes</span>
              <span class="hero-cat-desc">Cortes finos & para compartir</span>
            </div>
            <span class="hero-cat-arrow">→</span>
          </button>

          <button type="button" class="hero-cat-card" data-cat="piqueos">
            <div class="hero-cat-icon-wrap">
              ${getIconSvg('fries', { width: 26, height: 26 })}
            </div>
            <div class="hero-cat-info">
              <span class="hero-cat-title">Piqueos & Salchipapas</span>
              <span class="hero-cat-desc">Especialidades criollas</span>
            </div>
            <span class="hero-cat-arrow">→</span>
          </button>

          <button type="button" class="hero-cat-card" data-cat="cocteles">
            <div class="hero-cat-icon-wrap">
              ${getIconSvg('cocktail', { width: 26, height: 26 })}
            </div>
            <div class="hero-cat-info">
              <span class="hero-cat-title">Cócteles & Sangría</span>
              <span class="hero-cat-desc">Jarras chica S/.15 y grande S/.30</span>
            </div>
            <span class="hero-cat-arrow">→</span>
          </button>

          <button type="button" class="hero-cat-card" data-cat="postres">
            <div class="hero-cat-icon-wrap">
              ${getIconSvg('dessert', { width: 26, height: 26 })}
            </div>
            <div class="hero-cat-info">
              <span class="hero-cat-title">Postres de Tentación</span>
              <span class="hero-cat-desc">Tortas a S/.13 & Crema Volteada S/.12</span>
            </div>
            <span class="hero-cat-arrow">→</span>
          </button>

          <button type="button" class="hero-cat-card" data-cat="bebidas">
            <div class="hero-cat-icon-wrap">
              ${getIconSvg('drink', { width: 26, height: 26 })}
            </div>
            <div class="hero-cat-info">
              <span class="hero-cat-title">Jugos & Batidos</span>
              <span class="hero-cat-desc">100% naturales & milkshakes</span>
            </div>
            <span class="hero-cat-arrow">→</span>
          </button>

        </div>
      </div>

    </div>
  `;

  // Añadir eventos a las tarjetas de categoría
  const catButtons = section.querySelectorAll('.hero-cat-card');
  catButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const catId = btn.getAttribute('data-cat');
      if (onCategoryClick) {
        onCategoryClick(catId);
      }
    });
  });
  
  return section;
}
