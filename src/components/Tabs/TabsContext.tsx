import React from "react";

export interface TabsContextValue {
  value: string;
  onChange: (value: string) => void;
  focusValue: string;
  toggleTabWhenFocusChange?: boolean;
}
export const TabsContext = React.createContext<TabsContextValue | null>(null)