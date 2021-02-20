FROM node:15-alpine

WORKDIR /usr/src/app/corner/crawler

COPY package.json .

RUN npm install

COPY . .

EXPOSE 8082

CMD npm run start