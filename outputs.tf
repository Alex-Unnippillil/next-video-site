output "public_subnet_ids" {
  description = "IDs of public subnets"
  value       = [for s in aws_subnet.public : s.id]
}

output "stage_private_subnet_ids" {
  description = "IDs of stage private subnets"
  value       = [for s in aws_subnet.private_stage : s.id]
}

output "prod_private_subnet_ids" {
  description = "IDs of prod private subnets"
  value       = [for s in aws_subnet.private_prod : s.id]
}

output "stage_security_group_id" {
  description = "Stage security group ID"
  value       = aws_security_group.stage.id
}

output "prod_security_group_id" {
  description = "Prod security group ID"
  value       = aws_security_group.prod.id
}
