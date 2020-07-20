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
[![Storybook](https://cdn.jsdelivr.net/gh/storybookjs/brand@master/badge/badge-storybook.svg)](https://doc.uui.cool/)

> **UUI is still heavily under development.** Specifications and Usage might change in the future and, as of now, no backwards compatibility is guaranteed!

English | [简体中文](https://github.com/HackPlan/UUI/blob/master/docs/README.zh-CN.md)

## Features

* A set of useful components out of the box.
* TypeScript based full type safety.
* Highly customizable.

## Installation

```bash
npm install @hackplan/uui --save
```

```bash
yarn add @hackplan/uui
```

## Usage

```tsx
import '@hackplan/uui/lib/index.css';
import { Button } from '@hackplan/uui';

function App() {
  return (
    <div>
      <Button>Click me!</Button>
    </div>
  )
}
```

## Links

* [Documentation](https://doc.uui.cool)
* [Changelog](https://github.com/HackPlan/UUI/blob/master/CHANGELOG.md)
* [Contributing](https://github.com/HackPlan/UUI/blob/master/CONTRIBUTING.md)
* [Customization Demo](https://doc.uui.cool/?path=/docs/customize-tutorial--demo-stepper)
* [Deployment](https://github.com/HackPlan/UUI/blob/master/src/DEPLOYMENT.md)


## Development

For the development of this project, Yarn is preferred over npm. However, any Yarn command can be replaced by the npm equivalent.

```bash
git clone https://github.com/HackPlan/UUI.git
cd uui
nvm use
yarn
yarn storybook
```

Open your browser and visit http://localhost:6006 .

## Contributing

We welcome all contributions. Please read CONTRIBUTING.md first.

## Licenses

All files on the UUI GitHub repository are subject to the MIT license. Please read the License file at the root of the project.
