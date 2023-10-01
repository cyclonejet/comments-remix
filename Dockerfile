FROM node:18-alpine

WORKDIR /usr/server/app

COPY ./package.json ./
COPY ./prisma ./prisma
COPY .env ./
COPY tsconfig.json ./
COPY ./ .

RUN npm install
RUN npx prisma generate && npx prisma migrate deploy

RUN npm run build
ENV NODE_ENV=production

CMD ["npm", "run", "start"]