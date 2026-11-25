/**
 * Snosha — colour swatches for Simple Bundles "Infinite Options" (blocks/sn-bundle-swatches.liquid).
 *
 * Progressive enhancement over the app's verified DOM: inside the container (default #simple-bundles-io-options)
 * each bundle piece is a <label for> + native <select name="properties[…]">. For every select this adds a radiogroup
 * of swatch buttons right after it. The select is never removed or replaced:
 *   - it stays in the product form, so its value is what the theme's FormData submits (line item property);
 *   - choosing a swatch sets select.value and dispatches the select's own `input` + `change` events, exactly what
 *     a user changing the dropdown produces, so the app's listeners run unchanged;
 *   - any change made to the select by the app (value, disabled / sold-out options, re-render) is mirrored back.
 * No app API is called and no app-generated id is stored. Without JavaScript the app dropdowns stay as they are.
 */

const OBSERVED_ATTRIBUTES = ['disabled', 'selected', 'value'];

class SnBundleSwatches extends HTMLElement {
  /** @type {Record<string, string>} */
  #colors = {};
  /** @type {MutationObserver | undefined} */
  #pageObserver;
  /** @type {WeakMap<HTMLSelectElement, { group: HTMLElement, sync: () => void, observer: MutationObserver }>} */
  #enhanced = new WeakMap();
  #scanQueued = false;
  #uid = 0;

  connectedCallback() {
    try {
      const json = this.querySelector('script[data-colors]')?.textContent || '{}';
      this.#colors = JSON.parse(json);
    } catch {
      this.#colors = {};
    }

    this.#scan();
    // The app may inject or re-render its options after load: rescan on DOM changes (batched per frame).
    this.#pageObserver = new MutationObserver(() => this.#queueScan());
    this.#pageObserver.observe(document.body, { childList: true, subtree: true });
  }

  disconnectedCallback() {
    this.#pageObserver?.disconnect();
  }

  #queueScan() {
    if (this.#scanQueued) return;
    this.#scanQueued = true;
    requestAnimationFrame(() => {
      this.#scanQueued = false;
      this.#scan();
    });
  }

  #scan() {
    const selector = this.dataset.target || '#simple-bundles-io-options';
    let containers;
    try {
      containers = document.querySelectorAll(selector);
    } catch {
      return; // invalid selector typed in the editor
    }

    containers.forEach((container) => {
      if (!(container instanceof HTMLElement)) return;
      if (this.dataset.styleId) container.classList.add(`sn-sb-scope-${this.dataset.styleId}`);
      container.querySelectorAll('select').forEach((select) => this.#enhance(container, select));
      // Drop swatch groups left behind when the app replaced a select on its own
      container.querySelectorAll('.sn-sb-swatches').forEach((group) => {
        const owner = group.previousElementSibling;
        if (!(owner instanceof HTMLSelectElement) || this.#enhanced.get(owner)?.group !== group) group.remove();
      });
    });
  }

  /** @param {string} name */
  #colorFor(name) {
    return this.#colors[name.trim().toLowerCase()] || '';
  }

  /**
   * @param {HTMLElement} container
   * @param {HTMLSelectElement} select
   */
  #enhance(container, select) {
    const existing = this.#enhanced.get(select);
    if (existing) {
      if (existing.group.isConnected) return;
      existing.observer.disconnect(); // the group was removed by a re-render: rebuild it
    }

    const label = select.id ? container.querySelector(`label[for="${CSS.escape(select.id)}"]`) : null;
    const showValue = this.dataset.showValue === 'true';

    const group = document.createElement('div');
    group.className = 'sn-sb-swatches';
    group.setAttribute('role', 'radiogroup');
    if (select.required) group.setAttribute('aria-required', 'true');

    /** @type {HTMLSpanElement | null} */
    let valueEl = null;
    if (label instanceof HTMLElement) {
      if (!label.id) label.id = `sn-sb-label-${++this.#uid}-${Date.now().toString(36)}`;
      label.classList.add('sn-sb-label');
      if (select.required && this.dataset.requiredMark === 'true') label.classList.add('sn-sb-label--required');
      group.setAttribute('aria-labelledby', label.id);
      if (showValue) {
        valueEl = label.querySelector('.sn-sb-value');
        if (!valueEl) {
          valueEl = document.createElement('span');
          valueEl.className = 'sn-sb-value';
          label.append(valueEl);
        }
      }
    } else {
      group.setAttribute('aria-label', select.getAttribute('aria-label') || select.name);
    }

