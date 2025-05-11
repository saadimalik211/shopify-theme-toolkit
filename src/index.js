#!/usr/bin/env node
require('dotenv').config();
const { Command } = require('commander');
const chalk = require('chalk');
const { validateConfig } = require('./utils/config');

// Command imports
const setupCommands = require('./commands/setup');
const loginCommands = require('./commands/login');
const themeCommands = require('./commands/theme');
const devCommands = require('./commands/dev');
const branchCommands = require('./commands/branch');

const program = new Command();

// Validate configuration before running
if (process.argv.length > 2 && !['setup', 'help'].includes(process.argv[2])) {
  validateConfig();
}

program
  .name('shopify-toolkit')
  .description('Shopify Theme Development Toolkit')
  .version('1.0.0');

// Setup commands
program
  .command('setup')
  .description('Set up development environment')
  .action(setupCommands.setupEnvironment);

// Login commands
program
  .command('login')
  .description('Authenticate with Shopify')
  .action(loginCommands.authenticate);

// Theme commands
program
  .command('pull')
  .description('Pull theme from Shopify')
  .action(themeCommands.pullTheme);

program
  .command('push')
  .description('Push theme to Shopify')
  .option('--force', 'Force push even if not on main branch')
  .action(themeCommands.pushTheme);

// Development commands
program
  .command('dev')
  .description('Start development server')
  .action(devCommands.startDev);

// Branch commands
program
  .command('branch')
  .description('Git branch operations');

program
  .command('branch create <name>')
  .description('Create a new branch')
  .action(branchCommands.createBranch);

program
  .command('branch switch <name>')
  .description('Switch to an existing branch')
  .action(branchCommands.switchBranch);

program
  .command('branch list')
  .description('List available branches')
  .action(branchCommands.listBranches);

program.parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp();
} 