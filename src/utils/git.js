const simpleGit = require('simple-git');
const chalk = require('chalk');

const git = simpleGit();

async function getCurrentBranch() {
  try {
    return (await git.branch()).current;
  } catch (error) {
    console.error(chalk.red(`Error getting current branch: ${error.message}`));
    return null;
  }
}

async function checkIsMainBranch() {
  const currentBranch = await getCurrentBranch();
  return currentBranch === 'main';
}

async function createNewBranch(branchName) {
  try {
    await git.checkoutLocalBranch(branchName);
    return true;
  } catch (error) {
    console.error(chalk.red(`Error creating branch: ${error.message}`));
    return false;
  }
}

async function switchBranch(branchName) {
  try {
    await git.checkout(branchName);
    return true;
  } catch (error) {
    console.error(chalk.red(`Error switching branch: ${error.message}`));
    return false;
  }
}

async function commitAndPush(message) {
  try {
    await git.add('.');
    await git.commit(message);
    await git.push('origin', await getCurrentBranch());
    return true;
  } catch (error) {
    console.error(chalk.red(`Error with Git operations: ${error.message}`));
    return false;
  }
}

async function getAllBranches() {
  try {
    const branches = await git.branch();
    return {
      current: branches.current,
      all: branches.all
    };
  } catch (error) {
    console.error(chalk.red(`Error getting branches: ${error.message}`));
    return {
      current: null,
      all: []
    };
  }
}

module.exports = {
  getCurrentBranch,
  checkIsMainBranch,
  createNewBranch,
  switchBranch,
  commitAndPush,
  getAllBranches
}; 