import React from 'react';
import { mergeCustomize } from './utils/mergeCustomize';
import { compileProps } from './utils/compileProps';

export function UUIComponentProxy<P extends { customize?: any }>(
  Component: React.ComponentType<P>,
  customize: P['customize'],
) {
  return (props: P) => {
    const compiledProps = compileProps(props)
    let finalCustomize: any = customize
    if (compiledProps.customize !== undefined) {
      finalCustomize = mergeCustomize(customize, compiledProps.customize)
    }
    return <Component {...props} customize={finalCustomize} />
  }
}
