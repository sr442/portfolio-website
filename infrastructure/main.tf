terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

# -----------------------------------------------------------------------------
# S3 & CloudFront (Frontend)
# -----------------------------------------------------------------------------

resource "aws_s3_bucket" "frontend" {
  bucket_prefix = "portfolio-frontend-"
}

resource "aws_s3_bucket_website_configuration" "frontend" {
  bucket = aws_s3_bucket.frontend.id

  index_document {
    suffix = "index.html"
  }

  error_document {
    key = "404.html" # Next.js default error page
  }
}

resource "aws_s3_bucket_public_access_block" "frontend" {
  bucket = aws_s3_bucket.frontend.id

  block_public_acls       = false
  block_public_policy     = false // Allow public read policy
  ignore_public_acls      = false
  restrict_public_buckets = false
}

resource "aws_s3_bucket_policy" "frontend" {
  bucket = aws_s3_bucket.frontend.id
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid       = "PublicReadGetObject"
        Effect    = "Allow"
        Principal = "*"
        Action    = "s3:GetObject"
        Resource  = "${aws_s3_bucket.frontend.arn}/*"
      },
    ]
  })
  depends_on = [aws_s3_bucket_public_access_block.frontend]
}

resource "aws_cloudfront_distribution" "frontend" {
  origin {
    domain_name = aws_s3_bucket.frontend.bucket_regional_domain_name
    origin_id   = "S3-${aws_s3_bucket.frontend.id}"
  }

  enabled             = true
  is_ipv6_enabled     = true
  default_root_object = "index.html"

  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "S3-${aws_s3_bucket.frontend.id}"

    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    cloudfront_default_certificate = true
  }
}

# -----------------------------------------------------------------------------
# DynamoDB Tables
# -----------------------------------------------------------------------------

resource "aws_dynamodb_table" "contact_messages" {
  name           = "ContactMessages"
  billing_mode   = "PAY_PER_REQUEST"
  hash_key       = "message_id"

  attribute {
    name = "message_id"
    type = "S"
  }
}

resource "aws_dynamodb_table" "visitor_events" {
  name           = "VisitorEvents"
  billing_mode   = "PAY_PER_REQUEST"
  hash_key       = "event_id"

  attribute {
    name = "event_id"
    type = "S"
  }
}

resource "aws_dynamodb_table" "resume_metrics" {
  name           = "ResumeMetrics"
  billing_mode   = "PAY_PER_REQUEST"
  hash_key       = "metric_type"

  attribute {
    name = "metric_type"
    type = "S"
  }
}

# -----------------------------------------------------------------------------
# Lambda Functions
# -----------------------------------------------------------------------------

resource "aws_iam_role" "lambda_role" {
  name = "portfolio_lambda_role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "lambda.amazonaws.com"
        }
      },
    ]
  })
}

resource "aws_iam_role_policy" "lambda_dynamodb" {
  name = "portfolio_lambda_dynamodb"
  role = aws_iam_role.lambda_role.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = [
          "dynamodb:PutItem",
          "dynamodb:GetItem",
          "dynamodb:UpdateItem",
          "dynamodb:Scan",
          "dynamodb:Query"
        ]
        Effect   = "Allow"
        Resource = "*"
      },
      {
        Action = [
            "logs:CreateLogGroup",
            "logs:CreateLogStream",
            "logs:PutLogEvents"
        ]
        Effect = "Allow"
        Resource = "arn:aws:logs:*:*:*"
      }
    ]
  })
}

data "archive_file" "contact_zip" {
  type        = "zip"
  source_file = "../backend/lambda/contact-form/index.mjs"
  output_path = "contact_function.zip"
}

resource "aws_lambda_function" "contact_form" {
  filename         = data.archive_file.contact_zip.output_path
  function_name    = "portfolio-contact-form"
  role             = aws_iam_role.lambda_role.arn
  handler          = "index.handler"
  source_code_hash = data.archive_file.contact_zip.output_base64sha256
  runtime          = "nodejs18.x"
  
  environment {
    variables = {
      TABLE_NAME = aws_dynamodb_table.contact_messages.name
    }
  }
}

# (Similar for Visitor Analytics and Resume Counter - omitted for brevity in this snippet but would be included in full implementation)
# I will include them to be complete.

