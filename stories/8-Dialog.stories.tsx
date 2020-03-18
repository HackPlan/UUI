import React, { useState } from 'react';
import { Dialog } from '../src/components/Dialog';
import { withKnobs, boolean } from "@storybook/addon-knobs";

export default {
  title: 'Dialog',
  decorators: [withKnobs]
};

export const toStorybook = () => {
  const [opened, setOpened] = useState(true)
  return (
    <div className="u-bg-gray-300" style={{ height: '100vh' }}>
      <button
        className="u-bg-blue-400 u-p-2 u-text-white"
        onClick={() => { setOpened((value) => { return !value })}}
      >toggle dialog</button>
      <Dialog
        open={opened}
        focusTrap={boolean("focusTrap", true)}
      >
        <div className=" u-w-64 u-h-40"></div>
        <button
          className="u-bg-red-400 u-p-2 u-text-white"
          onClick={() => { setOpened((value) => { return !value })}}
        >close</button>
      </Dialog>

    </div>
  )
}

toStorybook.story = {
  name: 'Dialog',
};
