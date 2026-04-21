# Logia Initiative — Landing Page

Company profile landing page for Logia Initiative, built with Vite + React 19 + TypeScript.

## Local Development

```bash
npm ci
npm run dev       # Dev server on port 3000
npm run build     # Production build → dist/
npm run preview   # Preview production build
npm run lint      # Type-check (tsc --noEmit)
```

## Docker

The container builds the Vite bundle and serves the output through nginx on port 8080.

```bash
docker build -t logia-page:latest .
docker run -p 8080:8080 logia-page:latest
```

Open `http://localhost:8080`.

## Deployment

Auto-deploys to AWS when the configured branch is updated. The container listens on `$PORT=8080`.
