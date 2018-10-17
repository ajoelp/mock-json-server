pipeline {
    agent any
    options {
        timestamps()
    }
    stages {
        stage('Build') {
            steps {
                sh 'bash scripts/build.sh'
            }
        }
        stage('Test') {
            steps {
                sh 'bash scripts/test.sh'
            }
        }
        stage('Push') {
            steps {
                sh 'bash scripts/push.sh'
            }
        }
    }
}