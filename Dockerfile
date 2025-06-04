FROM node:18

WORKDIR /app

COPY main.js .env ./

RUN npm init -y && npm install express aws-sdk multer dotenv express-rate-limit winston

EXPOSE 3000

CMD ["node", "main.js"]
