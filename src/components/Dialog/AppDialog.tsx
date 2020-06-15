import React from 'react';
import ReactDOM from 'react-dom';
import { Dialog, DialogProps } from './Dialog';

const AppDialogRootClassName = "UUI-AppDialog-Root"

export interface AppDialogOptions {
  cancelOnClickAway?: boolean;
  container?: HTMLElement;
  customize?: DialogProps['customize'];
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
    cancelOnClickAway: options?.cancelOnClickAway !== undefined ? options.cancelOnClickAway : false,
    container: options?.container !== undefined ? options.container : document.body,
    customize: options?.customize !== undefined ? options.customize : undefined,
  }
  const containerElement = document.createElement("div")
  const setup = () => {
    containerElement.className = AppDialogRootClassName
    finalOptions.container.appendChild(containerElement)
  }
  const clearup = () => {
    ReactDOM.unmountComponentAtNode(containerElement)
    document.body.removeChild(containerElement)
  }

  setup()
  return new Promise((resolve) => {

    const DialogComponent = () => {
      return (
        <Dialog
          open={true}
          usePortal={false}
          onClickAway={() => {
            if (finalOptions.cancelOnClickAway) {
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
        </Dialog>
      )
    }

    ReactDOM.render(
      <DialogComponent />,
      containerElement,
    );
  })
}