import React from 'react';

const join = (nodes: React.ReactNode[], separator: React.ReactNode) => {
  return nodes.map((node, index) => {
    return (
      <React.Fragment key={index}>
        {node}
        {index !== nodes.length - 1 && separator}
      </React.Fragment>
    )
  })
}

export const ReactHelper = {
  join,
}