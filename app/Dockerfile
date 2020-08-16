FROM node:10-slim

WORKDIR /usr/src/app/corner/app

COPY package.json .
RUN npm install
# RUN npm run build

COPY . .

EXPOSE 3000

# RUN npm run start
CMD npm run dev