data "archive_file" "visitor_zip" {
  type        = "zip"
  source_file = "../backend/lambda/visitor-analytics/index.mjs"
  output_path = "visitor_function.zip"
}

resource "aws_lambda_function" "visitor_analytics" {
  filename         = data.archive_file.visitor_zip.output_path
  function_name    = "portfolio-visitor-analytics"
  role             = aws_iam_role.lambda_role.arn
  handler          = "index.handler"
  source_code_hash = data.archive_file.visitor_zip.output_base64sha256
  runtime          = "nodejs18.x"

  environment {
    variables = {
      TABLE_NAME = aws_dynamodb_table.visitor_events.name
    }
  }
}

data "archive_file" "resume_zip" {
  type        = "zip"
  source_file = "../backend/lambda/resume-counter/index.mjs"
  output_path = "resume_function.zip"
}

resource "aws_lambda_function" "resume_counter" {
  filename         = data.archive_file.resume_zip.output_path
  function_name    = "portfolio-resume-counter"
  role             = aws_iam_role.lambda_role.arn
  handler          = "index.handler"
  source_code_hash = data.archive_file.resume_zip.output_base64sha256
  runtime          = "nodejs18.x"

  environment {
    variables = {
      TABLE_NAME = aws_dynamodb_table.resume_metrics.name
    }
  }
}

# -----------------------------------------------------------------------------
# API Gateway (HTTP API)
# -----------------------------------------------------------------------------

resource "aws_apigatewayv2_api" "http_api" {
  name          = "portfolio-api"
  protocol_type = "HTTP"
  cors_configuration {
    allow_origins = ["*"] # Restrict this in production
    allow_methods = ["POST", "GET", "OPTIONS"]
    allow_headers = ["content-type"]
  }
}

resource "aws_apigatewayv2_stage" "default" {
  api_id      = aws_apigatewayv2_api.http_api.id
  name        = "$default"
  auto_deploy = true
}

# Contact Route
resource "aws_apigatewayv2_integration" "contact" {
  api_id           = aws_apigatewayv2_api.http_api.id
  integration_type = "AWS_PROXY"
  integration_uri  = aws_lambda_function.contact_form.invoke_arn
  payload_format_version = "2.0"
}

resource "aws_apigatewayv2_route" "contact" {
  api_id    = aws_apigatewayv2_api.http_api.id
  route_key = "POST /contact"
  target    = "integrations/${aws_apigatewayv2_integration.contact.id}"
}

resource "aws_lambda_permission" "api_gw_contact" {
  statement_id  = "AllowExecutionFromAPIGatewayContact"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.contact_form.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.http_api.execution_arn}/*/*/contact"
}

# Visitor Route
resource "aws_apigatewayv2_integration" "visitor" {
  api_id           = aws_apigatewayv2_api.http_api.id
  integration_type = "AWS_PROXY"
  integration_uri  = aws_lambda_function.visitor_analytics.invoke_arn
  payload_format_version = "2.0"
}

resource "aws_apigatewayv2_route" "visitor" {
  api_id    = aws_apigatewayv2_api.http_api.id
  route_key = "POST /visitor"
  target    = "integrations/${aws_apigatewayv2_integration.visitor.id}"
}

resource "aws_lambda_permission" "api_gw_visitor" {
  statement_id  = "AllowExecutionFromAPIGatewayVisitor"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.visitor_analytics.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.http_api.execution_arn}/*/*/visitor"
}

# Resume Route
resource "aws_apigatewayv2_integration" "resume" {
  api_id           = aws_apigatewayv2_api.http_api.id
  integration_type = "AWS_PROXY"
  integration_uri  = aws_lambda_function.resume_counter.invoke_arn
  payload_format_version = "2.0"
}

resource "aws_apigatewayv2_route" "resume" {
  api_id    = aws_apigatewayv2_api.http_api.id
  route_key = "POST /resume"
  target    = "integrations/${aws_apigatewayv2_integration.resume.id}"
}

resource "aws_lambda_permission" "api_gw_resume" {
  statement_id  = "AllowExecutionFromAPIGatewayResume"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.resume_counter.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.http_api.execution_arn}/*/*/resume"
}
