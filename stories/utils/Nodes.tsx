import React, { useRef, useEffect } from 'react';
import { IntrinsicNodeT, ComponentNodeT } from '../../src/utils/uui';
import { mapValues, isString } from 'lodash';
import '../style/Nodes.scss';

const Colors = ['red', 'green', 'blue', 'orange', 'purple', 'yellow', 'gray', 'pink']

export interface NodesProps<
N extends string,
T extends keyof IntrinsicNodeT | ComponentNodeT,
X extends { [key in N]: T },
> {
  name: string
  nodes: X
  render: (customizeProps: any) => JSX.Element
}

export function Nodes<
  N extends string,
  T extends keyof IntrinsicNodeT | ComponentNodeT,
  X extends { [key in N]: T },
>(props: NodesProps<N, T, X>) {
  const { name, nodes, render } = props
  const nodeNames = Object.keys(nodes) as N[]

  const previewRef = useRef(null)
  useEffect(() => {
    if (previewRef.current) {
      const preview = previewRef.current as any
      for (const nodeName of nodeNames) {
        if (isString(nodes[nodeName])) {
          const elements = preview.getElementsByClassName(`UUI-${name}-${nodeName}`)
          for (const element of elements as HTMLElement[]) {
            element.style.setProperty('--background-color', nodeColors[nodeName])
          }
        } else {
          const elements = preview.getElementsByClassName(`UUI-${name}-${nodeName}`)
          for (const element of elements as HTMLElement[]) {
            element.style.setProperty('--background-color', nodeColors[nodeName])
          }
        }

      }
      console.log(previewRef.current)
    }
  }, [previewRef.current])

  const nodeColors = nodeNames.reduce((result, name, index) => {
    result[name] = Colors[index]
    return result
  }, {} as any)

  const compiledProps = mapValues(nodes, (value, key) => {
    if (isString(value)) {
      return {
        // extendStyle: {
        //   backgroundColor: nodeColors[key]
        // }
      }
    } else {
      return {
        // Root: {
        //   extendStyle: {
        //     backgroundColor: nodeColors[key]
        //   }
        // }
      }
    }
  })
  const customizeProps = { customize: compiledProps }

  return (
    <div
      className="nodes-container u-my-4 u-p-12 u-flex u-flex-row u-w-full"
    >
      <div ref={previewRef} className="component-preview">
        {render(customizeProps)}
      </div>
      <div className="color-sets u-ml-8">
        {nodeNames.map((name) => {
          return (
            <div key={name} className="u-flex u-flex-row u-items-center">
              <div style={{ backgroundColor: nodeColors[name], width: 10, height: 10, borderRadius: 9999 }}></div>
              <div className="u-ml-2">{name}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}