    const build = () => {
      builtKey = optionKey();
      group.replaceChildren();
      for (const option of select.options) {
        if (option.value === '') continue; // the app's "Please select" placeholder
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'sn-sb-swatch';
        button.setAttribute('role', 'radio');
        button.dataset.value = option.value;
        const name = option.textContent?.trim() || option.value;
        button.setAttribute('aria-label', name);
        button.title = name;
        const color = this.#colorFor(option.value) || this.#colorFor(name);
        if (color) {
          button.style.setProperty('--sn-sb-color', color);
        } else {
          button.classList.add('sn-sb-swatch--text');
          button.textContent = name;
        }
        group.append(button);
      }
    };

    const optionKey = () =>
      [...select.options]
        .filter((o) => o.value !== '')
        .map((o) => o.value)
        .join('\u0000');
    let builtKey = '';

    const sync = () => {
      if (optionKey() !== builtKey) build();
      const buttons = /** @type {HTMLButtonElement[]} */ ([...group.children]);
      let focusable = null;
      for (const button of buttons) {
        const option = [...select.options].find((o) => o.value === button.dataset.value);
        const checked = Boolean(option && option.selected && select.value === option.value);
        const disabled = Boolean(!option || option.disabled || select.disabled);
        button.setAttribute('aria-checked', String(checked));
        button.setAttribute('aria-disabled', String(disabled));
        button.tabIndex = -1;
        if (checked) focusable = button;
      }
      if (!focusable) focusable = buttons.find((b) => b.getAttribute('aria-disabled') !== 'true') || buttons[0] || null;
      if (focusable) focusable.tabIndex = 0;
      if (valueEl) {
        const selected = select.selectedOptions[0];
        valueEl.textContent = selected && selected.value !== '' ? selected.textContent?.trim() || selected.value : '';
      }
      if (select.value !== '') group.classList.remove('sn-sb-swatches--invalid');
    };

    /** @param {HTMLButtonElement} button */
    const choose = (button) => {
      if (button.getAttribute('aria-disabled') === 'true') return;
      const value = button.dataset.value ?? '';
      if (select.value !== value) {
        select.value = value;
        select.dispatchEvent(new Event('input', { bubbles: true }));
        select.dispatchEvent(new Event('change', { bubbles: true }));
      }
      sync();
    };

    group.addEventListener('click', (event) => {
      const button = event.target instanceof Element ? event.target.closest('.sn-sb-swatch') : null;
      if (button instanceof HTMLButtonElement) choose(button);
    });

    // Radio-group keyboard pattern; arrows follow the reading direction (RTL / LTR)
    group.addEventListener('keydown', (event) => {
      const buttons = /** @type {HTMLButtonElement[]} */ ([...group.children]).filter(
        (b) => b.getAttribute('aria-disabled') !== 'true'
      );
      if (!buttons.length) return;
      const current = buttons.indexOf(/** @type {HTMLButtonElement} */ (document.activeElement));
      const rtl = getComputedStyle(group).direction === 'rtl';
      let next = -1;
      switch (event.key) {
        case 'ArrowRight':
          next = current + (rtl ? -1 : 1);
          break;
        case 'ArrowLeft':
          next = current + (rtl ? 1 : -1);
          break;
        case 'ArrowDown':
          next = current + 1;
          break;
        case 'ArrowUp':
          next = current - 1;
          break;
        case 'Home':
          next = 0;
          break;
        case 'End':
          next = buttons.length - 1;
          break;
        default:
          return;
      }
      event.preventDefault();
      const target = buttons[(next + buttons.length) % buttons.length];
      if (!target) return;
      target.focus();
      choose(target);
    });

    // Changes coming from the app (or the hidden select itself) are mirrored on the swatches
    select.addEventListener('change', sync);
    select.addEventListener('invalid', () => {
      group.classList.add('sn-sb-swatches--invalid');
      const first = /** @type {HTMLButtonElement | null} */ (group.querySelector('.sn-sb-swatch[tabindex="0"]'));
      first?.focus();
    });
    const observer = new MutationObserver(sync);
    observer.observe(select, { subtree: true, childList: true, attributes: true, attributeFilter: OBSERVED_ATTRIBUTES });

    build();
    if (select.nextElementSibling?.classList.contains('sn-sb-swatches')) select.nextElementSibling.remove();
    select.after(group);
    select.classList.add('sn-sb-native');
    select.tabIndex = -1;
    select.setAttribute('aria-hidden', 'true');
    sync();

    this.#enhanced.set(select, { group, sync, observer });
  }
}

if (!customElements.get('sn-bundle-swatches')) {
  customElements.define('sn-bundle-swatches', SnBundleSwatches);
}
