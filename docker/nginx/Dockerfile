# --- FE build ---
FROM node:20-alpine AS fe-build
WORKDIR /app
    
# pnpm 설치
RUN npm install -g pnpm
    
# frontend 디렉터리에서 package.json 복사
COPY frontend/package*.json ./
# pnpm-lock.yaml이 있으면 복사 (조건부)
COPY frontend/pnpm-lock.yaml* ./
RUN pnpm install --frozen-lockfile
    
# frontend 디렉터리의 모든 파일 복사
COPY frontend/ ./
RUN pnpm run build
    
# --- Nginx ---
FROM nginx:1.25-alpine
COPY docker/nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=fe-build /app/dist /usr/share/nginx/html