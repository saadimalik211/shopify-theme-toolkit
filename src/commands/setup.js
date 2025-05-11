const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');
const ora = require('ora');
const chalk = require('chalk');

async function setupEnvironment() {
  console.log(chalk.blue('🛠️  Setting up Shopify Theme Development Environment'));

  // Check if running on Debian/Ubuntu
  if (fs.existsSync('/etc/debian_version')) {
    const spinner = ora('Installing dependencies...').start();
    try {
      await execPromise('apt update && apt upgrade -y');
      await execPromise('apt install -y curl git unzip build-essential');
      await execPromise('curl -fsSL https://deb.nodesource.com/setup_18.x | bash -');
      await execPromise('apt install -y nodejs');
      await execPromise('npm install -g @shopify/cli @shopify/theme');
      spinner.succeed('Dependencies installed successfully');
    } catch (error) {
      spinner.fail(`Failed to install dependencies: ${error.message}`);
      return;
    }
  } else {
    console.log(chalk.yellow('⚠️  Not running on Debian/Ubuntu. Please install dependencies manually:'));
    console.log('- Node.js 18.x');
    console.log('- Git');
    console.log('- Shopify CLI (@shopify/cli @shopify/theme)');
  }

  // Create .env file
  try {
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'SHOPIFY_STORE',
        message: 'Shopify store domain (e.g., your-store.myshopify.com):',
        validate: input => input.includes('.myshopify.com') ? true : 'Must include .myshopify.com'
      },
      {
        type: 'input',
        name: 'SHOPIFY_THEME_ID',
        message: 'Theme ID:',
        validate: input => /^\d+$/.test(input) ? true : 'Must be a number'
      },
      {
        type: 'password',
        name: 'SHOPIFY_PASSWORD',
        message: 'Shopify API password (create at https://your-store.myshopify.com/admin/settings/apps/development):',
        validate: input => input.length > 0 ? true : 'Password cannot be empty'
      },
      {
        type: 'input',
        name: 'GITHUB_USER',
        message: 'GitHub username:',
        validate: input => input.length > 0 ? true : 'Username cannot be empty'
      },
      {
        type: 'password',
        name: 'GITHUB_TOKEN',
        message: 'GitHub personal access token (optional):',
      }
    ]);

    let envContent = '';
    Object.entries(answers).forEach(([key, value]) => {
      if (value) {
        envContent += `${key}=${value}\n`;
      }
    });

    fs.writeFileSync(path.join(process.cwd(), '.env'), envContent);
    console.log(chalk.green('✅ Environment configuration saved to .env file'));
  } catch (error) {
    console.error(chalk.red(`Error setting up environment: ${error.message}`));
  }
}

function execPromise(command) {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(stdout);
    });
  });
}

module.exports = {
  setupEnvironment
}; 