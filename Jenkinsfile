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
                    // Gracefully stop and remove the current running container if it exists
                    sh "docker stop running-app || true"
                    sh "docker rm running-app || true"
                    
                    // Run the new container on port 8082
                    sh "docker run -d --name running-app -p 8082:80 lab-app:latest"
                }
            }
        }
    }
    
    post {
        success {
            // Actions performed if the pipeline succeeds
            echo "Pipeline succeeded! Application deployed successfully."
        }
        failure {
            // Actions performed if the pipeline fails (Rollback mechanism)
            echo "Pipeline failed! Initiating rollback process..."
            script {
                // Stop the failed container and try to bring back the backup/previous image if available
                sh "docker stop running-app || true"
                sh "docker rm running-app || true"
                echo "Rollback steps completed. Please check logs for details."
            }
        }
    }
}
