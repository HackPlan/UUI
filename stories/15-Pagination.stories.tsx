import React, { useState, useMemo } from 'react';
import { Pagination, PageList, PageInfo, PageJumper } from '../src/components/Pagination';
import { withKnobs } from "@storybook/addon-knobs";
import { PreviewBox } from './utils/PreviewBox';
import { range } from 'lodash';

export default {
  title: 'Pagination',
  decorators: [withKnobs]
};

export const toPaginationStory = () => {
  const [rows, setRows] = useState(range(1, 5))
  const [count, setCount] = useState(43)
  const [offset, setOffset] = useState(0)
  const [limit, setLimit] = useState(5)

  const { page, pageSize, totalPage, totalItem } = useMemo(() => {
    return {
      page: Math.ceil((offset + 0.1) / limit),
      pageSize: limit,
      totalPage: Math.ceil(count / limit),
      totalItem: count
    }
  }, [rows, count, offset, limit])

  const [jumpPage, setJumpPage] = useState<number | null>(null)

  return (
    <div>
      <PreviewBox title="Pagination">
        <div className="u-my-4">
          <div>Current Page: {page}</div>
          <div>Page Size: {pageSize}</div>
          <div>Total Page: {totalPage}</div>
          <div>Total Item: {totalItem}</div>
        </div>
        <Pagination>
          <PageInfo
            page={page}
            pageSize={pageSize}
            totalItem={totalItem}
          ></PageInfo>
          <PageList
            page={page}
            totalPage={totalPage}
            onPageChange={(value) => {
              setOffset((value - 1) * limit)
            }}
          ></PageList>
          <PageJumper
            jumpPage={jumpPage}
            onJumpPageChange={(page) => setJumpPage(page)}
            onJumped={(page) => {
              setOffset((page - 1) * limit)
            }}
          ></PageJumper>
        </Pagination>
      </PreviewBox>
    </div>
  )
}

toPaginationStory.story = {
  name: 'Pagination',
};
