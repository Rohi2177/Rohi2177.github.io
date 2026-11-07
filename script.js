(() => {
  const year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());
  const library = document.getElementById('document-library');
  if (!library || location.protocol === 'file:') return;
  fetch('documents/index.json', { cache: 'no-cache' })
    .then(response => {
      if (!response.ok) throw new Error('No document index');
      return response.json();
    })
    .then(items => {
      if (!Array.isArray(items)) return;
      const fragment = document.createDocumentFragment();
      const categories = new Map();
      items.forEach((item, index) => {
        if (!item || typeof item.file !== 'string' || typeof item.title !== 'string') return;
        const filename = item.file.replace(/^documents\//, '');
        if (!/^[\w. -]+\.(pdf|zip)$/i.test(filename) || filename.includes('..')) return;
        const isPdf = /\.pdf$/i.test(filename);
        const card = document.createElement('article');
        card.className = 'document-card';
        const icon = document.createElement('div');
        icon.className = 'document-icon';
        icon.setAttribute('aria-hidden', 'true');
        icon.textContent = '↗';
        const tag = document.createElement('p');
        tag.className = 'doc-index';
        tag.textContent = `${String(index + 1).padStart(2, '0')} / ${typeof item.category === 'string' ? item.category.toUpperCase() : 'DOCUMENT'}`;
        const title = document.createElement('h3');
        title.textContent = item.title;
        const note = document.createElement('p');
        note.textContent = typeof item.note === 'string' ? item.note : 'Supporting document.';
        const actions = document.createElement('div');
        actions.className = 'doc-actions';
        const view = document.createElement('a');
        view.className = 'doc-link';
        view.href = `documents/${encodeURIComponent(filename)}`;
        view.target = '_blank';
        view.rel = 'noopener';
        view.textContent = 'View PDF ↗';
        view.setAttribute('aria-label', `View ${item.title} (PDF, opens in a new tab)`);
        const download = document.createElement('a');
        download.className = 'doc-link';
        download.href = view.href;
        download.download = filename;
        download.textContent = 'Download ↓';
        download.setAttribute('aria-label', `Download ${item.title} (${isPdf ? 'PDF' : 'ZIP'})`);
        if (isPdf) actions.append(view);
        actions.append(download);
        card.append(icon, tag, title, note, actions);
        const groupName = typeof item.category === 'string' && item.category.trim() ? item.category.trim() : 'Other documents';
        if (!categories.has(groupName)) {
          const group = document.createElement('section');
          group.className = 'document-group';
          const heading = document.createElement('h3');
          heading.textContent = groupName;
          const cards = document.createElement('div');
          cards.className = 'document-group-grid';
          group.append(heading, cards);
          categories.set(groupName, cards);
          fragment.append(group);
        }
        categories.get(groupName).append(card);
      });
      if (fragment.childElementCount) {
        const request = document.getElementById('document-request');
        library.insertBefore(fragment, request);
      }
    })
    .catch(() => { /* Static links remain usable without a document index. */ });
})();
