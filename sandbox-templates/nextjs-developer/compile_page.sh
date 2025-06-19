#!/bin/bash
export NEXT_PUBLIC_POSTHOG_KEY=""
export NEXT_PUBLIC_POSTHOG_HOST=""

# This script runs during building the sandbox template
# and makes sure the Next.js app is (1) running and (2) the `/` page is compiled
function ping_server() {
	counter=0
	response=$(curl -s -o /dev/null -w "%{http_code}" "http://localhost:3000")
	while [[ ${response} -ne 200 ]]; do
	  let counter++
	  if  (( counter % 20 == 0 )); then
        echo "Waiting for server to start..."
        sleep 0.1
      fi

	  response=$(curl -s -o /dev/null -w "%{http_code}" "http://localhost:3000")
	done
}

# Добавляем проверку готовности API
wait_for_server() {
  for i in {1..10}; do
    curl -f http://localhost:3000/api/ready && return 0
    sleep $((i*i))
  done
  return 1
}

# Запускаем проверку перед стартом
wait_for_server || exit 1
cd /home/user && npx next --turbo
