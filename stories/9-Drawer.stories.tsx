import React, { useState } from 'react';
import { Drawer } from '../src';
import { withKnobs, boolean } from "@storybook/addon-knobs";

export default {
  title: 'Drawer',
  decorators: [withKnobs]
};

export const toStorybook = () => {
  return (
    <div className="">
      <div style={{ height: 800, width: 400, background: "linear-gradient(to top, black, cyan)" }} />
      <Drawer
        open={boolean("Open", true)}
        focusTrap={boolean("focusTrap", true)}
        lockBodyScroll={boolean("lockBodyScroll", false)}
      >
        <h1 className="u-text-xl">Drawer Title</h1>
        <p className="u-my-4 u-text-gray-600">Drawer Content</p>
        <input className="u-bg-gray-300 u-p-2" type="text" />
        <button className="u-bg-red-400 u-p-2 u-text-white">OK</button>
      </Drawer>

    </div>
  )
}

toStorybook.story = {
  name: 'Drawer',
};
