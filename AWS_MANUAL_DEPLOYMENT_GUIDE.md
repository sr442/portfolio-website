# AWS Manual Deployment Guide (No CLI Required)

If you prefer not to use the terminal/CLI, you can deploy everything using the **AWS Management Console** in your browser. This takes a bit more clicking but achieves the exact same result.

---

## Phase 1: Database (DynamoDB)

1. Go to **DynamoDB** in AWS Console.
2. Click **Create table**.
3. Create these 3 tables (leave default settings for everything else):
    *   **Table 1**: Name = `ContactMessages`, Partition key = `message_id` (String)
    *   **Table 2**: Name = `VisitorEvents`, Partition key = `event_id` (String)
    *   **Table 3**: Name = `ResumeMetrics`, Partition key = `metric_type` (String)

---

## Phase 2: Backend Logic (Lambda)

You need to create 3 functions. For each one:

1. Go to **Lambda** > **Create function**.
2. Select **Author from scratch**.
3. Runtime: **Node.js 18.x** (or later).
4. Architecture: **x86_64**.

### Function 1: `portfolio-contact-form`
1. Create function named `portfolio-contact-form`.
2. **Code**: Copy contents from `backend/lambda/contact-form/index.mjs` (in your local project).
3. **Configuration** > **Environment variables**:
    *   Key: `TABLE_NAME`, Value: `ContactMessages`
4. **Configuration** > **Permissions**:
    *   Click the execution role name.
    *   Attach policy `AmazonDynamoDBFullAccess` (or create a specific inline policy if you want strict security).

### Function 2: `portfolio-visitor-analytics`
1. Create function named `portfolio-visitor-analytics`.
2. **Code**: Copy contents from `backend/lambda/visitor-analytics/index.mjs`.
3. **Environment variables**: `TABLE_NAME` = `VisitorEvents`
4. **Permissions**: Add DynamoDB access role.

### Function 3: `portfolio-resume-counter`
1. Create function named `portfolio-resume-counter`.
2. **Code**: Copy contents from `backend/lambda/resume-counter/index.mjs`.
3. **Environment variables**: `TABLE_NAME` = `ResumeMetrics`
4. **Permissions**: Add DynamoDB access role.

---

## Phase 3: API (API Gateway)

1. Go to **API Gateway**.
2. Click **Create API** > **HTTP API** (Build).
3. Name it `portfolio-api`.
4. **Configure integrations**:
    *   Add integration > Lambda > `portfolio-contact-form`.
    *   Add integration > Lambda > `portfolio-visitor-analytics`.
    *   Add integration > Lambda > `portfolio-resume-counter`.
5. **Configure routes**:
    *   Method: `POST`, Resource path: `/contact`, Integration: `portfolio-contact-form`
    *   Method: `POST`, Resource path: `/visitor`, Integration: `portfolio-visitor-analytics`
    *   Method: `POST`, Resource path: `/resume`, Integration: `portfolio-resume-counter`
6. **Deploy**: It should auto-deploy to `$default` stage.
7. **Copy the Invoke URL**: It looks like `https://xyz123.execute-api.us-east-1.amazonaws.com`.

---

## Phase 4: Configure & Build Frontend

1. On your computer, open `components/Contact.tsx`.
2. Find the `handleSubmit` function. It currently has a `setTimeout` mock.
3. Replace the mock with a real fetch call to your API URL from step 3.7.
    ```typescript
    // Example for Contact.tsx
    await fetch('https://YOUR_API_ID.execute-api.us-east-1.amazonaws.com/contact', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    });
    ```
4. Run build command locally:
    ```bash
    npm run build
    ```
    This creates an `out/` folder in your project directory.

---

## Phase 5: Hosting (S3)

1. Go to **S3** > **Create bucket**.
2. Name: `your-unique-portfolio-name` (e.g., `shubhankar-portfolio-v1`).
3. **Uncheck** "Block all public access" (acknowledge the warning).
4. Create bucket.
5. Go to bucket > **Properties** > **Static website hosting** > Edit > **Enable**.
    *   Index document: `index.html`
    *   Error document: `404.html`
6. Go to bucket > **Permissions** > **Bucket policy**. Paste this (replace `YOUR_BUCKET_NAME`):
    ```json
    {
        "Version": "2012-10-17",
        "Statement": [
            {
                "Sid": "PublicReadGetObject",
                "Effect": "Allow",
                "Principal": "*",
                "Action": "s3:GetObject",
                "Resource": "arn:aws:s3:::YOUR_BUCKET_NAME/*"
            }
        ]
    }
    ```
7. Go to bucket > **Objects** > **Upload**.
8. Drag and drop the **contents** of your local `out/` folder (the files inside `out`, not the folder itself).

## Done! 🚀
Get your website URL from S3 > Properties > Static website hosting (at the bottom).
