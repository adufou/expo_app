import { colors } from '@/modules/design-system/tokens/colors'
import type { ThemeTokens } from '@/modules/design-system/themes/types'

export const lightTheme: ThemeTokens = {
  background: colors.white,
  backgroundHover: colors.gray100,
  backgroundPress: colors.gray200,
  backgroundDisabled: colors.gray100,

  color: colors.gray900,
  colorMuted: colors.gray500,
  colorInverse: colors.white,

  primary: colors.blue500,
  primaryHover: colors.blue600,
  primaryPress: colors.blue700,
  primaryForeground: colors.white,

  borderColor: colors.gray300,
  borderColorFocus: colors.blue500,
}
