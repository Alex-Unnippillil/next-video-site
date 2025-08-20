terraform {
  required_version = ">= 1.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = ">= 5.0"
    }
  }
}

provider "aws" {
  region = var.region
}

data "aws_availability_zones" "available" {}

locals {
  azs = slice(data.aws_availability_zones.available.names, 0, 3)
}

resource "aws_vpc" "main" {
  cidr_block           = var.vpc_cidr
  enable_dns_support   = true
  enable_dns_hostnames = true
  tags = {
    Name = "${var.project}-vpc"
  }
}

resource "aws_internet_gateway" "igw" {
  vpc_id = aws_vpc.main.id
  tags = {
    Name = "${var.project}-igw"
  }
}

resource "aws_subnet" "public" {
  for_each                = { for idx, az in local.azs : az => idx }
  vpc_id                  = aws_vpc.main.id
  cidr_block              = cidrsubnet(var.vpc_cidr, 4, each.value)
  availability_zone       = each.key
  map_public_ip_on_launch = true
  tags = {
    Name = "${var.project}-public-${each.key}"
  }
}

resource "aws_subnet" "private_stage" {
  for_each                = { for idx, az in local.azs : az => idx }
  vpc_id                  = aws_vpc.main.id
  cidr_block              = cidrsubnet(var.vpc_cidr, 4, each.value + 3)
  availability_zone       = each.key
  map_public_ip_on_launch = false
  tags = {
    Name = "${var.project}-stage-${each.key}"
  }
}

resource "aws_subnet" "private_prod" {
  for_each                = { for idx, az in local.azs : az => idx }
  vpc_id                  = aws_vpc.main.id
  cidr_block              = cidrsubnet(var.vpc_cidr, 4, each.value + 6)
  availability_zone       = each.key
  map_public_ip_on_launch = false
  tags = {
    Name = "${var.project}-prod-${each.key}"
  }
}

resource "aws_eip" "nat_stage" {
  domain = "vpc"
  tags = {
    Name = "${var.project}-nat-stage-eip"
  }
}

resource "aws_eip" "nat_prod" {
  domain = "vpc"
  tags = {
    Name = "${var.project}-nat-prod-eip"
  }
}

resource "aws_nat_gateway" "stage" {
  allocation_id = aws_eip.nat_stage.id
  subnet_id     = aws_subnet.public[local.azs[0]].id
  tags = {
    Name = "${var.project}-nat-stage"
  }
  depends_on = [aws_internet_gateway.igw]
}

resource "aws_nat_gateway" "prod" {
  allocation_id = aws_eip.nat_prod.id
  subnet_id     = aws_subnet.public[local.azs[0]].id
  tags = {
    Name = "${var.project}-nat-prod"
  }
  depends_on = [aws_internet_gateway.igw]
}

resource "aws_route_table" "public" {
  vpc_id = aws_vpc.main.id
  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.igw.id
  }
  tags = {
    Name = "${var.project}-public-rt"
  }
}

resource "aws_route_table" "stage" {
  vpc_id = aws_vpc.main.id
  route {
    cidr_block     = "0.0.0.0/0"
    nat_gateway_id = aws_nat_gateway.stage.id
  }
  tags = {
    Name = "${var.project}-stage-rt"
  }
}

resource "aws_route_table" "prod" {
  vpc_id = aws_vpc.main.id
  route {
    cidr_block     = "0.0.0.0/0"
    nat_gateway_id = aws_nat_gateway.prod.id
  }
  tags = {
    Name = "${var.project}-prod-rt"
  }
}

resource "aws_route_table_association" "public" {
  for_each       = aws_subnet.public
  subnet_id      = each.value.id
  route_table_id = aws_route_table.public.id
}

resource "aws_route_table_association" "stage" {
  for_each       = aws_subnet.private_stage
  subnet_id      = each.value.id
  route_table_id = aws_route_table.stage.id
}

resource "aws_route_table_association" "prod" {
  for_each       = aws_subnet.private_prod
  subnet_id      = each.value.id
  route_table_id = aws_route_table.prod.id
}

resource "aws_security_group" "stage" {
  name        = "${var.project}-stage-sg"
  description = "Stage default security group"
  vpc_id      = aws_vpc.main.id

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "${var.project}-stage-sg"
  }
}

resource "aws_security_group" "prod" {
  name        = "${var.project}-prod-sg"
  description = "Prod default security group"
  vpc_id      = aws_vpc.main.id

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "${var.project}-prod-sg"
  }
}

resource "aws_vpc_endpoint" "s3" {
  vpc_id            = aws_vpc.main.id
  service_name      = "com.amazonaws.${var.region}.s3"
  vpc_endpoint_type = "Gateway"
  route_table_ids   = [aws_route_table.stage.id, aws_route_table.prod.id]
  tags = {
    Name = "${var.project}-s3-endpoint"
  }
}

resource "aws_vpc_endpoint" "dynamodb" {
  vpc_id            = aws_vpc.main.id
  service_name      = "com.amazonaws.${var.region}.dynamodb"
  vpc_endpoint_type = "Gateway"
  route_table_ids   = [aws_route_table.stage.id, aws_route_table.prod.id]
  tags = {
    Name = "${var.project}-dynamodb-endpoint"
  }
}

