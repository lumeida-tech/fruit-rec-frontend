pipeline {
    agent any  

    environment {
        IMAGE_NAME = "mon-backend"
        CONTAINER_NAME = "mon-backend-container"
        DOCKER_HUB_USER = credentials('docker-hub-credentials')  // Stocker ces credentials dans Jenkins
    }

    stages {
        stage('Cloner le code') {
            steps {
                git 'https://github.com/lumeida-tech/fruit-rec-backend.git'  
            }
        }

        stage('Exécuter les tests') {
            steps {
                sh 'pytest tests/'  // Adapter selon ton framework de test
            }
        }

        stage('Construire l’image Docker') {
            steps {
                sh 'docker build -t $DOCKER_HUB_USER/$IMAGE_NAME:latest .'
            }
        }

        stage('Pousser l’image sur Docker Hub') {
            steps {
                withDockerRegistry([credentialsId: 'docker-hub-credentials', url: '']) {
                    sh 'docker push $DOCKER_HUB_USER/$IMAGE_NAME:latest'
                }
            }
        }

        stage('Déployer le conteneur') {
            steps {
                sh 'docker stop $CONTAINER_NAME || true'
                sh 'docker rm $CONTAINER_NAME || true'
                sh 'docker run -d --name $CONTAINER_NAME -p 8000:8000 $DOCKER_HUB_USER/$IMAGE_NAME:latest'
            }
        }
    }

    post {
        success {
            mail to: 'kfgomina@gmail.com',
                 subject: 'Déploiement réussi 🎉',
                 body: 'Le backend a été déployé avec succès !'
        }
        failure {
            mail to: 'kfgomina@gmail.com',
                 subject: 'Échec du pipeline ❌',
                 body: 'Le pipeline Jenkins a échoué. Vérifiez les logs.'
        }
    }
}