/*
 * Jenkins Declarative Pipeline for S13P11A405
 *  ├─ Build & push Spring / FastAPI / Nginx images
 *  └─ Pull + docker-compose up  (same EC2 host)
 */
pipeline {
    agent any
    tools   { git 'git-default' }

    /* ────── 공통 환경변수 ────── */
    environment {
        DOCKER_ID    = 'yeriming'
        COMPOSE_FILE = 'docker-compose.prod.yml'
        ENV_FILE     = '.env.prod'
        SPRING_RES   = 'backend/spring-business/haeruhand/src/main/resources'
    }

    options {
        skipDefaultCheckout()
        ansiColor('xterm')
        timestamps()
    }

    stages {

        /* -------------------------------------------------- */
        stage('Checkout') {
            steps {
                // 1. 백엔드 코드 체크아웃 (be-develop)
                checkout([
                    $class: 'GitSCM',
                    branches: [[name: '*/be-develop']],
                    userRemoteConfigs: [[
                        url: 'https://lab.ssafy.com/s13-webmobile2-sub1/S13P11A405.git',
                        credentialsId: 'gitlab-jenkins-token'
                    ]]
                ])
                
                // 2. 기존 frontend 디렉토리 제거 후 프론트엔드 코드 체크아웃 (fe-apk)
                sh 'rm -rf frontend'
                dir('frontend') {
                    checkout([
                        $class: 'GitSCM',
                        branches: [[name: '*/fe-apk']],
                        userRemoteConfigs: [[
                            url: 'https://lab.ssafy.com/s13-webmobile2-sub1/S13P11A405.git',
                            credentialsId: 'gitlab-jenkins-token'
                        ]]
                    ])
                }
                
                // 3. 체크아웃 결과 확인
                sh '''
                    echo "=== Workspace structure after checkout ==="
                    ls -la
                    echo "=== Frontend directory contents ==="
                    ls -la frontend/
                    echo "=== Checking for package.json ==="
                    test -f frontend/package.json && echo "✅ package.json found" || echo "❌ package.json NOT found"
                '''
            }
        }

        /* -------------------------------------------------- */
        stage('Prepare Secrets') {
            steps {
                withCredentials([
                    file(credentialsId: 'env-prod',  variable: 'ENV_TMP'),
                    file(credentialsId: 'gcs-key',   variable: 'GCS_KEY_TMP'),
                    file(credentialsId: 'service-account-key', variable: 'SA_KEY_TMP'),
                    file(credentialsId: 'frontend-env', variable: 'FRONTEND_ENV_TMP')
                ]) {
                    sh '''
                        # .env.prod → docker/.env.prod
                        cp "$ENV_TMP" "docker/$ENV_FILE"

                        # gcs-key.json → Spring resources
                        mkdir -p "$SPRING_RES"
                        cp "$GCS_KEY_TMP" "$SPRING_RES/gcs-key.json"

                        # service-account-key.json → Spring resources
                        cp "$SA_KEY_TMP" "$SPRING_RES/service-account-key.json"

                        # frontend .env → frontend/.env
                        cp "$FRONTEND_ENV_TMP" "frontend/.env"
                    '''
                }
            }
        }

        /* -------------------------------------------------- */
        stage('Docker Login') {
            steps {
                withCredentials([usernamePassword(
                        credentialsId: 'docker-hub-cred',
                        usernameVariable: 'DOCKER_USER',
                        passwordVariable: 'DOCKER_PASS')]) {

                    sh 'echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin'
                }
            }
        }

        /* -------------------------------------------------- */
        stage('Build & Push - Spring') {
            steps {
                sh '''
                    cd backend/spring-business/haeruhand
                    ./gradlew clean build -x test
                    docker build -t $DOCKER_ID/haeruhand-spring:latest .
                    docker push    $DOCKER_ID/haeruhand-spring:latest
                '''
            }
        }

        /* -------------------------------------------------- */
        stage('Build & Push - FastAPI') {
            steps {
                sh '''
                    cd backend/fastapi-ai
                    docker build -t $DOCKER_ID/haeruhand-ai:latest .
                    docker push    $DOCKER_ID/haeruhand-ai:latest
                '''
            }
        }

        /* -------------------------------------------------- */
        stage('Build & Push - Nginx') {
            steps {
                sh '''
                    echo "=== Pre-build verification ==="
                    echo "Current directory:"
                    pwd
                    echo "Directory contents:"
                    ls -la
                    echo "Frontend directory contents:"
                    ls -la frontend/ || echo "Frontend directory not found"
                    echo "Checking for package.json:"
                    test -f frontend/package.json && echo "✅ package.json exists" || echo "❌ package.json missing"
                    
                    # 루트 디렉터리를 빌드 컨텍스트로 사용
                    docker build -f docker/nginx/Dockerfile -t $DOCKER_ID/haeruhand-nginx:latest .
                    docker push    $DOCKER_ID/haeruhand-nginx:latest
                '''
            }
        }

        /* -------------------------------------------------- */
        stage('Deploy (docker-compose prod)') {
            steps {
                sh '''
                    docker compose \
                      --env-file docker/$ENV_FILE \
                      -f docker/$COMPOSE_FILE      \
                      pull

                    docker compose \
                      --env-file docker/$ENV_FILE \
                      -f docker/$COMPOSE_FILE      \
                      up -d
                '''
            }
        }
    }

    /* ------------------------------------------------------ */
    post {
        success { echo '✅  배포 성공' }
        failure { echo '❌  배포 실패 — 콘솔 로그를 확인하세요' }
        always  { cleanWs(deleteDirs: true, disableDeferredWipeout: true) }
    }
}
