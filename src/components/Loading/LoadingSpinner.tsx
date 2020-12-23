import classNames from 'classnames';
import React from 'react';
import { UUIFunctionComponent, UUIFunctionComponentProps } from '../../core';
import { Icons } from '../../icons/Icons';

export type LoadingSpinnerFeatureProps = {
  width?: number;
  height?: number;
  animate?: boolean;
}

export const LoadingSpinner = UUIFunctionComponent({
  name: 'LoadingSpinner',
  nodes: {
    Root: 'div',
    Icon: Icons.Spinner,
  }
}, (props: LoadingSpinnerFeatureProps, { nodes }) => {
  const { Root, Icon } = nodes

  const finalProps = {
    animate: props.animate === undefined || true,
  }

  return (
    <Root
      className={classNames({
        'STATE_animate': finalProps.animate,
      })}
    >
      <Icon width={props.width} height={props.height} />
    </Root>
  )
})

export type LoadingSpinnerProps = UUIFunctionComponentProps<typeof LoadingSpinner>
