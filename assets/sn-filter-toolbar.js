/**
 * Snosha (opt-in, filters block "Toolbar layout"): show / hide the filter pills.
 * The state lives on <html data-sn-filters-open>, because Horizon morphs the filter markup after
 * every filter or sort change. It is remembered for the session, and the pills open by themselves
 * when the page loads with active filters.
 */
const STORAGE_KEY = 'sn-collection-filters-open';
const root = document.documentElement;

function readStored() {
  try {
    return sessionStorage.getItem(STORAGE_KEY) === 'true';
  } catch {
    return false;
  }
}

function store(open) {
  try {
    sessionStorage.setItem(STORAGE_KEY, String(open));
  } catch {
    /* storage unavailable: the state still works for this page */
  }
}

class SnFilterToggle extends HTMLElement {
  connectedCallback() {
    this.button = this.querySelector('button');
    if (!this.button) return;

    this.button.addEventListener('click', this.#toggle);
    this.#apply(readStored() || Number(this.dataset.active) > 0);

    // The list view has no control in this toolbar's old state: leave Horizon's dense view if it was stored.
    const grid = this.closest('results-list')?.querySelector('[ref="grid"]');
    if (grid?.getAttribute('product-grid-view') === 'zoom-out') grid.setAttribute('product-grid-view', 'default');
  }

  disconnectedCallback() {
    this.button?.removeEventListener('click', this.#toggle);
  }

  #toggle = () => {
    const open = !root.hasAttribute('data-sn-filters-open');
    this.#apply(open);
    store(open);
  };

  #apply(open) {
    root.toggleAttribute('data-sn-filters-open', open);
    this.button?.setAttribute('aria-expanded', String(open));
  }
}

if (!customElements.get('sn-filter-toggle')) customElements.define('sn-filter-toggle', SnFilterToggle);
