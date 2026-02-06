import { forwardRef } from 'react'
import { View } from 'react-native'
import type { ViewProps } from 'react-native'

export type BoxProps = ViewProps

export const Box = forwardRef<View, BoxProps>((props, ref) => {
  return <View ref={ref} {...props} />
})

Box.displayName = 'Box'
