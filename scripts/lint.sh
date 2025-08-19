#!/bin/bash

# Exit on any error
set -e

echo "🔍 Running linting checks..."

# Run TypeScript type checking
echo "📝 Type checking..."
npm run type-check

# Run ESLint
echo "🔧 ESLint checking..."
npm run lint

# Run Prettier
echo "💅 Prettier checking..."
npm run prettier

echo "✅ All linting checks passed!"
