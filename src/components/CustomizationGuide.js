import { burgerCustomizationData } from '../data/menu.js';
import { getIconSvg } from './icons.js';

export function createCustomizationGuide() {
  const section = document.createElement('section');
  section.id = 'cat-adicionales';
  section.className = 'customization-section';

  const groupsHtml = burgerCustomizationData.categories.map(cat => `
    <div class="custom-group-column">
      <h4 class="custom-group-title">
        <span>${cat.group}</span>
      </h4>
      <div class="custom-items-list">
        ${cat.items.map(item => `
          <div class="custom-item-row">
            <span class="custom-item-name">${item.name}</span>
            <span class="custom-item-price" aria-label="+ S/. ${item.price.toFixed(2)}"><span class="currency">+ S/</span> <span class="amount">${item.price.toFixed(2)}</span></span>
          </div>
        `).join('')}
      </div>
    </div>
  `).join('');

  const cremasHtml = burgerCustomizationData.cremas.map(crema => `
    <span class="crema-pill">${crema.name}</span>
  `).join('');

  section.innerHTML = `
    <div class="container">
      <div class="customization-panel">
        <div class="section-header" style="margin-bottom: 1.5rem;">
          <span class="section-pretitle">A TU PREFERENCIA</span>
          <h2 class="section-title">Adicionales</h2>
          <p class="section-subtitle">Personaliza tu hamburguesa o plato con los adicionales y carnes extras que desees.</p>
        </div>

        <div class="custom-groups-grid">
          ${groupsHtml}
        </div>

        <div class="cremas-highlight">
          <h4 class="cremas-title">Cremas de la Casa</h4>
          <p class="cremas-subtitle">Acompaña tu pedido con nuestras salsas clásicas y de la casa</p>
          <div class="cremas-pills-wrap">
            ${cremasHtml}
          </div>
        </div>
      </div>
    </div>
  `;

  return section;
}
