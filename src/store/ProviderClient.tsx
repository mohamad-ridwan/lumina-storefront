"use client";

import { ReactNode } from "react";
import { store } from ".";
import { Provider } from "react-redux";

interface Props {
  children: ReactNode;
}

const ProviderClient = ({ children }: Props) => {
  return <Provider store={store}>{children}</Provider>;
};

export default ProviderClient;
