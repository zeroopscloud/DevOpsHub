pipeline {
    agent any

    environment {
        BUCKET = "devopshub-unique-2026"
    }

    stages {

        stage('Checkout Code') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/zeroopscloud/DevOpsHub.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t devopshub-site .'
            }
        }

        stage('Deploy to S3') {
            steps {
                sh '''
                aws s3 sync . s3://$BUCKET \
                --exclude ".git/*" \
                --exclude ".github/*" \
                --exclude "Jenkinsfile" \
                --exclude "Dockerfile" \
                --exclude "README.md"
                '''
            }
        }
    }

    post {
        success {
            echo "DevOpsHub deployed successfully to AWS S3!"
        }
    }
}
