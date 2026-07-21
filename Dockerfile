FROM node:18-alpine AS build
WORKDIR /app
COPY package.json package-lock.json* ./
# Use ci if lockfile exists, otherwise fallback to install
RUN npm ci --no-audit --no-fund || npm install --no-audit --no-fund
COPY . .
# Skip react-snap in container to avoid bundling Chromium
ENV SKIP_SNAP=true
RUN npm run build

FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/build /usr/share/nginx/html
ENV PORT=8080
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]


