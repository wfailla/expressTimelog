FROM node:lts as build-step

RUN mkdir -p /app
WORKDIR /app

COPY package.json /app
RUN npm install

COPY . /app
RUN npm run build

FROM nginx:stable

COPY --from=build-step /app/dist/* /usr/share/nginx/html