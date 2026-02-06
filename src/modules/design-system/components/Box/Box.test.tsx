import { render } from '@testing-library/react-native'
import { ThemeProvider } from '@/modules/design-system/config'
import { Box } from '@/modules/design-system/components/Box/Box'

describe('Box', () => {
  it('renders without crashing', () => {
    const { getByTestId } = render(
      <ThemeProvider defaultTheme="light">
        <Box testID="box" />
      </ThemeProvider>,
    )
    expect(getByTestId('box')).toBeDefined()
  })
})
