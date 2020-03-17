import React, { useState } from 'react';
import { BaseTable } from '../src/base/BaseTable';
import { withKnobs } from "@storybook/addon-knobs";
import { PreviewBox } from './utils/PreviewBox';

export default {
  title: 'Table',
  decorators: [withKnobs]
};

export const toBaseTableStory = () => {
  const columns = ["Name", "Mobile", "Age", "Gender"]
  const rows = [
    ["Bobby P. Morton", "785-481-2375", "63", "male"],
    ["Levi R. Oglesby", "631-285-1780", "35", "female"],
    ["John S. Cassidy", "719-328-5475", "19", "male"],
  ]
  return (
    <div>
      <PreviewBox title="Default Table">
        <BaseTable
          columns={columns}
          rows={rows}
        ></BaseTable>
      </PreviewBox>
    </div>
  )
}

toBaseTableStory.story = {
  name: 'BaseTable',
};
