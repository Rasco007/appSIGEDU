#!/bin/bash
docker-compose -f ./dockerfiles/docker-compose.yml down
docker image rm sigedu-mobile-frmwk
docker-compose -f ./dockerfiles/docker-compose.yml up -d --build