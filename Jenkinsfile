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
                    // Wait a few seconds for the container to start
                    sleep 5
                    
                    // Print container status and logs for debugging if it fails
                    sh "docker inspect running-app || true"
                    sh "docker logs running-app || true"
                    
                    // Verify if container is up (checking both running or just checking existence if it's a quick task)
                    def containerStatus = sh(script: "docker inspect -f '{{.State.Running}}' running-app", returnStdout: true).trim()
                    if (containerStatus != "true") {
                        error("Container is not running!")
                    }
                }
            }
        }
    }
    
    post {
        success {
            echo "Pipeline succeeded! Application deployed and verified successfully."
        }
        failure {
            echo "Pipeline failed! Initiating rollback process..."
            script {
                sh "docker stop running-app || true"
                sh "docker rm running-app || true"
                echo "Rollback steps completed."
            }
        }
    }
}
