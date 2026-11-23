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
    if (!this.section || !this.button) return;

    this.button.addEventListener('click', this.#load);

    // The total changes in place when filters are applied, so it is watched too
    this.#observer = new MutationObserver(this.#update);
    this.#observer.observe(this, { attributes: true, attributeFilter: ['data-total'] });
    const grid = this.section.querySelector('[ref="grid"]');
    if (grid) this.#observer.observe(grid, { childList: true });
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
    const total = Number(this.dataset.total) || 0;
    const text = this.dataset.countText || '';
    // Everything visible: no counter and no button. Both return if a filter change leaves more to load.
    const allShown = total > 0 && shown >= total;
    if (this.counter) {
      this.counter.textContent = text
        ? text.replace('[shown]', String(Math.min(shown, total || shown))).replace('[total]', String(total))
        : '';
      this.counter.hidden = !text || allShown;
    }
    if (this.button) this.button.hidden = allShown;
  }
}

if (!customElements.get('sn-load-more')) customElements.define('sn-load-more', SnLoadMore);
