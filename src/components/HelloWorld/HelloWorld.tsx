import React from 'react'
import './HelloWorld.scss'
import { ExtraClassNameProps, ExtraStyleProps, initStylish } from '../../utils/stylishHelper'

export enum HelloWorldNodeName {
  Root = "hello-world",
}

export interface HelloWorldProps extends ExtraClassNameProps<HelloWorldNodeName>, ExtraStyleProps<HelloWorldNodeName> {
}

export function HelloWorld(props: HelloWorldProps) {
  const getStylishProps = initStylish<HelloWorldNodeName>(HelloWorldNodeName.Root, props, { prefix: "uui" })
  return (
    <div {...getStylishProps('', ["u-m-4"])}>
      <div className="hello u-text-4xl">Hello World! (ﾟ3ﾟ)～♪</div>
      <h1 className="u-font-bold">uui framework storybook</h1>
    </div>
  )
}