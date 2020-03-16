import React, { useState } from 'react';
import { BaseCheckbox } from '../src/base/BaseCheckbox';
import { withKnobs } from "@storybook/addon-knobs";
import { PreviewBox } from './utils/PreviewBox';

export default {
  title: 'Checkbox',
  decorators: [withKnobs]
};

export const toBaseCheckboxStory = () => {
  const [flag, setFlag] = useState(false)
  return (
    <div>
      <PreviewBox title="BaseCheckbox">
        <BaseCheckbox
          label={'Checkbox'}
          value={flag}
          onChange={(value) => { console.log(value); setFlag(value) }}
        />
        <BaseCheckbox
          label={'Disabled'}
          value={flag}
          onChange={(value) => { console.log(value); setFlag(value) }}
          disabled
        />
      </PreviewBox>
    </div>
  )
}

toBaseCheckboxStory.story = {
  name: 'BaseCheckbox',
};
