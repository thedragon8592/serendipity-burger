/**
 * ============================================================================
 * EMPIRICAL CHALLENGER STRESS HARNESS — MILESTONE M2
 * SERENDIPITY BURGER: FIVE-STAR LUXURY UI RENDERING & ANIMATIONS
 * ============================================================================
 * Independent verification script written by teamwork_challenger_m2_2.
 * Empirical stress tests:
 *   1. Full DOM render simulation of all UI components
 *      (Header, Hero, BanquetShowcase, CategoryNav, MenuSection,
 *       CustomizationGuide, LocationSection, SocialSection, Footer, BrandStory)
 *   2. Component event interaction & reactive updates
 *   3. CSS animations (@keyframes luxuryFadeIn, timing functions, durations)
 *   4. CSS transitions (cards, buttons, navigation pills, micro-interactions)
 *   5. Obsidian & Champagne luxury palette token verification
 *   6. Tabular numerals on all pricing elements
 *   7. Absolute zero emojis across all rendered components and CSS
 * ============================================================================
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

// --- ANSI Colors ---
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
const failureList = [];

function banner(title) {
  console.log(`\n${BOLD}${GOLD}✦ ${title.toUpperCase()} ✦${RESET}`);
  console.log('─'.repeat(74));
}

function assert(condition, testName, details = '') {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`  ${GREEN}✓ PASS${RESET}  ${testName}`);
  } else {
    failedTests++;
    console.log(`  ${RED}✗ FAIL${RESET}  ${testName} ${details ? `(${details})` : ''}`);
    failureList.push({ testName, details });
  }
}

// ============================================================================
// LIGHTWEIGHT PERSISTENT DOM SIMULATOR FOR NODE ENVIRONMENT
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
    this.listeners = new Map();
    this._innerHTML = '';
    this.value = '';
  }

  get className() {
    return this._className;
  }
  set className(val) {
    this._className = val || '';
    this.classList.classes = new Set((this._className || '').split(/\s+/).filter(Boolean));
  }

  get innerHTML() {
    if (this._innerHTML) {
      return this._innerHTML;
    }
    if (this.children.length > 0) {
      return this.children.map(c => c.innerHTML).join('');
    }
    return '';
  }
  set innerHTML(html) {
    this._innerHTML = html;
    this.children = [];
    if (html && typeof html === 'string') {
      this.children = parseHtmlToNodes(html);
    }
  }

  get textContent() {
    return this._innerHTML.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  }

  setAttribute(k, v) {
    this.attributes.set(k, String(v));
    if (k.toLowerCase() === 'class') {
      this.className = String(v);
    }
    if (k.toLowerCase() === 'id') {
      this.id = String(v);
    }
  }
  getAttribute(k) {
    return this.attributes.get(k) || null;
  }
  hasAttribute(k) {
    return this.attributes.has(k);
  }

  appendChild(child) {
    this.children.push(child);
    return child;
  }

  addEventListener(event, fn) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event).push(fn);
  }

  dispatchEvent(event) {
    const list = this.listeners.get(event.type) || [];
    for (const fn of list) {
      fn(event);
    }
  }

  scrollIntoView() {
    // simulated no-op
  }

  focus() {
    // simulated no-op
  }

  querySelector(selector) {
    const all = this.querySelectorAll(selector);
    return all.length > 0 ? all[0] : null;
  }

  querySelectorAll(selector) {
    const results = [];
    function search(node) {
      for (const child of node.children) {
        if (matches(child, selector)) {
          results.push(child);
        }
        search(child);
      }
    }
    search(this);
    return results;
  }
}

function matches(el, selector) {
  if (selector.startsWith('.')) {
    return el.classList.contains(selector.slice(1));
  }
  if (selector.startsWith('#')) {
    return el.id === selector.slice(1);
  }
  return el.tagName.toLowerCase() === selector.toLowerCase();
}

function parseHtmlToNodes(html) {
  const root = new MockElement('root');
  const stack = [root];
  const tagRegex = /<!--[\s\S]*?-->|<(\/)?([a-zA-Z0-9-]+)((?:\s+[a-zA-Z0-9-:]+(?:=(?:"[^"]*"|'[^']*'|[^\s>]+))?)*)\s*(\/)?>|([^<]+)/g;
  let match;
  while ((match = tagRegex.exec(html)) !== null) {
    if (match[0].startsWith('<!--')) continue;
    const isClosing = Boolean(match[1]);
    const tagName = match[2];
    const attrsStr = match[3];
    const isSelfClosing = Boolean(match[4]) || ['input', 'img', 'br', 'hr', 'source'].includes((tagName || '').toLowerCase());
    const text = match[5];

    if (text) continue;

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
      if (!isSelfClosing) {
        stack.push(el);
      }
    }
  }
  return root.children;
}

// Global DOM Mock Setup
global.document = {
  createElement: (tag) => new MockElement(tag)
};

// Emoji Regex for Absolute Zero Check
const EMOJI_REGEX = /[\u{1F300}-\u{1FAFF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{2600}-\u{27BF}\u{2B50}\u{2B55}\u{231A}-\u{231B}\u{23E9}-\u{23EC}\u{23F0}\u{23F3}]/u;

// ============================================================================
// SUITE 1: DOM RENDER SIMULATION OF ALL COMPONENTS
// ============================================================================
banner('SUITE 1: DOM RENDER SIMULATION OF ALL COMPONENTS');

// Dynamic import of components
const { createHeader } = await import('../src/components/Header.js');
const { createHero } = await import('../src/components/Hero.js');
const { createBanquetShowcase } = await import('../src/components/BanquetShowcase.js');
const { createCategoryNav } = await import('../src/components/CategoryNav.js');
const { createMenuSection } = await import('../src/components/MenuSection.js');
const { createCustomizationGuide } = await import('../src/components/CustomizationGuide.js');
const { createLocationSection } = await import('../src/components/LocationSection.js');
const { createSocialSection } = await import('../src/components/SocialSection.js');
const { createFooter } = await import('../src/components/Footer.js');
const { createBrandStory } = await import('../src/components/BrandStory.js');
const { getIconSvg } = await import('../src/components/icons.js');

// 1.1 Header Component
const headerEl = createHeader();
assert(headerEl && headerEl.tagName === 'HEADER', 'Header renders valid <header> element');
assert(headerEl.className.includes('site-header'), 'Header has class site-header');
assert(headerEl.innerHTML.includes('brand-emblem') && headerEl.innerHTML.includes('>S<'), 'Header contains monogram crest emblem "S"');
assert(headerEl.innerHTML.includes('header-btn-maps'), 'Header contains Google Maps luxury action button');
assert(!EMOJI_REGEX.test(headerEl.innerHTML), 'Header contains ZERO Unicode emojis');
assert(headerEl.innerHTML.includes('class="luxury-svg-icon"'), 'Header renders bespoke SVG vector icons');

// 1.2 Hero Component
const heroEl = createHero();
assert(heroEl && heroEl.tagName === 'SECTION', 'Hero renders valid <section> element');
assert(heroEl.id === 'inicio', 'Hero element has id "inicio"');
assert(heroEl.innerHTML.includes('VER LA CARTA') && heroEl.innerHTML.includes('DÓNDE ENCONTRARNOS'), 'Hero contains primary CTA actions');
assert(heroEl.innerHTML.includes('hallmarks-strip') && heroEl.innerHTML.includes('Cortes a la Parrilla'), 'Hero renders Haute-Cuisine Hallmarks strip');
assert(heroEl.innerHTML.includes('Coctelería de Autor') && heroEl.innerHTML.includes('Experiencia Exclusiva'), 'Hero renders Coctelería & Exclusiva hallmarks');
assert(!EMOJI_REGEX.test(heroEl.innerHTML), 'Hero contains ZERO Unicode emojis');
assert(!heroEl.innerHTML.includes('undefined') && !heroEl.innerHTML.includes('null'), 'Hero has no undefined/null string leaks');

// 1.3 BanquetShowcase Component
const banquetEl = createBanquetShowcase();
assert(banquetEl && banquetEl.tagName === 'SECTION', 'BanquetShowcase renders valid <section> element');
assert(banquetEl.id === 'banquetes', 'BanquetShowcase element has id "banquetes"');
assert(banquetEl.innerHTML.includes('Grandes Banquetes de Selección'), 'BanquetShowcase contains editorial section title');
assert(banquetEl.innerHTML.includes('banquete-card'), 'BanquetShowcase renders banquete-card articles');
assert(banquetEl.innerHTML.includes('banquete-servings') && banquetEl.innerHTML.includes('banquete-price'), 'BanquetShowcase cards render servings and price');
assert(!EMOJI_REGEX.test(banquetEl.innerHTML), 'BanquetShowcase contains ZERO Unicode emojis');

// 1.4 CategoryNav Component & Interaction Simulation
let searchReceived = null;
let categoryReceived = null;
const categoryNavEl = createCategoryNav(
  (query) => { searchReceived = query; },
  (catId) => { categoryReceived = catId; }
);
assert(categoryNavEl && categoryNavEl.tagName === 'DIV', 'CategoryNav renders valid container');
assert(categoryNavEl.id === 'menu-nav', 'CategoryNav has id "menu-nav"');
assert(categoryNavEl.innerHTML.includes('category-pill'), 'CategoryNav renders category pills');
assert(categoryNavEl.innerHTML.includes('search-input'), 'CategoryNav renders search input');
assert(!EMOJI_REGEX.test(categoryNavEl.innerHTML), 'CategoryNav contains ZERO Unicode emojis');

// Simulate search input event
const searchInput = categoryNavEl.querySelector('.search-input');
assert(searchInput !== null, 'CategoryNav has search input element');
if (searchInput) {
  searchInput.value = 'hamburguesa ';
  searchInput.dispatchEvent({ type: 'input', target: { value: 'hamburguesa ' } });
  assert(searchReceived === 'hamburguesa', 'CategoryNav input listener fires onSearchChange with trimmed query');
}

// Simulate search clear click
const clearBtn = categoryNavEl.querySelector('.search-clear-btn');
assert(clearBtn !== null, 'CategoryNav has search clear button');
if (clearBtn) {
  clearBtn.dispatchEvent({ type: 'click' });
  assert(searchReceived === '', 'CategoryNav clear button fires onSearchChange with empty string');
}

// Simulate category pill selection
const pills = categoryNavEl.querySelectorAll('.category-pill');
assert(pills.length >= 7, 'CategoryNav has at least 7 category pills (Ver Todo + 6 categories)');
const coctelesPill = pills.find(p => p.getAttribute('data-category') === 'cocteles');
assert(coctelesPill !== undefined, 'CategoryNav includes pill for "cocteles"');
if (coctelesPill) {
  coctelesPill.dispatchEvent({ type: 'click' });
  assert(categoryReceived === 'cocteles', 'CategoryNav pill click triggers onCategorySelect("cocteles")');
  assert(coctelesPill.classList.contains('active'), 'Selected pill receives "active" class');
}

// 1.5 MenuSection Component & Reactive Filter Updates
const menuSectionObj = createMenuSection();
assert(menuSectionObj && menuSectionObj.element && typeof menuSectionObj.update === 'function', 'MenuSection returns { element, update } controller');
assert(menuSectionObj.element.id === 'menu-content', 'MenuSection element has id "menu-content"');
assert(menuSectionObj.element.children.length > 0, 'MenuSection initially renders category groups');
assert(!EMOJI_REGEX.test(menuSectionObj.element.innerHTML), 'MenuSection contains ZERO Unicode emojis on initial render');

// Test reactive update for specific category
menuSectionObj.update('cocteles', '');
assert(menuSectionObj.element.children.length === 1, 'MenuSection filtered to "cocteles" contains exactly 1 groupSection');
assert(menuSectionObj.element.children[0].id === 'cat-cocteles', 'GroupSection has id "cat-cocteles"');
assert(menuSectionObj.element.children[0].innerHTML.includes('Sangría'), 'Cócteles section renders Sangría items');

// Test reactive search filter (query "acevichada")
menuSectionObj.update('all', 'acevichada');
assert(menuSectionObj.element.children.length === 1, 'MenuSection search "acevichada" finds 1 matching category section');
assert(menuSectionObj.element.innerHTML.includes('Alitas a la Parrilla (Salsa Acevichada)'), 'MenuSection search finds Alitas Acevichada');
assert(menuSectionObj.element.innerHTML.includes('S/. 18.50'), 'Alitas Acevichada displays S/. 18.50');

// Test reactive empty search state
menuSectionObj.update('all', 'xyz_dish_that_does_not_exist_987');
assert(menuSectionObj.element.innerHTML.includes('No encontramos platos'), 'MenuSection renders elegant empty state for unmatched search');
assert(menuSectionObj.element.innerHTML.includes('luxury-svg-icon'), 'Empty state renders bespoke SVG icon');
assert(!EMOJI_REGEX.test(menuSectionObj.element.innerHTML), 'Empty state contains ZERO Unicode emojis');

// Reset to all
menuSectionObj.update('all', '');

// 1.6 CustomizationGuide Component
const customGuideEl = createCustomizationGuide();
assert(customGuideEl && customGuideEl.tagName === 'SECTION', 'CustomizationGuide renders valid <section>');
assert(customGuideEl.id === 'cat-adicionales', 'CustomizationGuide has id "cat-adicionales"');
assert(!customGuideEl.innerHTML.toLowerCase().includes('topping'), 'CustomizationGuide strictly excludes the word "topping"');
assert(customGuideEl.innerHTML.includes('custom-groups-grid'), 'CustomizationGuide renders custom-groups-grid');
assert(customGuideEl.innerHTML.includes('cremas-pills-wrap'), 'CustomizationGuide renders cremas-pills-wrap');
assert(customGuideEl.innerHTML.includes('Nuestras Cremas de la Casa'), 'CustomizationGuide highlights house sauces');
assert(!EMOJI_REGEX.test(customGuideEl.innerHTML), 'CustomizationGuide contains ZERO Unicode emojis');

// 1.7 LocationSection Component
const locSectionEl = createLocationSection();
assert(locSectionEl && locSectionEl.tagName === 'SECTION', 'LocationSection renders valid <section>');
assert(locSectionEl.id === 'ubicacion', 'LocationSection has id "ubicacion"');
assert(locSectionEl.innerHTML.includes('iframe') && locSectionEl.innerHTML.includes('google.com/maps'), 'LocationSection renders Google Maps embed iframe');
assert(locSectionEl.innerHTML.includes('Horarios de Atención'), 'LocationSection renders operating hours');
assert(!EMOJI_REGEX.test(locSectionEl.innerHTML), 'LocationSection contains ZERO Unicode emojis');

// 1.8 SocialSection Component
const socialSectionEl = createSocialSection();
assert(socialSectionEl && socialSectionEl.tagName === 'SECTION', 'SocialSection renders valid <section>');
assert(socialSectionEl.id === 'redes', 'SocialSection has id "redes"');
assert(socialSectionEl.innerHTML.includes('social-card'), 'SocialSection renders social cards');
assert(socialSectionEl.innerHTML.includes('instagram.com') && socialSectionEl.innerHTML.includes('tiktok.com'), 'SocialSection links verified Instagram & TikTok');
assert(!EMOJI_REGEX.test(socialSectionEl.innerHTML), 'SocialSection contains ZERO Unicode emojis');

// 1.9 Footer Component
const footerEl = createFooter();
assert(footerEl && footerEl.tagName === 'FOOTER', 'Footer renders valid <footer> element');
assert(footerEl.className.includes('site-footer'), 'Footer has class site-footer');
assert(footerEl.innerHTML.includes(new Date().getFullYear().toString()), 'Footer contains current year dynamically');
assert(footerEl.innerHTML.includes('Precios en Soles (S/.)'), 'Footer includes official currency statement');
assert(!EMOJI_REGEX.test(footerEl.innerHTML), 'Footer contains ZERO Unicode emojis');

// 1.10 BrandStory Component
const brandStoryEl = createBrandStory();
assert(brandStoryEl && brandStoryEl.tagName === 'SECTION', 'BrandStory renders valid <section>');
assert(brandStoryEl.id === 'historia', 'BrandStory has id "historia"');
assert(brandStoryEl.innerHTML.includes('story-quote'), 'BrandStory renders culinary quote');
assert(!EMOJI_REGEX.test(brandStoryEl.innerHTML), 'BrandStory contains ZERO Unicode emojis');

// ============================================================================
// SUITE 2: CSS ANIMATIONS & MICRO-ANIMATION STRESS TESTING
// ============================================================================
banner('SUITE 2: CSS ANIMATIONS & MICRO-ANIMATIONS IN MAIN.CSS');

const cssPath = path.join(projectRoot, 'src', 'styles', 'main.css');
assert(fs.existsSync(cssPath), 'src/styles/main.css exists');
const cssContent = fs.readFileSync(cssPath, 'utf8');

// 2.1 Keyframes luxuryFadeIn Verification
assert(cssContent.includes('@keyframes luxuryFadeIn'), '@keyframes luxuryFadeIn is defined in main.css');
const keyframesMatch = cssContent.match(/@keyframes\s+luxuryFadeIn\s*\{([\s\S]*?)\n\}/);
assert(keyframesMatch !== null, 'luxuryFadeIn keyframe block extracted successfully');
if (keyframesMatch) {
  const body = keyframesMatch[1];
  assert(body.includes('opacity: 0') && body.includes('opacity: 1'), 'luxuryFadeIn transitions opacity from 0 to 1');
  assert(body.includes('translateY(8px)') && body.includes('translateY(0)'), 'luxuryFadeIn transitions translateY from 8px to 0 for smooth entrance');
}

// 2.2 Menu Group Animation Application
const menuGroupRule = cssContent.match(/\.menu-group\s*\{([^}]+)\}/);
assert(menuGroupRule !== null, '.menu-group CSS rule found');
if (menuGroupRule) {
  const body = menuGroupRule[1];
  assert(body.includes('animation: luxuryFadeIn 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards'), '.menu-group applies luxuryFadeIn with 0.35s and smooth cubic-bezier curve');
}

// 2.3 Timing Functions and Transition Variables
assert(cssContent.includes('--transition-fast: 0.18s cubic-bezier(0.16, 1, 0.3, 1);'), '--transition-fast defined with cubic-bezier');
assert(cssContent.includes('--transition-normal: 0.28s cubic-bezier(0.16, 1, 0.3, 1);'), '--transition-normal defined with cubic-bezier');
assert(cssContent.includes('--transition-smooth: 0.40s cubic-bezier(0.16, 1, 0.3, 1);'), '--transition-smooth defined with cubic-bezier');

// 2.4 Button Transitions
const btnPrimaryRule = cssContent.match(/\.btn-primary\s*\{([^}]+)\}/);
assert(btnPrimaryRule !== null, '.btn-primary rule defined');
if (btnPrimaryRule) {
  assert(btnPrimaryRule[1].includes('transition: all var(--transition-normal)'), '.btn-primary uses smooth transition');
}
assert(cssContent.includes('.btn-primary:hover'), '.btn-primary:hover state defined');
assert(cssContent.includes('.btn-secondary:hover'), '.btn-secondary:hover state defined');

// 2.5 Category Navigation Pill Transitions & Active Glow
const categoryPillRule = cssContent.match(/\.category-pill\s*\{([^}]+)\}/);
assert(categoryPillRule !== null, '.category-pill rule defined');
if (categoryPillRule) {
  assert(categoryPillRule[1].includes('transition: all var(--transition-fast)'), '.category-pill uses transition');
}
assert(cssContent.includes('.category-pill:hover'), '.category-pill:hover state defined');
const pillActiveRule = cssContent.match(/\.category-pill\.active\s*\{([^}]+)\}/);
assert(pillActiveRule !== null, '.category-pill.active rule defined');
if (pillActiveRule) {
  assert(pillActiveRule[1].includes('border-color: var(--clr-gold-champagne)'), '.category-pill.active highlights with champagne gold border');
  assert(pillActiveRule[1].includes('box-shadow: 0 0 14px var(--clr-gold-glow)'), '.category-pill.active emits subtle gold glow');
  assert(!pillActiveRule[1].includes('linear-gradient(135deg, var(--clr-burgundy)'), '.category-pill.active does NOT use diner burgundy gradient');
}

// 2.6 Card Elevations & Hover Transforms
const menuCardRule = cssContent.match(/\.menu-card\s*\{([^}]+)\}/);
assert(menuCardRule !== null, '.menu-card rule defined');
if (menuCardRule) {
  assert(menuCardRule[1].includes('transition: transform var(--transition-normal)'), '.menu-card defines hardware-accelerated transform transition');
}
assert(cssContent.includes('.menu-card:hover'), '.menu-card:hover elevation defined');
assert(cssContent.includes('.banquete-card:hover'), '.banquete-card:hover elevation defined');
assert(cssContent.includes('.social-card:hover'), '.social-card:hover elevation defined');

// 2.7 Tabular Numerals on Price Display
assert(cssContent.includes('font-variant-numeric: tabular-nums;'), 'CSS enforces tabular numbers (tabular-nums) for aligned financial figures');

// 2.8 Obsidian & Champagne Color Palette
assert(cssContent.includes('--bg-obsidian: #0c0b0a;'), '--bg-obsidian correctly defined as #0c0b0a');
assert(cssContent.includes('--clr-gold-champagne: #c5a880;'), '--clr-gold-champagne correctly defined as #c5a880');
assert(cssContent.includes('--clr-ivory: #fcfbf9;'), '--clr-ivory correctly defined as #fcfbf9');

// 2.9 Absolute Zero Emojis in CSS
assert(!EMOJI_REGEX.test(cssContent), 'src/styles/main.css contains ZERO Unicode emojis');
const resetCssPath = path.join(projectRoot, 'src', 'styles', 'reset.css');
assert(!EMOJI_REGEX.test(fs.readFileSync(resetCssPath, 'utf8')), 'src/styles/reset.css contains ZERO Unicode emojis');

// ============================================================================
// SUITE 3: DEV SERVER & BUILD INTEGRITY
// ============================================================================
banner('SUITE 3: DEV SERVER & BUILD INTEGRITY');

// Verify dist/ exists and contains production assets
const distPath = path.join(projectRoot, 'dist');
assert(fs.existsSync(distPath), 'dist/ directory exists from production build');
const distFiles = fs.readdirSync(distPath);
assert(distFiles.includes('index.html'), 'dist/ contains index.html');
const distAssetsPath = path.join(distPath, 'assets');
assert(fs.existsSync(distAssetsPath), 'dist/assets directory exists');
const distAssets = fs.readdirSync(distAssetsPath);
assert(distAssets.some(f => f.endsWith('.js')), 'dist/assets contains compiled JS bundle');
assert(distAssets.some(f => f.endsWith('.css')), 'dist/assets contains compiled CSS bundle');

// Verify index.html contains SVG monogram favicon
const indexHtml = fs.readFileSync(path.join(projectRoot, 'index.html'), 'utf8');
assert(indexHtml.includes('image/svg+xml'), 'index.html defines SVG favicon');
assert(indexHtml.includes('%3Csvg') || indexHtml.includes('<svg'), 'index.html favicon uses vector SVG');
assert(!EMOJI_REGEX.test(indexHtml), 'index.html contains ZERO Unicode emojis (no hamburger favicon)');

// ============================================================================
// SUMMARY REPORT
// ============================================================================
console.log('\n' + '═'.repeat(74));
console.log(`${BOLD}EMPIRICAL CHALLENGER VERIFICATION SUMMARY${RESET}`);
console.log(`  Total Checks Executed:  ${BOLD}${totalTests}${RESET}`);
console.log(`  Passed Checks:          ${GREEN}${BOLD}${passedTests}${RESET}`);
console.log(`  Failed Checks:          ${failedTests > 0 ? RED : GREEN}${BOLD}${failedTests}${RESET}`);
console.log('═'.repeat(74));

if (failedTests > 0) {
  console.log(`\n${RED}${BOLD}VERDICT: REQUEST_CHANGES${RESET}`);
  console.log('Failures detected:');
  failureList.forEach(f => console.log(`  - ${f.testName}: ${f.details}`));
  process.exit(1);
} else {
  console.log(`\n${GREEN}${BOLD}VERDICT: APPROVE (100% EMPIRICAL STRESS CHECKS PASSED)${RESET}\n`);
  process.exit(0);
}
