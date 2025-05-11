/**
 * Default configuration for Shopify Theme Toolkit
 */
module.exports = {
  // Default theme settings
  theme: {
    // Default files to ignore during push/pull operations
    ignore: [
      'config/settings_data.json',
      '.git',
      'node_modules',
      '.env'
    ]
  },
  
  // Default CLI settings
  cli: {
    // Enable colorized output
    colors: true,
    // Show spinners for long-running tasks
    spinners: true
  },
  
  // Git settings
  git: {
    // Branch that is allowed to push to live theme
    productionBranch: 'main',
    // Whether to auto-commit changes after successful theme push
    autoCommit: false
  }
}; 