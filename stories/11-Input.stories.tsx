import React, { useState } from 'react';
import { BaseInput } from '../src/base/BaseInput';
import { Input } from '../src/components/Input';
import { withKnobs } from "@storybook/addon-knobs";

export default {
  title: 'Input',
  decorators: [withKnobs]
};

export const toBaseInputStory = () => {
  const [name, setName] = useState('')
  return (
    <div className="u-m-4">
      <BaseInput
        value={name}
        onChange={(value) => { setName(value) }}
        placeholder={'Input something...'}
      />
    </div>
  )
}

toBaseInputStory.story = {
  name: 'BaseInput',
};

export const toInputStory = () => {
  const [name, setName] = useState('')
  return (
    <div className="u-m-4">
      <Input
        value={name}
        onChange={(value) => { setName(value) }}
        placeholder={'Input something...'}
      />
    </div>
  )
}

toInputStory.story = {
  name: 'Input',
};