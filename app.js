const list = document.getElementById('list');
const count = document.getElementById('count');
const empty = document.getElementById('empty');
// ponytail: one localStorage key holding the whole array; fine until the list outgrows memory
let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');

function save() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function render() {
  save();
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
    // ponytail: commit in place, never render() — a re-render here would destroy the node
    // mid-click (mousedown blurs, mouseup lands on a fresh element, click never fires),
    // silently eating the first click on delete/checkbox/another task.
    span.onblur = () => {
      const v = span.textContent.trim();
      if (v === t.text) return;
      span.textContent = v || t.text;
      if (v) { t.text = v; save(); }
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
