import { styled, GetProps, Input } from 'tamagui'
import { spacing } from '@/components/design-system/tokens/spacing'
import { radii } from '@/components/design-system/tokens/radii'
import { typography } from '@/components/design-system/tokens/typography'

export const NumberInput = styled(Input, {
  name: 'NumberInput',
  paddingHorizontal: spacing[3],
  paddingVertical: spacing[2],
  borderWidth: 1,
  borderColor: '$borderColor',
  borderRadius: radii.md,
  backgroundColor: '$background',
  color: '$color',
  fontSize: typography.fontSize.body,

  focusStyle: {
    borderColor: '$borderColorFocus',
  },

  variants: {
    disabled: {
      true: {
        backgroundColor: '$backgroundDisabled',
        opacity: 0.5,
        cursor: 'not-allowed',
      },
    },
  } as const,
})

export type NumberInputProps = GetProps<typeof NumberInput>
