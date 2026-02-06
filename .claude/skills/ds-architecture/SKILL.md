---
name: ds-architecture
description: Architecture and conventions for the custom Design System (StyleSheet + React Native). Read before working in src/modules/design-system/.
---

# Design System — Full Architecture

## Technical Decisions

### Stack
- **React Native** (Expo) + **React Native Web** for iOS, Android, and Web
- **TypeScript** strict — mandatory
- **React Native StyleSheet** + **React Context** for styling, variants, and themes

### Why StyleSheet + Context
- Zero third-party styling dependency — built on React Native primitives
- Full control over the styling layer, no vendor lock-in
- `StyleSheet.create` for static styles (optimized by RN runtime)
- `useTheme()` hook via React Context for theme-aware colors
- `useMemo` for dynamic/theme-dependent style composition
- `Pressable` for interactive states (hover, press, focus)

### Architecture principles
- Tokens live in plain TS files (zero external dependency)
- Stable public API via the root `index.ts`
- `ThemeProvider` (React Context) provides light/dark theme
- Components use `forwardRef`, `StyleSheet.create`, and `useTheme()`

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
│   └── index.ts                    #   Combined re-export
│
├── themes/                         # Semantic token mapping
│   ├── light.ts                    #   { background: colors.white, primary: colors.blue500, ... }
│   ├── dark.ts                     #   { background: colors.gray900, primary: colors.blue400, ... }
│   ├── types.ts                    #   ThemeTokens type — shared contract for light/dark
│   └── index.ts
│
├── config/                         # Theme infrastructure
│   ├── ThemeProvider.tsx            #   React Context provider for light/dark themes
│   └── index.ts
│
├── components/                     # All components — flat structure, same level
│   ├── Box/                        #   View wrapper (layout)
│   ├── Text/                       #   Text with typographic variants
│   ├── Button/                     #   Pressable button with variants, sizes, states
│   ├── NumberInput/                 #   Numeric text input
│   ├── Switch/                     #   Toggle switch with animation
│   └── index.ts                    #   Barrel export
│
├── hooks/
│   ├── useTheme.ts                 #   Access active theme tokens
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
Box, Text                           ← Import only from tokens/hooks
         ↓
Button, NumberInput, Switch         ← May use Box, Text
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
├── Button.test.tsx         # Co-located unit tests
└── index.ts                # export { Button } from './Button'
                            # export type { ButtonProps } from './Button'
```

### Strict rules
- `index.ts` exports ONLY the public API (component + types)
- Props are defined and exported in the main `.tsx` file
- Tests are co-located in the component folder
- PascalCase for folder and file names

### Component patterns
- Use `forwardRef` for all components
- Use `StyleSheet.create` for static styles
- Use `useTheme()` to access theme colors — never hardcode colors
- Use `useMemo` when composing theme-dependent styles
- Use `Pressable` for interactive components (supports `onHoverIn/Out` on web)
- Web-only styles (e.g. `cursor`) need `as unknown as ViewStyle` cast
- Focus/blur event types: use `Parameters<NonNullable<TextInputProps['onFocus']>>` pattern

### Example component structure
```typescript
import { forwardRef, useMemo } from 'react'
import { Pressable, StyleSheet, Platform } from 'react-native'
import type { PressableProps, ViewStyle } from 'react-native'
import { useTheme } from '@/modules/design-system/hooks/useTheme'

export type MyComponentProps = PressableProps & {
  variant?: 'primary' | 'secondary'
}

export const MyComponent = forwardRef<View, MyComponentProps>(
  ({ variant = 'primary', style, ...rest }, ref) => {
    const theme = useTheme()
    const resolvedStyle = useMemo(
      () => [styles.base, { backgroundColor: theme.primary }, style],
      [theme.primary, style],
    )

    return <Pressable ref={ref} style={resolvedStyle} {...rest} />
  },
)

MyComponent.displayName = 'MyComponent'

const styles = StyleSheet.create({
  base: {
    borderRadius: 8,
    padding: 16,
  },
})
```

---

## Tokens — Principles

Tokens are plain TypeScript with `as const`. They contain no external dependencies:

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

Themes map raw tokens to semantic names. The `ThemeTokens` type guarantees light/dark parity:

```typescript
// themes/types.ts — EXAMPLE
export type ThemeTokens = {
  background: string
  backgroundHover: string
  backgroundPress: string
  color: string
  colorMuted: string
  colorInverse: string
  primary: string
  primaryHover: string
  primaryPress: string
  borderColor: string
  borderColorFocus: string
}
```

Components access theme values via `useTheme()`:
```typescript
const theme = useTheme()
// theme.primary, theme.background, etc.
```

---

## ThemeProvider

The `ThemeProvider` wraps the app and provides theme context:

```typescript
import { ThemeProvider } from '@ds'

<ThemeProvider defaultTheme={colorScheme ?? 'light'}>
  <App />
</ThemeProvider>
```

---

## Barrel Export (root index.ts)

`src/modules/design-system/index.ts` is the ONLY entry point:

```typescript
// Provider
export { ThemeProvider } from './config'

// Tokens (advanced usage only)
export { colors, spacing, typography, radii } from './tokens'

// Themes
export { lightTheme, darkTheme } from './themes'
export type { ThemeTokens } from './themes/types'

// Components — all at the same level
export { Box } from './components/Box'
export { Text } from './components/Text'
export { Button } from './components/Button'
// ... each component explicitly

// Hooks
export { useTheme } from './hooks'

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
// Correct
import { Button, useTheme } from '@ds'

// Forbidden — no deep imports
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
