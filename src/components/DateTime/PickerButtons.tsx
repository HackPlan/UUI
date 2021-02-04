import React from 'react';
import { UUIFunctionComponent, UUIFunctionComponentProps } from '../../core';
import { createComponentPropTypes, PropTypes } from '../../utils/createPropTypes';
import { Button as UUIButton } from '../Button/Button';

export interface PickerButtonsFeatureProps {
  confirmLabel?: React.ReactNode;
  cancelLabel?: React.ReactNode;
  onConfirm?: () => void;
  onCancel?: () => void;
}

export const PickerButtonsPropTypes = createComponentPropTypes<PickerButtonsFeatureProps>({
  confirmLabel: PropTypes.node,
  cancelLabel: PropTypes.node,
  onConfirm: PropTypes.func,
  onCancel: PropTypes.func,
})

export const PickerButtons = UUIFunctionComponent({
  name: 'PickerButtons',
  nodes: {
    Root: 'div',
    ConfirmButton: UUIButton,
    CancelButton: UUIButton,
  },
  propTypes: PickerButtonsPropTypes,
}, (props: PickerButtonsFeatureProps, { nodes }) => {
  const { Root, ConfirmButton, CancelButton } = nodes

  return (
    <Root>
      <CancelButton onClick={props.onCancel}>{props.cancelLabel || "Cancel"}</CancelButton>
      <ConfirmButton onClick={props.onConfirm}>{props.confirmLabel || "Confirm"}</ConfirmButton>
    </Root>
  )
})

export type PickerButtonsProps = UUIFunctionComponentProps<typeof PickerButtons>
