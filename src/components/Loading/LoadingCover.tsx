import React from 'react';
import { UUIFunctionComponent, UUIFunctionComponentProps } from '../../core';
import { LoadingSpinner } from './LoadingSpinner';

export interface LoadingCoverFeatureProps {
  loading?: boolean;
  label?: React.ReactNode;
  children: React.ReactNode;
}

export const LoadingCover = UUIFunctionComponent({
  name: 'LoadingCover',
  nodes: {
    Root: 'div',
    Mask: 'div',
    Spinner: LoadingSpinner,
    Label: 'div',
  }
}, (props: LoadingCoverFeatureProps, { nodes, NodeDataProps }) => {
  const { Root, Mask, Spinner, Label } = nodes

  return (
    <Root
      {...NodeDataProps({
        'loading': !!props.loading,
      })}
    >
      {props.children}
      <Mask>
        <Spinner animate width={24} height={24} />
        {props.label && <Label>{props.label}</Label>}
      </Mask>
    </Root>
  )
})

export type LoadingCoverProps = UUIFunctionComponentProps<typeof LoadingCover>
