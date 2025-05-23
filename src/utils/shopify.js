const { exec } = require('child_process');
const chalk = require('chalk');
const ora = require('ora');

// Execute Shopify CLI commands
function shopifyCLI(command, args = []) {
  return new Promise((resolve, reject) => {
    const spinner = ora(`Running shopify ${command}...`).start();
    
    // Build command with environment variables
    // Handle 'login' command by using 'init' instead (updated for new Shopify CLI)
    const fullCommand = command === 'login' 
      ? `shopify theme init ${args.join(' ')}`
      : `shopify theme ${command} ${args.join(' ')}`;
    
    exec(fullCommand, (error, stdout, stderr) => {
      if (error) {
        spinner.fail(`Shopify command failed: ${error.message}`);
        reject(error);
        return;
      }
      
      spinner.succeed(`Shopify ${command} completed`);
      resolve(stdout);
    });
  });
}

module.exports = {
  shopifyCLI
}; 