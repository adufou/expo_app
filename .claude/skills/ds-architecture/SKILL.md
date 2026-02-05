---
name: ds-architecture
description: Architecture and conventions for the custom Design System (Tamagui + React Native). Read before working in src/modules/design-system/.
---

# Design System — Full Architecture

## Technical Decisions

### Stack
- **React Native** (Expo) + **React Native Web** for iOS, Android, and Web
- **TypeScript** strict — mandatory
- **Tamagui** for styling, variants, themes, and responsive layout

### Why Tamagui
- Built-in variant system
- Themes and tokens out of the box
- Optimized cross-platform responsive and animations
- Strong TypeScript support
- Compiler extracts styles to CSS on web

### Anti vendor lock-in strategy
Tamagui is an **implementation detail**. The DS exposes its own API:
- Tokens live in plain TS files (zero Tamagui dependency)
- Stable public API via the root `index.ts`
- Consumers never import Tamagui directly
- Tamagui is confined to `config/` and `styled()` calls inside components

---

## Directory Structure

```
src/modules/design-system/
│
├── index.ts                        # Public entry point — ONLY import path for consumers
│
├── tokens/                         # Raw values (plain TypeScript, `as const`)
│   ├── colors.ts                   #   Full color palette
│   ├── spacing.ts                  #   Scale: 0, 2, 4, 6, 8, 12, 16, 20, 24, 32, 40, 48, 64
│   ├── typography.ts               #   Font families, sizes, weights, lineHeights
│   ├── radii.ts                    #   Border radius
│   ├── shadows.ts                  #   Elevation levels
│   ├── animations.ts               #   Durations and easings (raw values, not Tamagui)
│   └── index.ts                    #   Combined re-export
│
├── themes/                         # Semantic token mapping
│   ├── light.ts                    #   { background: colors.white, primary: colors.blue500, ... }
│   ├── dark.ts                     #   { background: colors.gray900, primary: colors.blue400, ... }
│   ├── types.ts                    #   ThemeTokens type — shared contract for light/dark
│   └── index.ts
│
├── config/                         # Tamagui wiring (only allowed coupling point)
│   ├── tamagui.config.ts           #   createTamagui() consuming tokens + themes
│   ├── media.ts                    #   Breakpoints: xs, sm, md, lg, xl, gtSm, gtMd...
│   ├── animations.ts               #   createAnimations(): quick, medium, slow, bouncy
│   └── index.ts
│
├── components/                     # All components — flat structure, same level
│   ├── Box/                        #   Styled View (layout)
│   ├── Text/                       #   Text with typographic variants
│   ├── Stack/                      #   XStack / YStack / ZStack
│   ├── Pressable/                  #   Pressable area with feedback
│   ├── Button/                     #   Button with variants, sizes, states
│   ├── Input/                      #   Text input
│   ├── Card/                       #   Card container
│   ├── Badge/                      #   Badge / tag
│   ├── Avatar/                     #   Profile picture
│   ├── IconButton/                 #   Icon button
│   ├── FormField/                  #   Composes Label + Input + HelperText + Error
│   ├── Dialog/                     #   Composes Overlay + Backdrop + Content
│   └── index.ts                    #   Barrel export
│
├── hooks/
│   ├── useTheme.ts                 #   Access active theme
│   ├── useMediaQuery.ts            #   Responsive helpers
│   ├── useComponentState.ts        #   Manage pressed/focused/disabled states
│   └── index.ts
│
├── utils/
│   ├── createVariants.ts           #   Helper for defining variants
│   ├── platform.ts                 #   Web/iOS/Android detection
│   └── index.ts
│
└── types/
    ├── component.types.ts          #   Shared props: Size, Variant, disabled...
    ├── theme.types.ts              #   Token and theme types
    └── index.ts
```

---

## Dependency Hierarchy

All components live at the same level in `components/`, but follow this dependency order:

