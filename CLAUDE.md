# todo-app

Static localStorage todo list. Three files, no build step, no dependencies.

- `index.html` — markup
- `style.css` — styles
- `app.js` — all logic; tasks live in `localStorage` under the key `tasks` as `[{text, done}]`

## Conventions

- No libraries, no bundler. Open `index.html` directly to run it.
- `app.js` re-renders the whole list on every change (`render()`). `save()` writes `localStorage`; `render()` calls it. Don't add DOM diffing.
- **Never call `render()` from the inline-edit `blur` handler** (or any focus-loss handler). Task text is `contentEditable`, so clicking the × or checkbox blurs it first; if that rebuilds the list, the node is replaced before `mouseup` and no `click` fires, so the first click after an edit does nothing. Blur commits in place: set `t.text`, `save()`, touch the DOM directly.
- Use `textContent` for task text, never `innerHTML` — user input must not be parsed as HTML.

## Verifying

No tests, no test runner — open `index.html` and click. The regression to re-check after touching `render()` or the edit handler: add two tasks, type in the first one's text, then click the second one's ×. It must delete on that first click.

## Deploy

Pushing to `main` publishes to https://thelivinsine.github.io/todo-app/ via GitHub Pages (source: `main` / root).
