"use client";

import { Provider } from "react-redux";
import { store } from "./store";

type ReduxProviderProps = {
  children: React.ReactNode;
};

const ReduxProvider: React.FC<ReduxProviderProps> = ({ children }) => (
  <Provider store={store}>{children}</Provider>
);

export default ReduxProvider;
