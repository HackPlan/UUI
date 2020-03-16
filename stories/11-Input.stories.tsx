import React, { useState, useEffect } from 'react';
import { BaseTextField } from '../src/base/BaseInput';
import { BaseNumberField } from '../src/base/BaseInput';
import { withKnobs } from "@storybook/addon-knobs";
import { PreviewBox } from './utils/PreviewBox';

export default {
  title: 'Input',
  decorators: [withKnobs]
};

export const toBaseTextFieldStory = () => {
  const [name, setName] = useState('')
  return (
    <div>
      <PreviewBox title="Default BaseTextField">
        <BaseTextField
          type='text'
          value={name}
          onChange={(value) => { setName(value) }}
          placeholder={'Input text...'}
        />
      </PreviewBox>
    </div>
  )
}

toBaseTextFieldStory.story = {
  name: 'BaseTextField',
};

export const toBaseNumberField = () => {
  const [age, setAge] = useState<number | null>(null)
  const [age2, setAge2] = useState<number | null>(null)
  return (
    <div>
      <PreviewBox title="Default BaseNumberField">
        <BaseNumberField
          value={age}
          onChange={(value) => { setAge(value) }}
          placeholder={'Input number...'}
        />
      </PreviewBox>
      <PreviewBox
        title="BaseNumberField with range limit control"
        description={
          <div>
            <div>you can set property min, max, fixed and step to limit input number.</div>
            <div>eg. min=-10 max=999 fixed=1</div>
          </div>
        }
      >
        <BaseNumberField
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

toBaseNumberField.story = {
  name: 'BaseNumberField',
};