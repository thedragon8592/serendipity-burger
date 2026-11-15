/**
 * Adversarial Stress & Negative Test Harness for Milestone M1
 * Serendipity Burger Five-Star Luxury Catalog Transformation
 * Author: teamwork_challenger_m1_2
 */

import { menuCategories, menuItems, banquetesHighlights, burgerCustomizationData } from '../src/data/menu.js';

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;
const failures = [];

function assert(condition, testName, details = '') {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`  ✓ PASS: ${testName}`);
  } else {
    failedTests++;
    console.error(`  ✗ FAIL: ${testName} - ${details}`);
    failures.push({ testName, details });
  }
}

console.log('================================================================');
console.log('CHALLENGER SUITE 1: SCHEMA VALIDATION & PROTOTYPE POLLUTION');
console.log('================================================================');

// 1. Prototype Pollution check
const pollutedKeys = ['polluted', 'isAdmin', '__proto__', 'constructor', 'prototype'];
let hasPollution = false;
for (const key of pollutedKeys) {
  if (Object.prototype[key] !== undefined && !['constructor', 'prototype', '__proto__'].includes(key)) {
    hasPollution = true;
  }
}
assert(!hasPollution, 'No prototype pollution on Object.prototype');

// Check prototype chains of exported objects
assert(Object.getPrototypeOf(menuCategories) === Array.prototype, 'menuCategories has normal Array prototype');
assert(Object.getPrototypeOf(menuItems) === Array.prototype, 'menuItems has normal Array prototype');
assert(Object.getPrototypeOf(banquetesHighlights) === Array.prototype, 'banquetesHighlights has normal Array prototype');
assert(Object.getPrototypeOf(burgerCustomizationData) === Object.prototype, 'burgerCustomizationData has normal Object prototype');

// Test JSON roundtrip and prototype safety
const json = JSON.stringify({ menuCategories, menuItems, banquetesHighlights, burgerCustomizationData });
const parsed = JSON.parse(json);
assert(parsed.menuCategories.length === menuCategories.length, 'JSON serialization roundtrip maintains category count');
assert(parsed.menuItems.length === menuItems.length, 'JSON serialization roundtrip maintains items count');

// 2. Duplicate ID Checks
const itemIds = new Set();
const duplicateItemIds = [];
for (const item of menuItems) {
  if (itemIds.has(item.id)) {
    duplicateItemIds.push(item.id);
  }
  itemIds.add(item.id);
}
assert(duplicateItemIds.length === 0, 'Zero duplicate IDs in menuItems', `Duplicates found: ${duplicateItemIds.join(', ')}`);

// Case-insensitive ID check
const lowerItemIds = new Set();
const caseCollisions = [];
for (const item of menuItems) {
  const lower = item.id.toLowerCase();
  if (lowerItemIds.has(lower)) {
    caseCollisions.push(item.id);
  }
  lowerItemIds.add(lower);
}
assert(caseCollisions.length === 0, 'Zero case-insensitive ID collisions in menuItems', `Collisions: ${caseCollisions.join(', ')}`);

// Category ID duplicates
const catIds = new Set();
const duplicateCatIds = [];
for (const cat of menuCategories) {
  if (catIds.has(cat.id)) {
    duplicateCatIds.push(cat.id);
  }
  catIds.add(cat.id);
}
assert(duplicateCatIds.length === 0, 'Zero duplicate IDs in menuCategories', `Duplicates found: ${duplicateCatIds.join(', ')}`);

// Banquete highlight ID duplicates
const banqueteIds = new Set();
const duplicateBanqueteIds = [];
for (const b of banquetesHighlights) {
  if (banqueteIds.has(b.id)) {
    duplicateBanqueteIds.push(b.id);
  }
  banqueteIds.add(b.id);
}
assert(duplicateBanqueteIds.length === 0, 'Zero duplicate IDs in banquetesHighlights', `Duplicates found: ${duplicateBanqueteIds.join(', ')}`);

// ID Format Validation (kebab-case / slug-safe)
const invalidIdFormat = menuItems.filter(item => !/^[a-z0-9-]+$/.test(item.id));
assert(invalidIdFormat.length === 0, 'All menuItems IDs follow kebab-case format', `Invalid IDs: ${invalidIdFormat.map(i => i.id).join(', ')}`);

console.log('\n================================================================');
console.log('CHALLENGER SUITE 2: FOREIGN KEY INTEGRITY & SCHEMA COMPLETENESS');
console.log('================================================================');

