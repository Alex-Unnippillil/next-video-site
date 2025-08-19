variable "primary_region" {
  description = "Primary AWS region"
  type        = string
  default     = "us-east-1"
}

variable "dr_region" {
  description = "Disaster recovery region"
  type        = string
  default     = "us-west-2"
}

variable "db_identifier" {
  description = "Identifier for the RDS instance"
  type        = string
}

variable "db_username" {
  description = "Master username for RDS"
  type        = string
}

variable "db_password" {
  description = "Master password for RDS"
  type        = string
  sensitive   = true
}

variable "ddb_table_name" {
  description = "Name of the DynamoDB table"
  type        = string
}

variable "assets_bucket" {
  description = "Name of the primary S3 bucket for assets"
  type        = string
}
