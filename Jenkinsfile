/*
 * Jenkins Declarative Pipeline for S13P11A405
 *  ├─ Build & push Spring / FastAPI / Nginx images
 *  └─ Pull + docker-compose up  (same EC2 host)
 */
pipeline {
    agent any
    tools   { git 'Default' }

    /* ────── 공통 환경변수 ────── */
    environment {
        DOCKER_ID    = 'mindyso'
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
                        url: 'https://github.com/MindySo/HaeruHand_405.git',
                        credentialsId: 'github-jenkins-token'
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
    }

    /* ------------------------------------------------------ */
    post {
        success { echo '✅  배포 성공' }
        failure { echo '❌  배포 실패 — 콘솔 로그를 확인하세요' }
        always  { 
            sh 'sudo chown -R jenkins:jenkins . || true'
            cleanWs(deleteDirs: true, disableDeferredWipeout: true)
        }
    }
}
