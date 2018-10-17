#!/usr/bin/env bash
export branch_name="${BRANCH_NAME:-local}"
export image_name="ajoelpod/mock-json-server"

docker push $image_name:$branch_name
if [ "${branch_name}" = "master" ]; then
  docker tag $image_name:$branch_name $image_name:latest
  docker push $image_name:latest
fi

docker rmi $image_name:$branch_name --force