import React from 'react';
import { Toaster, ToasterPosition } from '../src/components/Toast';
import { Button } from '../src/components/Button';
import { withKnobs } from "@storybook/addon-knobs";

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


export const Toast = () => {
  return (
    <Button onClick={() => {
      AppToaster.show({
        message: Math.random(),
      })
    }}>
      default toast
    </Button>
  )
}

Toast.story = {
  name: 'Toast',
};

export const ToastCustomStyle = () => {
  return (
    <Button onClick={() => {
      AppToaster2.show({
        customize: {
          Root: {
            extendClassName: "u-bg-green-400 u-rounded u-border-none u-text-white",
            extendStyle: { padding: 12 },
          }
        },
        message: Math.random(),
      })
    }}>
      custom toast
    </Button>
  )
}

ToastCustomStyle.story = {
  name: 'CustomStyle Toast',
};
