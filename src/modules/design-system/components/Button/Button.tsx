import { forwardRef, useState, useMemo } from 'react'
import { Pressable, Text as RNText, StyleSheet, Platform } from 'react-native'
import type { PressableProps, TextProps as RNTextProps, ViewStyle } from 'react-native'
import { spacing } from '@/modules/design-system/tokens/spacing'
import { radii } from '@/modules/design-system/tokens/radii'
import { typography } from '@/modules/design-system/tokens/typography'
import { useTheme } from '@/modules/design-system/hooks/useTheme'
import type { ThemeTokens } from '@/modules/design-system/themes/types'

type ButtonVariant = 'primary' | 'secondary'
type ButtonSize = 'sm' | 'md' | 'lg'

export type ButtonProps = PressableProps & {
  variant?: ButtonVariant
  size?: ButtonSize
}

const sizeStyles = StyleSheet.create({
  sm: {
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[1],
    height: 32,
  },
  md: {
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[2],
    height: 40,
  },
  lg: {
    paddingHorizontal: spacing[6],
    paddingVertical: spacing[3],
    height: 48,
  },
})

function getVariantStyle(
  variant: ButtonVariant,
  theme: ThemeTokens,
  pressed: boolean,
  hovered: boolean,
): ViewStyle {
  if (variant === 'primary') {
    return {
      backgroundColor: pressed ? theme.primaryPress : hovered ? theme.primaryHover : theme.primary,
    }
  }
  return {
    backgroundColor: pressed
      ? theme.backgroundPress
      : hovered
        ? theme.backgroundHover
        : 'transparent',
    borderWidth: 1,
    borderColor: theme.borderColor,
  }
}

const baseStyles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderRadius: radii.md,
  },
  disabled: {
    opacity: 0.5,
  },
})

export const Button = forwardRef<React.ComponentRef<typeof Pressable>, ButtonProps>(
  ({ variant = 'primary', size = 'md', disabled = false, style, children, ...rest }, ref) => {
    const theme = useTheme()
    const [hovered, setHovered] = useState(false)

    return (
      <Pressable
        ref={ref}
        disabled={disabled}
        onHoverIn={() => setHovered(true)}
        onHoverOut={() => setHovered(false)}
        style={({ pressed }) => [
          baseStyles.base,
          sizeStyles[size],
          getVariantStyle(variant, theme, pressed, hovered),
          disabled && baseStyles.disabled,
          Platform.OS === 'web' && ({ cursor: disabled ? 'not-allowed' : 'pointer' } as ViewStyle),
          typeof style === 'function' ? style({ pressed }) : style,
        ]}
        {...rest}
      >
        {children}
      </Pressable>
    )
  },
)

Button.displayName = 'Button'

// --- ButtonText ---

export type ButtonTextProps = RNTextProps & {
  variant?: ButtonVariant
  size?: ButtonSize
}

const textSizeStyles = StyleSheet.create({
  sm: { fontSize: 14 },
  md: { fontSize: typography.fontSize.body },
  lg: { fontSize: 18 },
})

export const ButtonText = forwardRef<RNText, ButtonTextProps>(
  ({ variant = 'primary', size = 'md', style, ...rest }, ref) => {
    const theme = useTheme()
    const color = variant === 'primary' ? theme.primaryForeground : theme.color
    const resolvedStyle = useMemo(
      () => [{ fontWeight: typography.fontWeight.semibold, color }, textSizeStyles[size], style],
      [color, size, style],
    )

    return <RNText ref={ref} style={resolvedStyle} {...rest} />
  },
)

ButtonText.displayName = 'ButtonText'
