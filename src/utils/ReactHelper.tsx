import React from 'react';

const join = (nodes: React.ReactNode[], separator: React.ReactNode) => {
  return nodes.map((node, index) => {
    return (
      <>
        {node}
        {index !== nodes.length - 1 && separator}
      </>
    )
  })
}

export const ReactHelper = {
  join,
}