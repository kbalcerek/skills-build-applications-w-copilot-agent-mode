# OctoFit Tracker Frontend

This presentation tier uses React 19, Vite, Bootstrap, and `react-router-dom` to render the OctoFit Tracker resources exposed by the backend API.

## Environment setup

Define `VITE_CODESPACE_NAME` so the app can call the Codespaces backend URL on port `8000`.

Example `.env.local`:

```bash
VITE_CODESPACE_NAME=your-codespace-name
```

When `VITE_CODESPACE_NAME` is set, the frontend requests API resources from:

```text
https://${VITE_CODESPACE_NAME}-8000.app.github.dev/api/[component]/
```

If `VITE_CODESPACE_NAME` is not defined, the app safely falls back to `http://localhost:8000/api/[component]/` so it never builds an `undefined-8000` hostname.

## Development

Run the frontend with:

```bash
npm run dev --prefix octofit-tracker/frontend
```
