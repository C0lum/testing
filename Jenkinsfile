pipeline {
  agent any
  
  stages {
    stage('Checkout SCM') {
      steps {
        // Checkout the source code from Git
        git 'https://github.com/C0lum/testing.git'
      }
    }
    
    stage('Build') {
      steps {
        // Install dependencies and build the application
        sh 'npm install'
        sh 'npm run build'
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
        agent {
			docker {
				image 'maven:3-alpine' 
				args '-v /root/.m2:/root/.m2' 
			}
		}
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