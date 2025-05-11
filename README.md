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

### Prerequisites

- Node.js 18.x or higher
- Git
- Shopify CLI (`@shopify/cli` and `@shopify/theme`)

### Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Make the CLI executable and install globally:
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