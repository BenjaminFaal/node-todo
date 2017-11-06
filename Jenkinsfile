pipeline {
    agent any
    tools {nodejs "node-6.11"}

    stages{
        stage('Initializing stage') {
            steps {
                checkout scm
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
                   /* dit gaat mis als er geen container draait... filter als input gebruiken om te stoppen al dan niet over te slaan? */
                    def containerId = sh returnStdout: true, script: 'docker ps |  grep "9090" | awk \'{print $1}\''
                    /*sh 'echo "Container ID: "'*/
                    sh 'echo "${containerId}"'
                    sh 'echo "Stopping running test instance"'
                    sh 'docker rm -f "docker-todo-test"'
                    sh 'echo "Running test instance stopped"'
                    /*if (containerId) {
                        sh 'echo "Stopping container with ID ${containerId}"'
                        sh 'docker stop ${containerId}'
                    }
                    */
                    sh 'docker run -p 9090:9090 -d --name="docker-todo-test" hansschollaardt/node-todo'
               }
            }
        }
        stage('Test image') {
            steps {
                /* Ideally, we would run a test framework against our image.
                   For this example, we're using a Volkswagen-type approach ;-) */
                sh 'npm test' 	
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
                       app.push("${env.BUILD_NUMBER}")
                       app.push("latest")
                    }
                }
            }  
        }
        stage('Deploy') {
            steps {
                sh 'echo "Now we can deploy our image for test stage"' 
            }
        }
    }
}
