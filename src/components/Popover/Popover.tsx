import React, { useEffect, useRef, useMemo } from 'react';
import { UUI } from '../../utils/uui';
import './Popover.scss';
import ReactDOM from 'react-dom';

export interface BasePopoverProps {
  /**
   * Whether this popover show content.
   */
  active: boolean
  /**
   * The trigger elements of Popover.
   * The position of content depends on activator.
   */
  activator: React.ReactNode
  /**
   * The content elements of Popover
   */
  children: React.ReactNode
  /**
   * Whether the content of popover should be rendered inside a `Portal` where appending inside `portalContainer`(if it provided) or `document.body`.
   * @default true
   */
  usePortal?: boolean
  /**
   * The container element into which the overlay renders its contents, when `usePortal` is `true`.
   * This prop is ignored if `usePortal` is `false`.
   * @default document.body
   */
  portalContainer?: HTMLElement
}

export const Popover = UUI.FunctionComponent({
  name: 'Popover',
  nodes: {
    Root: 'div',
    Activator: 'div',
    Content: 'div',
  }
}, (props: BasePopoverProps, nodes) => {
  const { Root, Activator, Content } = nodes

  const finalProps = useMemo(() => {
    return {
      usePortal: props.usePortal || true,
      portalContainer: props.portalContainer || document.body,
    }
  }, [props.usePortal, props.portalContainer])

  const activatorRef = useRef(null)
  const contentRef = useRef(null)

  useEffect(() => {
    if (activatorRef.current && contentRef.current) {
      const activator = activatorRef.current as any as HTMLElement
      const content = contentRef.current as any as HTMLElement
      const activatorRectInfo = activator.getBoundingClientRect()
      content.style.left = `${activatorRectInfo.left}px`
      content.style.top = `${activatorRectInfo.top + activatorRectInfo.height}px`
    }
  }, [activatorRef.current, contentRef.current])

  useEffect(() => {
    if (contentRef.current) {
      const content = contentRef.current as any as HTMLElement
      content.style.display = props.active ? 'inherit' : 'none'
    }
  }, [props.active, contentRef.current])

  const activator = useMemo(() => {
    return <Activator ref={activatorRef}>{props.activator}</Activator>
  }, [props.activator])

  const contentPortal = useMemo(() => {
    const wrappedContent = <Content ref={contentRef}>{props.children}</Content>
    if (finalProps.usePortal) {
      return ReactDOM.createPortal((
        <div className="UUI-Popover-Portal">
          {wrappedContent}
        </div>
      ), finalProps.portalContainer)
    } else {
      return wrappedContent
    }
  }, [props.children, finalProps.portalContainer])

  return (
    <Root>
      {activator}
      {contentPortal}
    </Root>
  )
})

export type PopoverProps = Parameters<typeof Popover>[0]
