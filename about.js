const box = document.getElementById('content');

// Helper: build an element safely (textContent prevents unsafe HTML)
function el(tag, text, cls) {
  const e = document.createElement(tag);
  if (text) e.textContent = text;
  if (cls) e.className = cls;
  return e;
}
function section(title) {
  const s = el('div', '', 'section');
  s.appendChild(el('h2', title));
  return s;
}

fetch('/api/profile').then(r => r.json()).then(p => {
  box.innerHTML = '';
  if (!p) {
    box.appendChild(el('p', 'No details yet. Please fill the form on the Home page.'));
    const a = el('a', 'Go to Home', 'btn'); a.href = 'index.html';
    box.appendChild(a);
    return;
  }

  // Top banner with name and status
  const top = el('div', '', 'profile-top');
  const info = el('div');
  info.appendChild(el('h1', p.name));
  info.appendChild(el('div', p.title, 'role'));
  if (p.tagline) info.appendChild(el('p', p.tagline));
  top.appendChild(info);
  box.appendChild(top);

  const about = section('About Me');
  about.appendChild(el('p', p.summary));
  box.appendChild(about);

  if (p.education) { const s = section('Education'); s.appendChild(el('p', p.education)); box.appendChild(s); }

  if (p.skills && p.skills.length) {
    const s = section('Skills'); const c = el('div', '', 'chips');
    p.skills.forEach(k => c.appendChild(el('span', k)));
    s.appendChild(c); box.appendChild(s);
  }

  if (p.languages && p.languages.length) {
    const s = section('Languages'); const c = el('div', '', 'chips');
    p.languages.forEach(k => c.appendChild(el('span', k)));
    s.appendChild(c); box.appendChild(s);
  }

  if (p.interests && p.interests.length) {
    const s = section('Interests'); const c = el('div', '', 'chips');
    p.interests.forEach(k => c.appendChild(el('span', k)));
    s.appendChild(c); box.appendChild(s);
  }

  if (p.projects && p.projects.length) {
    const s = section('Projects'); const ul = el('ul');
    p.projects.forEach(k => ul.appendChild(el('li', k)));
    s.appendChild(ul); box.appendChild(s);
  }

  if (p.certificate) { const s = section('Certification'); s.appendChild(el('p', p.certificate)); box.appendChild(s); }

  const contact = section('Contact');
  contact.appendChild(el('p', 'Email: ' + p.email));
  if (p.linkedin) contact.appendChild(el('p', 'LinkedIn: ' + p.linkedin));
  box.appendChild(contact);

  const edit = el('a', 'Edit Details', 'btn'); edit.href = 'index.html';
  box.appendChild(edit);
}).catch(() => { box.textContent = 'Could not load. Is the server running?'; });
