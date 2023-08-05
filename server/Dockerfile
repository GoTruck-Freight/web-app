FROM node:lts-alpine

ENV APP_URL=https://gotruck.online

WORKDIR /usr/app

COPY package*.json  ./

RUN npm install

COPY . .

EXPOSE 3000
#RUN npm run build

CMD [ "npm", "start" ]