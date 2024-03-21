#!/bin/bash

NAME='pipeline'

docker exec devops-dash-view-api-1 yarn typeorm-ts-node-commonjs migration:generate -d dist/data-source.js "migration/${NAME}"
