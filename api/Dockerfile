FROM node:15-alpine

WORKDIR /usr/src/app/corner/api

COPY package.json .

RUN npm install

COPY . .

EXPOSE 8083

CMD npm run start