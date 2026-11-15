import { restaurantConfig } from '../data/config.js';
import { getIconSvg } from './icons.js';

/**
 * Serendipity Burger — Minimalist Luxury Footer
 * Features brand hallmark, refined navigation anchors,
 * official currency statement, non-transactional QR catalog notice,
 * dynamic copyright year, and strict zero-emoji compliance.
 */
export function createFooter() {
  const footer = document.createElement('footer');
  footer.className = 'site-footer';

  const currentYear = new Date().getFullYear();

  footer.innerHTML = `
    <div class="container">
      <div class="footer-hallmark">
        <div class="footer-crest" aria-hidden="true">
          <span class="crest-letter">S</span>
        </div>
        <div class="footer-brand">${restaurantConfig.brandName}</div>
        <p class="footer-slogan">${restaurantConfig.slogan}</p>
        <span class="footer-tagline">Alta Cocina Casual · Brasas & Fuego Lento · Table QR Catalog Experience</span>
      </div>

      <nav class="footer-links" aria-label="Enlaces del pie de página">
        <a href="#inicio" class="footer-link">Inicio</a>
        <a href="#carta" class="footer-link">Carta Digital</a>
        <a href="#experiencias" class="footer-link">Experiencias & Banquetes</a>
        <a href="#cat-adicionales" class="footer-link">Personaliza tu Burger</a>
        <a href="#historia" class="footer-link">Nuestra Historia</a>
        <a href="#ubicacion" class="footer-link">Ubicación</a>
        <a href="#redes" class="footer-link">Redes Sociales</a>
      </nav>

      <div class="footer-legal">
        <div class="footer-currency-notice">
          ${getIconSvg('spark', { width: 14, height: 14, className: 'luxury-svg-icon' })}
          <span>Precios en Soles (S/.) expresados conforme a la carta oficial del restaurante.</span>
        </div>
        <div class="footer-disclaimer">
          Catálogo digital visual para visualización exclusiva en mesa vía código QR. No se procesan pedidos ni transacciones de pago en esta plataforma.
        </div>
        <div class="footer-copyright">
          © ${currentYear} ${restaurantConfig.brandName}. Todos los derechos reservados.
        </div>
      </div>
    </div>
  `;

  // Smooth scroll handler for footer internal navigation
  footer.addEventListener('click', (e) => {
    const anchor = e.target.closest('a[href^="#"]');
    if (!anchor) return;
    const href = anchor.getAttribute('href');
    if (!href || href === '#') return;

    let targetEl = null;
    if (href === '#carta') {
      targetEl = (typeof document !== 'undefined') ? (document.getElementById('menu-nav') || document.getElementById('carta')) : null;
    } else if (href === '#experiencias') {
      targetEl = (typeof document !== 'undefined') ? (document.getElementById('banquetes') || document.getElementById('experiencias')) : null;
    } else if (href === '#inicio') {
      targetEl = (typeof document !== 'undefined') ? document.getElementById('inicio') : null;
    } else if (typeof document !== 'undefined') {
      targetEl = document.querySelector(href);
    }

    if (targetEl && typeof targetEl.scrollIntoView === 'function') {
      e.preventDefault();
      targetEl.scrollIntoView({ behavior: 'smooth' });
      if (typeof window !== 'undefined' && window.history && window.history.pushState) {
        window.history.pushState(null, '', href);
      }
    }
  });

  return footer;
}
