# DevOpsHub – Next MVP Enhancements Plan

This document outlines proposed enhancements for the next phase of the DevOpsHub MVP.
The goal is to improve automation, security, and operational visibility while keeping
the setup simple and cost-effective.

----

## 1. Jenkins Webhook Integration

**Goal:**  
Trigger Jenkins pipelines automatically when code is pushed to the GitHub repository.

**Why it matters:**  
Currently, builds may require manual triggering or polling. Webhooks enable true
event-driven CI, which is faster, more efficient, and closer to real production setups.

**High-Level Approach:**  
- Configure a GitHub webhook pointing to the Jenkins webhook endpoint
- Trigger builds on push events to the main branch
- Secure the webhook using a secret token
- Jenkins pipeline starts automatically on every valid change

**MVP Scope:**  
- One repository
- Push-based triggers only
- No complex filtering or multi-branch rules

----
## 2. Terraform Infrastructure as Code (IaC)

**Goal:**  
Define and manage AWS infrastructure using declarative code instead of manual setup.

**Why it matters:**  
Terraform improves reproducibility, auditability, and collaboration. It allows the MVP
infrastructure to be recreated or modified safely and consistently.

**High-Level Approach:**  
- Use Terraform to define:
  - S3 bucket for static website hosting
  - IAM roles and policies
  - (Optional) EC2 instance for Jenkins
- Store Terraform state securely (local or S3 backend for MVP)
- Apply changes via CI/CD or controlled manual runs

**MVP Scope:**  
- Minimal resources only
- Single AWS region
- No complex modules or multi-environment setup

---
## 3. GitHub Actions with OIDC (AWS Access)

**Goal:**  
Allow GitHub Actions workflows to securely access AWS resources without storing long-term
AWS access keys.

**Why it matters:**  
Using OpenID Connect (OIDC) removes the need for static credentials and follows modern
cloud security best practices. It reduces the risk of credential leakage.

**High-Level Approach:**  
- Configure AWS to trust GitHub as an OIDC identity provider
- Create an IAM role that GitHub Actions can assume
- Grant scoped permissions (e.g., S3 deploy access)
- Use short-lived credentials during workflow execution

**MVP Scope:**  
- Single GitHub repository
- Limited IAM permissions
- Deployment-focused workflows only

---
## 4. Custom Domain Setup

**Goal:**  
Expose the DevOpsHub static website using a custom domain instead of the default S3 URL.

**Why it matters:**  
A custom domain improves branding, professionalism, and user trust. It also reflects
real-world production setups.

**High-Level Approach:**  
- Purchase or use an existing domain
- Configure DNS using Route 53 or an external DNS provider
- Point the domain to the S3 static website endpoint
- (Optional) Add HTTPS using AWS Certificate Manager and CloudFront

**MVP Scope:**  
- Single domain
- Basic DNS configuration
- Optional HTTPS if kept free-tier friendly

----

## 5. Monitoring & Observability

**Goal:**  
Gain basic visibility into system health, deployments, and failures.

**Why it matters:**  
Monitoring helps detect issues early and understand system behavior. Even at MVP stage,
basic observability is critical for reliability and learning.

**High-Level Approach:**  
- Use AWS CloudWatch for:
  - EC2 instance metrics
  - Basic logs
- Enable Jenkins job logs and build history
- Add simple alerting for critical failures (optional)

**MVP Scope:**  
- CloudWatch default metrics only
- No third-party or paid monitoring tools
- No complex dashboards or alerting rules

---
