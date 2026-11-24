/*
 * Snosha (Dev1, P03) — Judge.me "Cards Carousel" controls for sections with the class `sn-product-reviews`.
 * Loaded only by blocks/sn-reviews-carousel.liquid (opt-in block; delete the block to return to Judge.me's own slider).
 *
 * Judge.me's cards slider has no touch support and moves the row with translateX(-offsetLeft), which goes the wrong
 * way in RTL. dev1.css turns its row into a native scroll-snap scroller (swipe works everywhere); this file:
 *   - makes the widget's own arrow buttons scroll that row by one card (RTL aware), disabling them at the ends;
 *   - writes --sn-rv-progress (visible share → 1) for the Figma progress bar.
 * It reads only the DOM Judge.me already rendered (no API calls, no review data).
 */
const SELECTOR = '.sn-product-reviews .jdgm-cards-carousel';

/** @param {HTMLElement} carousel */
function setup(carousel) {
  if (carousel.dataset.snRvReady) return;
  const wrapper = carousel.querySelector('.jdgm-cards-wrapper');
  const row = wrapper?.querySelector('.jdgm-videos-container');
  if (!wrapper || !row) return;
  carousel.dataset.snRvReady = 'true';

  const arrows = () => carousel.querySelectorAll('.jdgm-content > .jdgm-arrow');
  const isRtl = () => getComputedStyle(wrapper).direction === 'rtl';

  // Snosha perf: measure once per frame. Called straight from the MutationObserver while Judge.me was still
  // inserting cards, this forced a synchronous layout per mutation (Lighthouse forced reflow ≈ 140 ms).
  let frame = 0;
  const update = () => {
    if (frame) return;
    frame = requestAnimationFrame(() => {
      frame = 0;
      measure();
    });
  };

  const measure = () => {
    const max = wrapper.scrollWidth - wrapper.clientWidth;
    const position = Math.abs(wrapper.scrollLeft);
    const scrollable = max > 1;
    const share = scrollable ? wrapper.clientWidth / wrapper.scrollWidth : 1;
    const progress = scrollable ? share + (1 - share) * Math.min(1, position / max) : 1;

    carousel.style.setProperty('--sn-rv-progress', progress.toFixed(4));
    carousel.toggleAttribute('data-sn-rv-scrollable', scrollable);

    const buttons = arrows();
    if (buttons.length === 2) {
      buttons[0].disabled = !scrollable || position <= 1; // "Previous slide"
      buttons[1].disabled = !scrollable || position >= max - 1; // "Next slide"
    }
  };

  // Capture phase on the carousel: runs before (and stops) the widget's inline onclick on the arrow.
  carousel.addEventListener(
    'click',
    (event) => {
      const arrow = event.target instanceof Element ? event.target.closest('.jdgm-arrow') : null;
      if (!arrow || !carousel.contains(arrow)) return;
      event.preventDefault();
      event.stopPropagation();

      const buttons = Array.from(arrows());
      const forward = buttons.indexOf(/** @type {HTMLElement} */ (arrow)) === buttons.length - 1;
      const card = row.querySelector('.jdgm-media-card:not([class*="jdgm-clone"], [data-clone-type])');
      const gap = parseFloat(getComputedStyle(row).columnGap) || 0;
      const step = card ? card.getBoundingClientRect().width + gap : wrapper.clientWidth;
      const sign = (forward ? 1 : -1) * (isRtl() ? -1 : 1);

      wrapper.scrollBy({ left: sign * step, behavior: 'smooth' });
    },
    true
  );

  // Judge.me's own swipe handler (video_carousel.js, on .jdgm-content) calls preventDefault() on horizontal
  // touchmove, which cancels native scrolling, and its focusin handler resets the row to scrollLeft = 0.
  // Stop those events in the capture phase at the carousel so they never reach its handlers; no preventDefault
  // here, so the browser still scrolls / focuses normally.
  const content = carousel.querySelector('.jdgm-content');
  const shield = (/** @type {Event} */ event) => {
    if (content && event.target instanceof Node && content.contains(event.target)) event.stopPropagation();
  };
  for (const type of ['touchstart', 'touchmove', 'touchend', 'touchcancel', 'focusin', 'focusout']) {
    carousel.addEventListener(type, shield, { capture: true, passive: true });
  }

  wrapper.addEventListener('scroll', update, { passive: true });
  new ResizeObserver(update).observe(wrapper);
  // Judge.me builds the cards after its reviews request finishes.
  new MutationObserver(update).observe(row, { childList: true });
  update();
}

function init() {
  document.querySelectorAll(SELECTOR).forEach((carousel) => setup(/** @type {HTMLElement} */ (carousel)));
}

init();
document.addEventListener('shopify:section:load', init);
// The carousel markup can arrive after this module runs (theme editor re-renders, app script timing).
let queued = false;
new MutationObserver(() => {
  if (queued) return;
  queued = true;
  requestAnimationFrame(() => {
    queued = false;
    init();
  });
}).observe(document.body, { childList: true, subtree: true });
