/**
 * Snosha S10 (Choose Your Care) — active card for the native `carousel` section.
 *
 * Rendered only when the section's "Highlight centred card" setting is on (sections/carousel.liquid).
 * It does not scroll or replace the native slideshow; it only:
 *   1. measures which card is closest to the horizontal centre of the real scroller
 *      (`slideshow-slides`) and marks it `is-active-card` (exactly one card at a time);
 *   2. writes the scroller's progress (0–1) to `--carousel-progress` on the section;
 *   3. on load, centres the card marked "Featured card" (`.sn-card-featured`) once;
 *   4. handles mouse drag for this carousel only (the native drag release is start-aligned, see
 *      #handleMouseDown); touch, trackpad and wheel stay native scrolling + CSS centre snap.
 * Everything is geometry-based (getBoundingClientRect + scrollBy with a physical delta), so it behaves
 * the same in LTR and RTL whatever sign the browser uses for scrollLeft.
 */
class CarouselActiveCard extends HTMLElement {
  /** @type {HTMLElement | null} */
  #section = null;

  /** @type {HTMLElement | null} */
  #scroller = null;

  /** @type {AbortController | null} */
  #abort = null;

  /** @type {ResizeObserver | null} */
  #resizeObserver = null;

  /** @type {MutationObserver | null} */
  #mutationObserver = null;

  #frame = 0;

