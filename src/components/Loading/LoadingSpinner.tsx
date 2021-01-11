import React from 'react';
import { UUIFunctionComponent, UUIFunctionComponentProps } from '../../core';
import { Icons } from '../../icons/Icons';
import { createComponentPropTypes, PropTypes } from '../../utils/createPropTypes';

export type LoadingSpinnerFeatureProps = {
  width?: number;
  height?: number;
  animate?: boolean;
}

export const LoadingSpinnerPropTypes = createComponentPropTypes<LoadingSpinnerFeatureProps>({
  width: PropTypes.number,
  height: PropTypes.number,
  animate: PropTypes.bool,
})

export const LoadingSpinner = UUIFunctionComponent({
  name: 'LoadingSpinner',
  nodes: {
    Root: 'div',
    Icon: Icons.Spinner,
  },
  propTypes: LoadingSpinnerPropTypes,
}, (props: LoadingSpinnerFeatureProps, { nodes, NodeDataProps }) => {
  const { Root, Icon } = nodes

  const finalProps = {
    animate: props.animate === undefined || true,
  }

  return (
    <Root
      {...NodeDataProps({
        'animate': finalProps.animate,
      })}
    >
      <Icon width={props.width} height={props.height} />
    </Root>
  )
})

export type LoadingSpinnerProps = UUIFunctionComponentProps<typeof LoadingSpinner>
