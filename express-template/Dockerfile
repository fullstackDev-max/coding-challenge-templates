FROM node:alpine
MAINTAINER daniel@lightfeather.io
EXPOSE 8080
WORKDIR /home/node
COPY package.json .
RUN npm install
COPY *.js .
COPY ./controllers/ ./controllers
COPY ./routes/ ./routes
COPY ./middlewares/ ./middlewares
ENTRYPOINT ["node", "index.js"]
