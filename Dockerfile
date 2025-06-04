FROM node:18

WORKDIR /app

COPY main.js setup.sh ./

RUN npm init -y && npm install express aws-sdk multer dotenv express-rate-limit winston

RUN chmod +x setup.sh

EXPOSE 3000

CMD ["./setup.sh"]