FROM node:20-alpine as seplag-pessoas-desaparecidas

ENV NODE_OPTIONS="--max_old_space_size=4096"

WORKDIR /app

COPY . /app/

WORKDIR /app

RUN yarn install
RUN yarn generate

# Etapa 2: Servir com o Nginx
FROM nginx:1.22.1-alpine as runtime


RUN rm -rf /usr/share/nginx/html/*

COPY --from=seplag-pessoas-desaparecidas /app/nginx.conf  /etc/nginx/nginx.conf
COPY --from=seplag-pessoas-desaparecidas /app/.output/public /usr/share/nginx/html

EXPOSE 9090

CMD ["nginx", "-g", "daemon off;"]
