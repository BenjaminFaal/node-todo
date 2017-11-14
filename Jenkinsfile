pipeline {
    agent any
    tools {nodejs "node-6.11"}

    stages{
        stage('Initializing stage') {
            steps {
                checkout scm
            }
        }
        stage('Unit tests') {
            steps {
                sh 'npm install'
                sh 'npm run unit-test'
            }
        }
        stage('Build image') {
            /* This builds the actual image; synonymous to
             * docker build on the command line */
            steps {
                script {
                    app = docker.build("hansschollaardt/node-todo")
                }
            }
        }

        stage('Deploy for test') {
           steps {
               script { 
                    sh 'docker run --rm -p 9090:9090 -d --name="docker-todo-test" hansschollaardt/node-todo'
               }
            }
        }
        stage('Test image') {
            steps {
                /* Ideally, we would run a test framework against our image.
                   For this example, we're using a Volkswagen-type approach ;-) */
                sh 'npm run selenium-test'
                sh 'docker stop docker-todo-test'
            }
        }
        stage('Push image') {
            steps {
                /* Finally, we'll push the image with two tags:
                 * First, the incremental build number from Jenkins
                 * Second, the 'latest' tag.
                 * Pushing multiple tags is cheap, as all the layers are reused. */
                script {
                    docker.withRegistry('https://registry.hub.docker.com', 'dockerhub') {
                       app.push("prod-${env.BUILD_NUMBER}")
                       app.push("prod-latest")
                    }
                }
            }  
        }
        stage('Deploy Productie') {
            steps {
                sh 'echo "Now we can deploy our image"' 
                // continue even if container was not running (yet)
                app.run("--rm -p 81:9090 -d --name=docker-todo-prod", [])
                withCredentials([usernameColonPassword(credentialsId: 'dockerhub', variable: 'DOCKER_CREDENTIALS')]) {
                    sh 'echo ${DOCKER_CREDENTIALS}'    
                }
                sh 'docker stop docker-todo-prod || true' 
                sh 'docker run --rm -p 81:9090 -d --name="docker-todo-prod" hansschollaardt/node-todo:prod-latest'
            }
        }
    }
}
