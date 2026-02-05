import '@/i18n'

import { useState } from 'react'
import { useColorScheme } from 'react-native'
import { useTranslation } from 'react-i18next'
import { TamaguiProvider, config, Box, Text, Button, ButtonText, NumberInput, Switch } from '@ds'

export default function App(): React.JSX.Element {
  const { t } = useTranslation()
  const colorScheme = useColorScheme()
  const [count, setCount] = useState('')
  const [enabled, setEnabled] = useState(false)

  return (
    <TamaguiProvider config={config} defaultTheme={colorScheme ?? 'light'}>
      <Box
        flex={1}
        alignItems="center"
        justifyContent="center"
        padding={24}
        backgroundColor="$background"
      >
        <Text variant="title" marginBottom={24}>
          {t('app.title')}
        </Text>

        <Text variant="body" color="$colorMuted" marginBottom={32}>
          {t('app.themeActive', { theme: colorScheme })}
        </Text>

        <Button variant="primary" size="md" marginBottom={12}>
          <ButtonText variant="primary">{t('app.primaryButton')}</ButtonText>
        </Button>

        <Button variant="secondary" size="sm" marginBottom={32}>
          <ButtonText variant="secondary">{t('app.secondaryButton')}</ButtonText>
        </Button>

        <NumberInput
          value={count}
          onChangeText={setCount}
          placeholder={t('app.numberInputPlaceholder')}
          width={200}
          marginBottom={24}
        />

        <Box flexDirection="row" alignItems="center" gap={12}>
          <Text variant="body">{t('app.toggle')}</Text>
          <Switch checked={enabled} onCheckedChange={setEnabled}>
            <Switch.Thumb />
          </Switch>
        </Box>
      </Box>
    </TamaguiProvider>
  )
}
