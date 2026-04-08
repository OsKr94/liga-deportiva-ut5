#!/bin/sh
set -e

if [ ! -f /var/www/html/database/database.sqlite ]; then
  touch /var/www/html/database/database.sqlite
fi

php artisan config:clear || true
php artisan cache:clear || true
php artisan route:clear || true
php artisan view:clear || true
php artisan migrate --force || true

exec /start.sh