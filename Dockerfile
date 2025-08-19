FROM node:alpine
  # checkov:skip=CKV_DOCKER_3: ADD REASON
  # checkov:skip=CKV_DOCKER_2: ADD REASON
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
EXPOSE 9090
CMD [ "npm", "start" ]