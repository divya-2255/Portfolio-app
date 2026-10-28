const list = document.getElementById('fbList');
const statusBox = document.getElementById('fbStatus');

async function loadFeedback() {
  const items = await (await fetch('/api/feedback')).json();
  list.innerHTML = '';
  if (!items.length) { list.textContent = 'No feedback yet. Be the first!'; return; }
  items.forEach(f => {
    const d = document.createElement('div'); d.className = 'fb';
    const top = document.createElement('div');
    const who = document.createElement('span'); who.className = 'who'; who.textContent = f.name + '  ';
    top.append(who);
    const msg = document.createElement('p'); msg.textContent = f.message;
    const date = document.createElement('small'); date.textContent = new Date(f.createdAt).toLocaleDateString();
    d.append(top, msg, date);
    list.appendChild(d);
  });
}

document.getElementById('fbForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const res = await fetch('/api/feedback', {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: document.getElementById('fbName').value,
      message: document.getElementById('fbMessage').value,
    }),
  });
  if (res.ok) {
    statusBox.className = 'msg ok'; statusBox.textContent = 'Thank you for your feedback!';
    e.target.reset(); loadFeedback();
  } else {
    statusBox.className = 'msg err'; statusBox.textContent = 'Could not submit. Try again.';
  }
});

loadFeedback();
