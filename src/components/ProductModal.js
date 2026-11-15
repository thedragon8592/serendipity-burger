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
          <span class="modal-sub-label">Personaliza tu plato (Toca para calcular adicionales)</span>
          <p class="modal-sub-hint">Selecciona adicionales para ver el cálculo estimado en mesa:</p>
          <div class="modal-additions-grid" id="modal-additions-grid"></div>
          <div class="modal-calc-box" id="modal-calc-box" style="display: none;">
            <span class="modal-calc-label">Total estimado con adicionales:</span>
            <span class="modal-calc-amount" id="modal-calc-amount">S/. 0.00</span>
            <p class="modal-calc-tip">Indica estos adicionales directamente a tu mozo al ordenar.</p>
          </div>
        </div>

        <div class="modal-cremas-block" id="modal-cremas-block">
          <span class="modal-sub-label">Cremas de la Casa (Toca para elegir)</span>
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
    const calcBox = modalOverlay.querySelector('#modal-calc-box');
    const calcAmount = modalOverlay.querySelector('#modal-calc-amount');

    if (isSavory) {
      additionsBlock.style.display = 'block';
      if (calcBox) calcBox.style.display = 'none';

      const basePrice = (typeof item.price === 'number') ? item.price : 0;
      let selectedAdditionsTotal = 0;

      const sampleAdditions = burgerCustomizationData.categories[0].items.slice(0, 8);
      additionsGrid.innerHTML = sampleAdditions.map((add, idx) => `
        <button type="button" class="modal-add-item" data-price="${add.price}" data-idx="${idx}" aria-pressed="false">
          <span class="modal-add-check-wrap"><svg class="modal-add-check" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg></span>
          <span class="modal-add-name">${add.name}</span>
          <span class="modal-add-price">+S/. ${add.price.toFixed(2)}</span>
        </button>
      `).join('');

      const addButtons = additionsGrid.querySelectorAll('.modal-add-item');
      addButtons.forEach(btn => {
        btn.addEventListener('click', () => {
          const isSelected = btn.classList.toggle('is-selected');
          btn.setAttribute('aria-pressed', isSelected ? 'true' : 'false');
          const addPrice = parseFloat(btn.getAttribute('data-price')) || 0;
          
          if (isSelected) {
            selectedAdditionsTotal += addPrice;
          } else {
            selectedAdditionsTotal -= addPrice;
          }

          if (selectedAdditionsTotal > 0 && basePrice > 0) {
            if (calcBox) calcBox.style.display = 'block';
            if (calcAmount) calcAmount.innerHTML = `S/. ${(basePrice + selectedAdditionsTotal).toFixed(2)}`;
          } else {
            if (calcBox) calcBox.style.display = 'none';
          }
        });
      });

      cremasBlock.style.display = 'block';
      cremasPills.innerHTML = burgerCustomizationData.cremas.map(c => `
        <button type="button" class="crema-chip" aria-pressed="false">${c.name}</button>
      `).join('');

      const cremaChips = cremasPills.querySelectorAll('.crema-chip');
      cremaChips.forEach(chip => {
        chip.addEventListener('click', () => {
          const active = chip.classList.toggle('is-selected');
          chip.setAttribute('aria-pressed', active ? 'true' : 'false');
        });
      });
    } else {
      additionsBlock.style.display = 'none';
      cremasBlock.style.display = 'none';
      if (calcBox) calcBox.style.display = 'none';
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
