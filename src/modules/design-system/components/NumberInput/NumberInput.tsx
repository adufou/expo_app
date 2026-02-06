import { forwardRef, useState, useCallback, useMemo } from 'react'
import { TextInput, StyleSheet, Platform } from 'react-native'
import type { TextInputProps } from 'react-native'
import { spacing } from '@/modules/design-system/tokens/spacing'
import { radii } from '@/modules/design-system/tokens/radii'
import { typography } from '@/modules/design-system/tokens/typography'
import { useTheme } from '@/modules/design-system/hooks/useTheme'

export type NumberInputProps = TextInputProps & {
  disabled?: boolean
}

export const NumberInput = forwardRef<TextInput, NumberInputProps>(
  ({ onChangeText, disabled = false, style, onFocus, onBlur, ...rest }, ref) => {
    const theme = useTheme()
    const [focused, setFocused] = useState(false)

    const handleChangeText = useCallback(
      (text: string): void => {
        onChangeText?.(text.replace(/[^0-9]/g, ''))
      },
      [onChangeText],
    )

    const handleFocus = useCallback(
      (...args: Parameters<NonNullable<TextInputProps['onFocus']>>) => {
        setFocused(true)
        onFocus?.(...args)
      },
      [onFocus],
    )

    const handleBlur = useCallback(
      (...args: Parameters<NonNullable<TextInputProps['onBlur']>>) => {
        setFocused(false)
        onBlur?.(...args)
      },
      [onBlur],
    )

    const resolvedStyle = useMemo(
      () => [
        styles.base,
        {
          borderColor: focused ? theme.borderColorFocus : theme.borderColor,
          backgroundColor: disabled ? theme.backgroundDisabled : theme.background,
          color: theme.color,
        },
        disabled && styles.disabled,
        Platform.OS === 'web' && disabled && ({ cursor: 'not-allowed' } as unknown as object),
        style,
      ],
      [focused, disabled, theme, style],
    )

    return (
      <TextInput
        ref={ref}
        keyboardType="numeric"
        inputMode="numeric"
        editable={!disabled}
        onChangeText={handleChangeText}
        onFocus={handleFocus}
        onBlur={handleBlur}
        style={resolvedStyle}
        {...rest}
      />
    )
  },
)

NumberInput.displayName = 'NumberInput'

const styles = StyleSheet.create({
  base: {
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[2],
    borderWidth: 1,
    borderRadius: radii.md,
    fontSize: typography.fontSize.body,
  },
  disabled: {
    opacity: 0.5,
  },
})
