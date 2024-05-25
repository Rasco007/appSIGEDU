# Establece los argumentos
ARG IMG_VERSION

# Use la imagen oficial de PHP según el argumento
FROM php:${IMG_VERSION}

#Instala paquetes necesarios, limpia la memoria y archivos temporales, y habilita extensiones PHP
RUN apt-get update && apt-get install -y -y --no-install-recommends \
    unzip \
    libfreetype6-dev \
    libjpeg62-turbo-dev \
    libpng-dev \
    libaio1 \
    libicu-dev \
    zlib1g-dev \
    libzip-dev \
    libwebp-dev \
    libxml2-dev \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* \
    && rm -rf /var/lib/{apt,dpkg,cache,log} \
    && curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer \
    && docker-php-ext-configure gd --with-freetype --with-jpeg --with-webp \
    && docker-php-ext-install -j$(nproc) gd zip intl mysqli pdo pdo_mysql soap

# Config Apache
COPY /dockerfiles/config/000-default.conf /etc/apache2/sites-enabled/000-default.conf
COPY /dockerfiles/config/apache2.conf /etc/apache2/apache2.conf
RUN a2enmod rewrite
RUN service apache2 restart

# Crea el directorio de trabajo y copia los archivos
WORKDIR /sistema
COPY . .

# Ejecuta el comando de instalación de paquetes de Composer
RUN composer install

# Otorga permisos de lectura, escritura y ejecución
RUN chown -R www-data:www-data /sistema/public /sistema/writable

# Expone los puertos
EXPOSE 80 443