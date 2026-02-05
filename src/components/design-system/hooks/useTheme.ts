import { useTheme as useTamaguiTheme } from 'tamagui'
import type { ThemeTokens } from '@/components/design-system/themes/types'

export function useTheme(): ThemeTokens {
  return useTamaguiTheme() as unknown as ThemeTokens
}
