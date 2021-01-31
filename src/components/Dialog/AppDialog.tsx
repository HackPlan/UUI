import React from 'react';
import ReactDOM from 'react-dom';
import { Dialog, DialogProps } from './Dialog';
import ReactHelper from '../../utils/ReactHelper';

const AppDialogRootClassName = "UUI-AppDialog-Root"

export interface AppDialogOptions {
  cancelOnClickAway?: boolean;
  cancelOnClose?: boolean;
  container?: HTMLElement;
  customize?: DialogProps['customize'];
  DialogComponent?: React.ComponentType<DialogProps>;
}

export function AppDialog(ContentComponent: (props: {
  onConfirm: () => void;
  onCancel: () => void;
}) => JSX.Element, options?: AppDialogOptions): Promise<boolean>
export function AppDialog<T>(ContentComponent: (props: {
  onConfirm: (value: T) => void;
  onCancel: () => void;
}) => JSX.Element, options?: AppDialogOptions): Promise<T | false>
export function AppDialog<T>(ContentComponent: (props: {
  onConfirm: (value?: T) => void;
  onCancel: () => void;
}) => JSX.Element, options?: AppDialogOptions): Promise<T | boolean> {
  const finalOptions = {
    cancelOnClickAway: options?.cancelOnClickAway !== undefined ? options.cancelOnClickAway : true,
    cancelOnClose: options?.cancelOnClose !== undefined ? options.cancelOnClose : true,
    container: options?.container !== undefined ? options.container : ReactHelper.document?.body,
    customize: options?.customize !== undefined ? options.customize : undefined,
  }
  const restoreFocusElement: HTMLElement = document.activeElement as HTMLElement
  if (!finalOptions.container) return Promise.resolve(false);

  const containerElement = ReactHelper.document?.createElement("div")
  const setup = () => {
    if (!finalOptions.container || !containerElement) return;
    containerElement.className = AppDialogRootClassName
    finalOptions.container.appendChild(containerElement)
  }
  const clearup = () => {
    if (!ReactHelper.document || !containerElement) return;
    ReactDOM.unmountComponentAtNode(containerElement)
    ReactHelper.document?.body.removeChild(containerElement)
    setTimeout(() => {
      restoreFocusElement.focus()
    }, 0)
  }

  setup()

  return new Promise((resolve) => {
    const DialogComponent = options?.DialogComponent || Dialog

    const RenderComponent = () => {
      return (
        <DialogComponent
          open={true}
          usePortal={false}
          onClickAway={() => {
            if (finalOptions.cancelOnClickAway) {
              resolve(false)
              clearup()
            }
          }}
          onClose={() => {
            if (finalOptions.cancelOnClose) {
              resolve(false)
              clearup()
            }
          }}
          customize={finalOptions.customize}
        >
          <ContentComponent
            onConfirm={(data) => {
              if (data !== undefined) {
                resolve(data)
              } else {
                resolve(true)
              }
              clearup()
            }}
            onCancel={() => {
              resolve(false)
              clearup()
            }}
          />
        </DialogComponent>
      )
    }

    ReactDOM.render(
      <RenderComponent />,
      containerElement || null,
    );
  })
}