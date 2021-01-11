import { Placement } from '@popperjs/core';
import React, { useState } from 'react';
import { usePopper } from 'react-popper';
import { UUIFunctionComponent, UUIFunctionComponentProps } from '../../core';
import { createComponentPropTypes, PropTypes } from '../../utils/createPropTypes';
import { PopoverPlacementPropTypes } from '../Popover';

export type TooltipPlacement = Exclude<Placement, ''>

export interface TooltipFeatureProps {
  /**
   * The content of Tooltip
   */
  label: string;
  /**
   * The activator elements of Tooltip
   */
  children: React.ReactNode;
  /**
   * The position (relative to the activator) at which the popover should appear.
   * @default 'bottom'
   */
  placement?: TooltipPlacement;
}

export const TooltipPlacementPropTypes = PopoverPlacementPropTypes
export const TooltipPropTypes = createComponentPropTypes<TooltipFeatureProps>({
  label: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  placement: TooltipPlacementPropTypes,
})

export const Tooltip = UUIFunctionComponent({
  name: 'Tooltip',
  nodes: {
    Root: 'div',
    Tip: 'div',
    Arrow: 'div',
  },
  propTypes: TooltipPropTypes,
}, (props: TooltipFeatureProps, { nodes }) => {
  const { Root, Tip, Arrow } = nodes

  /**
   * handle optional props default value
   */
  const finalProps = {
    placement: props.placement || 'bottom',
  }

  const [referenceElement, setReferenceElement] = useState<any>(null);
  const [popperElement, setPopperElement] = useState<any>(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: finalProps.placement,
    modifiers: [
      { name: 'offset', options: { offset: [0, 8] } },
    ]
  });

  return (
    <Root ref={(ref) => { setReferenceElement(ref); }}>
      {props.children}
      <Tip
        role="tooltip"
        ref={(ref) => { setPopperElement(ref); }}
        style={{...styles.popper}} {...attributes.popper}
      >
        {props.label}
        <Arrow data-popper-arrow></Arrow>
      </Tip>
    </Root>
  )
})

export type TooltipProps = UUIFunctionComponentProps<typeof Tooltip>
