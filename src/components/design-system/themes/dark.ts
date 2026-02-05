import { colors } from '@/components/design-system/tokens/colors'
import type { ThemeTokens } from '@/components/design-system/themes/types'

export const darkTheme: ThemeTokens = {
  background: colors.gray900,
  backgroundHover: colors.gray800,
  backgroundPress: colors.gray700,
  backgroundDisabled: colors.gray800,

  color: colors.gray50,
  colorMuted: colors.gray400,
  colorInverse: colors.gray900,

  primary: colors.blue400,
  primaryHover: colors.blue500,
  primaryPress: colors.blue600,
  primaryForeground: colors.white,

  borderColor: colors.gray600,
  borderColorFocus: colors.blue400,
}
