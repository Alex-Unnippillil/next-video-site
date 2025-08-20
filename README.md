
A modern video streaming platform built with Next.js 14, featuring AWS Cognito authentication, internationalization, and comprehensive development toolchain.

## Features

- 🎬 **Modern Streaming Platform** - Built with Next.js 14 and React 18
- 🔐 **AWS Cognito Authentication** - Social logins and role-based access control
- 🌍 **Internationalization** - Support for English and French with next-intl
- 🎨 **Beautiful UI** - Tailwind CSS with custom design system and shadcn/ui components
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
- PostgreSQL database (for user consent tracking)
- AWS Cognito User Pool configured

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

3. Set up environment variables

For local development create an `.env.local` file:

```
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000/api
VIDEO_API_KEY=dev-api-key
DATABASE_URL=postgresql://username:password@localhost:5432/starlight_stream
COGNITO_USER_POOL_ID=your-cognito-user-pool-id
COGNITO_CLIENT_ID=your-cognito-client-id
```

4. Set up the database

Run the SQL migration in `db/migrations/001_create_user_consent.sql` to create the table for consent timestamps.

5. Set up git hooks

```bash
npm run prepare
```

6. Start the development server

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
│   └── auth/          # Authentication utilities
├── styles/            # Additional styles
├── types/             # TypeScript type definitions
└── utils/             # Utility functions

app/[locale]/          # Internationalized pages
components/            # Shared components
db/migrations/         # Database migrations
lib/auth/             # Authentication logic
messages/             # Translation files
scripts/              # Utility scripts
terraform/            # Infrastructure as Code
```

## Technology Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Authentication**: AWS Cognito
- **Database**: PostgreSQL
- **Internationalization**: next-intl
- **Styling**: Tailwind CSS + shadcn/ui
- **Testing**: Jest + React Testing Library + Playwright
- **Linting**: ESLint + Prettier
- **Git Hooks**: Husky + lint-staged
- **Commit Convention**: Conventional Commits with commitlint

## Authentication & Authorization

The application uses AWS Cognito for authentication with role-based access control:

- **Admin Role**: Full access to admin routes (`/admin/*`)
- **Creator Role**: Access to creator tools (`/creator/*`)
- **Regular Users**: Access to public content

`lib/auth/roles.ts` exposes helpers for decoding Cognito groups and asserting roles in API routes.
`middleware.ts` protects routes based on the authenticated user's groups.

## Internationalization

The application supports multiple languages using next-intl:

- English (default)
- French

Translation files are located in the `messages/` directory. The middleware handles locale detection and routing.

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

## Infrastructure

The project includes Terraform configurations for AWS resources:

- Cognito User Pool and Identity Provider setup
- Automated scripts for Cognito group management

Ensure AWS credentials with permission to read the parameters are available in production environments.

## Scripts

- `scripts/create-cognito-groups.js` - Creates required Cognito user groups
- `scripts/accept-pr.sh` / `scripts/accept-pr.ps1` - Automated PR acceptance
- `scripts/process-all-prs.ps1` - Bulk PR processing

