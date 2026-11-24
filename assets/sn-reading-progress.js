/**
 * Snosha: article reading progress (blocks/sn-article-progress.liquid).
 * Progress = how much of the article text (.blog-post-content) has passed under the sticky header.
 * Updates at most once per frame and only writes a transform, so it never changes layout.
 */
class SnReadingProgress extends HTMLElement {
  /** @type {AbortController | undefined} */
  #controller;

  #frame = 0;

  connectedCallback() {
    this.bar = this.querySelector('.sn-reading-progress__bar');
    this.content = document.querySelector('.blog-post-content');
    if (!this.bar || !this.content) {
      this.hidden = true;
      return;
    }

    this.#controller = new AbortController();
    const options = { passive: true, signal: this.#controller.signal };
    window.addEventListener('scroll', this.#schedule, options);
    window.addEventListener('resize', this.#schedule, options);
    this.#update();
  }

  disconnectedCallback() {
    this.#controller?.abort();
    cancelAnimationFrame(this.#frame);
    this.#frame = 0;
  }

  #schedule = () => {
    if (this.#frame) return;
    this.#frame = requestAnimationFrame(() => {
      this.#frame = 0;
      this.#update();
    });
  };

  #update() {
    if (!this.bar || !this.content) return;
    const headerBottom = this.getBoundingClientRect().top;
    const box = this.content.getBoundingClientRect();
    const scrollable = box.height - (window.innerHeight - headerBottom);
    let progress = box.top < headerBottom ? 1 : 0;
    if (scrollable > 0) progress = (headerBottom - box.top) / scrollable;
    this.bar.style.transform = `scaleX(${Math.min(1, Math.max(0, progress))})`;
  }
}

if (!customElements.get('sn-reading-progress')) customElements.define('sn-reading-progress', SnReadingProgress);
