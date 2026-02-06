import type { ThemeTokens } from '@/modules/design-system/themes/types'
import { useThemeContext } from '@/modules/design-system/config/ThemeProvider'

export function useTheme(): ThemeTokens {
  return useThemeContext().theme
}
