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
        <RadioGroup name="radio1" value={n} onChange={(value) => { setN(value) }}>
          <Radio label={'Apple'} value={'a'} extendClassName={{ root: 'u-mr-4 '}}></Radio>
          <Radio label={'Banana'} value={'b'} extendClassName={{ root: 'u-mr-4 '}}></Radio>
          <Radio label={'Cherry'} value={'c'} extendClassName={{ root: 'u-mr-4 '}}></Radio>
        </RadioGroup>
      </PreviewBox>
    </div>
  )
}

toRadioStory.story = {
  name: 'Radio',
};
