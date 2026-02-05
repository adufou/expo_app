import { forwardRef } from 'react'
import { styled, GetProps, Input, TamaguiElement } from 'tamagui'
import { spacing } from '@/modules/design-system/tokens/spacing'
import { radii } from '@/modules/design-system/tokens/radii'
import { typography } from '@/modules/design-system/tokens/typography'

const StyledNumberInput = styled(Input, {
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

export type NumberInputProps = GetProps<typeof StyledNumberInput>

export const NumberInput = forwardRef<TamaguiElement, NumberInputProps>(
  ({ onChangeText, ...rest }, ref): React.JSX.Element => {
    const handleChangeText = (text: string): void => {
      onChangeText?.(text.replace(/[^0-9]/g, ''))
    }

    return (
      <StyledNumberInput
        ref={ref}
        keyboardType="numeric"
        inputMode="numeric"
        onChangeText={handleChangeText}
        {...rest}
      />
    )
  },
)

NumberInput.displayName = 'NumberInput'
