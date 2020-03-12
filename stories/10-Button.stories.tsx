import React from 'react';
import { BaseButton } from '../src/base/BaseButton';
import { withKnobs } from "@storybook/addon-knobs";

export default {
  title: 'Button',
  decorators: [withKnobs]
};

export const toStorybook = () => {
  return (
    <div className="u-m-4">
      <BaseButton
        onClick={() => { console.log('clicked!') }}
        disabled
      >
        Button
      </BaseButton>

    </div>
  )
}

toStorybook.story = {
  name: 'BaseButton',
};
