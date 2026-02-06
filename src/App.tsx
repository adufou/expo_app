import '@/i18n'

import { useMemo, useState } from 'react'
import { StyleSheet, useColorScheme } from 'react-native'
import { useTranslation } from 'react-i18next'
import { ThemeProvider, Box, Text, Button, ButtonText, NumberInput, Switch, useTheme } from '@ds'

export default function App(): React.JSX.Element {
  const colorScheme = useColorScheme()

  return (
    <ThemeProvider defaultTheme={colorScheme ?? 'light'}>
      <AppContent />
    </ThemeProvider>
  )
}

function AppContent(): React.JSX.Element {
  const { t } = useTranslation()
  const theme = useTheme()
  const colorScheme = useColorScheme()
  const [count, setCount] = useState('')
  const [enabled, setEnabled] = useState(false)

  const containerStyle = useMemo(
    () => [styles.container, { backgroundColor: theme.background }],
    [theme.background],
  )

  const subtitleStyle = useMemo(
    () => [styles.subtitle, { color: theme.colorMuted }],
    [theme.colorMuted],
  )

  return (
    <Box style={containerStyle}>
      <Text variant="title" style={styles.title}>
        {t('app.title')}
      </Text>

      <Text variant="body" style={subtitleStyle}>
        {t('app.themeActive', { theme: colorScheme })}
      </Text>

      <Button variant="primary" size="md" style={styles.primaryButton}>
        <ButtonText variant="primary">{t('app.primaryButton')}</ButtonText>
      </Button>

      <Button variant="secondary" size="sm" style={styles.secondaryButton}>
        <ButtonText variant="secondary">{t('app.secondaryButton')}</ButtonText>
      </Button>

      <NumberInput
        value={count}
        onChangeText={setCount}
        placeholder={t('app.numberInputPlaceholder')}
        style={styles.numberInput}
      />

      <Box style={styles.toggleRow}>
        <Text variant="body">{t('app.toggle')}</Text>
        <Switch checked={enabled} onCheckedChange={setEnabled}>
          <Switch.Thumb />
        </Switch>
      </Box>
    </Box>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    marginBottom: 24,
  },
  subtitle: {
    marginBottom: 32,
  },
  primaryButton: {
    marginBottom: 12,
  },
  secondaryButton: {
    marginBottom: 32,
  },
  numberInput: {
    width: 200,
    marginBottom: 24,
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
})
