/**
 * <scroll-progress target="<selector>">
 *
 * Scrollbar-style indicator for a horizontal scroller in the same section (rendered by
 * snippets/scroll-progress.liquid). It only reads the scroller's position, so native
 * snapping, touch, arrows and keyboard scrolling are not affected.
 *
 * Writes two custom properties on itself:
 * --scroll-progress-size   visible width / total width (thumb width, 0–1)
 * --scroll-progress-offset how far the scroller has moved (0 at the start, 1 at the end)
 *
 * RTL: browsers report scrollLeft as 0 → negative in RTL, so the absolute value is used
 * (same approach as ScrollHint in scrolling.js). The thumb is placed with logical
 * properties in CSS, so it starts on the inline-start side in both directions.
 */
class ScrollProgress extends HTMLElement {
  /** @type {HTMLElement | null} */
  #scroller = null;

  /** @type {number | null} */
  #rafId = null;

  #resizeObserver = new ResizeObserver(() => this.#schedule());

  connectedCallback() {
    this.#bind();
  }

  disconnectedCallback() {
    this.#unbind();
    if (this.#rafId !== null) {
      cancelAnimationFrame(this.#rafId);
      this.#rafId = null;
    }
  }

  #bind() {
    const selector = this.getAttribute('target');
    const root = this.closest('.shopify-section') ?? this.parentElement;
    const scroller = selector && root ? root.querySelector(selector) : null;

    if (!(scroller instanceof HTMLElement)) {
      this.dataset.state = 'inactive';
      return;
    }

    this.#scroller = scroller;
    scroller.addEventListener('scroll', this.#schedule, { passive: true });
    this.#resizeObserver.observe(scroller);
    for (const slide of scroller.children) this.#resizeObserver.observe(slide);
    this.#schedule();
  }

  #unbind() {
    this.#scroller?.removeEventListener('scroll', this.#schedule);
    this.#resizeObserver.disconnect();
    this.#scroller = null;
  }

  #schedule = () => {
    if (this.#rafId !== null) return;

    this.#rafId = requestAnimationFrame(() => {
      this.#rafId = null;
      this.#update();
    });
  };

  #update() {
    const scroller = this.#scroller;
    if (!scroller) return;

    const { scrollWidth, clientWidth, scrollLeft } = scroller;
    const overflow = scrollWidth - clientWidth;

    // Hidden scroller (e.g. the mobile carousel on desktop) or nothing to scroll.
    if (clientWidth === 0 || overflow <= 1) {
      this.dataset.state = 'inactive';
      return;
    }

    const size = clientWidth / scrollWidth;
    const offset = Math.min(1, Math.max(0, Math.abs(scrollLeft) / overflow));

    this.style.setProperty('--scroll-progress-size', size.toFixed(4));
    this.style.setProperty('--scroll-progress-offset', offset.toFixed(4));
    this.dataset.state = 'active';
  }
}

if (!customElements.get('scroll-progress')) {
  customElements.define('scroll-progress', ScrollProgress);
}
