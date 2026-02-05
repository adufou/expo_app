import { styled, GetProps, Text as TamaguiText } from 'tamagui'
import { typography } from '@/modules/design-system/tokens/typography'

export const Text = styled(TamaguiText, {
  name: 'Text',
  color: '$color',
  fontSize: typography.fontSize.body,
  lineHeight: typography.lineHeight.body,
  fontWeight: typography.fontWeight.regular,

  variants: {
    variant: {
      title: {
        fontSize: typography.fontSize.title,
        lineHeight: typography.lineHeight.title,
        fontWeight: typography.fontWeight.bold,
      },
      body: {},
    },
  } as const,

  defaultVariants: {
    variant: 'body',
  },
})

export type TextProps = GetProps<typeof Text>
