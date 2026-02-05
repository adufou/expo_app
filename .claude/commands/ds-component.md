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
   - Import `styled` from `@tamagui/core`
   - Import `GetProps` for type inference
   - A styled Frame using Tamagui (variants, sizes, states as needed)
   - Export the component AND its Props type
   - Use semantic tokens (`$primary`, `$background`, etc.) — never raw tokens
   - If variants exceed ~30 lines, extract them into `$ARGUMENTS.variants.ts`

3. **Create `$ARGUMENTS.test.tsx`** with:
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
- [ ] Semantic tokens are used (no hardcoded values)
- [ ] Barrel export and root index are updated
- [ ] Tests pass
