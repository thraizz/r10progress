# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Frontend Development

- `npm run dev` - Start development server with Firebase emulators and watch mode for functions
- `npm run build` - Build the production app (includes TypeScript compilation)
- `npm run lint` - Run ESLint on TypeScript/TSX files
- `npm run preview` - Preview the production build locally
- `npm run emulate` - Start Firebase emulators with imported data
- `npm run emulate:export` - Start emulators and export data on exit

### Functions Development

Navigate to `functions/` directory:

- `npm run build` - Compile TypeScript functions
- `npm run build:watch` - Compile functions in watch mode
- `npm run lint` - Run ESLint on functions code
- `npm run serve` - Build and start Firebase function emulators

### Testing

- Tests are configured for Vitest (frontend) and Jest (functions)
- Frontend tests: Run with `vitest` (configured in vite.config.ts)
- Functions tests: Run with `jest` in functions directory

## Architecture Overview

### Frontend Structure

- **React 18** with TypeScript, using React Router for navigation
- **State Management**: Context providers (User, Settings, Session, TrackingConsent) + Jotai for specific state
- **Styling**: Tailwind CSS with Sass, using Headless UI and Heroicons
- **Data Visualization**: ECharts (echarts-for-react), React-Vega, AG Grid for tables
- **Firebase Integration**: Authentication, Firestore, Functions

### Key Context Providers (in main.tsx order)

1. **UserProvider** - Authentication and user data
2. **SettingsProvider** - App settings and preferences
3. **SessionProvider** - Golf session/shot data management
4. **TrackingConsentProvider** - Analytics consent management

### Data Types

- **GolfSwingData** - Multilingual support (EN/DE/ES/NL) for Garmin R10 CSV data
- Extensive type definitions for golf metrics with unit conversions
- Location: `src/types/GolfSwingData.ts`

### Firebase Functions

- **analyzeShotPatterns** - AI analysis using OpenAI GPT-4o-mini
- **getPracticeRecommendations** - Personalized practice plans
- **checkMembershipStatus** - Subscription management
- **handleBuyMeACoffeeWebhook** - Payment processing

### Project Structure

- **src/components/** - Reusable UI components, organized by feature
- **src/views/** - Page-level components
- **src/hooks/** - Custom React hooks
- **src/utils/** - Helper functions and data processing
- **src/provider/** - Context providers
- **functions/src/** - Firebase Cloud Functions

### Key Features

- Golf shot data import from Garmin R10 CSV files
- Multi-language support for CSV data
- Data visualization with charts and dispersion analysis
- AI-powered shot analysis and coaching recommendations
- Session-based data organization with goals tracking
- Firebase emulator support for local development

### Development Notes

- Uses Bun as package manager (`bun install`)
- Sentry integration for error tracking (disabled in development)
- Environment variables for Firebase config
- Emulator data stored in `firebaseEmulatorData/` for consistent development
- Functions use Node.js 22 runtime
