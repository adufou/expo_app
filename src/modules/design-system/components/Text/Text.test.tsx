import { render } from '@testing-library/react-native'
import { ThemeProvider } from '@/modules/design-system/config'
import { Text } from '@/modules/design-system/components/Text/Text'

describe('Text', () => {
  it('renders with default body variant', () => {
    const { getByText } = render(
      <ThemeProvider defaultTheme="light">
        <Text>Hello</Text>
      </ThemeProvider>,
    )
    expect(getByText('Hello')).toBeDefined()
  })

  it('renders title variant', () => {
    const { getByText } = render(
      <ThemeProvider defaultTheme="light">
        <Text variant="title">Title</Text>
      </ThemeProvider>,
    )
    expect(getByText('Title')).toBeDefined()
  })
})
