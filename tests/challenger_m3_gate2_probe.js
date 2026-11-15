import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

// ============================================================================
// LIGHTWEIGHT DOM EMULATION FOR HEADLESS NODE EXECUTION
// ============================================================================
class MockTextNode {
  constructor(text) {
    this.text = text || '';
    this.tagName = '#text';
    this.children = [];
    this.classList = { contains: () => false };
  }
  get innerHTML() { return this.text; }
  get textContent() { return this.text; }
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
  contains(name) { return this.classes.has(name); }
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

  get className() { return this._className; }
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
  getAttribute(k) { return this.attributes.get(k) || null; }
  hasAttribute(k) { return this.attributes.has(k); }

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

  focus() { this.focused = true; }

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

// ============================================================================
// TEST HARNESS ASSERTIONS
// ============================================================================
let totalChecks = 0;
let passedChecks = 0;
let failedChecks = 0;
const failures = [];

function assert(condition, message, errorDetail = '') {
  totalChecks++;
  if (condition) {
    passedChecks++;
    console.log(`  ✓ PASS  ${message}`);
  } else {
    failedChecks++;
    failures.push({ message, errorDetail });
    console.log(`  ✗ FAIL  ${message}${errorDetail ? ' -> ' + errorDetail : ''}`);
  }
}

async function runGate2AdversarialProbe() {
  console.log('\n========================================================================');
  console.log('✦ MILESTONE M3 GATE 2: EMPIRICAL ADVERSARIAL CHALLENGER PROBE ✦');
  console.log('========================================================================\n');

  const { menuCategories, menuItems } = await import('../src/data/menu.js');
  const { createMenuSection } = await import('../src/components/MenuSection.js');

  const normalize = (str) => (str || '').normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();

  // --------------------------------------------------------------------------
  // SUITE 1: EXHAUSTIVE DIACRITIC & ACCENT NORMALIZATION STRESS
  // --------------------------------------------------------------------------
  console.log('✦ SUITE 1: EXHAUSTIVE DIACRITIC & ACCENT NORMALIZATION STRESS ✦');
  console.log('────────────────────────────────────────────────────────────────────────');

  const menuSection = createMenuSection();
  const container = menuSection.element;

  const diacriticPairs = [
    { queryAccented: 'Sangría', queryUnaccented: 'sangria' },
    { queryAccented: 'SANGRÍA', queryUnaccented: 'SANGRIA' },
    { queryAccented: 'sAnGrÍa', queryUnaccented: 'sAnGrIa' },
    { queryAccented: 'Clásica', queryUnaccented: 'clasica' },
    { queryAccented: 'CLÁSICA', queryUnaccented: 'CLASICA' },
    { queryAccented: 'Porción', queryUnaccented: 'porcion' },
    { queryAccented: 'PORCIÓN', queryUnaccented: 'PORCION' },
    { queryAccented: 'Café', queryUnaccented: 'cafe' },
    { queryAccented: 'CAFÉ', queryUnaccented: 'CAFE' },
    { queryAccented: 'Maracuyá', queryUnaccented: 'maracuya' },
    { queryAccented: 'Piña', queryUnaccented: 'pina' },
    { queryAccented: 'Plátanos', queryUnaccented: 'platanos' },
    { queryAccented: 'Limón', queryUnaccented: 'limon' },
    { queryAccented: 'Jamón', queryUnaccented: 'jamon' },
    { queryAccented: 'Lúcuma', queryUnaccented: 'lucuma' },
    { queryAccented: 'Guanábana', queryUnaccented: 'guanabana' },
    { queryAccented: 'Arándanos', queryUnaccented: 'arandanos' },
    { queryAccented: 'Acevichada', queryUnaccented: 'acevichada' }
  ];

  for (const pair of diacriticPairs) {
    // Test accented query
    menuSection.update('all', pair.queryAccented);
    const cardsAccented = container.querySelectorAll('.menu-card');
    assert(
      cardsAccented.length > 0,
      `Accented search "${pair.queryAccented}" returns matching dishes (found ${cardsAccented.length})`,
      cardsAccented.length === 0 ? '0 dishes found' : ''
    );

    // Test unaccented query
    menuSection.update('all', pair.queryUnaccented);
    const cardsUnaccented = container.querySelectorAll('.menu-card');
    assert(
      cardsUnaccented.length === cardsAccented.length,
      `Unaccented search "${pair.queryUnaccented}" returns identical item count (${cardsUnaccented.length} == ${cardsAccented.length})`,
      `Mismatch: accented=${cardsAccented.length}, unaccented=${cardsUnaccented.length}`
    );

    // Verify empty state is NOT rendered
    const emptyState = container.querySelector('.search-empty-state');
    assert(
      !emptyState,
      `Search for "${pair.queryUnaccented}" does not trigger empty state`
    );
  }

  // --------------------------------------------------------------------------
  // SUITE 2: CATEGORY-SCOPED CROSS-SEARCH MATRIX (NEVER A BLANK VOID)
  // --------------------------------------------------------------------------
  console.log('\n✦ SUITE 2: CATEGORY-SCOPED CROSS-SEARCH MATRIX (NEVER A BLANK VOID) ✦');
  console.log('────────────────────────────────────────────────────────────────────────');

  const testCategories = menuCategories.filter(c => c.id !== 'adicionales');
  const distinctQueries = [
    { targetCategory: 'hamburguesas', query: 'tocino' },
    { targetCategory: 'parrillas-banquetes', query: 'alitas' },
    { targetCategory: 'piqueos', query: 'salchipapa' },
    { targetCategory: 'cocteles', query: 'sangria' },
    { targetCategory: 'postres', query: 'torta' },
    { targetCategory: 'bebidas', query: 'chicha' }
  ];

  for (const cat of testCategories) {
    for (const item of distinctQueries) {
      menuSection.update(cat.id, item.query);

      const cards = container.querySelectorAll('.menu-card');
      const emptyState = container.querySelector('.search-empty-state');
      const isTargetCategory = (cat.id === item.targetCategory);

      // Invariant: either cards > 0 OR emptyState exists. NEVER neither (0 cards AND no empty state = blank void).
      const hasContent = cards.length > 0 || emptyState !== null;
      assert(
        hasContent,
        `Category "${cat.id}" with search "${item.query}" renders either cards or luxury empty state (never a blank void)`,
        `Rendered 0 cards and 0 empty state elements! innerHTML="${container.innerHTML.trim()}"`
      );

      if (isTargetCategory) {
        assert(
          cards.length > 0 && !emptyState,
          `Category "${cat.id}" searching matching "${item.query}" displays ${cards.length} cards without empty state`
        );
      } else {
        const expectedMatchesInThisCat = menuItems.filter(i => 
          i.categoryId === cat.id && 
          (normalize(i.name).includes(normalize(item.query)) || 
           normalize(i.description).includes(normalize(item.query)) || 
           normalize(i.subcategoryName).includes(normalize(item.query)))
        );

        if (expectedMatchesInThisCat.length === 0) {
          assert(
            cards.length === 0 && emptyState !== null,
            `Category "${cat.id}" searching non-matching "${item.query}" properly renders luxury empty state message`
          );
        } else {
          assert(
            cards.length === expectedMatchesInThisCat.length && !emptyState,
            `Category "${cat.id}" searching overlapping "${item.query}" displays matching cards`
          );
        }
      }
    }
  }

  // --------------------------------------------------------------------------
  // SUITE 3: RAPID CATEGORY SWITCHING & STATE MACHINE STABILITY
  // --------------------------------------------------------------------------
  console.log('\n✦ SUITE 3: RAPID CATEGORY SWITCHING & STATE MACHINE STABILITY ✦');
  console.log('────────────────────────────────────────────────────────────────────────');

  const categoriesPool = ['all', 'hamburguesas', 'parrillas-banquetes', 'piqueos', 'cocteles', 'postres', 'bebidas', 'adicionales'];
  const queriesPool = ['', 'alitas', 'sangria', 'clasica', '   ', 'nonexistent_dish_xyz_999'];

  let stressExceptions = 0;
  let voidCount = 0;

  for (let i = 0; i < 500; i++) {
    const randomCat = categoriesPool[i % categoriesPool.length];
    const randomQuery = queriesPool[i % queriesPool.length];

    try {
      menuSection.update(randomCat, randomQuery);
      const cards = container.querySelectorAll('.menu-card');
      const emptyState = container.querySelector('.search-empty-state');
      const normQuery = normalize(randomQuery);

      if (normQuery && cards.length === 0 && !emptyState) {
        voidCount++;
      }
    } catch (err) {
      stressExceptions++;
      console.error(`Transition error at iteration ${i} (cat: ${randomCat}, query: ${randomQuery}):`, err);
    }
  }

  assert(stressExceptions === 0, `500 rapid chaotic state transitions executed with 0 runtime exceptions`);
  assert(voidCount === 0, `500 rapid chaotic state transitions produced 0 blank DOM voids`);

  // --------------------------------------------------------------------------
  // SUITE 4: WHITESPACE, NULL, AND ADVERSARIAL INPUT TOLERANCE
  // --------------------------------------------------------------------------
  console.log('\n✦ SUITE 4: WHITESPACE, NULL, AND ADVERSARIAL INPUT TOLERANCE ✦');
  console.log('────────────────────────────────────────────────────────────────────────');

  // Padded whitespace query
  menuSection.update('all', '    ');
  assert(
    container.querySelectorAll('.menu-card').length === 96,
    `All-whitespace query "    " behaves as empty query, rendering all 96 cards (found ${container.querySelectorAll('.menu-card').length})`
  );
  assert(
    !container.querySelector('.search-empty-state'),
    `All-whitespace query does NOT trigger empty state`
  );

  // Padded search query
  menuSection.update('all', '   sangria   ');
  assert(
    container.querySelectorAll('.menu-card').length === 2,
    `Whitespace-padded query "   sangria   " trims cleanly to match 2 Sangría jars`
  );

  // Tab & newline characters
  menuSection.update('all', '\tclasica\n');
  assert(
    container.querySelectorAll('.menu-card').length >= 1,
    `Tab/newline padded query "\\tclasica\\n" trims cleanly and matches classic burger`
  );

  // Undefined and null handling
  menuSection.update(null, undefined);
  assert(
    container.querySelectorAll('.menu-card').length === 96,
    `Passing (null, undefined) defaults safely to "all" with 96 cards`
  );

  menuSection.update(undefined, null);
  assert(
    container.querySelectorAll('.menu-card').length === 96,
    `Passing (undefined, null) defaults safely to "all" with 96 cards`
  );

  // Special regex characters in search
  const regexChars = ['.*', '+', '?', '*', '(', ')', '[a-z]', '{1,3}', '^$', '\\d+'];
  let regexFailures = 0;
  for (const rc of regexChars) {
    try {
      menuSection.update('all', rc);
    } catch (e) {
      regexFailures++;
    }
  }
  assert(regexFailures === 0, `Search handles regex metacharacters without throwing SyntaxError`);

  // --------------------------------------------------------------------------
  // SUITE 5: CODEBASE-WIDE TOKEN & SANITY SCAN
  // --------------------------------------------------------------------------
  console.log('\n✦ SUITE 5: CODEBASE-WIDE TOKEN & SANITY SCAN ✦');
  console.log('────────────────────────────────────────────────────────────────────────');

  const srcDir = path.join(projectRoot, 'src');
  const filesToScan = [];

  function collectFiles(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        collectFiles(fullPath);
      } else if (/\.(js|html|css|json)$/i.test(entry.name)) {
        filesToScan.push(fullPath);
      }
    }
  }
  collectFiles(srcDir);
  filesToScan.push(path.join(projectRoot, 'index.html'));

  let toppingOccurrences = [];
  const toppingRegex = /\btoppings?\b/gi;

  for (const filePath of filesToScan) {
    const content = fs.readFileSync(filePath, 'utf8');
    const matches = content.match(toppingRegex);
    if (matches) {
      toppingOccurrences.push({ file: path.relative(projectRoot, filePath), count: matches.length });
    }
  }

  assert(
    toppingOccurrences.length === 0,
    `Codebase contains strictly 0 occurrences of "topping" / "toppings" across ${filesToScan.length} source files`,
    JSON.stringify(toppingOccurrences)
  );

  const emojiRegex = /[\u{1F300}-\u{1FAFF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{2600}-\u{27BF}\u{2B50}\u{2B55}\u{231A}-\u{231B}\u{23E9}-\u{23EC}\u{23F0}\u{23F3}]/u;
  let emojiOccurrences = [];

  for (const filePath of filesToScan) {
    const content = fs.readFileSync(filePath, 'utf8');
    if (emojiRegex.test(content)) {
      emojiOccurrences.push(path.relative(projectRoot, filePath));
    }
  }

  assert(
    emojiOccurrences.length === 0,
    `Codebase contains strictly 0 Unicode emojis across ${filesToScan.length} source files`,
    JSON.stringify(emojiOccurrences)
  );

  const transactionalRegex = /(cart-drawer|btn-checkout|comprar\s+ahora|finalizar\s+pedido|finalizar\s+compra)/gi;
  let transactionalOccurrences = [];

  for (const filePath of filesToScan) {
    const content = fs.readFileSync(filePath, 'utf8');
    const matches = content.match(transactionalRegex);
    if (matches) {
      transactionalOccurrences.push({ file: path.relative(projectRoot, filePath), count: matches.length });
    }
  }

  assert(
    transactionalOccurrences.length === 0,
    `Codebase strictly contains 0 transactional cart/checkout tokens across ${filesToScan.length} source files`,
    JSON.stringify(transactionalOccurrences)
  );

  // --------------------------------------------------------------------------
  // SUMMARY
  // --------------------------------------------------------------------------
  console.log('\n========================================================================');
  console.log(`✦ GATE 2 ADVERSARIAL CHALLENGER PROBE SUMMARY ✦`);
  console.log(`  Total Checks Executed:  ${totalChecks}`);
  console.log(`  Passed Checks:          ${passedChecks}`);
  console.log(`  Failed Checks:          ${failedChecks}`);
  console.log(`  Pass Rate:              ${((passedChecks / totalChecks) * 100).toFixed(1)}%`);
  console.log('========================================================================\n');

  if (failedChecks === 0) {
    console.log('VERDICT: APPROVE (Zero residual edge cases detected)\n');
    process.exit(0);
  } else {
    console.log(`VERDICT: REJECT (${failedChecks} failures)\n`);
    process.exit(1);
  }
}

runGate2AdversarialProbe().catch(err => {
  console.error('Fatal probe execution error:', err);
  process.exit(1);
});
