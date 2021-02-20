FROM node:15-alpine

WORKDIR /usr/src/app/corner/graphql

COPY package.json .

RUN npm install

COPY . .

EXPOSE 8084

CMD npm run start