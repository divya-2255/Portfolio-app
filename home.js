const form = document.getElementById('profileForm');
const status = document.getElementById('status');
const ids = ['name','title','tagline','summary','education','skills','languages','interests','projects','certificate','email','linkedin'];
const $ = (id) => document.getElementById(id);

// If a profile is already saved, put it back in the form so it can be edited
fetch('/api/profile').then(r => r.json()).then(p => {
  if (!p) return;
  ids.forEach(id => {
    if (['skills','languages','interests'].includes(id)) $(id).value = (p[id] || []).join(', ');
    else if (id === 'projects') $(id).value = (p.projects || []).join('\n');
    else $(id).value = p[id] || '';
  });
}).catch(() => {});

// Sample content based on the previous portfolio (edit before saving)
$('sampleBtn').addEventListener('click', () => {
  $('name').value = 'Divya S.';
  $('title').value = 'Computer Science Student';
  $('tagline').value = 'Beginner developer building strong foundations in web development';
  $('summary').value = 'I am a motivated Computer Science student learning web development with HTML, CSS, JavaScript, Node.js and MongoDB. I enjoy learning through practical projects and I am eager to grow as a developer.';
  $('skills').value = 'HTML, CSS, JavaScript, C Programming, Node.js (learning), MongoDB (learning)';
  $('languages').value = 'English, Tamil';
  $('interests').value = 'Coding, Reading, Photography';
  $('projects').value = 'Web Pages using HTML – designed and structured pages as taught in class\nSimple Calculator in C – performs basic arithmetic operations';
});

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const data = {
    name: $('name').value, title: $('title').value, tagline: $('tagline').value,
    summary: $('summary').value, education: $('education').value,
    skills: $('skills').value.split(',').map(s => s.trim()).filter(Boolean),
    languages: $('languages').value.split(',').map(s => s.trim()).filter(Boolean),
    interests: $('interests').value.split(',').map(s => s.trim()).filter(Boolean),
    projects: $('projects').value.split('\n').map(s => s.trim()).filter(Boolean),
    certificate: $('certificate').value, email: $('email').value,
    linkedin: $('linkedin').value,
  };
  try {
    const res = await fetch('/api/profile', {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Could not save. Check the fields.');
    status.className = 'msg ok';
    status.textContent = 'Saved! Opening About page...';
    setTimeout(() => (window.location.href = 'about.html'), 800);
  } catch (err) {
    status.className = 'msg err';
    status.textContent = err.message;
  }
});
