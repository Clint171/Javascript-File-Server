#!/bin/bash

set -e

# Function to check if a variable is set
require_env_var() {
  VAR_NAME="$1"
  if [ -z "${!VAR_NAME}" ]; then
    echo "❌ Error: $VAR_NAME is not set. Please pass it with -e or from your deployment system."
    exit 1
  fi
}

# Required environment variables
require_env_var "PORT"
require_env_var "AWS_ACCESS_KEY_ID"
require_env_var "AWS_SECRET_ACCESS_KEY"
require_env_var "AWS_REGION"
require_env_var "AWS_BUCKET"
require_env_var "API_KEY"

# Write the .env file (not strictly needed, but some libraries use it)
cat <<EOF > .env
PORT=${PORT}
AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY_ID}
AWS_SECRET_ACCESS_KEY=${AWS_SECRET_ACCESS_KEY}
AWS_REGION=${AWS_REGION}
AWS_BUCKET=${AWS_BUCKET}
API_KEY=${API_KEY}
EOF

echo "✅ Environment successfully configured. Starting server..."
exec node main.js
