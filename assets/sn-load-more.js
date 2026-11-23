/**
 * Snosha (opt-in, main-collection "Load more button").
 *
 * The control is a real link to Shopify's next paginated page, so it works without JavaScript and
 * can be crawled. With JavaScript, a normal click stays on the page: Horizon's paginated-list loads
 * the next page when its `viewMoreNext` sentinel scrolls into view. In load-more mode the section
 * has the class `sn-load-more-mode`, which hides that sentinel, so nothing loads while scrolling.
 * A click shows the sentinel for one load (`sn-load-more-armed`); as soon as new cards arrive it is
 * hidden again. No page fetching here: Horizon still fetches, renders, caches and updates the URL.
 *
 * The counter shows "[shown] / [total]" (cards in the grid / collection.products_count, which
 * already follows the active filters). The link hides when there is no next page.
 */
class SnLoadMore extends HTMLElement {
  /** @type {MutationObserver | undefined} */
  #observer;

  /** @type {number | undefined} */
  #timeout;

  get button() {
    return this.querySelector('.sn-load-more__button');
  }

  connectedCallback() {
    this.section = this.closest('.sn-load-more-mode');
    this.counter = this.querySelector('.sn-load-more__count');
    if (!this.section) return;

    this.addEventListener('click', this.#onClick);

    // The total changes in place when filters are applied, so it is watched too
    this.#observer = new MutationObserver(this.#update);
    this.#observer.observe(this, { attributes: true, attributeFilter: ['data-total'] });
    const grid = this.#grid();
    if (grid) this.#observer.observe(grid, { childList: true });
    this.#update();
  }

  disconnectedCallback() {
    this.removeEventListener('click', this.#onClick);
    this.#observer?.disconnect();
    window.clearTimeout(this.#timeout);
    this.section?.classList.remove('sn-load-more-armed');
  }

  #grid() {
    return this.section?.querySelector('[ref="grid"]') ?? null;
  }

  #cards() {
    return this.section?.querySelectorAll('[ref="grid"] > .product-grid__item') ?? [];
  }

  #shown() {
    return this.#cards().length;
  }

  /** The next page after the last loaded card, keeping the link's filters, sorting and locale path. */
  #nextHref() {
    const button = this.button;
    const cards = this.#cards();
    const nextPage = Number(cards[cards.length - 1]?.dataset.page) + 1;
    const lastPage = Number(this.#grid()?.dataset.lastPage);
    if (!button || !Number.isInteger(nextPage) || !lastPage || nextPage > lastPage) return null;

    const current = button.getAttribute('href');
    const url = new URL(current || window.location.href, window.location.href);
    if (current && url.searchParams.get('page') === String(nextPage)) return current;
    url.searchParams.set('page', String(nextPage));
    url.hash = '';
    return url.pathname + url.search;
  }

  /** @param {MouseEvent} event */
  #onClick = (event) => {
    const target = event.target;
    const button = target instanceof Element ? target.closest('.sn-load-more__button') : null;
    if (!button || event.defaultPrevented) return;
    // Open in a new tab or window: keep the browser's normal link behavior
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

    event.preventDefault();
    if (button.getAttribute('aria-busy') !== 'true') this.#load(button);
  };

  /** @param {Element} button */
  #load(button) {
    if (!this.section) return;
    button.setAttribute('aria-busy', 'true');
    button.setAttribute('aria-disabled', 'true');
    this.section.classList.add('sn-load-more-armed');
    // Safety net: if nothing arrives (last page, network error), re-enable the link.
    window.clearTimeout(this.#timeout);
    this.#timeout = window.setTimeout(this.#settle, 8000);
  }

  #settle = () => {
    window.clearTimeout(this.#timeout);
    this.section?.classList.remove('sn-load-more-armed');
    const button = this.button;
    if (button) {
      button.removeAttribute('aria-disabled');
      button.removeAttribute('aria-busy');
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
    // Everything visible: no counter and no link. Both return if a filter change leaves more to load.
    const allShown = total > 0 && shown >= total;
    if (this.counter) {
      this.counter.textContent = text
        ? text.replace('[shown]', String(Math.min(shown, total || shown))).replace('[total]', String(total))
        : '';
      this.counter.hidden = !text || allShown;
    }
    const button = this.button;
    if (button) {
      const href = this.#nextHref();
      if (href) button.setAttribute('href', href);
      else button.removeAttribute('href');
      button.hidden = allShown || !href;
    }
  }
}

if (!customElements.get('sn-load-more')) customElements.define('sn-load-more', SnLoadMore);
