const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

// Load default configuration
const defaultConfig = require('../../config/default');

// Get configuration
function getConfig() {
  return defaultConfig;
}

function validateConfig() {
  // Check if .env file exists
  if (!fs.existsSync(path.join(process.cwd(), '.env'))) {
    console.error(chalk.red('Error: .env file not found.'));
    console.log(chalk.yellow('Run "shopify-toolkit setup" to configure.'));
    process.exit(1);
  }

  // Validate required environment variables
  const requiredVars = [
    'SHOPIFY_STORE',
    'SHOPIFY_THEME_ID',
    'SHOPIFY_PASSWORD'
  ];

  const missingVars = requiredVars.filter(varName => !process.env[varName]);
  
  if (missingVars.length > 0) {
    console.error(chalk.red('Error: Missing required environment variables:'));
    missingVars.forEach(varName => {
      console.error(chalk.yellow(`  - ${varName}`));
    });
    console.log(chalk.blue('Update your .env file with these values.'));
    process.exit(1);
  }
}

module.exports = {
  validateConfig,
  getConfig
}; 