import { forwardRef, useMemo } from 'react'
import { Text as RNText, StyleSheet } from 'react-native'
import type { TextProps as RNTextProps } from 'react-native'
import { typography } from '@/modules/design-system/tokens/typography'
import { useTheme } from '@/modules/design-system/hooks/useTheme'

type TextVariant = 'title' | 'body'

export type TextProps = RNTextProps & {
  variant?: TextVariant
}

const variantStyles = StyleSheet.create({
  title: {
    fontSize: typography.fontSize.title,
    lineHeight: typography.lineHeight.title,
    fontWeight: typography.fontWeight.bold,
  },
  body: {
    fontSize: typography.fontSize.body,
    lineHeight: typography.lineHeight.body,
    fontWeight: typography.fontWeight.regular,
  },
})

export const Text = forwardRef<RNText, TextProps>(({ variant = 'body', style, ...rest }, ref) => {
  const theme = useTheme()
  const resolvedStyle = useMemo(
    () => [{ color: theme.color }, variantStyles[variant], style],
    [theme.color, variant, style],
  )

  return <RNText ref={ref} style={resolvedStyle} {...rest} />
})

Text.displayName = 'Text'
