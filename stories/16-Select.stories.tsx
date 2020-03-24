import React, { useState } from 'react';
import { Select } from '../src/components/Select';
import { withKnobs } from "@storybook/addon-knobs";
import { PreviewBox } from './utils/PreviewBox';

export default {
  title: 'Select',
  decorators: [withKnobs]
};

export const toSelectStory = () => {
  const options1 = [
    { label: 'A', value: 1 },
    { label: 'B', value: 2 },
  ]
  const [value1, setValue1] = useState(2)

  const options2 = [
    { label: 'Cat', value: 'cat' },
    { label: 'Dog', value: 'dog' },
    { label: 'Parrot', value: 'parrot' },
  ]
  const [value2, setValue2] = useState('dog')

  return (
    <div className="u-m-4">
      <PreviewBox title="Select">
        <Select options={options1} value={value1} onChange={(value) => { setValue1(value) }}/>
        <Select options={options2} value={value2} onChange={(value) => { setValue2(value) }}/>
      </PreviewBox>
    </div>
  )
}

toSelectStory.story = {
  name: 'Select',
};