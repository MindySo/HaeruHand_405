/*
 * Jenkins Declarative Pipeline for S13P11A405
 *  ├─ Build & push Spring / FastAPI / Nginx images
 *  └─ Pull + docker-compose up  (same EC2 host)
 */

pipeline {
    agent any                                  // 마스터 노드(로컬 Jenkins 컨테이너)에서 실행
    tools {
        git 'git-default'
    }
    environment {
        DOCKER_ID    = 'yeriming'              // Docker Hub ID (.env.prod와 동일)
        COMPOSE_FILE = 'docker-compose.prod.yml'
        ENV_FILE     = '.env.prod'
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
        stage('Docker Login') {                // Hub 로그인 (PAT 필요)
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

                withCredentials([file(credentialsId: 'env-prod',
                                      variable: 'ENV_TMP')]) {

                    sh 'cp "$ENV_TMP" "docker/$ENV_FILE"'
                }

                sh '''
                    cd docker
                    docker compose --env-file $ENV_FILE -f $COMPOSE_FILE pull
                    docker compose --env-file $ENV_FILE -f $COMPOSE_FILE up -d
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
