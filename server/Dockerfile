FROM node:22.15.0-slim

WORKDIR /app

COPY package*.json ./
RUN npm ci

RUN npm install -g nodemon

COPY . .

CMD ["nodemon", "--legacy-watch", "app.js"]
