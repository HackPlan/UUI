import React, { useRef, useEffect } from 'react';
import { IntrinsicNodeT, ComponentNodeT } from '../../src/core/uui';
import { mapValues, isString } from 'lodash';
import '../style/Nodes.scss';

const Colors = ['#363062', '#f4e04d', '#00bcd4', '#216353', '#eb4559', '#f6d186', '#6b778d', '#ffaaa5']

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

  const templateRef = useRef(null)
  const previewRef = useRef(null)
  useEffect(() => {
    if (templateRef.current && previewRef.current) {
      const template = templateRef.current as any
      const preview = previewRef.current as any
      for (const nodeName of nodeNames) {
        const elements = preview.getElementsByClassName(`UUI-${name}-${nodeName}`)
        const templateElements = template.getElementsByClassName(`UUI-${name}-${nodeName}`)
        elements.forEach((element: HTMLElement, index: number) => {
          const templateElement = templateElements[index] as HTMLElement
          element.style.setProperty('--background-color', nodeColors[nodeName])
          if (['TD', 'TH'].includes(element.tagName)) {
            element.style.width = `${templateElement.clientWidth}px`
            element.style.height = `${templateElement.clientHeight}px`
          }
          if (['TR', 'THEAD'].includes(element.tagName)) {
            element.style.whiteSpace = 'nowrap';
          }
          if (['TR'].includes(element.tagName)) {
            element.style.display = 'inline-block';
            element.style.width = ``
          }
        })
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
      className="nodes-container my-4 p-12 flex flex-row w-full overflow-hidden"
    >
      <div ref={previewRef} className="component-preview">
        {render(customizeProps)}
      </div>
      <div className="color-sets ml-8">
        {nodeNames.map((name) => {
          return (
            <div key={name} className="flex flex-row items-center">
              <div style={{ backgroundColor: nodeColors[name], width: 10, height: 10, borderRadius: 9999 }}></div>
              <div className="ml-2">{name}</div>
            </div>
          )
        })}
      </div>
      <div ref={templateRef} className="component-template">
        {render({})}
      </div>
    </div>
  )
}