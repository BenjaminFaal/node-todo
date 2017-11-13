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
                    sh 'docker run --rm -p 9090:9090 -d --name="docker-todo-test" hansschollaardt/node-todo'
               }
            }
        }
        stage('Test image') {
            steps {
                /* Ideally, we would run a test framework against our image.
                   For this example, we're using a Volkswagen-type approach ;-) */
                sh 'npm test'
                sh 'docker stop "docker-todo-test"'
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
