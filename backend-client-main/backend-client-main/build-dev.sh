#!/bin/bash
docker-compose -f ./dockerfiles/docker-compose.yml down
docker image rm sigedu-mobile-client
docker-compose -f ./dockerfiles/docker-compose.yml up -d --build