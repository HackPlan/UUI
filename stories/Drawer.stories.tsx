import React, { useState } from 'react';
import { Drawer, Button } from '../src';
import { withKnobs } from "@storybook/addon-knobs";

export default {
  title: 'Drawer',
  decorators: [withKnobs]
};

export const Drawer1 = () => {
  const [active, setActive] = useState(false)
  return (
    <div>
      <Button onClick={() => { setActive((value=> !value)) }}>Click me!</Button>
      <Drawer
        active={active}
        onDismiss={() => {
          setActive(false)
        }}
      >
        Content
      </Drawer>
    </div>
  )
}

Drawer1.storyName = 'Drawer'
