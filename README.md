# next-video-site

Utility scripts and server utilities for the video site.

## Cognito

Run the script below to ensure required groups exist in the user pool:

```bash
COGNITO_USER_POOL_ID=your_pool AWS_REGION=us-east-1 node scripts/create-cognito-groups.js
```

## Auth Helpers

`lib/auth/roles.ts` exposes helpers for decoding Cognito groups and asserting roles in API routes.

`middleware.ts` protects `/admin` and `/creator` routes based on the authenticated user's groups.
=======
Example Next.js app with internationalization using `next-intl` for English and French locales.
=======

# next-video-site

## Configuration

### Public runtime config

The app reads public configuration values from `next.config.js`. These values are
exposed to the browser and should only contain non‑sensitive information.

Required variables:

- `NEXT_PUBLIC_API_BASE_URL` – Base URL for public API requests.

### Secure parameters

Sensitive values are loaded from AWS Systems Manager Parameter Store at runtime
using a small helper with in-memory caching. During development the helper falls
back to values defined in a local `.env.local` file.

Required secure parameters:

- `VIDEO_API_KEY` – API key for the video service.

For local development create an `.env.local` file:

```
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000/api
VIDEO_API_KEY=dev-api-key
```

Ensure AWS credentials with permission to read the parameters are available in
production environments.
=======
# Starlight Stream

A modern video streaming platform built with Next.js 14, featuring a comprehensive development toolchain and beautiful UI.

## Features

- 🎬 **Modern Streaming Platform** - Built with Next.js 14 and React 18
- 🎨 **Beautiful UI** - Tailwind CSS with custom design system
- 🔧 **Development Tools** - ESLint, Prettier, TypeScript with strict configuration
- 🧪 **Testing Suite** - Jest for unit tests, Playwright for E2E testing
- 📱 **Responsive Design** - Mobile-first approach with modern animations
- 🚀 **Performance Optimized** - Built-in optimizations for production
- 🔒 **Type Safe** - Full TypeScript support with path aliases
- 📦 **Modern Toolchain** - Latest tools and best practices

## Quick Start

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm

### Installation

1. Clone the repository

```bash
git clone <repository-url>
cd starlight-stream
```

2. Install dependencies

```bash
npm install
```

3. Set up git hooks

```bash
npm run prepare
```

4. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Available Scripts

### Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server

### Code Quality

- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run prettier` - Check Prettier formatting
- `npm run prettier:fix` - Fix Prettier formatting
- `npm run type-check` - Run TypeScript type checking

### Testing

- `npm run test` - Run unit tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage
- `npm run test:e2e` - Run end-to-end tests
- `npm run test:e2e:ui` - Run E2E tests with UI

### CI/CD

- `npm run ci:lint` - Run all linting checks
- `npm run ci:test` - Run all tests
- `npm run ci:all` - Run complete CI pipeline

## Project Structure

```
src/
├── app/                 # Next.js 14 App Router
│   ├── api/            # API routes
│   ├── globals.css     # Global styles
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Homepage
├── components/         # React components
│   ├── error-boundary.tsx
│   ├── features.tsx
│   ├── footer.tsx
│   ├── header.tsx
│   └── hero.tsx
├── hooks/             # Custom React hooks
├── lib/               # Utility libraries
├── styles/            # Additional styles
├── types/             # TypeScript type definitions
└── utils/             # Utility functions
```

## Technology Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Testing**: Jest + React Testing Library + Playwright
- **Linting**: ESLint + Prettier
- **Git Hooks**: Husky + lint-staged
- **Commit Convention**: Conventional Commits with commitlint

## Development Guidelines

### Code Style

- Follow ESLint and Prettier configurations
- Use TypeScript for all new code
- Implement responsive design patterns
- Write unit tests for components and utilities

### Git Workflow

- Use conventional commit messages
- Pre-commit hooks run linting and formatting
- All commits must pass linting and type checking

### Testing

- Write unit tests for complex logic
- Add E2E tests for critical user flows
- Maintain test coverage above 80%

## Path Aliases

The project uses TypeScript path aliases for cleaner imports:

- `@/*` - src directory
- `@/components/*` - components directory
- `@/lib/*` - lib directory
- `@/styles/*` - styles directory
- `@/types/*` - types directory
- `@/utils/*` - utils directory
- `@/hooks/*` - hooks directory
- `@/app/*` - app directory

## API Routes

- `GET /api/health` - Health check endpoint

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes and commit: `git commit -m 'feat: add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

This project is licensed under the MIT License.
