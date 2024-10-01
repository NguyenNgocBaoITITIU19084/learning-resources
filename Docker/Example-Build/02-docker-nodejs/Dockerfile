FROM node:16-alpine

WORKDIR /deploy-nodejs

COPY package.json package-lock.json ./

EXPOSE 3000

RUN npm install

COPY . .

CMD [ "node", "./src/server.js" ]