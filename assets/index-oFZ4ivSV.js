(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))c(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const n of i.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&c(n)}).observe(document,{childList:!0,subtree:!0});function o(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function c(s){if(s.ep)return;s.ep=!0;const i=o(s);fetch(s.href,i)}})();const f={brandName:"Serendipity Burger",slogan:"Una experiencia de sabor que empieza desde el primer vistazo",location:{title:"Dónde Encontrarnos",address:"Ubicación disponible en Google Maps",reference:"Atención en salón y pedidos para llevar",schedule:"Lunes a Domingo · 5:00 PM - 11:30 PM",googleMapsUrl:"https://maps.google.com/?q=Serendipity+Burger",embedMapUrl:"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3901.8!2d-77.0!3d-12.0!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDAwJzAwLjAiUyA3N8KwMDAnMDAuMCJX!5e0!3m2!1ses!2spe!4v1"},social:{instagram:{name:"Instagram",handle:"@serendipityburger.pe",url:"https://instagram.com",label:"Síguenos en Instagram"},facebook:{name:"Facebook",handle:"Serendipity Burger Oficial",url:"https://facebook.com",label:"Visítanos en Facebook"},tiktok:{name:"TikTok",handle:"@serendipityburger",url:"https://tiktok.com",label:"Míranos en TikTok"}},story:{tagline:"NUESTRA HISTORIA",title:"Un libro abierto donde tú eres parte de la historia",paragraphs:["Somos un equipo entrenado y capacitado para brindar uno de los mejores productos y servicios de la zona. En Serendipity Burger tratamos de que encuentres algo que se acomode a tu gusto y necesidad, esperando que sea de tu agrado y superando las expectativas.","Somos selectivos, ya que garantizamos confiabilidad en nuestros productos, utilizando las mejores materias primas del mercado, para satisfacer a toda nuestra gama de posibles clientes.","Serendipity Burger es un libro abierto, que irá registrando las mejores de las historias y les brinda la bienvenida para formar parte de ellas..."],highlight:"“Recibiéndolos siempre con una sonrisa. Serendipity Burger los espera...”"}},q={burger:`
    <path d="M3 11h18"/>
    <path d="M5 11a7 7 0 0 1 14 0"/>
    <path d="M4 18h16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Z"/>
    <path d="M4 14h16"/>
  `,grill:`
    <circle cx="12" cy="12" r="10"/>
    <path d="m8 8 8 8"/>
    <path d="m16 8-8 8"/>
    <path d="M12 2v20"/>
  `,flame:`
    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>
  `,crown:`
    <path d="M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.735H5.81a1 1 0 0 1-.957-.735L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z"/>
  `,spark:`
    <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z"/>
  `,cloche:`
    <path d="M3 18h18"/>
    <path d="M4 18a8 8 0 0 1 16 0"/>
    <path d="M12 4v2"/>
    <circle cx="12" cy="4" r="1"/>
  `,fries:`
    <path d="M18 2v8a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V2"/>
    <path d="M6 2v6"/>
    <path d="M10 2v6"/>
    <path d="M14 2v6"/>
    <path d="M10 14v8"/>
  `,sliders:`
    <line x1="4" x2="4" y1="21" y2="14"/>
    <line x1="4" x2="4" y1="10" y2="3"/>
    <line x1="12" x2="12" y1="21" y2="12"/>
    <line x1="12" x2="12" y1="8" y2="3"/>
    <line x1="20" x2="20" y1="21" y2="16"/>
    <line x1="20" x2="20" y1="12" y2="3"/>
    <line x1="1" x2="7" y1="14" y2="14"/>
    <line x1="9" x2="15" y1="8" y2="8"/>
    <line x1="17" x2="23" y1="16" y2="16"/>
  `,sundae:`
    <path d="M7 21h10"/>
    <path d="M12 17v4"/>
    <path d="m5 3 7 14 7-14Z"/>
    <path d="M5 3h14"/>
  `,cocktail:`
    <path d="M8 22h8"/>
    <path d="M12 15v7"/>
    <path d="m4 4 8 11 8-11Z"/>
    <path d="M3 4h18"/>
  `,carafe:`
    <path d="M15 2H9a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1Z"/>
    <path d="M6 6h12l-1.5 14.5a2 2 0 0 1-2 1.5H9.5a2 2 0 0 1-2-1.5Z"/>
  `,dessert:`
    <path d="M12 21a9 9 0 0 0 9-9H3a9 9 0 0 0 9 9Z"/>
    <path d="M12 3a9 9 0 0 1 9 9H3a9 9 0 0 1 9-9Z"/>
  `,cup:`
    <path d="M17 8h1a4 4 0 1 1 0 8h-1"/>
    <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"/>
    <line x1="6" x2="6" y1="2" y2="4"/>
    <line x1="10" x2="10" y1="2" y2="4"/>
    <line x1="14" x2="14" y1="2" y2="4"/>
  `,wine:`
    <path d="M8 2h8v4H8z"/>
    <path d="M6 6h12l1 15H5z"/>
    <path d="M6 13h12"/>
  `,beverage:`
    <path d="M8 22h8"/>
    <path d="M12 15v7"/>
    <path d="m4 4 8 11 8-11Z"/>
    <path d="M3 4h18"/>
  `,book:`
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
  `,pin:`
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
    <circle cx="12" cy="10" r="3"/>
  `,clock:`
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12 6 12 12 16 14"/>
  `,compass:`
    <circle cx="12" cy="12" r="10"/>
    <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>
  `,guests:`
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  `,search:`
    <circle cx="11" cy="11" r="8"/>
    <path d="m21 21-4.3-4.3"/>
  `,close:`
    <path d="M18 6 6 18"/>
    <path d="m6 6 12 12"/>
  `,star:`
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  `,quote:`
    <path d="M3 21c3 0 7-1 7-8V5c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2 0 4-1.5 6-3 8z"/>
    <path d="M15 21c3 0 7-1 7-8V5c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2 0 4-1.5 6-3 8z"/>
  `,check:`
    <polyline points="20 6 9 17 4 12"/>
  `,"arrow-right":`
    <line x1="5" y1="12" x2="19" y2="12"/>
    <polyline points="12 5 19 12 12 19"/>
  `,"social-instagram":`
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  `,"social-facebook":`
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  `,"social-tiktok":`
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/>
  `};function t(a,e={}){const o=q[a]||q.spark,c=e.width||18,s=e.height||18,i=e.strokeWidth||1.5,n=e.className?` class="${e.className}"`:' class="luxury-svg-icon"',b=e.color?` stroke="${e.color}"`:' stroke="currentColor"';return`<svg xmlns="http://www.w3.org/2000/svg" width="${c}" height="${s}" viewBox="0 0 24 24" fill="none"${b} stroke-width="${i}" stroke-linecap="round" stroke-linejoin="round"${n} aria-hidden="true">${o.trim()}</svg>`}function $(){const a=document.createElement("header");a.className="site-header",a.innerHTML=`
    <div class="container header-inner">
      <a href="#inicio" class="brand-logo" aria-label="${f.brandName}">
        <div class="brand-emblem">S</div>
        <div class="brand-text">
          <span class="brand-title">${f.brandName}</span>
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
          href="${f.location.googleMapsUrl}" 
          target="_blank" 
          rel="noopener noreferrer" 
          class="header-btn-maps"
          aria-label="Google Maps"
        >
          <span>${t("pin",{width:16,height:16,className:"luxury-svg-icon"})}</span>
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
              <span class="brand-title">${f.brandName}</span>
              <span class="brand-subtitle">Carta Digital</span>
            </div>
          </div>
          <button type="button" class="drawer-close-btn" aria-label="Cerrar menú de navegación">
            ${t("close",{width:20,height:20,className:"luxury-svg-icon"})}
          </button>
        </div>

        <nav class="drawer-nav" aria-label="Navegación móvil">
          <a href="#carta" class="drawer-link">
            <span>Carta Digital</span>
            ${t("arrow-right",{width:14,height:14,className:"luxury-svg-icon"})}
          </a>
          <a href="#experiencias" class="drawer-link">
            <span>Experiencias & Banquetes</span>
            ${t("arrow-right",{width:14,height:14,className:"luxury-svg-icon"})}
          </a>
          <a href="#historia" class="drawer-link">
            <span>Nuestra Historia</span>
            ${t("arrow-right",{width:14,height:14,className:"luxury-svg-icon"})}
          </a>
          <a href="#ubicacion" class="drawer-link">
            <span>Dónde Encontrarnos</span>
            ${t("arrow-right",{width:14,height:14,className:"luxury-svg-icon"})}
          </a>
          <a href="#redes" class="drawer-link">
            <span>Sigue la Experiencia</span>
            ${t("arrow-right",{width:14,height:14,className:"luxury-svg-icon"})}
          </a>
        </nav>

        <div class="drawer-footer">
          <a 
            href="${f.location.googleMapsUrl}" 
            target="_blank" 
            rel="noopener noreferrer" 
            class="btn-primary drawer-btn-maps"
          >
            <span>${t("pin",{width:16,height:16,className:"luxury-svg-icon"})}</span>
            <span>Abrir en Google Maps</span>
          </a>
          <div class="drawer-schedule">
            ${t("clock",{width:14,height:14,className:"luxury-svg-icon"})}
            <span>${f.location.schedule}</span>
          </div>
        </div>
      </div>
    </div>
  `;const e=a.querySelector(".header-menu-toggle"),o=a.querySelector(".header-mobile-drawer"),c=a.querySelector(".drawer-close-btn"),s=a.querySelector(".drawer-backdrop"),i=()=>{!o||!e||(o.classList.add("is-open"),e.setAttribute("aria-expanded","true"),o.setAttribute("aria-hidden","false"),typeof document<"u"&&document.body&&document.body.classList.add("drawer-open"))},n=()=>{!o||!e||(o.classList.remove("is-open"),e.setAttribute("aria-expanded","false"),o.setAttribute("aria-hidden","true"),typeof document<"u"&&document.body&&document.body.classList.remove("drawer-open"))};e&&e.addEventListener("click",m=>{m.stopPropagation(),o&&o.classList.contains("is-open")?n():i()}),c&&c.addEventListener("click",n),s&&s.addEventListener("click",n);const b=m=>{const g=m.target.closest('a[href^="#"]');if(!g)return;const l=g.getAttribute("href");if(!l||l==="#")return;let r=null;l==="#carta"?r=typeof document<"u"?document.getElementById("menu-nav")||document.getElementById("carta"):null:l==="#experiencias"?r=typeof document<"u"?document.getElementById("banquetes")||document.getElementById("experiencias"):null:l==="#inicio"?r=typeof document<"u"?document.getElementById("inicio"):null:typeof document<"u"&&(r=document.querySelector(l)),r&&typeof r.scrollIntoView=="function"&&(m.preventDefault(),r.scrollIntoView({behavior:"smooth"}),n(),typeof window<"u"&&window.history&&window.history.pushState&&window.history.pushState(null,"",l))};return a.addEventListener("click",b),a}function A(a){const e=document.createElement("section");e.id="inicio",e.className="hero-section",e.innerHTML=`
    <div class="hero-backdrop" aria-hidden="true">
      <img src="./images/hero-local.jpg" alt="" class="hero-bg-img" fetchpriority="high" />
      <div class="hero-bg-overlay"></div>
    </div>
    <div class="container hero-content">
      
      <!-- Distintivo Superior / Horario Oficial & Notificación Interactiva -->
      <div class="hero-top-badge">
        <span class="hero-badge-dot"></span>
        <span class="hero-badge-text">Abierto · ${f.location.schedule}</span>
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
        ${f.brandName}
      </h1>

      <h2 class="hero-provocative-title">
        ¿Qué te provoca hoy?
      </h2>

      <p class="hero-tagline">
        ${f.slogan}. Cortes selectos al carbón, hamburguesas a la parrilla, banquetes para compartir y repostería artesanal.
      </p>

      <!-- Botones Principales de Acción Rápida (Pills inspirados en la referencia con nivel cinco estrellas) -->
      <div class="hero-actions">
        <a href="#menu-nav" class="btn-primary">
          <span>${t("book")}</span>
          <span>VER LA CARTA</span>
        </a>
        <a href="#ubicacion" class="btn-secondary">
          <span>${t("pin")}</span>
          <span>DÓNDE ENCONTRARNOS</span>
        </a>
        <a href="#redes" class="btn-secondary btn-pill-social">
          <span>${t("spark")}</span>
          <span>SÍGUENOS</span>
        </a>
      </div>

      <!-- Hallmarks de Alta Cocina / Pilares Gastronómicos -->
      <div class="hallmarks-strip quick-strip">
        <a href="#menu-nav" class="hallmark-item quick-strip-item">
          <span class="hallmark-icon quick-strip-icon">${t("grill",{width:22,height:22})}</span>
          <span class="hallmark-title quick-strip-title">Cortes a la Parrilla</span>
          <span class="hallmark-desc quick-strip-desc">Sabor ahumado & técnica</span>
        </a>
        <a href="#menu-nav" class="hallmark-item quick-strip-item">
          <span class="hallmark-icon quick-strip-icon">${t("cocktail",{width:22,height:22})}</span>
          <span class="hallmark-title quick-strip-title">Jarras de Sangría</span>
          <span class="hallmark-desc quick-strip-desc">Vino tinto & fruta macerada</span>
        </a>
        <a href="#banquetes" class="hallmark-item quick-strip-item">
          <span class="hallmark-icon quick-strip-icon">${t("crown",{width:22,height:22})}</span>
          <span class="hallmark-title quick-strip-title">Experiencia Exclusiva</span>
          <span class="hallmark-desc quick-strip-desc">Servicio en mesa & banquetes</span>
        </a>
      </div>

      <!-- Tarjetas Visuales de Selección Directa (Estilo Rosa Café, nivel 1000x) -->
      <div class="hero-visual-categories">
        <div class="hero-cat-grid">
          
          <button type="button" class="hero-cat-card" data-cat="hamburguesas">
            <div class="hero-cat-icon-wrap">
              ${t("burger",{width:26,height:26})}
            </div>
            <div class="hero-cat-info">
              <span class="hero-cat-title">Hamburguesas</span>
              <span class="hero-cat-desc">A la parrilla & clásicas</span>
            </div>
            <span class="hero-cat-arrow">→</span>
          </button>

          <button type="button" class="hero-cat-card" data-cat="parrillas-banquetes">
            <div class="hero-cat-icon-wrap">
              ${t("grill",{width:26,height:26})}
            </div>
            <div class="hero-cat-info">
              <span class="hero-cat-title">Parrillas & Banquetes</span>
              <span class="hero-cat-desc">Cortes finos & para compartir</span>
            </div>
            <span class="hero-cat-arrow">→</span>
          </button>

          <button type="button" class="hero-cat-card" data-cat="piqueos">
            <div class="hero-cat-icon-wrap">
              ${t("fries",{width:26,height:26})}
            </div>
            <div class="hero-cat-info">
              <span class="hero-cat-title">Piqueos & Salchipapas</span>
              <span class="hero-cat-desc">Especialidades criollas</span>
            </div>
            <span class="hero-cat-arrow">→</span>
          </button>

          <button type="button" class="hero-cat-card" data-cat="cocteles">
            <div class="hero-cat-icon-wrap">
              ${t("cocktail",{width:26,height:26})}
            </div>
            <div class="hero-cat-info">
              <span class="hero-cat-title">Jarras de Sangría</span>
              <span class="hero-cat-desc">Jarra chica S/.15 y grande S/.30</span>
            </div>
            <span class="hero-cat-arrow">→</span>
          </button>

          <button type="button" class="hero-cat-card" data-cat="postres">
            <div class="hero-cat-icon-wrap">
              ${t("dessert",{width:26,height:26})}
            </div>
            <div class="hero-cat-info">
              <span class="hero-cat-title">Postres de Tentación</span>
              <span class="hero-cat-desc">Tortas a S/.13 & Crema Volteada S/.12</span>
            </div>
            <span class="hero-cat-arrow">→</span>
          </button>

          <button type="button" class="hero-cat-card" data-cat="bebidas">
            <div class="hero-cat-icon-wrap">
              ${t("drink",{width:26,height:26})}
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
  `,e.querySelectorAll(".hero-cat-card").forEach(m=>{m.addEventListener("click",()=>{const g=m.getAttribute("data-cat");a&&a(g)})});const c=[{badge:"PROMO DESTACADA",text:"Jarra Chica de Sangría a S/. 15.00 · Jarra Grande S/. 30.00",target:"cocteles"},{badge:"ESPECIALIDAD",text:"Alitas Acevichadas con papas por S/. 18.50",target:"parrillas-banquetes"},{badge:"REPOSTERÍA",text:"Todas las tortas a S/. 13.00 y Crema Volteada a S/. 12.00",target:"postres"},{badge:"ADICIONALES",text:"Personaliza con huevo, tocino o queso desde +S/. 2.00",target:"adicionales"},{badge:"PARA COMPARTIR",text:"Banquete Mega Parrilla para 4 personas a S/. 76.00",target:"parrillas-banquetes"}];let s=0;const i=e.querySelector(".ticker-badge"),n=e.querySelector("#ticker-msg"),b=e.querySelector("#ticker-cta");if(i&&n&&b){const m=r=>{const u=c[r];i.innerHTML=u.badge,n.innerHTML=u.text,b.setAttribute("data-target",u.target)};m(0);let g=setInterval(()=>{s=(s+1)%c.length,m(s)},4500);const l=e.querySelector("#hero-promo-ticker");l&&(l.addEventListener("mouseenter",()=>clearInterval(g)),l.addEventListener("mouseleave",()=>{g=setInterval(()=>{s=(s+1)%c.length,m(s)},4500)})),b.addEventListener("click",r=>{r.preventDefault();const u=b.getAttribute("data-target")||"cocteles";a&&a(u)})}return e}const M=[{id:"hamburguesas",name:"Hamburguesas",macroCategory:"hamburguesas",iconKey:"burger",icon:"",badge:"Artesanales a la Parrilla"},{id:"parrillas-banquetes",name:"Parrillas & Banquetes",macroCategory:"parrillas-banquetes",iconKey:"grill",icon:"",badge:"Cortes & Para Compartir"},{id:"piqueos",name:"Piqueos & Salchipapas",macroCategory:"piqueos",iconKey:"fries",icon:"",badge:"Especialidades Criollas"},{id:"cocteles",name:"Jarras de Sangría",macroCategory:"cocteles",iconKey:"cocktail",icon:"",badge:"Para Compartir en Mesa"},{id:"postres",name:"Postres",macroCategory:"postres",iconKey:"dessert",icon:"",badge:"Peligrosa Tentación"},{id:"bebidas",name:"Jugos & Bebidas",macroCategory:"bebidas",iconKey:"beverage",icon:"",badge:"100% Naturales & Frías"},{id:"adicionales",name:"Personaliza tu Burger",macroCategory:"adicionales",iconKey:"flame",icon:"",badge:"Adicionales & Carnes"}],B=[{id:"banquete-seleccion-premium",name:"Selección Premium de Serendipity",badge:"Sugerencia del Chef",price:66,tagline:"Cortes de selección de primera para paladares exigentes",description:"Lomo fino de Res + Lomo de chancho + Pechuga de pollo + 2 Palitos de Anticucho + Chaufa + Papas fritas + Ensalada + Crema.",servings:"Ideal para 2 a 3 personas",featured:!0},{id:"banquete-mega-parrilla",name:"Mega Parrilla",badge:"Más Solicitado",price:76,tagline:"Experiencia parrillera, fuego lento, punto perfecto",description:"P. Lomo Fino + P. Chancho + P. Pollo + Porción de Mollejitas + 1 Palito de Anticucho + Chorizo + Chaufa + Papas fritas + Ensalada + Cremas.",servings:"Ideal para 3 a 4 personas",featured:!0},{id:"banquete-premium-experiencia",name:"Banquete Premium",badge:"La Máxima Experiencia",price:96,tagline:"Más que un banquete, es una experiencia de sabor inolvidable",description:"P. Lomo Fino + P. Chancho + P. Pollo + Porción de Mollejitas + 2 Palitos de Anticucho + 2 Alitas Completas + Chorizo + Chaufa + Papas fritas + Ensalada + Cremas.",servings:"Banquete completo para 4 a 5 personas",featured:!0}],L=[{id:"h-peruana-clasica",categoryId:"hamburguesas",subcategoryId:"patriotas",subcategoryName:"Hamburguesas Patriotas",name:"H. Peruana o Clásica",description:"Ensalada Fresca + Carne de hamburguesa + Papas crujientes + Cremas",price:8.5,popular:!0},{id:"h-la-bella-vita",categoryId:"hamburguesas",subcategoryId:"patriotas",subcategoryName:"Hamburguesas Patriotas",name:"H. La Bella Vita o Italiana",description:"Ensalada Fresca + Carne de hamburguesa + Queso mozarella + Peperoni + Papas crujientes + Cremas",price:12.5},{id:"h-cubana",categoryId:"hamburguesas",subcategoryId:"patriotas",subcategoryName:"Hamburguesas Patriotas",name:"H. Cubana",description:"Ensalada Fresca + Carne de hamburguesa + Huevo + Plátanos fritos + Papas crujientes + Cremas",price:11,popular:!0},{id:"h-mexicana",categoryId:"hamburguesas",subcategoryId:"patriotas",subcategoryName:"Hamburguesas Patriotas",name:"H. Mexicana",description:"Ensalada Fresca + Carne de hamburguesa + Queso cheddar + Aguacate + Papas crujientes + Cremas",price:12.5},{id:"h-hawaiana",categoryId:"hamburguesas",subcategoryId:"patriotas",subcategoryName:"Hamburguesas Patriotas",name:"H. Hawaiana",description:"Ensalada Fresca + Carne de hamburguesa + Jamón + Piña + Papas crujientes + Cremas",price:11.5},{id:"bacon-burger",categoryId:"hamburguesas",subcategoryId:"festival",subcategoryName:"Festival Burger",name:"Bacon Burger",description:"Ensalada Fresca + Carne de hamburguesa + Queso edam + Tocino crocante + Papas crujientes + Cremas",price:13.5,signature:!0,popular:!0},{id:"cheese-burger",categoryId:"hamburguesas",subcategoryId:"festival",subcategoryName:"Festival Burger",name:"Cheese Burger",description:"Ensalada Fresca + Carne de hamburguesa + Queso edam + Queso cheddar fundido + Papas crujientes + Cremas",price:12.5},{id:"h-choriburger",categoryId:"hamburguesas",subcategoryId:"festival",subcategoryName:"Festival Burger",name:"H. Choriburger",description:"Ensalada Fresca + Carne de hamburguesa + Chorizo parrillero + Papas crujientes + Cremas",price:11},{id:"choripan",categoryId:"hamburguesas",subcategoryId:"festival",subcategoryName:"Festival Burger",name:"Choripan",description:"Ensalada Fresca + Chorizo parrillero + Papas crujientes + Cremas",price:8.5},{id:"choripan-finas-hierbas",categoryId:"hamburguesas",subcategoryId:"festival",subcategoryName:"Festival Burger",name:"Choripan Finas Hierbas",description:"Ensalada Fresca + Chorizo finas hierbas + Papas crujientes + Cremas",price:10.5},{id:"royal-finas-hierbas",categoryId:"hamburguesas",subcategoryId:"festival",subcategoryName:"Festival Burger",name:"Royal Finas Hierbas",description:"Ensalada Fresca + Chorizo finas hierbas + Queso edam + Jamón + Huevo + Papas crujientes + Cremas",price:14,signature:!0},{id:"h-pechuga-pollo",categoryId:"hamburguesas",subcategoryId:"parrilleras",subcategoryName:"Hamburguesas Parrilleras",name:"H. de Pechuga de Pollo",description:"Ensalada Fresca + Pechuga de pollo a la parrilla + Papas crujientes + Cremas",price:10},{id:"h-chancho",categoryId:"hamburguesas",subcategoryId:"parrilleras",subcategoryName:"Hamburguesas Parrilleras",name:"H. de Chancho",description:"Ensalada Fresca + Lomo de chancho a la parrilla + Papas crujientes + Cremas",price:11},{id:"h-lomo-fino",categoryId:"hamburguesas",subcategoryId:"parrilleras",subcategoryName:"Hamburguesas Parrilleras",name:"H. de Lomo Fino",description:"Ensalada Fresca + Lomo Fino de Res a la parrilla + Papas crujientes + Cremas",price:13,signature:!0},{id:"h-extrema",categoryId:"hamburguesas",subcategoryId:"parrilleras",subcategoryName:"Hamburguesas Parrilleras",name:"H. Extrema",description:"Ensalada Fresca + Pechuga de pollo a la parrilla + Lomo de chancho a la parrilla + Lomo Fino de Res a la parrilla + Papas crujientes + Cremas",price:19,signature:!0,popular:!0},{id:"h-royal",categoryId:"hamburguesas",subcategoryId:"premium",subcategoryName:"Hamburguesas Premium",name:"H. Royal",description:"Ensalada Fresca + Carne de hamburguesa + Queso edam + Jamón + Huevo + Papas crujientes + Cremas",price:12.5,popular:!0},{id:"h-doble",categoryId:"hamburguesas",subcategoryId:"premium",subcategoryName:"Hamburguesas Premium",name:"H. Doble",description:"Ensalada Fresca + Doble Carne de hamburguesa + Queso edam + Papas crujientes + Cremas",price:13},{id:"h-mix",categoryId:"hamburguesas",subcategoryId:"premium",subcategoryName:"Hamburguesas Premium",name:"H. Mix",description:"Ensalada Fresca + Carne de hamburguesa + Pechuga de pollo a la parrilla + Papas crujientes + Cremas",price:13},{id:"h-full-size",categoryId:"hamburguesas",subcategoryId:"premium",subcategoryName:"Hamburguesas Premium",name:"H. Full Size",description:"Ensalada Fresca + Carne de hamburguesa + Queso edam + Tocino + Chorizo parrillero + Papas crujientes + Cremas",price:15,signature:!0},{id:"h-serendipity",categoryId:"hamburguesas",subcategoryId:"premium",subcategoryName:"Hamburguesas Premium",name:"H. Serendipity",description:"Ensalada Fresca + Carne de hamburguesa + Queso edam + Jamón + Huevo + Tocino + Chorizo + Piña + Papas crujientes + Cremas",price:18,signature:!0,popular:!0},{id:"h-pollo-al-hilo",categoryId:"hamburguesas",subcategoryId:"new-burgers",subcategoryName:"New Burgers & Kids",name:"H. Pollo al Hilo",description:"Ensalada Fresca + Pollo desmechado + Papas crujientes al hilo + Cremas",price:10},{id:"pke-burger",categoryId:"hamburguesas",subcategoryId:"new-burgers",subcategoryName:"New Burgers & Kids",name:"PKE Burger",description:"Hamburguesa especial para los más pequeños con sabor inigualable y textura suave",price:16.9},{id:"magic-box",categoryId:"hamburguesas",subcategoryId:"new-burgers",subcategoryName:"New Burgers & Kids",name:"Magic Box",description:"H. Kids + Cereal + Bebida + Juguete Sorpresa. “Si tú los engríes, nosotros también...”",price:null,priceNote:"Consultar con el mozo",badge:"Kids Experience"},{id:"p-pollo",categoryId:"parrillas-banquetes",subcategoryId:"combos-grill",subcategoryName:"Combos Grill",name:"P. Pollo",description:"Parrilla de pollo jugoso y doradito + Chaufa + Papas fritas + Ensalada + Cremas",price:15.5},{id:"p-pechuga-pollo",categoryId:"parrillas-banquetes",subcategoryId:"combos-grill",subcategoryName:"Combos Grill",name:"P. Pechuga de Pollo",description:"Distinción irresistible de pechuga de pollo + Chaufa + Papas fritas + Ensalada + Cremas",price:16.5},{id:"p-alitas-clasicas",categoryId:"parrillas-banquetes",subcategoryId:"combos-grill",subcategoryName:"Combos Grill",name:"P. Alitas a la Parrilla (Clásicas)",description:"Porción de alitas crujientes y jugosas + Chaufa + Papas fritas + Ensalada + Cremas",price:15.5},{id:"p-alitas-bbq",categoryId:"parrillas-banquetes",subcategoryId:"combos-grill",subcategoryName:"Combos Grill",name:"P. Alitas a la Parrilla en Salsa BBQ",description:"Alitas glaseadas en deliciosa salsa BBQ ahumada + Chaufa + Papas fritas + Ensalada + Cremas",price:18.5,popular:!0},{id:"p-alitas-maracuya",categoryId:"parrillas-banquetes",subcategoryId:"combos-grill",subcategoryName:"Combos Grill",name:"P. Alitas a la Parrilla en Salsa Maracuyá",description:"Alitas bañadas en reducción agridulce de maracuyá + Chaufa + Papas fritas + Ensalada + Cremas",price:18.5},{id:"p-alitas-acevichada",categoryId:"parrillas-banquetes",subcategoryId:"combos-grill",subcategoryName:"Combos Grill",name:"P. Alitas a la Parrilla (Salsa Acevichada)",description:"Alitas a la parrilla bañadas en cremosa salsa acevichada artesanal + Chaufa + Papas fritas + Ensalada + Cremas",price:18.5,popular:!0,signature:!0},{id:"p-chancho",categoryId:"parrillas-banquetes",subcategoryId:"combos-grill",subcategoryName:"Combos Grill",name:"P. Chancho",description:"Parrilla de Chancho tierno y en su punto + Chaufa + Papas fritas + Ensalada + Cremas",price:18.5},{id:"p-lomo-fino",categoryId:"parrillas-banquetes",subcategoryId:"combos-grill",subcategoryName:"Combos Grill",name:"P. Lomo Fino de Res",description:"Corte exquisito de lomo a la parrilla, suavidad garantizada + Chaufa + Papas fritas + Ensalada + Cremas",price:20.5,signature:!0},{id:"p-anticuchos",categoryId:"parrillas-banquetes",subcategoryId:"combos-grill",subcategoryName:"Combos Grill",name:"P. Anticuchos",description:"2 palitos de anticuchos tiernizados a fuego lento + Papas fritas + Camote caramelizado + Choclo + Ensalada + Cremas",price:16.5,popular:!0},{id:"p-mollejitas",categoryId:"parrillas-banquetes",subcategoryId:"combos-grill",subcategoryName:"Combos Grill",name:"P. Mollejitas a la Parrilla",description:"Porción de mollejitas jugosas, doradas y adictivas + Papas fritas + Camote caramelizado + Choclo + Ensalada + Cremas",price:14.5},{id:"banquete-item-seleccion",categoryId:"parrillas-banquetes",subcategoryId:"banquetes",subcategoryName:"Banquetes Parrilleros",name:"Selección Premium de Serendipity",description:"Lomo fino de Res + Lomo de chancho + Pechuga de pollo + 2 Palitos de Anticucho + Chaufa + Papas fritas + Ensalada + Crema (Ideal para 2 a 3 personas)",price:66,signature:!0},{id:"banquete-item-mega",categoryId:"parrillas-banquetes",subcategoryId:"banquetes",subcategoryName:"Banquetes Parrilleros",name:"Mega Parrilla",description:"P. Lomo Fino + P. Chancho + P. Pollo + Porción de Mollejitas + 1 Palito de Anticucho + Chorizo + Chaufa + Papas fritas + Ensalada + Cremas (Ideal para 3 a 4 personas)",price:76,signature:!0},{id:"banquete-item-premium",categoryId:"parrillas-banquetes",subcategoryId:"banquetes",subcategoryName:"Banquetes Parrilleros",name:"Banquete Premium (Experiencia Completa)",description:"P. Lomo Fino + P. Chancho + P. Pollo + Porción de Mollejitas + 2 Palitos de Anticucho + 2 Alitas Completas + Chorizo + Chaufa + Papas fritas + Ensalada + Cremas (Banquete para 4 a 5 personas)",price:96,signature:!0},{id:"salchipapa",categoryId:"piqueos",subcategoryId:"pincelada",subcategoryName:"Piqueos & Salchipapas",name:"Salchipapa",description:"Salchicha dorada de primera calidad + Papas fritas + Ensalada fresca + Cremas",price:14.5,popular:!0},{id:"choripapas",categoryId:"piqueos",subcategoryId:"pincelada",subcategoryName:"Piqueos & Salchipapas",name:"Choripapas",description:"Chorizo selecto parrillero troceado + Papas fritas crujientes + Ensalada + Cremas",price:15.5},{id:"salchi-chori",categoryId:"piqueos",subcategoryId:"pincelada",subcategoryName:"Piqueos & Salchipapas",name:"Salchi - Chori",description:"Combinación generosa de Salchicha + Chorizo parrillero + Papas fritas + Ensalada + Cremas",price:16.5,popular:!0},{id:"papa-rellena",categoryId:"piqueos",subcategoryId:"pincelada",subcategoryName:"Piqueos & Salchipapas",name:"Papa Rellena",description:"Papa exquisita con jugoso relleno tradicional, frita al momento. Antojo 100% Peruano + Ensalada + Cremas",price:7.5},{id:"coctel-sangria-jarra-chica",categoryId:"cocteles",subcategoryId:"sangria",subcategoryName:"Jarras de Sangría",name:"Jarra chica de Sangría",description:"Jarra de 1 litro de sangría artesanal preparada al momento con vino tinto seleccionado, frutas frescas de estación y toque cítrico (con alcohol)",price:15,popular:!0,servings:"Jarra 1 L"},{id:"coctel-sangria-jarra-grande",categoryId:"cocteles",subcategoryId:"sangria",subcategoryName:"Jarras de Sangría",name:"Jarra grande de Sangría",description:"Jarra familiar de 2 litros de sangría de la casa para compartir en mesa con vino tinto de barrica, cítricos macerados y frutas aromáticas (con alcohol)",price:30,signature:!0,servings:"Jarra 2 L"},{id:"postre-chocolate",categoryId:"postres",subcategoryId:"tortas",subcategoryName:"Tortas Artesanales",name:"Torta de Chocolate",description:"Húmedo bizcocho relleno y bañado en fudge artesanal de puro cacao",price:13,popular:!0},{id:"postre-sublime",categoryId:"postres",subcategoryId:"tortas",subcategoryName:"Tortas Artesanales",name:"Torta de Sublime",description:"El inconfundible sabor del chocolate con maní en versión pastelera premium",price:13},{id:"postre-tresleches-vainilla",categoryId:"postres",subcategoryId:"tortas",subcategoryName:"Tortas Artesanales",name:"Torta Tres Leches de Vainilla (1/2 Litro)",description:"Bizcochuelo bañado en salsa tres leches con canela fina aromática (presentación 1/2 litro)",price:13,signature:!0},{id:"postre-tresleches-chocolate",categoryId:"postres",subcategoryId:"tortas",subcategoryName:"Tortas Artesanales",name:"Torta Tres Leches de Chocolate (1/2 Litro)",description:"Tres leches con cacao puro y textura esponjosa impregnada de crema (presentación 1/2 litro)",price:13},{id:"postre-cheesecake-maracuya",categoryId:"postres",subcategoryId:"cheesecakes",subcategoryName:"Cheesecakes",name:"Cheesecake de Maracuyá",description:"Base crocante con suave queso crema y coulis de maracuyá agridulce",price:12},{id:"postre-cheesecake-fresa",categoryId:"postres",subcategoryId:"cheesecakes",subcategoryName:"Cheesecakes",name:"Cheesecake de Fresa",description:"Mermelada artesanal de fresas sobre tarta de queso horneada",price:12},{id:"postre-cheesecake-oreo",categoryId:"postres",subcategoryId:"cheesecakes",subcategoryName:"Cheesecakes",name:"Cheesecake de Oreo",description:"Crema de queso con abundantes galletas Oreo y base de galleta negra",price:12,popular:!0},{id:"postre-crema-volteada",categoryId:"postres",subcategoryId:"postres-tradicionales",subcategoryName:"Postres Tradicionales",name:"Crema Volteada",description:"Clásico postre peruano con caramelo brillante y textura aterciopelada",price:12},{id:"postre-keke-vainilla",categoryId:"postres",subcategoryId:"postres-tradicionales",subcategoryName:"Postres Tradicionales",name:"Keke de Vainilla con Frutos Secos",description:"Porción esponjosa con nueces y castañas seleccionadas",price:6},{id:"milkshake-fresa",categoryId:"bebidas",subcategoryId:"milkshakes",subcategoryName:"Milkshakes & Helados",name:"Milkshake de Fresa",description:"Cremosa preparación con fresas seleccionadas",price:12.5},{id:"milkshake-chocolate",categoryId:"bebidas",subcategoryId:"milkshakes",subcategoryName:"Milkshakes & Helados",name:"Milkshake de Chocolate",description:"Cremosa preparación con chocolate tradicional y leche entera",price:12.5},{id:"milkshake-oreo",categoryId:"bebidas",subcategoryId:"milkshakes",subcategoryName:"Milkshakes & Helados",name:"Milkshake de Oreo",description:"Trozos de galleta Oreo triturada y crema chantilly",price:13.5,popular:!0},{id:"milkshake-vainilla",categoryId:"bebidas",subcategoryId:"milkshakes",subcategoryName:"Milkshakes & Helados",name:"Milkshake de Vainilla",description:"Esencia fina de vainilla con textura sedosa",price:12.5},{id:"milkshake-lucuma",categoryId:"bebidas",subcategoryId:"milkshakes",subcategoryName:"Milkshakes & Helados",name:"Milkshake de Lúcuma",description:"Pura pulpa de lúcuma tradicional",price:13.5},{id:"milkshake-maracumango",categoryId:"bebidas",subcategoryId:"milkshakes",subcategoryName:"Milkshakes & Helados",name:"Milkshake de Maracumango",description:"Dúo refrescante y exótico de maracuyá y mango",price:13.5},{id:"serendipity-ice-cream",categoryId:"bebidas",subcategoryId:"milkshakes",subcategoryName:"Milkshakes & Helados",name:"Serendipity Ice Cream",description:"4 bolas grandes de helado artesanal + confeti y crujientes adicionales",price:14.5,signature:!0},{id:"frappuccino",categoryId:"bebidas",subcategoryId:"milkshakes",subcategoryName:"Milkshakes & Helados",name:"Frappuccino",description:"Café pasado helado, leche cremosa y hielo frappé",price:14},{id:"jugo-pina",categoryId:"bebidas",subcategoryId:"jugos",subcategoryName:"Jugos Naturales",name:"Jugo de Piña",description:"Refrescante fruta natural al instante",price:7.5},{id:"jugo-papaya",categoryId:"bebidas",subcategoryId:"jugos",subcategoryName:"Jugos Naturales",name:"Jugo de Papaya",description:"Dulzor natural y digestivo",price:7.5},{id:"jugo-mango",categoryId:"bebidas",subcategoryId:"jugos",subcategoryName:"Jugos Naturales",name:"Jugo de Mango",description:"Mango criollo seleccionado",price:8},{id:"jugo-fresa",categoryId:"bebidas",subcategoryId:"jugos",subcategoryName:"Jugos Naturales",name:"Jugo de Fresa",description:"Fresas frescas y aroma vibrante",price:8.5},{id:"jugo-guanabana",categoryId:"bebidas",subcategoryId:"jugos",subcategoryName:"Jugos Naturales",name:"Jugo de Guanábana",description:"Suave textura y sabor tropical",price:8.5},{id:"jugo-arandanos",categoryId:"bebidas",subcategoryId:"jugos",subcategoryName:"Jugos Naturales",name:"Jugo de Arándanos",description:"Antioxidante natural preparado al momento",price:8.5},{id:"jugo-chirimoya",categoryId:"bebidas",subcategoryId:"jugos",subcategoryName:"Jugos Naturales",name:"Jugo de Chirimoya",description:"Chirimoya de estación cremosa y dulce",price:9},{id:"jugo-lucuma",categoryId:"bebidas",subcategoryId:"jugos",subcategoryName:"Jugos Naturales",name:"Jugo de Lúcuma",description:"El clásico sabor de los Andes",price:9.5},{id:"jugo-surtido",categoryId:"bebidas",subcategoryId:"jugos",subcategoryName:"Jugos Naturales",name:"Jugo Surtido",description:"Mezcla energética de frutas seleccionadas",price:9.5,popular:!0},{id:"jugo-maracumango",categoryId:"bebidas",subcategoryId:"jugos",subcategoryName:"Jugos Naturales",name:"Jugo de Maracumango",description:"Combinación perfecta de maracuyá y mango dulce",price:9.5,signature:!0},{id:"batido-papaya",categoryId:"bebidas",subcategoryId:"batidos",subcategoryName:"Batidos con Leche",name:"Batido de Papaya con Leche",description:"Papaya batida con leche fresca",price:9},{id:"batido-mango",categoryId:"bebidas",subcategoryId:"batidos",subcategoryName:"Batidos con Leche",name:"Batido de Mango con Leche",description:"Textura densa y suave sabor tropical",price:9.5},{id:"batido-fresa",categoryId:"bebidas",subcategoryId:"batidos",subcategoryName:"Batidos con Leche",name:"Batido de Fresa con Leche",description:"El batido clásico por excelencia",price:9.5},{id:"batido-arandanos",categoryId:"bebidas",subcategoryId:"batidos",subcategoryName:"Batidos con Leche",name:"Batido de Arándanos con Leche",description:"Color y nutrición en cada sorbo",price:9.5},{id:"batido-guanabana",categoryId:"bebidas",subcategoryId:"batidos",subcategoryName:"Batidos con Leche",name:"Batido de Guanábana con Leche",description:"Exótica guanábana con leche entera",price:10},{id:"batido-lucuma",categoryId:"bebidas",subcategoryId:"batidos",subcategoryName:"Batidos con Leche",name:"Batido de Lúcuma con Leche",description:"Cremosa lúcuma pura con leche fresca",price:10.5},{id:"batido-chirimoya",categoryId:"bebidas",subcategoryId:"batidos",subcategoryName:"Batidos con Leche",name:"Batido de Chirimoya con Leche",description:"Cremosa chirimoya con toque lácteo",price:10.5},{id:"batido-mora",categoryId:"bebidas",subcategoryId:"batidos",subcategoryName:"Batidos con Leche",name:"Batido de Mora con Leche",description:"Moras silvestres y leche batida",price:11.5},{id:"batido-especial",categoryId:"bebidas",subcategoryId:"batidos",subcategoryName:"Batidos con Leche",name:"Batido Especial",description:"Preparación especial de la casa con mezcla nutritiva y fruta selecta",price:11.5,signature:!0},{id:"refresco-chicha",categoryId:"bebidas",subcategoryId:"refrescos",subcategoryName:"Refrescos e Infusiones",name:"Vaso de Chicha Morada (Jumbo 20 oz)",description:"Elaborada con maíz morado, piña, manzana y canela",price:3.5,popular:!0},{id:"refresco-maracuya",categoryId:"bebidas",subcategoryId:"refrescos",subcategoryName:"Refrescos e Infusiones",name:"Néctar de Maracuyá (20 oz)",description:"Zumo natural dulce y ácido",price:4.5},{id:"infusion-te",categoryId:"bebidas",subcategoryId:"refrescos",subcategoryName:"Refrescos e Infusiones",name:"Taza de Té",description:"Té clásico caliente",price:3},{id:"infusion-anis",categoryId:"bebidas",subcategoryId:"refrescos",subcategoryName:"Refrescos e Infusiones",name:"Taza de Anís",description:"Infusión aromática digestiva",price:3},{id:"infusion-manzanilla",categoryId:"bebidas",subcategoryId:"refrescos",subcategoryName:"Refrescos e Infusiones",name:"Taza de Manzanilla",description:"Infusión relajante caliente",price:3},{id:"cafe-pasado",categoryId:"bebidas",subcategoryId:"refrescos",subcategoryName:"Refrescos e Infusiones",name:"Taza de Café Pasado",description:"Gota a gota, aroma tostado peruano",price:4.5},{id:"agua-sanluis-con-gas",categoryId:"bebidas",subcategoryId:"refrescos",subcategoryName:"Refrescos e Infusiones",name:"Agua San Luis con Gas",description:"Botella personal con gas",price:2.5},{id:"fanta-500",categoryId:"bebidas",subcategoryId:"otras-bebidas",subcategoryName:"Otras Bebidas",name:"Fanta 500 ml",description:"Bebida gaseosa sabor naranja",price:3.5},{id:"inka-cola-15",categoryId:"bebidas",subcategoryId:"otras-bebidas",subcategoryName:"Otras Bebidas",name:"Inka Kola 1 ½ L",description:"La bebida de sabor nacional para compartir",price:9.5,popular:!0},{id:"coca-cola-15",categoryId:"bebidas",subcategoryId:"otras-bebidas",subcategoryName:"Otras Bebidas",name:"Coca Cola 1 ½ L",description:"Sabor original para la mesa",price:9.5},{id:"gatorade",categoryId:"bebidas",subcategoryId:"otras-bebidas",subcategoryName:"Otras Bebidas",name:"Gatorade",description:"Bebida isotónica hidratante",price:3.5},{id:"concordia-fresa",categoryId:"bebidas",subcategoryId:"otras-bebidas",subcategoryName:"Otras Bebidas",name:"Concordia Fresa 355 ml",description:"Sabor clásico de fresa",price:2},{id:"concordia-pina",categoryId:"bebidas",subcategoryId:"otras-bebidas",subcategoryName:"Otras Bebidas",name:"Concordia Piña 355 ml",description:"Sabor refrescante de piña",price:2},{id:"agua-sanluis-sin-gas",categoryId:"bebidas",subcategoryId:"otras-bebidas",subcategoryName:"Otras Bebidas",name:"Agua San Luis sin Gas",description:"Agua mineral de mesa",price:2.5},{id:"guaranita",categoryId:"bebidas",subcategoryId:"otras-bebidas",subcategoryName:"Otras Bebidas",name:"Guaranita",description:"Sabor guaraná refrescante",price:2}],S={categories:[{group:"Ingredientes & Adicionales",items:[{name:"Jamón",price:2},{name:"Plátanos Fritos",price:2},{name:"Huevo Frito",price:2},{name:"Aguacate (Palta)",price:2.5},{name:"Piña Caramelizada",price:2.5},{name:"Chorizo Parrillero",price:3},{name:"Chorizo Finas Hierbas",price:3.5},{name:"Tocino Crocante",price:3.5},{name:"Peperoni",price:3},{name:"Queso (Edam, Mozzarella o Cheddar)",price:3}]},{group:"Cortes & Carnes Extras",items:[{name:"Carne de Hamburguesa",price:4},{name:"Pechuga de Pollo a la Parrilla",price:5},{name:"Chancho a la Parrilla",price:6},{name:"Lomo a la Parrilla de Res",price:7}]}],cremas:[{name:"Mayonesa",note:"Clásica y sedosa"},{name:"Aceituna",note:"Toque botijero peruano"},{name:"Ketchup",note:"Agridulce tradicional"},{name:"Vinagreta",note:"Fresca para ensalada"},{name:"Mostaza",note:"Punto justo"},{name:"Tártara",note:"Especial de la casa"},{name:"Ají de la Casa",note:"Picor sabroso"}]};function H(){const a=document.createElement("section");a.id="banquetes",a.className="banquetes-section";const e=B.map(o=>`
    <article class="banquete-card">
      <span class="banquete-badge">${o.badge}</span>
      <h3 class="banquete-name">${o.name}</h3>
      <p class="banquete-tagline">“${o.tagline}”</p>
      <p class="banquete-description">${o.description}</p>
      <div class="banquete-footer">
        <span class="banquete-servings">${t("guests")} <span>${o.servings}</span></span>
        <span class="banquete-price" aria-label="S/. ${o.price.toFixed(2)}"><span class="currency">S/</span> <span class="amount">${o.price.toFixed(2)}</span></span>
      </div>
    </article>
  `).join("");return a.innerHTML=`
    <div class="container" id="experiencias">
      <div class="section-header">
        <span class="section-pretitle">Parrillas & Banquetes · Experiencias Para Compartir</span>
        <h2 class="section-title">Grandes Banquetes de Selección</h2>
        <p class="section-subtitle">
          Cortes selectos a fuego lento, anticuchos tiernizados, chaufa ahumado y papas crujientes preparados para la mesa.
        </p>
      </div>

      <div class="banquetes-grid">
        ${e}
      </div>
    </div>
  `,a}function j(a,e){const o=document.createElement("div");o.id="menu-nav",o.className="menu-controls-wrapper",o.innerHTML=`
    <div class="container" id="carta">
      <div class="search-container">
        <div class="search-input-wrapper">
          <span class="search-icon" aria-hidden="true">${t("search",{width:18,height:18})}</span>
          <input 
            type="search" 
            class="search-input" 
            placeholder="Buscar hamburguesas, cortes parrilleros, cócteles, postres..." 
            aria-label="Buscar productos de la carta"
            autocomplete="off"
            spellcheck="false"
          />
          <button type="button" class="search-clear-btn" aria-label="Limpiar búsqueda">${t("close",{width:14,height:14})}</button>
        </div>
      </div>

      <nav class="category-nav-scroll" aria-label="Categorías de la carta">
        <button type="button" class="category-pill active" data-category="all">
          <span class="pill-icon" aria-hidden="true">${t("star",{width:16,height:16})}</span>
          <span class="pill-label">Ver Todo</span>
        </button>
        ${M.map(n=>`
          <button type="button" class="category-pill" data-category="${n.id}">
            <span class="pill-icon" aria-hidden="true">${t(n.iconKey||"burger",{width:16,height:16})}</span>
            <span class="pill-label">${n.name}</span>
          </button>
        `).join("")}
      </nav>
    </div>
  `;const c=o.querySelector(".search-input"),s=o.querySelector(".search-clear-btn"),i=o.querySelectorAll(".category-pill");return c.addEventListener("input",n=>{const b=n&&n.target&&n.target.value!==void 0?n.target.value:c.value,m=(b||"").trim();s.style.display=b?"block":"none",a&&a(m)}),s.addEventListener("click",()=>{c.value="",s.style.display="none",typeof c.focus=="function"&&c.focus(),a&&a("")}),i.forEach(n=>{n.addEventListener("click",()=>{i.forEach(m=>m.classList.remove("active")),n.classList.add("active");const b=n.getAttribute("data-category");typeof n.scrollIntoView=="function"&&n.scrollIntoView({behavior:"smooth",block:"nearest",inline:"center"}),e&&e(b)})}),o}function T(a){return a?String(a).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;"):""}const E=a=>(a||"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().trim();function z(a){const e=document.createElement("div");e.id="menu-content",e.className="container";function o(c="all",s=""){e.innerHTML="";const i=E(s);let n=L;i&&(n=n.filter(r=>{const u=E(r.name),p=E(r.description),y=E(r.subcategoryName);return u.includes(i)||p.includes(i)||y.includes(i)}));const b=c==="all"||!c?M.filter(r=>r.id!=="adicionales"):M.filter(r=>r.id===c),m=new Set(b.map(r=>r.id)),g=n.filter(r=>m.has(r.categoryId));if(i&&g.length===0){const r=T(s);e.innerHTML=`
        <div class="search-empty-state" style="text-align: center; padding: 4.5rem 1rem;">
          <div class="search-empty-icon" style="margin-bottom: 1.25rem; color: var(--clr-gold-champagne);">${t("search",{width:44,height:44})}</div>
          <h3 class="search-empty-title" style="color: var(--clr-cream-light); margin-bottom: 0.6rem; font-family: var(--font-serif); font-size: 1.45rem;">
            No encontramos platos que coincidan con tu búsqueda
          </h3>
          <p class="search-empty-desc" style="color: var(--clr-cream-dim); font-size: 0.92rem; max-width: 540px; margin: 0 auto; line-height: 1.6;">
            No encontramos platos con "${r}". Prueba buscando otra opción como hamburguesa, parrilla, postre o sangría.
          </p>
        </div>
      `;return}const l=new Map;if((c==="all"||!c)&&!i){const u=["coctel-sangria-jarra-chica","coctel-sangria-jarra-grande","p-alitas-acevichada","h-serendipity","postre-crema-volteada","p-mega-parrilla"].map(p=>L.find(y=>y.id===p)).filter(Boolean);if(u.length>0){const p=document.createElement("section");p.className="featured-promos-shelf",p.id="promos-destacadas";const y=u.map(h=>{l.set(h.id,{item:h,categoryName:"Promociones"});let C="PROMO ESPECIAL";h.id==="coctel-sangria-jarra-chica"?C="PROMO CON ALCOHOL":h.id==="coctel-sangria-jarra-grande"?C="IDEAL PARA COMPARTIR":h.id==="p-alitas-acevichada"?C="FAVORITO CRIOLLO":h.id==="h-serendipity"?C="SIGNATURE BURGER":h.id==="postre-crema-volteada"?C="POSTRE ARTESANAL":h.id==="p-mega-parrilla"&&(C="FESTIVAL A LA PARRILLA");const v=typeof h.price=="number"?h.price.toFixed(2):h.priceNote||"";return`
            <article class="promo-card" data-item-id="${h.id}" tabindex="0" role="button" aria-label="${h.name}, ver detalle">
              <div class="promo-card-top-badge">
                <span class="promo-tag">${C}</span>
              </div>
              <h4 class="promo-card-title">${h.name}</h4>
              <p class="promo-card-desc">${h.description||""}</p>
              <div class="promo-card-bottom">
                <span class="promo-card-price" aria-label="S/. ${v}"><span class="currency">S/</span> <span class="amount">${v}</span></span>
                <span class="promo-card-action">Ver detalle →</span>
              </div>
            </article>
          `}).join("");p.innerHTML=`
          <div class="promos-shelf-header">
            <span class="promos-shelf-tag">IMPERDIBLES EN MESA</span>
            <h3 class="promos-shelf-title">Promos & Favoritos de la Casa</h3>
            <p class="promos-shelf-desc">Lo más pedido de nuestra carta listo para pedir sin dar vueltas.</p>
          </div>
          <div class="promos-carousel-track">
            ${y}
          </div>
        `,e.appendChild(p)}}if(c&&c!=="all"&&!i){const r=document.createElement("div");r.className="category-active-banner",r.innerHTML=`
        <button type="button" class="btn-back-all-cats">
          <span>← Ver toda la carta</span>
        </button>
      `,r.querySelector(".btn-back-all-cats").addEventListener("click",()=>{const p=document.querySelector('.category-pill[data-category="all"]');p&&p.click()}),e.appendChild(r)}b.forEach(r=>{const u=n.filter(d=>d.categoryId===r.id);if(u.length===0)return;const p=document.createElement("section");p.className="menu-group",p.id=`cat-${r.id}`;const y=new Map;u.forEach(d=>{const k=d.subcategoryId||"general",P=d.subcategoryName||r.name;y.has(k)||y.set(k,{name:P,items:[]}),y.get(k).items.push(d)});const h=d=>{l.set(d.id,{item:d,categoryName:r.name});let k="";if(d.price!==null&&d.price!==void 0){const N=d.price.toFixed(2);k=`<span class="menu-item-price" aria-label="S/. ${N}"><span class="currency">S/</span> <span class="amount">${N}</span></span>`}else{const N=d.priceNote||"Consultar";k=`<span class="menu-item-price" aria-label="${N}"><span class="amount-note">${N}</span></span>`}let P="";return d.badge&&(P=`<div class="menu-item-tags"><span class="item-badge signature">${d.badge}</span></div>`),`
          <article class="menu-card" data-item-id="${d.id}" tabindex="0" role="button" aria-label="${d.name}, ver detalles">
            <div class="menu-card-top">
              <h4 class="menu-item-name">${d.name}</h4>
              ${k}
            </div>
            ${d.description?`<p class="menu-item-desc">${d.description}</p>`:""}
            <div class="menu-card-bottom-row">
              ${P}
              <span class="card-tap-hint">Ver detalle ${t("arrow-right",{width:12,height:12})}</span>
            </div>
          </article>
        `},C=y.size>1||y.size===1&&Array.from(y.values())[0].name!==r.name;let v="";C?v=Array.from(y.values()).map(d=>{const k=d.items.map(h).join("");return`
            <div class="subcategory-block">
              <div class="subcategory-header-wrap">
                <h4 class="subcategory-title">${d.name}</h4>
                <span class="subcategory-items-count">${d.items.length} ${d.items.length===1?"opción":"opciones"}</span>
              </div>
              <div class="items-grid">
                ${k}
              </div>
            </div>
          `}).join(""):v=`
          <div class="items-grid">
            ${u.map(h).join("")}
          </div>
        `,p.innerHTML=`
        <div class="category-header-wrap">
          <h3 class="category-title">
            <span>${t(r.iconKey||"burger")}</span>
            <span>${r.name}</span>
          </h3>
          <span class="category-items-count">${u.length} opciones</span>
        </div>
        ${v}
      `,e.appendChild(p)}),e.querySelectorAll(".menu-card, .promo-card").forEach(r=>{const u=()=>{const p=r.getAttribute("data-item-id"),y=l.get(p);y&&a&&a(y.item,y.categoryName)};r.addEventListener("click",u),r.addEventListener("keydown",p=>{(p.key==="Enter"||p.key===" ")&&(p.preventDefault(),u())})})}return o("all",""),{element:e,update:o}}function F(){const a=document.createElement("section");a.id="cat-adicionales",a.className="customization-section";const e=S.categories.map(c=>`
    <div class="custom-group-column">
      <h4 class="custom-group-title">
        <span>${c.group}</span>
      </h4>
      <div class="custom-items-list">
        ${c.items.map(s=>`
          <div class="custom-item-row">
            <span class="custom-item-name">${s.name}</span>
            <span class="custom-item-price" aria-label="+ S/. ${s.price.toFixed(2)}"><span class="currency">+ S/</span> <span class="amount">${s.price.toFixed(2)}</span></span>
          </div>
        `).join("")}
      </div>
    </div>
  `).join(""),o=S.cremas.map(c=>`
    <span class="crema-pill">${c.name}</span>
  `).join("");return a.innerHTML=`
    <div class="container">
      <div class="customization-panel">
        <div class="section-header" style="margin-bottom: 1.5rem;">
          <span class="section-pretitle">A TU PREFERENCIA</span>
          <h2 class="section-title">Adicionales</h2>
          <p class="section-subtitle">Personaliza tu hamburguesa o plato con los adicionales y carnes extras que desees.</p>
        </div>

        <div class="custom-groups-grid">
          ${e}
        </div>

        <div class="cremas-highlight">
          <h4 class="cremas-title">Nuestras Cremas de la Casa</h4>
          <p class="cremas-subtitle">Acompaña tu pedido con nuestras salsas clásicas y de la casa</p>
          <div class="cremas-pills-wrap">
            ${o}
          </div>
        </div>
      </div>
    </div>
  `,a}function R(){const a=document.createElement("section");a.id="historia",a.className="brand-story-section";const e=f.story;return a.innerHTML=`
    <div class="container">
      <div class="story-card">
        <div class="story-header-emblem">
          <span class="story-crest">
            ${t("spark",{width:24,height:24,className:"luxury-svg-icon"})}
          </span>
        </div>
        <span class="story-tagline">${e.tagline}</span>
        <h2 class="story-title">${e.title}</h2>

        <div class="story-divider" aria-hidden="true">
          <span class="story-divider-line"></span>
          <span class="story-divider-gem"></span>
          <span class="story-divider-line"></span>
        </div>
        
        <div class="story-body">
          <p class="story-paragraph">${e.paragraphs[0]}</p>
        </div>

        <div class="story-pillars-grid">
          <div class="story-pillar-item">
            <span class="pillar-icon">
              ${t("spark",{width:20,height:20,className:"luxury-svg-icon"})}
            </span>
            <h4 class="pillar-title">Materias Primas</h4>
            <p class="pillar-text">Garantizamos confiabilidad utilizando las mejores materias primas del mercado.</p>
          </div>
          <div class="story-pillar-item">
            <span class="pillar-icon">
              ${t("grill",{width:20,height:20,className:"luxury-svg-icon"})}
            </span>
            <h4 class="pillar-title">Técnica & Fuego Lento</h4>
            <p class="pillar-text">Cortes selectos a la parrilla, fuego lento y el punto perfecto de sabor.</p>
          </div>
          <div class="story-pillar-item">
            <span class="pillar-icon">
              ${t("cloche",{width:20,height:20,className:"luxury-svg-icon"})}
            </span>
            <h4 class="pillar-title">Hospitalidad</h4>
            <p class="pillar-text">Atención cálida y personalizada, recibiéndolos siempre con una sonrisa.</p>
          </div>
        </div>

        <div class="story-quote-container">
          <blockquote class="story-quote">
            ${e.highlight}
          </blockquote>
        </div>
      </div>
    </div>
  `,a}function O(){const a=document.createElement("section");a.id="ubicacion",a.className="location-section";const e=f.location;return a.innerHTML=`
    <div class="container">
      <div class="section-header">
        <span class="section-pretitle">VISÍTANOS</span>
        <h2 class="section-title">${e.title}</h2>
        <p class="section-subtitle">
          Te esperamos para disfrutar de nuestra carta completa en mesa o para llevar.
        </p>
      </div>

      <div class="location-grid">
        <div class="location-info-card">
          <div class="location-card-header">
            <span class="location-chip">
              ${t("spark",{width:14,height:14,className:"luxury-svg-icon"})}
              <span>Servicio en Salón</span>
            </span>
          </div>

          <div class="info-block">
            <span class="info-label">
              ${t("clock",{width:16,height:16,className:"luxury-svg-icon"})}
              <span>Horarios de Atención</span>
            </span>
            <div class="info-value">${e.schedule}</div>
            <div class="info-sub">${e.reference}</div>
          </div>

          <div class="info-block">
            <span class="info-label">
              ${t("pin",{width:16,height:16,className:"luxury-svg-icon"})}
              <span>Ubicación</span>
            </span>
            <div class="info-value">${e.address}</div>
            <div class="info-sub">Abre la ruta directa en tu aplicación de mapas</div>
          </div>

          <div class="location-action-wrap" style="margin-top: 1.5rem;">
            <a 
              href="${e.googleMapsUrl}" 
              target="_blank" 
              rel="noopener noreferrer" 
              class="location-cta-btn btn-primary" 
              style="width: 100%; text-align: center; justify-content: center;"
              aria-label="Abrir ubicación en Google Maps"
            >
              <span>${t("compass",{width:18,height:18})}</span>
              <span>Abrir en Google Maps</span>
            </a>
          </div>
        </div>

        <div class="map-container">
          <iframe 
            src="${e.embedMapUrl}" 
            loading="lazy" 
            allowfullscreen=""
            referrerpolicy="no-referrer-when-downgrade" 
            title="Ubicación oficial de Serendipity Burger en Google Maps"
            aria-label="Mapa de Google Maps"
          ></iframe>
        </div>
      </div>

      <!-- Galería de Atmósfera & Espacios Reales -->
      <div class="atmosphere-gallery">
        <div class="section-header" style="margin-top: 3.5rem; margin-bottom: 1.8rem;">
          <span class="section-pretitle">NUESTRO ESPACIO</span>
          <h3 class="section-title" style="font-size: 1.8rem;">El Ambiente Serendipity</h3>
          <p class="section-subtitle">Diseñado para compartir momentos únicos entre fuego, música y confort.</p>
        </div>

        <div class="atmosphere-grid">
          <div class="atmosphere-card">
            <div class="atmosphere-img-wrap">
              <img src="./images/local-dining.jpg" alt="Salón Principal y Comedor" class="atmosphere-img" loading="lazy" />
              <div class="atmosphere-overlay"></div>
            </div>
            <div class="atmosphere-caption">
              <h4 class="atmosphere-title">Salón Principal</h4>
              <p class="atmosphere-desc">Diseño arquitectónico cálido, paneles acanalados y asientos en terciopelo.</p>
            </div>
          </div>

          <div class="atmosphere-card">
            <div class="atmosphere-img-wrap">
              <img src="./images/local-neon.jpg" alt="Firma Neón Serendipity" class="atmosphere-img" loading="lazy" />
              <div class="atmosphere-overlay"></div>
            </div>
            <div class="atmosphere-caption">
              <h4 class="atmosphere-title">Firma Neón</h4>
              <p class="atmosphere-desc">Iluminación tenue y el icónico neón que define nuestra identidad nocturna.</p>
            </div>
          </div>

          <div class="atmosphere-card">
            <div class="atmosphere-img-wrap">
              <img src="./images/local-ambiance.jpg" alt="Atmósfera Urbana y Cálida" class="atmosphere-img" loading="lazy" />
              <div class="atmosphere-overlay"></div>
            </div>
            <div class="atmosphere-caption">
              <h4 class="atmosphere-title">Atmósfera & Estilo</h4>
              <p class="atmosphere-desc">Lámparas de suspensión, mesas circulares y espacio ideal para grupos.</p>
            </div>
          </div>

          <div class="atmosphere-card">
            <div class="atmosphere-img-wrap">
              <img src="./images/local-table-qr.jpg" alt="Experiencia en Mesa" class="atmosphere-img" loading="lazy" />
              <div class="atmosphere-overlay"></div>
            </div>
            <div class="atmosphere-caption">
              <h4 class="atmosphere-title">Experiencia en Mesa</h4>
              <p class="atmosphere-desc">Atención al detalle en cada servicio para una velada gastronómica memorable.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,a}function V(){const a=document.createElement("section");a.id="redes",a.className="social-section";const e=f.social,c=[{key:"instagram",name:e.instagram.name,handle:e.instagram.handle,url:e.instagram.url,label:e.instagram.label,iconKey:"social-instagram",description:"Detrás de escena en cocina, fotografía gastronómica y lanzamientos exclusivos de temporada.",highlight:"Momentos & Novedades"},{key:"facebook",name:e.facebook.name,handle:e.facebook.handle,url:e.facebook.url,label:e.facebook.label,iconKey:"social-facebook",description:"Novedades de la comunidad, eventos especiales y anuncios oficiales de nuestro local.",highlight:"Comunidad Oficial"},{key:"tiktok",name:e.tiktok.name,handle:e.tiktok.handle,url:e.tiktok.url,label:e.tiktok.label,iconKey:"social-tiktok",description:"El arte del fuego lento, técnica smash y la preparación artesanal de nuestras hamburguesas en video.",highlight:"Grill Artistry en Video"}].map(s=>`
    <a 
      href="${s.url}" 
      target="_blank" 
      rel="noopener noreferrer" 
      class="social-card"
      aria-label="${s.name}: ${s.handle}"
    >
      <div class="social-card-top">
        <div class="social-card-icon" aria-hidden="true">
          ${t(s.iconKey,{width:24,height:24,className:"luxury-svg-icon"})}
        </div>
        <span class="social-card-pill">${s.highlight}</span>
      </div>

      <div class="social-card-content">
        <span class="social-card-title">${s.name}</span>
        <span class="social-card-handle">${s.handle}</span>
        <p class="social-card-desc">${s.description}</p>
        <span class="social-card-action">
          <span>${s.label}</span>
          ${t("arrow-right",{width:14,height:14,className:"luxury-svg-icon"})}
        </span>
      </div>
    </a>
  `).join("");return a.innerHTML=`
    <div class="container">
      <div class="section-header">
        <span class="section-pretitle">Comunidad & Vanguardia</span>
        <h2 class="section-title">Sigue la Experiencia</h2>
        <p class="section-subtitle">
          Siga de cerca nuestra pasión por la parrilla, creaciones de autor y el día a día en Serendipity Burger.
        </p>
      </div>

      <div class="social-cards-grid">
        ${c}
      </div>
    </div>
  `,a}function J(){const a=document.createElement("footer");a.className="site-footer";const e=new Date().getFullYear();return a.innerHTML=`
    <div class="container">
      <div class="footer-hallmark">
        <div class="footer-crest" aria-hidden="true">
          <span class="crest-letter">S</span>
        </div>
        <div class="footer-brand">${f.brandName}</div>
        <p class="footer-slogan">${f.slogan}</p>
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
          ${t("spark",{width:14,height:14,className:"luxury-svg-icon"})}
          <span>Precios en Soles (S/.) expresados conforme a la carta oficial del restaurante.</span>
        </div>
        <div class="footer-disclaimer">
          Catálogo digital visual para visualización exclusiva en mesa vía código QR. No se procesan pedidos ni transacciones de pago en esta plataforma.
        </div>
        <div class="footer-copyright">
          © ${e} ${f.brandName}. Todos los derechos reservados.
        </div>
      </div>
    </div>
  `,a.addEventListener("click",o=>{const c=o.target.closest('a[href^="#"]');if(!c)return;const s=c.getAttribute("href");if(!s||s==="#")return;let i=null;s==="#carta"?i=typeof document<"u"?document.getElementById("menu-nav")||document.getElementById("carta"):null:s==="#experiencias"?i=typeof document<"u"?document.getElementById("banquetes")||document.getElementById("experiencias"):null:s==="#inicio"?i=typeof document<"u"?document.getElementById("inicio"):null:typeof document<"u"&&(i=document.querySelector(s)),i&&typeof i.scrollIntoView=="function"&&(o.preventDefault(),i.scrollIntoView({behavior:"smooth"}),typeof window<"u"&&window.history&&window.history.pushState&&window.history.pushState(null,"",s))}),a}function D(){const a=document.createElement("div");a.id="product-modal",a.className="product-modal-overlay",a.setAttribute("aria-hidden","true"),a.innerHTML=`
    <div class="product-modal-container" role="dialog" aria-modal="true" aria-labelledby="modal-dish-title">
      <button type="button" class="modal-close-btn" aria-label="Cerrar detalle">
        ${t("close",{width:18,height:18})}
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
  `;const e=a.querySelector(".modal-close-btn"),o=a.querySelector(".btn-modal-close"),c=()=>{a.classList.remove("active"),a.setAttribute("aria-hidden","true"),document.body.style.overflow=""};return e.addEventListener("click",c),o.addEventListener("click",c),a.addEventListener("click",i=>{i.target===a&&c()}),document.addEventListener("keydown",i=>{i.key==="Escape"&&a.classList.contains("active")&&c()}),{element:a,open:(i,n="")=>{const b=a.querySelector("#modal-dish-title"),m=a.querySelector("#modal-dish-category"),g=a.querySelector("#modal-dish-price"),l=a.querySelector("#modal-desc-block"),r=a.querySelector("#modal-dish-desc"),u=a.querySelector("#modal-suggested-block"),p=a.querySelector("#modal-additions-grid"),y=a.querySelector("#modal-cremas-block"),h=a.querySelector("#modal-cremas-pills");b.textContent=i.name,m.textContent=i.subcategoryName||n||"",i.price!==null&&i.price!==void 0?g.innerHTML=`<span class="cur">S/</span> <span class="val">${i.price.toFixed(2)}</span>`:g.innerHTML=`<span class="val">${i.priceNote||"Consultar con el mozo"}</span>`,i.description&&i.description.trim()?(l.style.display="block",r.textContent=i.description):l.style.display="none";const C=["hamburguesas","parrillas-banquetes","piqueos"].includes(i.categoryId),v=a.querySelector("#modal-calc-box"),d=a.querySelector("#modal-calc-amount");if(C){u.style.display="block",v&&(v.style.display="none");const k=typeof i.price=="number"?i.price:0;let P=0;const N=S.categories[0].items.slice(0,8);p.innerHTML=N.map((I,w)=>`
        <button type="button" class="modal-add-item" data-price="${I.price}" data-idx="${w}" aria-pressed="false">
          <span class="modal-add-check-wrap"><svg class="modal-add-check" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg></span>
          <span class="modal-add-name">${I.name}</span>
          <span class="modal-add-price">+S/. ${I.price.toFixed(2)}</span>
        </button>
      `).join(""),p.querySelectorAll(".modal-add-item").forEach(I=>{I.addEventListener("click",()=>{const w=I.classList.toggle("is-selected");I.setAttribute("aria-pressed",w?"true":"false");const x=parseFloat(I.getAttribute("data-price"))||0;w?P+=x:P-=x,P>0&&k>0?(v&&(v.style.display="block"),d&&(d.innerHTML=`S/. ${(k+P).toFixed(2)}`)):v&&(v.style.display="none")})}),y.style.display="block",h.innerHTML=S.cremas.map(I=>`
        <button type="button" class="crema-chip" aria-pressed="false">${I.name}</button>
      `).join(""),h.querySelectorAll(".crema-chip").forEach(I=>{I.addEventListener("click",()=>{const w=I.classList.toggle("is-selected");I.setAttribute("aria-pressed",w?"true":"false")})})}else u.style.display="none",y.style.display="none",v&&(v.style.display="none");a.classList.add("active"),a.setAttribute("aria-hidden","false"),document.body.style.overflow="hidden"},close:c}}document.addEventListener("DOMContentLoaded",()=>{const a=document.getElementById("app");if(!a)return;let e="all",o="";const c=D();document.body.appendChild(c.element);const s=z((l,r)=>{c.open(l,r)}),i=l=>{o=l,s.update(e,o)},n=l=>{if(e=l,l==="adicionales"){s.update("all",o);const r=document.getElementById("cat-adicionales");r&&typeof r.scrollIntoView=="function"&&r.scrollIntoView({behavior:"smooth"});return}if(s.update(e,o),l!=="all"){const r=document.getElementById(`cat-${l}`);r&&typeof r.scrollIntoView=="function"&&r.scrollIntoView({behavior:"smooth"})}},b=l=>{const r=document.querySelector(`.category-pill[data-category="${l}"]`);r&&(document.querySelectorAll(".category-pill").forEach(p=>p.classList.remove("active")),r.classList.add("active"),typeof r.scrollIntoView=="function"&&r.scrollIntoView({behavior:"smooth",block:"nearest",inline:"center"})),n(l);const u=document.getElementById("carta");u&&typeof u.scrollIntoView=="function"&&u.scrollIntoView({behavior:"smooth"})};a.appendChild($()),a.appendChild(A(b)),a.appendChild(H()),a.appendChild(j(i,n)),a.appendChild(s.element),a.appendChild(F()),a.appendChild(R()),a.appendChild(O()),a.appendChild(V()),a.appendChild(J());const m=document.createElement("div");m.className="mobile-bottom-bar",m.setAttribute("aria-label","Acceso rápido móvil"),m.innerHTML=`
    <a href="#carta" class="mobile-bar-btn" aria-label="Ir a la carta">
      <span class="bar-icon">${t("book",{width:18,height:18})}</span>
      <span class="bar-label">Carta</span>
    </a>
    <a href="#experiencias" class="mobile-bar-btn" aria-label="Ir a banquetes">
      <span class="bar-icon">${t("grill",{width:18,height:18})}</span>
      <span class="bar-label">Banquetes</span>
    </a>
    <a href="#ubicacion" class="mobile-bar-btn" aria-label="Ver ubicación y mapa">
      <span class="bar-icon">${t("pin",{width:18,height:18})}</span>
      <span class="bar-label">Ubícanos</span>
    </a>
    <a href="#redes" class="mobile-bar-btn" aria-label="Ir a redes sociales">
      <span class="bar-icon">${t("social",{width:18,height:18})}</span>
      <span class="bar-label">Síguenos</span>
    </a>
  `,document.body.appendChild(m);const g=document.createElement("a");g.href="#inicio",g.className="floating-menu-btn",g.setAttribute("aria-label","Regresar al inicio"),g.innerHTML=`<span>${t("arrow-right",{width:16,height:16,className:"rotate-up"})}</span><span>Inicio</span>`,document.body.appendChild(g),window.addEventListener("scroll",()=>{(window.scrollY||0)>600?g.classList.add("visible"):g.classList.remove("visible")},{passive:!0})});
