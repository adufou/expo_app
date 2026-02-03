import { create } from 'zustand';

interface CounterState {
  count: number;
}

interface CounterActions {
  increment: () => void;
  decrement: () => void;
  setCount: (value: number) => void;
  reset: () => void;
}

type CounterStore = CounterState & CounterActions;

const initialState: CounterState = {
  count: 0,
};

export const useCounterStore = create<CounterStore>((set) => ({
  ...initialState,

  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  setCount: (value: number) => set({ count: value }),
  reset: () => set(initialState),
}));
