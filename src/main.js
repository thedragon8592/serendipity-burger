import './styles/reset.css';
import './styles/main.css';

import { createHeader } from './components/Header.js';
import { createHero } from './components/Hero.js';
import { createBanquetShowcase } from './components/BanquetShowcase.js';
import { createCategoryNav } from './components/CategoryNav.js';
import { createMenuSection } from './components/MenuSection.js';
import { createCustomizationGuide } from './components/CustomizationGuide.js';
import { createBrandStory } from './components/BrandStory.js';
import { createLocationSection } from './components/LocationSection.js';
import { createSocialSection } from './components/SocialSection.js';
import { createFooter } from './components/Footer.js';
import { createProductModal } from './components/ProductModal.js';
import { getIconSvg } from './components/icons.js';

document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('app');
  if (!app) return;

  // Estado del catálogo digital
  let currentCategory = 'all';
  let currentSearch = '';

  // Instanciar modal de ficha gastronómica
  const productModal = createProductModal();
  document.body.appendChild(productModal.element);

  // Instanciar el visualizador de la carta con apertura de modal
  const menuViewer = createMenuSection((item, categoryName) => {
    productModal.open(item, categoryName);
  });

  // Callbacks para búsqueda en tiempo real y selección de categoría
  const handleSearchChange = (query) => {
    currentSearch = query;
    menuViewer.update(currentCategory, currentSearch);
  };

  const handleCategorySelect = (categoryId) => {
    currentCategory = categoryId;
    
    if (categoryId === 'adicionales') {
      menuViewer.update('all', currentSearch);
      const adicionSection = document.getElementById('cat-adicionales');
      if (adicionSection && typeof adicionSection.scrollIntoView === 'function') {
        adicionSection.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }

    menuViewer.update(currentCategory, currentSearch);

    // Si se seleccionó una categoría específica distinta de 'all', hacer scroll suave al contenido
    if (categoryId !== 'all') {
      const targetEl = document.getElementById(`cat-${categoryId}`);
      if (targetEl && typeof targetEl.scrollIntoView === 'function') {
        targetEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Callback cuando se hace clic en una tarjeta del Hero
  const handleHeroCategoryClick = (catId) => {
    const navPill = document.querySelector(`.category-pill[data-category="${catId}"]`);
    if (navPill) {
      document.querySelectorAll('.category-pill').forEach(p => p.classList.remove('active'));
      navPill.classList.add('active');
      if (typeof navPill.scrollIntoView === 'function') {
        navPill.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
    handleCategorySelect(catId);
    const cartaEl = document.getElementById('carta');
    if (cartaEl && typeof cartaEl.scrollIntoView === 'function') {
      cartaEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Montar componentes en orden jerárquico
  app.appendChild(createHeader());
  app.appendChild(createHero(handleHeroCategoryClick));
  app.appendChild(createBanquetShowcase());
  app.appendChild(createCategoryNav(handleSearchChange, handleCategorySelect));
  app.appendChild(menuViewer.element);
  app.appendChild(createCustomizationGuide());
  app.appendChild(createBrandStory());
  app.appendChild(createLocationSection());
  app.appendChild(createSocialSection());
  app.appendChild(createFooter());

  // Barra de navegación flotante inferior para smartphones (Experiencia Premium Mobile-First)
  const mobileBar = document.createElement('div');
  mobileBar.className = 'mobile-bottom-bar';
  mobileBar.setAttribute('aria-label', 'Acceso rápido móvil');
  mobileBar.innerHTML = `
    <a href="#carta" class="mobile-bar-btn" aria-label="Ir a la carta">
      <span class="bar-icon">${getIconSvg('book', { width: 18, height: 18 })}</span>
      <span class="bar-label">Carta</span>
    </a>
    <a href="#experiencias" class="mobile-bar-btn" aria-label="Ir a banquetes">
      <span class="bar-icon">${getIconSvg('grill', { width: 18, height: 18 })}</span>
      <span class="bar-label">Banquetes</span>
    </a>
    <a href="#ubicacion" class="mobile-bar-btn" aria-label="Ver ubicación y mapa">
      <span class="bar-icon">${getIconSvg('pin', { width: 18, height: 18 })}</span>
      <span class="bar-label">Ubícanos</span>
    </a>
    <a href="#redes" class="mobile-bar-btn" aria-label="Ir a redes sociales">
      <span class="bar-icon">${getIconSvg('social', { width: 18, height: 18 })}</span>
      <span class="bar-label">Síguenos</span>
    </a>
  `;
  document.body.appendChild(mobileBar);

  // Botón flotante para regresar arriba
  const floatingBtn = document.createElement('a');
  floatingBtn.href = '#inicio';
  floatingBtn.className = 'floating-menu-btn';
  floatingBtn.setAttribute('aria-label', 'Regresar al inicio');
  floatingBtn.innerHTML = `<span>${getIconSvg('arrow-right', { width: 16, height: 16, className: 'rotate-up' })}</span><span>Inicio</span>`;
  document.body.appendChild(floatingBtn);

  // Listener de scroll para visibilidad del botón flotante
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY || 0;
    if (scrollY > 600) {
      floatingBtn.classList.add('visible');
    } else {
      floatingBtn.classList.remove('visible');
    }
  }, { passive: true });
});
