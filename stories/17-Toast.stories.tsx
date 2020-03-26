import React from 'react';
import { Toaster, ToasterPosition } from '../src/components/Toast';
import { Button } from '../src/components/Button';
import { withKnobs } from "@storybook/addon-knobs";
import { PreviewBox } from './utils/PreviewBox';

export default {
  title: 'Toast',
  decorators: [withKnobs]
};

const AppToaster = Toaster.create({
  maxToasts: 5,
  position: ToasterPosition.TopRight,
})

const AppToaster2 = Toaster.create({
  maxToasts: 5,
  position: ToasterPosition.TopRight,
})


export const toToastStory = () => {

  return (
    <div>
      <PreviewBox title={"Default Toast"}>
        <Button onClick={() => {
          const id = AppToaster.show({
            message: Math.random(),
          })
        }}>
          default toast
        </Button>
      </PreviewBox>

      <PreviewBox title={"Custom Toast"}>
        <Button onClick={() => {
          const id = AppToaster2.show({
            extendClassName: { root: "u-bg-green-400 u-rounded u-border-none u-text-white" },
            extendStyle: { root: { padding: 12 }},
            message: Math.random(),
          })
        }}>
          custom toast
        </Button>
      </PreviewBox>
    </div>
  )
}

toToastStory.story = {
  name: 'Toast',
};
