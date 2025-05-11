#!/bin/bash
set -e

# Update package lists
echo "Updating package lists..."
apt-get update

# Install essential packages
echo "Installing essential packages..."
apt-get install -y git curl wget nano build-essential

# Install Node.js (required for most Shopify development)
echo "Installing Node.js..."
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt-get install -y nodejs

# Verify installations
echo "Verifying installations..."
git --version
node --version
npm --version

# Clone the repository
echo "Cloning repository..."
git clone https://github.com/saadimalik211/shopify-theme-toolkit.git
cd shopify-theme-toolkit

# Install project dependencies
echo "Installing project dependencies..."
npm install

echo "Bootstrap complete! Your environment is ready."
echo "You can now cd into shopify-theme-toolkit and start working on your project."