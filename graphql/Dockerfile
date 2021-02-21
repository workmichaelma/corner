FROM node:12-alpine

WORKDIR /usr/src/app/corner/graphql

COPY package.json .

RUN npm install

COPY . .

EXPOSE 8084

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.2.1/wait /wait
RUN chmod +x /wait

CMD npm run start