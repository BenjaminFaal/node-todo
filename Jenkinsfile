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
           /* dit gaat mis als er geen container draait... filter als input gebruiken om te stoppen al dan niet over te slaan? */
        def containerId = sh returnStdout: true, script: 'docker ps |  grep "9090" | awk "{print $1}"'
        if (containerId) {
            sh 'docker stop ${containerId}'
        }
        sh 'docker run -p 9090:9090 -d hansschollaardt/node-todo'
    }
    
    stage('Test image') {
        /* Ideally, we would run a test framework against our image.
         * For this example, we're using a Volkswagen-type approach ;-) */
        app.inside {
            sh 'npm test'
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
