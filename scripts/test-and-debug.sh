#!/bin/bash

IMAGE_NAME="devops-dash-view-back-test"
docker build --no-cache . -f .docker/test/Dockerfile -t $IMAGE_NAME
docker save $IMAGE_NAME > $IMAGE_NAME.tar.gz

docker load < $IMAGE_NAME.tar.gz
docker run -it $IMAGE_NAME:latest