import { restaurantConfig } from '../data/config.js';
import { getIconSvg } from './icons.js';

export function createHero(onCategoryClick) {
  const section = document.createElement('section');
  section.id = 'inicio';
  section.className = 'hero-section';
  
  section.innerHTML = `
    <div class="hero-backdrop" aria-hidden="true">
      <img src="./images/hero-local.jpg" alt="" class="hero-bg-img" fetchpriority="high" />
      <div class="hero-bg-overlay"></div>
    </div>
    <div class="container hero-content">
      
      <!-- Distintivo Superior / Horario Oficial & Notificación Interactiva -->
      <div class="hero-top-badge">
        <span class="hero-badge-dot"></span>
        <span class="hero-badge-text">Abierto · ${restaurantConfig.location.schedule}</span>
      </div>

      <!-- Ticker Interactivo de Promociones en Vivo (Interacción dinámica no invasiva) -->
      <div class="hero-promo-ticker" id="hero-promo-ticker" role="status" aria-live="polite">
        <div class="ticker-pill">
          <span class="ticker-dot"></span>
          <span class="ticker-badge">PROMO DESTACADA</span>
          <span class="ticker-msg" id="ticker-msg">Jarra Chica de Sangría a S/. 15.00 · Jarra Grande S/. 30.00</span>
          <button type="button" class="ticker-cta" id="ticker-cta" aria-label="Ver detalles de la promo">Ver Promo</button>
        </div>
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

      <!-- Botones Principales de Acción Rápida (Pills inspirados en la referencia con nivel cinco estrellas) -->
      <div class="hero-actions">
        <a href="#menu-nav" class="btn-primary">
          <span>${getIconSvg('book')}</span>
          <span>VER LA CARTA</span>
        </a>
        <a href="#ubicacion" class="btn-secondary">
          <span>${getIconSvg('pin')}</span>
          <span>DÓNDE ENCONTRARNOS</span>
        </a>
        <a href="#redes" class="btn-secondary btn-pill-social">
          <span>${getIconSvg('spark')}</span>
          <span>SÍGUENOS</span>
        </a>
      </div>

      <!-- Hallmarks de Alta Cocina / Pilares Gastronómicos -->
      <div class="hallmarks-strip quick-strip">
        <a href="#menu-nav" class="hallmark-item quick-strip-item">
          <span class="hallmark-icon quick-strip-icon">${getIconSvg('grill', { width: 22, height: 22 })}</span>
          <span class="hallmark-title quick-strip-title">Cortes a la Parrilla</span>
          <span class="hallmark-desc quick-strip-desc">Sabor ahumado & técnica</span>
        </a>
        <a href="#menu-nav" class="hallmark-item quick-strip-item">
          <span class="hallmark-icon quick-strip-icon">${getIconSvg('cocktail', { width: 22, height: 22 })}</span>
          <span class="hallmark-title quick-strip-title">Coctelería de Autor</span>
          <span class="hallmark-desc quick-strip-desc">Jarras de Sangría & combinados</span>
        </a>
        <a href="#banquetes" class="hallmark-item quick-strip-item">
          <span class="hallmark-icon quick-strip-icon">${getIconSvg('crown', { width: 22, height: 22 })}</span>
          <span class="hallmark-title quick-strip-title">Experiencia Exclusiva</span>
          <span class="hallmark-desc quick-strip-desc">Servicio en mesa & banquetes</span>
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

  // Ticker interactivo de promociones y notificaciones auténticas
  const livePromos = [
    { badge: "PROMO DESTACADA", text: "Jarra Chica de Sangría a S/. 15.00 · Jarra Grande S/. 30.00", target: "cocteles" },
    { badge: "ESPECIALIDAD", text: "Alitas Acevichadas con papas por S/. 18.50", target: "parrillas-banquetes" },
    { badge: "REPOSTERÍA", text: "Todas las tortas a S/. 13.00 y Crema Volteada a S/. 12.00", target: "postres" },
    { badge: "ADICIONALES", text: "Personaliza con huevo, tocino o queso desde +S/. 2.00", target: "adicionales" },
    { badge: "PARA COMPARTIR", text: "Banquete Mega Parrilla para 4 personas a S/. 76.00", target: "parrillas-banquetes" }
  ];

  let currentPromoIdx = 0;
  const tickerBadge = section.querySelector('.ticker-badge');
  const tickerMsg = section.querySelector('#ticker-msg');
  const tickerCta = section.querySelector('#ticker-cta');

  if (tickerBadge && tickerMsg && tickerCta) {
    const updateTicker = (idx) => {
      const p = livePromos[idx];
      tickerBadge.innerHTML = p.badge;
      tickerMsg.innerHTML = p.text;
      tickerCta.setAttribute('data-target', p.target);
    };

    updateTicker(0);

    let promoTimer = setInterval(() => {
      currentPromoIdx = (currentPromoIdx + 1) % livePromos.length;
      updateTicker(currentPromoIdx);
    }, 4500);

    const tickerEl = section.querySelector('#hero-promo-ticker');
    if (tickerEl) {
      tickerEl.addEventListener('mouseenter', () => clearInterval(promoTimer));
      tickerEl.addEventListener('mouseleave', () => {
        promoTimer = setInterval(() => {
          currentPromoIdx = (currentPromoIdx + 1) % livePromos.length;
          updateTicker(currentPromoIdx);
        }, 4500);
      });
    }

    tickerCta.addEventListener('click', (e) => {
      e.preventDefault();
      const targetCat = tickerCta.getAttribute('data-target') || 'cocteles';
      if (onCategoryClick) {
        onCategoryClick(targetCat);
      }
    });
  }
  
  return section;
}
