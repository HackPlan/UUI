import React, { useState } from 'react';
import { BaseTable } from '../src/base/BaseTable';
import { withKnobs } from "@storybook/addon-knobs";
import { PreviewBox } from './utils/PreviewBox';

export default {
  title: 'Table',
  decorators: [withKnobs]
};

export const toBaseTableStory = () => {
  const columns1 = [{ title: "Name" }, { title: "Age" }, { title: "Gender" }, { title: "Mobile" }, { title: "Email" }, { title: "Profession" }]
  const columns2 = [{
    title: 'Person',
    children: [{
      title: 'Info',
      children: [{
        title: 'Name',
      }, {
        title: 'Age',
      }, {
        title: 'Gender',
      }]
    }, {
      title: 'Contact',
      children: [{
        title: 'Mobile',
      }, {
        title: 'Email',
      }]
    }]
  }, {
    title: 'Profession'
  }]
  const rows = [
    ["Bobby P. Morton", "63", "male", "785-481-2375", "morton@example.com", "Doctor"],
    ["Levi R. Oglesby", "35", "female", "631-285-1780", "oglesby@example.com", "Police"],
    ["John S. Cassidy", "19", "male", "719-328-5475", "cassidy@example.com", "Student"],
  ]

  const [selectedIndexes, setSelectedIndexes] = useState<number[]>([])

  return (
    <div>
      <PreviewBox title="Default Table">
        <BaseTable
          columns={columns1}
          rows={rows}
        ></BaseTable>
      </PreviewBox>

      <PreviewBox title="Table with selection">
        <BaseTable
          columns={columns1}
          rows={rows}
          selectedIndexes={selectedIndexes}
          onSelected={(indexes) => { setSelectedIndexes(indexes) }}
        ></BaseTable>
      </PreviewBox>

      <PreviewBox title="Table with grouping column">
        <BaseTable
          columns={columns2}
          rows={rows}
        ></BaseTable>
      </PreviewBox>

      <PreviewBox title="Table with empty data">
        <BaseTable
          columns={columns1}
          rows={[]}
          selectedIndexes={selectedIndexes}
          onSelected={(indexes) => { setSelectedIndexes(indexes) }}
        ></BaseTable>
      </PreviewBox>

      <PreviewBox title="Table hide header">
        <BaseTable
          columns={columns1}
          rows={rows}
          hideHeader
        ></BaseTable>
      </PreviewBox>
    </div>
  )
}

toBaseTableStory.story = {
  name: 'BaseTable',
};
