#!/bin/bash

docker exec devops-dash-view-db-1 psql -U dash-view -d dash-view -c "DROP SCHEMA public CASCADE; CREATE SCHEMA public;"

find ../migration -type f -name '[0-9]*-*.ts' -delete
find ../dist/migration -type f -name '[0-9]*-*.ts' -delete

./generate_migration.sh

sleep 3

./run_migration.sh

sleep 1

curl "http://localhost:49001/public/seed"
