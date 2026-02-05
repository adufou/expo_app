import { describe, it, expect, vi } from 'vitest'
import { render, fireEvent } from '@testing-library/react-native'
import { TamaguiProvider } from 'tamagui'
import { config } from '@/modules/design-system/config'
import { NumberInput } from '@/modules/design-system/components/NumberInput/NumberInput'

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

  it('filters non-numeric characters', () => {
    const handleChange = vi.fn()
    const { getByTestId } = render(
      <TamaguiProvider config={config} defaultTheme="light">
        <NumberInput testID="input" onChangeText={handleChange} />
      </TamaguiProvider>,
    )

    fireEvent.changeText(getByTestId('input'), 'abc123def')
    expect(handleChange).toHaveBeenCalledWith('123')
  })

  it('calls onChangeText with empty string when input is all non-numeric', () => {
    const handleChange = vi.fn()
    const { getByTestId } = render(
      <TamaguiProvider config={config} defaultTheme="light">
        <NumberInput testID="input" onChangeText={handleChange} />
      </TamaguiProvider>,
    )

    fireEvent.changeText(getByTestId('input'), 'abcdef')
    expect(handleChange).toHaveBeenCalledWith('')
  })
})
