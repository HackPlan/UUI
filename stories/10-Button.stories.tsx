import React from 'react';
import { BaseButton } from '../src/base/BaseButton';
import { Button } from '../src/components/Button';
import { withKnobs } from "@storybook/addon-knobs";

export default {
  title: 'Button',
  decorators: [withKnobs]
};

export const toBaseButtonStory = () => {
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

toBaseButtonStory.story = {
  name: 'BaseButton',
};


export const toButtonStorybook = () => {
  return (
    <div className="u-m-4">
      <Button
        onClick={() => { console.log('clicked!') }}
        disabled
        extendClassName={{ root: 'test2'}}
        extendStyle={{ root: { backgroundColor: 'green', borderRadius: 8 } }}
        extendChildrenBefore={{ root: <div>extend2</div>}}
      >
        Button
      </Button>

    </div>
  )
}

toButtonStorybook.story = {
  name: 'Button',
};