const validCatIds = new Set(menuCategories.map(c => c.id));
const orphanItems = menuItems.filter(item => !validCatIds.has(item.categoryId));
assert(orphanItems.length === 0, 'All menuItems reference valid categoryId in menuCategories', `Orphans: ${orphanItems.map(i => `${i.id}(${i.categoryId})`).join(', ')}`);

// Required Fields on every item
const missingRequiredFields = menuItems.filter(item => {
  if (!item.id || typeof item.id !== 'string') return true;
  if (!item.name || typeof item.name !== 'string') return true;
  if (!item.categoryId || typeof item.categoryId !== 'string') return true;
  if (!item.description || typeof item.description !== 'string') return true;
  if (item.price === undefined) return true;
  if (item.price === null && (!item.priceNote || typeof item.priceNote !== 'string')) return true;
  return false;
});
assert(missingRequiredFields.length === 0, 'All menuItems contain all mandatory fields (id, name, categoryId, description, price)', `Missing fields in: ${missingRequiredFields.map(i => i.id).join(', ')}`);

// Numerical validity of prices
const invalidPrices = menuItems.filter(item => {
  if (item.price === null) return false;
  return typeof item.price !== 'number' || isNaN(item.price) || !isFinite(item.price) || item.price <= 0;
});
assert(invalidPrices.length === 0, 'All non-null prices are strictly positive finite numbers', `Invalid prices: ${invalidPrices.map(i => `${i.id}: ${i.price}`).join(', ')}`);

// Precision check (maximum 2 decimal places)
const precisionErrors = menuItems.filter(item => {
  if (item.price === null) return false;
  const str = item.price.toString();
  const decimals = str.includes('.') ? str.split('.')[1].length : 0;
  return decimals > 2;
});
assert(precisionErrors.length === 0, 'All prices have at most 2 decimal places (no floating point leak)', `Errors: ${precisionErrors.map(i => `${i.id}: ${i.price}`).join(', ')}`);

console.log('\n================================================================');
console.log('CHALLENGER SUITE 3: SANGRÍA & CÓCTELES SPECIFICATIONS');
console.log('================================================================');

// Find all Sangría items
const sangriaItems = menuItems.filter(i => 
  i.id.includes('sangria') || 
  i.name.toLowerCase().includes('sangría') || 
  i.name.toLowerCase().includes('sangria') ||
  i.description.toLowerCase().includes('sangría') ||
  i.description.toLowerCase().includes('sangria')
);

assert(sangriaItems.length >= 2, 'At least 2 Sangría items exist in catalog', `Found: ${sangriaItems.length}`);

// Test Sangria Jarra Chica
const jarraChica = menuItems.find(i => i.id === 'coctel-sangria-jarra-chica');
assert(!!jarraChica, 'Jarra chica de Sangría exists');
if (jarraChica) {
  assert(jarraChica.price === 15.00, 'Jarra chica is priced at exactly S/. 15.00', `Got: ${jarraChica.price}`);
  assert(jarraChica.categoryId === 'cocteles', 'Jarra chica is under category "cocteles"', `Got: ${jarraChica.categoryId}`);
  
  // Pitcher size verification
  const mentionsChicaSize = /1\s*l|1\s*litro|chica/i.test(jarraChica.servings || '') || /1\s*litro|1\s*l/i.test(jarraChica.description);
  assert(mentionsChicaSize, 'Jarra chica specifies pitcher size (1L / 1 litro / chica)', `servings: ${jarraChica.servings}, desc: ${jarraChica.description}`);
  
  // Alcohol content verification
  const mentionsAlcohol = /alcohol|vino/i.test(jarraChica.description) || /alcohol/i.test(jarraChica.name);
  assert(mentionsAlcohol, 'Jarra chica specifies alcohol content (con alcohol / vino)', `desc: ${jarraChica.description}`);
}

