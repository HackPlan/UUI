import React, { useState } from 'react';
import { Drawer as UUIDrawer, Button } from '../src';
import { withKnobs } from "@storybook/addon-knobs";

export default {
  title: 'Drawer',
  decorators: [withKnobs]
};

export const Drawer = () => {
  const [active, setActive] = useState(false)
  return (
    <div>
      <Button onClick={() => { setActive((value=> !value)) }}>Click me!</Button>
      <UUIDrawer
        active={active}
        onDismiss={() => {
          setActive(false)
        }}
      >
        Content
      </UUIDrawer>
    </div>

  )
}

Drawer.story = {
  name: 'Drawer',
};
