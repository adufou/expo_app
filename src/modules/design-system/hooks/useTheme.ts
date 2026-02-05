import { useTheme as useTamaguiTheme } from 'tamagui'
import type { ThemeTokens } from '@/modules/design-system/themes/types'

export function useTheme(): ThemeTokens {
  return useTamaguiTheme() as unknown as ThemeTokens
}
