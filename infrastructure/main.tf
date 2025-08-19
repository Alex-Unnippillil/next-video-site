terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = var.primary_region
}

provider "aws" {
  alias  = "dr"
  region = var.dr_region
}

# RDS instance with automated backups
resource "aws_db_instance" "app" {
  identifier              = var.db_identifier
  engine                  = "postgres"
  instance_class          = "db.t3.micro"
  allocated_storage       = 20
  username                = var.db_username
  password                = var.db_password
  skip_final_snapshot     = false
  backup_retention_period = 7
  backup_window           = "03:00-04:00"
  copy_tags_to_snapshot   = true
}

# DynamoDB table with point-in-time recovery
resource "aws_dynamodb_table" "app" {
  name         = var.ddb_table_name
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "id"

  attribute {
    name = "id"
    type = "S"
  }

  point_in_time_recovery {
    enabled = true
  }
}

# S3 buckets with cross-region replication
resource "aws_s3_bucket" "assets" {
  bucket = var.assets_bucket
  versioning {
    enabled = true
  }
}

resource "aws_s3_bucket" "assets_dr" {
  provider = aws.dr
  bucket   = "${var.assets_bucket}-dr"
  versioning {
    enabled = true
  }
}

data "aws_iam_policy_document" "replication_assume" {
  statement {
    actions = ["sts:AssumeRole"]
    principals {
      type        = "Service"
      identifiers = ["s3.amazonaws.com"]
    }
  }
}

resource "aws_iam_role" "replication" {
  name               = "${var.assets_bucket}-replication-role"
  assume_role_policy = data.aws_iam_policy_document.replication_assume.json
}

data "aws_iam_policy_document" "replication" {
  statement {
    actions   = ["s3:GetReplicationConfiguration", "s3:ListBucket"]
    resources = [aws_s3_bucket.assets.arn]
  }

  statement {
    actions   = ["s3:GetObjectVersion", "s3:GetObjectVersionAcl", "s3:GetObjectVersionForReplication", "s3:GetObjectVersionTagging"]
    resources = ["${aws_s3_bucket.assets.arn}/*"]
  }

  statement {
    actions   = ["s3:ReplicateObject", "s3:ReplicateDelete", "s3:ReplicateTags", "s3:GetObjectVersionTagging", "s3:List*"]
    resources = ["${aws_s3_bucket.assets_dr.arn}/*"]
  }
}

resource "aws_iam_role_policy" "replication" {
  role   = aws_iam_role.replication.id
  policy = data.aws_iam_policy_document.replication.json
}

resource "aws_s3_bucket_replication_configuration" "assets" {
  bucket = aws_s3_bucket.assets.id
  role   = aws_iam_role.replication.arn

  rule {
    id     = "dr"
    status = "Enabled"
    filter {}
    destination {
      bucket        = aws_s3_bucket.assets_dr.arn
      storage_class = "STANDARD"
    }
  }
}
