pipeline {
    agent any

    environment {
        NODE_ENV = 'production'
    }

    stages {
        stage('Getting project from Git') {
            steps {
                checkout([$class: 'GitSCM', branches: [[name: '*/main']],
                extensions: [],
                userRemoteConfigs: [[url: 'https://github.com/Jebari-Amir/E-commerce-Devops']]])
            }
        }



        stage('njarbou') {
            steps{
		    echo " test "
               		 
            }
        }



        stage('Install Dependencies') {
            steps {
                script {
                    // Installer les dépendances Node.js
                    sh 'npm install'
                }
            }
        }

        stage('Build') {
            steps {
                script {
                    // Construire le projet Next.js
                    sh 'npm run build'
                }
            }
        }

        

       
    }

   post {
		success{
		mail bcc: '', body: '''Dear Amir,
we are happy to inform you that your pipeline build was successful. 
Great work ! 
-Jenkins Team-''', cc: '', from: 'amirj5353@gmail.com', replyTo: '', subject: 'Build Finished - Success', to: 'amirj5353@gmail.com'
		}
		
		failure{
mail bcc: '', body: '''Dear Amir ,
we are sorry to inform you that your pipeline build failed. 
Keep working ! 
-Jenkins Team-''', cc: '', from: 'amirj5353@gmail.com', replyTo: '', subject: 'Build Finished - Failure', to: 'amirj5353@gmail.com'
		}

       always {
		emailext attachLog: true, body: '', subject: 'Build finished',from: 'amirj5353@gmail.com' , to: 'amirj5353@gmail.com'
            cleanWs()
       }
    }
}
