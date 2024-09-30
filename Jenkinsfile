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

        // stage('Build') {
        //     steps {
        //         script {
        //             // Construire le projet Next.js
        //             sh 'npm run build'
        //         }
        //     }
        // }



stage('Code Quality Check via SonarQube') {
            steps {
                script {
                    // Analyser la qualité du code avec SonarQube
                    sh '''
                    npx sonar-scanner -Dsonar.projectKey=cicd -Dsonar.projectName="cicd" -Dsonar.host.url=http://172.10.0.140:9000 -Dsonar.login=sqp_2d9c32825b84fd25555d9230e8b94561bfb89119
                    '''
                }
            }
        }



   stage('Publish to Nexus') {
            steps {
                script {
                    // Publier le package sur Nexus
                    sh '''
                    npm pack
                    curl -u admin:nexus --upload-file $(ls *.tgz) http://172.10.0.140:8081/repository/npm-releases/
                    '''
                }
            }
        }
        

       
    

   
// Étapes de création et de publication d'image Docker
        stage('Build Docker Image') {
            steps {
                script {
                    // Construire l'image Docker
                    sh 'docker build -t amirovvv/wumela-pfe .'
                }
            }
        }

        stage('Login to Docker Hub') {
            steps {
                script {
                    // Connexion à Docker Hub
                        sh 'docker login -u amirovvv --password dckr_pat_LAIjui5cw-3dOSsdt8AoUuVNZ5o'
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                script {
                    // Pusher l'image vers Docker Hub
                    sh 'docker push amirovvv/wumela-pfe'
                }
            }
        }

}


   
post {
        success {
            echo 'Pipeline réussi!'
            mail to: 'amirj5353@gmail.com',
                 subject: "Pipeline réussi: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                 body: "Le pipeline a réussi avec succès. Consultez les détails ici: ${env.BUILD_URL}"
        }
        failure {
            echo 'Pipeline échoué.'
            mail to: 'amirj5353@gmail.com',
                 subject: "Échec du pipeline: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                 body: "Le pipeline a échoué. Consultez les détails ici: ${env.BUILD_URL}"
        }
    }



//  post {
// 		success{
// 		mail bcc: '', body: '''Dear Amir,
// we are happy to inform you that your pipeline build was successful. 
// Great work ! 
// -Jenkins Team-''', cc: '', from: 'amirj5353@gmail.com', replyTo: '', subject: 'Build Finished - Success', to: 'amirj5353@gmail.com'
// 		}
		
// 		failure{
// mail bcc: '', body: '''Dear Amir ,
// we are sorry to inform you that your pipeline build failed. 
// Keep working ! 
// -Jenkins Team-''', cc: '', from: 'amirj5353@gmail.com', replyTo: '', subject: 'Build Finished - Failure', to: 'amirj5353@gmail.com'
// 		}

//        always {
// 		emailext attachLog: true, body: '', subject: 'Build finished',from: 'amirj5353@gmail.com' , to: 'amirj5353@gmail.com'
//             cleanWs()
//        }
//     }



}
