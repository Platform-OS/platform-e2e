@Library('pipeline-utils')_  // it's not a typo

def qa_url = "https://platform-e2e.qa0-pos.apps.near-me.com"

pipeline {
  agent any

  environment {
    MPKIT_TOKEN = credentials('POS_TOKEN')
    MPKIT_EMAIL = "darek+ci@near-me.com"
  }

  parameters {
    string(description: 'Instance URL. When empty then we deploy on qa', name: 'MP_URL', defaultValue: '')
  }

  options {
    disableConcurrentBuilds()
    timeout(time: 10, unit: 'MINUTES')
    buildDiscarder(logRotator(daysToKeepStr: '1', artifactDaysToKeepStr: '1'))
  }

  stages {
    stage('Deploy to URL') {
      when { expression { return !params.MP_URL.isEmpty() } }
      environment { MPKIT_URL = "${params.MP_URL}" }
      agent { docker { image 'platformos/marketplace-kit:2.0' } }
      steps {
        sh 'marketplace-kit deploy'
      }
    }

    stage('Test on URL') {
      when { expression { return !params.MP_URL.isEmpty() } }
      agent { docker { image "platformos/testcafe" } }
      environment { MP_URL = "${params.MP_URL}" }
      steps {
        withCredentials([usernamePassword(credentialsId: 'gmail-qa-user', usernameVariable: 'GOOGLE_EMAIL', passwordVariable: 'GOOGLE_PASSWORD')]) {
          sh 'npm run test-ci'
        }
      }
    }

    stage('Deploy qa') {
      agent { docker { image 'platformos/marketplace-kit:2.0' } }

      environment {
        MPKIT_URL = "${qa_url}"
      }

      when {
        expression { return params.MP_URL.isEmpty() }
        anyOf { branch 'master' }
      }

      steps {
        sh 'marketplace-kit deploy'
      }
    }

    stage('Test qa') {
      agent { docker { image "platformos/testcafe" } }

      environment {
        MP_URL = "${qa_url}"
      }

      when {
        expression { return params.MP_URL.isEmpty() }
        anyOf { branch 'master' }
      }

      steps {
        withCredentials([usernamePassword(credentialsId: 'gmail-qa-user', usernameVariable: 'GOOGLE_EMAIL', passwordVariable: 'GOOGLE_PASSWORD')]) {
          sh 'npm run test-ci'
        }
      }
       post {
        always {
          sh 'ls -R /tmp'
          archiveArtifacts artifacts: '/tmp/*/test-1/HeadlessChrome_72.0.3626_Linux_0.0.0/errors/*.png', fingerprint: true
        }
      }
    }
  }
}

def commitInfo() {
  GH_URL = "https://github.com/mdyd-dev/platform-e2e"

  def commitSha = sh(returnStdout: true, script: 'git rev-parse --short HEAD').trim()
  // def commitAuthor = sh(returnStdout: true, script: 'git log --no-merges --format="%an" -1').trim()
  def commitMsg = sh(returnStdout: true, script: 'git log --no-merges --format="%B" -1 ${commitSha}').trim()

  return "<${GH_URL}/commit/${commitSha}|${commitSha} ${commitMsg}>"
}
