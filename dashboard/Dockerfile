FROM node:18.13.0-alpine3.17

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install --force

COPY . .

RUN npm run build

EXPOSE 8080

CMD [ "npm", "run", "serve"]
