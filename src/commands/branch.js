const chalk = require('chalk');
const { createNewBranch, switchBranch, getCurrentBranch, getAllBranches } = require('../utils/git');

async function createBranch(branchName) {
  console.log(chalk.blue(`Creating new branch: ${branchName}`));
  
  const success = await createNewBranch(branchName);
  if (success) {
    console.log(chalk.green(`✅ Created and switched to branch: ${branchName}`));
  }
}

async function switchBranchCommand(branchName) {
  console.log(chalk.blue(`Switching to branch: ${branchName}`));
  
  const success = await switchBranch(branchName);
  if (success) {
    console.log(chalk.green(`✅ Switched to branch: ${branchName}`));
  }
}

async function listBranches() {
  try {
    const { current, all } = await getAllBranches();
    
    console.log(chalk.blue('\nAvailable branches:'));
    all.forEach(branch => {
      const prefix = branch === current ? chalk.green('* ') : '  ';
      console.log(`${prefix}${branch}`);
    });
    console.log('');
  } catch (error) {
    console.error(chalk.red(`Error listing branches: ${error.message}`));
  }
}

module.exports = {
  createBranch,
  switchBranch: switchBranchCommand,
  listBranches
}; 