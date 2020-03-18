import React, { useState } from 'react';
import { Checkbox } from '../src/components/Checkbox';
import { withKnobs } from "@storybook/addon-knobs";
import { PreviewBox } from './utils/PreviewBox';

export default {
  title: 'Checkbox',
  decorators: [withKnobs]
};

export const toCheckboxStory = () => {
  const [flag, setFlag] = useState(false)
  return (
    <div>
      <PreviewBox title="Checkbox">
        <Checkbox
          label={'Checkbox'}
          value={flag}
          onChange={(value) => { console.log(value); setFlag(value) }}
        />
        <Checkbox
          label={'Disabled'}
          value={flag}
          onChange={(value) => { console.log(value); setFlag(value) }}
          disabled
        />
      </PreviewBox>
    </div>
  )
}

toCheckboxStory.story = {
  name: 'Checkbox',
};
