def call(String playbookPath, String inventoryPath) {
    echo "Deploying using Ansible playbook: ${playbookPath}"
    sh "ansible-playbook -i ${inventoryPath} ${playbookPath}"
}
