const chalk = require('chalk');
const { shopifyCLI } = require('../utils/shopify');

async function startDev() {
  try {
    console.log(chalk.blue('Starting Shopify development server...'));
    console.log(chalk.yellow('Press Ctrl+C to stop the server'));
    
    // This will run in the foreground
    const themeId = process.env.SHOPIFY_THEME_ID;
    await shopifyCLI('dev', [`--theme-id=${themeId}`]);
  } catch (error) {
    console.error(chalk.red(`Error starting development server: ${error.message}`));
  }
}

module.exports = {
  startDev
}; 