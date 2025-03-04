pipeline {
    agent any  

    environment {
        IMAGE_NAME = "mon-frontend"
        CONTAINER_NAME = "mon-frontend-container"
        DOCKER_HUB_USER = credentials('docker-hub-credentials')  // Stocker ces credentials dans Jenkins
    }

    stages {
        stage('Cloner le code') {
            steps {
                git 'https://github.com/lumeida-tech/fruit-rec-frontend.git'  
            }
        }

        stage('Exécuter les tests') {
            steps {
                bat 'pytest tests/'  // Adapter selon ton framework de test
            }
        }

        stage('Construire l’image Docker') {
            steps {
                bat 'docker build -t $DOCKER_HUB_USER/$IMAGE_NAME:latest .'
            }
        }

        stage('Pousser l’image sur Docker Hub') {
            steps {
                withDockerRegistry([credentialsId: 'docker-hub-credentials', url: '']) {
                    bat 'docker push $DOCKER_HUB_USER/$IMAGE_NAME:latest'
                }
            }
        }

        stage('Déployer le conteneur') {
            steps {
                bat 'docker stop $CONTAINER_NAME || true'
                bat 'docker rm $CONTAINER_NAME || true'
                bat 'docker run -d --name $CONTAINER_NAME -p 8000:8000 $DOCKER_HUB_USER/$IMAGE_NAME:latest'
            }
        }
    }

    post {
        success {
            mail to: 'kfgomina@gmail.com',
                 subject: 'Déploiement réussi 🎉',
                 body: 'Le frontend a été déployé avec succès !'
        }
        failure {
            mail to: 'kfgomina@gmail.com',
                 subject: 'Échec du pipeline ❌',
                 body: 'Le pipeline Jenkins a échoué. Vérifiez les logs.'
        }
    }
}