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
                    npm run build
                    npm pack
                    curl -u admin:nexus --upload-file $(ls *.tgz) http://172.10.0.140:8081/repository/npm-releases/
                    '''
                }
            }
        }
    }
        

       
    }

    post {
        success {
            echo 'Pipeline réussi!'
        }
        failure {
            echo 'Pipeline échoué.'
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
