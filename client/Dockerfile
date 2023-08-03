FROM node:18.13.0-alpine3.17

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 8000


CMD [ "npm", "run", "serve"]
