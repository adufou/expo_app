import { render } from '@testing-library/react-native'
import { TamaguiProvider } from 'tamagui'
import { config } from '@/modules/design-system/config'
import { Text } from '@/modules/design-system/components/Text/Text'

describe('Text', () => {
  it('renders with default body variant', () => {
    const { getByText } = render(
      <TamaguiProvider config={config} defaultTheme="light">
        <Text>Hello</Text>
      </TamaguiProvider>,
    )
    expect(getByText('Hello')).toBeDefined()
  })

  it('renders title variant', () => {
    const { getByText } = render(
      <TamaguiProvider config={config} defaultTheme="light">
        <Text variant="title">Title</Text>
      </TamaguiProvider>,
    )
    expect(getByText('Title')).toBeDefined()
  })
})
