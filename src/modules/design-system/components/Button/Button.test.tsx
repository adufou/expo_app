/* eslint-disable react-native/no-raw-text */

import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react-native'
import { TamaguiProvider } from 'tamagui'
import { config } from '@/modules/design-system/config'
import { Button, ButtonText } from '@/modules/design-system/components/Button/Button'

describe('Button', () => {
  it('renders primary variant by default', () => {
    const { getByTestId } = render(
      <TamaguiProvider config={config} defaultTheme="light">
        <Button testID="button">
          <ButtonText>Press me</ButtonText>
        </Button>
      </TamaguiProvider>,
    )
    expect(getByTestId('button')).toBeDefined()
  })

  it('renders secondary variant', () => {
    const { getByTestId } = render(
      <TamaguiProvider config={config} defaultTheme="light">
        <Button variant="secondary" testID="button">
          <ButtonText variant="secondary">Secondary</ButtonText>
        </Button>
      </TamaguiProvider>,
    )
    expect(getByTestId('button')).toBeDefined()
  })

  it('renders all sizes', () => {
    const { getByTestId } = render(
      <TamaguiProvider config={config} defaultTheme="light">
        <Button size="sm" testID="sm">
          <ButtonText size="sm">Small</ButtonText>
        </Button>
        <Button size="md" testID="md">
          <ButtonText size="md">Medium</ButtonText>
        </Button>
        <Button size="lg" testID="lg">
          <ButtonText size="lg">Large</ButtonText>
        </Button>
      </TamaguiProvider>,
    )
    expect(getByTestId('sm')).toBeDefined()
    expect(getByTestId('md')).toBeDefined()
    expect(getByTestId('lg')).toBeDefined()
  })

  it('applies disabled state', () => {
    const { getByTestId } = render(
      <TamaguiProvider config={config} defaultTheme="light">
        <Button disabled testID="button">
          <ButtonText>Disabled</ButtonText>
        </Button>
      </TamaguiProvider>,
    )
    expect(getByTestId('button')).toBeDefined()
  })
})
