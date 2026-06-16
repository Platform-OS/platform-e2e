// withCredentials([usernamePassword(credentialsId: 'gmail-qa-user', usernameVariable: 'GOOGLE_EMAIL', passwordVariable: 'GOOGLE_PASSWORD')]) {
//   sh 'npm run test-ci'
// }


pipeline {
  agent any

  options {
    disableConcurrentBuilds()
    timeout(time: 20, unit: 'MINUTES')
    buildDiscarder(logRotator(daysToKeepStr: '1', artifactDaysToKeepStr: '1'))
  }

  parameters {
    string(description: 'Instance URL', name: 'TARGET_URL', defaultValue: 'https://platform-e2e.staging.oregon.platform-os.com')
  }

  environment {
    MPKIT_TOKEN = credentials('MPKIT_TOKEN')
    MPKIT_EMAIL = credentials('MPKIT_EMAIL')
    MPKIT_URL   = "${params.TARGET_URL}"
    CI = true

    // TC REPORTS
    UPLOAD_HOST = "https://tests.qa0.oregon.platformos.com"
    REPORT_PATH  = "${env.GIT_COMMIT}-${System.currentTimeMillis()}"
    REPORT_TYPE = "manual"
  }

  stages {
    stage('build') {
      agent { kubernetes { yaml podTemplate("amd64") } }
      steps {
        container(name: 'playwright') {
          sh 'npm ci'
          sh 'pos-cli data clean --include-schema --auto-confirm'
          sh 'pos-cli deploy'
          sh 'sleep 10'
          sh 'npm run test-ci'
        }
      }

      post {
        always {
          container(name: 'playwright') {
            publishHTML (target: [allowMissing: false, alwaysLinkToLastBuild: false, keepAll: true, reportDir: 'playwright-report', reportFiles: 'index.html', reportName: "playwright"])
          }
        }
      }
    }

  }
}

def podTemplate(arch) {
  return """
        spec:
          nodeSelector:
            beta.kubernetes.io/arch: "${arch}"
          imagePullSecrets:
          - name: dockeriosec
          - name: ocirsecret
          containers:
          - name: playwright 
            resources:
              limits:
                cpu: 1
                memory: 2Gi
              requests:
                cpu: 1
                memory: 2Gi
            image: 'docker.io/platformos/playwright:6.0.7-1.60.0'
            imagePullPolicy: Always
            command:
            - cat
            tty: true
"""
}
