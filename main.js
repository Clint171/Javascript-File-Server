const express = require('express');
const multer = require('multer');
const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');

// Load config
const config = JSON.parse(fs.readFileSync('config.json', 'utf8'));
const { accessKeyId, secretAccessKey, region, bucket } = config.aws;

const app = express();
const port = config.port || 3000;

// Configure AWS S3
const s3 = new AWS.S3({ accessKeyId, secretAccessKey, region });

// Multer for file uploads (stored in memory before sending to S3)
const upload = multer({ storage: multer.memoryStorage() });

// Upload new file
app.post('/upload', upload.single('file'), async (req, res) => {
  if (!req.file) return res.status(400).send('No file uploaded.');

  const params = {
    Bucket: bucket,
    Key: req.file.originalname,
    Body: req.file.buffer
  };

  try {
    await s3.upload(params).promise();
    res.send({ message: 'File uploaded successfully', filename: req.file.originalname });
  } catch (err) {
    res.status(500).send('Error uploading file: ' + err.message);
  }
});

// Download file
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
    if (err.code === 'NoSuchKey') {
      res.status(404).send('File not found.');
    } else {
      res.status(500).send('Error downloading file: ' + err.message);
    }
  }
});

// Update/replace existing file
app.put('/file/:filename', upload.single('file'), async (req, res) => {
  if (!req.file) return res.status(400).send('No file uploaded.');

  const params = {
    Bucket: bucket,
    Key: req.params.filename,
    Body: req.file.buffer
  };

  try {
    await s3.upload(params).promise();
    res.send({ message: 'File updated successfully', filename: req.params.filename });
  } catch (err) {
    res.status(500).send('Error updating file: ' + err.message);
  }
});

// Delete file
app.delete('/file/:filename', async (req, res) => {
  const params = {
    Bucket: bucket,
    Key: req.params.filename
  };

  try {
    await s3.deleteObject(params).promise();
    res.send({ message: 'File deleted successfully', filename: req.params.filename });
  } catch (err) {
    res.status(500).send('Error deleting file: ' + err.message);
  }
});

app.listen(port, () => {
  console.log(`File server running at http://localhost:${port}/`);
});
