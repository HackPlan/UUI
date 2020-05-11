# UUI

Universal Utility-first React UI Library

![](https://img.shields.io/npm/v/@hackplan/uui)
![](https://img.shields.io/github/workflow/status/HackPlan/UUI/CI)
![](https://img.shields.io/david/HackPlan/UUI)
![](https://img.shields.io/david/dev/HackPlan/UUI)
![](https://img.shields.io/bundlephobia/minzip/@hackplan/uui)
![](https://img.shields.io/npm/dm/@hackplan/uui)
![](https://img.shields.io/github/contributors/HackPlan/UUI)
![](https://img.shields.io/github/issues-pr-raw/HackPlan/UUI)
![](https://img.shields.io/github/issues-raw/HackPlan/UUI)
![](https://img.shields.io/github/languages/top/HackPlan/UUI)
![](https://img.shields.io/github/license/HackPlan/UUI)

> **UUI is under development in heavily**, Component interface may change causing breaking change. Currently you should not use it on

## Features

* A set of useful components out of the box.
* TypeScript based full type safety.
* Powerful style customization of components.

## Installation

```bash
$ yarn add @hackplan/uui
```

## Usage

Strongly recommend using UUI in TypeScript project.

```tsx
import '@hackplan/uui/lib/index.css';
import { Button } from '@hackplan/uui';

function App() {
  return (
    <div>
      <Button>Click me</Button>
    </div>
  )
}
```

## Links

* [Customization Tutorial](https://uui.cool/?path=/docs/customize-tutorial--demo-stepper)
* [Development Notes](https://github.com/HackPlan/UUI/blob/master/DEVNOTES.md)
* [Changelog](https://github.com/HackPlan/UUI/blob/master/CHANGELOG.md)

## Development

```bash
$ git clone https://github.com/HackPlan/UUI.git
$ cd uui
$ nvm use
$ yarn
$ yarn storybook
```

Open your browser and visit http://localhost:6006 .

## Deploy

run `yarn pack:uui` to generate a preview package file.
Check whether there are extra files that should not exist in the output package, if there are, they should be added to the `.npmignore` file.

run `yarn publish:uui` to publish a new version of uui.

## Licenses

All files on the UUI GitHub repository are subject to the MIT license. Please read the License file at the root of the project.
