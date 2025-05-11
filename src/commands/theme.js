const chalk = require('chalk');
const inquirer = require('inquirer');
const { shopifyCLI } = require('../utils/shopify');
const { checkIsMainBranch, commitAndPush } = require('../utils/git');
const { getConfig } = require('../utils/config');

async function pullTheme() {
  try {
    const config = getConfig();
    const themeId = process.env.SHOPIFY_THEME_ID;
    const ignoreFiles = config.theme.ignore.join(',');
    
    await shopifyCLI('pull', [
      `--theme-id=${themeId}`,
      ignoreFiles ? `--ignore=${ignoreFiles}` : ''
    ].filter(Boolean));
    
    console.log(chalk.green('✅ Theme pulled successfully'));
  } catch (error) {
    console.error(chalk.red(`Error pulling theme: ${error.message}`));
  }
}

async function pushTheme(options) {
  try {
    const config = getConfig();
    const isMainBranch = await checkIsMainBranch();
    const productionBranch = config.git.productionBranch || 'main';
    
    if (!isMainBranch && !options.force) {
      console.log(chalk.yellow(`⚠️ Warning: You are not on the ${productionBranch} branch.`));
      
      const { confirm } = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'confirm',
          message: `Only the ${productionBranch} branch should be pushed to the live theme. Continue anyway?`,
          default: false
        }
      ]);
      
      if (!confirm) {
        console.log(chalk.blue(`Push cancelled. Switch to the ${productionBranch} branch first.`));
        return;
      }
    }
    
    const themeId = process.env.SHOPIFY_THEME_ID;
    const ignoreFiles = config.theme.ignore.join(',');
    
    await shopifyCLI('push', [
      `--theme-id=${themeId}`,
      ignoreFiles ? `--ignore=${ignoreFiles}` : '',
      '--allow-live'
    ].filter(Boolean));
    
    console.log(chalk.green('✅ Theme pushed successfully'));
    
    // Auto-commit if configured
    if (config.git.autoCommit && isMainBranch) {
      const timestamp = new Date().toISOString();
      await commitAndPush(`Theme push at ${timestamp}`);
      console.log(chalk.green('✅ Changes committed and pushed to Git'));
    }
  } catch (error) {
    console.error(chalk.red(`Error pushing theme: ${error.message}`));
  }
}

module.exports = {
  pullTheme,
  pushTheme
}; 