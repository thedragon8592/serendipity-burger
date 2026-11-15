import { burgerCustomizationData } from '../data/menu.js';
import { getIconSvg } from './icons.js';

/**
 * ProductModal - Ficha detallada del plato para ver en mesa
 * Muestra la información real del plato sin textos inventados.
 */
export function createProductModal() {
  const modalOverlay = document.createElement('div');
  modalOverlay.id = 'product-modal';
  modalOverlay.className = 'product-modal-overlay';
  modalOverlay.setAttribute('aria-hidden', 'true');

  modalOverlay.innerHTML = `
    <div class="product-modal-container" role="dialog" aria-modal="true" aria-labelledby="modal-dish-title">
      <button type="button" class="modal-close-btn" aria-label="Cerrar detalle">
        ${getIconSvg('close', { width: 18, height: 18 })}
      </button>

      <div class="modal-header-visual">
        <span class="modal-category-badge" id="modal-dish-category">Categoría</span>
        <h3 class="modal-dish-title" id="modal-dish-title">Nombre del Plato</h3>
        <div class="modal-price-tag" id="modal-dish-price">S/. 0.00</div>
      </div>

      <div class="modal-body-content">
        <div class="modal-desc-block" id="modal-desc-block">
          <span class="modal-sub-label">Ingredientes / Descripción</span>
          <p class="modal-dish-desc" id="modal-dish-desc"></p>
        </div>

        <div class="modal-suggested-block" id="modal-suggested-block">
          <span class="modal-sub-label">Adicionales disponibles</span>
          <p class="modal-sub-hint">Puedes pedir al mozo agregar adicionales a tu gusto:</p>
          <div class="modal-additions-grid" id="modal-additions-grid"></div>
        </div>

        <div class="modal-cremas-block" id="modal-cremas-block">
          <span class="modal-sub-label">Cremas de la Casa</span>
          <div class="modal-cremas-pills" id="modal-cremas-pills"></div>
        </div>
      </div>

      <div class="modal-footer-action">
        <button type="button" class="btn-modal-close">
          <span>Volver a la Carta</span>
        </button>
      </div>
    </div>
  `;

  const closeBtn = modalOverlay.querySelector('.modal-close-btn');
  const footerCloseBtn = modalOverlay.querySelector('.btn-modal-close');

  const closeModal = () => {
    modalOverlay.classList.remove('active');
    modalOverlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  closeBtn.addEventListener('click', closeModal);
  footerCloseBtn.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
      closeModal();
    }
  });

  const openModal = (item, categoryName = '') => {
    const titleEl = modalOverlay.querySelector('#modal-dish-title');
    const catEl = modalOverlay.querySelector('#modal-dish-category');
    const priceEl = modalOverlay.querySelector('#modal-dish-price');
    const descBlock = modalOverlay.querySelector('#modal-desc-block');
    const descEl = modalOverlay.querySelector('#modal-dish-desc');
    const additionsBlock = modalOverlay.querySelector('#modal-suggested-block');
    const additionsGrid = modalOverlay.querySelector('#modal-additions-grid');
    const cremasBlock = modalOverlay.querySelector('#modal-cremas-block');
    const cremasPills = modalOverlay.querySelector('#modal-cremas-pills');

    titleEl.textContent = item.name;
    catEl.textContent = item.subcategoryName || categoryName || '';

    if (item.price !== null && item.price !== undefined) {
      priceEl.innerHTML = `<span class="cur">S/</span> <span class="val">${item.price.toFixed(2)}</span>`;
    } else {
      priceEl.innerHTML = `<span class="val">${item.priceNote || 'Consultar con el mozo'}</span>`;
    }

    if (item.description && item.description.trim()) {
      descBlock.style.display = 'block';
      descEl.textContent = item.description;
    } else {
      descBlock.style.display = 'none';
    }

    // Mostrar adicionales para hamburguesas, parrillas y piqueos
    const isSavory = ['hamburguesas', 'parrillas-banquetes', 'piqueos'].includes(item.categoryId);
    if (isSavory) {
      additionsBlock.style.display = 'block';
      const sampleAdditions = burgerCustomizationData.categories[0].items.slice(0, 8);
      additionsGrid.innerHTML = sampleAdditions.map(add => `
        <div class="modal-add-item">
          <span class="modal-add-name">${add.name}</span>
          <span class="modal-add-price">+S/. ${add.price.toFixed(2)}</span>
        </div>
      `).join('');

      cremasBlock.style.display = 'block';
      cremasPills.innerHTML = burgerCustomizationData.cremas.map(c => `
        <span class="crema-chip">${c.name}</span>
      `).join('');
    } else {
      additionsBlock.style.display = 'none';
      cremasBlock.style.display = 'none';
    }

    modalOverlay.classList.add('active');
    modalOverlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  return {
    element: modalOverlay,
    open: openModal,
    close: closeModal
  };
}
