# UUI

Universal web framework

## Installation

```bash
$ yarn add @hackplan/uui
```

## Usage

```typescript
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

## Development

```bash
$ git clone git@lab.hackplan.com:tinyapps/uui.git
$ cd uui
$ yarn
$ yarn storybook
```

Open your browser and visit http://localhost:6006 .