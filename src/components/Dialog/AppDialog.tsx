import React from 'react';
import ReactDOM from 'react-dom';
import { Dialog, DialogProps } from './Dialog';
import ReactHelper from '../../utils/ReactHelper';

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
    container: options?.container !== undefined ? options.container : ReactHelper.document?.body,
    customize: options?.customize !== undefined ? options.customize : undefined,
  }
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
      containerElement || null,
    );
  })
}