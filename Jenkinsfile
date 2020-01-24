@Library('pipeline-utils')_  // it's not a typo

pipeline {
  agent any

  environment {
    MPKIT_TOKEN = credentials('POS_TOKEN')
    MPKIT_EMAIL = "darek+ci@near-me.com"
  }

  parameters {
    string(description: 'Instance URL. When empty then we deploy on qa0', name: 'MP_URL', defaultValue: "https://platform-e2e-2.qa0-pos.apps.near-me.com")
  }

  options {
    disableConcurrentBuilds()
    timeout(time: 10, unit: 'MINUTES')
  }

  stages {
    stage('Deploy on URL') {
      agent { docker { image 'platformos/pos-cli' } }
      environment {
        MPKIT_URL = "${params.MP_URL}"
      }
      when { anyOf { branch 'master' } }
      steps { sh 'pos-cli deploy' }
    }

    stage('Test on URL') {
      agent { docker { image "platformos/testcafe-pos-cli" } }
      environment {
        MP_URL = "${params.MP_URL}"
        MPKIT_URL = "${params.MP_URL}"
        MPKIT_TOKEN = credentials('POS_TOKEN')
        MPKIT_EMAIL = "darek+ci@near-me.com"
      }
      when { anyOf { branch 'master' } }
      steps {
        withCredentials([usernamePassword(credentialsId: 'gmail-qa-user', usernameVariable: 'GOOGLE_EMAIL', passwordVariable: 'GOOGLE_PASSWORD')]) {
          sh 'npm run test-ci'
        }
      }
      post { failure { archiveArtifacts "screenshots/" } }
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
