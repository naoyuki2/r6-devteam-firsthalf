FROM node:20-alpine3.19
WORKDIR /api
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3030
CMD ["npm", "start"]
