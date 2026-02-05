import { styled, GetProps, View, Text as TamaguiText } from 'tamagui'
import { spacing } from '@/components/design-system/tokens/spacing'
import { radii } from '@/components/design-system/tokens/radii'
import { typography } from '@/components/design-system/tokens/typography'

const ButtonFrame = styled(View, {
  name: 'Button',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'row',
  borderRadius: radii.md,
  cursor: 'pointer',

  variants: {
    variant: {
      primary: {
        backgroundColor: '$primary',
        hoverStyle: { backgroundColor: '$primaryHover' },
        pressStyle: { backgroundColor: '$primaryPress' },
      },
      secondary: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: '$borderColor',
        hoverStyle: { backgroundColor: '$backgroundHover' },
        pressStyle: { backgroundColor: '$backgroundPress' },
      },
    },

    size: {
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
    },

    disabled: {
      true: {
        opacity: 0.5,
        cursor: 'not-allowed',
        pointerEvents: 'none',
      },
    },
  } as const,

  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
})

export const ButtonText = styled(TamaguiText, {
  name: 'ButtonText',
  fontWeight: typography.fontWeight.semibold,

  variants: {
    variant: {
      primary: { color: '$primaryForeground' },
      secondary: { color: '$color' },
    },

    size: {
      sm: { fontSize: 14 },
      md: { fontSize: typography.fontSize.body },
      lg: { fontSize: 18 },
    },
  } as const,

  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
})

export const Button = ButtonFrame
export type ButtonProps = GetProps<typeof ButtonFrame>
export type ButtonTextProps = GetProps<typeof ButtonText>
