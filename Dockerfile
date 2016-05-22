FROM nginx:1.10.0-alpine

ARG build_number

COPY src /usr/share/nginx/html

LABEL version=$build_number