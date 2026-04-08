FROM richarvey/nginx-php-fpm:3.1.6

WORKDIR /var/www/html

COPY . /var/www/html

RUN apk add --no-cache bash sqlite sqlite-dev \
    && composer install --no-dev --optimize-autoloader \
    && mkdir -p storage/framework/views storage/framework/sessions storage/framework/cache/data bootstrap/cache database \
    && touch database/database.sqlite \
    && chown -R nginx:nginx /var/www/html \
    && chmod -R 775 storage bootstrap/cache database

COPY nginx.conf /etc/nginx/sites-available/default.conf
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

EXPOSE 8080

CMD ["/entrypoint.sh"]