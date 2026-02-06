import { createContext, useContext, useMemo } from 'react'
import type { ThemeTokens } from '@/modules/design-system/themes/types'
import { lightTheme } from '@/modules/design-system/themes/light'
import { darkTheme } from '@/modules/design-system/themes/dark'

type ThemeName = 'light' | 'dark'

type ThemeContextValue = {
  theme: ThemeTokens
  themeName: ThemeName
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: lightTheme,
  themeName: 'light',
})

const themes: Record<ThemeName, ThemeTokens> = {
  light: lightTheme,
  dark: darkTheme,
}

type ThemeProviderProps = {
  defaultTheme?: ThemeName
  children: React.ReactNode
}

export function ThemeProvider({
  defaultTheme = 'light',
  children,
}: ThemeProviderProps): React.JSX.Element {
  const value = useMemo(
    () => ({ theme: themes[defaultTheme], themeName: defaultTheme }),
    [defaultTheme],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useThemeContext(): ThemeContextValue {
  return useContext(ThemeContext)
}
