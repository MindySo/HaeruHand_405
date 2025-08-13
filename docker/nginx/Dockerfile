# --- FE build ---
FROM node:20-alpine AS fe-build
WORKDIR /app
    
# pnpm 설치
RUN npm install -g pnpm
    
COPY frontend/package*.json ./
COPY frontend/pnpm-lock.yaml ./
RUN pnpm install
    
COPY frontend/ ./
RUN pnpm run build
    
# --- Nginx ---
FROM nginx:1.25-alpine
COPY docker/nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=fe-build /app/dist /usr/share/nginx/html