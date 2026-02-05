import { render } from '@testing-library/react-native'
import { TamaguiProvider } from 'tamagui'
import { config } from '@/modules/design-system/config'
import { Switch } from '@/modules/design-system/components/Switch/Switch'

describe('Switch', () => {
  it('renders without crashing', () => {
    const { getByTestId } = render(
      <TamaguiProvider config={config} defaultTheme="light">
        <Switch testID="switch">
          <Switch.Thumb />
        </Switch>
      </TamaguiProvider>,
    )
    expect(getByTestId('switch')).toBeDefined()
  })
})
