import { restaurantConfig } from '../data/config.js';
import { getIconSvg } from './icons.js';

/**
 * Serendipity Burger — Sección de Ubicación y Horarios
 * Información directa y real con mapa interactivo y botón a Google Maps.
 */
export function createLocationSection() {
  const section = document.createElement('section');
  section.id = 'ubicacion';
  section.className = 'location-section';

  const loc = restaurantConfig.location;

  section.innerHTML = `
    <div class="container">
      <div class="section-header">
        <span class="section-pretitle">VISÍTANOS</span>
        <h2 class="section-title">${loc.title}</h2>
        <p class="section-subtitle">
          Te esperamos para disfrutar de nuestra carta completa en mesa o para llevar.
        </p>
      </div>

      <div class="location-grid">
        <div class="location-info-card">
          <div class="location-card-header">
            <span class="location-chip">
              ${getIconSvg('spark', { width: 14, height: 14, className: 'luxury-svg-icon' })}
              <span>Servicio en Salón</span>
            </span>
          </div>

          <div class="info-block">
            <span class="info-label">
              ${getIconSvg('clock', { width: 16, height: 16, className: 'luxury-svg-icon' })}
              <span>Horarios de Atención</span>
            </span>
            <div class="info-value">${loc.schedule}</div>
            <div class="info-sub">${loc.reference}</div>
          </div>

          <div class="info-block">
            <span class="info-label">
              ${getIconSvg('pin', { width: 16, height: 16, className: 'luxury-svg-icon' })}
              <span>Ubicación</span>
            </span>
            <div class="info-value">${loc.address}</div>
            <div class="info-sub">Abre la ruta directa en tu aplicación de mapas</div>
          </div>

          <div class="location-action-wrap" style="margin-top: 1.5rem;">
            <a 
              href="${loc.googleMapsUrl}" 
              target="_blank" 
              rel="noopener noreferrer" 
              class="location-cta-btn btn-primary" 
              style="width: 100%; text-align: center; justify-content: center;"
              aria-label="Abrir ubicación en Google Maps"
            >
              <span>${getIconSvg('compass', { width: 18, height: 18 })}</span>
              <span>Abrir en Google Maps</span>
            </a>
          </div>
        </div>

        <div class="map-container">
          <iframe 
            src="${loc.embedMapUrl}" 
            loading="lazy" 
            allowfullscreen=""
            referrerpolicy="no-referrer-when-downgrade" 
            title="Ubicación oficial de Serendipity Burger en Google Maps"
            aria-label="Mapa de Google Maps"
          ></iframe>
        </div>
      </div>
    </div>
  `;

  return section;
}
