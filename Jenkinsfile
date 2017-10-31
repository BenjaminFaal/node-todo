node {
    def app

    stage('Clone repository') {
       checkout scm
    }

    stage('Build image') {
        /* This builds the actual image; synonymous to
         * docker build on the command line */
        app = docker.build("hansschollaardt/node-todo")
    }
    
    stage('Deploy for test') {
        /* TODO */
        sh 'echo "This is a TODO"'
        /* STOP CONTAINER */
        sh 'docker stop $(docker ps -q --filter ancestor=hansschollaardt/node-todo)'
        /*sh "docker rm node-todo-test"*/
        sh 'docker run -p 9091:9090 -d hansschollaardt/node-todo'
    }
    
    stage('Test image') {
        /* Ideally, we would run a test framework against our image.
         * For this example, we're using a Volkswagen-type approach ;-) */
        app.inside {
            sh 'echo "Tests passed"'
        }
    }

    stage('Push image') {
        /* Finally, we'll push the image with two tags:
         * First, the incremental build number from Jenkins
         * Second, the 'latest' tag.
         * Pushing multiple tags is cheap, as all the layers are reused. */
        docker.withRegistry('https://registry.hub.docker.com', 'dockerhub') {
           app.push("${env.BUILD_NUMBER}")
           app.push("latest")
         }
    }
    
    stage('Deploy') {
        sh 'echo "Now we can deploy our image for test stage"' 
    }
}
