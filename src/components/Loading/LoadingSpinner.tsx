import classNames from 'classnames';
import React from 'react';
import { UUI } from '../../core/uui';
import { Icons } from '../../icons/Icons';

export type LoadingSpinnerFeatureProps = {
  width?: number;
  height?: number;
  animate?: boolean;
}

export const LoadingSpinner = UUI.FunctionComponent({
  name: 'LoadingSpinner',
  nodes: {
    Root: 'div',
    Icon: Icons.Spinner,
  }
}, (props: LoadingSpinnerFeatureProps, nodes) => {
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

export type LoadingSpinnerProps = Parameters<typeof LoadingSpinner>[0]
