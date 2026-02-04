import { useState, useCallback, useEffect } from 'react'
import { TextInput, StyleSheet, TextInputProps } from 'react-native'
import { colors } from '@/constants/colors'

interface NumberInputProps extends Omit<TextInputProps, 'value' | 'onChangeText'> {
  value: number
  onValueChange: (value: number) => void
  min?: number
  max?: number
}

export function NumberInput({
  value,
  onValueChange,
  min = Number.MIN_SAFE_INTEGER,
  max = Number.MAX_SAFE_INTEGER,
  style,
  ...props
}: NumberInputProps): React.JSX.Element {
  const [inputValue, setInputValue] = useState(String(value))

  useEffect(() => {
    setInputValue(String(value))
  }, [value])

  const handleChangeText = useCallback((text: string) => {
    if (text === '' || text === '-' || /^-?\d*$/.test(text)) {
      setInputValue(text)
    }
  }, [])

  const commitValue = useCallback(() => {
    const parsed = parseInt(inputValue, 10)
    if (!isNaN(parsed)) {
      const clamped = Math.min(Math.max(parsed, min), max)
      onValueChange(clamped)
      setInputValue(String(clamped))
    } else {
      setInputValue(String(value))
    }
  }, [inputValue, min, max, onValueChange, value])

  return (
    <TextInput
      style={[styles.input, style]}
      value={inputValue}
      onChangeText={handleChangeText}
      onSubmitEditing={commitValue}
      onBlur={commitValue}
      keyboardType="number-pad"
      returnKeyType="done"
      selectTextOnFocus
      {...props}
    />
  )
}

const styles = StyleSheet.create({
  input: {
    fontSize: 48,
    fontWeight: 'bold',
    textAlign: 'center',
    color: colors.text,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: 12,
    minWidth: 150,
    backgroundColor: colors.background,
  },
})
