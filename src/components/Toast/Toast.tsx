import React, { useEffect, useRef, useCallback } from 'react';
import { UUI } from '../../core/uui';

export interface ToastFeatureProps {
  /** Message to display in the body of the toast. */
  message: React.ReactNode | string | number;
  /**
   * Callback invoked when the toast is dismissed, either by the user or by the timeout.
   * The value of the argument indicates whether the toast was closed because the timeout expired.
   */
  onDismiss?: (id: string) => void;

  /**
   * Milliseconds to wait before automatically dismissing toast.
   * Providing a value less than or equal to 0 will disable the timeout (this is discouraged).
   * @default 5000
   */
  timeout?: number;
}
export type IToast = ToastFeatureProps & { id: string }

export const Toast = UUI.FunctionComponent({
  prefix: 'UUI',
  name: 'Toast',
  nodes: {
    Root: 'div',
  }
}, (props: IToast, nodes) => {
  const { Root } = nodes

  const finalProps = {
    timeout: props.timeout === undefined ? 5000 : props.timeout
  }

  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const startTimer = useCallback(() => {
    if (finalProps.timeout <= 0) return
    if (timer.current) clearTimeout(timer.current)
    timer.current = setTimeout(() => { props.onDismiss && props.onDismiss(props.id) }, finalProps.timeout)
  }, [timer, finalProps.timeout, props])

  const clearTimer = useCallback(() => {
    if (timer.current) clearTimeout(timer.current)
  }, [timer])

  useEffect(() => {
    startTimer()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Root
      role="alert"
      id={props.id}
      onBlur={() => { startTimer() }}
      onFocus={() => { clearTimer() }}
      onMouseEnter={() => { clearTimer() }}
      onMouseLeave={() => { startTimer() }}
    >
      {props.message}
    </Root>
  )
})

export type ToastProps = Parameters<typeof Toast>[0]