/**
 * ============================================================================
 * MILESTONE M3 VERIFICATION TEST SUITE
 * SERENDIPITY BURGER: INTERACTIVE TABLE QR CATALOG NAVIGATION & CART REMOVAL
 * ============================================================================
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

// ANSI Colors
const RESET = '\x1b[0m';
const BOLD = '\x1b[1m';
const GREEN = '\x1b[32m';
const RED = '\x1b[31m';
const GOLD = '\x1b[38;2;197;168;128m';

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;
const failures = [];

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

function banner(title) {
  console.log(`\n${BOLD}${GOLD}✦ ${title.toUpperCase()} ✦${RESET}`);
  console.log('─'.repeat(74));
}

// Lightweight DOM Mock
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
    if (this._innerHTML) return this._innerHTML;
    if (this.children.length > 0) return this.children.map(c => c.innerHTML).join('');
    return '';
  }
  set innerHTML(html) {
    this._innerHTML = html;
    this.children = [];
    if (html && typeof html === 'string') {
      this.children = parseHtmlToNodes(html);
    }
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

  scrollIntoView() {}
  focus() {}

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
// SUITE 1: CATEGORYNAV & REAL-TIME SEARCH (F11)
// ============================================================================
banner('SUITE 1: CATEGORYNAV & REAL-TIME SEARCH (F11)');

const { createCategoryNav } = await import('../src/components/CategoryNav.js');
const { menuCategories } = await import('../src/data/menu.js');

let capturedSearch = null;
let capturedCategory = null;
const navEl = createCategoryNav(
  (q) => { capturedSearch = q; },
  (c) => { capturedCategory = c; }
);

assert(navEl && navEl.id === 'menu-nav', 'CategoryNav root element has id "menu-nav"');
assert(navEl.classList.contains('menu-controls-wrapper'), 'CategoryNav has class "menu-controls-wrapper"');

const pills = navEl.querySelectorAll('.category-pill');
assert(pills.length === 8, `CategoryNav renders exactly 8 pills (Ver Todo + 7 categories), found ${pills.length}`);

// Verify all 7 required categories are present as pills
const expectedCatIds = ['hamburguesas', 'parrillas-banquetes', 'piqueos', 'cocteles', 'postres', 'bebidas', 'adicionales'];
for (const catId of expectedCatIds) {
  const pill = pills.find(p => p.getAttribute('data-category') === catId);
  assert(pill !== undefined, `CategoryNav has navigation pill for "${catId}"`);
}

// Test search input listener
const searchInput = navEl.querySelector('.search-input');
assert(searchInput !== null, 'CategoryNav has search input');
if (searchInput) {
  searchInput.value = '   PARRILLA ';
  searchInput.dispatchEvent({ type: 'input', target: { value: '   PARRILLA ' } });
  assert(capturedSearch === 'PARRILLA', 'Search input trims whitespace and fires callback');
}

// Test search clear button
const clearBtn = navEl.querySelector('.search-clear-btn');
assert(clearBtn !== null, 'CategoryNav has search clear button');
if (clearBtn) {
  clearBtn.dispatchEvent({ type: 'click' });
  assert(capturedSearch === '', 'Clear button clears search and fires callback with empty string');
}

// Test pill click interaction
const coctelesPill = pills.find(p => p.getAttribute('data-category') === 'cocteles');
if (coctelesPill) {
  coctelesPill.dispatchEvent({ type: 'click' });
  assert(capturedCategory === 'cocteles', 'Pill click triggers onCategorySelect("cocteles")');
  assert(coctelesPill.classList.contains('active'), 'Clicked pill becomes active');
}

assert(!EMOJI_REGEX.test(navEl.innerHTML), 'CategoryNav contains ZERO Unicode emojis');

// ============================================================================
// SUITE 2: MENUSECTION SUBCATEGORIES, PRICING & EMPTY STATE (F12, F13)
// ============================================================================
banner('SUITE 2: MENUSECTION SUBCATEGORIES, PRICING & EMPTY STATE (F12, F13)');

const { createMenuSection } = await import('../src/components/MenuSection.js');
const menuViewer = createMenuSection();

assert(menuViewer && menuViewer.element.id === 'menu-content', 'MenuSection element has id "menu-content"');

// Filter to hamburguesas: check subcategory blocks
menuViewer.update('hamburguesas', '');
const burgerSection = menuViewer.element.children[0];
assert(burgerSection && burgerSection.id === 'cat-hamburguesas', 'Renders category section "cat-hamburguesas"');
assert(burgerSection.innerHTML.includes('subcategory-block'), 'MenuSection renders subcategory-block elements');
assert(burgerSection.innerHTML.includes('Hamburguesas Patriotas'), 'MenuSection renders "Hamburguesas Patriotas" subcategory');
assert(burgerSection.innerHTML.includes('Festival Burger'), 'MenuSection renders "Festival Burger" subcategory');
assert(burgerSection.innerHTML.includes('Hamburguesas Parrilleras'), 'MenuSection renders "Hamburguesas Parrilleras" subcategory');
assert(burgerSection.innerHTML.includes('Hamburguesas Premium'), 'MenuSection renders "Hamburguesas Premium" subcategory');

// Verify Tabular Price Formatting
assert(burgerSection.innerHTML.includes('class="currency">S/</span>'), 'Prices render tabular currency span "<span class=\"currency\">S/</span>"');
assert(burgerSection.innerHTML.includes('class="amount">'), 'Prices render tabular amount span "<span class=\"amount\">"');

// Filter to parrillas-banquetes: verify unified subcategories
menuViewer.update('parrillas-banquetes', '');
const grillSection = menuViewer.element.children[0];
assert(grillSection && grillSection.id === 'cat-parrillas-banquetes', 'Renders "cat-parrillas-banquetes" section');
assert(grillSection.innerHTML.includes('Combos Grill'), 'Parrillas & Banquetes includes "Combos Grill" subcategory');
assert(grillSection.innerHTML.includes('Banquetes Parrilleros'), 'Parrillas & Banquetes includes "Banquetes Parrilleros" subcategory');
assert(grillSection.innerHTML.includes('Alitas a la Parrilla (Salsa Acevichada)'), 'Contains Alitas Acevichadas');
assert(grillSection.innerHTML.includes('18.50'), 'Alitas Acevichadas displays price 18.50');

// Filter to cocteles
menuViewer.update('cocteles', '');
const coctelSection = menuViewer.element.children[0];
assert(coctelSection && coctelSection.id === 'cat-cocteles', 'Renders "cat-cocteles" section');
assert(coctelSection.innerHTML.includes('Jarras de Sangría'), 'Cócteles includes "Jarras de Sangría" subcategory');
assert(coctelSection.innerHTML.includes('Jarra chica de Sangría'), 'Contains Jarra chica');
assert(coctelSection.innerHTML.includes('15.00'), 'Jarra chica displays S/. 15.00');
assert(coctelSection.innerHTML.includes('Jarra grande de Sangría'), 'Contains Jarra grande');
assert(coctelSection.innerHTML.includes('30.00'), 'Jarra grande displays S/. 30.00');

// Filter to postres
menuViewer.update('postres', '');
const postresSection = menuViewer.element.children[0];
assert(postresSection.innerHTML.includes('Tortas Artesanales'), 'Postres includes "Tortas Artesanales" subcategory');
assert(postresSection.innerHTML.includes('Crema Volteada'), 'Postres includes Crema Volteada');
assert(postresSection.innerHTML.includes('12.00'), 'Crema Volteada displays 12.00');

// Search filtering and case insensitivity
menuViewer.update('all', 'acevichada');
assert(menuViewer.element.innerHTML.includes('Alitas a la Parrilla (Salsa Acevichada)'), 'Search "acevichada" returns correct dish');
assert(menuViewer.element.innerHTML.includes('S/. 18.50'), 'Search result retains S/. 18.50 price');

// Empty search state
menuViewer.update('all', 'xyz_dish_not_found_test_999');
assert(
  menuViewer.element.innerHTML.includes('No hemos encontrado creaciones que coincidan con tu búsqueda'),
  'Empty state displays luxury copy "No hemos encontrado creaciones que coincidan con tu búsqueda"'
);
assert(
  menuViewer.element.innerHTML.includes('No encontramos platos'),
  'Empty state maintains backward compatibility with "No encontramos platos"'
);
assert(menuViewer.element.innerHTML.includes('luxury-svg-icon'), 'Empty state renders bespoke SVG icon');

// XSS Sanitization in search query
menuViewer.update('all', '<script>alert(1)</script>');
assert(!menuViewer.element.innerHTML.includes('<script>alert(1)</script>'), 'Search input XSS is properly sanitized in DOM');
assert(menuViewer.element.innerHTML.includes('&lt;script&gt;alert(1)&lt;/script&gt;'), 'Sanitized XSS entities rendered');

assert(!EMOJI_REGEX.test(menuViewer.element.innerHTML), 'MenuSection contains ZERO Unicode emojis');

// ============================================================================
// SUITE 3: BANQUET SHOWCASE (F15)
// ============================================================================
banner('SUITE 3: BANQUET SHOWCASE (F15)');

const { createBanquetShowcase } = await import('../src/components/BanquetShowcase.js');
const banquetSection = createBanquetShowcase();

assert(banquetSection && banquetSection.id === 'banquetes', 'BanquetShowcase has id "banquetes"');
assert(banquetSection.innerHTML.includes('Parrillas & Banquetes'), 'BanquetShowcase pretitle integrates with Parrillas & Banquetes ambiance');
assert(banquetSection.innerHTML.includes('Grandes Banquetes de Selección'), 'BanquetShowcase has editorial title');
assert(banquetSection.innerHTML.includes('banquete-badge'), 'BanquetShowcase has gold badge elements');
assert(banquetSection.innerHTML.includes('banquete-price'), 'BanquetShowcase cards have banquete-price');
assert(banquetSection.innerHTML.includes('class="currency">S/</span>'), 'BanquetShowcase price has tabular currency');
assert(!EMOJI_REGEX.test(banquetSection.innerHTML), 'BanquetShowcase contains ZERO Unicode emojis');

// ============================================================================
// SUITE 4: CUSTOMIZATION GUIDE "ADICIONALES" (F14)
// ============================================================================
banner('SUITE 4: CUSTOMIZATION GUIDE "ADICIONALES" (F14)');

const { createCustomizationGuide } = await import('../src/components/CustomizationGuide.js');
const customGuideSection = createCustomizationGuide();

assert(customGuideSection && customGuideSection.id === 'cat-adicionales', 'CustomizationGuide has id "cat-adicionales"');
assert(customGuideSection.innerHTML.includes('Adicionales'), 'CustomizationGuide has section title "Adicionales"');
assert(
  !customGuideSection.innerHTML.toLowerCase().includes('topping'),
  'CustomizationGuide strictly NEVER contains the word "topping"'
);
assert(
  customGuideSection.innerHTML.includes('Acompaña tu elección con la combinación de salsas artesanales que prefieras'),
  'CustomizationGuide renders non-transactional advisory copy ("Acompaña tu elección...")'
);
assert(customGuideSection.innerHTML.includes('custom-groups-grid'), 'CustomizationGuide renders custom-groups-grid');
assert(customGuideSection.innerHTML.includes('cremas-pills-wrap'), 'CustomizationGuide renders cremas-pills-wrap');
assert(customGuideSection.innerHTML.includes('Nuestras Cremas de la Casa'), 'CustomizationGuide highlights house sauces');
assert(!EMOJI_REGEX.test(customGuideSection.innerHTML), 'CustomizationGuide contains ZERO Unicode emojis');

// ============================================================================
// SUITE 5: NON-TRANSACTIONAL CATALOG PARADIGM & INTEGRITY
// ============================================================================
banner('SUITE 5: NON-TRANSACTIONAL CATALOG PARADIGM');

const filesToScan = [
  'src/components/CategoryNav.js',
  'src/components/MenuSection.js',
  'src/components/BanquetShowcase.js',
  'src/components/CustomizationGuide.js',
  'src/main.js'
];

for (const file of filesToScan) {
  const content = fs.readFileSync(path.join(projectRoot, file), 'utf8');
  assert(!/\bcart-drawer\b/i.test(content), `${file} has no cart-drawer`);
  assert(!/\bbtn-checkout\b/i.test(content), `${file} has no btn-checkout`);
  assert(!/comprar\s+ahora/i.test(content), `${file} has no "comprar ahora"`);
  assert(!/finalizar\s+pedido/i.test(content), `${file} has no "finalizar pedido"`);
  assert(!/finalizar\s+compra/i.test(content), `${file} has no "finalizar compra"`);
  assert(!EMOJI_REGEX.test(content), `${file} contains ZERO Unicode emojis`);
}

// ============================================================================
// SUMMARY
// ============================================================================
console.log(`\n${BOLD}${GOLD}════════════════════════════════════════════════════════════════════════${RESET}`);
console.log(`${BOLD}M3 VERIFICATION SUMMARY${RESET}`);
console.log(`  Total Checks:  ${totalTests}`);
console.log(`  Passed Checks: ${GREEN}${passedTests}${RESET}`);
console.log(`  Failed Checks: ${failedTests > 0 ? RED : GREEN}${failedTests}${RESET}`);
console.log(`${BOLD}${GOLD}════════════════════════════════════════════════════════════════════════${RESET}\n`);

if (failedTests > 0) {
  process.exit(1);
} else {
  console.log(`${GREEN}${BOLD}ALL MILESTONE M3 CHECKS PASSED SUCCESSFULLY.${RESET}\n`);
  process.exit(0);
}
