import React, { useState } from 'react';
import { Switch } from '../src';

export default {
  title: 'Switch',
};

export const toStorybook = () => {
  const [checked, setChecked] = useState(false)

  return (
    <div className="">
      <Switch
        value={checked}
        onChange={(value) => { setChecked(value); console.log('onChange', value) }}
        extendClassName={{
          root: 'w-full'
        }}
        extendStyle={{
          root: {
            fontSize: 30,
          }
        }}
      >
        {checked ? 'on' : 'off'}
      </Switch>
    </div>
  )
}

toStorybook.story = {
  name: 'Switch',
};
