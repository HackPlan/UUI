import React from "react";

export interface TabsContextValue {
  value: string;
  onChange: (value: string) => void;
}
export const TabsContext = React.createContext<TabsContextValue | null>(null)