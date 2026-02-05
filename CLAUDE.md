# Project Context

## Stack
- React Native (Expo) + React Native Web
- TypeScript strict
- Tamagui (styling, themes, variants)
- Custom Design System: `src/modules/design-system/`

## Package Manager
- **pnpm** — use `pnpm` for all install/add/remove commands (never npm/yarn)
- `.npmrc`: `node-linker=hoisted` (required for Expo/RN compatibility)

## Major Dependencies
| Category | Package | Version |
|---|---|---|
| Framework | expo | ~54 (SDK 54) |
| UI Runtime | react-native | 0.81 |
| Web | react-native-web | 0.21 |
| React | react / react-dom | 19.1 |
| Styling | tamagui / @tamagui/core | 2.0.0-rc.4 |
| i18n | i18next + react-i18next | 25 / 16 |
| Testing | vitest + @testing-library/react-native | 4 / 13 |
| Linting | eslint + prettier | 9 / 3 |
| Git hooks | husky + lint-staged | 9 / 16 |

## Scripts
- `pnpm start` — start Expo dev server
- `pnpm test` / `pnpm test:watch` — run tests (vitest)
- `pnpm lint` / `pnpm lint:fix` — ESLint
- `pnpm format` / `pnpm format:check` — Prettier
- `pnpm type-check` — TypeScript (`tsc --noEmit`)

## Design System — Critical Rules

1. **Total isolation**: the DS never imports anything from `src/` (no services, stores, navigation, or app config)
2. **Single entry point**: the app imports only via `@ds` (tsconfig alias) — no deep imports into subfolders
3. **Tamagui is confined**: Tamagui dependency stays inside `config/` and `styled()` calls in components
4. **Pure tokens**: `tokens/` = plain TypeScript with `as const`, zero Tamagui dependency

## DS Structure (summary)

```
src/modules/design-system/
├── index.ts          # Single public export
├── tokens/           # Raw values (colors, spacing, typography, radii, shadows, animations)
├── themes/           # light.ts, dark.ts, types.ts
├── config/           # tamagui.config.ts, media.ts, animations.ts
├── components/       # All components flat (Box, Button, FormField... same level)
├── hooks/            # useTheme, useMediaQuery, useComponentState
├── utils/            # createVariants, platform
└── types/            # component.types.ts, theme.types.ts
```

## Available Skills

- **ds-architecture** — Full technical decisions, detailed structure, and conventions. Read this skill BEFORE modifying anything in `src/modules/design-system/`.

## Commands

- `/ds-component <Name>` — Scaffold a new DS component with full structure

## General Conventions
- No `any` — use `unknown`
- Tests co-located with components
- Conventional commits (feat/fix/chore)
- Small, focused diffs — no unrequested refactors
- Propose a bullet-point plan before coding, wait for approval
