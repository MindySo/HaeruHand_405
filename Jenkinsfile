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
        stage('SSL Certificate') {
            steps {
                script {
                    try {
                        withCredentials([
                            file(credentialsId: 'ssl-fullchain-pem', variable: 'FULLCHAIN_TMP'),
                            file(credentialsId: 'ssl-privkey-pem', variable: 'PRIVKEY_TMP')
                        ]) {
                            echo "Jenkins Credentials에서 인증서를 복사합니다."
                            sh '''
                                cd docker
                                # certbot 디렉토리 생성
                                mkdir -p certbot/conf/live/i13a405.p.ssafy.io
                                mkdir -p certbot/www
                                
                                # Jenkins Credentials에서 인증서 복사
                                cp "$FULLCHAIN_TMP" certbot/conf/live/i13a405.p.ssafy.io/fullchain.pem
                                cp "$PRIVKEY_TMP" certbot/conf/live/i13a405.p.ssafy.io/privkey.pem
                                
                                # 권한 설정
                                chmod 644 certbot/conf/live/i13a405.p.ssafy.io/fullchain.pem
                                chmod 600 certbot/conf/live/i13a405.p.ssafy.io/privkey.pem
                                
                                echo "인증서 복사 완료"
                                ls -la certbot/conf/live/i13a405.p.ssafy.io/
                            '''
                        }
                    } catch (Exception e) {
                        echo "Jenkins Credentials에 인증서가 없거나 복사에 실패했습니다: ${e.getMessage()}"
                        echo "HTTP 설정으로 진행합니다."
                        sh '''
                            cd docker/nginx
                            # 임시 HTTP 설정으로 시작
                            cp nginx-http-only.conf nginx.conf
                        '''
                    }
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
    }

    /* ------------------------------------------------------ */
    post {
        success { echo '✅  배포 성공' }
        failure { echo '❌  배포 실패 — 콘솔 로그를 확인하세요' }
        always  { cleanWs(deleteDirs: true, disableDeferredWipeout: true) }
    }
}
