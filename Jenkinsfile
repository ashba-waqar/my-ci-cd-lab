pipeline {
    agent any
    
    stages {
        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }
        
        stage('Build Docker Image') {
            steps {
                sh "docker build -t lab-app:latest ."
            }
        }
        
        stage('Deploy Application') {
            steps {
                script {
                    sh "docker stop running-app || true"
                    sh "docker rm running-app || true"
                    
                    
                    sh "docker run -d --name running-app -p 80:80 lab-app:latest"
                }
            }
        }
    }
    
    post {
        failure {
            echo "Pipeline fail ho gayi hai!"
        }
    }
}
