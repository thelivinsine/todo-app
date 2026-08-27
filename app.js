const list = document.getElementById('list');
const count = document.getElementById('count');
const empty = document.getElementById('empty');
// ponytail: one localStorage key holding the whole array; fine until the list outgrows memory
let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');

function render() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
  list.innerHTML = '';
  const left = tasks.filter(t => !t.done).length;
  count.textContent = tasks.length ? `${left} of ${tasks.length} remaining` : '';
  empty.hidden = tasks.length > 0;
  tasks.forEach((t, i) => {
    const li = document.createElement('li');
    li.className = t.done ? 'done' : '';
    li.innerHTML = '<input type="checkbox"><span></span><button aria-label="Delete task" title="Delete">×</button>';
    li.querySelector('input').checked = t.done;
    const span = li.querySelector('span');
    span.textContent = t.text;
    span.contentEditable = 'true';
    // ponytail: blur commits, Enter blurs, empty edit reverts. Escape-to-cancel if anyone asks.
    span.onkeydown = e => { if (e.key === 'Enter') { e.preventDefault(); span.blur(); } };
    span.onblur = () => {
      const v = span.textContent.trim();
      if (v === t.text) return;
      t.text = v || t.text;
      render();
    };
    li.querySelector('input').onchange = () => { t.done = !t.done; render(); };
    li.querySelector('button').onclick = () => { tasks.splice(i, 1); render(); };
    list.append(li);
  });
}

document.getElementById('new').onsubmit = e => {
  e.preventDefault();
  const text = e.target.text.value.trim();
  if (!text) return;
  tasks.push({ text, done: false });
  e.target.reset();
  render();
};

render();
