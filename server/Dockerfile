FROM node:18.13.0-alpine3.17

ENV APP_URL=https://gotruck.online

WORKDIR /app

COPY package*.json  ./

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]