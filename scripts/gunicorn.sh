#!/usr/bin/bash

PROJECT_MAIN_DIR_NAME="django-react-media-pro"

sudo cp "/home/ubuntu/$PROJECT_MAIN_DIR_NAME/gunicorn/gunicorn.socket" "/etc/systemd/system/gunicorn.socket"
sudo cp "/home/ubuntu/$PROJECT_MAIN_DIR_NAME/gunicorn/gunicorn.service" "/etc/systemd/system/gunicorn.service"

sudo systemctl start gunicorn.service
sudo systemctl enable gunicorn.service
