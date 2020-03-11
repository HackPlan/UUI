import React, { useState } from 'react';
import { Tag } from '../src';

export default {
  title: 'Tag',
};

export const toStorybook = () => {
  return (
    <div className="">
      <Tag
        extendClassName={{
          root: 'u-flex u-flex-col',
          content: 'u-text-green-800',
        }}
        extendStyle={{
          root: {
            background: '#CCC'
          }
        }}
        extendChildrenAfter={{
          root: <div>append element</div>
        }}
      >ABC</Tag>

      <Tag
        onClick={() => {}}
        overrideClassName={{
          root: 'uui-tag u-inline-block u-p-6 u-rounded-full u-bg-gray-600',
        }}
      >ABC</Tag>
    </div>
  )
}

toStorybook.story = {
  name: 'Tag',
};
