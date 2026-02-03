import { View, Text, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Button } from '../components/Button';
import { NumberInput } from '../components/NumberInput';
import { useCounterStore } from '../store';

export function CounterScreen() {
  const count = useCounterStore((state) => state.count);
  const increment = useCounterStore((state) => state.increment);
  const decrement = useCounterStore((state) => state.decrement);
  const setCount = useCounterStore((state) => state.setCount);
  const reset = useCounterStore((state) => state.reset);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <Text style={styles.title}>Counter</Text>

      <View style={styles.counterContainer}>
        <NumberInput
          value={count}
          onValueChange={setCount}
          accessibilityLabel="Counter value"
        />
      </View>

      <View style={styles.buttonRow}>
        <Button
          title="-"
          onPress={decrement}
          accessibilityLabel="Decrement"
          style={styles.circleButton}
          textStyle={styles.circleButtonText}
        />
        <Button
          title="+"
          onPress={increment}
          accessibilityLabel="Increment"
          style={styles.circleButton}
          textStyle={styles.circleButtonText}
        />
      </View>

      <Button
        title="Reset"
        variant="secondary"
        onPress={reset}
        style={styles.resetButton}
        accessibilityLabel="Reset counter"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1C1C1E',
    marginBottom: 48,
  },
  counterContainer: {
    marginBottom: 32,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 24,
    marginBottom: 32,
  },
  circleButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  circleButtonText: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  resetButton: {
    marginTop: 16,
  },
});
