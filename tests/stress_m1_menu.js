/**
 * EMPIRICAL STRESS TEST SUITE — MILESTONE M1 MENU DATA
 *
 * Adversarially challenges src/data/menu.js against all specifications:
 * 1. Price types and numeric validity (no NaN, no negatives, no undefined prices).
 * 2. Foreign Key category references (menuItems -> menuCategories).
 * 3. Adicionales data integrity (burgerCustomizationData).
 * 4. Mandatory pricing compliance:
 *    - Jarra chica: 15.00
 *    - Jarra grande: 30.00
 *    - All tortas: 13.00
 *    - Crema volteada: 12.00
 *    - Alitas acevichadas: 18.50
 * 5. Text assertions:
 *    - Zero occurrences of "topping" (case-insensitive).
 *    - Zero Unicode emoji codepoints.
 * 6. Edge cases & structural invariants:
 *    - Unique ID collisions.
 *    - Boundary checks and string hygiene.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const menuFilePath = path.resolve(__dirname, '../src/data/menu.js');

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;
const failures = [];

function assert(condition, testName, details = '') {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`  [PASS] ${testName}`);
  } else {
    failedTests++;
    console.error(`  [FAIL] ${testName} -> ${details}`);
    failures.push({ testName, details });
  }
}

console.log('================================================================');
console.log('STARTING EMPIRICAL STRESS TEST: src/data/menu.js');
console.log('================================================================');

// -----------------------------------------------------------------------------
// RAW FILE TEXT ASSERTIONS
// -----------------------------------------------------------------------------
console.log('\n--- 1. Raw Text Invariants (Emojis & Forbidden Wording) ---');
const rawFileContent = fs.readFileSync(menuFilePath, 'utf8');

// Test 1.1: 0 occurrences of "topping" (case-insensitive)
const toppingMatches = rawFileContent.match(/topping/gi) || [];
assert(
  toppingMatches.length === 0,
  'Zero occurrences of "topping" (case-insensitive)',
  `Found ${toppingMatches.length} occurrence(s) of "topping"`
);

// Test 1.2: 0 Unicode emojis
// Comprehensive Unicode regex matching pictographs, emoji presentations, and common symbols
const emojiRegex = /[\u{1F300}-\u{1F5FF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/u;
const emojiMatches = [];
const lines = rawFileContent.split('\n');
lines.forEach((line, index) => {
  if (emojiRegex.test(line)) {
    emojiMatches.push(`Line ${index + 1}: ${line.trim()}`);
  }
});
assert(
  emojiMatches.length === 0,
  'Zero Unicode emojis in src/data/menu.js',
  `Found emojis on lines:\n${emojiMatches.join('\n')}`
);

// -----------------------------------------------------------------------------
// MODULE IMPORT AND STRUCTURE CHECKS
// -----------------------------------------------------------------------------
console.log('\n--- 2. Data Module Export & Structure Validation ---');
let menuModule;
try {
  menuModule = await import('../src/data/menu.js');
  assert(true, 'src/data/menu.js imported successfully via ESM');
} catch (err) {
  assert(false, 'src/data/menu.js import failed', err.message);
  process.exit(1);
}

const { menuCategories, menuItems, banquetesHighlights, burgerCustomizationData } = menuModule;

assert(Array.isArray(menuCategories) && menuCategories.length > 0, 'menuCategories is non-empty array');
assert(Array.isArray(menuItems) && menuItems.length > 0, 'menuItems is non-empty array');
assert(Array.isArray(banquetesHighlights) && banquetesHighlights.length > 0, 'banquetesHighlights is non-empty array');
assert(burgerCustomizationData && typeof burgerCustomizationData === 'object', 'burgerCustomizationData is valid object');

// -----------------------------------------------------------------------------
// UNIQUE IDS & KEY INTEGRITY
// -----------------------------------------------------------------------------
console.log('\n--- 3. Primary Key & Identifier Integrity ---');
const categoryIds = new Set();
const duplicateCategoryIds = [];
for (const cat of menuCategories) {
  if (categoryIds.has(cat.id)) duplicateCategoryIds.push(cat.id);
  categoryIds.add(cat.id);
}
assert(duplicateCategoryIds.length === 0, 'All menuCategories have unique id', `Duplicates: ${duplicateCategoryIds.join(', ')}`);

const itemIds = new Set();
const duplicateItemIds = [];
for (const item of menuItems) {
  if (itemIds.has(item.id)) duplicateItemIds.push(item.id);
  itemIds.add(item.id);
}
assert(duplicateItemIds.length === 0, 'All menuItems have unique id', `Duplicates: ${duplicateItemIds.join(', ')}`);

const banquetIds = new Set();
const duplicateBanquetIds = [];
for (const b of banquetesHighlights) {
  if (banquetIds.has(b.id)) duplicateBanquetIds.push(b.id);
  banquetIds.add(b.id);
}
assert(duplicateBanquetIds.length === 0, 'All banquetesHighlights have unique id', `Duplicates: ${duplicateBanquetIds.join(', ')}`);

// -----------------------------------------------------------------------------
// CATEGORY FOREIGN KEY REFERENCES
// -----------------------------------------------------------------------------
console.log('\n--- 4. Foreign Key (categoryId) Integrity ---');
const invalidCategoryRefs = [];
for (const item of menuItems) {
  if (!categoryIds.has(item.categoryId)) {
    invalidCategoryRefs.push({ itemId: item.id, invalidCategoryId: item.categoryId });
  }
}
assert(
  invalidCategoryRefs.length === 0,
  'Every menuItem.categoryId resolves to an existing menuCategory.id',
  `Invalid references: ${JSON.stringify(invalidCategoryRefs)}`
);

// -----------------------------------------------------------------------------
// PRICE TYPES & NUMERIC VALIDITY (ADVERSARIAL STRESS)
// -----------------------------------------------------------------------------
console.log('\n--- 5. Price Types & Numeric Validity ---');
const invalidPrices = [];
for (const item of menuItems) {
  if (item.price === null) {
    // Intentional null price: must have priceNote
    if (typeof item.priceNote !== 'string' || item.priceNote.trim().length === 0) {
      invalidPrices.push({ id: item.id, price: item.price, reason: 'price is null but missing valid priceNote' });
    }
  } else if (typeof item.price !== 'number' || Number.isNaN(item.price) || !Number.isFinite(item.price)) {
    invalidPrices.push({ id: item.id, price: item.price, reason: 'price is not a finite number' });
  } else if (item.price <= 0) {
    invalidPrices.push({ id: item.id, price: item.price, reason: 'price is zero or negative' });
  }
}
assert(
  invalidPrices.length === 0,
  'All menuItems have valid numeric prices or null with priceNote',
  `Invalid prices: ${JSON.stringify(invalidPrices)}`
);

const invalidBanquetPrices = [];
for (const b of banquetesHighlights) {
  if (typeof b.price !== 'number' || Number.isNaN(b.price) || !Number.isFinite(b.price) || b.price <= 0) {
    invalidBanquetPrices.push({ id: b.id, price: b.price });
  }
}
assert(
  invalidBanquetPrices.length === 0,
  'All banquetesHighlights have valid positive finite prices',
  `Invalid banquet prices: ${JSON.stringify(invalidBanquetPrices)}`
);

// -----------------------------------------------------------------------------
// ADICIONALES (burgerCustomizationData) INTEGRITY
// -----------------------------------------------------------------------------
console.log('\n--- 6. Adicionales Data Integrity ---');
assert(Array.isArray(burgerCustomizationData.categories), 'burgerCustomizationData.categories is array');
const customizationPriceErrors = [];
let totalAdicionalesItems = 0;

for (const group of (burgerCustomizationData.categories || [])) {
  if (typeof group.group !== 'string' || !group.group.trim()) {
    customizationPriceErrors.push({ group, reason: 'missing group name' });
  }
  if (!Array.isArray(group.items) || group.items.length === 0) {
    customizationPriceErrors.push({ group: group.group, reason: 'items is not non-empty array' });
  } else {
    for (const item of group.items) {
      totalAdicionalesItems++;
      if (typeof item.name !== 'string' || !item.name.trim()) {
        customizationPriceErrors.push({ item, reason: 'missing item name' });
      }
      if (typeof item.price !== 'number' || Number.isNaN(item.price) || !Number.isFinite(item.price) || item.price <= 0) {
        customizationPriceErrors.push({ item, reason: 'invalid item price' });
      }
    }
  }
}
assert(
  customizationPriceErrors.length === 0,
  'Every additional category and item has valid name and positive price',
  `Errors: ${JSON.stringify(customizationPriceErrors)}`
);
assert(totalAdicionalesItems >= 14, `At least 14 additional items defined (found ${totalAdicionalesItems})`);

assert(Array.isArray(burgerCustomizationData.cremas), 'burgerCustomizationData.cremas is array');
assert(burgerCustomizationData.cremas.length === 7, `Exactly 7 house sauces defined (found ${burgerCustomizationData.cremas.length})`);

// -----------------------------------------------------------------------------
// MANDATORY PRICE & SPECIFICATION COMPLIANCE
// -----------------------------------------------------------------------------
console.log('\n--- 7. Mandatory Pricing & Specification Compliance ---');

// Jarra chica: 15.00
const jarraChica = menuItems.find(i => /jarra\s+chica/i.test(i.name));
assert(
  jarraChica !== undefined,
  'Jarra chica exists in menuItems',
  'Could not find item with "Jarra chica" in name'
);
if (jarraChica) {
  assert(
    jarraChica.price === 15.00,
    `Jarra chica price is exactly 15.00 (got ${jarraChica.price})`,
    `Actual price: ${jarraChica.price}`
  );
  assert(
    jarraChica.categoryId === 'cocteles',
    `Jarra chica belongs to "cocteles" category (got ${jarraChica.categoryId})`
  );
  assert(
    /sangr[ií]a/i.test(jarraChica.name) || /sangr[ií]a/i.test(jarraChica.description),
    'Jarra chica specifies Sangría'
  );
}

// Jarra grande: 30.00
const jarraGrande = menuItems.find(i => /jarra\s+grande/i.test(i.name));
assert(
  jarraGrande !== undefined,
  'Jarra grande exists in menuItems',
  'Could not find item with "Jarra grande" in name'
);
if (jarraGrande) {
  assert(
    jarraGrande.price === 30.00,
    `Jarra grande price is exactly 30.00 (got ${jarraGrande.price})`,
    `Actual price: ${jarraGrande.price}`
  );
  assert(
    jarraGrande.categoryId === 'cocteles',
    `Jarra grande belongs to "cocteles" category (got ${jarraGrande.categoryId})`
  );
  assert(
    /sangr[ií]a/i.test(jarraGrande.name) || /sangr[ií]a/i.test(jarraGrande.description),
    'Jarra grande specifies Sangría'
  );
}

// All tortas: 13.00
const tortaItems = menuItems.filter(i => /torta/i.test(i.name) || i.subcategoryId === 'tortas');
assert(tortaItems.length > 0, `Tortas found in menuItems (found ${tortaItems.length})`);
const nonCompliantTortas = tortaItems.filter(t => t.price !== 13.00);
assert(
  nonCompliantTortas.length === 0,
  `All tortas are priced at exactly 13.00 (tested ${tortaItems.length} tortas)`,
  `Non-compliant tortas: ${JSON.stringify(nonCompliantTortas.map(t => ({ name: t.name, price: t.price })))}`
);

// Crema volteada: 12.00
const cremaVolteada = menuItems.find(i => /crema\s+volteada/i.test(i.name));
assert(
  cremaVolteada !== undefined,
  'Crema volteada exists in menuItems',
  'Could not find item with "Crema volteada" in name'
);
if (cremaVolteada) {
  assert(
    cremaVolteada.price === 12.00,
    `Crema volteada price is exactly 12.00 (got ${cremaVolteada.price})`,
    `Actual price: ${cremaVolteada.price}`
  );
}

// Alitas acevichadas: 18.50
const alitasAcevichadas = menuItems.find(i => /alitas.*acevichada/i.test(i.name) || /acevichada/i.test(i.name));
assert(
  alitasAcevichadas !== undefined,
  'Alitas Acevichadas exists in menuItems',
  'Could not find item with "Alitas acevichadas" in name'
);
if (alitasAcevichadas) {
  assert(
    alitasAcevichadas.price === 18.50,
    `Alitas Acevichadas price is exactly 18.50 (got ${alitasAcevichadas.price})`,
    `Actual price: ${alitasAcevichadas.price}`
  );
}

// -----------------------------------------------------------------------------
// USER FOLLOW-UP CATEGORY CHECKS
// -----------------------------------------------------------------------------
console.log('\n--- 8. User Follow-up Category Requirements ---');

// Hamburguesas named simply "Hamburguesas"
const burgerCat = menuCategories.find(c => c.id === 'hamburguesas');
assert(
  burgerCat && burgerCat.name === 'Hamburguesas',
  'Burger category is named simply "Hamburguesas" (NOT "Hamburguesas de autor")',
  `Actual name: ${burgerCat?.name}`
);

// Parrillas & Banquetes unified
const grillBanquetCat = menuCategories.find(c => c.id === 'parrillas-banquetes');
assert(
  grillBanquetCat && grillBanquetCat.name === 'Parrillas & Banquetes',
  'Grill and Banquetes unified into "Parrillas & Banquetes"',
  `Actual name: ${grillBanquetCat?.name}`
);

// Piqueos & Salchipapas sober rename
const piqueosCat = menuCategories.find(c => c.id === 'piqueos');
assert(
  piqueosCat && piqueosCat.name === 'Piqueos & Salchipapas',
  'Pincelada Gourmet renamed soberly to "Piqueos & Salchipapas"',
  `Actual name: ${piqueosCat?.name}`
);

// Dedicated Cócteles category
const coctelesCat = menuCategories.find(c => c.id === 'cocteles');
assert(
  coctelesCat && /c[oó]cteles/i.test(coctelesCat.name),
  'Dedicated Cócteles category exists in menuCategories',
  `Actual name: ${coctelesCat?.name}`
);

// -----------------------------------------------------------------------------
// FINAL SUMMARY
// -----------------------------------------------------------------------------
console.log('\n================================================================');
console.log(`STRESS TEST COMPLETE: ${passedTests}/${totalTests} PASSED, ${failedTests} FAILED`);
console.log('================================================================');

if (failedTests > 0) {
  console.error('\nFAILED TESTS DETAILS:');
  failures.forEach((f, idx) => {
    console.error(`  ${idx + 1}. ${f.testName}: ${f.details}`);
  });
  process.exit(1);
} else {
  console.log('\nVERDICT: ALL ADVERSARIAL STRESS CHECKS PASSED.');
  process.exit(0);
}
