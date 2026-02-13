# Connecting GitHub to AWS (CI/CD Setup)

To automatically deploy your website whenever you push to GitHub, follow these 3 steps.

## Step 1: Create AWS Access Keys (If you haven't already)

You need a "username" and "password" for GitHub to talk to AWS.

1.  Log in to **AWS Console**.
2.  Go to **IAM** (Identity and Access Management).
3.  Click **Users** > **Create user**.
    *   Name: `github-actions-user`
4.  Click **Next**.
5.  **Permissions**: Select "Attach policies directly".
6.  Search for and check: `AmazonS3FullAccess`.
    *   *(Note: For better security, you can restrict this later, but this enables it to work immediately)*.
7.  Click **Next** > **Create user**.
8.  Click on the newly created user `github-actions-user`.
9.  Go to **Security credentials** tab.
10. Scroll to **Access keys**. Click **Create access key**.
11. Select **Command Line Interface (CLI)** > Check confirmation > **Next** > **Create access key**.
12. **IMPORTANT**: Copy the **Access key ID** and **Secret access key**. You won't see the secret one again!

## Step 2: Add Secrets to GitHub

1.  Go to your GitHub repository: [https://github.com/sr442/portfolio-website](https://github.com/sr442/portfolio-website)
2.  Click **Settings** > **Secrets and variables** > **Actions**.
3.  Click **New repository secret**.
4.  Add these 3 secrets (copy values exactly):

    | Name | Value |
    | :--- | :--- |
    | `AWS_ACCESS_KEY_ID` | The Key ID you just copied (starts with AKIA...) |
    | `AWS_SECRET_ACCESS_KEY` | The Secret Key you just copied (long string) |
    | `S3_BUCKET_NAME` | The exact name of your S3 bucket (e.g., `shubhankar-portfolio-v1`) |
    | `AWS_REGION` | `us-east-1` (Optional, defaults to us-east-1 in workflow) |

## Step 3: Trigger a Deploy

1.  I have already added the workflow file (`.github/workflows/deploy_frontend.yml`) to your code.
2.  Once you add the secrets above, the *next* time you push code, it will auto-deploy.
3.  To test it now, you can make a small change (like editing `README.md` on GitHub) and commit it.
4.  Go to the **Actions** tab in your repo to watch the deployment happen!
