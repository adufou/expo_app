import { forwardRef, useMemo, useRef, useEffect } from 'react'
import { Pressable, Animated, StyleSheet, Platform } from 'react-native'
import type { View, ViewProps, ViewStyle } from 'react-native'
import { radii } from '@/modules/design-system/tokens/radii'
import { useTheme } from '@/modules/design-system/hooks/useTheme'

export type SwitchProps = Omit<ViewProps, 'children'> & {
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
  disabled?: boolean
  children?: React.ReactNode
}

const TRACK_WIDTH = 52
const TRACK_HEIGHT = 32
const THUMB_SIZE = 28
const TRACK_PADDING = 2
const THUMB_TRAVEL = TRACK_WIDTH - THUMB_SIZE - TRACK_PADDING * 2

function SwitchThumb(): null {
  return null
}

const SwitchComponent = forwardRef<View, SwitchProps>(
  ({ checked = false, onCheckedChange, disabled = false, style, ...rest }, ref) => {
    const theme = useTheme()
    const translateX = useRef(new Animated.Value(checked ? THUMB_TRAVEL : 0)).current

    useEffect(() => {
      Animated.timing(translateX, {
        toValue: checked ? THUMB_TRAVEL : 0,
        duration: 200,
        useNativeDriver: true,
      }).start()
    }, [checked, translateX])

    const trackStyle = useMemo(
      () => [
        styles.track,
        {
          backgroundColor: checked ? theme.primary : theme.backgroundPress,
        },
        disabled && styles.disabled,
        Platform.OS === 'web' &&
          ({ cursor: disabled ? 'not-allowed' : 'pointer' } as unknown as ViewStyle),
        style,
      ],
      [checked, disabled, theme, style],
    )

    return (
      <Pressable
        ref={ref}
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onPress={() => onCheckedChange?.(!checked)}
        style={trackStyle}
        {...rest}
      >
        <Animated.View
          style={[
            styles.thumb,
            { backgroundColor: theme.colorInverse },
            { transform: [{ translateX }] },
          ]}
        />
      </Pressable>
    )
  },
)

SwitchComponent.displayName = 'Switch'

export const Switch = Object.assign(SwitchComponent, { Thumb: SwitchThumb })

const styles = StyleSheet.create({
  track: {
    width: TRACK_WIDTH,
    height: TRACK_HEIGHT,
    borderRadius: radii.full,
    padding: TRACK_PADDING,
    justifyContent: 'center',
  },
  thumb: {
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    borderRadius: radii.full,
  },
  disabled: {
    opacity: 0.5,
  },
})
