import React from "react";

export interface AccordionContextValue {
  expandedIds: Set<string>;
  onPaneClicked: (index: string) => void;
  onNextPaneFocused?: () => void;
  onPrevPaneFocused?: () => void;
  onFirstPaneFocused?: () => void;
  onLastPaneFocused?: () => void;
}

export const AccordionContext = React.createContext<AccordionContextValue | null>(null)