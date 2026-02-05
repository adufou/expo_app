import { styled, GetProps, View } from 'tamagui'
import { createSwitch } from '@tamagui/switch'
import { radii } from '@/modules/design-system/tokens/radii'

const SwitchFrame = styled(View, {
  name: 'SwitchFrame',
  width: 52,
  height: 32,
  borderRadius: radii.full,
  backgroundColor: '$backgroundPress',
  padding: 2,
  justifyContent: 'center',
  cursor: 'pointer',

  variants: {
    checked: {
      true: { backgroundColor: '$primary' },
    },
    disabled: {
      true: { opacity: 0.5, cursor: 'not-allowed' },
    },
  } as const,
})

const SwitchThumb = styled(View, {
  name: 'SwitchThumb',
  width: 28,
  height: 28,
  borderRadius: radii.full,
  backgroundColor: '$colorInverse',
})

export const Switch = createSwitch({
  Frame: SwitchFrame,
  Thumb: SwitchThumb,
})

export type SwitchProps = GetProps<typeof Switch>
