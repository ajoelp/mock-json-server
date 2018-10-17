#!/usr/bin/env bash
export branch_name="${BRANCH_NAME:-local}"
export image_name="ajoelpod/mock-json-server"
docker build -f Dockerfile -t $image_name:$branch_name .