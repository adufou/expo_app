import { useState } from 'react'
import { useColorScheme } from 'react-native'
import { TamaguiProvider, config, Box, Text, Button, ButtonText, NumberInput, Switch } from '@ds'

export default function App(): React.JSX.Element {
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
          Design System
        </Text>

        <Text variant="body" color="$colorMuted" marginBottom={32}>
          {colorScheme} theme active
        </Text>

        <Button variant="primary" size="md" marginBottom={12}>
          <ButtonText variant="primary">Primary Button</ButtonText>
        </Button>

        <Button variant="secondary" size="sm" marginBottom={32}>
          <ButtonText variant="secondary">Secondary Button</ButtonText>
        </Button>

        <NumberInput
          value={count}
          onChangeText={setCount}
          placeholder="Enter a number"
          keyboardType="numeric"
          inputMode="numeric"
          width={200}
          marginBottom={24}
        />

        <Box flexDirection="row" alignItems="center" gap={12}>
          <Text variant="body">Toggle</Text>
          <Switch checked={enabled} onCheckedChange={setEnabled}>
            <Switch.Thumb />
          </Switch>
        </Box>
      </Box>
    </TamaguiProvider>
  )
}
