# build environment
FROM node:18.0.0-alpine as build
WORKDIR /app
COPY . .
RUN yarn
RUN yarn build
# production environment
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY --from=build /app/nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 8081
ENTRYPOINT ["nginx"]
CMD ["-g", "daemon off;"]