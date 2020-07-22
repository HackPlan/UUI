import classNames from 'classnames';
import React from 'react';
import { UUI } from '../../core/uui';
import { LoadingSpinner } from './LoadingSpinner';

export interface LoadingCoverFeatureProps {
  loading?: boolean;
  label?: React.ReactNode;
  children: React.ReactNode;
}

export const LoadingCover = UUI.FunctionComponent({
  name: 'LoadingCover',
  nodes: {
    Root: 'div',
    Mask: 'div',
    Spinner: LoadingSpinner,
    Label: 'div',
  }
}, (props: LoadingCoverFeatureProps, nodes) => {
  const { Root, Mask, Spinner, Label } = nodes

  return (
    <Root
      className={classNames({
        'STATE_loading': props.loading,
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

export type LoadingCoverProps = Parameters<typeof LoadingCover>[0]
