#!/bin/sh
. /root/jenkins/dockerrc

compose_file=$APPDIR/docker-compose.yaml
sed -i "s/frontend_production_code_.*$/frontend_production_code_$GIT_COMMIT/g" $compose_file
docker-compose -f $compose_file up -d