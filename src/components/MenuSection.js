import { menuCategories, menuItems } from '../data/menu.js';
import { getIconSvg } from './icons.js';

function sanitizeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

const normalize = (str) => (str || '').normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();

export function createMenuSection(onItemClick) {
  const container = document.createElement('div');
  container.id = 'menu-content';
  container.className = 'container';

  function render(filterCategory = 'all', searchQuery = '') {
    container.innerHTML = '';
    const query = normalize(searchQuery);

    let filteredItems = menuItems;
    if (query) {
      filteredItems = filteredItems.filter(item => {
        const name = normalize(item.name);
        const desc = normalize(item.description);
        const subcat = normalize(item.subcategoryName);
        return name.includes(query) || desc.includes(query) || subcat.includes(query);
      });
    }

    const categoriesToDisplay = (filterCategory === 'all' || !filterCategory)
      ? menuCategories.filter(cat => cat.id !== 'adicionales') // Adicionales tiene su sección dedicada
      : menuCategories.filter(cat => cat.id === filterCategory);

    const visibleCategoryIds = new Set(categoriesToDisplay.map(cat => cat.id));
    const visibleMatchingItems = filteredItems.filter(item => visibleCategoryIds.has(item.categoryId));

    if (query && visibleMatchingItems.length === 0) {
      const sanitized = sanitizeHtml(searchQuery);
      container.innerHTML = `
        <div class="search-empty-state" style="text-align: center; padding: 4.5rem 1rem;">
          <div class="search-empty-icon" style="margin-bottom: 1.25rem; color: var(--clr-gold-champagne);">${getIconSvg('search', { width: 44, height: 44 })}</div>
          <h3 class="search-empty-title" style="color: var(--clr-cream-light); margin-bottom: 0.6rem; font-family: var(--font-serif); font-size: 1.45rem;">
            No encontramos platos que coincidan con tu búsqueda
          </h3>
          <p class="search-empty-desc" style="color: var(--clr-cream-dim); font-size: 0.92rem; max-width: 540px; margin: 0 auto; line-height: 1.6;">
            No encontramos platos con "${sanitized}". Prueba buscando otra opción como hamburguesa, parrilla, postre o sangría.
          </p>
        </div>
      `;
      return;
    }

    // Mapa para asociar elementos con items
    const renderedItemMap = new Map();

    // Vitrina destacada de Promos & Imperdibles al inicio de la carta
    if ((filterCategory === 'all' || !filterCategory) && !query) {
      const promoIds = [
        'coctel-sangria-jarra-chica',
        'coctel-sangria-jarra-grande',
        'p-alitas-acevichada',
        'h-serendipity',
        'postre-crema-volteada',
        'p-mega-parrilla'
      ];
      const promoItems = promoIds.map(id => menuItems.find(m => m.id === id)).filter(Boolean);

      if (promoItems.length > 0) {
        const promoShelf = document.createElement('section');
        promoShelf.className = 'featured-promos-shelf';
        promoShelf.id = 'promos-destacadas';

        const promoCardsHtml = promoItems.map(item => {
          renderedItemMap.set(item.id, { item, categoryName: 'Promociones' });

          let badgeText = 'PROMO ESPECIAL';
          if (item.id === 'coctel-sangria-jarra-chica') badgeText = 'PROMO CON ALCOHOL';
          else if (item.id === 'coctel-sangria-jarra-grande') badgeText = 'IDEAL PARA COMPARTIR';
          else if (item.id === 'p-alitas-acevichada') badgeText = 'FAVORITO CRIOLLO';
          else if (item.id === 'h-serendipity') badgeText = 'SIGNATURE BURGER';
          else if (item.id === 'postre-crema-volteada') badgeText = 'POSTRE ARTESANAL';
          else if (item.id === 'p-mega-parrilla') badgeText = 'FESTIVAL A LA PARRILLA';

          const formattedPrice = (typeof item.price === 'number') ? item.price.toFixed(2) : (item.priceNote || '');

          return `
            <article class="promo-card" data-item-id="${item.id}" tabindex="0" role="button" aria-label="${item.name}, ver detalle">
              <div class="promo-card-top-badge">
                <span class="promo-tag">${badgeText}</span>
              </div>
              <h4 class="promo-card-title">${item.name}</h4>
              <p class="promo-card-desc">${item.description || ''}</p>
              <div class="promo-card-bottom">
                <span class="promo-card-price" aria-label="S/. ${formattedPrice}"><span class="currency">S/</span> <span class="amount">${formattedPrice}</span></span>
                <span class="promo-card-action">Ver detalle →</span>
              </div>
            </article>
          `;
        }).join('');

        promoShelf.innerHTML = `
          <div class="promos-shelf-header">
            <span class="promos-shelf-tag">IMPERDIBLES EN MESA</span>
            <h3 class="promos-shelf-title">Promos & Favoritos de la Casa</h3>
            <p class="promos-shelf-desc">Lo más pedido de nuestra carta listo para pedir sin dar vueltas.</p>
          </div>
          <div class="promos-carousel-track">
            ${promoCardsHtml}
          </div>
        `;

        container.appendChild(promoShelf);
      }
    }

    // Botón para volver a ver todas las categorías si hay un filtro específico activo
    if (filterCategory && filterCategory !== 'all' && !query) {
      const activeBanner = document.createElement('div');
      activeBanner.className = 'category-active-banner';
      activeBanner.innerHTML = `
        <button type="button" class="btn-back-all-cats">
          <span>← Ver toda la carta</span>
        </button>
      `;
      const backBtn = activeBanner.querySelector('.btn-back-all-cats');
      backBtn.addEventListener('click', () => {
        const allPill = document.querySelector('.category-pill[data-category="all"]');
        if (allPill) allPill.click();
      });
      container.appendChild(activeBanner);
    }

    categoriesToDisplay.forEach(category => {
      const catItems = filteredItems.filter(item => item.categoryId === category.id);
      if (catItems.length === 0) return;

      const groupSection = document.createElement('section');
      groupSection.className = 'menu-group';
      groupSection.id = `cat-${category.id}`;

      // Agrupar items por subcategoría para una experiencia editorial limpia
      const subcategoriesMap = new Map();
      catItems.forEach(item => {
        const subcatKey = item.subcategoryId || 'general';
        const subcatName = item.subcategoryName || category.name;
        if (!subcategoriesMap.has(subcatKey)) {
          subcategoriesMap.set(subcatKey, { name: subcatName, items: [] });
        }
        subcategoriesMap.get(subcatKey).items.push(item);
      });

      const renderCard = (item) => {
        renderedItemMap.set(item.id, { item, categoryName: category.name });

        let priceHtml = '';
        if (item.price !== null && item.price !== undefined) {
          const formattedNum = item.price.toFixed(2);
          priceHtml = `<span class="menu-item-price" aria-label="S/. ${formattedNum}"><span class="currency">S/</span> <span class="amount">${formattedNum}</span></span>`;
        } else {
          const note = item.priceNote || 'Consultar';
          priceHtml = `<span class="menu-item-price" aria-label="${note}"><span class="amount-note">${note}</span></span>`;
        }

        let tagsHtml = '';
        if (item.badge) {
          tagsHtml = `<div class="menu-item-tags"><span class="item-badge signature">${item.badge}</span></div>`;
        }

        return `
          <article class="menu-card" data-item-id="${item.id}" tabindex="0" role="button" aria-label="${item.name}, ver detalles">
            <div class="menu-card-top">
              <h4 class="menu-item-name">${item.name}</h4>
              ${priceHtml}
            </div>
            ${item.description ? `<p class="menu-item-desc">${item.description}</p>` : ''}
            <div class="menu-card-bottom-row">
              ${tagsHtml}
              <span class="card-tap-hint">Ver detalle ${getIconSvg('arrow-right', { width: 12, height: 12 })}</span>
            </div>
          </article>
        `;
      };

      const hasDistinctSubcategories = subcategoriesMap.size > 1 || 
        (subcategoriesMap.size === 1 && Array.from(subcategoriesMap.values())[0].name !== category.name);

      let subcategoriesHtml = '';

      if (hasDistinctSubcategories) {
        subcategoriesHtml = Array.from(subcategoriesMap.values()).map(subcat => {
          const cards = subcat.items.map(renderCard).join('');
          return `
            <div class="subcategory-block">
              <div class="subcategory-header-wrap">
                <h4 class="subcategory-title">${subcat.name}</h4>
                <span class="subcategory-items-count">${subcat.items.length} ${subcat.items.length === 1 ? 'opción' : 'opciones'}</span>
              </div>
              <div class="items-grid">
                ${cards}
              </div>
            </div>
          `;
        }).join('');
      } else {
        const cards = catItems.map(renderCard).join('');
        subcategoriesHtml = `
          <div class="items-grid">
            ${cards}
          </div>
        `;
      }

      groupSection.innerHTML = `
        <div class="category-header-wrap">
          <h3 class="category-title">
            <span>${getIconSvg(category.iconKey || 'burger')}</span>
            <span>${category.name}</span>
          </h3>
          <span class="category-items-count">${catItems.length} opciones</span>
        </div>
        ${subcategoriesHtml}
      `;

      container.appendChild(groupSection);
    });

    // Delegar eventos de clic en las tarjetas y promociones
    container.querySelectorAll('.menu-card, .promo-card').forEach(card => {
      const clickHandler = () => {
        const itemId = card.getAttribute('data-item-id');
        const match = renderedItemMap.get(itemId);
        if (match && onItemClick) {
          onItemClick(match.item, match.categoryName);
        }
      };

      card.addEventListener('click', clickHandler);
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          clickHandler();
        }
      });
    });
  }

  // Render inicial
  render('all', '');

  return {
    element: container,
    update: render
  };
}
