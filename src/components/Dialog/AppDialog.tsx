import React from 'react';
import ReactDOM from 'react-dom';
import { Dialog } from './Dialog';

const AppDialogRootClassName = "UUI-AppDialog-Root"
export function AppDialog(ContentComponent: (
  props: {
    onConfirm: () => void;
    onCancel: () => void;
  }) => JSX.Element,
  options?: {
    cancelOnClickAway?: boolean;
    container?: HTMLElement;
  }
): Promise<boolean> {
  const finalOptions = {
    cancelOnClickAway: options?.cancelOnClickAway !== undefined ? options.cancelOnClickAway : false,
    container: options?.container !== undefined ? options.container : document.body,
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

  return new Promise((resolve) => {
    setup()

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
          }}>
          <ContentComponent
            onConfirm={() => {
              resolve(true)
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