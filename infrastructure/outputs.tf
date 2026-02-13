output "api_url" {
  value = aws_apigatewayv2_api.http_api.api_endpoint
}

output "cloudfront_domain_name" {
  value = aws_cloudfront_distribution.frontend.domain_name
}

output "s3_bucket_name" {
  value = aws_s3_bucket.frontend.id
}
