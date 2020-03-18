import React, { useState } from 'react';
import { Radio, RadioGroup } from '../src/components/Radio';
import { withKnobs } from "@storybook/addon-knobs";
import { PreviewBox } from './utils/PreviewBox';

export default {
  title: 'Radio',
  decorators: [withKnobs]
};

export const toRadioStory = () => {
  const [n, setN] = useState("a")
  return (
    <div>
      <PreviewBox title="Radio">
        <Radio
          label={'Radio'}
        />
        <Radio
          label={'Disabled'}
          disabled
        />
      </PreviewBox>
      <PreviewBox title="Group of Radio">
        <RadioGroup value={n} onChange={(value) => { console.log('onchange ' + value + ' ' + typeof value); setN(value) }}>
          <Radio name="radio1" label={'Apple'} value={'a'} extendClassName={{ root: 'u-mr-4 '}}></Radio>
          <Radio name="radio1" label={'Banana'} value={'b'} extendClassName={{ root: 'u-mr-4 '}}></Radio>
          <Radio name="radio1" label={'Cherry'} value={'c'} extendClassName={{ root: 'u-mr-4 '}}></Radio>
        </RadioGroup>
      </PreviewBox>
    </div>
  )
}

toRadioStory.story = {
  name: 'Radio',
};
