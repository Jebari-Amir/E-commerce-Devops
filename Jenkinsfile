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



        // stage('Install Dependencies') {
        //     steps {
        //         script {
        //             // Installer les dépendances Node.js
        //             sh 'npm install'
        //         }
        //     }
        // }

        // stage('Build') {
        //     steps {
        //         script {
        //             // Construire le projet Next.js
        //             sh 'npm run build'
        //         }
        //     }
        // }

        

       
    }

    post {
        success {
            echo 'Pipeline réussi!'
        }
        failure {
            echo 'Pipeline échoué.'
        }
    }
}
