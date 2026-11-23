import { formatMoney } from '@theme/money-formatting';

/**
 * Snosha (opt-in, filters block "Toolbar layout"): two-handle price slider.
 * It only drives Horizon's own price inputs (minInput / maxInput), which stay in the form, so
 * filtering, URL, status and clearing remain native. The sliders have no `name`, so they are not
 * submitted. Values are in minor units (cents), as in `filter.range_max`.
 */

// Horizon's declarative `on:change` listens on document in the capture phase, so the slider's own
// change event has to be caught earlier (window) or it would refilter with the old input values.
window.addEventListener(
  'change',
  (event) => {
    const target = event.target;
    if (!(target instanceof HTMLInputElement) || target.type !== 'range') return;
    const slider = target.closest('sn-price-range');
    if (!(slider instanceof SnPriceRange)) return;
    event.stopImmediatePropagation();
    slider.commit();
  },
  true
);

class SnPriceRange extends HTMLElement {
  static observedAttributes = ['data-low', 'data-high', 'data-max'];

  connectedCallback() {
    this.lowInput = this.querySelector('[data-range="low"]');
    this.highInput = this.querySelector('[data-range="high"]');
    this.lowLabel = this.querySelector('[data-label="low"]');
    this.highLabel = this.querySelector('[data-label="high"]');
    this.facet = this.closest('price-facet-component');
    if (!this.lowInput || !this.highInput) return;

    this.addEventListener('input', this.#onInput);
    this.facet?.addEventListener('click', this.#onFacetClick);
    this.#sync();
  }

  disconnectedCallback() {
    this.removeEventListener('input', this.#onInput);
    this.facet?.removeEventListener('click', this.#onFacetClick);
  }

  attributeChangedCallback() {
    if (this.lowInput) this.#sync();
  }

  get #top() {
    return Number(this.highInput?.max) || 0;
  }

  /** Reads the server state (active filter values) into the sliders. */
  #sync() {
    const top = this.#top;
    const low = Number(this.dataset.low) || 0;
    const high = this.dataset.high === '' || this.dataset.high === undefined ? top : Number(this.dataset.high);
    this.lowInput.value = String(low);
    this.highInput.value = String(high);
    this.#render();
  }

  #onInput = (event) => {
    const low = Number(this.lowInput.value);
    const high = Number(this.highInput.value);
    if (low > high) {
      if (event.target === this.lowInput) this.lowInput.value = String(high);
      else this.highInput.value = String(low);
    }
    this.#render();
  };

  // Native "clear" empties every input in the facet, sliders included
  #onFacetClick = (event) => {
    if (event.target instanceof Element && event.target.closest('facet-clear-component')) {
      this.dataset.low = '';
      this.dataset.high = '';
      window.setTimeout(() => this.#sync());
    }
  };

  #money(value) {
    return formatMoney(value, this.dataset.moneyFormat || '{{amount}}', this.dataset.currency || 'EGP');
  }

  #render() {
    const top = this.#top || 1;
    const low = Number(this.lowInput.value);
    const high = Number(this.highInput.value);
    this.style.setProperty('--sn-range-low', String((low / top) * 100));
    this.style.setProperty('--sn-range-high', String((high / top) * 100));
    if (this.lowLabel) this.lowLabel.textContent = this.#money(low);
    if (this.highLabel) this.highLabel.textContent = this.#money(high >= top ? Number(this.dataset.max) || top : high);
  }

  /** Writes the values into Horizon's inputs; its own change handler filters the products. */
  commit() {
    const minInput = this.facet?.querySelector('[ref="minInput"]');
    const maxInput = this.facet?.querySelector('[ref="maxInput"]');
    if (!(minInput instanceof HTMLInputElement) || !(maxInput instanceof HTMLInputElement)) return;

    const currency = this.dataset.currency || 'EGP';
    const low = Number(this.lowInput.value);
    const high = Number(this.highInput.value);
    minInput.value = low > 0 ? formatMoney(low, '{{amount}}', currency) : '';
    maxInput.value = high < this.#top ? formatMoney(high, '{{amount}}', currency) : '';
    maxInput.dispatchEvent(new Event('change', { bubbles: true }));
  }
}

if (!customElements.get('sn-price-range')) customElements.define('sn-price-range', SnPriceRange);
