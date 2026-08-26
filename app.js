const list = document.getElementById('list');
// ponytail: one localStorage key holding the whole array; fine until the list outgrows memory
let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');

function render() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
  list.innerHTML = '';
  tasks.forEach((t, i) => {
    const li = document.createElement('li');
    li.className = t.done ? 'done' : '';
    li.innerHTML = '<input type="checkbox"><span></span><button aria-label="Delete">x</button>';
    li.querySelector('input').checked = t.done;
    li.querySelector('span').textContent = t.text;
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
