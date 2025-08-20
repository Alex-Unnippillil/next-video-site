#!/bin/bash

# Exit on any error
set -e

echo "🚀 Running full CI pipeline..."

# Make scripts executable
chmod +x scripts/lint.sh
chmod +x scripts/test.sh

# Run linting
echo "Step 1: Linting"
./scripts/lint.sh

# Run tests
echo "Step 2: Testing"
./scripts/test.sh

# Try building the application
echo "Step 3: Building"
echo "🏗️ Building application..."
npm run build

echo "✅ CI pipeline completed successfully!"
