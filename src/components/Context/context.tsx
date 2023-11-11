import { createContext } from 'react';
import { AppState, initialState } from './InitialState';

interface ContextProps {
  state: AppState;
  updateState: (newPartialState: Partial<AppState>) => void;
}

export const initialProps: ContextProps = {
  state: initialState,
  updateState: () => null,
};

export const context = createContext<ContextProps>(initialProps);
export type { AppState, ContextProps };
