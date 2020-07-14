FROM node:14
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci
COPY ./lib ./lib
RUN ls -la
EXPOSE 8000
CMD ["node", "./lib/index.js", "/usr/src/app/data.json" ]
