FROM node:18.19.0

WORKDIR /app

COPY . .

RUN npm install

RUN npm install -g nodemon

CMD ["nodemon", "index.js"]