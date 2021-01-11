import { IToast, Toast, ToastProps } from './Toast';
import React from 'react';
import ReactDOM from 'react-dom';
import { v4 as uuidv4 } from 'uuid';
import ReactHelper from '../../utils/ReactHelper';
import { UUIClassComponent, UUIClassComponentProps } from '../../core';
import { createComponentPropTypes, PropTypes } from '../../utils/createPropTypes';

export enum ToasterPosition {
  Top = "top",
  TopLeft = "top_left",
  TopRight = "top_right",
  Bottom = "bottom",
  BottomLeft = "bottom_left",
  BottomRight = "bottom_right",
  CenterLeft = "center_left",
  CenterRight = "center_right",
  Center = "center",
}

export interface ToasterFeatureProps {
  /**
   * Position of `Toaster` within its container.
   * @default ToasterPosition.Top
   */
  position?: ToasterPosition;
  /**
   * The maximum number of active toasts that can be displayed at once.
   *
   * When the limit is about to be exceeded, the oldest active toast is removed.
   * @default undefined
   */
  maxToasts?: number;
}

export interface ToasterState {
  toasts: IToast[];
}

export const ToasterPositionPropTypes = PropTypes.oneOf(Object.values(ToasterPosition))
export const ToasterPropTypes = createComponentPropTypes<ToasterFeatureProps>({
  position: ToasterPositionPropTypes,
  maxToasts: PropTypes.number,
})


const ToasterPortalClassName = "UUI-Toaster-Portal"
export class Toaster extends UUIClassComponent({
  prefix: 'UUI',
  name: 'Toaster',
  nodes: {
    Root: 'div',
  },
  propTypes: ToasterPropTypes,
})<ToasterFeatureProps, ToasterState> {
  constructor(props: ToasterFeatureProps) {
    super(props)
    this.state.toasts = [] as IToast[]
  }

  static create(props: ToasterFeatureProps, container = ReactHelper.document?.body) {
    const containerElement = ReactHelper.document?.createElement("div");
    if (!containerElement || !container) return null;
    containerElement.className = ToasterPortalClassName
    container.appendChild(containerElement);
    const toaster = ReactDOM.render<ToasterFeatureProps>(
      <Toaster {...props} />,
      containerElement,
    ) as Toaster;
    if (toaster == null) {
        throw new Error('toaster_create_null'); // TODO: change error message
    }
    return toaster;
  }

  show(props: Omit<ToastProps, 'id'>, id?: string): string | undefined {
    if (this.props.maxToasts) {
      // check if active number of toasts are at the maxToasts limit
      this.dismissIfAtLimit();
    }
    const newToast = { ...props, id: id || `toast-${uuidv4()}` };
    if (id === undefined || this.isNewToastId(id)) {
      this.setState(prevState => ({ toasts: [...prevState.toasts, newToast] }));
    } else {
      this.setState(prevState => ({ toasts: prevState.toasts.map(t => (t.id === id ? newToast : t)) }));
    }
    return newToast.id;
  }

  dismiss(id: string) {
    this.setState(({ toasts }) => ({
      toasts: toasts.filter(t => t.id !== id),
    }));
  }

  clearAll() {
    this.setState({ toasts: [] })
  }

  getAll(): IToast[] {
    return this.state.toasts
  }

  private isNewToastId(id: string) {
    return this.state.toasts.every(toast => toast.id !== id);
  }

  private dismissIfAtLimit() {
    if (this.state.toasts.length === this.props.maxToasts) {
      // dismiss the oldest toast to stay within the maxToasts limit
      const oldestToast = this.state.toasts[0]
      if (oldestToast.id) this.dismiss(oldestToast.id);
    }
  }

  render() {
    const { Root } = this.helper.nodes

    return (
      <Root
        {...this.helper.NodeDataProps({
          'position': this.props.position || ToasterPosition.Top,
        })}
      >
        {this.state.toasts.map((toast) => {
          return (
            <Toast
              {...toast}
              key={toast.id}
              onDismiss={() => {
                toast.onDismiss && toast.onDismiss(toast.id)
                this.dismiss(toast.id)
              }}
            ></Toast>
          )
        })}
      </Root>
    )
  }
}
export type ToasterProps = UUIClassComponentProps<typeof Toaster>