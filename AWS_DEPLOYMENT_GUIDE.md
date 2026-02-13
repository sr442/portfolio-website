# AWS Deployment Guide

This guide details how to deploy the AI/ML Portfolio Website to AWS Free Tier using Terraform.

## Prerequisites

- **AWS CLI**: Installed and configured (`aws configure` with your credentials).
- **Terraform**: Installed (v1.0+).
- **Node.js**: Installed (v18+).

## Step 1: Build Frontend

First, generate the static export of the Next.js application.

```bash
cd portfolio-website
npm ci
npm run build
# This creates an 'out/' directory with the static site
```

## Step 2: Deploy Infrastructure

Initialize and apply the Terraform configuration to create S3 buckets, CloudFront distribution, DynamoDB tables, and Lambda functions.

```bash
cd infrastructure
terraform init
terraform plan -out=tfplan
terraform apply tfplan
```

> **Note**: This will output the `s3_bucket_name`, `cloudfront_domain_name`, and `api_url`. Keep these handy.

## Step 3: Configure Frontend with API URL

The frontend needs to know the API Gateway URL. 
Create a `.env.production` file in the `portfolio-website` root *before* building in Step 1 if you want to bake it in, OR update the components to use the output URL.

*Currently, the components use relative paths or mocks. To fully integrate:*
1. Update `components/Contact.tsx`, `ChatInterface.tsx` to point to the `api_url` from Terraform.
2. Re-run `npm run build`.

## Step 4: Upload to S3

Sync the static build files to the S3 bucket created by Terraform.

```bash
# Replace YOUR_BUCKET_NAME with the s3_bucket_name output from Terraform
aws s3 sync ../out s3://YOUR_BUCKET_NAME --delete
```

## Step 5: Invalidate CloudFront (Optional but Recommended)

To ensure users see the latest version immediately:

```bash
# Replace DISTRIBUTION_ID with your CloudFront Distribution ID
aws cloudfront create-invalidation --distribution-id YOUR_DIST_ID --paths "/*"
```

## Verification

Visit your CloudFront domain (e.g., `https://d1234.cloudfront.net`) to see your live portfolio!
