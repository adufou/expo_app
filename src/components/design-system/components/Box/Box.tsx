import { styled, GetProps, View } from 'tamagui'

export const Box = styled(View, {
  name: 'Box',
})

export type BoxProps = GetProps<typeof Box>
