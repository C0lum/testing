pipeline {
  agent {
    docker {
        image 'node:20.9.0-alpine3.18'
        args '-p 3000:3000'
    }
  }
  
  stages {
    stage('Checkout SCM') {
      steps {
        // Checkout the source code from Git
        git branch:'main', url: 'https://github.com/C0lum/testing.git'
      }
    }
    
    stage('Build') {
      steps {
        script {
            // Install dependencies and build the application
            sh 'npm install'
            sh 'npm run build'
        }
        
      }
    }
    
    stage('Dependency Check') {
      steps {
        // Run dependency check
        // sh 'npm run dependency-check'
        dependencyCheck additionalArguments: '--format HTML --format XML', odcInstallation: 'OWASP Dependency-Check Vulnerabilities'
      }
    }
    
    stage('Integration Tests') {
      steps {
        // Run integration tests
        sh 'npm run integration-tests'
      }
    }
    
    stage('UI Testing') {
      steps {
        // Run UI tests using a testing framework like Selenium
        // sh 'npm run ui-tests'
		steps {
			sh 'mvn -B -DskipTests clean package'
			sh 'mvn test'
		}
		post {
			always {
				junit 'target/surefire-reports/*.xml'
			}
		}
      }
    }
  }

  post {
    success {
        dependencyCheckPublisher pattern: 'dependency-check-report.xml'
    }
  }
}