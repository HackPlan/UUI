import { omit } from 'lodash-es';
import React, { useRef } from 'react';
import { LoadingSpinner } from '../Loading';
import { KeyCode } from '../../utils/keyboardHelper';
import { UUIFunctionComponent, UUIFunctionComponentProps } from '../../core';
import { createComponentPropTypes, PropTypes } from '../../utils/createPropTypes';

export interface ButtonStylingProps {
  styling?: {
    type?: 'default' | 'primary' | 'text';
  };
}

export interface ButtonFeatureProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Whether the control is loading.
   * @default false
   */
  loading?: boolean;
}

export const ButtonPropTypes = createComponentPropTypes<Pick<ButtonFeatureProps, 'loading'> & ButtonStylingProps>({
  styling: PropTypes.shape({
    type: PropTypes.oneOf(['default', 'primary', 'text']),
  }),
  loading: PropTypes.bool,
})

export const Button = UUIFunctionComponent({
  name: 'Button',
  nodes: {
    Root: 'button',
    LoadingSpinner: LoadingSpinner,
    Content: 'div',
  },
  propTypes: ButtonPropTypes,
}, (props: ButtonFeatureProps & ButtonStylingProps, { nodes, NodeDataProps }) => {
  const { Root, LoadingSpinner, Content } = nodes

  const ref = useRef<HTMLElement | null>(null)

  return (
    <Root
      {...NodeDataProps({
        'type': props.styling?.type,
        'disabled': !!props.disabled,
        'loading': !!props.loading,
      })}
      role="button"
      {...omit(props, 'customize', 'styling', 'className', 'style', 'loading', 'prefix', 'separator')}
      onKeyDown={(event) => {
        switch (event.keyCode) {
          case KeyCode.Enter:
          case KeyCode.SpaceBar:
            ref.current?.click()
            break
          default:
            // do nothing
        }
      }}
    >
      {props.loading ? <LoadingSpinner animate width={14} height={14} /> : null}
      {props.children ? <Content>{props.children}</Content> : null}
    </Root>
  )
})

export type ButtonProps = UUIFunctionComponentProps<typeof Button>
