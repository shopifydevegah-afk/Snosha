/**
 * Snosha: article table of contents (blocks/sn-article-toc.liquid).
 * Reads the H2 / H3 headings in the article body of the same section and links to them.
 * Keeps existing heading ids; gives a unique `sn-toc-N` id only to headings without one.
 * Hides itself when fewer usable headings than `data-min` are found. It is revealed (data-pending removed)
 * only after every link was built, so a failure or missing script never shows an empty box.
 */
class SnArticleToc extends HTMLElement {
  connectedCallback() {
    if (this.dataset.ready) return;
    const content = this.closest('.section')?.querySelector('.blog-post-content') ?? document.querySelector('.blog-post-content');
    const list = this.querySelector('.sn-article-toc__list');
    if (!content || !list) {
      this.hidden = true;
      return;
    }

    const levels = (this.dataset.levels || 'h2').split(',');
    const headings = [...content.querySelectorAll(levels.join(','))].filter((h) => h.textContent?.trim());
    if (headings.length < (Number(this.dataset.min) || 2)) {
      this.hidden = true;
      return;
    }

    let parentItem = null;
    let counter = 0;
    for (const heading of headings) {
      if (!heading.id || document.querySelectorAll(`[id="${CSS.escape(heading.id)}"]`).length > 1) {
        let id;
        do id = `sn-toc-${++counter}`;
        while (document.getElementById(id));
        heading.id = id;
      }

      const item = document.createElement('li');
      const link = document.createElement('a');
      link.href = `#${heading.id}`;
      link.textContent = heading.textContent.trim().replace(/\s+/g, ' ');
      item.append(link);

      if (heading.tagName === 'H3' && parentItem) {
        let sub = parentItem.querySelector(':scope > ol');
        if (!sub) {
          sub = document.createElement('ol');
          parentItem.append(sub);
        }
        sub.append(item);
      } else {
        list.append(item);
        if (heading.tagName === 'H2') parentItem = item;
      }
    }
    this.dataset.ready = 'true';
    this.removeAttribute('data-pending');
  }
}

if (!customElements.get('sn-article-toc')) customElements.define('sn-article-toc', SnArticleToc);
