import { render } from '@testing-library/react-native'
import { ThemeProvider } from '@/modules/design-system/config'
import { Switch } from '@/modules/design-system/components/Switch/Switch'

describe('Switch', () => {
  it('renders without crashing', () => {
    const { getByTestId } = render(
      <ThemeProvider defaultTheme="light">
        <Switch testID="switch">
          <Switch.Thumb />
        </Switch>
      </ThemeProvider>,
    )
    expect(getByTestId('switch')).toBeDefined()
  })
})
