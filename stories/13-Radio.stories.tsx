import React, { useState } from 'react';
import { BaseRadio, BaseRadioGroup } from '../src/base/BaseRadio';
import { withKnobs } from "@storybook/addon-knobs";
import { PreviewBox } from './utils/PreviewBox';

export default {
  title: 'Radio',
  decorators: [withKnobs]
};

export const toBaseRadioStory = () => {
  const [n, setN] = useState("a")
  return (
    <div>
      <PreviewBox title="BaseRadio">
        <BaseRadio
          label={'Radio'}
        />
        <BaseRadio
          label={'Disabled'}
          disabled
        />
      </PreviewBox>
      <PreviewBox title="Group of Radio">
        <BaseRadioGroup value={n} onChange={(value) => { console.log('onchange ' + value + ' ' + typeof value); setN(value) }}>
          <BaseRadio name="radio1" label={'Apple'} value={'a'} extendClassName={{ root: 'u-mr-4 '}}></BaseRadio>
          <BaseRadio name="radio1" label={'Banana'} value={'b'} extendClassName={{ root: 'u-mr-4 '}}></BaseRadio>
          <BaseRadio name="radio1" label={'Cherry'} value={'c'} extendClassName={{ root: 'u-mr-4 '}}></BaseRadio>
        </BaseRadioGroup>
      </PreviewBox>
    </div>
  )
}

toBaseRadioStory.story = {
  name: 'BaseRadio',
};
