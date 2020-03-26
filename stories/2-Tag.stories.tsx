import React from 'react';
import { Tag } from '../src';
import { PreviewBox } from './utils/PreviewBox';

export default {
  title: 'Tag',
};

export const toStorybook = () => {
  return (
    <div>
      <PreviewBox title={"Default Tag"}>
        <Tag>Tag</Tag>
      </PreviewBox>
      <PreviewBox title={"Tag with custom style"}>
        <Tag
          customize={{
            Root: {
              extendClassName: 'u-flex u-flex-col',
              extendStyle: {
                background: '#CCC'
              },
              extendChildrenAfter: <div>append element</div>
            },
            Content: {
              extendClassName: 'u-text-green-800'
            },
          }}
        >ABC</Tag>

        <Tag
          onClick={() => {}}
          customize={{
            Root: {
              overrideClassName: 'uui-tag u-inline-block u-p-6 u-rounded-full u-bg-gray-600',
            }
          }}
        >ABC</Tag>
      </PreviewBox>
    </div>
  )
}

toStorybook.story = {
  name: 'Tag',
};
