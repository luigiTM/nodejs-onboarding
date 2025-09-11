# Node.js Banking API

A banking API built with Node.js, Express, TypeScript, and PostgreSQL.

## Features

- User authentication (login/register)
- Account management
- Account-to-account transactions
- Currency conversion
- Cron jobs for exchange rate updates

## Core Technologies

- Node.js
- TypeScript
- Express.js
- PostgreSQL
- Knex.js (Migrations and Query Builder)
- Objection.js (ORM)
- JWT for authentication
- Inversify (Dependency Injection)
- Zod (Schema validation)

## Prerequisites

- Node.js (LTS version recommended)
- PostgreSQL
- Yarn

## Environment Setup

1. Clone the repository:

```bash
git clone [repository-url]
cd nodejs-onboarding
```

2. Install dependencies:

```bash
yarn install
```

3. Configure environment variables:
   Create a `.env` file in the project root with the following variables:

```env
# API Configuration
PORT=3000
API_VERSION=1
MORGAN_LEVEL=dev

# Authentication
JWT_SECRET=your_jwt_secret_key

# Database Configuration
DATABASE_URL=localhost
DATABASE_PORT=5432
DATABASE_USER=nodejs-onboarding
DATABASE_PASSWORD=12345
DATABASE=nodejs-onboarding

# Transaction Settings
TRANSACTION_FEE_PERCENTAGE=0.01
FEES_ACCOUNT_EMAIL=account@fees.com

# External Services
FREE_CURRENCY_API_URL="https://api.freecurrencyapi.com/v1/"
FREE_CURRENCY_API_KEY=your_api_key
```

4. Set up the database:

```bash
# Run all migrations
yarn knex:migrate

# Seed the database with initial data
yarn knex:seed

# Or use the all-in-one command
yarn knex:rebuild-database
```

## Running the Project

For development:

```bash
yarn start:dev
```

## Project Structure

- `/src`
  - `/api` - Routes and controllers
  - `/config` - Project configurations
  - `/crons` - Scheduled jobs
  - `/db` - Migrations, seeds, and database configuration
  - `/dtos` - Data Transfer Objects
  - `/errors` - Custom error classes
  - `/model` - Database models
  - `/repositories` - Database access layer
  - `/services` - Business logic
  - `/util` - Utilities and helpers

## Available Scripts

- `yarn start:dev` - Starts the server in development mode
- `yarn knex:migrate` - Runs pending migrations
- `yarn knex:rollback` - Reverts the last migration
- `yarn knex:rollback-all` - Reverts all migrations
- `yarn knex:seed` - Runs the seeds
- `yarn knex:rebuild-database` - Rebuilds the database from scratch

## Development

The project uses several tools to ensure code quality:

- ESLint for linting
- Prettier for code formatting
- Husky for git hooks
- TypeScript for static typing

Commits are automatically verified using lint-staged and husky.
