# --- FE build ---
FROM node:20-alpine AS fe-build
WORKDIR /app
    
# pnpm 설치
RUN npm install -g pnpm

# 빌드 컨텍스트 디렉토리 구조 확인
RUN echo "=== Build context contents ===" && ls -la .
RUN echo "=== Frontend directory contents ===" && ls -la frontend/ || echo "Frontend directory not found or empty"

# package.json이 존재하는지 확인하고 복사
RUN test -f frontend/package.json || (echo "ERROR: frontend/package.json not found!" && exit 1)
COPY frontend/package*.json ./

# pnpm-lock.yaml이 있으면 복사
COPY frontend/pnpm-lock.yaml* ./

# 의존성 설치
RUN pnpm install --frozen-lockfile
    
# frontend 디렉터리의 모든 파일 복사
COPY frontend/ ./

# 빌드 전 파일 구조 확인
RUN echo "=== Files before build ===" && ls -la

# 빌드 실행
RUN pnpm run build

# 빌드 결과 확인
RUN echo "=== Build output check ===" && ls -la dist/ || echo "No dist directory found"
    
# --- Nginx ---
FROM nginx:1.25-alpine
COPY docker/nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=fe-build /app/dist /usr/share/nginx/html