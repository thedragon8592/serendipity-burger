/**
 * ============================================================================
 * SERENDIPITY BURGER — FIVE-STAR LUXURY CATALOG VERIFICATION TEST SUITE
 * ============================================================================
 * Comprehensive, multi-tier automated test harness and verification suite
 * strictly evaluating compliance with:
 *   - ORIGINAL_REQUEST.md (Initial Request & Follow-up Adjustments)
 *   - PROJECT.md (Architecture, Interface Contracts & Feature Inventory)
 *   - SERENDIPITY NUEVa carta.pdf (Baseline physical restaurant menu specification)
 *
 * Test Tiers:
 *   - Tier 1: Feature Coverage & Catalog Integrity (106 items, categories, adicionales)
 *   - Tier 2: Boundary & Corner Cases (null price / Magic Box, priceNote, search edge cases)
 *   - Tier 3: Absolute Zero Emoji Verification (Unicode codepoints scan across all source files)
 *   - Tier 4: Mandatory Price & Requirement Corrections (Jarras S/. 15/30, Tortas S/. 13,
 *             Crema volteada S/. 12, Alitas acevichadas S/. 18.50, negative cart/checkout checks,
 *             wording "Adicionales", category naming)
 *
 * Execution:
 *   node tests/verify_luxury_catalog.js
 * ============================================================================
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

// --- ANSI Colors for Haute-Cuisine Terminal Presentation ---
const RESET = '\x1b[0m';
const BOLD = '\x1b[1m';
const DIM = '\x1b[2m';
const GREEN = '\x1b[32m';
const RED = '\x1b[31m';
const YELLOW = '\x1b[33m';
const CYAN = '\x1b[36m';
const GOLD = '\x1b[38;2;197;168;128m';

let totalTests = 0;
let totalPassed = 0;
let totalFailed = 0;
const failureDetails = [];

function logSection(title) {
  console.log(`\n${BOLD}${GOLD}✦ ${title.toUpperCase()} ✦${RESET}`);
  console.log(`${DIM}${'─'.repeat(72)}${RESET}`);
}

function test(name, fn) {
  totalTests++;
  try {
    fn();
    totalPassed++;
    console.log(`  ${GREEN}✓ PASS${RESET}  ${name}`);
  } catch (err) {
    totalFailed++;
    console.log(`  ${RED}✗ FAIL${RESET}  ${name}`);
    console.log(`         ${DIM}${err.message}${RESET}`);
    failureDetails.push({ name, error: err.message, stack: err.stack });
  }
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message || 'Assertion failed');
  }
}

function assertEqual(actual, expected, message) {
  if (actual !== expected) {
    throw new Error(
      `${message ? message + ': ' : ''}Expected [${expected}] (${typeof expected}), but got [${actual}] (${typeof actual})`
    );
  }
}

// ============================================================================
// DATA LOADING
// ============================================================================
let menuData = null;
let configData = null;

try {
  menuData = await import('../src/data/menu.js');
} catch (err) {
  console.error(`${RED}Failed to import src/data/menu.js: ${err.message}${RESET}`);
}

try {
  configData = await import('../src/data/config.js');
} catch (err) {
  console.error(`${RED}Failed to import src/data/config.js: ${err.message}${RESET}`);
}

const menuCategories = menuData?.menuCategories || [];
const menuItems = menuData?.menuItems || [];
const banquetesHighlights = menuData?.banquetesHighlights || [];
const burgerCustomizationData = menuData?.burgerCustomizationData || {};
const restaurantConfig = configData?.restaurantConfig || {};

// ============================================================================
// TIER 1: FEATURE COVERAGE & CATALOG INTEGRITY
// ============================================================================
logSection('Tier 1: Feature Coverage & Catalog Integrity');

test('T1.1: menuCategories array exists and contains required macro-ambiances', () => {
  assert(Array.isArray(menuCategories), 'menuCategories must be an array');
  assert(menuCategories.length >= 6, `Expected at least 6 categories, found ${menuCategories.length}`);

  const categoryNames = menuCategories.map(c => (c.name || '').toLowerCase());
  const categoryIds = menuCategories.map(c => (c.id || '').toLowerCase());

  // 1. Hamburguesas
  const hasBurgers = categoryNames.some(n => n.includes('hamburguesa')) || categoryIds.includes('hamburguesas') || categoryIds.includes('patriotas');
  assert(hasBurgers, 'Category covering Hamburguesas must exist');

  // 2. Parrillas & Banquetes
  const hasGrill = categoryNames.some(n => n.includes('parrilla') || n.includes('banquete')) || categoryIds.includes('parrillas-banquetes') || categoryIds.includes('combos-grill');
  assert(hasGrill, 'Category covering Parrillas & Banquetes must exist');

  // 3. Piqueos & Salchipapas
  const hasPiqueos = categoryNames.some(n => n.includes('piqueo') || n.includes('salchipapa')) || categoryIds.includes('piqueos') || categoryIds.includes('piqueos-salchipapas') || categoryIds.includes('pincelada');
  assert(hasPiqueos, 'Category covering Piqueos & Salchipapas must exist');

  // 4. Postres
  const hasPostres = categoryNames.some(n => n.includes('postre') || n.includes('tentación') || n.includes('tentacion')) || categoryIds.includes('postres');
  assert(hasPostres, 'Category covering Postres must exist');

  // 5. Cócteles (con alcohol)
  const hasCocteles = categoryNames.some(n => n.includes('cóctel') || n.includes('coctel') || n.includes('sangría') || n.includes('sangria')) || categoryIds.includes('cocteles') || categoryIds.includes('cocteleria');
  assert(hasCocteles, 'Dedicated category for Cócteles (con alcohol) must exist');

  // 6. Jugos & Bebidas
  const hasBebidas = categoryNames.some(n => n.includes('jugo') || n.includes('bebida') || n.includes('batido') || n.includes('refresco')) || categoryIds.includes('jugos') || categoryIds.includes('bebidas');
  assert(hasBebidas, 'Category covering Jugos & Bebidas must exist');
});

test('T1.2: Every category in menuCategories is well-formed with non-empty id and name', () => {
  assert(menuCategories.length > 0, 'menuCategories is empty');
  for (const cat of menuCategories) {
    assert(typeof cat.id === 'string' && cat.id.trim().length > 0, `Category missing id: ${JSON.stringify(cat)}`);
    assert(typeof cat.name === 'string' && cat.name.trim().length > 0, `Category ${cat.id} missing name`);
  }
});

test('T1.3: menuItems contains all catalog dishes with valid schema and prices', () => {
  assert(Array.isArray(menuItems), 'menuItems must be an array');
  assert(menuItems.length >= 89, `Expected at least 89 items, found ${menuItems.length}`);

  for (const item of menuItems) {
    assert(typeof item.id === 'string' && item.id.trim().length > 0, `Item missing id: ${JSON.stringify(item)}`);
    assert(typeof item.name === 'string' && item.name.trim().length > 0, `Item ${item.id} missing name`);
    assert(typeof item.categoryId === 'string' && item.categoryId.trim().length > 0, `Item ${item.id} missing categoryId`);
    assert(typeof item.description === 'string' && item.description.trim().length > 0, `Item ${item.id} missing description`);

    // Price must be either a positive number OR null with a valid priceNote
    const hasValidNumericPrice = typeof item.price === 'number' && item.price >= 0;
    const hasValidConsultNote = item.price === null && typeof item.priceNote === 'string' && item.priceNote.trim().length > 0;
    assert(
      hasValidNumericPrice || hasValidConsultNote,
      `Item ${item.id} has invalid price: ${item.price} (priceNote: ${item.priceNote})`
    );
  }
});

test('T1.4: banquetesHighlights contains the 3 signature sharing platters with servings and pricing', () => {
  assert(Array.isArray(banquetesHighlights), 'banquetesHighlights must be an array');
  assertEqual(banquetesHighlights.length, 3, 'Must define exactly 3 banquet highlight platters');

  const names = banquetesHighlights.map(b => b.name.toLowerCase());
  assert(names.some(n => n.includes('selección premium') || n.includes('seleccion premium')), 'Must include Selección Premium');
  assert(names.some(n => n.includes('mega parrilla')), 'Must include Mega Parrilla');
  assert(names.some(n => n.includes('banquete premium') || n.includes('banquete premiun')), 'Must include Banquete Premium');

  for (const b of banquetesHighlights) {
    assert(typeof b.id === 'string' && b.id.length > 0, `Banquete missing id: ${JSON.stringify(b)}`);
    assert(typeof b.price === 'number' && b.price > 0, `Banquete ${b.id} missing positive price`);
    assert(typeof b.servings === 'string' && b.servings.length > 0, `Banquete ${b.id} missing servings note`);
    assert(typeof b.description === 'string' && b.description.length > 0, `Banquete ${b.id} missing description`);
  }
});

test('T1.5: burgerCustomizationData contains at least 14 additional items and 7 house sauces', () => {
  assert(typeof burgerCustomizationData === 'object', 'burgerCustomizationData must be an object');
  assert(Array.isArray(burgerCustomizationData.categories), 'burgerCustomizationData.categories must be an array');

  // Count total additional items across groups
  let totalAdicionales = 0;
  for (const group of burgerCustomizationData.categories) {
    assert(Array.isArray(group.items), `Group ${group.group} must have items array`);
    for (const item of group.items) {
      assert(typeof item.name === 'string' && item.name.length > 0, `Adicional item missing name`);
      assert(typeof item.price === 'number' && item.price > 0, `Adicional item ${item.name} missing price`);
      totalAdicionales++;
    }
  }
  assert(totalAdicionales >= 14, `Expected at least 14 adicionales, found ${totalAdicionales}`);

  // House sauces / cremas
  assert(Array.isArray(burgerCustomizationData.cremas), 'burgerCustomizationData.cremas must be an array');
  assertEqual(burgerCustomizationData.cremas.length, 7, 'Must define exactly 7 house sauces');

  const cremaNames = burgerCustomizationData.cremas.map(c => c.name.toLowerCase());
  const expectedCremas = ['mayonesa', 'aceituna', 'ketchup', 'vinagreta', 'mostaza', 'tártara', 'ají'];
  for (const exp of expectedCremas) {
    const normExp = exp.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const found = cremaNames.some(cn => cn.normalize('NFD').replace(/[\u0300-\u036f]/g, '').includes(normExp));
    assert(found, `Expected house sauce [${exp}] in burgerCustomizationData.cremas`);
  }
});

test('T1.6: Overall catalog item count reflects full 106 culinary items', () => {
  let adicionalCount = 0;
  if (burgerCustomizationData && Array.isArray(burgerCustomizationData.categories)) {
    for (const g of burgerCustomizationData.categories) {
      if (Array.isArray(g.items)) adicionalCount += g.items.length;
    }
  }
  const totalCatalogCreations = menuItems.length + adicionalCount;
  assert(
    totalCatalogCreations >= 106,
    `Total catalog items (menuItems ${menuItems.length} + adicionales ${adicionalCount} = ${totalCatalogCreations}) must be at least 106`
  );
});

// ============================================================================
// TIER 2: BOUNDARY & CORNER CASES
// ============================================================================
logSection('Tier 2: Boundary & Corner Cases');

test('T2.1: Experiential items with price: null (Magic Box) have valid priceNote and format safely', () => {
  const magicBox = menuItems.find(item =>
    (item.id || '').toLowerCase().includes('magic') ||
    (item.name || '').toLowerCase().includes('magic box')
  );

  assert(magicBox !== undefined, 'Magic Box item must exist in menuItems');
  assertEqual(magicBox.price, null, 'Magic Box must have price: null');
  assert(
    typeof magicBox.priceNote === 'string' && magicBox.priceNote.trim().length > 0,
    'Magic Box must have a non-empty priceNote (e.g. "Consultar con el mozo")'
  );

  // Formatter test simulating component rendering
  function formatPrice(item) {
    if (item.price !== null && item.price !== undefined) {
      return `S/. ${item.price.toFixed(2)}`;
    }
    return item.priceNote || 'Consultar';
  }

  let formatted = null;
  try {
    formatted = formatPrice(magicBox);
  } catch (err) {
    throw new Error(`Price formatting crashed on null price: ${err.message}`);
  }
  assert(formatted.length > 0, 'Formatted price note must not be empty');
  assert(!formatted.includes('NaN'), 'Formatted price note must not contain NaN');
});

test('T2.2: Price formatter handles boundary numerical values without throw', () => {
  function formatPrice(item) {
    if (item.price !== null && item.price !== undefined) {
      return `S/. ${item.price.toFixed(2)}`;
    }
    return item.priceNote || 'Consultar';
  }

  assertEqual(formatPrice({ price: 0 }), 'S/. 0.00', 'Handles price 0');
  assertEqual(formatPrice({ price: 18.5 }), 'S/. 18.50', 'Handles decimal price');
  assertEqual(formatPrice({ price: 100 }), 'S/. 100.00', 'Handles integer price');
  assertEqual(formatPrice({ price: null }), 'Consultar', 'Fallback to default Consultar when priceNote missing');
  assertEqual(formatPrice({ price: null, priceNote: 'Consultar al mozo' }), 'Consultar al mozo', 'Uses custom priceNote');
  assertEqual(formatPrice({}), 'Consultar', 'Handles empty item object gracefully');
});

test('T2.3: Search filtering handles edge queries, punctuation, case and whitespace', () => {
  function filterCatalog(items, query) {
    if (!query || typeof query !== 'string') return items;
    const cleanQuery = query.trim().toLowerCase();
    if (!cleanQuery) return items;
    return items.filter(item => {
      const name = (item.name || '').toLowerCase();
      const desc = (item.description || '').toLowerCase();
      return name.includes(cleanQuery) || desc.includes(cleanQuery);
    });
  }

  // 1. Empty string returns all
  assertEqual(filterCatalog(menuItems, '').length, menuItems.length, 'Empty search returns all items');

  // 2. Whitespace returns all
  assertEqual(filterCatalog(menuItems, '    ').length, menuItems.length, 'Whitespace search returns all items');

  // 3. Case insensitivity
  const lowerResults = filterCatalog(menuItems, 'hamburguesa');
  const upperResults = filterCatalog(menuItems, 'HAMBURGUESA');
  const mixedResults = filterCatalog(menuItems, 'HaMbUrGuEsA');
  assertEqual(lowerResults.length, upperResults.length, 'Search is case-insensitive (lower vs upper)');
  assertEqual(lowerResults.length, mixedResults.length, 'Search is case-insensitive (mixed)');
  assert(lowerResults.length > 0, 'Search for hamburguesa returns matches');

  // 4. Non-matching search returns empty array without throwing
  const emptyResults = filterCatalog(menuItems, 'plato-inexistente-xyz-12345');
  assert(Array.isArray(emptyResults) && emptyResults.length === 0, 'Non-existent dish returns empty array');

  // 5. Special regex characters do not crash string matching
  let specialResult;
  try {
    specialResult = filterCatalog(menuItems, 'H. [Pollo] (1/2)? *+$^');
  } catch (err) {
    throw new Error(`Search filter crashed on regex meta-characters: ${err.message}`);
  }
  assert(Array.isArray(specialResult), 'Punctuation search returns an array');
});

// ============================================================================
// TIER 3: ABSOLUTE ZERO EMOJI VERIFICATION
// ============================================================================
logSection('Tier 3: Absolute Zero Emoji Verification');

test('T3.1: Absolute Zero Unicode emojis across all source files (.html, .js, .json, .css)', () => {
  // Unicode regex covering Emoji, Pictographs, Dingbats, and related symbols
  // Codepoints U+1F300-U+1FAFF, U+2600-U+27BF, U+1F600-U+1F64F, etc.
  const emojiRegex = /[\u{1F300}-\u{1FAFF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{2600}-\u{27BF}\u{2B50}\u{2B55}\u{231A}-\u{231B}\u{23E9}-\u{23EC}\u{23F0}\u{23F3}]/u;

  const targetExtensions = new Set(['.html', '.js', '.json', '.css']);
  const ignoredDirectories = new Set(['node_modules', 'dist', '.git', '.agents', 'tests']);

  const emojiViolations = [];

  function scanDirectory(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        if (!ignoredDirectories.has(entry.name)) {
          scanDirectory(fullPath);
        }
      } else if (entry.isFile()) {
        const ext = path.extname(entry.name).toLowerCase();
        if (targetExtensions.has(ext)) {
          scanFile(fullPath);
        }
      }
    }
  }

  function scanFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split(/\r?\n/);
    lines.forEach((line, index) => {
      // Check for emoji
      if (emojiRegex.test(line)) {
        // Find specific match
        const matches = line.match(new RegExp(emojiRegex, 'gu')) || [];
        for (const m of matches) {
          const codepoint = 'U+' + m.codePointAt(0).toString(16).toUpperCase();
          const relativePath = path.relative(projectRoot, filePath);
          emojiViolations.push({
            file: relativePath,
            line: index + 1,
            char: m,
            codepoint,
            snippet: line.trim().substring(0, 80)
          });
        }
      }
    });
  }

  scanDirectory(projectRoot);

  if (emojiViolations.length > 0) {
    const summary = emojiViolations
      .slice(0, 10)
      .map(v => `  - ${v.file}:${v.line} (${v.char} ${v.codepoint}): "${v.snippet}"`)
      .join('\n');
    const extra = emojiViolations.length > 10 ? `\n  ... and ${emojiViolations.length - 10} more` : '';
    throw new Error(
      `Found ${emojiViolations.length} Unicode emoji character(s) in source files (must be 0):\n${summary}${extra}`
    );
  }
});

// ============================================================================
// TIER 4: MANDATORY PRICE AND REQUIREMENT CORRECTIONS
// ============================================================================
logSection('Tier 4: Mandatory Price & Requirement Corrections');

test('T4.1: Jarra chica de Sangría is priced at exactly S/. 15.00', () => {
  const jarraChica = menuItems.find(item => {
    const name = (item.name || '').toLowerCase();
    const desc = (item.description || '').toLowerCase();
    const id = (item.id || '').toLowerCase();
    return (
      (name.includes('jarra chica') || id.includes('jarra-chica') || (name.includes('chica') && name.includes('sangr'))) &&
      (name.includes('sangr') || desc.includes('sangr'))
    );
  });

  assert(jarraChica !== undefined, 'Jarra chica de Sangría must exist in menuItems');
  assertEqual(jarraChica.price, 15.00, 'Jarra chica de Sangría must be priced at S/. 15.00');
});

test('T4.2: Jarra grande de Sangría is priced at exactly S/. 30.00', () => {
  const jarraGrande = menuItems.find(item => {
    const name = (item.name || '').toLowerCase();
    const desc = (item.description || '').toLowerCase();
    const id = (item.id || '').toLowerCase();
    return (
      (name.includes('jarra grande') || id.includes('jarra-grande') || (name.includes('grande') && name.includes('sangr'))) &&
      (name.includes('sangr') || desc.includes('sangr'))
    );
  });

  assert(jarraGrande !== undefined, 'Jarra grande de Sangría must exist in menuItems');
  assertEqual(jarraGrande.price, 30.00, 'Jarra grande de Sangría must be priced at S/. 30.00');
});

test('T4.3: Dedicated category for Cócteles (con alcohol) contains Sangría options', () => {
  const coctelCategory = menuCategories.find(c => {
    const name = (c.name || '').toLowerCase();
    const id = (c.id || '').toLowerCase();
    return name.includes('cóctel') || name.includes('coctel') || id.includes('coctel');
  });

  assert(coctelCategory !== undefined, 'Dedicated category for Cócteles (con alcohol) must exist');
  assert(
    coctelCategory.name.toLowerCase().includes('alcohol') ||
    (coctelCategory.badge || '').toLowerCase().includes('alcohol') ||
    coctelCategory.name.toLowerCase().includes('cóctel') ||
    coctelCategory.name.toLowerCase().includes('coctel'),
    `Cócteles category name or badge should specify "(con alcohol)"`
  );

  // Verify that Sangría items belong to this category
  const coctelItems = menuItems.filter(item => item.categoryId === coctelCategory.id);
  const hasSangria = coctelItems.some(i => (i.name || '').toLowerCase().includes('sangr') || (i.description || '').toLowerCase().includes('sangr'));
  assert(hasSangria, 'Cócteles category must include Sangría items');
});

test('T4.4: All tortas (every cake) are priced at exactly S/. 13.00', () => {
  const tortas = menuItems.filter(item => (item.name || '').toLowerCase().includes('torta'));
  assert(tortas.length >= 4, `Expected at least 4 torta items, found ${tortas.length}`);

  for (const t of tortas) {
    assertEqual(t.price, 13.00, `Item [${t.name}] must be priced at S/. 13.00`);
  }

  // Specifically verify the four required tortas
  const chocolate = tortas.find(t => t.name.toLowerCase().includes('chocolate') && !t.name.toLowerCase().includes('tres leches'));
  const sublime = tortas.find(t => t.name.toLowerCase().includes('sublime'));
  const tresLechesVainilla = tortas.find(t => t.name.toLowerCase().includes('tres leches') && t.name.toLowerCase().includes('vainilla'));
  const tresLechesChocolate = tortas.find(t => t.name.toLowerCase().includes('tres leches') && t.name.toLowerCase().includes('chocolate'));

  assert(chocolate !== undefined, 'Torta de Chocolate must exist');
  assertEqual(chocolate.price, 13.00, 'Torta de Chocolate price must be S/. 13.00');

  assert(sublime !== undefined, 'Torta de Sublime must exist');
  assertEqual(sublime.price, 13.00, 'Torta de Sublime price must be S/. 13.00');

  assert(tresLechesVainilla !== undefined, 'Torta Tres Leches de Vainilla must exist');
  assertEqual(tresLechesVainilla.price, 13.00, 'Torta Tres Leches de Vainilla price must be S/. 13.00');

  assert(tresLechesChocolate !== undefined, 'Torta Tres Leches de Chocolate must exist');
  assertEqual(tresLechesChocolate.price, 13.00, 'Torta Tres Leches de Chocolate price must be S/. 13.00');
});

test('T4.5: Crema Volteada is priced at exactly S/. 12.00', () => {
  const cremaVolteada = menuItems.find(item =>
    (item.name || '').toLowerCase().includes('crema volteada') ||
    (item.id || '').toLowerCase().includes('crema-volteada')
  );

  assert(cremaVolteada !== undefined, 'Crema Volteada must exist in menuItems');
  assertEqual(cremaVolteada.price, 12.00, 'Crema Volteada price must be S/. 12.00');
});

test('T4.6: Alitas Acevichadas is priced at exactly S/. 18.50', () => {
  const alitasAcevichadas = menuItems.find(item => {
    const name = (item.name || '').toLowerCase();
    const id = (item.id || '').toLowerCase();
    const desc = (item.description || '').toLowerCase();
    return (
      (name.includes('alitas') || id.includes('alitas')) &&
      (name.includes('acevichada') || desc.includes('acevichada') || id.includes('acevichada'))
    );
  });

  assert(alitasAcevichadas !== undefined, 'Alitas Acevichadas must exist in menuItems');
  assertEqual(alitasAcevichadas.price, 18.50, 'Alitas Acevichadas price must be S/. 18.50');
});

test('T4.7: Negative requirement — Zero shopping cart, checkout button, drawer, or order form', () => {
  const srcDir = path.join(projectRoot, 'src');
  const indexHtmlPath = path.join(projectRoot, 'index.html');

  const filesToCheck = [indexHtmlPath];

  function collectFiles(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const e of entries) {
      const full = path.join(dir, e.name);
      if (e.isDirectory()) {
        collectFiles(full);
      } else if (e.isFile() && (e.name.endsWith('.js') || e.name.endsWith('.html') || e.name.endsWith('.css'))) {
        filesToCheck.push(full);
      }
    }
  }

  collectFiles(srcDir);

  const cartPatterns = [
    { pattern: /\bcart-drawer\b/i, name: 'cart-drawer class/id' },
    { pattern: /\bshopping-cart\b/i, name: 'shopping-cart keyword' },
    { pattern: /\bbtn-checkout\b/i, name: 'btn-checkout' },
    { pattern: /comprar\s+ahora/i, name: '"Comprar ahora" CTA' },
    { pattern: /finalizar\s+pedido/i, name: '"Finalizar pedido" CTA' },
    { pattern: /finalizar\s+compra/i, name: '"Finalizar compra" CTA' },
    { pattern: /<form[^>]+id=["'](?:order|checkout|cart)[^"']*["']/i, name: 'Order/Checkout Form element' }
  ];

  const violations = [];

  for (const filePath of filesToCheck) {
    const content = fs.readFileSync(filePath, 'utf-8');
    const relative = path.relative(projectRoot, filePath);
    for (const { pattern, name } of cartPatterns) {
      if (pattern.test(content)) {
        violations.push(`${relative} contains forbidden transactional pattern: ${name}`);
      }
    }
  }

  if (violations.length > 0) {
    throw new Error(
      `Found transactional/cart elements in table QR digital catalog:\n${violations.map(v => '  - ' + v).join('\n')}`
    );
  }
});

test('T4.8: Terminology requirement — "toppings" replaced by "Adicionales" across customer-facing text', () => {
  const menuJsPath = path.join(projectRoot, 'src', 'data', 'menu.js');
  const content = fs.readFileSync(menuJsPath, 'utf-8');

  // Check if the word "toppings" occurs in string literals
  const stringLiteralRegex = /"([^"\\]*(\\.[^"\\]*)*)"|'([^'\\]*(\\.[^'\\]*)*)'|`([^`\\]*(\\.[^`\\]*)*)`/g;
  let match;
  const toppingOccurrences = [];

  while ((match = stringLiteralRegex.exec(content)) !== null) {
    const literal = match[0];
    if (/\btoppings?\b/i.test(literal)) {
      toppingOccurrences.push(literal);
    }
  }

  if (toppingOccurrences.length > 0) {
    throw new Error(
      `Found forbidden word "toppings" in src/data/menu.js strings (must be replaced by "Adicionales"): ${toppingOccurrences.join(', ')}`
    );
  }
});

test('T4.9: Category naming requirement — Hamburguesas (NOT "Hamburguesas de autor")', () => {
  for (const cat of menuCategories) {
    const name = cat.name || '';
    assert(
      !name.toLowerCase().includes('hamburguesas de autor'),
      `Category name must NOT be "Hamburguesas de autor", found: "${name}"`
    );
  }

  // Check that "Hamburguesas" exists as a category name or macroCategory
  const hasPlainBurgers = menuCategories.some(cat => {
    const name = (cat.name || '').trim();
    return (
      name.toLowerCase() === 'hamburguesas' ||
      cat.macroCategory === 'hamburguesas' ||
      cat.id === 'hamburguesas'
    );
  });
  assert(hasPlainBurgers, 'Category name for burgers must be simply "Hamburguesas"');
});

test('T4.10: Category naming requirement — Unified "Parrillas & Banquetes"', () => {
  const hasUnifiedGrillBanquet = menuCategories.some(cat => {
    const name = (cat.name || '').toLowerCase();
    const id = (cat.id || '').toLowerCase();
    const macro = (cat.macroCategory || '').toLowerCase();
    return (
      name.includes('parrillas & banquetes') ||
      name.includes('parrillas y banquetes') ||
      id === 'parrillas-banquetes' ||
      macro === 'parrillas-banquetes'
    );
  });
  assert(
    hasUnifiedGrillBanquet,
    'Must unify Grill/Parrillas and Banquetes into "Parrillas & Banquetes"'
  );
});

test('T4.11: Category naming requirement — SOBER rename "Piqueos & Salchipapas" (replacing "Pincelada Gourmet")', () => {
  // 1. "Pincelada Gourmet" must NOT appear in menuCategories names
  for (const cat of menuCategories) {
    const name = cat.name || '';
    assert(
      !name.toLowerCase().includes('pincelada gourmet'),
      `Category name must NOT be "Pincelada Gourmet", found: "${name}"`
    );
  }

  // 2. Category for Piqueos & Salchipapas must exist
  const hasPiqueosSalchipapas = menuCategories.some(cat => {
    const name = (cat.name || '').toLowerCase();
    const id = (cat.id || '').toLowerCase();
    return name.includes('piqueo') || name.includes('salchipapa') || id.includes('piqueo') || id.includes('salchipapa');
  });
  assert(
    hasPiqueosSalchipapas,
    'Category must be named "Piqueos & Salchipapas" (or sober criollo equivalent)'
  );
});

// ============================================================================
// FINAL TALLY & REPORT
// ============================================================================
console.log(`\n${BOLD}${GOLD}════════════════════════════════════════════════════════════════════════${RESET}`);
console.log(`${BOLD}VERIFICATION SUMMARY${RESET}`);
console.log(`  Total Tests Run:  ${totalTests}`);
console.log(`  Passed Tests:     ${GREEN}${totalPassed}${RESET}`);
console.log(`  Failed Tests:     ${totalFailed > 0 ? RED : GREEN}${totalFailed}${RESET}`);
console.log(`${BOLD}${GOLD}════════════════════════════════════════════════════════════════════════${RESET}\n`);

if (totalFailed > 0) {
  console.log(`${RED}${BOLD}Failed Tests Breakdown:${RESET}`);
  failureDetails.forEach((f, i) => {
    console.log(`  ${i + 1}. ${BOLD}${f.name}${RESET}`);
    console.log(`     ${RED}${f.error}${RESET}`);
  });
  console.log(`\n${YELLOW}Status: IMPLEMENTATION DEFECTS DETECTED. Awaiting Worker milestone implementation.${RESET}\n`);
  process.exitCode = 1;
} else {
  console.log(`${GREEN}${BOLD}Status: ALL VERIFICATION TIERS PASSED. Five-Star Luxury Catalog Verified.${RESET}\n`);
  process.exitCode = 0;
}
