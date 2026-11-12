/**
 * Snosha S12 — progress bar for a native Horizon carousel (opt-in, rendered by featured-blog-posts when the
 * section has a custom class and "Show progress bar" is on).
 *
 * It only reads the real scroller (the first *displayed* element matching the `scroller` attribute inside the
 * same section) and writes two values, like a scrollbar thumb:
 *   --carousel-thumb-size  visible share of the track (clientWidth / scrollWidth)
 *   --carousel-progress    scroll position, 0 at the start, 1 at the end (|scrollLeft|, so RTL works whatever
 *                          sign the browser uses)
 * The bar is hidden while nothing scrolls (e.g. desktop grid, a single article). It never scrolls the carousel.
 */
class CarouselProgress extends HTMLElement {
  /** @type {HTMLElement | null} */
  #scroller = null;

  /** @type {AbortController | null} */
  #abort = null;

  /** @type {ResizeObserver | null} */
  #resizeObserver = null;

  #frame = 0;

  connectedCallback() {
    this.#abort = new AbortController();
    this.#resizeObserver = new ResizeObserver(this.#schedule);
    this.#resizeObserver.observe(this.parentElement || this);
    this.#bind();
    this.#schedule();
  }

  disconnectedCallback() {
    this.#abort?.abort();
    this.#resizeObserver?.disconnect();
    if (this.#frame) cancelAnimationFrame(this.#frame);
    this.#abort = null;
    this.#resizeObserver = null;
    this.#scroller = null;
    this.#frame = 0;
  }

  /** Attaches to the scroller that is currently displayed (desktop and mobile lists can differ). */
  #bind() {
    const root = this.closest('.section') || this.parentElement;
    const selector = this.getAttribute('scroller') || 'slideshow-slides';
    const candidates = root ? Array.from(root.querySelectorAll(selector)) : [];
    const visible = candidates.find((el) => el instanceof HTMLElement && el.getClientRects().length > 0) || null;
    if (visible === this.#scroller) return;

    this.#scroller = /** @type {HTMLElement | null} */ (visible);
    if (this.#scroller && this.#abort) {
      this.#scroller.addEventListener('scroll', this.#schedule, { passive: true, signal: this.#abort.signal });
      this.#resizeObserver?.observe(this.#scroller);
    }
  }

  #schedule = () => {
    if (this.#frame) return;
    this.#frame = requestAnimationFrame(() => {
      this.#frame = 0;
      this.#bind();
      this.#update();
    });
  };

  #update() {
    const scroller = this.#scroller;
    const max = scroller ? scroller.scrollWidth - scroller.clientWidth : 0;

    if (!scroller || max <= 1) {
      this.hidden = true;
      return;
    }

    this.hidden = false;
    const thumb = Math.min(1, scroller.clientWidth / scroller.scrollWidth);
    const progress = Math.min(1, Math.max(0, Math.abs(scroller.scrollLeft) / max));
    this.style.setProperty('--carousel-thumb-size', thumb.toFixed(4));
    this.style.setProperty('--carousel-progress', progress.toFixed(4));
  }
}

if (!customElements.get('carousel-progress')) {
  customElements.define('carousel-progress', CarouselProgress);
}