```
tokens/ + themes/ + config/         ← No dependencies between them
         ↓
Box, Text, Stack, Pressable         ← Import only from tokens/config
         ↓
Button, Input, Badge, Avatar        ← May use Box, Text, Stack...
         ↓
FormField, Dialog, Drawer           ← Compose Button, Input, etc.
```

**Absolute rule**: no circular dependencies.

---

## Component Convention

Each component = one folder in `components/`:

```
Button/
├── Button.tsx              # Component + export type ButtonProps
├── Button.variants.ts      # Extracted variants (OPTIONAL — only if > ~30 lines)
├── Button.test.tsx         # Co-located unit tests
└── index.ts                # export { Button } from './Button'
                            # export type { ButtonProps } from './Button'
```

### Strict rules
- `index.ts` exports ONLY the public API (component + types)
- Props are defined and exported in the main `.tsx` file
- `.variants.ts` is optional — create only when variants exceed ~30 lines
- Tests are co-located in the component folder
- PascalCase for folder and file names

---

## Tokens — Principles

Tokens are plain TypeScript with `as const`. They contain NO Tamagui logic:

```typescript
// tokens/colors.ts — EXAMPLE
export const colors = {
  blue50:  '#eff6ff',
  blue100: '#dbeafe',
  blue500: '#3b82f6',
  blue600: '#2563eb',
  blue700: '#1d4ed8',
  gray50:  '#f9fafb',
  gray100: '#f3f4f6',
  gray900: '#111827',
  white:   '#ffffff',
  black:   '#000000',
} as const

// tokens/spacing.ts — EXAMPLE
export const spacing = {
  0: 0, 0.5: 2, 1: 4, 1.5: 6, 2: 8, 3: 12,
  4: 16, 5: 20, 6: 24, 8: 32, 10: 40, 12: 48, 16: 64,
} as const
```

---

## Themes — Principles

Themes map raw tokens → semantic names. The `ThemeTokens` type guarantees light/dark parity:

```typescript
// themes/types.ts — EXAMPLE
export type ThemeTokens = {
  background: string
  backgroundSubtle: string
  backgroundStrong: string
  color: string
  colorMuted: string
  colorInverse: string
  primary: string
  primaryHover: string
  primaryActive: string
  borderColor: string
  borderColorFocus: string
  shadowColor: string
}
```

Components use `$primary`, `$background`, etc. — **never** raw tokens directly.

---

## Barrel Export (root index.ts)

`src/modules/design-system/index.ts` is the ONLY entry point:

```typescript
// Config & Provider
export { config } from './config'

// Tokens (advanced usage only)
export { colors, spacing, typography, radii, shadows } from './tokens'

// Themes
export { lightTheme, darkTheme } from './themes'
export type { ThemeTokens } from './themes/types'

// Components — all at the same level
export { Box } from './components/Box'
export { Text } from './components/Text'
export { Button } from './components/Button'
// ... each component explicitly

// Hooks
export { useTheme, useMediaQuery } from './hooks'

// Types
export type { ButtonProps } from './components/Button'
```

---

## tsconfig Alias

```jsonc
// tsconfig.json
{
  "compilerOptions": {
    "paths": {
      "@ds":  ["./src/modules/design-system/index.ts"],
      "@ds/*": ["./src/modules/design-system/*"]
    }
  }
}
```

Usage in the app:
```tsx
// ✅ Correct
import { Button, Card, useTheme } from '@ds'

// ❌ Forbidden — no deep imports
import { Button } from '@ds/components/Button/Button'
```

---

## What Does NOT Live in the DS

| Concern | Location | Reason |
|---------|----------|--------|
| Navigation | `src/navigation/` | App-specific |
| State management | `src/stores/` | Business logic |
| API / fetching | `src/services/` | Backend-specific |
| Assets (images, fonts) | `src/assets/` | DS uses tokens, not files |
| Icons | TBD | May live in DS if custom |
