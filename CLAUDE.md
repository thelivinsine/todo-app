# todo-app

Static localStorage todo list. Three files, no build step, no dependencies.

- `index.html` — markup
- `style.css` — styles
- `app.js` — all logic; tasks live in `localStorage` under the key `tasks` as `[{text, done}]`

## Conventions

- No libraries, no bundler. Open `index.html` directly to run it.
- `app.js` re-renders the whole list on every change (`render()`). `save()` writes `localStorage`; `render()` calls it. Don't add DOM diffing.
- **Never call `render()` from the inline-edit `blur` handler.** The task text is `contentEditable`, so clicking the delete button or checkbox first blurs the span. If blur rebuilds the list, the node under the cursor is replaced before `mouseup`, no `click` fires, and the first click after any edit silently does nothing. Blur commits in place: write `t.text`, call `save()`, touch the DOM directly. Same trap for any future handler that re-renders on focus loss.
- Use `textContent` for task text, never `innerHTML` — user input must not be parsed as HTML.

## Verifying

No tests and no test runner — verification is manual: open `index.html` and click. The regression worth re-checking after touching `render()` or the edit handler: add two tasks, type in the first one's text, then click the second one's ×. It must delete on that first click.

## Known gaps

- `Screenshots/Screenshot 2026-08-27 104006.png` shows the pre-polish UI; stale, safe to delete or regenerate.
- `style.css` uses `color-mix()` with no fallback. On a browser without it, `li span:focus` loses its focus indicator entirely (both the background and box-shadow are `color-mix`, and `outline: none` is unconditional).

## Deploy

Pushing to `main` publishes to https://thelivinsine.github.io/todo-app/ via GitHub Pages (source: `main` / root).
