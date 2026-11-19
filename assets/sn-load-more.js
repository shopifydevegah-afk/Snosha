/**
 * Snosha (opt-in, main-collection "Load more button").
 *
 * Horizon's paginated-list loads the next page when its `viewMoreNext` sentinel scrolls into view.
 * In load-more mode the section has the class `sn-load-more-mode`, which hides that sentinel
 * (CSS below), so nothing loads while scrolling. A click shows the sentinel for one load
 * (`sn-load-more-armed`); as soon as new cards arrive it is hidden again. No page fetching here:
 * Horizon still fetches, renders, caches and updates the URL.
 *
 * The counter shows "[shown] / [total]" (cards in the grid / collection.products_count, which
 * already follows the active filters). The button hides when everything is shown.
 */
class SnLoadMore extends HTMLElement {
  /** @type {MutationObserver | undefined} */
  #observer;

  /** @type {number | undefined} */
  #timeout;

  connectedCallback() {
    this.section = this.closest('.sn-load-more-mode');
    this.button = this.querySelector('.sn-load-more__button');
    this.counter = this.querySelector('.sn-load-more__count');
    this.total = Number(this.dataset.total) || 0;
    if (!this.section || !this.button) return;

    this.button.addEventListener('click', this.#load);

    const grid = this.section.querySelector('[ref="grid"]');
    if (grid) {
      this.#observer = new MutationObserver(this.#update);
      this.#observer.observe(grid, { childList: true });
    }
    this.#update();
  }

  disconnectedCallback() {
    this.button?.removeEventListener('click', this.#load);
    this.#observer?.disconnect();
    window.clearTimeout(this.#timeout);
    this.section?.classList.remove('sn-load-more-armed');
  }

  #shown() {
    return this.section?.querySelectorAll('[ref="grid"] > .product-grid__item').length ?? 0;
  }

  #load = () => {
    if (!this.section || !this.button) return;
    this.button.setAttribute('aria-busy', 'true');
    this.button.disabled = true;
    this.section.classList.add('sn-load-more-armed');
    // Safety net: if nothing arrives (last page, network error), re-enable the button.
    window.clearTimeout(this.#timeout);
    this.#timeout = window.setTimeout(this.#settle, 8000);
  };

  #settle = () => {
    window.clearTimeout(this.#timeout);
    this.section?.classList.remove('sn-load-more-armed');
    if (this.button) {
      this.button.disabled = false;
      this.button.removeAttribute('aria-busy');
    }
    this.#render();
  };

  #update = () => {
    if (this.section?.classList.contains('sn-load-more-armed')) {
      this.#settle();
    } else {
      this.#render();
    }
  };

  #render() {
    const shown = this.#shown();
    const text = this.dataset.countText || '';
    if (this.counter) {
      this.counter.textContent = text
        ? text.replace('[shown]', String(Math.min(shown, this.total || shown))).replace('[total]', String(this.total))
        : '';
      this.counter.hidden = !text;
    }
    if (this.button && this.total && shown >= this.total) this.button.hidden = true;
  }
}

if (!customElements.get('sn-load-more')) customElements.define('sn-load-more', SnLoadMore);
