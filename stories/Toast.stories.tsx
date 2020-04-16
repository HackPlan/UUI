import React, { useMemo } from 'react';
import { Toaster, ToasterPosition } from '../src';
import { Button } from '../src';
import { withKnobs } from "@storybook/addon-knobs";

export default {
  title: 'Toast',
  decorators: [withKnobs]
};

export const Toast = () => {
  const AppToaster = useMemo(() => Toaster.create({
    maxToasts: 5,
    position: ToasterPosition.TopRight,
  }), [])

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
  const AppToaster = useMemo(() => Toaster.create({
    maxToasts: 5,
    position: ToasterPosition.TopRight,
  }), [])
  return (
    <Button onClick={() => {
      AppToaster.show({
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
