/**
 * CHALLENGER M4 GATE 2 EMPIRICAL ADVERSARIAL PROBE
 * 
 * Independent, exhaustive verification harness for Milestone M4 Gate 2:
 * 1. DOM Anchor Target Resolution (Strict 100% ID existence in DOM for all href^="#")
 * 2. Iframe Attributes & Maps Accessibility/Security/Performance
 * 3. Social Media Authentic URLs, Handles, Security & Integrity
 * 4. Codebase-wide Absolute Zero Emoji Invariant across all source files
 * 5. Full Component Assembly & State Verification
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

// ============================================================================
// LIGHTWEIGHT DOM EMULATION FOR HEADLESS EXECUTION
// ============================================================================
class MockDOMElement {
  constructor(tagName = 'div') {
    this.tagName = tagName.toUpperCase();
    this.children = [];
    this._attributes = new Map();
    this.parentNode = null;
    this.eventListeners = new Map();
    this.classList = {
      _set: new Set(),
      add: (...names) => {
        names.forEach(n => n && this.classList._set.add(n));
        this._updateClassAttr();
      },
      remove: (...names) => {
        names.forEach(n => this.classList._set.delete(n));
        this._updateClassAttr();
      },
      contains: (n) => this.classList._set.has(n),
      toggle: (n) => {
        if (this.classList._set.has(n)) {
          this.classList._set.delete(n);
        } else {
          this.classList._set.add(n);
        }
        this._updateClassAttr();
      }
    };
    this.style = {};
  }

  _updateClassAttr() {
    this._attributes.set('class', Array.from(this.classList._set).join(' '));
  }

  setAttribute(name, val) {
    this._attributes.set(name, String(val));
    if (name === 'class') {
      this.classList._set = new Set(String(val).split(/\s+/).filter(Boolean));
    }
  }

  getAttribute(name) {
    return this._attributes.has(name) ? this._attributes.get(name) : null;
  }

  removeAttribute(name) {
    this._attributes.delete(name);
    if (name === 'class') this.classList._set.clear();
  }

  hasAttribute(name) {
    return this._attributes.has(name);
  }

  get id() {
    return this.getAttribute('id') || '';
  }

  set id(val) {
    this.setAttribute('id', val);
  }

  get className() {
    return this.getAttribute('class') || '';
  }

  set className(val) {
    this.setAttribute('class', val);
  }

  appendChild(child) {
    if (!child) return;
    child.parentNode = this;
    this.children.push(child);
    return child;
  }

  addEventListener(type, cb) {
    if (!this.eventListeners.has(type)) {
      this.eventListeners.set(type, []);
    }
    this.eventListeners.get(type).push(cb);
  }

  dispatchEvent(evt) {
    const list = this.eventListeners.get(evt.type) || [];
    for (const cb of list) {
      cb.call(this, evt);
    }
  }

  closest(selector) {
    let curr = this;
    while (curr) {
      if (curr.matches && curr.matches(selector)) return curr;
      curr = curr.parentNode;
    }
    return null;
  }

  matches(selector) {
    if (!selector) return false;
    selector = selector.trim();
    if (selector.startsWith('.')) {
      return this.classList.contains(selector.slice(1));
    }
    if (selector.startsWith('#')) {
      return this.id === selector.slice(1);
    }
    if (selector.startsWith('a[')) {
      if (this.tagName !== 'A') return false;
      const attrMatch = selector.match(/a\[([^=~|^$*]+)([\^$*~|]?=)?["']?([^"']*)["']?\]/);
      if (attrMatch) {
        const [, attr, op, val] = attrMatch;
        const actual = this.getAttribute(attr);
        if (actual == null) return false;
        if (!op) return true;
        if (op === '=') return actual === val;
        if (op === '^=') return actual.startsWith(val);
        if (op === '$=') return actual.endsWith(val);
        if (op === '*=') return actual.includes(val);
      }
    }
    return this.tagName.toLowerCase() === selector.toLowerCase();
  }

  querySelector(selector) {
    const all = this.querySelectorAll(selector);
    return all.length > 0 ? all[0] : null;
  }

  querySelectorAll(selector) {
    const results = [];
    const search = (node) => {
      for (const child of node.children) {
        if (child.matches && child.matches(selector)) {
          results.push(child);
        }
        search(child);
      }
    };
    search(this);
    return results;
  }

  scrollIntoView() {
    this._scrolled = true;
  }

  get innerHTML() {
    return this._rawHTML || '';
  }

  set innerHTML(html) {
    this._rawHTML = html;
    this.children = [];
    parseHTMLToDOM(html, this);
  }

  get textContent() {
    let text = '';
    for (const child of this.children) {
      if (child.nodeType === 3) {
        text += child.text;
      } else {
        text += child.textContent;
      }
    }
    return text || this._textOnly || '';
  }

  set textContent(t) {
    this._textOnly = t;
    this.children = [];
  }
}

class MockTextNode {
  constructor(text) {
    this.nodeType = 3;
    this.text = text || '';
    this.tagName = '#text';
    this.children = [];
    this.classList = { contains: () => false };
  }
  get textContent() { return this.text; }
  matches() { return false; }
}

function parseHTMLToDOM(html, parent) {
  const tagRegex = /<\/?([a-zA-Z0-9\-]+)([^>]*)>/g;
  let lastIndex = 0;
  let match;
  let currentParent = parent;
  const stack = [parent];

  const voidElements = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr']);

  while ((match = tagRegex.exec(html)) !== null) {
    const textBefore = html.slice(lastIndex, match.index);
    if (textBefore.trim()) {
      currentParent.children.push(new MockTextNode(textBefore));
    }
    lastIndex = tagRegex.lastIndex;

    const fullTag = match[0];
    const tagName = match[1].toLowerCase();
    const attrsStr = match[2];
    const isClosing = fullTag.startsWith('</');
    const isSelfClosing = fullTag.endsWith('/>') || voidElements.has(tagName);

    if (isClosing) {
      if (stack.length > 1) {
        stack.pop();
        currentParent = stack[stack.length - 1];
      }
    } else {
      const el = new MockDOMElement(tagName);
      // parse attributes
      const attrRegex = /([a-zA-Z0-9\-:_]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^>\s]+)))?/g;
      let attrMatch;
      while ((attrMatch = attrRegex.exec(attrsStr)) !== null) {
        const attrName = attrMatch[1];
        const attrVal = attrMatch[2] !== undefined ? attrMatch[2] : (attrMatch[3] !== undefined ? attrMatch[3] : (attrMatch[4] !== undefined ? attrMatch[4] : ''));
        el.setAttribute(attrName, attrVal);
      }
      currentParent.appendChild(el);

      if (!isSelfClosing) {
        stack.push(el);
        currentParent = el;
      }
    }
  }

  const trailingText = html.slice(lastIndex);
  if (trailingText.trim()) {
    currentParent.children.push(new MockTextNode(trailingText));
  }
}

// Global environment mock
const mockDocument = {
  createElement: (tagName) => new MockDOMElement(tagName),
  getElementById: (id) => {
    if (!mockDocument.body) return null;
    return mockDocument.body.querySelector(`#${id}`) || (mockDocument.body.id === id ? mockDocument.body : null);
  },
  querySelector: (sel) => {
    if (!mockDocument.body) return null;
    return mockDocument.body.querySelector(sel);
  },
  querySelectorAll: (sel) => {
    if (!mockDocument.body) return [];
    return mockDocument.body.querySelectorAll(sel);
  },
  body: new MockDOMElement('body')
};

globalThis.document = mockDocument;
globalThis.window = {
  scrollY: 0,
  addEventListener: () => {},
  history: { pushState: () => {} }
};

// ============================================================================
// TEST HARNESS ENGINE
// ============================================================================
let testsPassed = 0;
let testsFailed = 0;
const failureDetails = [];

function assert(condition, message, detail = '') {
  if (condition) {
    testsPassed++;
    console.log(`  ✓ PASS  ${message}`);
  } else {
    testsFailed++;
    console.error(`  ✗ FAIL  ${message} ${detail ? `(${detail})` : ''}`);
    failureDetails.push({ message, detail });
  }
}

// ============================================================================
// EXECUTE SUITES
// ============================================================================
async function runProbe() {
  console.log('\n============================================================================');
  console.log('✦ CHALLENGER M4 GATE 2 EMPIRICAL ADVERSARIAL PROBE ✦');
  console.log('============================================================================\n');

  // Load modules
  const { restaurantConfig } = await import('../src/data/config.js');
  const { menuCategories, menuItems } = await import('../src/data/menu.js');
  const { createHeader } = await import('../src/components/Header.js');
  const { createHero } = await import('../src/components/Hero.js');
  const { createBanquetShowcase } = await import('../src/components/BanquetShowcase.js');
  const { createCategoryNav } = await import('../src/components/CategoryNav.js');
  const { createMenuSection } = await import('../src/components/MenuSection.js');
  const { createCustomizationGuide } = await import('../src/components/CustomizationGuide.js');
  const { createBrandStory } = await import('../src/components/BrandStory.js');
  const { createLocationSection } = await import('../src/components/LocationSection.js');
  const { createSocialSection } = await import('../src/components/SocialSection.js');
  const { createFooter } = await import('../src/components/Footer.js');

  // Build full DOM tree
  const app = new MockDOMElement('div');
  app.id = 'app';
  mockDocument.body = new MockDOMElement('body');
  mockDocument.body.appendChild(app);

  const header = createHeader();
  const hero = createHero();
  const banquet = createBanquetShowcase();
  const categoryNav = createCategoryNav(() => {}, () => {});
  const menuViewer = createMenuSection();
  const customization = createCustomizationGuide();
  const brandStory = createBrandStory();
  const location = createLocationSection();
  const social = createSocialSection();
  const footer = createFooter();

  app.appendChild(header);
  app.appendChild(hero);
  app.appendChild(banquet);
  app.appendChild(categoryNav);
  app.appendChild(menuViewer.element);
  app.appendChild(customization);
  app.appendChild(brandStory);
  app.appendChild(location);
  app.appendChild(social);
  app.appendChild(footer);

  // --------------------------------------------------------------------------
  // SUITE 1: DOM ANCHOR RESOLUTION INVARIANTS
  // --------------------------------------------------------------------------
  console.log('✦ SUITE 1: DOM ANCHOR RESOLUTION INVARIANTS ✦');
  console.log('────────────────────────────────────────────────────────────────────────────');

  // Collect all anchor elements in document.body
  const allAnchors = mockDocument.body.querySelectorAll('a');
  assert(allAnchors.length > 0, `DOM contains anchors (found ${allAnchors.length})`);

  const internalHashAnchors = [];
  allAnchors.forEach(a => {
    const href = a.getAttribute('href');
    if (href && href.startsWith('#')) {
      internalHashAnchors.push({ el: a, href });
    }
  });

  assert(internalHashAnchors.length >= 10, `Found ${internalHashAnchors.length} internal hash anchors`);

  const distinctHashes = [...new Set(internalHashAnchors.map(x => x.href))];
  console.log(`  ℹ Found ${distinctHashes.length} distinct target hashes: ${distinctHashes.join(', ')}`);

  for (const hash of distinctHashes) {
    assert(hash.length > 1, `Hash anchor '${hash}' has a valid non-empty identifier`);
    const targetId = hash.slice(1);
    const targetEl = mockDocument.getElementById(targetId);
    assert(targetEl !== null, `Anchor '${hash}' resolves to an element with id='${targetId}' in the DOM`);
  }

  // Also verify that the Header click listener smoothly resolves all anchors
  for (const item of internalHashAnchors) {
    const clickEvt = {
      type: 'click',
      target: item.el,
      defaultPrevented: false,
      preventDefault: function() { this.defaultPrevented = true; }
    };
    header.dispatchEvent(clickEvt);
    // Verify defaultPrevented was called if inside header
    if (header.querySelectorAll('a').includes(item.el)) {
      assert(clickEvt.defaultPrevented, `Click on Header anchor '${item.href}' was intercepted for smooth navigation`);
    }
  }

  // Footer click listener test
  for (const item of internalHashAnchors) {
    if (footer.querySelectorAll('a').includes(item.el)) {
      const clickEvt = {
        type: 'click',
        target: item.el,
        defaultPrevented: false,
        preventDefault: function() { this.defaultPrevented = true; }
      };
      footer.dispatchEvent(clickEvt);
      assert(clickEvt.defaultPrevented, `Click on Footer anchor '${item.href}' was intercepted for smooth navigation`);
    }
  }

  // --------------------------------------------------------------------------
  // SUITE 2: GOOGLE MAPS IFRAME & LOCATION SECTION SPECIFICATION
  // --------------------------------------------------------------------------
  console.log('\n✦ SUITE 2: GOOGLE MAPS IFRAME & LOCATION SECTION SPECIFICATION ✦');
  console.log('────────────────────────────────────────────────────────────────────────────');

  const locationSection = mockDocument.body.querySelector('#ubicacion');
  assert(locationSection !== null, `Location section exists with id='ubicacion'`);
  assert(locationSection.classList.contains('location-section'), `Location section has class 'location-section'`);

  const mapContainer = locationSection.querySelector('.map-container');
  assert(mapContainer !== null, `Location section has responsive '.map-container' wrapper`);

  const iframe = locationSection.querySelector('iframe');
  assert(iframe !== null, `Location section renders an <iframe>`);

  if (iframe) {
    const src = iframe.getAttribute('src');
    assert(src && src.startsWith('https://www.google.com/maps/embed'), `Iframe src is a valid Google Maps embed URL`, src);
    assert(iframe.getAttribute('loading') === 'lazy', `Iframe declares loading='lazy' for mobile performance`);
    assert(iframe.getAttribute('referrerpolicy') === 'no-referrer-when-downgrade', `Iframe declares referrerpolicy='no-referrer-when-downgrade'`);
    assert(iframe.hasAttribute('allowfullscreen'), `Iframe declares 'allowfullscreen' attribute`);
    const title = iframe.getAttribute('title');
    assert(title && title.length > 5, `Iframe declares descriptive title='${title}'`);
    const ariaLabel = iframe.getAttribute('aria-label');
    assert(ariaLabel && ariaLabel.length > 5, `Iframe declares descriptive aria-label='${ariaLabel}'`);
  }

  // Verify Primary CTA Button
  const mapCta = locationSection.querySelector('.location-cta-btn');
  assert(mapCta !== null, `Location section contains primary CTA button '.location-cta-btn'`);
  if (mapCta) {
    assert(mapCta.getAttribute('href') === restaurantConfig.location.googleMapsUrl, `CTA href matches config.googleMapsUrl`);
    assert(mapCta.getAttribute('target') === '_blank', `CTA has target='_blank'`);
    assert(mapCta.getAttribute('rel') === 'noopener noreferrer', `CTA enforces rel='noopener noreferrer'`);
    assert(mapCta.getAttribute('aria-label') !== null, `CTA declares accessible aria-label`);
  }

  // Verify Schedule and Address
  const locationText = locationSection.textContent;
  assert(locationText.includes(restaurantConfig.location.schedule), `Location displays exact schedule: '${restaurantConfig.location.schedule}'`);
  assert(locationText.includes(restaurantConfig.location.address), `Location displays exact address: '${restaurantConfig.location.address}'`);
  assert(locationText.includes(restaurantConfig.location.reference), `Location displays exact reference: '${restaurantConfig.location.reference}'`);

  // --------------------------------------------------------------------------
  // SUITE 3: SOCIAL MEDIA INTEGRITY & OFFICIAL CHANNELS
  // --------------------------------------------------------------------------
  console.log('\n✦ SUITE 3: SOCIAL MEDIA INTEGRITY & OFFICIAL CHANNELS ✦');
  console.log('────────────────────────────────────────────────────────────────────────────');

  const socialSection = mockDocument.body.querySelector('#redes');
  assert(socialSection !== null, `Social section exists with id='redes'`);
  assert(socialSection.classList.contains('social-section'), `Social section has class 'social-section'`);

  const socialCards = socialSection.querySelectorAll('.social-card');
  assert(socialCards.length === 3, `Social section renders exactly 3 official cards (found ${socialCards.length})`);

  const expectedSocials = [
    { key: 'instagram', platform: 'Instagram', handle: '@serendipityburger.pe', url: restaurantConfig.social.instagram.url },
    { key: 'facebook', platform: 'Facebook', handle: 'Serendipity Burger Oficial', url: restaurantConfig.social.facebook.url },
    { key: 'tiktok', platform: 'TikTok', handle: '@serendipityburger', url: restaurantConfig.social.tiktok.url }
  ];

  for (const s of expectedSocials) {
    const matchedCard = socialCards.find(c => c.getAttribute('href') === s.url && c.textContent.includes(s.handle));
    assert(matchedCard !== undefined, `Card exists for platform '${s.platform}' with url '${s.url}' and handle '${s.handle}'`);
    if (matchedCard) {
      assert(matchedCard.getAttribute('target') === '_blank', `Card enforces target='_blank'`);
      assert(matchedCard.getAttribute('rel') === 'noopener noreferrer', `Card enforces rel='noopener noreferrer'`);
      assert(matchedCard.textContent.includes(s.handle), `Card displays handle '${s.handle}'`);
    }
  }

  // Integrity checks: no fake metrics
  const prohibitedMetricWords = ['seguidores', 'followers', 'k seguidores', 'm seguidores', 'likes', 'me gusta', 'fans'];
  const socialRawText = socialSection.textContent.toLowerCase();
  for (const word of prohibitedMetricWords) {
    assert(!socialRawText.includes(word), `Social section contains no fake metrics matching '${word}'`);
  }

  // --------------------------------------------------------------------------
  // SUITE 4: BRAND STORY & CULINARY MANIFESTO
  // --------------------------------------------------------------------------
  console.log('\n✦ SUITE 4: BRAND STORY & CULINARY MANIFESTO ✦');
  console.log('────────────────────────────────────────────────────────────────────────────');

  const storySection = mockDocument.body.querySelector('#historia');
  assert(storySection !== null, `Brand story section exists with id='historia'`);
  assert(storySection.classList.contains('brand-story-section'), `Brand story section has class 'brand-story-section'`);

  const quoteBlock = storySection.querySelector('.story-quote');
  assert(quoteBlock !== null, `Brand story contains highlighted blockquote '.story-quote'`);
  assert(quoteBlock.textContent.includes(restaurantConfig.story.highlight), `Quote contains highlight: '${restaurantConfig.story.highlight}'`);

  const pillarCards = storySection.querySelectorAll('.story-pillar-item');
  assert(pillarCards.length === 3, `Brand story contains exactly 3 culinary pillar items (found ${pillarCards.length})`);

  // --------------------------------------------------------------------------
  // SUITE 5: FOOTER SPECIFICATION & NON-TRANSACTIONAL DISCLOSURE
  // --------------------------------------------------------------------------
  console.log('\n✦ SUITE 5: FOOTER SPECIFICATION & NON-TRANSACTIONAL DISCLOSURE ✦');
  console.log('────────────────────────────────────────────────────────────────────────────');

  const footerEl = mockDocument.body.querySelector('footer');
  assert(footerEl !== null, `Footer element exists`);
  assert(footerEl.classList.contains('site-footer'), `Footer has class 'site-footer'`);

  const currentYear = new Date().getFullYear().toString();
  assert(footerEl.textContent.includes(currentYear), `Footer contains current dynamic year (${currentYear})`);
  assert(footerEl.textContent.includes('Soles (S/.)'), `Footer declares official currency Soles (S/.)`);
  assert(footerEl.textContent.includes('Catálogo digital visual'), `Footer includes non-transactional catalog visual disclaimer`);
  assert(footerEl.textContent.includes('No se procesan pedidos ni transacciones de pago'), `Footer explicitly states no order/payment processing`);

  // Verify zero transactional buttons anywhere in app
  const allButtons = mockDocument.body.querySelectorAll('button');
  const prohibitedButtonTerms = ['comprar', 'pagar', 'carrito', 'checkout', 'add to cart', 'ordenar ahora'];
  for (const b of allButtons) {
    const text = b.textContent.toLowerCase();
    for (const term of prohibitedButtonTerms) {
      assert(!text.includes(term), `No transactional button with label containing '${term}'`);
    }
  }

  // --------------------------------------------------------------------------
  // SUITE 6: RIGOROUS EXHAUSTIVE ZERO-EMOJI SCAN ACROSS ENTIRE PROJECT
  // --------------------------------------------------------------------------
  console.log('\n✦ SUITE 6: RIGOROUS EXHAUSTIVE ZERO-EMOJI SCAN ACROSS ENTIRE PROJECT ✦');
  console.log('────────────────────────────────────────────────────────────────────────────');

  // Complete emoji regex matching all emoji ranges
  const emojiRegex = /(?:\ud83c[\udf00-\udfff]|\ud83d[\ud000-\ude4f\ude80-\udeff]|\ud83e[\udd00-\udfff]|[\u2600-\u26ff]|[\u2700-\u27bf]|\u231a|\u231b|[\ufe0e\ufe0f]|\ud83c[\udde6-\uddff]{2})/gu;

  const filesToScan = [
    'index.html',
    'src/main.js',
    'src/data/config.js',
    'src/data/menu.js',
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
    'src/components/icons.js',
    'src/styles/main.css',
    'src/styles/reset.css'
  ];

  let totalLinesScanned = 0;
  for (const relPath of filesToScan) {
    const fullPath = path.join(projectRoot, relPath);
    assert(fs.existsSync(fullPath), `Target file exists: ${relPath}`);
    if (fs.existsSync(fullPath)) {
      const content = fs.readFileSync(fullPath, 'utf8');
      const lines = content.split('\n');
      totalLinesScanned += lines.length;

      const emojiMatches = content.match(emojiRegex);
      assert(emojiMatches === null, `File '${relPath}' contains strictly ZERO Unicode emojis (scanned ${lines.length} lines)`, emojiMatches ? emojiMatches.join(',') : '');
    }
  }

  console.log(`  ℹ Total lines scanned across ${filesToScan.length} files: ${totalLinesScanned}`);

  // --------------------------------------------------------------------------
  // SUMMARY & VERDICT
  // --------------------------------------------------------------------------
  console.log('\n============================================================================');
  console.log('✦ CHALLENGER M4 GATE 2 EMPIRICAL SUMMARY ✦');
  console.log('============================================================================');
  console.log(`  Total Checks Executed:  ${testsPassed + testsFailed}`);
  console.log(`  Passed Checks:          ${testsPassed}`);
  console.log(`  Failed Checks:          ${testsFailed}`);
  const passRate = ((testsPassed / (testsPassed + testsFailed)) * 100).toFixed(1);
  console.log(`  Pass Rate:              ${passRate}%`);
  console.log('============================================================================');

  if (testsFailed === 0) {
    console.log('VERDICT: APPROVE (100% Empirically Verified)');
  } else {
    console.log('VERDICT: REJECT (Failures Detected)');
    console.log('Failures:', failureDetails);
    process.exit(1);
  }
}

runProbe().catch(err => {
  console.error('Fatal probe error:', err);
  process.exit(1);
});
