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
                // Build the new Docker image
                sh "docker build -t lab-app:latest ."
            }
        }
        
        stage('Deploy Application') {
            steps {
                script {
                    // Stop and remove the old container if it exists
                    sh "docker stop running-app || true"
                    sh "docker rm running-app || true"
                    
                    // Run the new container on port 8082
                    sh "docker run -d --name running-app -p 8082:80 lab-app:latest"
                }
            }
        }
        
        stage('Health Check') {
            steps {
                script {
                    // Wait a few seconds for the container to start, then verify via docker ps
                    sleep 5
                    // Check if the container is running and healthy
                    sh "docker ps --filter 'name=running-app' --filter 'status=running' --format '{{.Names}}' | grep -q 'running-app'"
                }
            }
        }
    }
    
    post {
        success {
            // Actions performed if the pipeline succeeds
            echo "Pipeline succeeded! Application deployed and verified successfully."
        }
        failure {
            // Actions performed if the pipeline fails (Rollback mechanism)
            echo "Pipeline failed! Initiating rollback process..."
            script {
                sh "docker stop running-app || true"
                sh "docker rm running-app || true"
                echo "Rollback steps completed. Please check logs for details."
            }
        }
    }
}
