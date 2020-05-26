# Principle & Implementation

English | [简体中文](https://github.com/HackPlan/UUI/blob/master/docs/PRINCIPLE.zh-CN.md)

We wrote this document so that you can know the basic design ideas of UUI and how UUI components are constructed. While we are glad to see community contributions, we are not likely to choose a path that violates one or more of these principles. And, since UUI is in the early development stage, we also welcome your comments and suggestions about these principles.

> **Note**
>
> This document describes the basic ideas of UUI and how it implemented, not how to use it.
> For an introduction to UUI, check out our [README](https://github.com/HackPlan/UUI) instead.

## Composition

The core function codes of UUI are all stored in the `src` folder of the project repo. The files in `src` will be compiled by TSC into js files and packaged and published on npm, while storybook and other unrelated files should not be stored in `src`.

In `src` directory, there are mainly several modules:

* `core` where UUI core tools are stored, these tools are used to build UUI components
* `utils` Universal tool for implementing UUI component
* `hooks` React Hooks tool for implementing UUI component
* `styles` UUI component style files
* `icons` UUI icons
* `components` UUI components

## UUI core tools

* All UUI components should be based on UUI HOC.
* The DOM inside the component should be composed entirely of nodes provided by UUI HOC.

### Customize Extra Props

This section defines some additional component parameters `CustomizeProps`, used to describe how to customize this component's `style`, `className` and `children`.

### Customize Extra Props Helper

This section implements how to merge and handle `CustomizeProps`.

### IntrinsicNode & ComponentNode

UUI components implement two kinds of Elements, called `IntrinsicNode` and `ComponentNode`. The DOM inside the UUI component should be composed entirely of these two Nodes.

### Type Helper

Inference help utils for some component types.

### UUI HOC

UUI provides two HOC methods (`UUI.FunctionComponent` and` UUI.ClassComponent`) to create `function-based component` and` class-based component`. All UUI components should be built by UUI HOC.

The first parameter `options` of these two methods accepts the same type of data and is used to define some basic information about this component:

* `prefix` defines the component node className prefix (optional parameter, default is UUI)
* `separator` defines the node className prefix, name and the connection character before the node name (optional parameter, default is-)
* `name` defines the name of the component
* `nodes` defines which Nodes this component contains, including Node name and content. This parameter accepts an Object: `key` can only be a string; value can be a built-in HTML component such as `div`, `p`, `span`, and `h1`, or a UUI component.

## Component

* All components should be implemented in Controlled Mode as much as possible. In addition, components related to forms should also support Uncontrolled Mode.
* The style code of the UUI component should be completely separated from the function code, and static style code should not be written inside the component.
* All style codes should be written in separate style files and placed in `src/styles`.

## Built-in icon library

UUI currently uses the icons provided by [Feather] (https://feathericons.com/). If you need to use a new icon, select the icon from Feather first.