#!/bin/bash

# Exit on any error
set -e

echo "🧪 Running test suite..."

# Run unit tests with coverage
echo "📊 Running unit tests with coverage..."
npm run test:coverage

# Install Playwright browsers if not already installed
echo "🎭 Installing Playwright browsers..."
npx playwright install --with-deps

# Run end-to-end tests
echo "🔄 Running end-to-end tests..."
npm run test:e2e

echo "✅ All tests passed!"
