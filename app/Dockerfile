FROM node:10-slim

RUN apt-get update -y && apt-get install -y bash git

WORKDIR /usr/src/app/corner/app

COPY package.json .
RUN npm install

COPY . .

EXPOSE 3000

CMD npm run start
