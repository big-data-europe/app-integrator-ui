FROM nginx:1

MAINTAINER Aad Versteden <madnificent@gmail.com>

COPY package.json /package.json

RUN apt-get update \
    && apt-get upgrade -y \
    && apt-get install -y unzip wget \
    && ln -s /usr/share/nginx/html /app \
    && cd /app \
    && wget https://github.com/big-data-europe/app-integrator-ui/releases/download/v$(cat /package.json | grep version | head -n 1 | awk -F: '{ print $2 }' | sed 's/[ ",]//g')/dist.zip \
    && cd /app \
    && unzip dist.zip \
    && mv dist/* . \
    && rm /app/dist.zip /package.json