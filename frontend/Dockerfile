FROM node:14-buster-slim as build-step

RUN mkdir -p /app
WORKDIR /app

COPY package*.json /app
RUN npm ci

COPY . /app
RUN npm run build

FROM nginx:stable

COPY --from=build-step /app/dist/* /usr/share/nginx/html