import React, { useState } from 'react';
import { Table } from '../src/components/Table';
import { withKnobs } from "@storybook/addon-knobs";
import { PreviewBox } from './utils/PreviewBox';

export default {
  title: 'Table',
  decorators: [withKnobs]
};

export const toTableStory = () => {
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
  const [rows2, setRow2] = useState([
    ["Bobby P. Morton", "63", "male", "785-481-2375", "morton@example.com", "Doctor"],
    ["Levi R. Oglesby", "35", "female", "631-285-1780", "oglesby@example.com", "Police"],
    ["John S. Cassidy", "19", "male", "719-328-5475", "cassidy@example.com", "Student"],
  ])

  const [selectedIndexes, setSelectedIndexes] = useState<number[]>([])

  return (
    <div>
      <PreviewBox title="Default Table">
        <Table
          columns={columns1}
          rows={rows}
        ></Table>
      </PreviewBox>

      <PreviewBox title="Table with selection">
        <Table
          columns={columns1}
          rows={rows}
          selectedIndexes={selectedIndexes}
          onSelected={(indexes) => { setSelectedIndexes(indexes) }}
        ></Table>
      </PreviewBox>

      <PreviewBox title="Table with grouping column">
        <Table
          columns={columns2}
          rows={rows}
        ></Table>
      </PreviewBox>

      <PreviewBox title="Table with empty data">
        <Table
          columns={columns1}
          rows={[]}
          selectedIndexes={selectedIndexes}
          onSelected={(indexes) => { setSelectedIndexes(indexes) }}
        ></Table>
      </PreviewBox>

      <PreviewBox title="Table hide header">
        <Table
          columns={columns1}
          rows={rows}
          hideHeader
        ></Table>
      </PreviewBox>

      <PreviewBox title="Table with custom style">
        <Table
          columns={columns2}
          rows={rows}
          extendClassName={{
            headcell: 'u-bg-green-400 u-',
            datacell: 'u-bg-red-400',
          }}
          extendStyle={{
            datacell: {
              fontStyle: 'italic',
              padding: 20
            }
          }}
        ></Table>
      </PreviewBox>

      <PreviewBox title="Table with drag and drop">
        <Table
          columns={columns1}
          rows={rows2}
          onDragged={(from, to) => {
            setRow2((value) => {
              const newValue = Array.from(value)
              newValue.splice(to, 0, newValue.splice(from, 1)[0])
              return newValue
            })
          }}
        ></Table>
      </PreviewBox>
    </div>
  )
}

toTableStory.story = {
  name: 'Table',
};
