FROM node:16-alpine3.12

WORKDIR /app

COPY package*.json ./

RUN npm install 

COPY . .

RUN npm run build

RUN rm -rf node_modules/

RUN npm install --production

ADD dist dist

CMD [ "npm", "start" ]
