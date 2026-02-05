import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react-native'
import { TamaguiProvider } from 'tamagui'
import { config } from '@/components/design-system/config'
import { Box } from '@/components/design-system/components/Box/Box'

describe('Box', () => {
  it('renders without crashing', () => {
    const { getByTestId } = render(
      <TamaguiProvider config={config} defaultTheme="light">
        <Box testID="box" />
      </TamaguiProvider>,
    )
    expect(getByTestId('box')).toBeDefined()
  })
})
