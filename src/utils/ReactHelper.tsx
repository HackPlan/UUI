import React from 'react';

/**
 * The join() method creates and returns a new ReactNode by concatenating all of the elements in an array, separated by a specified separator element.
 * If the array has only one item, then that item will be returned without using the separator.
 */
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

/**
 * in SSR (Server-Side Render), global `window` could be undefined.
 */
const _window: (typeof window) | undefined = ((typeof window !== 'undefined') ? window : undefined)
/**
 * in SSR (Server-Side Render), global `document` could be undefined.
 */
const _document: (typeof document) | undefined = (typeof document !== 'undefined') ? document : undefined


const ReactHelper = {
  join,
  window: _window,
  document: _document,
}

export default ReactHelper;
