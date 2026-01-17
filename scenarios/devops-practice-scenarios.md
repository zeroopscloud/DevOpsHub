1) Kubernetes CrashLoopBackOff due to Resource Limits

Problem Statement:
A microservice pod keeps restarting with CrashLoopBackOff.

Expected Output:
•Identify root cause
•Fix resource limits
•Improve stability and monitoring

Suggested Approach:
•Check kubectl describe pod
•Check kubectl logs
•Adjust CPU/memory requests & limits
•Add liveness and readiness probes
•Add monitoring alerts

Tools Involved:
Kubernetes, Prometheus, Grafana

2) CI/CD Pipeline Failure due to Secret Missing

Problem Statement:
Deployment fails because the pipeline cannot access AWS credentials.

Expected Output:
•Securely store secrets
•Pipeline succeeds without exposing secrets

Suggested Approach:
•Use GitHub Secrets or Jenkins credentials
•Use IAM roles instead of hardcoded keys
•Validate secrets in pipeline

Tools Involved:
GitHub Actions / Jenkins, AWS IAM

3) Docker Image Size Too Large

Problem Statement:
Docker image size is huge, causing slow deployments.

Expected Output:
•Smaller image
•Faster deployments
•Better security

Suggested Approach:
•Use multi-stage builds
•Remove unnecessary packages
•Use minimal base image (Alpine)
•Scan image for vulnerabilities

Tools Involved:
Docker, Trivy, Docker Hub

4) AWS Auto Scaling Not Working

Problem Statement:
Instances are not scaling based on load.

Expected Output:
•Auto scaling triggers correctly
•System remains stable under load

Suggested Approach:
•Check CloudWatch metrics
•Verify scaling policies
•Check ALB target group health
•Add scaling cooldowns

Tools Involved:
AWS EC2, Auto Scaling, CloudWatch, ALB

5) Terraform State Drift Issue

Problem Statement:
Terraform shows drift between actual infrastructure and state file.

Expected Output:
•Detect drift
•Fix state file
•Prevent drift in future

Suggested Approach:
•Use terraform plan
•Use remote backend (S3 + DynamoDB)
•Use version control for modules
•Run terraform refresh carefully

Tools Involved:
Terraform, AWS S3, DynamoDB
