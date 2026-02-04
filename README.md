# Expo App

A React Native app built with Expo.

## Development Setup

After cloning the repository:

```bash
# Install dependencies (this also initializes Husky via the prepare script)
npm install
```

That's it! Husky will be automatically initialized when you run `npm install`.

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm start` | Start Expo development server |
| `npm run android` | Start on Android |
| `npm run ios` | Start on iOS |
| `npm run web` | Start on web |
| `npm run lint` | Check for linting errors |
| `npm run lint:fix` | Auto-fix linting errors |
| `npm run format` | Format code with Prettier |
| `npm run format:check` | Check formatting |
| `npm run type-check` | TypeScript type checking |
| `npm run test` | Run tests |
| `npm run test:watch` | Run tests in watch mode |

## Code Quality

### Pre-commit Hook

The project uses **Husky + lint-staged**. On every commit, it automatically:
1. Runs ESLint with `--fix` on staged files
2. Runs Prettier on staged files

**Setup:** Hooks are automatically installed when you run `npm install` (via the `prepare` script). If hooks are not working, run:

```bash
npx husky init
```

### Path Aliases

Use `@/` instead of relative imports:

```typescript
// ✅ Good
import { Button } from '@/components/Button'

// ❌ Bad - will trigger ESLint error
import { Button } from '../components/Button'
```

### ESLint Rules

Key rules enforced:
- **Path alias**: Must use `@/` instead of `../`
- **TypeScript**: Explicit return types, no floating promises, strict equality
- **React Native**: No inline styles, no color literals (use `@/constants/colors`)
- **React Hooks**: Rules of hooks enforced

## Project Structure

```
src/
├── components/     # Reusable UI components
├── constants/      # App constants (colors, etc.)
├── screens/        # Screen components
└── store/          # Zustand stores
```
