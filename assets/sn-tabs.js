/**
 * Snosha P10 (Dev3): accessible tabs for the `tabs` theme block.
 *
 * Each `_tab` block renders a `[role="tabpanel"]` with its label in `data-tab-label`.
 * This element builds one `<button role="tab">` per panel inside its own tablist, so the
 * merchant only edits blocks. Supports click, arrow keys (RTL-aware), Home / End, and
 * theme editor block selection. Every instance is independent.
 */
class SnTabs extends HTMLElement {
  /** @type {AbortController | null} */
  #abort = null;
  /** @type {MutationObserver | null} */
  #observer = null;

  connectedCallback() {
    this.#abort = new AbortController();
    const { signal } = this.#abort;
    const list = this.#list;
    const panelsWrap = this.#panelsWrap;
    if (!list || !panelsWrap) return;

    this.#build();

    list.addEventListener('click', this.#onClick, { signal });
    list.addEventListener('keydown', this.#onKeydown, { signal });
    document.addEventListener('shopify:block:select', this.#onBlockSelect, { signal });

    // Theme editor re-renders, adds, removes or reorders tab blocks: rebuild the buttons.
    this.#observer = new MutationObserver((records) => {
      const relevant = records.some(
        (record) =>
          (record.type === 'childList' && record.target === panelsWrap) ||
          (record.type === 'attributes' && record.attributeName === 'data-tab-label')
      );
      if (relevant) this.#build();
    });
    this.#observer.observe(panelsWrap, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['data-tab-label'],
    });
  }

  disconnectedCallback() {
    this.#abort?.abort();
    this.#observer?.disconnect();
  }

  /** @returns {HTMLElement | null} */
  get #list() {
    return this.querySelector(':scope > [role="tablist"]');
  }

  /** @returns {HTMLElement | null} */
  get #panelsWrap() {
    return this.querySelector(':scope > .sn-tabs__panels');
  }

  /** @returns {HTMLElement[]} */
  get #panels() {
    const wrap = this.#panelsWrap;
    if (!wrap) return [];
    return /** @type {HTMLElement[]} */ (Array.from(wrap.children).filter((el) => el.matches('[role="tabpanel"]')));
  }

  /** @returns {HTMLButtonElement[]} */
  get #tabs() {
    const list = this.#list;
    if (!list) return [];
    return /** @type {HTMLButtonElement[]} */ (Array.from(list.querySelectorAll(':scope > [role="tab"]')));
  }

  #build() {
    const list = this.#list;
    if (!list) return;
    const panels = this.#panels;
    const currentId = this.#tabs.find((tab) => tab.getAttribute('aria-selected') === 'true')?.getAttribute('aria-controls');

    const buttons = panels.map((panel) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'sn-tabs__tab';
      button.id = `${panel.id}-tab`;
      button.setAttribute('role', 'tab');
      button.setAttribute('aria-controls', panel.id);
      button.textContent = panel.dataset.tabLabel || '';
      panel.setAttribute('aria-labelledby', button.id);
      return button;
    });
    list.replaceChildren(...buttons);

    const target =
      panels.find((panel) => panel.id === currentId) ||
      panels.find((panel) => panel.hasAttribute('data-open')) ||
      panels[0];
    if (target) this.#select(target, false);
  }

  /**
   * @param {HTMLElement} panel
   * @param {boolean} moveFocus
   */
  #select(panel, moveFocus) {
    for (const tab of this.#tabs) {
      const selected = tab.getAttribute('aria-controls') === panel.id;
      tab.setAttribute('aria-selected', String(selected));
      tab.tabIndex = selected ? 0 : -1;
      if (selected && moveFocus) tab.focus();
    }
    for (const item of this.#panels) item.hidden = item !== panel;
  }

  /** @param {HTMLElement | null} tab */
  #selectTab(tab, moveFocus = false) {
    const id = tab?.getAttribute('aria-controls');
    const panel = id ? this.#panels.find((item) => item.id === id) : null;
    if (panel) this.#select(panel, moveFocus);
  }

  /** @param {MouseEvent} event */
  #onClick = (event) => {
    const target = /** @type {Element} */ (event.target);
    this.#selectTab(target.closest('[role="tab"]'));
  };

  /** @param {KeyboardEvent} event */
  #onKeydown = (event) => {
    const tabs = this.#tabs;
    const index = tabs.indexOf(/** @type {HTMLButtonElement} */ (event.target));
    if (index < 0 || !tabs.length) return;

    const rtl = getComputedStyle(this).direction === 'rtl';
    let next = -1;
    switch (event.key) {
      case 'ArrowRight':
        next = rtl ? index - 1 : index + 1;
        break;
      case 'ArrowLeft':
        next = rtl ? index + 1 : index - 1;
        break;
      case 'Home':
        next = 0;
        break;
      case 'End':
        next = tabs.length - 1;
        break;
      default:
        return;
    }
    event.preventDefault();
    next = (next + tabs.length) % tabs.length;
    this.#selectTab(tabs[next] ?? null, true);
  };

  /** Theme editor: selecting a tab block (or a block inside it) opens that tab. */
  #onBlockSelect = (/** @type {Event} */ event) => {
    const target = /** @type {Element | null} */ (event.target instanceof Element ? event.target : null);
    if (!target || !this.contains(target)) return;
    const panel = target.closest('[role="tabpanel"]');
    if (panel instanceof HTMLElement && this.#panels.includes(panel)) this.#select(panel, false);
  };
}

if (!customElements.get('sn-tabs')) customElements.define('sn-tabs', SnTabs);
