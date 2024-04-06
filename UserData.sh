#!/bin/bash
set -e

GIT_REPO_URL="https://github.com/Lohit-Zeno/django-react-media-pro.git"

PROJECT_MAIN_DIR_NAME="django-react-media-pro"

git clone "$GIT_REPO_URL" "/home/ubuntu/$PROJECT_MAIN_DIR_NAME"

cd "/home/ubuntu/$PROJECT_MAIN_DIR_NAME"

chmod +x scripts/*.sh

./scripts/instance_os_dependencies.sh
./scripts/python_dependencies.sh
./scripts/gunicorn.sh
./scripts/nginx.sh
./scripts/start_app.sh
