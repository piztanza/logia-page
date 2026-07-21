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

## Docker
```
docker build -t app-v2:latest .
```

Container listens on $PORT (8080). Used for container-based hosting; the AWS
dev environment does not go through this path.

## Deployment (AWS dev)

Pushing to `dev-aws` runs `.github/workflows/deploy-aws.yml`, which builds the
CRA bundle and publishes `build/` to S3, then invalidates CloudFront.

The build runs with `SKIP_SNAP=true`, so the react-snap prerender step is
skipped in CI (it needs Chromium).

Because this app uses `createBrowserRouter` with real routes (`/products`,
`/schedule`), the CloudFront distribution must map 403 and 404 responses to
`/index.html` with a 200 status. Without that, deep links and refreshes on
those routes return an S3 error instead of the app.

Required repo secrets: `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`,
`AWS_REGION`, `DEV_S3_BUCKET_NAME`, `DEV_CLOUDFRONT_DISTRIBUTION_ID`.


