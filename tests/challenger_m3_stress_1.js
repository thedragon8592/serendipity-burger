/**
 * ============================================================================
 * EMPIRICAL CHALLENGER STRESS HARNESS — MILESTONE M3
 * SERENDIPITY BURGER: INTERACTIVE TABLE QR CATALOG NAVIGATION & PURE VISUAL CATALOG
 * ============================================================================
 * Author: Challenger 1 (teamwork_challenger)
 * Working Directory: serendipity-burger
 * Execution: node tests/challenger_m3_stress_1.js
 *
 * Empirical Challenge Dimensions:
 *   1. Category filtering across all 7 categories + 'all' (deep dish/category validation)
 *   2. Real-time search filtering & query stress:
 *      - Exact dish names
 *      - Case variations ('HAMBURGUESA', 'clasica', 'sAnGrIa')
 *      - Diacritic / accent normalization stress ('sangría' vs 'sangria', 'clásica' vs 'clasica')
 *      - Partial string matching ('que', 'pisco', 'torta', 'alita')
 *      - Special characters ('ó', 'í', 'ñ')
 *      - Non-matching queries & empty state handling
 *      - XSS injection resilience & regex metacharacter immunity
 *      - Cross-category search interaction stress (category active + cross search)
 *   3. Tabular price markup across all 96 menu items, 3 banquet platters, and 14 adicionales:
 *      - Currency separation (<span class="currency">, <span class="amount">)
 *      - Exactly 2 decimal digits, no NaN, no undefined, safe null priceNote
 *   4. Absolute absence of transactional elements (cart, checkout, drawers, order buttons)
 *   5. Zero Unicode emojis across all files
 * ============================================================================
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

// ANSI formatting
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

function banner(title) {
  console.log(`\n${BOLD}${GOLD}✦ ${title.toUpperCase()} ✦${RESET}`);
  console.log('─'.repeat(76));
}

// ============================================================================
// LIGHTWEIGHT DOM EMULATION FOR HEADLESS EXECUTION
// ============================================================================
class MockTextNode {
  constructor(text) {
    this.text = text || '';
    this.tagName = '#text';
    this.children = [];
    this.classList = { contains: () => false };
  }
  get innerHTML() {
    return this.text;
  }
  get textContent() {
    return this.text;
  }
}

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
    this.scrollIntoViewCalls = [];
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
    if (this.children.length > 0) {
      return this.children.map(c => (c instanceof MockTextNode ? c.text : c.outerHTML)).join('');
    }
    return '';
  }
  set innerHTML(html) {
    this._innerHTML = '';
    this.children = [];
    if (html && typeof html === 'string') {
      this.children = parseHtmlToNodes(html);
    }
  }

  get outerHTML() {
    const attrs = Array.from(this.attributes.entries())
      .map(([k, v]) => ` ${k}="${String(v).replace(/"/g, '&quot;')}"`)
      .join('');
    const tag = this.tagName.toLowerCase();
    const selfClosing = ['input', 'img', 'br', 'hr', 'source'].includes(tag);
    if (selfClosing) return `<${tag}${attrs} />`;
    return `<${tag}${attrs}>${this.innerHTML}</${tag}>`;
  }

  get textContent() {
    return this.children.map(c => c.textContent || '').join('');
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

  scrollIntoView(options) {
    this.scrollIntoViewCalls.push(options);
  }

  focus() {
    this.focused = true;
  }

  querySelector(selector) {
    const all = this.querySelectorAll(selector);
    return all.length > 0 ? all[0] : null;
  }

  querySelectorAll(selector) {
    const results = [];
    function search(node) {
      for (const child of node.children) {
        if (matchesSelector(child, selector)) results.push(child);
        search(child);
      }
    }
    search(this);
    return results;
  }
}

function matchesSelector(el, selector) {
  if (el instanceof MockTextNode) return false;
  if (selector.startsWith('.')) return el.classList.contains(selector.slice(1));
  if (selector.startsWith('#')) return el.id === selector.slice(1);
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

    if (text) {
      stack[stack.length - 1].appendChild(new MockTextNode(text));
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
  createElement: (tag) => new MockElement(tag)
};

const EMOJI_REGEX = /[\u{1F300}-\u{1FAFF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{2600}-\u{27BF}\u{2B50}\u{2B55}\u{231A}-\u{231B}\u{23E9}-\u{23EC}\u{23F0}\u{23F3}]/u;

// ============================================================================
// LOAD MODULES
// ============================================================================
const { menuCategories, menuItems, banquetesHighlights, burgerCustomizationData } = await import('../src/data/menu.js');
const { createCategoryNav } = await import('../src/components/CategoryNav.js');
const { createMenuSection } = await import('../src/components/MenuSection.js');
const { createBanquetShowcase } = await import('../src/components/BanquetShowcase.js');
const { createCustomizationGuide } = await import('../src/components/CustomizationGuide.js');

// ============================================================================
// SUITE 1: CATEGORY FILTERING & SUBCATEGORY INTEGRITY ACROSS ALL 7 CATEGORIES + 'ALL'
// ============================================================================
banner('SUITE 1: CATEGORY FILTERING ACROSS ALL 7 CATEGORIES + "ALL"');

const menuViewer = createMenuSection();

// Test 'all' category render
menuViewer.update('all', '');
const allSections = menuViewer.element.children;
assert(allSections.length === 6, 'Filter "all" renders exactly 6 culinary category sections (excluding atelier adicionales)', `got ${allSections.length}`);

// Count dishes rendered in 'all' mode
let totalRenderedDishes = 0;
const expectedCategoryIds = ['hamburguesas', 'parrillas-banquetes', 'piqueos', 'cocteles', 'postres', 'bebidas'];
expectedCategoryIds.forEach(catId => {
  const sec = allSections.find(s => s.id === `cat-${catId}`);
  assert(sec !== undefined, `Category section "cat-${catId}" is present in "all" view`);
  if (sec) {
    const cards = sec.querySelectorAll('.menu-card');
    totalRenderedDishes += cards.length;
    const catExpectedItems = menuItems.filter(i => i.categoryId === catId);
    assert(cards.length === catExpectedItems.length, `Category "${catId}" has exactly ${catExpectedItems.length} dishes in DOM`, `rendered ${cards.length}`);
  }
});
assert(totalRenderedDishes === 96, 'Filter "all" renders exactly all 96 catalog menu items across the 6 sections', `rendered ${totalRenderedDishes}`);

// Test individual category filtering for each of the 7 categories
const categoryItemCounts = {
  'hamburguesas': 23,
  'parrillas-banquetes': 13,
  'piqueos': 4,
  'cocteles': 6,
  'postres': 9,
  'bebidas': 41,
  'adicionales': 0 // Handled in dedicated atelier section
};

for (const cat of menuCategories) {
  menuViewer.update(cat.id, '');
  const expectedCount = categoryItemCounts[cat.id];
  
  if (expectedCount > 0) {
    assert(menuViewer.element.children.length === 1, `Filter "${cat.id}" renders exactly 1 group section`, `got ${menuViewer.element.children.length}`);
    const section = menuViewer.element.children[0];
    assert(section && section.id === `cat-${cat.id}`, `Rendered section ID matches "cat-${cat.id}"`);
    
    const renderedCards = section.querySelectorAll('.menu-card');
    assert(renderedCards.length === expectedCount, `Category "${cat.id}" displays exactly ${expectedCount} menu cards`, `got ${renderedCards.length}`);
    
    // Cross-contamination check: assert every rendered item actually belongs to this category
    const catItems = menuItems.filter(i => i.categoryId === cat.id);
    const catItemNames = new Set(catItems.map(i => i.name));
    
    let contaminationCount = 0;
    const cardNameNodes = section.querySelectorAll('.menu-item-name');
    for (const nameNode of cardNameNodes) {
      const cardTitle = nameNode.textContent.trim();
      if (!catItemNames.has(cardTitle)) {
        contaminationCount++;
      }
    }
    assert(contaminationCount === 0, `Category "${cat.id}" has 0 cross-category item leaks`, `found ${contaminationCount} leaks`);
  } else {
    // Category 'adicionales' has 0 menuItems
    assert(menuViewer.element.children.length === 0, `Category "${cat.id}" in MenuSection renders 0 cards (delegated to CustomizationGuide)`);
  }
}

// Test Subcategory Grouping in Hamburguesas
menuViewer.update('hamburguesas', '');
const burgerGroup = menuViewer.element.children[0];
const burgerSubcats = ['Hamburguesas Patriotas', 'Festival Burger', 'Hamburguesas Parrilleras', 'Hamburguesas Premium', 'New Burgers & Kids'];
burgerSubcats.forEach(subname => {
  assert(burgerGroup.innerHTML.includes(subname), `Hamburguesas renders subcategory "${subname}"`);
});

// Test Subcategory Grouping in Parrillas & Banquetes
menuViewer.update('parrillas-banquetes', '');
const grillGroup = menuViewer.element.children[0];
assert(grillGroup.innerHTML.includes('Combos Grill'), 'Parrillas & Banquetes renders "Combos Grill" subcategory');
assert(grillGroup.innerHTML.includes('Banquetes Parrilleros'), 'Parrillas & Banquetes renders "Banquetes Parrilleros" subcategory');

// Test Subcategory Grouping in Cócteles
menuViewer.update('cocteles', '');
const coctelesGroup = menuViewer.element.children[0];
assert(coctelesGroup.innerHTML.includes('Jarras de Sangría'), 'Cócteles renders "Jarras de Sangría" subcategory');
assert(coctelesGroup.innerHTML.includes('Coctelería Clásica'), 'Cócteles renders "Coctelería Clásica" subcategory');

// Test Subcategory Grouping in Postres
menuViewer.update('postres', '');
const postresGroup = menuViewer.element.children[0];
assert(postresGroup.innerHTML.includes('Tortas Artesanales'), 'Postres renders "Tortas Artesanales" subcategory');
assert(postresGroup.innerHTML.includes('Cheesecakes'), 'Postres renders "Cheesecakes" subcategory');
assert(postresGroup.innerHTML.includes('Postres Tradicionales'), 'Postres renders "Postres Tradicionales" subcategory');

// Test CategoryNav pills configuration
let navCategorySelected = null;
let navSearchChanged = null;
const navComponent = createCategoryNav(
  (query) => { navSearchChanged = query; },
  (catId) => { navCategorySelected = catId; }
);

const pills = navComponent.querySelectorAll('.category-pill');
assert(pills.length === 8, 'CategoryNav renders exactly 8 pills (Ver Todo + 7 categories)', `got ${pills.length}`);
const expectedPillIds = ['all', 'hamburguesas', 'parrillas-banquetes', 'piqueos', 'cocteles', 'postres', 'bebidas', 'adicionales'];
expectedPillIds.forEach(pid => {
  const p = pills.find(el => el.getAttribute('data-category') === pid);
  assert(p !== undefined, `CategoryNav contains pill with data-category="${pid}"`);
});

// Test Pill Click & Smooth Centering Call
const testPill = pills.find(el => el.getAttribute('data-category') === 'parrillas-banquetes');
testPill.dispatchEvent({ type: 'click' });
assert(navCategorySelected === 'parrillas-banquetes', 'Pill click correctly fires onCategorySelect callback');
assert(testPill.classList.contains('active'), 'Clicked pill receives "active" class');
assert(testPill.scrollIntoViewCalls.length > 0, 'Pill click invokes smooth scrollIntoView centering');


// ============================================================================
// SUITE 2: REAL-TIME SEARCH FILTERING & QUERY ADVERSARIAL STRESS
// ============================================================================
banner('SUITE 2: REAL-TIME SEARCH FILTERING & QUERY STRESS');

// 2.1 Exact dish name searches
const exactTestDishes = [
  'Jarra chica de Sangría',
  'Jarra grande de Sangría',
  'Alitas a la Parrilla (Salsa Acevichada)',
  'Crema Volteada',
  'Torta de Chocolate',
  'Torta de Sublime',
  'Pisco Sour Tradicional',
  'Chilcano Clásico',
  'H. Serendipity o Doble',
  'Salchipapa Clásica'
];

exactTestDishes.forEach(dishName => {
  menuViewer.update('all', dishName);
  assert(menuViewer.element.innerHTML.includes(dishName), `Exact search "${dishName}" finds and renders the dish`);
});

// 2.2 Case variations
menuViewer.update('all', 'HAMBURGUESA');
const burgerSearchResults = menuViewer.element.querySelectorAll('.menu-card');
assert(burgerSearchResults.length >= 18, `Upper-case search "HAMBURGUESA" matches burgers in catalog`, `got ${burgerSearchResults.length}`);

// 2.3 Partial string searches
const partialQueries = [
  { q: 'que', expectedMin: 5, desc: 'partial "que" matching cheese / tequeños / italiana' },
  { q: 'pisco', expectedMin: 2, desc: 'partial "pisco" matching Chilcano and Pisco Sour' },
  { q: 'torta', expectedMin: 4, desc: 'partial "torta" matching all 4 tortas' },
  { q: 'alita', expectedMin: 2, desc: 'partial "alita" matching alitas options' },
  { q: 'sour', expectedMin: 1, desc: 'partial "sour" matching Pisco Sour' }
];

partialQueries.forEach(({ q, expectedMin, desc }) => {
  menuViewer.update('all', q);
  const cards = menuViewer.element.querySelectorAll('.menu-card');
  assert(cards.length >= expectedMin, `Partial query "${q}" (${desc}) matches at least ${expectedMin} items`, `got ${cards.length}`);
});

// 2.4 Accented and special characters
const specialCharQueries = [
  { q: 'ó', desc: 'accented vowel ó' },
  { q: 'í', desc: 'accented vowel í' },
  { q: 'ñ', desc: 'spanish letter ñ' }
];

specialCharQueries.forEach(({ q, desc }) => {
  menuViewer.update('all', q);
  const cards = menuViewer.element.querySelectorAll('.menu-card');
  assert(cards.length > 0, `Search with ${desc} ("${q}") returns matching results`, `got ${cards.length}`);
});

// 2.5 Empty state handling with non-matching queries
const nonMatchingQueries = [
  'pizza hawai con piña',
  'sushi maki acevichado tempura',
  'xyz123nonexistentdish999'
];

nonMatchingQueries.forEach(query => {
  menuViewer.update('all', query);
  const emptyState = menuViewer.element.querySelector('.search-empty-state');
  assert(emptyState !== null, `Non-matching query "${query}" renders ".search-empty-state"`);
  assert(menuViewer.element.innerHTML.includes('No hemos encontrado creaciones que coincidan con tu búsqueda'), `Empty state displays luxury title`);
  assert(menuViewer.element.innerHTML.includes(`No encontramos platos con "${query}"`), `Empty state description includes query text`);
  const icon = menuViewer.element.querySelector('.search-empty-icon');
  assert(icon !== null, `Empty state displays bespoke search SVG icon`);
});

// 2.6 Blank and whitespace-only query handling
menuViewer.update('all', '   ');
const whitespaceCards = menuViewer.element.querySelectorAll('.menu-card');
assert(whitespaceCards.length === 96, 'Whitespace-only query "   " trims to empty and displays full 96-dish catalog', `got ${whitespaceCards.length}`);

// 2.7 Security & Injection Adversarial Tests
const xssPayloads = [
  '<script>alert("XSS")</script>',
  '<img src=x onerror=alert(document.cookie)>',
  '"><svg onload=alert(1)>',
  '\' OR \'1\'=\'1'
];

xssPayloads.forEach(payload => {
  menuViewer.update('all', payload);
  // Ensure no unescaped script or img tag was parsed into DOM
  const scriptTag = menuViewer.element.querySelector('script');
  const imgErrorTag = menuViewer.element.querySelector('img[onerror]');
  assert(scriptTag === null && imgErrorTag === null, `XSS payload "${payload.slice(0, 20)}..." safely sanitized without DOM execution tags`);
  assert(menuViewer.element.innerHTML.includes('&lt;') || menuViewer.element.innerHTML.includes('&#39;'), 'XSS payload entities are escaped in rendered HTML');
});

// Regex Metacharacter Immunity Stress
const regexPayloads = ['.*', '+', '?', '*', '(', ')', '[a-z]', '{1,3}', '^$', '\\d+'];
regexPayloads.forEach(regexStr => {
  let threw = false;
  try {
    menuViewer.update('all', regexStr);
  } catch (err) {
    threw = true;
  }
  assert(!threw, `Regex metacharacter query "${regexStr}" does not throw SyntaxError or crash search filter`);
});

// Null & Undefined Resilience
let threwNull = false;
try {
  menuViewer.update('all', null);
  menuViewer.update('all', undefined);
} catch (e) {
  threwNull = true;
}
assert(!threwNull, 'Passing null or undefined to update() executes cleanly without TypeError');

// 2.8 ADVERSARIAL CHALLENGE: Diacritic-Insensitive Search Stress
// In Latin American / Spanish table QR usage, diners frequently type without accents on mobile.
// We test whether searching for unaccented 'sangria' matches 'Jarra chica de Sangría'
// and whether searching for 'clasica' matches 'H. Peruana o Clásica'.
banner('ADVERSARIAL STRESS: DIACRITIC-INSENSITIVITY & CROSS-CATEGORY SEARCH');

menuViewer.update('all', 'sangria');
const sangriaUnaccentedCards = menuViewer.element.querySelectorAll('.menu-card');
const matchedSangriaUnaccented = sangriaUnaccentedCards.length > 0 && menuViewer.element.innerHTML.includes('Jarra');

if (!matchedSangriaUnaccented) {
  console.log(`  ${YELLOW}⚠ ADVERSARIAL VULNERABILITY FOUND${RESET}: Search query "sangria" (unaccented) returned 0 dishes because menu items use "Sangría" (accented).`);
}
assert(matchedSangriaUnaccented, 'Search "sangria" (unaccented) finds "Jarra chica de Sangría" and "Jarra grande de Sangría"', 'accent normalization missing in MenuSection.js');

menuViewer.update('all', 'sAnGrIa');
const sangriaMixedCards = menuViewer.element.querySelectorAll('.menu-card');
const matchedSangriaMixed = sangriaMixedCards.length > 0 && menuViewer.element.innerHTML.includes('Jarra');
assert(matchedSangriaMixed, 'Search "sAnGrIa" (mixed-case unaccented) finds Sangría jars', 'accent normalization missing');

menuViewer.update('all', 'clasica');
const clasicaCards = menuViewer.element.querySelectorAll('.menu-card');
const matchedClasica = clasicaCards.length > 0 && menuViewer.element.innerHTML.includes('Clásica');
if (!matchedClasica) {
  console.log(`  ${YELLOW}⚠ ADVERSARIAL VULNERABILITY FOUND${RESET}: Search query "clasica" (unaccented) returned 0 dishes because menu items use "Clásica" (accented).`);
}
assert(matchedClasica, 'Search "clasica" (unaccented) finds "H. Peruana o Clásica"', 'accent normalization missing in MenuSection.js');

// 2.9 ADVERSARIAL CHALLENGE: Category Scoped Search vs Blank State Void
// Scenario: A user has category "cocteles" selected and searches for "alitas" (a dish from parrillas).
// Expected: Either empty state explaining no alitas in cócteles, or global search results.
// Bug check: MenuSection should NOT render an empty blank void (0 cards AND 0 empty-state message).
menuViewer.update('cocteles', 'alitas');
const coctelesAlitasHasCards = menuViewer.element.querySelectorAll('.menu-card').length > 0;
const coctelesAlitasHasEmptyState = menuViewer.element.querySelector('.search-empty-state') !== null;
const avoidedBlankVoid = coctelesAlitasHasCards || coctelesAlitasHasEmptyState;

if (!avoidedBlankVoid) {
  console.log(`  ${YELLOW}⚠ ADVERSARIAL VULNERABILITY FOUND${RESET}: Selecting category "cocteles" and searching "alitas" results in empty DOM (0 cards, NO empty state message).`);
}
assert(avoidedBlankVoid, 'Cross-category search with active category pill does NOT render a completely blank void', 'rendered 0 cards and 0 empty state');


// ============================================================================
// SUITE 3: TABULAR PRICE MARKUP ACROSS ALL 96 DISHES, BANQUETS & ADICIONALES
// ============================================================================
banner('SUITE 3: TABULAR PRICE MARKUP & NUMERIC FORMATTING');

// Test all 96 menu items rendered in DOM
menuViewer.update('all', '');
const allCardEls = menuViewer.element.querySelectorAll('.menu-card');

let priceMarkupErrors = 0;
let nanOrUndefinedPrices = 0;
let missingCurrencySpans = 0;
let missingAmountSpans = 0;

for (const card of allCardEls) {
  const cardHtml = card.innerHTML;
  
  // Check if experiential dish (Magic Box)
  if (cardHtml.includes('Magic Box')) {
    const hasNote = cardHtml.includes('class="amount-note"') && cardHtml.includes('Consultar con el mozo');
    assert(hasNote, 'Experiential dish "Magic Box" renders safe <span class="amount-note"> without NaN/crash');
    continue;
  }
  
  // Check tabular structure
  const hasCurrency = cardHtml.includes('class="currency">S/</span>');
  const hasAmount = /class="amount">\d+\.\d{2}<\/span>/.test(cardHtml);
  
  if (!hasCurrency) missingCurrencySpans++;
  if (!hasAmount) missingAmountSpans++;
  if (cardHtml.includes('NaN') || cardHtml.includes('undefined')) nanOrUndefinedPrices++;
}

assert(missingCurrencySpans === 0, 'Every priced menu card contains `<span class="currency">S/</span>`', `missing in ${missingCurrencySpans} cards`);
assert(missingAmountSpans === 0, 'Every priced menu card contains `<span class="amount">XX.XX</span>` with 2 decimals', `missing in ${missingAmountSpans} cards`);
assert(nanOrUndefinedPrices === 0, 'Zero menu cards contain NaN, undefined, or unformatted raw floats', `found in ${nanOrUndefinedPrices} cards`);

// Test BanquetShowcase Platters Tabular Pricing
const banquetComponent = createBanquetShowcase();
const banquetCards = banquetComponent.querySelectorAll('.banquete-card');
assert(banquetCards.length === 3, 'BanquetShowcase renders exactly 3 sharing platters');

let banquetPriceErrors = 0;
banquetCards.forEach(bCard => {
  const bHtml = bCard.innerHTML;
  const hasBanquetePrice = bHtml.includes('class="banquete-price"');
  const hasCurrency = bHtml.includes('class="currency">S/</span>');
  const hasAmount = /class="amount">\d+\.\d{2}<\/span>/.test(bHtml);
  if (!hasBanquetePrice || !hasCurrency || !hasAmount || bHtml.includes('NaN')) {
    banquetPriceErrors++;
  }
});
assert(banquetPriceErrors === 0, 'All 3 banquet platters render tabular `<span class="currency">S/</span> <span class="amount">XX.XX</span>`');

// Test CustomizationGuide Adicionales Tabular Pricing
const customGuideComponent = createCustomizationGuide();
const customRows = customGuideComponent.querySelectorAll('.custom-item-row');
assert(customRows.length === 14, 'CustomizationGuide renders exactly 14 additional items');

let customPriceErrors = 0;
customRows.forEach(row => {
  const rHtml = row.innerHTML;
  const hasCurrency = rHtml.includes('class="currency">+ S/</span>');
  const hasAmount = /class="amount">\d+\.\d{2}<\/span>/.test(rHtml);
  if (!hasCurrency || !hasAmount || rHtml.includes('NaN')) {
    customPriceErrors++;
  }
});
assert(customPriceErrors === 0, 'All 14 adicionales render tabular `<span class="currency">+ S/</span> <span class="amount">XX.XX</span>`');


// ============================================================================
// SUITE 4: ABSOLUTE ABSENCE OF TRANSACTIONAL ELEMENTS (PURE VISUAL CATALOG)
// ============================================================================
banner('SUITE 4: NON-TRANSACTIONAL TABLE QR INTEGRITY (PURE VISUAL CATALOG)');

const transactionalRegexes = [
  { name: 'cart-drawer / cart DOM nodes', regex: /cart-drawer|cart_drawer|shopping-cart|cart-sidebar/i },
  { name: 'checkout triggers', regex: /btn-checkout|btn_checkout|checkout-btn|checkout-modal/i },
  { name: 'ordering drawers / modals', regex: /order-drawer|order-form|order-modal|order_drawer/i },
  { name: 'add to cart buttons', regex: /add-to-cart|add_to_cart|addtocart|agregar\s+al\s+carrito|añadir\s+al\s+carrito/i },
  { name: 'transactional call to action copy', regex: /comprar\s+ahora|finalizar\s+pedido|finalizar\s+compra|realizar\s+pedido/i }
];

const filesToInspect = [];
function collectFiles(dir) {
  for (const entry of fs.readdirSync(dir)) {
    if (['node_modules', 'dist', '.git', 'tests'].includes(entry)) continue;
    const fullPath = path.join(dir, entry);
    if (fs.statSync(fullPath).isDirectory()) {
      collectFiles(fullPath);
    } else if (/\.(js|html|css|json)$/.test(entry)) {
      filesToInspect.push(fullPath);
    }
  }
}
collectFiles(projectRoot);

let totalTransactionalViolations = 0;
filesToInspect.forEach(filePath => {
  const content = fs.readFileSync(filePath, 'utf-8');
  const rel = path.relative(projectRoot, filePath);
  
  transactionalRegexes.forEach(({ name, regex }) => {
    const match = content.match(regex);
    if (match) {
      totalTransactionalViolations++;
      console.log(`  ${RED}✗ FAIL${RESET}  ${rel} matched transactional pattern: ${name} ("${match[0]}")`);
    }
  });
});

assert(totalTransactionalViolations === 0, 'Absolute zero transactional elements, cart drawers, checkout or order buttons across all source files', `found ${totalTransactionalViolations} violations`);

// Specific check: CustomizationGuide must NOT contain the word "topping" or "pedido"
const customGuideSrc = fs.readFileSync(path.join(projectRoot, 'src/components/CustomizationGuide.js'), 'utf-8');
assert(!/topping/i.test(customGuideSrc), 'CustomizationGuide strictly contains ZERO instances of "topping" or "toppings"');
assert(!/pedido/i.test(customGuideSrc), 'CustomizationGuide strictly contains ZERO instances of "pedido" (pure non-transactional atelier advisory copy)');


// ============================================================================
// SUITE 5: ABSOLUTE ZERO UNICODE EMOJIS ACROSS ALL SOURCE FILES
// ============================================================================
banner('SUITE 5: CODEBASE-WIDE ZERO UNICODE EMOJI VERIFICATION');

let totalEmojiViolations = 0;
const emojiViolationsList = [];

filesToInspect.forEach(filePath => {
  const content = fs.readFileSync(filePath, 'utf-8');
  const rel = path.relative(projectRoot, filePath);
  const matches = content.match(new RegExp(EMOJI_REGEX, 'gu'));
  if (matches) {
    totalEmojiViolations += matches.length;
    emojiViolationsList.push({ file: rel, emojis: matches });
    console.log(`  ${RED}✗ FAIL${RESET}  ${rel} contains ${matches.length} emojis: ${matches.join(' ')}`);
  }
});

assert(totalEmojiViolations === 0, 'Absolute ZERO Unicode emojis across all HTML, JS, CSS, and JSON project files', `found ${totalEmojiViolations} emojis in ${emojiViolationsList.length} files`);


// ============================================================================
// FINAL HARNESS SUMMARY & EMPIRICAL VERDICT
// ============================================================================
banner('EMPIRICAL CHALLENGER STRESS HARNESS SUMMARY');

console.log(`  Total Checks Executed:  ${BOLD}${totalTests}${RESET}`);
console.log(`  Passed Checks:          ${GREEN}${passedTests}${RESET}`);
console.log(`  Failed Checks:          ${failedTests > 0 ? RED : GREEN}${failedTests}${RESET}`);
console.log(`  Pass Rate:              ${BOLD}${((passedTests / totalTests) * 100).toFixed(1)}%${RESET}`);

if (failedTests > 0) {
  console.log(`\n${RED}${BOLD}DEFECTS / ADVERSARIAL FINDINGS DETECTED:${RESET}`);
  failureDetails.forEach((f, idx) => {
    console.log(`  ${idx + 1}. [${f.name}] -> ${f.details || 'Assertion failed'}`);
  });
}

console.log('\n' + '═'.repeat(76));
if (failedTests === 0) {
  console.log(`${BOLD}${GREEN}VERDICT: APPROVE (100% Empirically Verified)${RESET}`);
} else {
  console.log(`${BOLD}${RED}VERDICT: REJECT (Defects Detected during Adversarial Stress)${RESET}`);
}
console.log('═'.repeat(76) + '\n');

process.exit(failedTests === 0 ? 0 : 1);
