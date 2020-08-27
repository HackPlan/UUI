# Principle & Implementation

English | [简体中文](https://github.com/HackPlan/UUI/blob/master/docs/PRINCIPLE.zh-CN.md)

We wrote this document so that you can know the basic design ideas of UUI and how UUI components are constructed. While we are glad to see community contributions, we are not likely to choose a path that violates one or more of these principles. And, since UUI is in the early development stage, we also welcome your comments and suggestions about these principles.

> **Note**
>
> This document describes the basic ideas of UUI and how it implemented, not how to use it.
> For an introduction to UUI, check out our [README](https://github.com/HackPlan/UUI) instead.

## Composition

UUI's open source code repository contains a lot of content, including but not limited to UI component files, Storybook document files, and unit test files. Files of different parts should be stored separately in the correct directory folder, and should not be placed randomly.


* `src` stores the code of UUI to implement the features. The files in `src` will be compiled and bundled into js files by rollup and released on NPM. (Storybook and other irrelevant files should not be stored in `src`)
* `core` is a place to store core tools, which are used to build UI components of UUI
   * `utils` Common tools
   * `hooks` React Hooks tool
   * `styles` Sass style file for components
   * `icons` Icon library
   * `components` Component library
* `stories` Where the stories of Storybook are stored
* `tests` Unit test files
* `docs` Documentation for UUI development and implementation and usage instructions

## HOC Util

A major feature of UUI is the **component style customization**. In order to allow developers who use UUI to modify the style of components more conveniently and quickly, we have followed some design patterns when implementing them to efficiently integrate the customization function applies to all UUI components. These design patterns were finally implemented in the form of HOC tools.

UUI's UI components have some common functions. In order not to repeatedly implement these functions in each component, UUI has developed a set of HOC tool functions. The HOC tools mentioned here mainly refer to the `UUI.FunctionComponent` and `UUI.ClassComponent` located in `src/core/uui.tsx`.

All components built and implemented by HOC tools include the following features:

* All elements within a component have types, which are called Node in UUI;
* Each Node has its own name, and when it is displayed in the DOM, there will be a corresponding className;
* Because each element in the component is a kind of Node, we can locate it accurately and quickly through NodeName and NodeClassName;
* The component can pass in a `props.customize` property to modify the `className`, `style`, `children`, etc. of the internal elements of this component

At the same time, the use of HOC tools is accompanied by some conventions and restrictions:

* Components can only use the Nodes provided by the HOC tool when implementing feature functions
* The name of the first Node defined must be `Root` (currently there is such a restriction, we will consider removing it in the future)
* Define the feature function Props of the component, use the naming format of `XxxFeatureProps` (not mandatory)
* For some Props that describe component styles, use the naming format of `XxxStylingProps` (not mandatory)
* Use `STATE_xxx` and `YYY_xxx` naming formats to mark component states and attributes in className (not mandatory)

Let's take the component `Button` as an example:

```tsx
import classNames from 'classnames';
import { omit } from 'lodash';
import React from 'react';
import { UUI } from '../../core/uui';
import { LoadingSpinner } from '../Loading';

export interface ButtonStylingProps {
  styling?: {
    type?: 'default' | 'primary' | 'text';
  };
}

export interface ButtonFeatureProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Whether the control is loading.
   * @default false
   */
  loading?: boolean;
}

export const Button = UUI.FunctionComponent({
  name: 'Button',
  nodes: {
    Root: 'button',
    LoadingSpinner: LoadingSpinner,
    Content: 'div',
  },
}, (props: ButtonFeatureProps & ButtonStylingProps, nodes) => {
  const { Root, LoadingSpinner, Content } = nodes

  return (
    <Root
      role="button"
      {...omit(props, 'customize', 'styling', 'className', 'style', 'loading')}
      className={classNames({
        ...(props.styling?.type ? {
          [`TYPE_${props.styling?.type}`]: true,
        } : {}),
        'STATE_disabled': props.disabled || props.loading,
        'STATE_loading': props.loading,
      })}>
      {props.loading ? <LoadingSpinner animate width={14} height={14} /> : null}
      {props.children ? <Content>{props.children}</Content> : null}
    </Root>
  )
})

export type ButtonProps = Parameters<typeof Button>[0]
```

The first is that we define two Props, namely `ButtonStylingProps` and `ButtonFeatureProps`. These two Props are used as attributes of the feature function of the component `Button`, so they are defined in the `src/components/Button/Button.tsx` file instead of the `src/core/uui.tsx` file.

Then we created a Button Component through the `UUI.FunctionComponent` HOC function tool.

The two HOC methods provided by UUI (`UUI.FunctionComponent` and `UUI.ClassComponent`) are used to create `function-based component` and `class-based component` respectively. The first parameter `options` of these two methods accepts the same type of data to define some basic information of this component:

* `prefix` defines the component node className prefix (optional parameter, the default is `UUI`)
* `separator` defines node className prefix, name and connection character before node name (optional parameter, default is `-`)
* `name` defines the name of the component
* `nodes` defines which Nodes this component contains, including the name and content of the Node. This parameter accepts an Object: `key` can only be a string; value can be HTML built-in components such as `div`, `p`, `span` and `h1` (called `IntrinsicNode` in UUI), It can also be a UUI component (called `ComponentNode` in UUI). The HOC tool constructs the truly usable IntrinsicNode and ComponentNode based on the incoming `options.nodes` data, and provides them to the components to implement feature functions.

Similarly, we can also use `UUI.ClassComponent` to create a `Button` component:

```tsx
export class Button extends UUI.ClassComponent({
  name: 'Button',
  nodes: {
    Root: 'button',
    LoadingSpinner: LoadingSpinner,
    Content: 'div',
  },
})<ButtonFeatureProps & ButtonStylingProps, {}> {
  render() {
    const { Root, LoadingSpinner, Content } = this.state.nodes

    return (
      <Root
        role="button"
        {...omit(props, 'customize', 'styling', 'className', 'style', 'loading')}
        className={classNames({
          ...(props.styling?.type ? {
            [`TYPE_${props.styling?.type}`]: true,
          } : {}),
          'STATE_disabled': props.disabled || props.loading,
          'STATE_loading': props.loading,
        })}>
        {props.loading ? <LoadingSpinner animate width={14} height={14} /> : null}
        {props.children ? <Content>{props.children}</Content> : null}
      </Root>
    )
  }
}
```

After completing the implementation of `Button`, you can use it normally. The general usage is similar to other UI library components:

```tsx
<Button loading styling={{ type: 'primary' }}>Click me!</Button>
```

Since it was created by the HOC tool, this component has three more Props than other general button components, namely `className`, `style` and `customize`:

* `className` For UUI components, a component contains multiple elements. This className is inserted into the Root Node's `className`.
* `style` Same as `className`, this style is merged into Root Node's `style`.
* The type of `customize` is different in different components, depending on which Nodes the component declares and which types of Nodes are.

`props.customize` has a more complex type:

```tsx
export type UUIComponentCustomizeProps<
  X extends { [key in string]?: keyof IntrinsicNodeT | FunctionComponentNodeT | ClassComponentNodeT },
> = {
  /**
   * Customize component nodes
   * @default none
   */
  customize?: {
    [key in keyof X]?: X[key] extends keyof IntrinsicNodeT
      ? NodeCustomizeProps & Partial<JSX.IntrinsicElements[X[key]]>
      : (
        X[key] extends FunctionComponentNodeT
        ? NonNullable<Parameters<X[key]>[0]['customize']>
        : (
          X[key] extends ClassComponentNodeT
          ? React.ComponentProps<X[key]>['customize']
          : never
        )
      )
  };
}
```

The first level key of `props.customize` accepts the nodeName defined by the current component. For example, `Button` defines three Nodes `Root`, `LoadingSpinner` and `Content`, so customize only supports these three string literals as key.

```tsx
<Button
  customize={{
    Root: { /* ... */ },
    LoadingSpinner: {
      Root: { /* ... */ },
      Icon: { /* ... */ },
    },
    Content: { /* ... */ },
  }}
>
  Customize Button
</Button>
```

Thanks to TypeScript's type inference, for some complex components (there are many Nodes and nested components), you can use the editor or IDE's completion feature to complete the key.

The first layer value of `props.customize` can be passed into the type `NodeCustomizeProps & Partial<JSX.IntrinsicElements[X[key]]>`, which is an intersection type ([Intersection Types](https://www.typescriptlang. org/docs/handbook/unions-and-intersections.html#intersection-types)), composed of a group of types; or a Customize Props (nested structure) of a UUI Component:

```tsx
export interface NodeCustomizeClassNameProps {
  className?: string;
  overrideClassName?: string;
  extendClassName?: string;
}
export interface NodeCustomizeStyleProps {
  style?: React.CSSProperties;
  overrideStyle?: React.CSSProperties;
  extendStyle?: React.CSSProperties;
}
export interface NodeCustomizeChildrenProps {
  children?: React.ReactNode;
  overrideChildren?: React.ReactNode;
  extendChildrenBefore?: React.ReactNode;
  extendChildrenAfter?: React.ReactNode;
}
export interface NodeCustomizeDataAttributesProps {
  dataAttributes?: {
    [key: string]: any;
  };
}
export interface NodeCustomizeAriaAttributesProps {
  ariaAttributes?: UUICustomizeAriaAttributes;
}
export type NodeCustomizeProps =
  & NodeCustomizeClassNameProps
  & NodeCustomizeStyleProps
  & NodeCustomizeChildrenProps
  & NodeCustomizeDataAttributesProps
  & NodeCustomizeAriaAttributesProps
  & React.RefAttributes<any>
```

From this type of `NodeCustomizeProps & Partial<JSX.IntrinsicElements[X[key]]>`, it can be seen that `customize[NodeName]` can pass these properties:

* `overrideClassName` Override the target Node className
* `extendClassName` Appended after the target Node className
* `overrideStyle` Override the target Node style
* `extendStyle` Merged into target Node style (same key coverage)
* `overrideChildren` Override the target Node children
* `extendChildrenBefore` Added before the target Node children
* `extendChildrenAfter` Added after the target Node children
* `dataAttributes` Override `data-*` attributes
* `aria-*` Override `aria-*` attributes
* `ref` Merged into ref (implementation reference `src/utils/mergeRefs.ts`)
* `onXXX` supports a series of function attributes starting with `on`. The HOC tool will merge the two function attributes into one function to execute, internally (props) execute first, and externally (customize) execute later

> Since all components are built using HOC tools, the robustness and correctness of the code of HOC tools is very important to UUI. Therefore, we require 100% unit test coverage for the files inside the `src/uui/*` folder. For more unit testing information, please refer to [TESTING.zh-CN.md](https://github.com/HackPlan/UUI/blob/master/docs/TESTING.zh-CN.md).

## Type Tools

```tsx
export type UUIComponentProps<P, X extends { [key in string]?: keyof IntrinsicNodeT | FunctionComponentNodeT | ClassComponentNodeT }> = P & UUIConvenienceProps & UUIComponentCustomizeProps<X>
export type UUIFunctionComponentProps<T extends (...args: any) => any> = Parameters<T>[0]
export type UUIClassComponentProps<T extends React.JSXElementConstructor<any>> = React.ComponentProps<T>
```

When using the HOC tool to implement a component, you will encounter a variety of Props type definitions. When using a component, we check the type hints according to the text editor or IDE, and we can usually see these types:

* `XXXFeatureProps` related to the feature function
* `XXXStylingProps` related to the style
* `UUIConvenienceProps` UUI component className and style type definition
* `UUIComponentCustomizeProps` customize type inferred by TypeScript

If the developer wants to define some styles to encapsulate UUI components, they can write it like the following:

```tsx
function StyledButton(props: ButtonFeatureProps) {
  return (
    <Button
      customize={{
        Root: {
          backgroundColor: 'red',
          color: 'blue',
        }
      }}
      {...props}
    >
      {props.children}
    </Button>
  )
}

<StyledButton>Click me!</StyledButton>
```

Note: Currently, customize support after packaging is not supported.

## Component

* All components are implemented in Controlled Mode. The only exception is that form-related components also support Uncontrolled Mode.
* The style code and function code of UUI components are completely separated, and css style codes should not be written inside the components.
* All style codes should be written in a separate style file and placed in `src/styles`.

## Built-in icon library

UUI currently uses the icons provided by [Feather] (https://feathericons.com/). If you need to use a new icon, select the icon from Feather first. The component library should not contain too many icon files, nor should it contain some unused icon files, and the icons should not be exported to developers.
