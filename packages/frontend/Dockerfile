FROM node:22.17.1-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build --prod

FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/*

COPY --from=build --chown=nginx:nginx /app/dist/english-to-learn/browser/ /usr/share/nginx/html/

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
