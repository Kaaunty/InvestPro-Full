FROM node:20
RUN apt-get update && apt-get install -y default-mysql-client
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
COPY entrypoint.sh ./
RUN chmod +x entrypoint.sh
EXPOSE 3000
# Corrige o caminho do arquivo de entrada para node dist/src/server.js
CMD ["./entrypoint.sh"]
