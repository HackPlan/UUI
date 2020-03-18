import React, { useState, useEffect } from 'react';
import { TextField } from '../src/components/Input';
import { NumberField } from '../src/components/Input';
import { withKnobs } from "@storybook/addon-knobs";
import { PreviewBox } from './utils/PreviewBox';

export default {
  title: 'Input',
  decorators: [withKnobs]
};

export const toTextFieldStory = () => {
  const [name, setName] = useState('')
  return (
    <div>
      <PreviewBox title="Default TextField">
        <TextField
          type='text'
          value={name}
          onChange={(value) => { setName(value) }}
          placeholder={'Input text...'}
        />
      </PreviewBox>
    </div>
  )
}

toTextFieldStory.story = {
  name: 'TextField',
};

export const toNumberField = () => {
  const [age, setAge] = useState<number | null>(null)
  const [age2, setAge2] = useState<number | null>(null)
  return (
    <div>
      <PreviewBox title="Default NumberField">
        <NumberField
          value={age}
          onChange={(value) => { setAge(value) }}
          placeholder={'Input number...'}
        />
      </PreviewBox>
      <PreviewBox
        title="NumberField with range limit control"
        description={
          <div>
            <div>you can set property min, max, fixed and step to limit input number.</div>
            <div>eg. min=-10 max=999 fixed=1</div>
          </div>
        }
      >
        <NumberField
          value={age2}
          onChange={(value) => { setAge2(value) }}
          min={-10}
          max={999}
          step={0.01}
          fixed={0}
          placeholder={'Input integer number...'}
        />
      </PreviewBox>
    </div>
  )
}

toNumberField.story = {
  name: 'NumberField',
};