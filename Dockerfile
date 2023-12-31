FROM node:20-alpine

WORKDIR /app

COPY .env.development.local package.json yarn.lock ./

RUN yarn

COPY . .

EXPOSE 3000

CMD ["yarn", "start:dev"]
