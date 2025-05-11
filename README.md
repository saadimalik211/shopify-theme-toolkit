# Shopify Theme Development Toolkit

A Node.js CLI tool for managing Shopify theme development workflow.

## Features

- Environment setup for Debian-based LXC containers
- Shopify API authentication using access tokens
- Theme pull/push operations with safety checks
- Local development server
- Git branch management
- Branch-based workflow for safe theme development

## Installation

### Option 1: Fresh Debian LXC Installation

For a fresh Debian LXC container, use the bootstrap script to set up the environment:

```bash
# Install curl if not available
apt-get update && apt-get install -y curl

# Download and run the bootstrap script
curl -s https://raw.githubusercontent.com/saadimalik211/shopify-theme-toolkit/main/bootstrap.sh | sudo bash
```

The bootstrap script will:
- Install Git, Node.js, and other essential packages
- Clone the repository
- Install project dependencies

After bootstrap is complete:
1. Navigate to the toolkit directory:
   ```bash
   cd shopify-theme-toolkit
   ```
2. Make the CLI executable and install globally:
   ```bash
   chmod +x src/index.js
   npm link
   ```
3. Now you can run the toolkit from any directory:
   ```bash
   shopify-toolkit setup
   ```

### Option 2: Manual Installation

#### Prerequisites

- Node.js 18.x or higher
- Git
- Shopify CLI (`@shopify/cli` and `@shopify/theme`)

#### Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/saadimalik211/shopify-theme-toolkit.git
   cd shopify-theme-toolkit
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Make the CLI executable and install globally:
   ```bash
   chmod +x src/index.js
   npm link
   ```

## Configuration

Run the setup command to configure your environment:

```bash
shopify-toolkit setup
```

This will:
- Install required dependencies (on Debian/Ubuntu)
- Create a `.env` file with your Shopify credentials
- Configure GitHub access

## Usage

### Authentication

```bash
shopify-toolkit login
```

### Theme Operations

Pull theme from Shopify:
```bash
shopify-toolkit pull
```

Push theme to Shopify (from main branch):
```bash
shopify-toolkit push
```

Start local development server:
```bash
shopify-toolkit dev
```

### Branch Management

Create a new branch:
```bash
shopify-toolkit branch create feature/new-header
```

Switch to a branch:
```bash
shopify-toolkit branch switch feature/new-header
```

List all branches:
```bash
shopify-toolkit branch list
```

## Workflow

1. Create a new feature branch
2. Make changes and test locally with `dev` command 
3. When ready, merge to main branch
4. Push changes to Shopify from main branch

## Configuration Options

The tool uses configuration settings in `config/default.js` that can be modified:

- Theme ignore patterns
- Git branch management
- Autocommit options
- UI preferences 