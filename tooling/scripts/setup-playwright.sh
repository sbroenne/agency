#!/bin/bash
# Setup script for Playwright visual testing dependencies
# This installs the required system libraries for Chromium browser execution
# Requires sudo access (interactive)

set -e

echo "Installing Playwright system dependencies for Chromium..."
echo "This requires sudo access and will be prompted for your password."
echo ""

# Use playwright's built-in dependency installer
npx playwright install-deps chromium

echo ""
echo "✓ Dependencies installed successfully!"
echo "You can now run: npm run test:visual"
