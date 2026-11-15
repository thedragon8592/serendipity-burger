/**
 * ============================================================================
 * SERENDIPITY BURGER — MILESTONE M4 COMPREHENSIVE VERIFICATION SUITE
 * ============================================================================
 * Validates F16 (Location & Google Maps Luxury), F17 (Social Media Experience),
 * F18 (Brand Story & Manifesto), Header Navigation Anchors & Mobile Drawer,
 * Footer Brand Hallmark & Disclaimers, and Absolute Zero Emoji Invariants.
 * Zero external dependencies (runs in pure native Node.js).
 * ============================================================================
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert/strict';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

// ============================================================================
// SELF-CONTAINED LIGHTWEIGHT DOM ENVIRONMENT
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
    this.textContent_cache = null;
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
      // Stripped HTML tags
      return this._innerHTML.replace(/<[^>]*>/g, ' ');
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
  if (selector.includes('.')) {
    const parts = selector.split('.');
    const tag = parts[0];
    const cls = parts[1];
    if (tag && el.tagName.toLowerCase() !== tag.toLowerCase()) return false;
    return el.classList.contains(cls);
  }
  if (selector.startsWith('#')) return el.id === selector.slice(1);
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

global.document = {
  createElement: (tag) => new MockElement(tag),
  getElementById: (id) => null,
  querySelector: (sel) => null,
  body: new MockElement('BODY')
};
global.window = {
  location: { hash: '' },
  history: { pushState: () => {} },
  addEventListener: () => {}
};

// Unicode Emoji regex covering standard and pictographic ranges
const EMOJI_REGEX = /[\u{1F300}-\u{1FAFF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{2600}-\u{27BF}\u{2B50}\u{2B55}\u{231A}-\u{231B}\u{23E9}-\u{23EC}\u{23F0}\u{23F3}]/u;

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;

function banner(title) {
  console.log('\n' + '─'.repeat(76));
  console.log(`✦ ${title.toUpperCase()} ✦`);
  console.log('─'.repeat(76));
}

function test(name, fn) {
  totalTests++;
  try {
    fn();
    passedTests++;
    console.log(`  ✓ PASS  ${name}`);
  } catch (err) {
    failedTests++;
    console.error(`  ✗ FAIL  ${name}`);
    console.error(`    ↳ Error: ${err.message}`);
  }
}

// Dynamic Imports
const { restaurantConfig } = await import('../src/data/config.js');
const { createLocationSection } = await import('../src/components/LocationSection.js');
const { createSocialSection } = await import('../src/components/SocialSection.js');
const { createBrandStory } = await import('../src/components/BrandStory.js');
const { createHeader } = await import('../src/components/Header.js');
const { createFooter } = await import('../src/components/Footer.js');
const { getIconSvg } = await import('../src/components/icons.js');

// ============================================================================
// SUITE 1: LOCATION SECTION LUXURY & GOOGLE MAPS EMBED (F16)
// ============================================================================
banner('Suite 1: Location & Google Maps Luxury Experience (F16)');

const locationEl = createLocationSection();

test('Location section renders <section> with id="ubicacion"', () => {
  assert(locationEl && locationEl.tagName === 'SECTION');
  assert.equal(locationEl.id, 'ubicacion');
  assert(locationEl.classList.contains('location-section'));
});

test('Location section renders verified title from config', () => {
  assert(locationEl.innerHTML.includes(restaurantConfig.location.title));
  assert(locationEl.innerHTML.includes('Dónde Encontrarnos'));
});

test('Location section displays exact verified operating schedule', () => {
  assert(locationEl.innerHTML.includes('Lunes a Domingo · 5:00 PM - 11:30 PM'));
  assert(locationEl.innerHTML.includes(restaurantConfig.location.schedule));
});

test('Location section displays verified address and reference note', () => {
  assert(locationEl.innerHTML.includes(restaurantConfig.location.address));
  assert(locationEl.innerHTML.includes(restaurantConfig.location.reference));
});

test('Location section includes elegant CTA button "Abrir en Google Maps" with target="_blank"', () => {
  const ctaBtn = locationEl.querySelector('.location-cta-btn');
  assert(ctaBtn, 'CTA button exists');
  assert.equal(ctaBtn.getAttribute('href'), restaurantConfig.location.googleMapsUrl);
  assert.equal(ctaBtn.getAttribute('target'), '_blank');
  assert.equal(ctaBtn.getAttribute('rel'), 'noopener noreferrer');
  assert(ctaBtn.textContent.includes('Abrir en Google Maps'));
});

test('Location section embeds responsive Google Maps iframe without garish borders', () => {
  const iframe = locationEl.querySelector('iframe');
  assert(iframe, 'Google Maps iframe exists');
  assert.equal(iframe.getAttribute('src'), restaurantConfig.location.embedMapUrl);
  assert.equal(iframe.getAttribute('loading'), 'lazy');
  assert.equal(iframe.getAttribute('referrerpolicy'), 'no-referrer-when-downgrade');
  assert(iframe.getAttribute('title').includes('Google Maps'));
});

test('Location section renders bespoke SVG line icons (pin, clock, compass, cloche, spark)', () => {
  const icons = locationEl.querySelectorAll('svg');
  assert(icons.length >= 4, `Expected at least 4 SVG icons, got ${icons.length}`);
});

test('Location section strictly contains ZERO Unicode emojis', () => {
  assert(!EMOJI_REGEX.test(locationEl.innerHTML), 'Found emoji in LocationSection');
});

// ============================================================================
// SUITE 2: SOCIAL MEDIA LUXURY EXPERIENCE (F17)
// ============================================================================
banner('Suite 2: Social Media Luxury Experience (F17)');

const socialEl = createSocialSection();

test('Social section renders <section> with id="redes"', () => {
  assert(socialEl && socialEl.tagName === 'SECTION');
  assert.equal(socialEl.id, 'redes');
  assert(socialEl.classList.contains('social-section'));
});

test('Social section renders verified title "Sigue la Experiencia"', () => {
  assert(socialEl.innerHTML.includes('Sigue la Experiencia'));
});

test('Social section renders exactly 3 official editorial cards (Instagram, Facebook, TikTok)', () => {
  const cards = socialEl.querySelectorAll('.social-card');
  assert.equal(cards.length, 3, `Expected 3 social cards, got ${cards.length}`);
});

test('Social card for Instagram contains verified handle and URL', () => {
  assert(socialEl.innerHTML.includes('@serendipityburger.pe'));
  assert(socialEl.innerHTML.includes(restaurantConfig.social.instagram.url));
  assert(socialEl.innerHTML.includes(restaurantConfig.social.instagram.label));
});

test('Social card for Facebook contains verified name and URL', () => {
  assert(socialEl.innerHTML.includes('Serendipity Burger Oficial'));
  assert(socialEl.innerHTML.includes(restaurantConfig.social.facebook.url));
  assert(socialEl.innerHTML.includes(restaurantConfig.social.facebook.label));
});

test('Social card for TikTok contains verified handle and URL', () => {
  assert(socialEl.innerHTML.includes('@serendipityburger'));
  assert(socialEl.innerHTML.includes(restaurantConfig.social.tiktok.url));
  assert(socialEl.innerHTML.includes(restaurantConfig.social.tiktok.label));
});

test('Social section contains ZERO fabricated statistics (no fake followers/likes)', () => {
  const forbiddenStatKeywords = ['seguidores', 'followers', 'k followers', '100k', '50k', 'likes', 'millones'];
  const content = socialEl.textContent.toLowerCase();
  for (const kw of forbiddenStatKeywords) {
    assert(!content.includes(kw), `Found fabricated stat keyword: ${kw}`);
  }
});

test('Social section invites guests to behind-the-scenes grill artistry and seasonal specials', () => {
  const text = socialEl.textContent;
  assert(text.includes('Detrás de escena') || text.includes('fuego lento') || text.includes('artesanal'));
});

test('Social section strictly contains ZERO Unicode emojis', () => {
  assert(!EMOJI_REGEX.test(socialEl.innerHTML), 'Found emoji in SocialSection');
});

// ============================================================================
// SUITE 3: BRAND STORY & CULINARY MANIFESTO (F18)
// ============================================================================
banner('Suite 3: Brand Story & Culinary Manifesto (F18)');

const storyEl = createBrandStory();

test('BrandStory section renders <section> with id="historia"', () => {
  assert(storyEl && storyEl.tagName === 'SECTION');
  assert.equal(storyEl.id, 'historia');
  assert(storyEl.classList.contains('brand-story-section'));
});

test('BrandStory renders tagline and title from config', () => {
  assert(storyEl.innerHTML.includes(restaurantConfig.story.tagline));
  assert(storyEl.innerHTML.includes(restaurantConfig.story.title));
});

test('BrandStory renders authentic culinary manifesto paragraphs', () => {
  for (const para of restaurantConfig.story.paragraphs) {
    assert(storyEl.innerHTML.includes(para), 'Missing story paragraph');
  }
});

test('BrandStory renders highlighted quote blockquote with class="story-quote"', () => {
  const quote = storyEl.querySelector('.story-quote');
  assert(quote, 'story-quote blockquote exists');
  assert(quote.textContent.includes('Recibiéndolos siempre con una sonrisa'));
});

test('BrandStory includes 3 culinary pillar cards (Materias Primas, Técnica, Hospitalidad)', () => {
  const pillars = storyEl.querySelectorAll('.story-pillar-item');
  assert.equal(pillars.length, 3, `Expected 3 pillars, got ${pillars.length}`);
});

test('BrandStory strictly contains ZERO Unicode emojis', () => {
  assert(!EMOJI_REGEX.test(storyEl.innerHTML), 'Found emoji in BrandStory');
});

// ============================================================================
// SUITE 4: HEADER NAVIGATION ANCHORS & MOBILE DRAWER
// ============================================================================
banner('Suite 4: Header Navigation Anchors & Mobile Drawer');

const headerEl = createHeader();

test('Header renders <header class="site-header">', () => {
  assert(headerEl && headerEl.tagName === 'HEADER');
  assert(headerEl.classList.contains('site-header'));
});

test('Header renders brand monogram crest emblem "S"', () => {
  const emblem = headerEl.querySelector('.brand-emblem');
  assert(emblem, 'brand-emblem exists');
  assert.equal(emblem.textContent.trim(), 'S');
});

test('Header desktop navigation contains required anchors (#carta, #experiencias, #historia, #ubicacion, #redes)', () => {
  const links = Array.from(headerEl.querySelectorAll('.nav-link')).map(a => a.getAttribute('href'));
  assert(links.includes('#carta'), 'Missing #carta');
  assert(links.includes('#experiencias'), 'Missing #experiencias');
  assert(links.includes('#historia'), 'Missing #historia');
  assert(links.includes('#ubicacion'), 'Missing #ubicacion');
  assert(links.includes('#redes'), 'Missing #redes');
});

test('Header contains direct Google Maps action button with bespoke SVG icon', () => {
  const mapsBtn = headerEl.querySelector('.header-btn-maps');
  assert(mapsBtn, 'header-btn-maps exists');
  assert.equal(mapsBtn.getAttribute('href'), restaurantConfig.location.googleMapsUrl);
  assert(mapsBtn.querySelector('svg'), 'SVG icon in maps button');
});

test('Header includes mobile drawer toggle button with aria attributes', () => {
  const toggle = headerEl.querySelector('.header-menu-toggle');
  assert(toggle, 'header-menu-toggle button exists');
  assert.equal(toggle.getAttribute('aria-expanded'), 'false');
  assert.equal(toggle.getAttribute('aria-controls'), 'mobile-nav-drawer');
});

test('Header includes mobile navigation drawer with navigation links and close button', () => {
  const drawer = headerEl.querySelector('.header-mobile-drawer');
  assert(drawer, 'header-mobile-drawer exists');
  assert.equal(drawer.id, 'mobile-nav-drawer');
  const drawerLinks = Array.from(drawer.querySelectorAll('.drawer-link')).map(a => a.getAttribute('href'));
  assert(drawerLinks.includes('#carta'), 'Drawer missing #carta');
  assert(drawerLinks.includes('#experiencias'), 'Drawer missing #experiencias');
  assert(drawerLinks.includes('#historia'), 'Drawer missing #historia');
  assert(drawerLinks.includes('#ubicacion'), 'Drawer missing #ubicacion');
  assert(drawerLinks.includes('#redes'), 'Drawer missing #redes');
});

test('Mobile drawer opens and closes reactively upon toggle click', () => {
  const toggle = headerEl.querySelector('.header-menu-toggle');
  const drawer = headerEl.querySelector('.header-mobile-drawer');
  const closeBtn = headerEl.querySelector('.drawer-close-btn');

  // Trigger open
  toggle.click();
  assert(drawer.classList.contains('is-open'), 'Drawer should have class is-open');
  assert.equal(toggle.getAttribute('aria-expanded'), 'true');
  assert.equal(drawer.getAttribute('aria-hidden'), 'false');

  // Trigger close
  closeBtn.click();
  assert(!drawer.classList.contains('is-open'), 'Drawer should not have class is-open');
  assert.equal(toggle.getAttribute('aria-expanded'), 'false');
  assert.equal(drawer.getAttribute('aria-hidden'), 'true');
});

test('Header strictly contains ZERO Unicode emojis', () => {
  assert(!EMOJI_REGEX.test(headerEl.innerHTML), 'Found emoji in Header');
});

// ============================================================================
// SUITE 5: FOOTER BRAND HALLMARK, CURRENCY NOTICE & ZERO TRANSACTIONAL COPY
// ============================================================================
banner('Suite 5: Footer Brand Hallmark & Non-Transactional Integrity');

const footerEl = createFooter();

test('Footer renders <footer class="site-footer">', () => {
  assert(footerEl && footerEl.tagName === 'FOOTER');
  assert(footerEl.classList.contains('site-footer'));
});

test('Footer renders brand hallmark crest and slogan', () => {
  assert(footerEl.innerHTML.includes('footer-crest'));
  assert(footerEl.innerHTML.includes(restaurantConfig.brandName));
  assert(footerEl.innerHTML.includes(restaurantConfig.slogan));
});

test('Footer renders navigation links (#inicio, #carta, #experiencias, #historia, #ubicacion, #redes)', () => {
  const footerHrefs = Array.from(footerEl.querySelectorAll('.footer-link')).map(a => a.getAttribute('href'));
  assert(footerHrefs.includes('#inicio'), 'Missing #inicio');
  assert(footerHrefs.includes('#carta'), 'Missing #carta');
  assert(footerHrefs.includes('#experiencias'), 'Missing #experiencias');
  assert(footerHrefs.includes('#historia'), 'Missing #historia');
  assert(footerHrefs.includes('#ubicacion'), 'Missing #ubicacion');
  assert(footerHrefs.includes('#redes'), 'Missing #redes');
});

test('Footer includes dynamic current year and official Soles (S/.) statement', () => {
  const year = new Date().getFullYear().toString();
  assert(footerEl.innerHTML.includes(year), 'Missing current year in footer');
  assert(footerEl.innerHTML.includes('Precios en Soles (S/.)'), 'Missing Soles statement');
});

test('Footer enforces non-transactional catalog disclaimer', () => {
  const text = footerEl.textContent.toLowerCase();
  assert(text.includes('catálogo digital visual') || text.includes('código qr') || text.includes('no se procesan'));
});

test('Footer strictly contains ZERO Unicode emojis', () => {
  assert(!EMOJI_REGEX.test(footerEl.innerHTML), 'Found emoji in Footer');
});

// ============================================================================
// SUITE 6: CSS STYLING & LUXURY DESIGN SYSTEM INTEGRITY
// ============================================================================
banner('Suite 6: CSS Luxury Design System & Responsive Rules');

const cssPath = path.join(projectRoot, 'src', 'styles', 'main.css');
const css = fs.readFileSync(cssPath, 'utf8');

test('main.css defines luxury styling rules for .location-section and .map-container', () => {
  assert(css.includes('.location-section'));
  assert(css.includes('.location-info-card'));
  assert(css.includes('.map-container'));
  assert(css.includes('.map-badge'));
  assert(css.includes('.location-cta-btn'));
});

test('main.css defines luxury styling rules for .social-section and .social-card', () => {
  assert(css.includes('.social-section'));
  assert(css.includes('.social-cards-grid'));
  assert(css.includes('.social-card'));
  assert(css.includes('.social-card-icon'));
});

test('main.css defines luxury styling rules for .brand-story-section and pillars', () => {
  assert(css.includes('.brand-story-section'));
  assert(css.includes('.story-card'));
  assert(css.includes('.story-pillars-grid'));
  assert(css.includes('.story-pillar-item'));
  assert(css.includes('.story-quote'));
});

test('main.css defines mobile drawer and hamburger toggle styling', () => {
  assert(css.includes('.header-menu-toggle'));
  assert(css.includes('.header-mobile-drawer'));
  assert(css.includes('.drawer-backdrop'));
  assert(css.includes('.drawer-panel'));
});

test('main.css contains ZERO Unicode emojis', () => {
  assert(!EMOJI_REGEX.test(css), 'Found emoji in main.css');
});

// ============================================================================
// SUITE 7: ABSOLUTE ZERO EMOJI AUDIT ACROSS ALL PROJECT FILES
// ============================================================================
banner('Suite 7: Project-Wide Absolute Zero Emoji Invariant');

const filesToAudit = [
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

for (const relPath of filesToAudit) {
  test(`File ${relPath} contains strictly ZERO Unicode emojis`, () => {
    const fullPath = path.join(projectRoot, relPath);
    assert(fs.existsSync(fullPath), `File does not exist: ${relPath}`);
    const content = fs.readFileSync(fullPath, 'utf8');
    assert(!EMOJI_REGEX.test(content), `Found Unicode emoji violation in ${relPath}`);
  });
}

// ============================================================================
// VERIFICATION SUMMARY
// ============================================================================
console.log('\n' + '═'.repeat(76));
console.log('MILESTONE M4 VERIFICATION SUMMARY');
console.log(`  Total Tests Run:  ${totalTests}`);
console.log(`  Passed Tests:     ${passedTests}`);
console.log(`  Failed Tests:     ${failedTests}`);
console.log('═'.repeat(76));

if (failedTests > 0) {
  console.error(`\n❌ MILESTONE M4 VERIFICATION FAILED: ${failedTests} assertion(s) failed.\n`);
  process.exit(1);
} else {
  console.log('\n✅ ALL MILESTONE M4 INVARIANTS SATISFIED (F16, F17, F18, Header, Footer).\n');
  process.exit(0);
}
