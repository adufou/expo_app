import { render } from '@testing-library/react-native'
import { TamaguiProvider } from 'tamagui'
import { config } from '@/modules/design-system/config'
import { Box } from '@/modules/design-system/components/Box/Box'

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
