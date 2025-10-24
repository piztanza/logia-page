# app-v2

Rebuilt React SPA (Create React App + TypeScript) for Logia Initiative. No Vite. Clean styling with CSS Modules and scoped globals. Ready for Google Cloud Run.

## Scripts
- npm start
- npm run build

## Run locally
```
npm ci
npm start
```

## Build
```
npm run build
```

## Docker (Cloud Run)
```
docker build -t app-v2:latest .
```

Deploy to Cloud Run with your preferred workflow. Container listens on $PORT (8080).


