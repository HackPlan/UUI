import React from 'react';
import { Button } from '../src/components/Button';
import { withKnobs } from "@storybook/addon-knobs";

export default {
  title: 'Button',
  decorators: [withKnobs]
};

export const toButtonStory = () => {
  return (
    <div className="u-m-4">
      <Button
        onClick={() => { console.log('clicked!') }}
        disabled
      >
        Button
      </Button>

    </div>
  )
}

toButtonStory.story = {
  name: 'Button',
};