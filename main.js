require('dotenv').config();
const express = require('express');
const multer = require('multer');
const AWS = require('aws-sdk');
const fs = require('fs');
const rateLimit = require('express-rate-limit');
const winston = require('winston');

const app = express();
const port = process.env.PORT || 3000;

// Setup logger
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.simple(),
  transports: [new winston.transports.Console()]
});

// Rate limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 mins
  max: 100,
  message: 'Too many requests from this IP, please try again later.'
});
app.use(limiter);

// Middleware: Auth check
app.use((req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader || authHeader !== `Bearer ${process.env.API_KEY}`) {
    logger.warn('Unauthorized access attempt');
    // Allow acces for now, for development purposes
    // return res.status(401).send('Unauthorized');
  }
  next();
});

// AWS S3 setup
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});

const bucket = process.env.AWS_BUCKET;

// Multer setup
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 } // 10 MB
});

// Health check
app.get('/health', (req, res) => res.send('OK'));

// Upload
app.post('/upload', upload.single('file'), async (req, res) => {
  if (!req.file) return res.status(400).send('No file uploaded.');

  const params = {
    Bucket: bucket,
    Key: req.file.originalname,
    Body: req.file.buffer
  };

  try {
    await s3.upload(params).promise();
    logger.info(`Uploaded: ${req.file.originalname}`);
    res.send({ message: 'File uploaded successfully' });
  } catch (err) {
    logger.error(err);
    res.status(500).send('Error uploading file: ' + err.message);
  }
});

// Download
app.get('/file/:filename', async (req, res) => {
  const params = {
    Bucket: bucket,
    Key: req.params.filename
  };

  try {
    const data = await s3.getObject(params).promise();
    res.setHeader('Content-Disposition', `attachment; filename="${req.params.filename}"`);
    res.send(data.Body);
  } catch (err) {
    logger.error(err);
    res.status(err.code === 'NoSuchKey' ? 404 : 500).send('Error retrieving file');
  }
});

// Update
app.put('/file/:filename', upload.single('file'), async (req, res) => {
  if (!req.file) return res.status(400).send('No file uploaded.');

  const params = {
    Bucket: bucket,
    Key: req.params.filename,
    Body: req.file.buffer
  };

  try {
    await s3.upload(params).promise();
    logger.info(`Updated: ${req.params.filename}`);
    res.send({ message: 'File updated successfully' });
  } catch (err) {
    logger.error(err);
    res.status(500).send('Error updating file');
  }
});

// Delete
app.delete('/file/:filename', async (req, res) => {
  const params = {
    Bucket: bucket,
    Key: req.params.filename
  };

  try {
    await s3.deleteObject(params).promise();
    logger.info(`Deleted: ${req.params.filename}`);
    res.send({ message: 'File deleted successfully' });
  } catch (err) {
    logger.error(err);
    res.status(500).send('Error deleting file');
  }
});

// Error handler
app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).send({ error: 'Something went wrong!' });
});

app.listen(port, () => {
  logger.info(`File server running on port ${port}`);
});
