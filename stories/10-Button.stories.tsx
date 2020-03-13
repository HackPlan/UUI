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
      <div className="u-mb-2">
        <span className="u-mr-2">
          <Button>Default</Button>
        </span>
        <span className="u-mr-2">
          <Button intent={'primary'}>Primary</Button>
        </span>
        <span className="u-mr-2">
          <Button intent={'info'}>Info</Button>
        </span>
        <span className="u-mr-2">
          <Button intent={'link'}>Link</Button>
        </span>
        <span className="u-mr-2">
          <Button intent={'success'}>Success</Button>
        </span>
        <span className="u-mr-2">
          <Button intent={'danger'}>Danger</Button>
        </span>
      </div>
      <div className="u-mb-2">
        <span className="u-mr-2">
          <Button loading>Default</Button>
        </span>
        <span className="u-mr-2">
          <Button loading intent={'primary'}>Primary</Button>
        </span>
        <span className="u-mr-2">
          <Button loading intent={'info'}>Info</Button>
        </span>
        <span className="u-mr-2">
          <Button loading intent={'link'}>Link</Button>
        </span>
        <span className="u-mr-2">
          <Button loading intent={'success'}>Success</Button>
        </span>
        <span className="u-mr-2">
          <Button loading intent={'danger'}>Danger</Button>
        </span>
      </div>
      <div className="u-mb-2">
        <span className="u-mr-2">
          <Button disabled>Default</Button>
        </span>
        <span className="u-mr-2">
          <Button disabled intent={'primary'}>Primary</Button>
        </span>
        <span className="u-mr-2">
          <Button disabled intent={'info'}>Info</Button>
        </span>
        <span className="u-mr-2">
          <Button disabled intent={'link'}>Link</Button>
        </span>
        <span className="u-mr-2">
          <Button disabled intent={'success'}>Success</Button>
        </span>
        <span className="u-mr-2">
          <Button disabled intent={'danger'}>Danger</Button>
        </span>
      </div>
      <div className="u-mb-2">
        <span className="u-mr-2">
          <Button size={'small'}>Small</Button>
        </span>
        <span className="u-mr-2">
          <Button>Default</Button>
        </span>
        <span className="u-mr-2">
          <Button size={'normal'}>Normal</Button>
        </span>
        <span className="u-mr-2">
          <Button size={'medium'}>Medium</Button>
        </span>
        <span className="u-mr-2">
          <Button size={'large'}>Large</Button>
        </span>
      </div>
    </div>
  )
}

toButtonStorybook.story = {
  name: 'Button',
};