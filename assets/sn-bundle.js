import { Component } from '@theme/component';
import { fetchConfig } from '@theme/utilities';
import { CartLinesUpdateEvent, CartErrorEvent } from '@shopify/events';

/**
 * Snosha (S11): adds every product of a "Product hotspots" bundle to the cart in one request.
 * Shopify's /cart/add.js with an `items` array is all-or-nothing, so a sold-out or short item fails
 * the whole bundle instead of adding part of it. On success it fires the same cart event as Horizon's
 * product form, so the cart drawer, its auto-open setting and the cart count update as usual.
 *
 * @typedef {{ data: HTMLScriptElement, button: HTMLButtonElement, status: HTMLElement }} Refs
 * @extends Component<Refs>
 */
class SnBundleCart extends Component {
  requiredRefs = ['data', 'button', 'status'];
  #busy = false;

  /** @returns {{ id: number, quantity: number, properties?: Record<string, string> }[]} */
  get #items() {
    try {
      return JSON.parse(this.refs.data.textContent || '[]');
    } catch {
      return [];
    }
  }

  /** @param {Event} [event] */
  addBundle = async (event) => {
    event?.preventDefault();
    const items = this.#items;
    if (this.#busy || items.length === 0) return;

    const { button, status } = this.refs;
    this.#busy = true;
    button.disabled = true;
    button.setAttribute('aria-busy', 'true');
    status.textContent = '';

    const sectionIds = [...document.querySelectorAll('cart-items-component')]
      .map((el) => (el instanceof HTMLElement ? el.dataset.sectionId : ''))
      .filter(Boolean);

    try {
      const response = await fetch(Theme.routes.cart_add_url, {
        ...fetchConfig('json', { body: JSON.stringify({ items, sections: sectionIds.join(',') }) }),
      });
      const data = await response.json();

      if (!response.ok || data.status) {
        throw new Error(data.description || data.message || '');
      }

      const cart = await fetch(`${Theme.routes.cart_url}.json`, { headers: { Accept: 'application/json' } }).then(
        (r) => r.json()
      );

      const deferred = CartLinesUpdateEvent.createPromise();
      this.dispatchEvent(
        new CartLinesUpdateEvent({
          action: 'add',
          context: 'product',
          lines: items.map((item) => ({ merchandiseId: String(item.id), quantity: item.quantity })),
          promise: deferred.promise,
        })
      );
      deferred.resolve({
        cart: CartLinesUpdateEvent.createCartFromAjaxResponse(cart),
        detail: { items: cart.items, source: 'sn-bundle-cart', sections: data.sections, didError: false },
      });

      status.textContent = Theme.translations?.added || '';
    } catch (error) {
      const message = error instanceof Error ? error.message : '';
      status.textContent = message || this.dataset.errorText || '';
      this.dispatchEvent(new CartErrorEvent({ error: message || 'Bundle add failed', code: 'INVALID' }));
    } finally {
      this.#busy = false;
      button.disabled = false;
      button.removeAttribute('aria-busy');
    }
  };
}

if (!customElements.get('sn-bundle-cart')) customElements.define('sn-bundle-cart', SnBundleCart);