// Test Sangria Jarra Grande
const jarraGrande = menuItems.find(i => i.id === 'coctel-sangria-jarra-grande');
assert(!!jarraGrande, 'Jarra grande de Sangría exists');
if (jarraGrande) {
  assert(jarraGrande.price === 30.00, 'Jarra grande is priced at exactly S/. 30.00', `Got: ${jarraGrande.price}`);
  assert(jarraGrande.categoryId === 'cocteles', 'Jarra grande is under category "cocteles"', `Got: ${jarraGrande.categoryId}`);
  
  // Pitcher size verification
  const mentionsGrandeSize = /2\s*l|2\s*litros|grande/i.test(jarraGrande.servings || '') || /2\s*litros|2\s*l/i.test(jarraGrande.description);
  assert(mentionsGrandeSize, 'Jarra grande specifies pitcher size (2L / 2 litros / grande)', `servings: ${jarraGrande.servings}, desc: ${jarraGrande.description}`);
  
  // Alcohol content verification
  const mentionsAlcohol = /alcohol|vino/i.test(jarraGrande.description) || /alcohol/i.test(jarraGrande.name);
  assert(mentionsAlcohol, 'Jarra grande specifies alcohol content (con alcohol / vino)', `desc: ${jarraGrande.description}`);
}

// Dedicated Cócteles category validation
const coctelesCategory = menuCategories.find(c => c.id === 'cocteles');
assert(!!coctelesCategory, 'Dedicated category "cocteles" exists in menuCategories');
if (coctelesCategory) {
  assert(coctelesCategory.name.includes('Cócteles'), 'Category name includes "Cócteles"', `Got: ${coctelesCategory.name}`);
  assert(coctelesCategory.name.toLowerCase().includes('con alcohol'), 'Category name specifies "(con alcohol)"', `Got: ${coctelesCategory.name}`);
}

// Are there other cocktails in the cocteles category?
const coctelesItems = menuItems.filter(i => i.categoryId === 'cocteles');
assert(coctelesItems.length >= 6, 'Cócteles category has at least 6 items (2 sangrías + cocktails)', `Found: ${coctelesItems.length}`);

console.log('\n================================================================');
console.log('CHALLENGER SUITE 4: DESSERT & TORTAS PRICING AUDIT');
console.log('================================================================');

// 1. All Tortas check
const tortas = menuItems.filter(i => 
  i.categoryId === 'postres' && (
    i.subcategoryId === 'tortas' ||
    i.name.toLowerCase().includes('torta')
  )
);
assert(tortas.length >= 4, 'Catalog contains at least 4 tortas', `Found: ${tortas.length}`);

const wronglyPricedTortas = tortas.filter(t => t.price !== 13.00);
assert(wronglyPricedTortas.length === 0, 'All tortas are priced at exactly S/. 13.00', `Wrong prices: ${wronglyPricedTortas.map(t => `${t.name}: ${t.price}`).join(', ')}`);

// Individual expected tortas
const expectedTortas = [
  'postre-chocolate',
  'postre-sublime',
  'postre-tresleches-vainilla',
  'postre-tresleches-chocolate'
];
for (const tid of expectedTortas) {
  const item = menuItems.find(i => i.id === tid);
  assert(!!item && item.price === 13.00, `Torta ${tid} exists and is priced at S/. 13.00`, item ? `Price: ${item.price}` : 'Not found');
}

// 2. Non-torta desserts check
const cremaVolteada = menuItems.find(i => i.id === 'postre-crema-volteada');
assert(!!cremaVolteada, 'Crema Volteada exists');
if (cremaVolteada) {
  assert(cremaVolteada.price === 12.00, 'Crema Volteada is priced at exactly S/. 12.00 (not 10, not 13)', `Got: ${cremaVolteada.price}`);
}

// Cheesecakes
const cheesecakes = menuItems.filter(i => i.id.startsWith('postre-cheesecake'));
assert(cheesecakes.length === 3, 'Found 3 cheesecakes (maracuyá, fresa, oreo)', `Found: ${cheesecakes.length}`);
const wrongCheesecakes = cheesecakes.filter(c => c.price !== 12.00);
assert(wrongCheesecakes.length === 0, 'All cheesecakes retain their price of S/. 12.00', `Wrong prices: ${wrongCheesecakes.map(c => `${c.name}: ${c.price}`).join(', ')}`);

// Keke
const keke = menuItems.find(i => i.id === 'postre-keke-vainilla');
assert(!!keke, 'Keke de Vainilla exists');
if (keke) {
  assert(keke.price === 6.00, 'Keke de Vainilla retains price of S/. 6.00', `Got: ${keke.price}`);
}

console.log('\n================================================================');
console.log('CHALLENGER SUITE 5: ZERO EMOJI IN MENUCATEGORIES & DATA');
console.log('================================================================');

