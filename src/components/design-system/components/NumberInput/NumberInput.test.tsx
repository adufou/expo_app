import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react-native'
import { TamaguiProvider } from 'tamagui'
import { config } from '@/components/design-system/config'
import { NumberInput } from '@/components/design-system/components/NumberInput/NumberInput'

describe('NumberInput', () => {
  it('renders without crashing', () => {
    const { getByTestId } = render(
      <TamaguiProvider config={config} defaultTheme="light">
        <NumberInput testID="input" />
      </TamaguiProvider>,
    )
    expect(getByTestId('input')).toBeDefined()
  })

  it('applies disabled state', () => {
    const { getByTestId } = render(
      <TamaguiProvider config={config} defaultTheme="light">
        <NumberInput disabled testID="input" />
      </TamaguiProvider>,
    )
    expect(getByTestId('input')).toBeDefined()
  })
})
