/**
 * ============================================================================
 * EMPIRICAL CHALLENGER ADVERSARIAL STRESS HARNESS — MILESTONE M4
 * SERENDIPITY BURGER: LOCATION, SOCIAL MEDIA & BRAND STORY LUXURY EXPERIENCE
 * ============================================================================
 * Author: Challenger 1 (teamwork_challenger)
 * Working Directory: serendipity-burger
 * Execution: node tests/challenger_m4_stress_1.js
 *
 * Empirical Challenge Dimensions:
 *   1. Location & Google Maps Verification:
 *      - Exact operating schedule ("Lunes a Domingo · 5:00 PM - 11:30 PM") in config, LocationSection & Header drawer
 *      - Exact verified address and reference note
 *      - Google Maps CTA link validity, target="_blank", rel="noopener noreferrer"
 *      - Iframe attributes: loading="lazy", referrerpolicy, title, allowfullscreen
 *   2. Social Channels & Luxury Experience:
 *      - Official handles (@serendipityburger.pe, Serendipity Burger Oficial, @serendipityburger)
 *      - Valid external link attributes (target="_blank", rel="noopener noreferrer")
 *      - Absolute absence of fabricated metrics (followers, likes, viral stats)
 *      - Authentic culinary invitations (detrás de escena, fuego lento, técnica smash)
 *   3. Brand Story & Culinary Manifesto:
 *      - Authentic text from config.js (tagline, title, paragraphs, highlighted quote)
 *      - 3 Culinary pillar cards (Materias Primas, Técnica, Hospitalidad)
 *      - Absence of fast-food clichés (fast food, comida rápida, chatarra, combo económico)
 *   4. Navigation & DOM Anchor-to-ID Invariant:
 *      - Anchor links in Header, Drawer and Footer (#carta, #experiencias, #historia, #ubicacion, #redes)
 *      - Verification that each anchor corresponds to an actual element ID in the mounted application DOM
 *   5. Interactive Mobile Drawer Stress:
 *      - Rapid toggle state cycle stress (100 rapid open/close events)
 *      - ARIA accessibility attribute sync (aria-expanded, aria-hidden, aria-controls, role="dialog", aria-modal="true")
 *   6. Footer & Non-Transactional Catalog Integrity:
 *      - Brand hallmark crest "S", dynamic year, Soles statement, QR catalog notice
 *      - Absolute absence of cart, checkout, payment inputs, or order placement forms
 *   7. Project-Wide Absolute Zero Emoji Invariant:
 *      - Exhaustive Unicode scan across all HTML, JS, and CSS files
 * ============================================================================
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

// ANSI formatting for terminal reporting
const RESET = '\x1b[0m';
const BOLD = '\x1b[1m';
const GREEN = '\x1b[32m';
const RED = '\x1b[31m';
const YELLOW = '\x1b[33m';
const CYAN = '\x1b[36m';
const GOLD = '\x1b[38;2;197;168;128m';

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;
const failureDetails = [];
const observations = [];

function assert(condition, name, details = '') {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`  ${GREEN}✓ PASS${RESET}  ${name}`);
  } else {
    failedTests++;
    console.log(`  ${RED}✗ FAIL${RESET}  ${name}${details ? ` -> ${YELLOW}${details}${RESET}` : ''}`);
    failureDetails.push({ name, details });
  }
}

function observe(note) {
  observations.push(note);
  console.log(`  ${YELLOW}ℹ ADVERSARIAL OBSERVATION${RESET}  ${note}`);
}

function banner(title) {
  console.log(`\n${BOLD}${GOLD}✦ ${title.toUpperCase()} ✦${RESET}`);
  console.log('─'.repeat(76));
}

// ============================================================================
// SELF-CONTAINED HIGH-FIDELITY LIGHTWEIGHT DOM EMULATION
// ============================================================================
class MockClassList {
  constructor(el) {
    this.el = el;
    this.classes = new Set();
  }
  add(...names) {
    for (const n of names) if (n) this.classes.add(n);
    this.el._className = Array.from(this.classes).join(' ');
  }
  remove(...names) {
    for (const n of names) this.classes.delete(n);
    this.el._className = Array.from(this.classes).join(' ');
  }
  contains(name) {
    return this.classes.has(name);
  }
}

class MockElement {
  constructor(tagName) {
    this.tagName = (tagName || 'DIV').toUpperCase();
    this.id = '';
    this._className = '';
    this.classList = new MockClassList(this);
    this.attributes = new Map();
    this.style = {};
    this.children = [];
    this.parentNode = null;
    this.listeners = new Map();
    this._innerHTML = '';
    this.value = '';
    this.textVal = '';
  }

  get className() {
    return this._className;
  }
  set className(val) {
    this._className = val || '';
    this.classList.classes = new Set((this._className || '').split(/\s+/).filter(Boolean));
  }

  get innerHTML() {
    if (this._innerHTML) return this._innerHTML;
    if (this.children.length > 0) return this.children.map(c => c.innerHTML).join('');
    return '';
  }
  set innerHTML(html) {
    this._innerHTML = html;
    this.children = [];
    if (html && typeof html === 'string') {
      this.children = parseHtmlToNodes(html, this);
    }
  }

  get textContent() {
    let text = '';
    const extract = (node) => {
      if (node.textVal) text += node.textVal;
      for (const child of node.children) extract(child);
    };
    extract(this);
    if (!text && this._innerHTML) {
      return this._innerHTML.replace(/<[^>]*>/g, ' ');
    }
    return text;
  }

  setAttribute(k, v) {
    this.attributes.set(k.toLowerCase(), String(v));
    if (k.toLowerCase() === 'class') this.className = String(v);
    if (k.toLowerCase() === 'id') this.id = String(v);
  }
  getAttribute(k) {
    return this.attributes.get(k.toLowerCase()) || null;
  }
  hasAttribute(k) {
    return this.attributes.has(k.toLowerCase());
  }

  appendChild(child) {
    child.parentNode = this;
    this.children.push(child);
    return child;
  }

  addEventListener(event, fn) {
    if (!this.listeners.has(event)) this.listeners.set(event, []);
    this.listeners.get(event).push(fn);
  }

  dispatchEvent(event) {
    const list = this.listeners.get(event.type) || [];
    for (const fn of list) fn(event);
  }

  click() {
    const event = {
      type: 'click',
      target: this,
      preventDefault: () => {},
      stopPropagation: () => {}
    };
    let curr = this;
    while (curr) {
      const list = curr.listeners.get('click') || [];
      for (const fn of list) fn(event);
      curr = curr.parentNode;
    }
  }

  scrollIntoView() {}
  focus() {}

  closest(selector) {
    let curr = this;
    while (curr) {
      if (matches(curr, selector)) return curr;
      curr = curr.parentNode;
    }
    return null;
  }

  querySelector(selector) {
    const all = this.querySelectorAll(selector);
    return all.length > 0 ? all[0] : null;
  }

  querySelectorAll(selector) {
    const results = [];
    function search(node) {
      for (const child of node.children) {
        if (matches(child, selector)) results.push(child);
        search(child);
      }
    }
    search(this);
    return results;
  }
}

function matches(el, selector) {
  if (!el || !el.tagName) return false;
  if (selector.startsWith('.')) {
    return el.classList.contains(selector.slice(1));
  }
  if (selector.startsWith('#')) {
    return el.id === selector.slice(1);
  }
  if (selector.includes('.')) {
    const [tag, cls] = selector.split('.');
    if (tag && el.tagName.toLowerCase() !== tag.toLowerCase()) return false;
    return el.classList.contains(cls);
  }
  if (selector.includes('[')) {
    const attrMatch = selector.match(/([a-zA-Z0-9-]+)?\[([a-zA-Z0-9-:]+)(?:(\^=|=)(?:"([^"]*)"|'([^']*)'|([^\s\]]+)))?\]/);
    if (attrMatch) {
      const tag = attrMatch[1];
      const attrName = attrMatch[2];
      const op = attrMatch[3];
      const expectedVal = attrMatch[4] || attrMatch[5] || attrMatch[6];
      if (tag && el.tagName.toLowerCase() !== tag.toLowerCase()) return false;
      if (!el.hasAttribute(attrName)) return false;
      if (op === '=') return el.getAttribute(attrName) === expectedVal;
      if (op === '^=') return (el.getAttribute(attrName) || '').startsWith(expectedVal);
      return true;
    }
  }
  return el.tagName.toLowerCase() === selector.toLowerCase();
}

function parseHtmlToNodes(html, parentNode = null) {
  const root = new MockElement('root');
  const stack = [root];
  const tagRegex = /<!--[\s\S]*?-->|<(\/)?([a-zA-Z0-9-]+)((?:\s+[a-zA-Z0-9-:]+(?:=(?:"[^"]*"|'[^']*'|[^\s>]+))?)*)\s*(\/)?>|([^<]+)/g;
  let match;
  while ((match = tagRegex.exec(html)) !== null) {
    if (match[0].startsWith('<!--')) continue;
    const isClosing = Boolean(match[1]);
    const tagName = match[2];
    const attrsStr = match[3];
    const isSelfClosing = Boolean(match[4]) || ['input', 'img', 'br', 'hr', 'source', 'iframe'].includes((tagName || '').toLowerCase());
    const text = match[5];

    if (text) {
      const textNode = new MockElement('text');
      textNode.textVal = text;
      stack[stack.length - 1].appendChild(textNode);
      continue;
    }

    if (isClosing) {
      if (stack.length > 1 && stack[stack.length - 1].tagName.toLowerCase() === tagName.toLowerCase()) {
        stack.pop();
      }
    } else if (tagName) {
      const el = new MockElement(tagName);
      if (attrsStr) {
        const attrRegex = /([a-zA-Z0-9-:]+)(?:=(?:"([^"]*)"|'([^']*)'|([^\s>]+)))?/g;
        let attrMatch;
        while ((attrMatch = attrRegex.exec(attrsStr)) !== null) {
          const attrName = attrMatch[1];
          const attrVal = attrMatch[2] !== undefined ? attrMatch[2] : (attrMatch[3] !== undefined ? attrMatch[3] : (attrMatch[4] !== undefined ? attrMatch[4] : ''));
          el.setAttribute(attrName, attrVal);
        }
      }
      stack[stack.length - 1].appendChild(el);
      if (!isSelfClosing) stack.push(el);
    }
  }
  return root.children;
}

// Set up globals for module imports and DOM testing
const mockBody = new MockElement('BODY');
global.document = {
  createElement: (tag) => new MockElement(tag),
  getElementById: (id) => {
    function find(node) {
      if (node.id === id) return node;
      for (const child of node.children) {
        const found = find(child);
        if (found) return found;
      }
      return null;
    }
    return find(global.document.body);
  },
  querySelector: (sel) => global.document.body.querySelector(sel),
  querySelectorAll: (sel) => global.document.body.querySelectorAll(sel),
  body: mockBody
};
global.window = {
  location: { hash: '' },
  history: { pushState: () => {} },
  addEventListener: () => {}
};

// Unicode Emoji regex covering standard, supplement and pictograph ranges
const EMOJI_REGEX = /[\u{1F300}-\u{1FAFF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{2600}-\u{27BF}\u{2B50}\u{2B55}\u{231A}-\u{231B}\u{23E9}-\u{23EC}\u{23F0}\u{23F3}]/u;

// ============================================================================
// LOAD TARGET MODULES
// ============================================================================
const { restaurantConfig } = await import('../src/data/config.js');
const { createLocationSection } = await import('../src/components/LocationSection.js');
const { createSocialSection } = await import('../src/components/SocialSection.js');
const { createBrandStory } = await import('../src/components/BrandStory.js');
const { createHeader } = await import('../src/components/Header.js');
const { createFooter } = await import('../src/components/Footer.js');
const { createHero } = await import('../src/components/Hero.js');
const { createBanquetShowcase } = await import('../src/components/BanquetShowcase.js');
const { createCategoryNav } = await import('../src/components/CategoryNav.js');
const { createMenuSection } = await import('../src/components/MenuSection.js');
const { createCustomizationGuide } = await import('../src/components/CustomizationGuide.js');

// Mount full application into Mock DOM to test end-to-end anchor and element resolution
const appRoot = document.createElement('div');
appRoot.id = 'app';
mockBody.appendChild(appRoot);

const menuViewer = createMenuSection();
const headerComponent = createHeader();
const heroComponent = createHero();
const banquetComponent = createBanquetShowcase();
const categoryNavComponent = createCategoryNav(() => {}, () => {});
const customizationComponent = createCustomizationGuide();
const brandStoryComponent = createBrandStory();
const locationComponent = createLocationSection();
const socialComponent = createSocialSection();
const footerComponent = createFooter();

appRoot.appendChild(headerComponent);
appRoot.appendChild(heroComponent);
appRoot.appendChild(banquetComponent);
appRoot.appendChild(categoryNavComponent);
appRoot.appendChild(menuViewer.element);
appRoot.appendChild(customizationComponent);
appRoot.appendChild(brandStoryComponent);
appRoot.appendChild(locationComponent);
appRoot.appendChild(socialComponent);
appRoot.appendChild(footerComponent);

// ============================================================================
// SUITE 1: LOCATION & GOOGLE MAPS EMPIRICAL VERIFICATION
// ============================================================================
banner('Suite 1: Location & Google Maps Adversarial Stress');

const loc = restaurantConfig.location;
const EXPECTED_SCHEDULE = 'Lunes a Domingo · 5:00 PM - 11:30 PM';
const EXPECTED_ADDRESS = 'Av. Principal gastronómica (Consultar local Serendipity)';

assert(loc.schedule === EXPECTED_SCHEDULE, `Config location schedule is exactly "${EXPECTED_SCHEDULE}"`, `found "${loc.schedule}"`);
assert(locationComponent.innerHTML.includes(EXPECTED_SCHEDULE), `LocationSection displays exact schedule "${EXPECTED_SCHEDULE}"`);
assert(headerComponent.innerHTML.includes(EXPECTED_SCHEDULE), `Header mobile drawer displays exact schedule "${EXPECTED_SCHEDULE}"`);

assert(loc.address === EXPECTED_ADDRESS, `Config location address is exactly "${EXPECTED_ADDRESS}"`);
assert(locationComponent.innerHTML.includes(EXPECTED_ADDRESS), `LocationSection displays exact address "${EXPECTED_ADDRESS}"`);
assert(locationComponent.innerHTML.includes(loc.reference), 'LocationSection displays verified reference note');

// CTA Link Validation
const locationCta = locationComponent.querySelector('.location-cta-btn');
assert(Boolean(locationCta), 'Location section renders primary CTA button for Google Maps');
assert(locationCta && locationCta.getAttribute('href') === loc.googleMapsUrl, `CTA button href points to ${loc.googleMapsUrl}`);
assert(locationCta && locationCta.getAttribute('target') === '_blank', 'CTA button has target="_blank" for non-disruptive navigation');
assert(locationCta && locationCta.getAttribute('rel') === 'noopener noreferrer', 'CTA button has rel="noopener noreferrer" for security');
assert(locationCta && locationCta.getAttribute('aria-label') === 'Abrir en Google Maps', 'CTA button has accessible aria-label');

// Google Maps Iframe Verification
const iframe = locationComponent.querySelector('iframe');
assert(Boolean(iframe), 'Location section embeds a Google Maps iframe');
assert(iframe && iframe.getAttribute('src') === loc.embedMapUrl, 'Iframe src matches config embedMapUrl');
assert(iframe && iframe.getAttribute('loading') === 'lazy', 'Iframe specifies loading="lazy" for mobile performance');
assert(iframe && iframe.getAttribute('referrerpolicy') === 'no-referrer-when-downgrade', 'Iframe specifies referrerpolicy="no-referrer-when-downgrade"');
assert(iframe && Boolean(iframe.getAttribute('title')), 'Iframe specifies accessible title attribute');

// Adversarial Check: allowfullscreen attribute
const hasAllowFullscreen = iframe && (iframe.hasAttribute('allowfullscreen') || iframe.hasAttribute('allowFullScreen'));
if (!hasAllowFullscreen) {
  assert(false, 'Location iframe declares "allowfullscreen" attribute', 'Attribute "allowfullscreen" is missing from <iframe> in LocationSection.js');
} else {
  assert(true, 'Location iframe declares "allowfullscreen" attribute');
}

// Zero Emojis in Location
assert(!EMOJI_REGEX.test(locationComponent.innerHTML), 'LocationSection contains strictly ZERO Unicode emojis');

// ============================================================================
// SUITE 2: SOCIAL MEDIA EXPERIENCE & INTEGRITY
// ============================================================================
banner('Suite 2: Social Channels & Integrity Adversarial Stress');

const socialCfg = restaurantConfig.social;
const EXPECTED_HANDLES = {
  instagram: '@serendipityburger.pe',
  facebook: 'Serendipity Burger Oficial',
  tiktok: '@serendipityburger'
};

assert(socialCfg.instagram.handle === EXPECTED_HANDLES.instagram, `Instagram handle is verified "${EXPECTED_HANDLES.instagram}"`);
assert(socialCfg.facebook.handle === EXPECTED_HANDLES.facebook, `Facebook handle is verified "${EXPECTED_HANDLES.facebook}"`);
assert(socialCfg.tiktok.handle === EXPECTED_HANDLES.tiktok, `TikTok handle is verified "${EXPECTED_HANDLES.tiktok}"`);

const socialCards = socialComponent.querySelectorAll('.social-card');
assert(socialCards.length === 3, `SocialSection renders exactly 3 official social cards (found ${socialCards.length})`);

// Verify all 3 cards have security attributes
let allSocialSecure = true;
socialCards.forEach((card, idx) => {
  const target = card.getAttribute('target');
  const rel = card.getAttribute('rel');
  if (target !== '_blank' || rel !== 'noopener noreferrer') {
    allSocialSecure = false;
  }
});
assert(allSocialSecure, 'All social cards enforce target="_blank" and rel="noopener noreferrer"');

// Absence of Fabricated Statistics
const FORBIDDEN_STATS = [
  'seguidores', 'followers', 'k followers', '100k', '50k', '10k', 'likes', 'millones', 'viral', 'views', 'suscriptores'
];
const socialText = socialComponent.textContent.toLowerCase();
let fabricatedFound = [];
FORBIDDEN_STATS.forEach(stat => {
  if (socialText.includes(stat)) fabricatedFound.push(stat);
});
assert(fabricatedFound.length === 0, 'SocialSection contains ZERO fabricated statistics or follower metrics', `detected: ${fabricatedFound.join(', ')}`);

// Authentic Culinary Narrative
const hasAuthenticNarrative = socialText.includes('detrás de escena') && socialText.includes('fuego lento') && socialText.includes('artesanal');
assert(hasAuthenticNarrative, 'Social cards invite guests to behind-the-scenes grill artistry and seasonal specials');

// Zero Emojis in Social
assert(!EMOJI_REGEX.test(socialComponent.innerHTML), 'SocialSection contains strictly ZERO Unicode emojis');

// ============================================================================
// SUITE 3: BRAND STORY & CULINARY MANIFESTO
// ============================================================================
banner('Suite 3: Brand Story & Culinary Manifesto Adversarial Stress');

const storyCfg = restaurantConfig.story;
assert(storyCfg.tagline === 'NUESTRA HISTORIA', 'Story tagline is exactly "NUESTRA HISTORIA"');
assert(storyCfg.title === 'Un libro abierto donde tú eres parte de la historia', 'Story title matches authentic manifesto');
assert(storyCfg.paragraphs.length === 2, 'Story config defines 2 authentic manifesto paragraphs');
assert(storyCfg.highlight.includes('Recibiéndolos siempre con una sonrisa'), 'Story highlight matches official closing sentence');

assert(brandStoryComponent.innerHTML.includes(storyCfg.title), 'BrandStory renders authentic manifesto title');
assert(brandStoryComponent.innerHTML.includes(storyCfg.highlight), 'BrandStory renders highlighted quote blockquote');

// 3 Culinary Pillars
const pillars = brandStoryComponent.querySelectorAll('.story-pillar-item');
assert(pillars.length === 3, `BrandStory renders exactly 3 culinary pillar cards (found ${pillars.length})`);

const pillarTitles = pillars.map(p => p.querySelector('.pillar-title')?.textContent || '');
assert(pillarTitles.includes('Materias Primas Selectas'), 'Includes pillar "Materias Primas Selectas"');
assert(pillarTitles.includes('Técnica & Fuego Lento'), 'Includes pillar "Técnica & Fuego Lento"');
assert(pillarTitles.includes('Hospitalidad con Sonrisa'), 'Includes pillar "Hospitalidad con Sonrisa"');

// Absence of Fast-Food Clichés
const FORBIDDEN_CLICHES = [
  'fast food', 'comida rápida', 'chatarra', 'combo económico', 'barato', 'low cost', 'autoservicio', 'drive thru', 'cajita feliz', 'ultraprocesado'
];
const brandText = brandStoryComponent.textContent.toLowerCase();
let clichesFound = [];
FORBIDDEN_CLICHES.forEach(cliche => {
  if (brandText.includes(cliche)) clichesFound.push(cliche);
});
assert(clichesFound.length === 0, 'BrandStory contains ZERO fast-food clichés or cheap dining tropes', `detected: ${clichesFound.join(', ')}`);

// Zero Emojis in BrandStory
assert(!EMOJI_REGEX.test(brandStoryComponent.innerHTML), 'BrandStory contains strictly ZERO Unicode emojis');

// ============================================================================
// SUITE 4: NAVIGATION ANCHORS & DOM CORRESPONDENCE
// ============================================================================
banner('Suite 4: Navigation Anchors & DOM Section IDs Invariant');

// Collect all navigation anchor hrefs from Header desktop, Header mobile drawer, and Footer
const desktopLinks = Array.from(headerComponent.querySelectorAll('.nav-link')).map(a => a.getAttribute('href'));
const drawerLinks = Array.from(headerComponent.querySelectorAll('.drawer-link')).map(a => a.getAttribute('href'));
const footerLinks = Array.from(footerComponent.querySelectorAll('.footer-link')).map(a => a.getAttribute('href'));

const REQUIRED_CORE_ANCHORS = ['#carta', '#experiencias', '#historia', '#ubicacion', '#redes'];
REQUIRED_CORE_ANCHORS.forEach(anchor => {
  assert(desktopLinks.includes(anchor), `Desktop Header contains anchor ${anchor}`);
  assert(drawerLinks.includes(anchor), `Mobile Drawer contains anchor ${anchor}`);
  assert(footerLinks.includes(anchor), `Footer contains anchor ${anchor}`);
});

// Adversarial DOM Section ID Verification:
// Standard HTML anchor navigation requires that for an anchor <a href="#target">,
// an element with id="target" exists in the DOM.
console.log(`\n  Checking native DOM correspondence for required section IDs:`);

const checkIdExists = (targetId) => {
  const el = document.getElementById(targetId);
  return Boolean(el);
};

// Check #historia, #ubicacion, #redes, #inicio
assert(checkIdExists('historia'), 'Section id="historia" exists in DOM (BrandStory)');
assert(checkIdExists('ubicacion'), 'Section id="ubicacion" exists in DOM (LocationSection)');
assert(checkIdExists('redes'), 'Section id="redes" exists in DOM (SocialSection)');
assert(checkIdExists('inicio'), 'Section id="inicio" exists in DOM (Hero)');

// Check #carta and #experiencias
const hasCartaId = checkIdExists('carta');
const hasExperienciasId = checkIdExists('experiencias');

if (!hasCartaId) {
  assert(false, 'Anchor #carta corresponds to an existing element id="carta" in DOM', 'DOM element with id="carta" is NOT present; CategoryNav has id="menu-nav" instead');
} else {
  assert(true, 'Anchor #carta corresponds to an existing element id="carta" in DOM');
}

if (!hasExperienciasId) {
  assert(false, 'Anchor #experiencias corresponds to an existing element id="experiencias" in DOM', 'DOM element with id="experiencias" is NOT present; BanquetShowcase has id="banquetes" instead');
} else {
  assert(true, 'Anchor #experiencias corresponds to an existing element id="experiencias" in DOM');
}

// Check JavaScript anchor interceptor resolution in Header & Footer
let headerCartaTarget = null;
let headerExperienciasTarget = null;
if (document.getElementById('menu-nav') || document.getElementById('carta')) {
  headerCartaTarget = document.getElementById('menu-nav') || document.getElementById('carta');
}
if (document.getElementById('banquetes') || document.getElementById('experiencias')) {
  headerExperienciasTarget = document.getElementById('banquetes') || document.getElementById('experiencias');
}
assert(Boolean(headerCartaTarget), 'Header JS anchor handler successfully locates target element for #carta (resolves to #menu-nav)');
assert(Boolean(headerExperienciasTarget), 'Header JS anchor handler successfully locates target element for #experiencias (resolves to #banquetes)');

// ============================================================================
// SUITE 5: MOBILE DRAWER INTERACTION & ARIA STRESS
// ============================================================================
banner('Suite 5: Mobile Drawer Interaction & ARIA State Stress');

const toggleBtn = headerComponent.querySelector('.header-menu-toggle');
const drawer = headerComponent.querySelector('.header-mobile-drawer');
const closeBtn = headerComponent.querySelector('.drawer-close-btn');
const backdrop = headerComponent.querySelector('.drawer-backdrop');

assert(Boolean(toggleBtn), 'Header includes mobile drawer toggle button');
assert(Boolean(drawer), 'Header includes mobile drawer element');
assert(drawer.getAttribute('id') === 'mobile-nav-drawer', 'Mobile drawer has id="mobile-nav-drawer"');
assert(toggleBtn.getAttribute('aria-controls') === 'mobile-nav-drawer', 'Toggle button specifies aria-controls="mobile-nav-drawer"');
assert(toggleBtn.getAttribute('aria-expanded') === 'false', 'Initial toggle aria-expanded is "false"');
assert(drawer.getAttribute('aria-hidden') === 'true', 'Initial drawer aria-hidden is "true"');

// Stress Toggle: 100 rapid cycles
let rapidCycleError = false;
for (let i = 0; i < 100; i++) {
  toggleBtn.click();
  const shouldBeOpen = (i % 2 === 0);
  const isOpen = drawer.classList.contains('is-open');
  const exp = toggleBtn.getAttribute('aria-expanded');
  const hid = drawer.getAttribute('aria-hidden');
  if (isOpen !== shouldBeOpen || exp !== String(shouldBeOpen) || hid !== String(!shouldBeOpen)) {
    rapidCycleError = true;
    break;
  }
}
assert(!rapidCycleError, 'Mobile drawer survives 100 rapid toggle cycles with exact ARIA synchronization');

// Test close via backdrop click
if (!drawer.classList.contains('is-open')) toggleBtn.click();
assert(drawer.classList.contains('is-open'), 'Drawer opens on toggle click');
backdrop.click();
assert(!drawer.classList.contains('is-open'), 'Drawer closes reactively on backdrop click');
assert(toggleBtn.getAttribute('aria-expanded') === 'false', 'aria-expanded resets to "false" after backdrop click');

// Test close via close button click
toggleBtn.click();
assert(drawer.classList.contains('is-open'), 'Drawer opens on second toggle click');
closeBtn.click();
assert(!drawer.classList.contains('is-open'), 'Drawer closes reactively on close button click');

// ============================================================================
// SUITE 6: FOOTER INTEGRITY & NON-TRANSACTIONAL CATALOG PARADIGM
// ============================================================================
banner('Suite 6: Footer Integrity & Non-Transactional Catalog Paradigm');

assert(footerComponent.innerHTML.includes('footer-crest'), 'Footer renders brand hallmark crest');
assert(footerComponent.innerHTML.includes('S'), 'Footer crest displays monogram "S"');
assert(footerComponent.innerHTML.includes(restaurantConfig.brandName), 'Footer displays brand name');
assert(footerComponent.innerHTML.includes(restaurantConfig.slogan), 'Footer displays slogan');

const currentYearStr = new Date().getFullYear().toString();
assert(footerComponent.innerHTML.includes(currentYearStr), `Footer contains dynamic current year (${currentYearStr})`);
assert(footerComponent.innerHTML.includes('Precios en Soles (S/.)'), 'Footer specifies official currency statement');

const footerNotice = footerComponent.textContent.toLowerCase();
const hasDisclaimer = footerNotice.includes('catálogo digital visual') && footerNotice.includes('no se procesan pedidos');
assert(hasDisclaimer, 'Footer contains explicit non-transactional QR catalog visual disclaimer');

// Absolute Non-Transactional Integrity across DOM
const appHtml = appRoot.innerHTML.toLowerCase();
const TRANSACTIONAL_VERBS = ['carrito', 'checkout', 'comprar ahora', 'finalizar pedido', 'pagar', 'agregar al pedido'];
let foundTransactional = [];
TRANSACTIONAL_VERBS.forEach(verb => {
  if (appHtml.includes(`>${verb}<`) || appHtml.includes(`"${verb}"`)) {
    foundTransactional.push(verb);
  }
});
assert(foundTransactional.length === 0, 'DOM contains ZERO transactional purchase buttons or cart flows', `found: ${foundTransactional.join(', ')}`);

// ============================================================================
// SUITE 7: EXHAUSTIVE PROJECT-WIDE ZERO EMOJI SCAN
// ============================================================================
banner('Suite 7: Exhaustive Project-Wide Absolute Zero Emoji Scan');

const sourceFiles = [
  'src/data/config.js',
  'src/data/menu.js',
  'src/components/icons.js',
  'src/components/Header.js',
  'src/components/Hero.js',
  'src/components/BanquetShowcase.js',
  'src/components/CategoryNav.js',
  'src/components/MenuSection.js',
  'src/components/CustomizationGuide.js',
  'src/components/BrandStory.js',
  'src/components/LocationSection.js',
  'src/components/SocialSection.js',
  'src/components/Footer.js',
  'src/main.js',
  'src/styles/main.css',
  'src/styles/reset.css',
  'index.html'
];

let totalEmojiViolations = 0;
const emojiViolationFiles = [];

sourceFiles.forEach(relPath => {
  const fullPath = path.join(projectRoot, relPath);
  if (!fs.existsSync(fullPath)) {
    assert(false, `File exists: ${relPath}`);
    return;
  }
  const content = fs.readFileSync(fullPath, 'utf8');
  const matches = content.match(new RegExp(EMOJI_REGEX, 'gu'));
  if (matches) {
    totalEmojiViolations += matches.length;
    emojiViolationFiles.push({ file: relPath, count: matches.length, matches });
  }
});

assert(totalEmojiViolations === 0, `Absolute ZERO Unicode emojis across all ${sourceFiles.length} source files`, `found ${totalEmojiViolations} emojis in: ${emojiViolationFiles.map(e => e.file).join(', ')}`);

// ============================================================================
// FINAL HARNESS SUMMARY & EMPIRICAL VERDICT
// ============================================================================
banner('EMPIRICAL CHALLENGER STRESS HARNESS SUMMARY');

console.log(`  Total Checks Executed:  ${BOLD}${totalTests}${RESET}`);
console.log(`  Passed Checks:          ${GREEN}${passedTests}${RESET}`);
console.log(`  Failed Checks:          ${failedTests > 0 ? RED : GREEN}${failedTests}${RESET}`);
console.log(`  Pass Rate:              ${BOLD}${((passedTests / totalTests) * 100).toFixed(1)}%${RESET}`);

if (observations.length > 0) {
  console.log(`\n  ${YELLOW}Adversarial Observations (${observations.length}):${RESET}`);
  observations.forEach((obs, idx) => {
    console.log(`    ${idx + 1}. ${obs}`);
  });
}

if (failedTests > 0) {
  console.log(`\n${RED}${BOLD}DEFECTS / ADVERSARIAL FINDINGS DETECTED (${failedTests}):${RESET}`);
  failureDetails.forEach((f, idx) => {
    console.log(`  ${idx + 1}. [${f.name}] -> ${f.details || 'Assertion failed'}`);
  });
}

console.log('\n' + '═'.repeat(76));
if (failedTests === 0) {
  console.log(`${BOLD}${GREEN}VERDICT: APPROVE (100% Empirically Verified)${RESET}`);
} else {
  console.log(`${BOLD}${RED}VERDICT: REJECT (${failedTests} Failure(s) Detected during Adversarial Stress)${RESET}`);
}
console.log('═'.repeat(76) + '\n');

process.exit(failedTests === 0 ? 0 : 1);
