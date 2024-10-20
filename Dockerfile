FROM node:20.18

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install --omit=dev
COPY . .

CMD ["npm", "run", "start:prod"]