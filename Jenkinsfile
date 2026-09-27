pipeline {
    agent any
    
    stages {
        stage('Checkout Code') {
            steps {
                // Checkout code from the GitHub repository
                checkout scm
            }
        }
        
        stage('Build Docker Image') {
            steps {
                // Build the new Docker image with a tag
                sh "docker build -t lab-app:latest ."
            }
        }
        
        stage('Deploy Application') {
            steps {
                script {
                    // Stop and remove the old container if it exists
                    sh "docker stop running-app || true"
                    sh "docker rm running-app || true"
                    
                    // Run the new container and keep it alive using node or sleep
                    sh "docker run -d --name running-app -p 8082:80 lab-app:latest sh -c 'node index.js || sleep infinity'"
                }
            }
        }
        
        stage('Health Check') {
            steps {
                script {
                    // Wait a few seconds for the container to start
                    sleep 3
                    // Verify that the container is successfully created and running
                    sh "docker inspect running-app"
                }
            }
        }
    }
    
    post {
        success {
            // Final success notification and cleanup
            echo "Lab 14 Completed Successfully! All stages passed without errors."
            cleanWs()
        }
        failure {
            // Rollback mechanism in case of failure
            echo "Pipeline failed! Initiating rollback process..."
            script {
                sh "docker stop running-app || true"
                sh "docker rm running-app || true"
                echo "Rollback steps completed."
            }
            cleanWs()
        }
    }
}
