terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = var.region
}

variable "region" {
  description = "AWS region"
  type        = string
  default     = "us-east-1"
}

variable "vpc_id" {
  type = string
}

variable "subnet_ids" {
  type = list(string)
}

variable "security_group_ids" {
  type = list(string)
}

resource "aws_ecs_cluster" "ssr" {
  name = "ssr-cluster"
}

resource "aws_lb" "ssr" {
  name               = "ssr-alb"
  internal           = false
  load_balancer_type = "application"
  security_groups    = var.security_group_ids
  subnets            = var.subnet_ids
}

resource "aws_lb_target_group" "ssr" {
  name        = "ssr-tg"
  port        = 3000
  protocol    = "HTTP"
  target_type = "ip"
  vpc_id      = var.vpc_id

  health_check {
    path                = "/"
    interval            = 30
    healthy_threshold   = 3
    unhealthy_threshold = 2
    timeout             = 5
    matcher             = "200-399"
  }
}

resource "aws_lb_listener" "http" {
  load_balancer_arn = aws_lb.ssr.arn
  port              = "80"
  protocol          = "HTTP"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.ssr.arn
  }
}

resource "aws_ecs_task_definition" "ssr" {
  family                   = "ssr-task"
  requires_compatibilities = ["FARGATE"]
  network_mode             = "awsvpc"
  cpu                      = "256"
  memory                   = "512"

  container_definitions = jsonencode([
    {
      name      = "ssr"
      image     = var.image
      essential = true
      portMappings = [
        {
          containerPort = 3000
          hostPort      = 3000
          protocol      = "tcp"
        }
      ]
    }
  ])
}

variable "image" {
  description = "Container image URI"
  type        = string
}

resource "aws_ecs_service" "ssr" {
  name            = "ssr-service"
  cluster         = aws_ecs_cluster.ssr.id
  task_definition = aws_ecs_task_definition.ssr.arn
  desired_count   = 1
  launch_type     = "FARGATE"

  network_configuration {
    subnets          = var.subnet_ids
    security_groups  = var.security_group_ids
    assign_public_ip = true
  }

  load_balancer {
    target_group_arn = aws_lb_target_group.ssr.arn
    container_name   = "ssr"
    container_port   = 3000
  }

  depends_on = [aws_lb_listener.http]
}

resource "aws_appautoscaling_target" "ssr" {
  max_capacity       = 10
  min_capacity       = 1
  resource_id        = "service/${aws_ecs_cluster.ssr.name}/${aws_ecs_service.ssr.name}"
  scalable_dimension = "ecs:service:DesiredCount"
  service_namespace  = "ecs"
}

resource "aws_appautoscaling_policy" "cpu" {
  name               = "cpu-target-tracking"
  policy_type        = "TargetTrackingScaling"
  resource_id        = aws_appautoscaling_target.ssr.resource_id
  scalable_dimension = aws_appautoscaling_target.ssr.scalable_dimension
  service_namespace  = aws_appautoscaling_target.ssr.service_namespace

  target_tracking_scaling_policy_configuration {
    predefined_metric_specification {
      predefined_metric_type = "ECSServiceAverageCPUUtilization"
    }
    target_value = 50
  }
}

resource "aws_appautoscaling_policy" "requests" {
  name               = "request-target-tracking"
  policy_type        = "TargetTrackingScaling"
  resource_id        = aws_appautoscaling_target.ssr.resource_id
  scalable_dimension = aws_appautoscaling_target.ssr.scalable_dimension
  service_namespace  = aws_appautoscaling_target.ssr.service_namespace

  target_tracking_scaling_policy_configuration {
    predefined_metric_specification {
      predefined_metric_type = "ALBRequestCountPerTarget"
      resource_label         = "${aws_lb.ssr.arn_suffix}/${aws_lb_target_group.ssr.arn_suffix}"
    }
    target_value = 1000
  }
}
