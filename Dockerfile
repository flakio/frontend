FROM nginx

ARG build_number

COPY src /usr/share/nginx/html

LABEL version=$build_number