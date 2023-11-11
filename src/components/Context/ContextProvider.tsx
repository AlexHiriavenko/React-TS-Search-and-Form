import { ReactNode, useState } from 'react';
import { context, initialProps, AppState, ContextProps } from './context';

function ContextProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState(initialProps.state);

  const updateState = (newPartialState: Partial<AppState>) => {
    setState((prevState) => ({ ...prevState, ...newPartialState }));
  };

  const contextValue: ContextProps = {
    state,
    updateState,
  };

  return <context.Provider value={contextValue}>{children}</context.Provider>;
}

export default ContextProvider;
