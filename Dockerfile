FROM node:20.18

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install --omit=dev
COPY . .

RUN chmod +x ./wait-for-it.sh

CMD ["npm", "run", "start:prod"]