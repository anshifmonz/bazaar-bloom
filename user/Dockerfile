FROM node:22.15.0-slim AS build
WORKDIR /app
RUN apt-get update \
 && apt-get install -y build-essential python3 \
 && rm -rf /var/lib/apt/lists/*
COPY package*.json ./
RUN npm ci
COPY . .

FROM node:22.15.0-slim
WORKDIR /app
RUN npm install -g nodemon
COPY --from=build /app /app
CMD ["nodemon", "--legacy-watch", "app.js"]
