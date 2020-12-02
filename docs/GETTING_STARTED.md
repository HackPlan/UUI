# Getting started

## Installing UUI

1. Install package ant its peer dependencies with an NPM client like `npm` or `yarn`, pulling in all relevant dependencies:

```bash
yarn add @hackplan/uui react react-dom
```

2. After installation, you will be able to import UUI components in your React web application:

```tsx
import { Button } from '@hackplan/uui';

// using JSX
const button1 = <Button>Click me!</Button>;

// using React.createElement
const button2 = React.createElement(Button, { styling: { type: 'primary' } }, "Click me!");
```

3. **Don't forget to include css style file!** Besides, UUI package also provide Sass source style files, you can find it in `lib/styles`.

```tsx
// using node-style package resolution in a CSS file
@import '@hackplan/uui/lib/index.css';
```

[![Edit uui-getting-started](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/uui-getting-started-3fg1o?fontsize=14&hidenavigation=1&theme=dark)


## TypeScript

UUI is written in TypeScript and therefore its `*.d.ts` type definitions are bundled in the NPM package, should be used automatically by the compiler. However, you'll need to install typings for UUI's dependencies before you can consume it:

```bash
yarn add @types/react @types/react-dom
```