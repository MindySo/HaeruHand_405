# --- FE build ---
FROM node:20-alpine AS fe-build
WORKDIR /app
    
# pnpm 설치
RUN npm install -g pnpm
    
# 빌드 컨텍스트가 frontend/이므로 직접 복사
COPY package*.json ./
COPY pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
    
# 모든 파일 복사
COPY . ./
RUN pnpm run build
    
# --- Nginx ---
FROM nginx:1.25-alpine
COPY docker/nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=fe-build /app/dist /usr/share/nginx/html