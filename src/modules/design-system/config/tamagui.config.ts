import { createTamagui, createTokens } from 'tamagui'
import { colors } from '@/modules/design-system/tokens/colors'
import { spacing } from '@/modules/design-system/tokens/spacing'
import { radii } from '@/modules/design-system/tokens/radii'
import { lightTheme, darkTheme } from '@/modules/design-system/themes'

const tokens = createTokens({
  color: colors,
  space: spacing,
  size: spacing,
  radius: radii,
  zIndex: {
    0: 0,
    1: 100,
    2: 200,
    3: 300,
    4: 400,
    5: 500,
  },
})

export const config = createTamagui({
  tokens,
  themes: {
    light: lightTheme,
    dark: darkTheme,
  },
})

export type AppConfig = typeof config

declare module 'tamagui' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface TamaguiCustomConfig extends AppConfig {}
}
