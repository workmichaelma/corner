FROM node:14-alpine

WORKDIR /usr/src/app/corner/app
ADD . /usr/src/app/corner/app

# COPY package.json .
RUN npm install -g npm@latest --no-cache
RUN npm install --no-cache --legacy-peer-deps
RUN npm run build

COPY . .

EXPOSE 3000

# RUN npm run start
CMD npm run dev
# CMD [ "yarn", "start" ]
# CMD ["npm", "run", "start"]