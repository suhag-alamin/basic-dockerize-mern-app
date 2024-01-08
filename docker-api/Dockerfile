FROM node:21.5.0-alpine3.19

RUN addgroup app && adduser -S -G app app

USER app

WORKDIR /app

COPY package*.json yarn.lock ./

RUN yarn install

COPY . .

EXPOSE 5000

CMD [ "yarn", "dev" ]