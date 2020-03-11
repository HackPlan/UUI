import React from 'react';
import { HelloWorld } from '../src';

export default {
  title: 'Welcome',
};

export const toStorybook = () => {
  return (
    <HelloWorld></HelloWorld>
  )
}

toStorybook.story = {
  name: 'HelloWorld',
};
