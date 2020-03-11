import React, { useState } from 'react';
import { Dialog } from '../src';
import { withKnobs, boolean } from "@storybook/addon-knobs";

export default {
  title: 'Dialog',
  decorators: [withKnobs]
};

export const toStorybook = () => {
  return (
    <div className="">
      <Dialog
        open={boolean("Open", true)}
        focusTrap={boolean("focusTrap", true)}
      >
        <h1 className="u-text-xl">Dialog Title</h1>
        <p className="u-my-4 u-text-gray-600">Dialog Content</p>
        <input className="u-bg-gray-300 u-p-2" type="text" />
        <button className="u-bg-red-400 u-p-2 u-text-white">OK</button>
      </Dialog>

    </div>
  )
}

toStorybook.story = {
  name: 'Dialog',
};
