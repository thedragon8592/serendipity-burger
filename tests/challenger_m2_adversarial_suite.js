/**
 * ============================================================================
 * SERENDIPITY BURGER — ADVERSARIAL CHALLENGER SUITE (MILESTONE M2)
 * ============================================================================
 * Role: teamwork_challenger (empirical challenger, critic, specialist)
 * Objective: Adversarially challenge and stress-test the Zero-Emoji and Luxury
 *            Visual Redesign across every byte and character of all files.
 * ============================================================================
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;
const failureLog = [];

function assert(condition, testName, details = '') {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`  ✓ PASS: ${testName}`);
  } else {
    failedTests++;
    console.error(`  ✗ FAIL: ${testName} - ${details}`);
    failureLog.push({ testName, details });
  }
}

console.log('================================================================');
console.log('EMPIRICAL CHALLENGER ADVERSARIAL VERIFICATION SUITE — MILESTONE M2');
console.log('================================================================\n');

// ============================================================================
// TIER 1: BYTE-BY-BYTE & CHARACTER-BY-CHARACTER ZERO-EMOJI STRESS AUDIT
// ============================================================================
console.log('--- TIER 1: ADVERSARIAL ZERO-EMOJI CODEPOINT & ENTITY SCAN ---');

// Collect all relevant files in serendipity-burger
const sourceExtensions = ['.html', '.js', '.json', '.css'];
const excludedDirs = ['node_modules', '.git', 'dist', 'tests'];

function collectFiles(dir) {
  let results = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (!excludedDirs.includes(entry.name)) {
        results = results.concat(collectFiles(fullPath));
      }
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase();
      if (sourceExtensions.includes(ext)) {
        results.push(fullPath);
      }
    }
  }
  return results;
}

const targetFiles = collectFiles(projectRoot);
assert(targetFiles.length >= 15, `Target file discovery: found ${targetFiles.length} source files to audit`);

// Emoji Codepoint Predicate: Checks byte-by-byte / codepoint-by-codepoint
function isEmojiOrSymbolCodepoint(cp) {
  // 1. Supplementary Multilingual Plane emoji & symbols: U+1F000 - U+1FFFF
  if (cp >= 0x1F000 && cp <= 0x1FFFF) return { match: true, range: 'SMP U+1F000-U+1FFFF' };

  // 2. Miscellaneous Symbols & Dingbats: U+2600 - U+27BF
  if (cp >= 0x2600 && cp <= 0x27BF) return { match: true, range: 'Dingbats/Symbols U+2600-U+27BF' };

  // 3. Miscellaneous Technical Emojis: U+2300 - U+23FF
  if (cp >= 0x2300 && cp <= 0x23FF) return { match: true, range: 'Misc Technical U+2300-U+23FF' };

  // 4. Miscellaneous Symbols & Arrows (e.g., U+2B50 star, U+2B55 circle): U+2B00 - U+2BFF
  if (cp >= 0x2B00 && cp <= 0x2BFF) return { match: true, range: 'Symbols & Arrows U+2B00-U+2BFF' };

  // 5. Variation Selectors (e.g. U+FE0F emoji presentation selector): U+FE00 - U+FE0F
  if (cp >= 0xFE00 && cp <= 0xFE0F) return { match: true, range: 'Variation Selector U+FE00-U+FE0F' };

  // 6. Zero-Width Joiner (ZWJ used for emoji sequences)
  if (cp === 0x200D) return { match: true, range: 'Zero-Width Joiner U+200D' };

  return { match: false };
}

// Adversarial regexes for escaped unicode and HTML entities
const escapedUnicodeRegex = /\\u\{1[Ff][0-9a-fA-F]{3,4}\}|\\u[Dd]83[CcDdEe][\\u][0-9a-fA-F]{4}/g;
const htmlNumericEntityRegex = /&#(?:x1[Ff][0-9a-fA-F]{3}|12[789][0-9]{3}|x2[67][0-9a-fA-F]{2});/gi;

let totalRawEmojiDetections = 0;
let totalEscapedEmojiDetections = 0;
let totalEntityEmojiDetections = 0;
const detectedViolations = [];

for (const filePath of targetFiles) {
  const relativePath = path.relative(projectRoot, filePath);
  const content = fs.readFileSync(filePath, 'utf8');

  // 1. Character-by-character codepoint check
  let charIndex = 0;
  for (const char of content) {
    const cp = char.codePointAt(0);
    const check = isEmojiOrSymbolCodepoint(cp);
    if (check.match) {
      totalRawEmojiDetections++;
      detectedViolations.push({
        file: relativePath,
        type: `Raw Codepoint: U+${cp.toString(16).toUpperCase()} (${check.range})`,
        char,
        index: charIndex
      });
    }
    charIndex += char.length;
  }

  // 2. Check for escaped Unicode strings
  let match;
  while ((match = escapedUnicodeRegex.exec(content)) !== null) {
    totalEscapedEmojiDetections++;
    detectedViolations.push({
      file: relativePath,
      type: 'Escaped Unicode Sequence',
      char: match[0],
      index: match.index
    });
  }

  // 3. Check for HTML numeric entities
  while ((match = htmlNumericEntityRegex.exec(content)) !== null) {
    totalEntityEmojiDetections++;
    detectedViolations.push({
      file: relativePath,
      type: 'HTML Numeric Entity',
      char: match[0],
      index: match.index
    });
  }
}

assert(
  totalRawEmojiDetections === 0,
  'Zero raw Unicode emojis across all scanned source files',
  `Found ${totalRawEmojiDetections} raw emoji violations: ${JSON.stringify(detectedViolations.filter(v => v.type.startsWith('Raw')))}`
);

assert(
  totalEscapedEmojiDetections === 0,
  'Zero escaped Unicode emoji sequences in JS/CSS/HTML source strings',
  `Found ${totalEscapedEmojiDetections} escaped sequences`
);

assert(
  totalEntityEmojiDetections === 0,
  'Zero HTML numeric emoji entities in source files',
  `Found ${totalEntityEmojiDetections} HTML emoji entities`
);

// Bonus: Verify compiled dist files also contain zero emojis
const distDir = path.join(projectRoot, 'dist');
if (fs.existsSync(distDir)) {
  const distFiles = collectFiles(distDir);
  let distEmojiCount = 0;
  for (const df of distFiles) {
    const content = fs.readFileSync(df, 'utf8');
    for (const char of content) {
      const cp = char.codePointAt(0);
      if (isEmojiOrSymbolCodepoint(cp).match) {
        distEmojiCount++;
      }
    }
  }
  assert(distEmojiCount === 0, 'Production bundle in dist/ contains zero Unicode emojis', `Found ${distEmojiCount} in dist`);
}


// ============================================================================
// TIER 2: SVG WELL-FORMEDNESS & XML ARCHITECTURAL VALIDATION
// ============================================================================
console.log('\n--- TIER 2: SVG WELL-FORMEDNESS & ATTRIBUTE INTEGRITY OF icons.js ---');

const iconsModulePath = path.join(projectRoot, 'src', 'components', 'icons.js');
assert(fs.existsSync(iconsModulePath), 'src/components/icons.js exists');

const { getIconSvg } = await import(`file://${iconsModulePath}`);
assert(typeof getIconSvg === 'function', 'getIconSvg is exported as a function');

// Strict XML Tokenizing Validator
function validateSvgXml(svgString, iconName) {
  if (!svgString.startsWith('<svg') || !svgString.endsWith('</svg>')) {
    return { valid: false, error: 'Does not start with <svg and end with </svg>' };
  }

  // Required root attributes
  const requiredAttributes = [
    'xmlns="http://www.w3.org/2000/svg"',
    'viewBox="0 0 24 24"',
    'fill="none"',
    'stroke-width="',
    'stroke-linecap="round"',
    'stroke-linejoin="round"'
  ];

  for (const attr of requiredAttributes) {
    if (!svgString.includes(attr)) {
      return { valid: false, error: `Missing required root attribute: ${attr}` };
    }
  }

  // Check XML tag balance
  const tagRegex = /<(\/?[a-zA-Z0-9_-]+)([^>]*)>/g;
  let match;
  const tagStack = [];
  const allowedElements = new Set(['svg', 'path', 'circle', 'rect', 'line', 'polygon', 'polyline', 'g', 'defs', 'clipPath']);

  while ((match = tagRegex.exec(svgString)) !== null) {
    const rawTag = match[1];
    const attrs = match[2];
    const isClosing = rawTag.startsWith('/');
    const isSelfClosing = attrs.trim().endsWith('/');

    const tagName = isClosing ? rawTag.slice(1) : rawTag;

    if (!allowedElements.has(tagName)) {
      return { valid: false, error: `Disallowed or invalid SVG element <${tagName}> in icon ${iconName}` };
    }

    if (isClosing) {
      if (tagStack.length === 0) {
        return { valid: false, error: `Unexpected closing tag </${tagName}> with empty stack in icon ${iconName}` };
      }
      const expected = tagStack.pop();
      if (expected !== tagName) {
        return { valid: false, error: `Mismatched closing tag in ${iconName}: expected </${expected}>, got </${tagName}>` };
      }
    } else if (!isSelfClosing) {
      tagStack.push(tagName);
    }

    // Validate attribute quoting
    if (!isClosing) {
      const cleanAttrs = isSelfClosing ? attrs.trim().slice(0, -1).trim() : attrs.trim();
      if (cleanAttrs.length > 0) {
        // Match attribute patterns
        const attrPattern = /([a-zA-Z0-9_:-]+)="([^"]*)"/g;
        let countMatches = 0;
        let attrMatch;
        let stripped = cleanAttrs;
        while ((attrMatch = attrPattern.exec(cleanAttrs)) !== null) {
          countMatches++;
          stripped = stripped.replace(attrMatch[0], '');
        }
        if (stripped.trim().length > 0) {
          return { valid: false, error: `Malformed unquoted or illegal attributes in <${tagName}>: '${stripped.trim()}'` };
        }
      }
    }
  }

  if (tagStack.length > 0) {
    return { valid: false, error: `Unclosed tags remaining in ${iconName}: ${tagStack.join(', ')}` };
  }

  return { valid: true };
}

// 29 official bespoke icons expected
const expectedIcons = [
  'burger', 'grill', 'flame', 'crown', 'spark', 'cloche', 'fries',
  'sliders', 'sundae', 'cocktail', 'carafe', 'dessert', 'cup', 'wine',
  'beverage', 'book', 'pin', 'clock', 'compass', 'guests', 'search',
  'close', 'star', 'quote', 'check', 'arrow-right', 'social-instagram',
  'social-facebook', 'social-tiktok'
];

let allIconsValid = true;
const invalidIcons = [];

for (const iconKey of expectedIcons) {
  const defaultSvg = getIconSvg(iconKey);
  const result = validateSvgXml(defaultSvg, iconKey);
  if (!result.valid) {
    allIconsValid = false;
    invalidIcons.push({ iconKey, error: result.error });
  }

  // Also test customized options
  const customSvg = getIconSvg(iconKey, {
    width: 32,
    height: 32,
    strokeWidth: 2,
    color: '#c5a880',
    className: 'custom-icon-class'
  });
  const customResult = validateSvgXml(customSvg, `${iconKey}-custom`);
  if (!customResult.valid) {
    allIconsValid = false;
    invalidIcons.push({ iconKey: `${iconKey}-custom`, error: customResult.error });
  }
}

assert(allIconsValid, `All ${expectedIcons.length} bespoke SVG icons are well-formed XML`, JSON.stringify(invalidIcons));

// Stress test fallbacks
const fallbackEmpty = getIconSvg('');
const fallbackNull = getIconSvg(null);
const fallbackUndefined = getIconSvg(undefined);
const fallbackNonexistent = getIconSvg('nonexistent_key_adversarial_test');

assert(validateSvgXml(fallbackEmpty, 'empty').valid, 'Fallback for empty string returns valid SVG');
assert(validateSvgXml(fallbackNull, 'null').valid, 'Fallback for null returns valid SVG');
assert(validateSvgXml(fallbackUndefined, 'undefined').valid, 'Fallback for undefined returns valid SVG');
assert(validateSvgXml(fallbackNonexistent, 'unknown').valid, 'Fallback for unknown key returns valid SVG (spark)');


// ============================================================================
// TIER 3: COMPONENT IMPORT RESOLUTION & ICON USAGE INTEGRITY
// ============================================================================
console.log('\n--- TIER 3: COMPONENT IMPORT RESOLUTION & CALL-SITE AUDIT ---');

// Scan all consumer components in src/components and src/main.js (excluding icons.js itself)
const componentsDir = path.join(projectRoot, 'src', 'components');
const componentFiles = fs.readdirSync(componentsDir)
  .filter(f => f.endsWith('.js') && f !== 'icons.js')
  .map(f => path.join(componentsDir, f));
componentFiles.push(path.join(projectRoot, 'src', 'main.js'));

let totalComponentImports = 0;
let validComponentImports = 0;
const invalidCallSites = [];

for (const compPath of componentFiles) {
  const content = fs.readFileSync(compPath, 'utf8');
  const compName = path.basename(compPath);

  // Check if it imports getIconSvg
  if (content.includes('getIconSvg')) {
    totalComponentImports++;
    // Verify import line exists
    const hasImport = /import\s+\{[^}]*getIconSvg[^}]*\}\s+from\s+['"]([^'"]+)['"]/.test(content);
    if (hasImport) {
      validComponentImports++;
    } else {
      invalidCallSites.push({ compName, error: 'Calls getIconSvg without standard import statement' });
    }

    // Extract all getIconSvg call sites with static string arguments
    const callPattern = /getIconSvg\(\s*['"]([a-zA-Z0-9_-]+)['"]/g;
    let match;
    while ((match = callPattern.exec(content)) !== null) {
      const requestedKey = match[1];
      if (!expectedIcons.includes(requestedKey)) {
        invalidCallSites.push({ compName, requestedKey, error: `Calls unknown iconKey: '${requestedKey}'` });
      }
    }
  }
}

assert(totalComponentImports >= 7, `Component import coverage: found ${totalComponentImports} files importing icons.js`);
assert(validComponentImports === totalComponentImports, 'All component icon imports resolve cleanly', JSON.stringify(invalidCallSites));
assert(invalidCallSites.length === 0, 'All static getIconSvg calls reference existing icons in iconDefinitions', JSON.stringify(invalidCallSites));

// Dynamic ESM Module Resolution of all components
let modulesLoaded = 0;
let dynamicImportFailures = [];

for (const compPath of componentFiles) {
  const compName = path.basename(compPath);
  if (compName === 'main.js') continue; // main.js binds to DOM on DOMContentLoaded
  try {
    const mod = await import(`file://${compPath}`);
    assert(mod !== null && typeof mod === 'object', `ESM Dynamic load: ${compName} imported successfully`);
    modulesLoaded++;
  } catch (err) {
    dynamicImportFailures.push({ compName, error: err.message });
    assert(false, `ESM Dynamic load: ${compName} failed`, err.message);
  }
}

assert(dynamicImportFailures.length === 0, 'Zero ESM module resolution errors across all components');


// ============================================================================
// TIER 4: MENU DATA CATEGORY ICON-KEY CROSS-REFERENCE
// ============================================================================
console.log('\n--- TIER 4: MENU CATEGORY ICON-KEY CROSS-REFERENCE ---');

const menuModulePath = path.join(projectRoot, 'src', 'data', 'menu.js');
const { menuCategories, menuItems } = await import(`file://${menuModulePath}`);

assert(Array.isArray(menuCategories), 'menuCategories is an Array');
assert(menuCategories.length === 7, `menuCategories has 7 categories (found ${menuCategories.length})`);

let missingCategoryIcons = [];
for (const cat of menuCategories) {
  if (!cat.iconKey || !expectedIcons.includes(cat.iconKey)) {
    missingCategoryIcons.push({ categoryId: cat.id, iconKey: cat.iconKey });
  }
}

assert(missingCategoryIcons.length === 0, 'Every menu category iconKey maps to a defined SVG icon', JSON.stringify(missingCategoryIcons));


// ============================================================================
// TIER 5: LUXURY DESIGN SYSTEM, FAVICON & RESTRAINT VERIFICATION
// ============================================================================
console.log('\n--- TIER 5: FIVE-STAR LUXURY DESIGN SYSTEM CONFORMANCE ---');

// 1. Favicon verification in index.html
const indexHtmlPath = path.join(projectRoot, 'index.html');
const indexHtml = fs.readFileSync(indexHtmlPath, 'utf8');

assert(!indexHtml.includes('🍔'), 'index.html does not contain hamburger emoji');
assert(indexHtml.includes('type="image/svg+xml"'), 'index.html specifies SVG favicon MIME type');
assert(indexHtml.includes("data:image/svg+xml,%3Csvg"), 'index.html uses embedded SVG monogram data URI');
assert(indexHtml.includes('%230c0b0a') && indexHtml.includes('%23c5a880'), 'Favicon SVG uses Obsidian Noir & Champagne Gold palette');

// 2. CSS Design Tokens & Rules in main.css
const cssPath = path.join(projectRoot, 'src', 'styles', 'main.css');
const cssContent = fs.readFileSync(cssPath, 'utf8');

assert(cssContent.includes('--bg-obsidian: #0c0b0a'), 'Design Token: --bg-obsidian is defined as #0c0b0a');
assert(cssContent.includes('--clr-gold-champagne: #c5a880'), 'Design Token: --clr-gold-champagne is defined as #c5a880');
assert(cssContent.includes('--clr-ivory: #fcfbf9'), 'Design Token: --clr-ivory is defined as #fcfbf9');
assert(cssContent.includes('font-family: var(--font-serif)'), 'Typography: serif headings applied across design');
assert(cssContent.includes('font-variant-numeric: tabular-nums'), 'Typography: tabular-nums applied to pricing');
assert(cssContent.includes('@keyframes luxuryFadeIn'), 'Micro-Animations: @keyframes luxuryFadeIn is defined');
assert(cssContent.includes('cubic-bezier(0.16, 1, 0.3, 1)'), 'Micro-Animations: refined cubic-bezier easing applied');

// 3. Verify elimination of fast-food neon styles
assert(!cssContent.includes('#ff8b8b'), 'Restraint: Garish neon red badge color #ff8b8b eliminated');
assert(!cssContent.includes('linear-gradient(135deg, var(--clr-burgundy), #5c1212)'), 'Restraint: Fast-food burgundy gradient eliminated');


// ============================================================================
// TIER 6: ADVERSARIAL STRESS, ZERO-WIDTH CORRUPTIONS & METADATA PURITY
// ============================================================================
console.log('\n--- TIER 6: ADVERSARIAL STRESS & CORRUPTED CHARACTERS AUDIT ---');

// Check for zero-width spaces, BOM, or invisible homoglyph injections in menu & config
const dataFiles = [
  path.join(projectRoot, 'src', 'data', 'menu.js'),
  path.join(projectRoot, 'src', 'data', 'config.js')
];

let invisibleArtifactsFound = 0;
const invisibleCharsRegex = /[\u200B-\u200D\uFEFF]/g; // zero-width space, joiners, BOM

for (const df of dataFiles) {
  const content = fs.readFileSync(df, 'utf8');
  const baseName = path.basename(df);
  let match;
  while ((match = invisibleCharsRegex.exec(content)) !== null) {
    // Exclude BOM if only at index 0 (though UTF8 without BOM is preferred)
    invisibleArtifactsFound++;
    console.error(`  Suspicious invisible character U+${match[0].charCodeAt(0).toString(16)} in ${baseName}`);
  }
}

assert(invisibleArtifactsFound === 0, 'Zero invisible character/joiner injections in data files');

// Stress test: getIconSvg option handling under extreme inputs
const extremeNumericOptions = getIconSvg('burger', { width: 9999, height: 9999, strokeWidth: 10 });
assert(extremeNumericOptions.includes('width="9999"'), 'Handles large positive dimensions safely');

const zeroDimOptions = getIconSvg('flame', { width: 0, height: 0 });
assert(zeroDimOptions.includes('width="18"'), 'Falsy zero dimensions safely default to standard 18px rather than rendering invisible 0px icon');

// Verify package.json integrity
const packageJsonPath = path.join(projectRoot, 'package.json');
const pkg = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
assert(pkg.scripts && pkg.scripts.build && pkg.scripts.dev, 'package.json contains valid build and dev scripts');
assert(pkg.type === 'module', 'package.json enforces ESM type: "module"');


// ============================================================================
// SUMMARY & VERDICT
// ============================================================================
console.log('\n================================================================');
console.log(`TOTAL TESTS: ${totalTests} | PASSED: ${passedTests} | FAILED: ${failedTests}`);
console.log('================================================================');

if (failedTests > 0) {
  console.error('\nADVERSARIAL VERDICT: REQUEST_CHANGES');
  console.error('Failure Details:\n', JSON.stringify(failureLog, null, 2));
  process.exit(1);
} else {
  console.log('\nADVERSARIAL VERDICT: APPROVE');
  console.log('All byte-level zero-emoji, SVG well-formedness, and import resolution challenges PASSED.');
  process.exit(0);
}
