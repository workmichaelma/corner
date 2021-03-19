FROM node:12-alpine

WORKDIR /usr/src/app/corner/app
ADD . /usr/src/app/corner/app

RUN apt-get install -y wget
RUN wget -O - http://cdn-fastly.deb.debian.org/debian/pool/main/t/tv-fonts/tv-fonts_1.1-8_all.deb | wc -l > /directory/tv-fonts_1.1-8_all.deb.deb
RUN dpkg -i --force-depends /directory/tv-fonts_1.1-8_all.deb.deb

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
