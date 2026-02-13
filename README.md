# AI & Time Series Portfolio Website

![Build Status](https://github.com/sr442/portfolio-website/actions/workflows/deploy_frontend.yml/badge.svg)

A serverless portfolio website built with Next.js, diverse AWS services (Lambda, DynamoDB, API Gateway), and Terraform.

## Features

- **Frontend**: Next.js 14, Tailwind CSS, Framer Motion, Recharts.
- **Backend**: AWS Lambda (Node.js), API Gateway.
- **Database**: DynamoDB (On-Demand).
- **Infrastructure**: Managing via Terraform.
- **CI/CD**: GitHub Actions for automated deployment to S3.

## Deployment

This project auto-deploys to AWS S3 on every push to `main`.

### Prerequisites for CI/CD

Ensure you have added the following Secrets to your GitHub Repository:

- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `S3_BUCKET_NAME`
- `AWS_REGION` (optional, defaults to us-east-1)

*Permission Note: The IAM User must have `AmazonS3FullAccess` policy attached.*
