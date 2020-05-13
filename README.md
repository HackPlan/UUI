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

> **UUI is under development in heavily**, it means the interface of components may be changed later.

## Features

* A set of useful components out of the box.
* TypeScript based full type safety.
* Powerful style customization of components.

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
* [Contributing](https://github.com/HackPlan/UUI/blob/master/CONTRIBUTING.md)
* [Customization Tutorial](https://uui.cool/?path=/docs/customize-tutorial--demo-stepper)
* [Development Notes](https://github.com/HackPlan/UUI/blob/master/DEVNOTES.md)
* [Changelog](https://github.com/HackPlan/UUI/blob/master/CHANGELOG.md)

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

## Production Deployment

(for maintainer)

#### NPM Package

1. run `yarn pack:uui` command to generate a preview package file.
2. Check whether there are extra files that should not exist in the output package, if there are, they should be added to the `.npmignore` file.
3. run `yarn publish:uui` command, Make sure you enter the correct version number.

#### Storybook

Push new tag to Github remote repo to trigger the deployment.

Tag name should start with `sb`, recommended tag name format:

```
example: sb2020051301

sb      2020  05    13    01
prefix  year  mon   day   index
```

## Contributing

We welcome all contributions. Please read CONTRIBUTING.md first.

## Licenses

All files on the UUI GitHub repository are subject to the MIT license. Please read the License file at the root of the project.
