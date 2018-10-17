FROM node:8.12
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8000
CMD [ "./bin/index.js", "/usr/src/app/data.json" ]