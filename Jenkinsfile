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
                    // Purana container stop aur remove karna (rolling update/deployment)
                    sh "docker rm -f running-app || true"
                    
                    // Naya container run karna
                    sh "docker run -d --name running-app -p 80:80 lab-app:latest"
                }
            }
        }
    }
    
    post {
        failure {
            echo "Pipeline fail ho gayi hai! Rollback process shuru kiya ja raha hai..."
            // Rollback step (agar purana container ya backup mojood ho)
            sh "echo 'Executing rollback steps...'"
        }
    }
}
