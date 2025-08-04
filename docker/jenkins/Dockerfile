FROM jenkins/jenkins:lts

USER root

# Docker CLI 설치
RUN apt-get update && apt-get install -y \
    docker.io \
    docker-compose \
    git \
    curl \
    openjdk-17-jdk \
    && apt-get clean

ENV JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64