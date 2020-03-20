import React, { useMemo, Props } from 'react';
import { StylishProps, initStylished } from '../../utils/stylish';
import { range } from 'lodash';
import { Button } from '../Button';

export enum PageListNodeName {
  PageList = "pagelist",
  Root = "root",
  PrevButton = "prevbutton",
  PageButton = "pagebutton",
  ActivePageButton = "activepagebutton",
  NextButton = "nextbutton",
}

export interface PageListProps extends StylishProps<PageListNodeName> {
  page: number
  totalPage: number
  onPageChange: (page: number) => void
}

export function PageList(props: PageListProps) {

  // Initial Nodes
  const [
    Root,
    PrevButton,
    PageButton,
    ActivePageButton,
    NextButton,
  ] = useMemo(() => {
    const stylished = initStylished(PageListNodeName.PageList, props, { prefix: "uui" })
    return [
      stylished.element('div', PageListNodeName.Root),
      stylished.element('div', PageListNodeName.PrevButton),
      stylished.element('div', PageListNodeName.PageButton),
      stylished.element('div', PageListNodeName.ActivePageButton),
      stylished.element('div', PageListNodeName.NextButton),
    ]
  }, [])

  const pageListData = useMemo(() => {
    const maxShowPageNumberLength = 5;
    const pageListData: {
      title: string;
      nonInteractive: boolean;
      selected: boolean;
    }[] = range(1, props.totalPage + 1).map((i) => ({
      title: String(i),
      nonInteractive: false,
      selected: false,
    }));

    const leftHideLength = props.page - 4 < 0 ? 0 : props.page - 4;
    const leftShowLength = (props.page > 4 ? 3 : props.page) - 1;
    const rightShowLength = maxShowPageNumberLength - leftShowLength - 1;
    const rightHideLength = props.totalPage - props.page - rightShowLength - 1;

    if (rightHideLength > 0) {
      pageListData.splice(props.page + rightShowLength, rightHideLength);
      pageListData.splice(pageListData.length - 1, 0, { title: '...', nonInteractive: true, selected: false });
    }
    if (leftHideLength > 0) {
      pageListData.splice(1, leftHideLength);
      pageListData.splice(1, 0, { title: '...', nonInteractive: true, selected: false });
    }
    const selectedPageNumber = pageListData.find(
      (i) => i.title === String(props.page),
    );
    if (selectedPageNumber) {
      if (pageListData.length > 1) {
        selectedPageNumber.selected = true;
      } else {
        selectedPageNumber.nonInteractive = true;
      }
    }

    return pageListData
  }, [props.page, props.totalPage]);

  return (
    <Root className={"u-flex u-flex-row u-mx-2"}>
      <PrevButton>
        <Button
          disabled={props.page === 1}
          onClick={() => { if (props.page > 1) props.onPageChange(props.page-1) }}
        >Prev</Button>
      </PrevButton>
      {pageListData.map((item, index) =>
        props.page === Number(item.title) ? (
          <ActivePageButton key={`page-item-${index}`} className={"u-px-1"}>
            <Button
              extendClassName={{ root: "u-border-blue-500 u-text-blue-500" }}
              onClick={() => { if (!item.nonInteractive) props.onPageChange(Number(item.title)) }}
            >{item.title}</Button>
          </ActivePageButton>
        ) : (
          <PageButton key={`page-item-${index}`} className={"u-px-1"}>
            <Button
              onClick={() => { if (!item.nonInteractive) props.onPageChange(Number(item.title)) }}
            >{item.title}</Button>
          </PageButton>
        )
      )}
      <NextButton>
        <Button
          disabled={props.page === props.totalPage}
          onClick={() => { if (props.page < props.totalPage) props.onPageChange(props.page+1) }}
        >Next</Button>
      </NextButton>
    </Root>
  )
}