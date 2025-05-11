const chalk = require('chalk');
const { shopifyCLI } = require('../utils/shopify');

async function authenticate() {
  try {
    console.log(chalk.blue(`🔐 Authenticating with Shopify store: ${process.env.SHOPIFY_STORE}`));
    
    // Using environment variables from .env file
    // The shopifyCLI utility will convert 'login' to 'init' for the actual command
    await shopifyCLI('login', [`--password=${process.env.SHOPIFY_PASSWORD}`, `--store=${process.env.SHOPIFY_STORE}`]);
    
    console.log(chalk.green('✅ Authentication successful'));
  } catch (error) {
    console.error(chalk.red(`Error authenticating with Shopify: ${error.message}`));
    console.log(chalk.yellow('Make sure your .env file has the correct credentials'));
    console.log(chalk.yellow('Try running: shopify theme init --password=[your-password] --store=[your-store] manually to debug'));
  }
}

module.exports = {
  authenticate
}; 