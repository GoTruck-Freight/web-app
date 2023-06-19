FROM node:18.13.0-alpine3.17

ENV PORT=8080 \
    INDEX_PAGE_URL=https://gotruck.online \
    VUE_APP_API_URL=https://api.gotruck.online \
    RIDE_APP_URL='https://ride.gotruck.online'

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 8080


CMD [ "npm", "run", "serve"]
