# todo-app

Static localStorage todo list. Three files, no build step, no dependencies.

- `index.html` — markup
- `style.css` — styles
- `app.js` — all logic; tasks live in `localStorage` under the key `tasks` as `[{text, done}]`

## Conventions

- No libraries, no bundler. Open `index.html` directly to run it.
- `app.js` re-renders the whole list on every change (`render()`), which also persists to `localStorage`. Don't add DOM diffing.
- Use `textContent` for task text, never `innerHTML` — user input must not be parsed as HTML.

## Deploy

Pushing to `main` publishes to https://thelivinsine.github.io/todo-app/ via GitHub Pages (source: `main` / root).
