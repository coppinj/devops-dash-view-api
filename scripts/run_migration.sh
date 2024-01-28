#!/bin/bash

docker exec devops-dash-view-api-1 yarn typeorm-ts-node-commonjs migration:run -d dist/data-source.js
