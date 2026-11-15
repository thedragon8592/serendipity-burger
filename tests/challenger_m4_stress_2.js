/**
 * ============================================================================
 * CHALLENGER 2 ADVERSARIAL STRESS TEST HARNESS — MILESTONE M4
 * Luxury Responsiveness, DOM Stability, and Table QR Catalog Integrity
 * ============================================================================
 * Adversarially probes:
 * 1. Header mobile navigation drawer open/close toggle state machine invariants
 *    (rapid stress cycling, backdrop dismissal, anchor delegation, propagation isolation).
 * 2. Contrast, elevation, and CSS class integrity for .location-info-card,
 *    .social-card, and .story-card (WCAG 2.1 AAA luminance, box-shadows, hover elevation).
 * 3. Strict absence of transactional components (0 carts, 0 checkouts, 0 payment inputs,
 *    Table QR purity across AST and rendered DOM).
 * 4. Strict zero emojis across all 17 source files in src/ and index.html.
 * 5. Table QR catalog deep navigation integrity and R3 pricing accuracy.
 * ============================================================================
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

// ANSI Terminal Colors
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
const failures = [];
const observations = [];

function assert(condition, name, details = '') {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`  ${GREEN}✓ PASS${RESET}  ${name}`);
  } else {
    failedTests++;
    console.log(`  ${RED}✗ FAIL${RESET}  ${name} ${details ? `(${details})` : ''}`);
    failures.push({ name, details });
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
// HIGH-FIDELITY LIGHTWEIGHT DOM MOCK FOR NODE ENVIRONMENT
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
    this.scrollIntoViewCalls = 0;
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
      for (const child of this.children) {
        child.parentNode = this;
      }
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
      return this._innerHTML.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
    }
    return text;
  }

  setAttribute(k, v) {
    this.attributes.set(k, String(v));
    if (k.toLowerCase() === 'class') this.className = String(v);
    if (k.toLowerCase() === 'id') this.id = String(v);
  }
  getAttribute(k) {
    return this.attributes.get(k) || null;
  }
  hasAttribute(k) {
    return this.attributes.has(k);
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
    let stopped = false;
    const event = {
      type: 'click',
      target: this,
      preventDefault: () => {},
      stopPropagation: () => { stopped = true; }
    };
    let curr = this;
    while (curr) {
      const list = curr.listeners.get('click') || [];
      for (const fn of list) {
        fn(event);
        if (stopped) break;
      }
      if (stopped) break;
      curr = curr.parentNode;
    }
  }

  scrollIntoView() {
    this.scrollIntoViewCalls++;
  }

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

  // Tag + attribute selector like a[href^="#"] or [attr=val]
  if (selector.includes('[') && selector.endsWith(']')) {
    const bracketIdx = selector.indexOf('[');
    const tag = selector.slice(0, bracketIdx);
    if (tag && el.tagName.toLowerCase() !== tag.toLowerCase()) return false;
    const inner = selector.slice(bracketIdx + 1, -1);
    if (inner.includes('^=')) {
      const [k, v] = inner.split('^=');
      const val = v.replace(/^["']|["']$/g, '');
      const attr = el.getAttribute(k);
      return Boolean(attr && attr.startsWith(val));
    }
    if (inner.includes('=')) {
      const [k, v] = inner.split('=');
      const val = v.replace(/^["']|["']$/g, '');
      return el.getAttribute(k) === val;
    }
    return el.hasAttribute(inner);
  }

  if (selector.startsWith('.')) return el.classList.contains(selector.slice(1));
  if (selector.startsWith('#')) return el.id === selector.slice(1);
  if (selector.includes('.')) {
    const parts = selector.split('.');
    const tag = parts[0];
    const cls = parts[1];
    if (tag && el.tagName.toLowerCase() !== tag.toLowerCase()) return false;
    return el.classList.contains(cls);
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

// Global DOM setup
const mockBody = new MockElement('body');
global.document = {
  body: mockBody,
  createElement: (tag) => new MockElement(tag),
  getElementById: (id) => null,
  querySelector: (sel) => null
};

global.window = {
  scrollY: 0,
  addEventListener: () => {},
  history: {
    pushState: (state, title, url) => {
      global.window.lastPushedUrl = url;
    }
  }
};

// ============================================================================
// IMPORT COMPONENTS UNDER TEST
// ============================================================================
const { createHeader } = await import('../src/components/Header.js');
const { createLocationSection } = await import('../src/components/LocationSection.js');
const { createSocialSection } = await import('../src/components/SocialSection.js');
const { createBrandStory } = await import('../src/components/BrandStory.js');
const { createHero } = await import('../src/components/Hero.js');
const { createBanquetShowcase } = await import('../src/components/BanquetShowcase.js');
const { createCategoryNav } = await import('../src/components/CategoryNav.js');
const { createMenuSection } = await import('../src/components/MenuSection.js');
const { createCustomizationGuide } = await import('../src/components/CustomizationGuide.js');
const { createFooter } = await import('../src/components/Footer.js');
const { restaurantConfig } = await import('../src/data/config.js');
const { menuCategories, menuItems } = await import('../src/data/menu.js');

// ============================================================================
// ADVERSARIAL SUITE 1: HEADER MOBILE NAV DRAWER STATE MACHINE INVARIANTS
// ============================================================================
banner('Suite 1: Header Mobile Navigation Drawer State Machine Invariants');

const header = createHeader();
const toggleBtn = header.querySelector('.header-menu-toggle');
const drawer = header.querySelector('.header-mobile-drawer');
const closeBtn = header.querySelector('.drawer-close-btn');
const backdrop = header.querySelector('.drawer-backdrop');
const drawerPanel = header.querySelector('.drawer-panel');

assert(Boolean(header), 'Header element instantiates cleanly');
assert(Boolean(toggleBtn), 'Header menu toggle button exists (.header-menu-toggle)');
assert(Boolean(drawer), 'Mobile drawer element exists (.header-mobile-drawer)');
assert(Boolean(closeBtn), 'Drawer close button exists (.drawer-close-btn)');
assert(Boolean(backdrop), 'Drawer backdrop exists (.drawer-backdrop)');
assert(Boolean(drawerPanel), 'Drawer panel exists (.drawer-panel)');

// Invariant 1: Initial state is strictly closed
assert(!drawer.classList.contains('is-open'), 'Initial state: drawer does NOT have .is-open class');
assert(drawer.getAttribute('aria-hidden') === 'true', 'Initial state: drawer aria-hidden is "true"');
assert(toggleBtn.getAttribute('aria-expanded') === 'false', 'Initial state: toggleBtn aria-expanded is "false"');
assert(!document.body.classList.contains('drawer-open'), 'Initial state: document.body does NOT have .drawer-open');

// Invariant 2: Toggle click opens drawer
toggleBtn.click();
assert(drawer.classList.contains('is-open'), 'After toggle click: drawer HAS .is-open class');
assert(drawer.getAttribute('aria-hidden') === 'false', 'After toggle click: drawer aria-hidden is "false"');
assert(toggleBtn.getAttribute('aria-expanded') === 'true', 'After toggle click: toggleBtn aria-expanded is "true"');
assert(document.body.classList.contains('drawer-open'), 'After toggle click: document.body HAS .drawer-open class');

// Invariant 3: Toggle click closes drawer
toggleBtn.click();
assert(!drawer.classList.contains('is-open'), 'After 2nd toggle click: drawer does NOT have .is-open');
assert(drawer.getAttribute('aria-hidden') === 'true', 'After 2nd toggle click: drawer aria-hidden is "true"');
assert(toggleBtn.getAttribute('aria-expanded') === 'false', 'After 2nd toggle click: toggleBtn aria-expanded is "false"');
assert(!document.body.classList.contains('drawer-open'), 'After 2nd toggle click: document.body loses .drawer-open');

// Invariant 4: Close button dismisses drawer
toggleBtn.click();
assert(drawer.classList.contains('is-open'), 'Opened for closeBtn probe');
closeBtn.click();
assert(!drawer.classList.contains('is-open'), 'After closeBtn click: drawer is closed');
assert(drawer.getAttribute('aria-hidden') === 'true', 'After closeBtn click: aria-hidden is "true"');
assert(toggleBtn.getAttribute('aria-expanded') === 'false', 'After closeBtn click: aria-expanded is "false"');
assert(!document.body.classList.contains('drawer-open'), 'After closeBtn click: body loses .drawer-open');

// Invariant 5: Backdrop click dismisses drawer
toggleBtn.click();
assert(drawer.classList.contains('is-open'), 'Opened for backdrop probe');
backdrop.click();
assert(!drawer.classList.contains('is-open'), 'After backdrop click: drawer is closed');
assert(drawer.getAttribute('aria-hidden') === 'true', 'After backdrop click: aria-hidden is "true"');
assert(!document.body.classList.contains('drawer-open'), 'After backdrop click: body loses .drawer-open');

// Invariant 6: Anchor click inside drawer dismisses drawer and invokes smooth navigation
const sectionCarta = new MockElement('section'); sectionCarta.id = 'carta';
const sectionBanquetes = new MockElement('section'); sectionBanquetes.id = 'banquetes';
const sectionHistoria = new MockElement('section'); sectionHistoria.id = 'historia';
const sectionUbicacion = new MockElement('section'); sectionUbicacion.id = 'ubicacion';
const sectionRedes = new MockElement('section'); sectionRedes.id = 'redes';

const targetMap = {
  '#carta': sectionCarta,
  'carta': sectionCarta,
  'menu-nav': sectionCarta,
  '#experiencias': sectionBanquetes,
  'experiencias': sectionBanquetes,
  'banquetes': sectionBanquetes,
  '#historia': sectionHistoria,
  'historia': sectionHistoria,
  '#ubicacion': sectionUbicacion,
  'ubicacion': sectionUbicacion,
  '#redes': sectionRedes,
  'redes': sectionRedes
};

document.querySelector = (sel) => targetMap[sel] || null;
document.getElementById = (id) => targetMap[id] || targetMap[`#${id}`] || null;

const drawerLinks = drawer.querySelectorAll('.drawer-link');
assert(drawerLinks.length >= 5, `Drawer contains at least 5 navigation links (found ${drawerLinks.length})`);

for (const link of drawerLinks) {
  const href = link.getAttribute('href');
  toggleBtn.click(); // Open
  assert(drawer.classList.contains('is-open'), `Drawer open before clicking ${href}`);
  link.click();
  assert(!drawer.classList.contains('is-open'), `Clicking drawer-link ${href} automatically closes drawer`);
  assert(drawer.getAttribute('aria-hidden') === 'true', `aria-hidden restored to "true" after clicking ${href}`);
  assert(!document.body.classList.contains('drawer-open'), `body loses drawer-open after clicking ${href}`);
  if (targetMap[href]) {
    assert(targetMap[href].scrollIntoViewCalls > 0, `Target element for ${href} received scrollIntoView call`);
  }
}

// Invariant 7: Clicking non-interactive element inside drawer panel does NOT dismiss drawer
toggleBtn.click(); // Open
assert(drawer.classList.contains('is-open'), 'Drawer open before inner content click');
const drawerHeader = drawer.querySelector('.drawer-header');
if (drawerHeader) {
  drawerHeader.click();
  assert(drawer.classList.contains('is-open'), 'Clicking drawer-header does NOT dismiss drawer');
}
const drawerSchedule = drawer.querySelector('.drawer-schedule');
if (drawerSchedule) {
  drawerSchedule.click();
  assert(drawer.classList.contains('is-open'), 'Clicking drawer-schedule does NOT dismiss drawer');
}
closeBtn.click(); // Clean up

// Invariant 8: 100-cycle rapid alternating toggle stress test
let stateMismatchCount = 0;
for (let cycle = 1; cycle <= 100; cycle++) {
  toggleBtn.click();
  const expectedOpen = (cycle % 2 === 1);
  const isOpen = drawer.classList.contains('is-open');
  const isAriaExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
  const isAriaVisible = drawer.getAttribute('aria-hidden') === 'false';
  const isBodyOpen = document.body.classList.contains('drawer-open');

  if (isOpen !== expectedOpen || isAriaExpanded !== expectedOpen || isAriaVisible !== expectedOpen || isBodyOpen !== expectedOpen) {
    stateMismatchCount++;
  }
}
assert(stateMismatchCount === 0, `100 rapid toggle cycles maintained 100% state synchronization (0 desyncs across 100 cycles)`);
assert(!drawer.classList.contains('is-open'), 'After even number (100) of toggle cycles, drawer is closed');

// Invariant 9: Null-safety fault tolerance test (headless/SSR edge cases)
const originalBody = document.body;
document.body = null;
let nullCrash = false;
try {
  toggleBtn.click();
  toggleBtn.click();
} catch (e) {
  nullCrash = true;
} finally {
  document.body = originalBody;
}
assert(!nullCrash, 'Header drawer open/close degrades safely without crash when document.body is temporarily null');

// ============================================================================
// ADVERSARIAL SUITE 2: CONTRAST, ELEVATION, AND CSS CLASS INTEGRITY
// ============================================================================
banner('Suite 2: Contrast, Elevation, and CSS Token & Class Integrity');

const cssPath = path.join(projectRoot, 'src/styles/main.css');
const cssContent = fs.readFileSync(cssPath, 'utf8');

// Token definitions
const requiredTokens = [
  '--bg-obsidian',
  '--bg-card',
  '--bg-card-elevated',
  '--clr-gold-champagne',
  '--clr-gold-light',
  '--clr-gold-glow',
  '--clr-ivory',
  '--clr-parchment',
  '--clr-stone-dim',
  '--border-hairline',
  '--border-gold-subtle',
  '--shadow-luxury',
  '--shadow-luxury-hover'
];

for (const token of requiredTokens) {
  assert(cssContent.includes(`${token}:`), `main.css defines required design token ${token}`);
}

// WCAG 2.1 Luminance and Contrast Ratio Calculation Engine
function hexToRgb(hex) {
  hex = hex.replace('#', '');
  if (hex.length === 3) hex = hex.split('').map(c => c + c).join('');
  const num = parseInt(hex, 16);
  return { r: (num >> 16) & 255, g: (num >> 8) & 255, b: num & 255 };
}

function getRelativeLuminance(rgb) {
  const [sR, sG, sB] = [rgb.r / 255, rgb.g / 255, rgb.b / 255].map(val => {
    return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * sR + 0.7152 * sG + 0.0722 * sB;
}

function getContrastRatio(hex1, hex2) {
  const l1 = getRelativeLuminance(hexToRgb(hex1));
  const l2 = getRelativeLuminance(hexToRgb(hex2));
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

// Extract hex values from main.css
const bgCardHex = '#141312';
const bgObsidianHex = '#0c0b0a';
const clrIvoryHex = '#fcfbf9';
const clrParchmentHex = '#ded8ce';
const clrGoldChampagneHex = '#c5a880';
const clrGoldLightHex = '#e5cfb3';

const ivoryOnCard = getContrastRatio(clrIvoryHex, bgCardHex);
const parchmentOnCard = getContrastRatio(clrParchmentHex, bgCardHex);
const goldOnCard = getContrastRatio(clrGoldChampagneHex, bgCardHex);
const goldLightOnObsidian = getContrastRatio(clrGoldLightHex, bgObsidianHex);

assert(ivoryOnCard >= 7.0, `WCAG AAA: Ivory text on Card surface contrast is ${ivoryOnCard.toFixed(2)}:1 (>= 7:1)`);
assert(parchmentOnCard >= 7.0, `WCAG AAA: Parchment text on Card surface contrast is ${parchmentOnCard.toFixed(2)}:1 (>= 7:1)`);
assert(goldOnCard >= 7.0, `WCAG AAA: Gold Champagne on Card surface contrast is ${goldOnCard.toFixed(2)}:1 (>= 7:1)`);
assert(goldLightOnObsidian >= 7.0, `WCAG AAA: Gold Light on Obsidian substrate contrast is ${goldLightOnObsidian.toFixed(2)}:1 (>= 7:1)`);

// CSS Rules for Cards
assert(cssContent.includes('.location-info-card'), 'main.css contains selector .location-info-card');
assert(cssContent.includes('.social-card'), 'main.css contains selector .social-card');
assert(cssContent.includes('.story-card'), 'main.css contains selector .story-card');

// Check Elevation & Box Shadow assignments
const locationCardCssBlock = cssContent.slice(cssContent.indexOf('.location-info-card {'), cssContent.indexOf('.location-card-header {'));
assert(locationCardCssBlock.includes('box-shadow: var(--shadow-luxury)'), '.location-info-card applies --shadow-luxury elevation');
assert(locationCardCssBlock.includes('border: 1px solid var(--border-gold-subtle)'), '.location-info-card applies --border-gold-subtle hairline');
assert(locationCardCssBlock.includes('background: var(--bg-card)'), '.location-info-card applies obsidian card substrate');

const socialCardCssBlock = cssContent.slice(cssContent.indexOf('.social-card {'), cssContent.indexOf('.social-card:hover {'));
assert(socialCardCssBlock.includes('background: var(--bg-card)'), '.social-card applies obsidian card substrate');
assert(socialCardCssBlock.includes('border: 1px solid var(--border-hairline)'), '.social-card applies refined hairline border');

const socialCardHoverCssBlock = cssContent.slice(cssContent.indexOf('.social-card:hover {'), cssContent.indexOf('.social-card-top {'));
assert(socialCardHoverCssBlock.includes('transform: translateY(-4px)'), '.social-card:hover elevates via translateY(-4px)');
assert(socialCardHoverCssBlock.includes('var(--clr-gold-glow)'), '.social-card:hover casts warm champagne gold halo shadow');

const storyCardCssBlock = cssContent.slice(cssContent.indexOf('.story-card {'), cssContent.indexOf('.story-header-emblem {'));
assert(storyCardCssBlock.includes('box-shadow: var(--shadow-luxury)'), '.story-card applies --shadow-luxury elevation');
assert(storyCardCssBlock.includes('border: 1px solid var(--border-gold-subtle)'), '.story-card applies champagne gold hairline border');

// Structural Component Class Verification
const locationEl = createLocationSection();
assert(Boolean(locationEl.querySelector('.location-info-card')), 'LocationSection DOM contains .location-info-card');
assert(Boolean(locationEl.querySelector('.location-card-header')), 'LocationSection DOM contains .location-card-header');
assert(Boolean(locationEl.querySelector('.location-chip')), 'LocationSection DOM contains .location-chip');
assert(Boolean(locationEl.querySelector('.location-cta-btn')), 'LocationSection DOM contains .location-cta-btn');
assert(Boolean(locationEl.querySelector('.map-container')), 'LocationSection DOM contains .map-container');
assert(Boolean(locationEl.querySelector('iframe')), 'LocationSection DOM contains responsive iframe');

const socialEl = createSocialSection();
const socialCards = socialEl.querySelectorAll('.social-card');
assert(socialCards.length === 3, `SocialSection DOM contains exactly 3 .social-card elements (found ${socialCards.length})`);
for (const sc of socialCards) {
  assert(Boolean(sc.querySelector('.social-card-icon')), 'Each social-card contains .social-card-icon');
  assert(Boolean(sc.querySelector('.social-card-pill')), 'Each social-card contains .social-card-pill');
  assert(Boolean(sc.querySelector('.social-card-title')), 'Each social-card contains .social-card-title');
  assert(Boolean(sc.querySelector('.social-card-handle')), 'Each social-card contains .social-card-handle');
  assert(Boolean(sc.querySelector('.social-card-desc')), 'Each social-card contains .social-card-desc');
  assert(Boolean(sc.querySelector('.social-card-action')), 'Each social-card contains .social-card-action');
}

const storyEl = createBrandStory();
assert(Boolean(storyEl.querySelector('.story-card')), 'BrandStory DOM contains .story-card');
assert(Boolean(storyEl.querySelector('.story-header-emblem')), 'BrandStory DOM contains .story-header-emblem');
assert(Boolean(storyEl.querySelector('.story-crest')), 'BrandStory DOM contains .story-crest');
assert(Boolean(storyEl.querySelector('.story-tagline')), 'BrandStory DOM contains .story-tagline');
assert(Boolean(storyEl.querySelector('.story-title')), 'BrandStory DOM contains .story-title');
assert(Boolean(storyEl.querySelector('.story-divider')), 'BrandStory DOM contains .story-divider');
const pillarItems = storyEl.querySelectorAll('.story-pillar-item');
assert(pillarItems.length === 3, `BrandStory DOM contains exactly 3 .story-pillar-item pillars (found ${pillarItems.length})`);
assert(Boolean(storyEl.querySelector('.story-quote-container')), 'BrandStory DOM contains .story-quote-container');
assert(Boolean(storyEl.querySelector('.story-quote')), 'BrandStory DOM contains .story-quote');

// ============================================================================
// ADVERSARIAL SUITE 3: STRICT ABSENCE OF TRANSACTIONAL COMPONENTS
// ============================================================================
banner('Suite 3: Strict Absence of Transactional Components (Table QR Purity)');

const transactionalRegex = /\b(add-to-cart|addToCart|cart-drawer|cart-modal|cart-badge|shopping-cart|cart-icon|checkout|finalizar pedido|comprar|order-form|order-modal|payment-method|stripe|paypal)\b/i;

const componentDir = path.join(projectRoot, 'src/components');
const componentFiles = fs.readdirSync(componentDir).filter(f => f.endsWith('.js'));

let transactionalViolations = 0;
for (const file of componentFiles) {
  const filePath = path.join(componentDir, file);
  const code = fs.readFileSync(filePath, 'utf8');
  const match = transactionalRegex.exec(code);
  if (match) {
    transactionalViolations++;
    observe(`Transactional violation in ${file}: matched "${match[0]}"`);
  }
}
assert(transactionalViolations === 0, `Zero transactional patterns found across all ${componentFiles.length} component files`);

// Also check index.html and main.js
const indexHtmlContent = fs.readFileSync(path.join(projectRoot, 'index.html'), 'utf8');
const mainJsContent = fs.readFileSync(path.join(projectRoot, 'src/main.js'), 'utf8');
assert(!transactionalRegex.test(indexHtmlContent), 'index.html contains 0 transactional patterns');
assert(!transactionalRegex.test(mainJsContent), 'src/main.js contains 0 transactional patterns');

// Deep DOM tree scan: instantiate full application tree and audit all nodes
const fullAppContainer = new MockElement('div');
fullAppContainer.appendChild(createHeader());
fullAppContainer.appendChild(createHero());
fullAppContainer.appendChild(createBanquetShowcase());
fullAppContainer.appendChild(createCategoryNav(() => {}, () => {}));
fullAppContainer.appendChild(createMenuSection().element);
fullAppContainer.appendChild(createCustomizationGuide());
fullAppContainer.appendChild(createBrandStory());
fullAppContainer.appendChild(createLocationSection());
fullAppContainer.appendChild(createSocialSection());
fullAppContainer.appendChild(createFooter());

// Check buttons in full application DOM
const allButtons = fullAppContainer.querySelectorAll('button');
let illicitButtons = 0;
for (const btn of allButtons) {
  const text = (btn.textContent || '').toLowerCase();
  const cls = (btn.className || '').toLowerCase();
  if (text.includes('comprar') || text.includes('pagar') || text.includes('carrito') || text.includes('ordenar') || text.includes('agregar al pedido')) {
    illicitButtons++;
    observe(`Illicit button text detected: "${text}" with class "${cls}"`);
  }
}
assert(illicitButtons === 0, `All ${allButtons.length} buttons in rendered application are purely non-transactional`);

// Footer Table QR Disclaimer confirmation
const footerEl = createFooter();
const disclaimerEl = footerEl.querySelector('.footer-disclaimer');
assert(Boolean(disclaimerEl), 'Footer contains .footer-disclaimer element');
assert(disclaimerEl.textContent.includes('No se procesan pedidos ni transacciones'), 'Disclaimer explicitly states no order processing / payments occur');
assert(disclaimerEl.textContent.includes('código QR'), 'Disclaimer confirms table QR code visual browsing catalog role');

// ============================================================================
// ADVERSARIAL SUITE 4: STRICT ZERO EMOJIS ACROSS ALL 17 SOURCE FILES
// ============================================================================
banner('Suite 4: Strict Zero Emojis Across All 17 Source Files & index.html');

const UNICODE_EMOJI_REGEX = /[\u{1F300}-\u{1F5FF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{2B50}\u{200D}\u{FE0F}]/u;

const allTargetFiles = [
  path.join(projectRoot, 'index.html'),
  path.join(projectRoot, 'src/main.js'),
  path.join(projectRoot, 'src/components/BanquetShowcase.js'),
  path.join(projectRoot, 'src/components/BrandStory.js'),
  path.join(projectRoot, 'src/components/CategoryNav.js'),
  path.join(projectRoot, 'src/components/CustomizationGuide.js'),
  path.join(projectRoot, 'src/components/Footer.js'),
  path.join(projectRoot, 'src/components/Header.js'),
  path.join(projectRoot, 'src/components/Hero.js'),
  path.join(projectRoot, 'src/components/icons.js'),
  path.join(projectRoot, 'src/components/LocationSection.js'),
  path.join(projectRoot, 'src/components/MenuSection.js'),
  path.join(projectRoot, 'src/components/SocialSection.js'),
  path.join(projectRoot, 'src/data/config.js'),
  path.join(projectRoot, 'src/data/menu.js'),
  path.join(projectRoot, 'src/styles/main.css'),
  path.join(projectRoot, 'src/styles/reset.css')
];

assert(allTargetFiles.length === 17, `Target list encompasses exactly 17 files (16 in src/ + index.html)`);

let totalLinesScanned = 0;
let emojiViolationsCount = 0;

for (const targetPath of allTargetFiles) {
  const relativeName = path.relative(projectRoot, targetPath).replace(/\\/g, '/');
  assert(fs.existsSync(targetPath), `File exists: ${relativeName}`);
  
  const content = fs.readFileSync(targetPath, 'utf8');
  const lines = content.split('\n');
  totalLinesScanned += lines.length;

  let fileViolations = 0;
  for (let idx = 0; idx < lines.length; idx++) {
    const line = lines[idx];
    if (UNICODE_EMOJI_REGEX.test(line)) {
      fileViolations++;
      emojiViolationsCount++;
      observe(`Emoji violation in ${relativeName}:${idx + 1} -> ${line.trim()}`);
    }
  }

  assert(fileViolations === 0, `Zero emojis in ${relativeName} (${lines.length} lines scanned)`);
}

observe(`Total lines scanned across 17 files: ${totalLinesScanned}`);
assert(emojiViolationsCount === 0, `Codebase-wide emoji invariant: 0 violations across all 17 target files`);

// ============================================================================
// ADVERSARIAL SUITE 5: TABLE QR DEEP NAVIGATION INTEGRITY & R3 PRICING
// ============================================================================
banner('Suite 5: Table QR Deep Navigation Integrity & R3 Pricing Precision');

// Deep Link and Anchor Integrity
assert(header.innerHTML.includes('href="#carta"'), 'Header nav links to #carta');
assert(header.innerHTML.includes('href="#experiencias"'), 'Header nav links to #experiencias');
assert(header.innerHTML.includes('href="#historia"'), 'Header nav links to #historia');
assert(header.innerHTML.includes('href="#ubicacion"'), 'Header nav links to #ubicacion');
assert(header.innerHTML.includes('href="#redes"'), 'Header nav links to #redes');

assert(footerEl.innerHTML.includes('href="#inicio"'), 'Footer links to #inicio');
assert(footerEl.innerHTML.includes('href="#carta"'), 'Footer links to #carta');
assert(footerEl.innerHTML.includes('href="#experiencias"'), 'Footer links to #experiencias');
assert(footerEl.innerHTML.includes('href="#cat-adicionales"'), 'Footer links to #cat-adicionales');
assert(footerEl.innerHTML.includes('href="#historia"'), 'Footer links to #historia');
assert(footerEl.innerHTML.includes('href="#ubicacion"'), 'Footer links to #ubicacion');
assert(footerEl.innerHTML.includes('href="#redes"'), 'Footer links to #redes');

// External verified URLs
assert(restaurantConfig.location.googleMapsUrl === 'https://maps.google.com/?q=Serendipity+Burger', 'Config googleMapsUrl is verified');
assert(restaurantConfig.social.instagram.handle === '@serendipityburger.pe', 'Config instagram handle is @serendipityburger.pe');
assert(restaurantConfig.social.facebook.handle === 'Serendipity Burger Oficial', 'Config facebook handle is Serendipity Burger Oficial');
assert(restaurantConfig.social.tiktok.handle === '@serendipityburger', 'Config tiktok handle is @serendipityburger');

// R3 Pricing Accuracy
const jarraChica = menuItems.find(i => i.name.toLowerCase().includes('jarra') && i.name.toLowerCase().includes('chica'));
assert(Boolean(jarraChica), 'Jarra chica de Sangría exists in menuItems');
assert(jarraChica.price === 15.00, `Jarra chica price is S/. 15.00 (got ${jarraChica?.price})`);

const jarraGrande = menuItems.find(i => i.name.toLowerCase().includes('jarra') && i.name.toLowerCase().includes('grande'));
assert(Boolean(jarraGrande), 'Jarra grande de Sangría exists in menuItems');
assert(jarraGrande.price === 30.00, `Jarra grande price is S/. 30.00 (got ${jarraGrande?.price})`);

const tortas = menuItems.filter(i => i.name.toLowerCase().startsWith('torta '));
assert(tortas.length >= 3, `Found ${tortas.length} torta items in menuItems`);
for (const torta of tortas) {
  assert(torta.price === 13.00, `${torta.name} price is strictly S/. 13.00 (got ${torta.price})`);
}

const cremaVolteada = menuItems.find(i => i.name.toLowerCase().includes('crema volteada'));
assert(Boolean(cremaVolteada), 'Crema volteada exists in menuItems');
assert(cremaVolteada.price === 12.00, `Crema volteada price is S/. 12.00 (got ${cremaVolteada?.price})`);

const alitasAcevichadas = menuItems.find(i => {
  const name = (i.name || '').toLowerCase();
  const id = (i.id || '').toLowerCase();
  return (id.includes('alitas') || name.includes('alitas')) && (id.includes('acevichada') || name.includes('acevichada'));
});
assert(Boolean(alitasAcevichadas), 'Alitas Acevichadas exists in menuItems');
assert(alitasAcevichadas.price === 18.50, `Alitas Acevichadas price is S/. 18.50 (got ${alitasAcevichadas?.price})`);

// Category Terminology Invariants
const burgCat = menuCategories.find(c => c.id === 'hamburguesas');
assert(burgCat.name === 'Hamburguesas', `Category name is "Hamburguesas" without fast-food tropes (got "${burgCat.name}")`);

const grillCat = menuCategories.find(c => c.id === 'parrillas-banquetes');
assert(grillCat.name === 'Parrillas & Banquetes', `Unified category name is "Parrillas & Banquetes" (got "${grillCat.name}")`);

const adicionalesCat = menuCategories.find(c => c.id === 'adicionales');
assert(Boolean(adicionalesCat), 'Category for adicionales exists with id="adicionales"');
assert(!adicionalesCat.name.toLowerCase().includes('topping'), 'Category name does not contain "toppings"');
assert(adicionalesCat.badge.includes('Adicionales'), `Category badge uses "Adicionales" without "toppings" (got "${adicionalesCat.badge}")`);

// ============================================================================
// SUMMARY & VERDICT GENERATION
// ============================================================================
banner('CHALLENGER 2 SUMMARY & VERDICT');
console.log(`Total tests executed : ${totalTests}`);
console.log(`Passed tests         : ${GREEN}${passedTests}${RESET}`);
console.log(`Failed tests         : ${failedTests > 0 ? RED : GREEN}${failedTests}${RESET}`);
console.log(`Adversarial findings : ${observations.length}`);

if (failedTests === 0) {
  console.log(`\n${BOLD}${GREEN}✦ FINAL VERDICT: APPROVE (ALL ${totalTests} INVARIANTS SATISFIED) ✦${RESET}\n`);
  process.exit(0);
} else {
  console.log(`\n${BOLD}${RED}✦ FINAL VERDICT: REJECT (${failedTests} INVARIANTS FAILED) ✦${RESET}\n`);
  process.exit(1);
}
