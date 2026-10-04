# My Todo

A clean, responsive task manager built with React and JavaScript. Add, edit, complete, filter, and delete tasks, with your list saved in the browser using `localStorage`.

## Features

- Add tasks with the button or by pressing Enter.
- Edit tasks and cancel unsaved edits.
- Mark tasks completed or pending.
- Confirm before deleting a task.
- Filter the list by All, Pending, or Completed.
- View total, completed, and pending task counts and a progress bar.
- Keep tasks after refresh using the `my-todos` localStorage key.
- Responsive layout, keyboard focus styles, and reduced-motion support.

## Requirements

- Node.js 20.19+ or 22.12+ (required by Vite 7)
- npm

## Run locally

From the project directory:

```sh
npm install
npm run dev
```

Open the local URL printed by Vite (usually `http://localhost:5173`).

## Build and preview

Create the production-ready static site:

```sh
npm run build
```

Vite writes the generated site to `dist/`. To test the production build locally:

```sh
npm run preview
```

Open the preview URL printed by Vite.

## Deployment

This is a frontend-only static app: there is no server, API, or database to deploy. Build it with `npm run build`, then publish the contents of `dist/` to a static hosting provider.

### Vercel

1. Import the project repository into Vercel.
2. Set the **Framework Preset** to **Vite** (or use the detected settings).
3. Set the **Build Command** to `npm run build`.
4. Set the **Output Directory** to `dist`.
5. Deploy.

### Netlify

1. Import the project repository into Netlify.
2. Set the **Build command** to `npm run build`.
3. Set the **Publish directory** to `dist`.
4. Deploy.

### GitHub Pages

For a repository site hosted at `https://<username>.github.io/<repository>/`, configure Vite's `base` in `vite.config.js` to the repository path before building:

```js
export default defineConfig({
  base: "/<repository>/",
  plugins: [react()],
});
```

Replace `<repository>` with the actual repository name. Build with `npm run build`, then publish the generated `dist/` directory using GitHub Pages (for example, with a GitHub Actions workflow). For a user or organization site hosted at the domain root, the default `/` base is appropriate.

## Data and privacy

Tasks are stored only in the browser's localStorage for the current site origin. They are not uploaded or synchronized. Clearing browser storage removes the saved tasks, and deploying the app to a different domain or origin starts with a separate local task list.

## Project structure

```text
src/
├── components/
│   ├── TodoFilter.jsx
│   ├── TodoForm.jsx
│   ├── TodoItem.jsx
│   ├── TodoList.jsx
│   └── TodoStats.jsx
├── App.jsx
├── App.css
└── main.jsx
index.html
vite.config.js
```
