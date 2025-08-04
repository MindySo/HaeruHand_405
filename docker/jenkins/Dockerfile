FROM jenkins/jenkins:lts

USER root

RUN apt-get update && apt-get install -y \
    docker.io \
    git \
    curl \
    openjdk-17-jdk \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

RUN mkdir -p /usr/local/lib/docker/cli-plugins && \
    curl -SL "https://github.com/docker/compose/releases/latest/download/docker-compose-linux-x86_64" \
    -o /usr/local/lib/docker/cli-plugins/docker-compose && \
    chmod +x /usr/local/lib/docker/cli-plugins/docker-compose

RUN ln -s /usr/local/lib/docker/cli-plugins/docker-compose /usr/local/bin/docker-compose

ENV JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64