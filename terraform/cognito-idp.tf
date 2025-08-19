resource "aws_cognito_user_pool" "this" {
  name = "next-video-site"

  schema {
    attribute_data_type = "String"
    name                = "email"
    required            = true
  }

  schema {
    attribute_data_type = "String"
    name                = "name"
    required            = true
  }
}

resource "aws_cognito_user_pool_client" "web" {
  name         = "web"
  user_pool_id = aws_cognito_user_pool.this.id

  supported_identity_providers = ["COGNITO", "Google", "Apple"]
  callback_urls                = ["https://example.com/login"]
  logout_urls                  = ["https://example.com/"]
}

resource "aws_cognito_identity_provider" "google" {
  user_pool_id  = aws_cognito_user_pool.this.id
  provider_name = "Google"
  provider_type = "Google"

  attribute_mapping = {
    email = "email"
    name  = "name"
  }

  provider_details = {
    client_id       = var.google_client_id
    client_secret   = var.google_client_secret
    authorize_scopes = "openid email profile"
  }
}

resource "aws_cognito_identity_provider" "apple" {
  user_pool_id  = aws_cognito_user_pool.this.id
  provider_name = "Apple"
  provider_type = "Apple"

  attribute_mapping = {
    email = "email"
    name  = "name"
  }

  provider_details = {
    client_id       = var.apple_client_id
    team_id         = var.apple_team_id
    key_id          = var.apple_key_id
    private_key     = var.apple_private_key
    authorize_scopes = "name email"
  }
}
