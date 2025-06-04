# Javascript File Server

A file server written in node.js, leveraging AWS S3 for storage.# 📁 File Server Microservice

This is a Node.js-based file server microservice that allows users to upload, download, update, and delete files using an AWS S3 bucket. It is built for deployment using Docker.

## 🚀 Features

- Upload, download, update, and delete files
- File storage in AWS S3
- Secure with API key
- Rate limiting for abuse prevention
- Logging via Winston
- Health check endpoint
- Environment-based configuration
- Docker-ready
- Swagger/OpenAPI documentation

---

## 🧱 Requirements

- Node.js (if running outside Docker)
- Docker (recommended)
- AWS S3 Bucket and credentials
- An API key (used as a bearer token)

---

## 🛠 Environment Variables

These must be provided using `-e` flags or a deployment system:

| Variable              | Description                       |
|-----------------------|-----------------------------------|
| `PORT`               | Port to run the service on        |
| `AWS_ACCESS_KEY_ID`  | Your AWS access key               |
| `AWS_SECRET_ACCESS_KEY` | Your AWS secret key            |
| `AWS_REGION`         | AWS region of the bucket          |
| `AWS_BUCKET`         | Your S3 bucket name               |
| `API_KEY`            | API key for authentication        |

---

## 🐳 Running with Docker

### 1. Build the image:

```bash
docker build -t file-server .
