# DevOpsHub Wiki

Welcome to the DevOpsHub documentation.  
This wiki explains contributor expectations, learning prerequisites, and the AWS Free-Tier CI/CD MVP implementation.

---

## 📌 Contributor Preparation (Before Scrum Sync)

All contributors should complete the following before participating in implementation discussions.

---

## 🐧 Linux Basics
- Comfortable using the terminal (CLI)
- File and directory navigation
- Viewing and editing files
- Basic permissions and ownership (high level)

---

## 🌱 Git Fundamentals
- Version control concepts: repository, commit, branch, merge
- Common workflows:
  - clone
  - add
  - commit
  - push
  - pull
- Basic understanding of merge conflicts

---

## 🧩 GitHub Basics
- Creating and managing repositories
- Pushing code and creating pull requests
- Reviewing PRs
- Using issues and project boards

---

## ☁️ Cloud Account (Overview Only)
- Create an account on at least one cloud provider
  - Preferred: AWS
  - Alternatives: Azure or GCP
- Explore the cloud console:
  - Dashboard
  - Regions
  - Compute, storage, IAM, networking (high level)

> ⚠️ **Security Notice**  
> Never store cloud credentials, passwords, or access keys in documentation or repositories.

---

# DevOpsHub – AWS Free-Tier CI/CD Setup (MVP)

This section documents the **actual MVP implementation**, decisions made, and lessons learned.

---

## 1. Project Overview
- Project Name: DevOpsHub
- Repository: https://github.com/zeroopscloud/DevOpsHub
- Type: Static website (HTML/CSS/assets)

### Hosting Journey
- Initial: GitHub Pages (validation)
- Current: AWS S3 Static Website Hosting

### Why AWS S3?
- Multi-AZ by default
- No server management
- Highly scalable
- AWS Free-Tier eligible

---

## 2. Final Architecture

GitHub Repository
↓
Jenkins (EC2 – Free Tier)
↓
Docker
↓
AWS S3 (Static Website Hosting)


### Core Principles
- No secrets stored on servers
- IAM role-based access
- Fully automated deployment

---

## 3. Repository Structure

DevOpsHub/
├── .github/
├── assets/
├── scripts/
├── index.html
├── README.md
├── rss.xml
├── sitemap.xml

- `index.html` at root (S3 compatible)
- Clean separation of assets
- SEO-ready structure

---

## 4. AWS Services Used (Free Tier)

| Service      | Purpose                  | Cost |
|-------------|--------------------------|------|
| S3          | Static website hosting   | $0   |
| EC2         | Jenkins server           | $0   |
| IAM         | Access control           | $0   |
| CloudWatch  | Logs & metrics           | $0   |

---

## 5. S3 Static Website Setup

### Bucket Configuration
- Globally unique bucket
- Static website hosting enabled
- Index document: `index.html`
- Error document: `index.html`

### Why This Works for MVP
- No backend servers
- Automatic scalability
- Multi-AZ availability

---

## 6. IAM Strategy (Security-Critical)

### IAM Users (Humans)
- Used only for:
  - Console access
  - Optional CLI usage
- Least-privilege permissions applied

### IAM Roles (AWS Services)
- EC2 uses an IAM role
- No access keys stored on instances

**Rule Followed**
- IAM Users → Humans  
- IAM Roles → AWS Services

---

## 7. Jenkins Setup

### EC2 Configuration
- Amazon Linux 2
- Instance type: t2.micro (Free Tier)

### Jenkins Installation
- Java 11
- Jenkins installed via official repo
- Jenkins exposed on port 8080

---

## 8. Docker Integration

### Issue Faced
- Jenkins user could not run Docker commands

### Resolution
- Updated Jenkins user shell
- Verified Docker access

---

## 9. Dockerfile

```dockerfile
FROM nginx:alpine
COPY . /usr/share/nginx/html
```
Purpose:
---
•Build consistency
•Reproducible deployments

10. Jenkinsfile (CI/CD Pipeline)
---
•Checkout code
•Build Docker image
•Deploy static files to S3

Each successful pipeline run updates the live website.

11. Major Issue & Resolution
---
Issue
---
AccessDenied when deploying to S3

Root Cause
---
Static AWS credentials existed on the server

Fix
---
•Removed stored credentials
•Verified EC2 IAM role usage

DevOps Lesson
---
❌ Never store access keys on servers
✅ Always use IAM roles

12. Current Status
---
•S3 static hosting live
•Jenkins CI/CD working
•IAM best practices enforced
•100% AWS Free Tier
•Cloud-only workflow
