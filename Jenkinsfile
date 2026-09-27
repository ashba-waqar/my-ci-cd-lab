stage('Deploy Application') {
    steps {
        script {
            // Purane container ko stop aur remove karein
            sh "docker stop running-app || true"
            sh "docker rm running-app || true"
            
            // Naya container run karein. Agar app khud exit ho rahi hai, tou tail -f /dev/null laga kar zinda rakh sakte hain:
            sh "docker run -d --name running-app -p 8082:80 lab-app:latest"
        }
    }
}
