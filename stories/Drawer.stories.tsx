import React, { useState } from 'react';
import { Drawer, Button } from '../src';

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
