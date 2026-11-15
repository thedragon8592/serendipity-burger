import { restaurantConfig } from '../data/config.js';
import { getIconSvg } from './icons.js';

/**
 * Serendipity Burger — Luxury Header / Masthead
 * Features gold monogram crest "S", smooth navigation anchors
 * (#carta, #experiencias, #historia, #ubicacion, #redes),
 * Google Maps CTA button, and responsive mobile drawer toggle (zero emojis).
 */
export function createHeader() {
  const header = document.createElement('header');
  header.className = 'site-header';
  
  header.innerHTML = `
    <div class="container header-inner">
      <a href="#inicio" class="brand-logo" aria-label="${restaurantConfig.brandName}">
        <div class="brand-emblem">S</div>
        <div class="brand-text">
          <span class="brand-title">${restaurantConfig.brandName}</span>
          <span class="brand-subtitle">Carta Digital</span>
        </div>
      </a>

      <nav class="header-nav" aria-label="Navegación principal">
        <a href="#carta" class="nav-link">Carta</a>
        <a href="#experiencias" class="nav-link">Experiencias</a>
        <a href="#historia" class="nav-link">Historia</a>
        <a href="#ubicacion" class="nav-link">Ubicación</a>
        <a href="#redes" class="nav-link">Redes</a>
        <a 
          href="${restaurantConfig.location.googleMapsUrl}" 
          target="_blank" 
          rel="noopener noreferrer" 
          class="header-btn-maps"
          aria-label="Google Maps"
        >
          <span>${getIconSvg('pin', { width: 16, height: 16, className: 'luxury-svg-icon' })}</span>
          <span>Google Maps</span>
        </a>
      </nav>

      <button 
        type="button" 
        class="header-menu-toggle" 
        aria-label="Abrir menú de navegación" 
        aria-expanded="false" 
        aria-controls="mobile-nav-drawer"
      >
        <span class="toggle-bar"></span>
        <span class="toggle-bar"></span>
        <span class="toggle-bar"></span>
      </button>
    </div>

    <!-- Mobile Luxury Navigation Drawer -->
    <div id="mobile-nav-drawer" class="header-mobile-drawer" aria-hidden="true">
      <div class="drawer-backdrop" aria-hidden="true"></div>
      <div class="drawer-panel" role="dialog" aria-modal="true" aria-label="Menú de navegación">
        <div class="drawer-header">
          <div class="brand-logo">
            <div class="brand-emblem">S</div>
            <div class="brand-text">
              <span class="brand-title">${restaurantConfig.brandName}</span>
              <span class="brand-subtitle">Carta Digital</span>
            </div>
          </div>
          <button type="button" class="drawer-close-btn" aria-label="Cerrar menú de navegación">
            ${getIconSvg('close', { width: 20, height: 20, className: 'luxury-svg-icon' })}
          </button>
        </div>

        <nav class="drawer-nav" aria-label="Navegación móvil">
          <a href="#carta" class="drawer-link">
            <span>Carta Digital</span>
            ${getIconSvg('arrow-right', { width: 14, height: 14, className: 'luxury-svg-icon' })}
          </a>
          <a href="#experiencias" class="drawer-link">
            <span>Experiencias & Banquetes</span>
            ${getIconSvg('arrow-right', { width: 14, height: 14, className: 'luxury-svg-icon' })}
          </a>
          <a href="#historia" class="drawer-link">
            <span>Nuestra Historia</span>
            ${getIconSvg('arrow-right', { width: 14, height: 14, className: 'luxury-svg-icon' })}
          </a>
          <a href="#ubicacion" class="drawer-link">
            <span>Dónde Encontrarnos</span>
            ${getIconSvg('arrow-right', { width: 14, height: 14, className: 'luxury-svg-icon' })}
          </a>
          <a href="#redes" class="drawer-link">
            <span>Sigue la Experiencia</span>
            ${getIconSvg('arrow-right', { width: 14, height: 14, className: 'luxury-svg-icon' })}
          </a>
        </nav>

        <div class="drawer-footer">
          <a 
            href="${restaurantConfig.location.googleMapsUrl}" 
            target="_blank" 
            rel="noopener noreferrer" 
            class="btn-primary drawer-btn-maps"
          >
            <span>${getIconSvg('pin', { width: 16, height: 16, className: 'luxury-svg-icon' })}</span>
            <span>Abrir en Google Maps</span>
          </a>
          <div class="drawer-schedule">
            ${getIconSvg('clock', { width: 14, height: 14, className: 'luxury-svg-icon' })}
            <span>${restaurantConfig.location.schedule}</span>
          </div>
        </div>
      </div>
    </div>
  `;

  // Drawer interaction handlers
  const toggleBtn = header.querySelector('.header-menu-toggle');
  const drawer = header.querySelector('.header-mobile-drawer');
  const closeBtn = header.querySelector('.drawer-close-btn');
  const backdrop = header.querySelector('.drawer-backdrop');

  const openDrawer = () => {
    if (!drawer || !toggleBtn) return;
    drawer.classList.add('is-open');
    toggleBtn.setAttribute('aria-expanded', 'true');
    drawer.setAttribute('aria-hidden', 'false');
    if (typeof document !== 'undefined' && document.body) {
      document.body.classList.add('drawer-open');
    }
  };

  const closeDrawer = () => {
    if (!drawer || !toggleBtn) return;
    drawer.classList.remove('is-open');
    toggleBtn.setAttribute('aria-expanded', 'false');
    drawer.setAttribute('aria-hidden', 'true');
    if (typeof document !== 'undefined' && document.body) {
      document.body.classList.remove('drawer-open');
    }
  };

  if (toggleBtn) {
    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = drawer && drawer.classList.contains('is-open');
      if (isOpen) {
        closeDrawer();
      } else {
        openDrawer();
      }
    });
  }

  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  if (backdrop) backdrop.addEventListener('click', closeDrawer);

  // Smooth scroll handler for internal navigation anchors
  const handleAnchorClick = (e) => {
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
      closeDrawer();
      if (typeof window !== 'undefined' && window.history && window.history.pushState) {
        window.history.pushState(null, '', href);
      }
    }
  };

  header.addEventListener('click', handleAnchorClick);

  return header;
}
