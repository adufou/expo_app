---
description: Scaffold a new Design System component with full structure (component, types, tests, barrel exports)
---

Create a new Design System component named `$ARGUMENTS` in `src/modules/design-system/components/`.

> **`$ARGUMENTS` must be PascalCase** (e.g., `Button`, `FormField`, `IconButton`).

Before starting, read the `ds-architecture` skill to understand conventions.

## Structure to create

```
src/modules/design-system/components/$ARGUMENTS/
├── $ARGUMENTS.tsx
├── $ARGUMENTS.test.tsx
└── index.ts
```

## Steps

1. **Create the folder** `src/modules/design-system/components/$ARGUMENTS/`

2. **Create `$ARGUMENTS.tsx`** with:
   - Use `forwardRef` for the component
   - Use `StyleSheet.create` for static styles
   - Use `useTheme()` from `@/modules/design-system/hooks/useTheme` for theme colors
   - Use `useMemo` for composing theme-dependent styles
   - Use `Pressable` for interactive components (supports hover/press states)
   - Export the component AND its Props type
   - Use theme values (`theme.primary`, `theme.background`, etc.) — never raw color tokens directly in styles

3. **Create `$ARGUMENTS.test.tsx`** with:
   - Wrap renders with `<ThemeProvider defaultTheme="light">` from `@/modules/design-system/config`
   - Basic render test
   - One test per variant
   - State tests (disabled, pressed, focused) if applicable

4. **Create `index.ts`**:
   ```typescript
   export { $ARGUMENTS } from './$ARGUMENTS'
   export type { ${ARGUMENTS}Props } from './$ARGUMENTS'
   ```

5. **Update the barrel export** in `src/modules/design-system/components/index.ts`:
   ```typescript
   export { $ARGUMENTS } from './$ARGUMENTS'
   ```

6. **Update the public export** in `src/modules/design-system/index.ts`:
   ```typescript
   export { $ARGUMENTS } from './components/$ARGUMENTS'
   export type { ${ARGUMENTS}Props } from './components/$ARGUMENTS'
   ```

## Checklist

- [ ] Component does not import anything from `src/` outside the DS
- [ ] Props are typed and exported
- [ ] Theme colors are used via `useTheme()` (no hardcoded colors)
- [ ] Static styles use `StyleSheet.create`
- [ ] Dynamic/theme styles use `useMemo`
- [ ] Barrel export and root index are updated
- [ ] Tests pass
