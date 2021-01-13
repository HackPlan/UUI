import { Placement } from '@popperjs/core';
import React, { useState } from 'react';
import { usePopper } from 'react-popper';
import { UUIFunctionComponent, UUIFunctionComponentProps } from '../../core';
import { createComponentPropTypes, PropTypes } from '../../utils/createPropTypes';
import { PopoverPlacementPropTypes, PopoverStrategyPropTypes } from '../Popover';

export type TooltipPlacement = Exclude<Placement, ''>
export type TooltipStrategy = 'absolute' | 'fixed'

export interface TooltipFeatureProps {
  /**
   * The content of Tooltip
   */
  label: React.ReactNode;
  /**
   * The activator elements of Tooltip
   */
  children: React.ReactNode;
  /**
   * The position (relative to the activator) at which the Tooltip should appear.
   * @default 'bottom'
   */
  placement?: TooltipPlacement;
  /**
   * The position strategy
   * @default absolute
   */
  strategy?: TooltipStrategy;
}

export const TooltipPlacementPropTypes = PopoverPlacementPropTypes
export const TooltipStrategyPropTypes = PopoverStrategyPropTypes
export const TooltipPropTypes = createComponentPropTypes<TooltipFeatureProps>({
  label: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired,
  placement: TooltipPlacementPropTypes,
  strategy: TooltipStrategyPropTypes,
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
    strategy: props.strategy || 'fixed',
  }

  const [referenceElement, setReferenceElement] = useState<any>(null);
  const [popperElement, setPopperElement] = useState<any>(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: finalProps.placement,
    strategy: finalProps.strategy,
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
        <Arrow style={{...styles.arrow}} data-popper-arrow></Arrow>
      </Tip>
    </Root>
  )
})

export type TooltipProps = UUIFunctionComponentProps<typeof Tooltip>