  connectedCallback() {
    this.#section = this.closest('.section') || this.parentElement;
    this.#scroller = this.#section?.querySelector('.carousel-content slideshow-slides') || null;
    if (!this.#section || !this.#scroller) return;

    this.#abort = new AbortController();
    const { signal } = this.#abort;

    this.#scroller.addEventListener('scroll', this.#schedule, { passive: true, signal });
    document.addEventListener('shopify:block:select', this.#handleBlockSelect, { signal });

    // Mouse drag: captured on the scroller's parent so it runs before the native slideshow's own
    // mousedown handler (see #handleMouseDown). Touch swiping is native scrolling and is untouched.
    this.#scroller.parentElement?.addEventListener('mousedown', this.#handleMouseDown, { capture: true, signal });
    this.#scroller.addEventListener('dragstart', this.#preventWhileScrollable, { signal });

    this.#resizeObserver = new ResizeObserver(this.#schedule);
    this.#resizeObserver.observe(this.#scroller);

    // Cards added, removed or reordered without a full section re-render
    this.#mutationObserver = new MutationObserver(this.#schedule);
    this.#mutationObserver.observe(this.#scroller, { childList: true });

    // Wait for layout (two frames: after the native slideshow's own first-frame setup)
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        if (!this.isConnected) return;
        this.#centerFeatured();
        this.#update();
      })
    );
  }

  disconnectedCallback() {
    this.#abort?.abort();
    this.#resizeObserver?.disconnect();
    this.#mutationObserver?.disconnect();
    if (this.#frame) cancelAnimationFrame(this.#frame);
    this.#abort = null;
    this.#resizeObserver = null;
    this.#mutationObserver = null;
    this.#frame = 0;
  }

  /** Displayed cards in DOM order (cards hidden with display: none are skipped). */
  get #cards() {
    if (!this.#scroller) return [];
    return /** @type {HTMLElement[]} */ (
      Array.from(this.#scroller.children).filter(
        (el) => el instanceof HTMLElement && el.classList.contains('card') && el.getClientRects().length > 0
      )
    );
  }

  get #isScrollable() {
    const scroller = this.#scroller;
    return Boolean(scroller && scroller.scrollWidth - scroller.clientWidth > 1);
  }

  #schedule = () => {
    if (this.#frame) return;
    this.#frame = requestAnimationFrame(() => {
      this.#frame = 0;
      this.#update();
    });
  };

  /** The single source of truth: active card + progress, both from the scroller's current geometry. */
  #update() {
    const scroller = this.#scroller;
    const section = this.#section;
    if (!scroller || !section) return;

    const cards = this.#cards;
    const scrollable = this.#isScrollable;
    let active = null;

    if (!scrollable) {
      // Everything fits (desktop): the "Featured card" keeps the emphasis; otherwise the most central card
      active = cards.find((card) => card.classList.contains('sn-card-featured')) || null;
    }

    if (!active && cards.length) {
      const box = scroller.getBoundingClientRect();
      const middle = box.left + box.width / 2;
      let best = Infinity;
      for (const card of cards) {
        const rect = card.getBoundingClientRect();
        const distance = Math.abs(rect.left + rect.width / 2 - middle);
        if (distance < best) {
          best = distance;
          active = card;
        }
      }
    }

    for (const card of Array.from(scroller.children)) {
      if (card instanceof HTMLElement && card.classList.contains('card')) {
        card.classList.toggle('is-active-card', card === active);
      }
    }

    const max = scroller.scrollWidth - scroller.clientWidth;
    const progress = max > 1 ? Math.min(1, Math.max(0, Math.abs(scroller.scrollLeft) / max)) : 1;
    section.style.setProperty('--carousel-progress', progress.toFixed(4));
    section.classList.toggle('carousel--scrollable', scrollable);
  }

  /** Centres the "Featured card" once on load (instant; scroll snapping then keeps it there). */
  #centerFeatured() {
    const featured = this.#cards.find((card) => card.classList.contains('sn-card-featured'));
    if (featured) this.#scrollToCard(featured, 'instant');
  }

  /**
   * @param {HTMLElement} card
   * @param {ScrollBehavior} behavior
   */
  #scrollToCard(card, behavior) {
    const scroller = this.#scroller;
    if (!scroller || !this.#isScrollable) return;

    const box = scroller.getBoundingClientRect();
    const rect = card.getBoundingClientRect();
    const delta = rect.left + rect.width / 2 - (box.left + box.width / 2);
    if (Math.abs(delta) < 1) return;

    // A positive physical delta always moves the view to the right, in LTR and RTL alike
    scroller.scrollBy({ left: delta, behavior });
  }

  /** Brings the card nearest the centre exactly to the centre. */
  #settle() {
    const scroller = this.#scroller;
    if (!scroller) return;

    const box = scroller.getBoundingClientRect();
    const middle = box.left + box.width / 2;
    let nearest = null;
    let best = Infinity;
    for (const card of this.#cards) {
      const rect = card.getBoundingClientRect();
      const distance = Math.abs(rect.left + rect.width / 2 - middle);
      if (distance < best) {
        best = distance;
        nearest = card;
      }
    }

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (nearest) this.#scrollToCard(nearest, reduce ? 'instant' : 'smooth');
  }

  /** @param {Event} event */
  #preventWhileScrollable = (event) => {
    if (this.#isScrollable) event.preventDefault();
  };

  /**
   * Mouse drag for this centred carousel. The native slideshow's drag release picks the visible slide
   * closest to the scroller's START edge and aligns it to the start, which in a centred layout lands one
   * card short and can never reach the last card. Here the drag just moves the scroller (snap paused), and
   * on release the card nearest the centre is centred. The event is stopped so the native handler
   * doesn't run for this carousel only.
   * @param {MouseEvent} event
   */
  #handleMouseDown = (event) => {
    const scroller = this.#scroller;
    if (!scroller || event.button !== 0 || !this.#isScrollable) return;
    if (!(event.target instanceof Node) || !scroller.contains(event.target)) return;

    event.stopPropagation();

    const startX = event.clientX;
    let lastX = startX;
    let moved = false;
    const drag = new AbortController();

    const onMove = (/** @type {MouseEvent} */ move) => {
      if (!moved) {
        if (Math.abs(move.clientX - startX) < 5) return;
        moved = true;
        scroller.style.scrollSnapType = 'none';
        scroller.style.scrollBehavior = 'auto';
        scroller.style.cursor = 'grabbing';
        scroller.style.userSelect = 'none';
      }
      const delta = move.clientX - lastX;
      lastX = move.clientX;
      scroller.scrollBy({ left: -delta, behavior: 'instant' });
    };

    const onUp = () => {
      drag.abort();
      if (!moved) return;

      scroller.style.removeProperty('scroll-snap-type');
      scroller.style.removeProperty('scroll-behavior');
      scroller.style.removeProperty('cursor');
      scroller.style.removeProperty('user-select');

      // The click that ends a drag must not open the product
      const swallow = (/** @type {Event} */ click) => {
        click.preventDefault();
        click.stopPropagation();
      };
      scroller.addEventListener('click', swallow, { capture: true, once: true });
      setTimeout(() => scroller.removeEventListener('click', swallow, { capture: true }), 0);

      this.#settle();
    };

    document.addEventListener('mousemove', onMove, { signal: drag.signal });
    document.addEventListener('mouseup', onUp, { signal: drag.signal });
    this.#abort?.signal.addEventListener('abort', () => drag.abort(), { once: true });
  };

  /** Theme Editor: selecting a block inside a card brings that card to the centre. */
  #handleBlockSelect = (/** @type {Event} */ event) => {
    const target = event.target;
    if (!(target instanceof Element) || !this.#scroller?.contains(target)) return;

    const card = target.closest('.card');
    if (!(card instanceof HTMLElement)) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.#scrollToCard(card, reduce ? 'instant' : 'smooth');
  };
}

if (!customElements.get('carousel-active-card')) {
  customElements.define('carousel-active-card', CarouselActiveCard);
}