// Comprehensive Unicode Emoji Regex
const emojiRegex = /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{1F900}-\u{1F9FF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{2300}-\u{23FF}\u{2B50}\u{2B55}\u{FE0F}]/gu;

let categoryEmojiMatches = [];
for (const cat of menuCategories) {
  for (const [key, val] of Object.entries(cat)) {
    if (typeof val === 'string') {
      const matches = val.match(emojiRegex);
      if (matches) {
        categoryEmojiMatches.push({ cat: cat.id, key, val, emojis: matches });
      }
    }
  }
}
assert(categoryEmojiMatches.length === 0, 'menuCategories contains ZERO emojis', `Found emojis in: ${JSON.stringify(categoryEmojiMatches)}`);

// Check all menuItems for emojis as well
let itemEmojiMatches = [];
for (const item of menuItems) {
  for (const [key, val] of Object.entries(item)) {
    if (typeof val === 'string') {
      const matches = val.match(emojiRegex);
      if (matches) {
        itemEmojiMatches.push({ item: item.id, key, val, emojis: matches });
      }
    }
  }
}
assert(itemEmojiMatches.length === 0, 'menuItems contains ZERO emojis', `Found emojis in: ${JSON.stringify(itemEmojiMatches)}`);

// Check banquetesHighlights for emojis
let banqueteEmojiMatches = [];
for (const b of banquetesHighlights) {
  for (const [key, val] of Object.entries(b)) {
    if (typeof val === 'string') {
      const matches = val.match(emojiRegex);
      if (matches) {
        banqueteEmojiMatches.push({ b: b.id, key, val, emojis: matches });
      }
    }
  }
}
assert(banqueteEmojiMatches.length === 0, 'banquetesHighlights contains ZERO emojis', `Found emojis in: ${JSON.stringify(banqueteEmojiMatches)}`);

// Check burgerCustomizationData for emojis
let customEmojiMatches = [];
function checkCustomEmojis(obj) {
  for (const [key, val] of Object.entries(obj)) {
    if (typeof val === 'string') {
      const matches = val.match(emojiRegex);
      if (matches) customEmojiMatches.push({ key, val, emojis: matches });
    } else if (typeof val === 'object' && val !== null) {
      checkCustomEmojis(val);
    }
  }
}
checkCustomEmojis(burgerCustomizationData);
assert(customEmojiMatches.length === 0, 'burgerCustomizationData contains ZERO emojis', `Found emojis in: ${JSON.stringify(customEmojiMatches)}`);

console.log('\n================================================================');
console.log('CHALLENGER SUITE 6: FORBIDDEN TERMINOLOGY ("TOPPING")');
console.log('================================================================');

const fullDataJson = JSON.stringify({ menuCategories, menuItems, banquetesHighlights, burgerCustomizationData });
const toppingMatches = fullDataJson.match(/topping/gi) || [];
assert(toppingMatches.length === 0, 'Zero occurrences of "topping" or "toppings" across all menu data', `Found ${toppingMatches.length} occurrences`);

console.log('\n================================================================');
console.log('CHALLENGER SUITE 7: CATEGORY NAMING CONVENTIONS & INTEGRATION');
console.log('================================================================');

// 1. Burger category: simply "Hamburguesas"
const burgerCat = menuCategories.find(c => c.id === 'hamburguesas');
assert(!!burgerCat, 'Burger category exists');
if (burgerCat) {
  assert(burgerCat.name === 'Hamburguesas', 'Burger category is named exactly "Hamburguesas" (NOT "Hamburguesas de autor")', `Got: "${burgerCat.name}"`);
}

// 2. Parrillas & Banquetes
const parrillasCat = menuCategories.find(c => c.id === 'parrillas-banquetes');
assert(!!parrillasCat, 'Parrillas & Banquetes category exists');
if (parrillasCat) {
  assert(parrillasCat.name === 'Parrillas & Banquetes', 'Category is named exactly "Parrillas & Banquetes"', `Got: "${parrillasCat.name}"`);
}

// 3. Piqueos & Salchipapas
const piqueosCat = menuCategories.find(c => c.id === 'piqueos');
assert(!!piqueosCat, 'Piqueos category exists');
if (piqueosCat) {
  assert(piqueosCat.name === 'Piqueos & Salchipapas', 'Category is named exactly "Piqueos & Salchipapas" (replacing "Pincelada Gourmet")', `Got: "${piqueosCat.name}"`);
}

