#!/usr/bin/bash

PROJECT_MAIN_DIR_NAME="django-react-media-pro"

FOLDER_NAME_WHERE_SETTINGS_FILE_EXISTS="core"

sudo systemctl daemon-reload

sudo rm -f /etc/nginx/sites-enabled/default

sudo cp "/home/ubuntu/$PROJECT_MAIN_DIR_NAME/nginx/nginx.conf" "/etc/nginx/sites-available/$FOLDER_NAME_WHERE_SETTINGS_FILE_EXISTS"

sudo ln -s "/etc/nginx/sites-available/$FOLDER_NAME_WHERE_SETTINGS_FILE_EXISTS" "/etc/nginx/sites-enabled/"

sudo gpasswd -a www-data ubuntu

sudo systemctl restart nginx
