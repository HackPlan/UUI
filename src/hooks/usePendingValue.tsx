import { useState, useCallback, useEffect } from "react";

/**
 * An useful tool to manage component's inner state.
 */
export interface UsePendingValueOptions {
  resetWhenInitialValueChanged?: boolean;
}
export function usePendingValue<T>(initialValue: T, onFinalChange: (finalValue: T) => void, options?: UsePendingValueOptions) {
  const [_innerValue, _setInnerValue] = useState<T>(initialValue)

  const innerValue = _innerValue
  const setInnerValue = useCallback((newValue: React.SetStateAction<T>, confirm = false) => {
    _setInnerValue((value) => {
      if (confirm) {
        onFinalChange((typeof newValue === 'function') ? (newValue as any)(value) : newValue)
      }
      return (typeof newValue === 'function') ? (newValue as any)(value) : newValue
    })
  }, [onFinalChange])
  const resetInnerValue = useCallback(() => { setInnerValue(initialValue) }, [initialValue, setInnerValue])

  useEffect(() => {
    if (options?.resetWhenInitialValueChanged) {
      _setInnerValue(initialValue)
    }
  }, [initialValue, options?.resetWhenInitialValueChanged])

  return [innerValue, setInnerValue, resetInnerValue] as const
}