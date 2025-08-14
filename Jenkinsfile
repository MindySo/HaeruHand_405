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
                checkout([
                    $class: 'GitSCM',
                    branches: [[name: '*/be-develop']],
                    userRemoteConfigs: [[
                        url: 'https://lab.ssafy.com/s13-webmobile2-sub1/S13P11A405.git',
                        credentialsId: 'gitlab-jenkins-token'
                    ]]
                ])
            }
        }

        /* -------------------------------------------------- */
        stage('Prepare Secrets') {
            steps {
                withCredentials([
                    file(credentialsId: 'env-prod',  variable: 'ENV_TMP'),
                    file(credentialsId: 'gcs-key',   variable: 'GCS_KEY_TMP'),
                    file(credentialsId: 'service-account-key', variable: 'SA_KEY_TMP')
                ]) {
                    sh '''
                        # .env.prod → docker/.env.prod
                        cp "$ENV_TMP" "docker/$ENV_FILE"

                        # gcs-key.json → Spring resources
                        mkdir -p "$SPRING_RES"
                        cp "$GCS_KEY_TMP" "$SPRING_RES/gcs-key.json"

                        # service-account-key.json → Spring resources
                        cp "$SA_KEY_TMP" "$SPRING_RES/service-account-key.json"
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
                    cd docker/nginx
                    docker build -t $DOCKER_ID/haeruhand-nginx:latest .
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

        /* -------------------------------------------------- */
        stage('SSL Certificate Setup') {
            steps {
                sh '''
                    # 1) certbot 디렉토리 보장 (docker/ 기준 상대경로)
                    mkdir -p docker/certbot/conf docker/certbot/www

                    # 2) nginx가 80 응답할 수 있게 헬스체크 (최대 30초 대기)
                    echo "Waiting for nginx to be ready..."
                    for i in $(seq 1 30); do
                        if curl -fsS http://i13a405.p.ssafy.io/.well-known/acme-challenge/ping >/dev/null 2>&1; then
                            echo "Nginx is ready!"
                            break
                        fi
                        sleep 1
                    done

                    # 3) 이미 인증서가 있으면 건너뜀 (docker/ 기준 상대경로)
                    DOMAIN="i13a405.p.ssafy.io"
                    LIVE_DIR="docker/certbot/conf/live/${DOMAIN}"
                    if [ -f "${LIVE_DIR}/privkey.pem" ] && [ -f "${LIVE_DIR}/fullchain.pem" ]; then
                        echo "Certificate already exists for ${DOMAIN}. Skip issuance."
                    else
                        echo "No certificate found. Issuing a new one for ${DOMAIN}..."
                        docker compose \
                          --env-file docker/$ENV_FILE \
                          -f docker/$COMPOSE_FILE \
                          run --rm certbot certbot certonly \
                          --webroot \
                          --webroot-path=/var/www/certbot \
                          --email yeriming@naver.com \
                          --agree-tos \
                          --no-eff-email \
                          -d ${DOMAIN}
                    fi

                    # 4) nginx 설정 테스트 후 reload
                    docker compose \
                      --env-file docker/$ENV_FILE \
                      -f docker/$COMPOSE_FILE \
                      exec -T nginx nginx -t

                    docker compose \
                      --env-file docker/$ENV_FILE \
                      -f docker/$COMPOSE_FILE \
                      exec -T nginx nginx -s reload
                '''
            }
        }
    }

    /* ------------------------------------------------------ */
    post {
        success { echo '✅  배포 성공' }
        failure { echo '❌  배포 실패 — 콘솔 로그를 확인하세요' }
        always  { 
            cleanWs(
                deleteDirs: true, 
                disableDeferredWipeout: true,
                patterns: [[pattern: 'docker/certbot/**', type: 'EXCLUDE']]
            ) 
        }
    }
}
