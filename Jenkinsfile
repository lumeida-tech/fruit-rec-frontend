pipeline {
    agent any  

    environment {
        REPO_URL = 'https://github.com/lumeida-tech/fruit-rec-frontend.git'
        NODE_VERSION = '18' 
    }

    stages {
        stage('Cloner le code') {
            steps {
                git REPO_URL
            }
        }

        stage('Installer Node.js') {
            steps {
                script {
                    def nodeExists = bat(script: 'node -v', returnStatus: true)
                    if (nodeExists != 0) {
                        error "Node.js n'est pas installé sur cette machine. Installez Node.js avant de continuer."
                    }
                }
            }
        }

        stage('Installer les dépendances') {
            steps {
                bat '''
                npm install
                '''
            }
        }

        stage('Exécuter les tests') {
            steps {
                bat '''
                npm test
                '''
            }
        }

        stage('Construire le projet') {
            steps {
                bat '''
                npm run build
                '''
            }
        }
    }

    post {
        success {
            mail to: 'kfgomina@gmail.com',
                 subject: 'Pipeline Frontend réussi 🎉',
                 body: 'Le pipeline Jenkins pour le frontend a été exécuté avec succès !'
        }
        failure {
            mail to: 'kfgomina@gmail.com',
                 subject: 'Échec du pipeline Frontend ❌',
                 body: 'Le pipeline Jenkins pour le frontend a échoué. Vérifiez les logs.'
        }
    }
}