// 4. Alitas Acevichadas
const alitasAcevichadas = menuItems.find(i => i.id === 'p-alitas-acevichada');
assert(!!alitasAcevichadas, 'Alitas Acevichadas exists in menuItems');
if (alitasAcevichadas) {
  assert(alitasAcevichadas.price === 18.50, 'Alitas Acevichadas is priced at exactly S/. 18.50', `Got: ${alitasAcevichadas.price}`);
  assert(alitasAcevichadas.categoryId === 'parrillas-banquetes', 'Alitas Acevichadas is in "parrillas-banquetes"', `Got: ${alitasAcevichadas.categoryId}`);
}

console.log('\n================================================================');
console.log('CHALLENGER SUITE 8: NEGATIVE & ADVERSARIAL STRESS HARNESS');
console.log('================================================================');

// 1. Adversarial search filter simulation
function filterItems(query, category = null) {
  return menuItems.filter(item => {
    const matchesCat = !category || item.categoryId === category;
    if (!matchesCat) return false;
    if (!query) return true;
    const cleanQ = query.toLowerCase().trim();
    const nameMatch = (item.name || '').toLowerCase().includes(cleanQ);
    const descMatch = (item.description || '').toLowerCase().includes(cleanQ);
    const subMatch = (item.subcategoryName || '').toLowerCase().includes(cleanQ);
    return nameMatch || descMatch || subMatch;
  });
}

// Test edge queries
const adversarialQueries = [
  "",
  "   ",
  "a",
  "SANGRÍA",
  "sangria",
  "h. peruana",
  "1/2 litro",
  "s/. 13.00",
  "non-existent-xyz-999",
  "null",
  "undefined",
  "__proto__",
  "<script>alert(1)</script>",
  "DROP TABLE menu;",
  "🍔",
  "ñandú",
  "maracuyá",
  "chicha MORADA"
];

let queryCrashCount = 0;
for (const q of adversarialQueries) {
  try {
    const results = filterItems(q);
    // basic sanity
    if (!Array.isArray(results)) queryCrashCount++;
  } catch (err) {
    queryCrashCount++;
  }
}
assert(queryCrashCount === 0, 'Adversarial query filter produces safe arrays without exceptions for all hostile inputs');

// 2. Boundary Category Filtering
const hostileCategories = [
  null,
  undefined,
  "",
  "__proto__",
  "hamburguesas",
  "parrillas-banquetes",
  "cocteles",
  "fake_category_123"
];
let catCrashCount = 0;
for (const cat of hostileCategories) {
  try {
    const res = filterItems("", cat);
    if (!Array.isArray(res)) catCrashCount++;
  } catch (err) {
    catCrashCount++;
  }
}
assert(catCrashCount === 0, 'Hostile category filters handled safely without throwing');

// 3. Customization data Adicionales count
const adicionalCount = burgerCustomizationData.categories.reduce((acc, cat) => acc + cat.items.length, 0);
assert(adicionalCount >= 14, `Adicionales count is ${adicionalCount} (>= 14 expected)`);
assert(burgerCustomizationData.cremas.length >= 7, `House sauces count is ${burgerCustomizationData.cremas.length} (>= 7 expected)`);

// Check duplicate additional names
const customNames = new Set();
const duplicateCustomNames = [];
for (const cat of burgerCustomizationData.categories) {
  for (const item of cat.items) {
    if (customNames.has(item.name)) duplicateCustomNames.push(item.name);
    customNames.add(item.name);
  }
}
assert(duplicateCustomNames.length === 0, 'Zero duplicate names in burgerCustomizationData items', `Duplicates: ${duplicateCustomNames.join(', ')}`);

// Final tally
console.log('\n================================================================');
console.log(`CHALLENGER SUITE COMPLETE`);
console.log(`Total Tests Run:    ${totalTests}`);
console.log(`Total Tests Passed: ${passedTests}`);
console.log(`Total Tests Failed: ${failedTests}`);
console.log('================================================================');

if (failedTests > 0) {
  console.error('\nFAILURES SUMMARY:');
  failures.forEach((f, idx) => {
    console.error(`  ${idx + 1}. ${f.testName}: ${f.details}`);
  });
  process.exit(1);
} else {
  console.log('\nALL ADVERSARIAL STRESS TESTS PASSED WITH 100% SUCCESS.');
  process.exit(0);
}
