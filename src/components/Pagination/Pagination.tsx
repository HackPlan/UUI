import React, { useMemo } from 'react';
import { StylishProps, initStylished } from '../../utils/stylish';

export enum PaginationNodeName {
  Pagination = "pagination",
  Root = "root",
}

export interface PaginationProps extends StylishProps<PaginationNodeName> {
  children: React.ReactNode
}

export function Pagination(props: PaginationProps) {

  // Initial Nodes
  const [
    Root,
  ] = useMemo(() => {
    const stylished = initStylished(PaginationNodeName.Pagination, props, { prefix: "uui" })
    return [
      stylished.element('div', PaginationNodeName.Root),
    ]
  }, [])

  return (
    <Root className={"u-flex u-flex-row u-items-center"}>
      {props.children}
    </Root>
  )
}