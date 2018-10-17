#!/usr/bin/env bash
export branch_name="${BRANCH_NAME:-local}"
export image_name="ajoelpod/mock-json-server"
docker run --detach=false -e --rm $image_name:$branch_name npm run lint
docker run --detach=false -e --rm $image_name:$branch_name npm run test