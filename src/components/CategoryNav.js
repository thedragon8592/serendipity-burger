import { menuCategories } from '../data/menu.js';
import { getIconSvg } from './icons.js';

export function createCategoryNav(onSearchChange, onCategorySelect) {
  const wrapper = document.createElement('div');
  wrapper.id = 'menu-nav';
  wrapper.className = 'menu-controls-wrapper';

  wrapper.innerHTML = `
    <div class="container" id="carta">
      <div class="search-container">
        <div class="search-input-wrapper">
          <span class="search-icon" aria-hidden="true">${getIconSvg('search', { width: 18, height: 18 })}</span>
          <input 
            type="search" 
            class="search-input" 
            placeholder="Buscar hamburguesas, cortes parrilleros, cócteles, postres..." 
            aria-label="Buscar productos de la carta"
            autocomplete="off"
            spellcheck="false"
          />
          <button type="button" class="search-clear-btn" aria-label="Limpiar búsqueda">${getIconSvg('close', { width: 14, height: 14 })}</button>
        </div>
      </div>

      <nav class="category-nav-scroll" aria-label="Categorías de la carta">
        <button type="button" class="category-pill active" data-category="all">
          <span class="pill-icon" aria-hidden="true">${getIconSvg('star', { width: 16, height: 16 })}</span>
          <span class="pill-label">Ver Todo</span>
        </button>
        ${menuCategories.map(cat => `
          <button type="button" class="category-pill" data-category="${cat.id}">
            <span class="pill-icon" aria-hidden="true">${getIconSvg(cat.iconKey || 'burger', { width: 16, height: 16 })}</span>
            <span class="pill-label">${cat.name}</span>
          </button>
        `).join('')}
      </nav>
    </div>
  `;

  const searchInput = wrapper.querySelector('.search-input');
  const clearBtn = wrapper.querySelector('.search-clear-btn');
  const pills = wrapper.querySelectorAll('.category-pill');

  searchInput.addEventListener('input', (e) => {
    const rawVal = (e && e.target && e.target.value !== undefined) ? e.target.value : searchInput.value;
    const val = (rawVal || '').trim();
    clearBtn.style.display = rawVal ? 'block' : 'none';
    if (onSearchChange) onSearchChange(val);
  });

  clearBtn.addEventListener('click', () => {
    searchInput.value = '';
    clearBtn.style.display = 'none';
    if (typeof searchInput.focus === 'function') {
      searchInput.focus();
    }
    if (onSearchChange) onSearchChange('');
  });

  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      pills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const catId = pill.getAttribute('data-category');
      
      // Auto-centrar la píldora en pantallas móviles
      if (typeof pill.scrollIntoView === 'function') {
        pill.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }

      if (onCategorySelect) onCategorySelect(catId);
    });
  });

  return wrapper;
}
