pipeline {
    agent any
    
    stages {
        stage('Checkout Code') {
            steps {
                // Checkout code from the repository
                checkout scm
            }
        }
        
        stage('Build Docker Image') {
            steps {
                // Build the Docker image with a tag
                sh "docker build -t lab-app:latest ."
            }
        }
        
        stage('Deploy Application') {
            steps {
                script {
                    // Stop and remove the old container if it exists
                    sh "docker stop running-app || true"
                    sh "docker rm running-app || true"
                    
                    // Run the new container on port 8081 to avoid port 80 conflict
                    sh "docker run -d --name running-app -p 8081:80 lab-app:latest"
                }
            }
        }
    }
    
    post {
        failure {
            // Triggered if the pipeline fails
            echo "Pipeline failed! Executing failure actions..."
        }
    }
}
