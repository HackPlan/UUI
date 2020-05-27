import React, { useMemo } from 'react';
import { Toaster, ToasterPosition } from '../src';
import { Button } from '../src';
import { withKnobs } from "@storybook/addon-knobs";

export default {
  title: 'Toast',
  decorators: [withKnobs]
};

const AppToaster1 = Toaster.create({
  maxToasts: 5,
  position: ToasterPosition.BottomLeft,
})
const AppToaster2 = Toaster.create({
  maxToasts: 5,
  position: ToasterPosition.TopRight,
})

export const Toast = () => {
  return (
    <Button onClick={() => {
      AppToaster1.show({
        message: Math.random(),
      })
    }}>
      default toast
    </Button>
  )
}

Toast.storyName = 'Toast'

export const ToastCustomStyle = () => {
  return (
    <Button onClick={() => {
      AppToaster2.show({
        customize: {
          Root: {
            extendClassName: "bg-green-400 rounded border-none text-white",
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

ToastCustomStyle.storyName = 'CustomStyle Toast'