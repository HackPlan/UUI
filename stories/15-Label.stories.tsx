import React from 'react';
import { MoneyLabel, DateLabel } from '../src/components/Label';
import { withKnobs } from "@storybook/addon-knobs";
import { PreviewBox } from './utils/PreviewBox';

export default {
  title: 'Label',
  decorators: [withKnobs]
};

export const toMoneyLabelStory = () => {
  return (
    <div>
      <PreviewBox title="MoneyLabel">
        <div className="u-flex u-flex-col">
          <MoneyLabel symbol={'¥'}>
            100100100.0000
          </MoneyLabel>
          <MoneyLabel thousand={' '}>
            100100100.0000
          </MoneyLabel>
          <MoneyLabel symbol={'IDR'} thousand={'.'} decimal={','}>
            100100100.0000
          </MoneyLabel>
        </div>
      </PreviewBox>
    </div>
  )
}

toMoneyLabelStory.story = {
  name: 'MoneyLabel',
};

export const toDateLabelStory = () => {
  const now = new Date()
  return (
    <div>
      <PreviewBox title="DateLabel" description={'zh-CN'}>
        <div className="u-flex u-flex-col">
          <DateLabel value={now} locale={'zh-CN'} kind={'2012-03-14'}></DateLabel>
          <DateLabel value={now} locale={'zh-CN'} kind={'2012/3/14'}></DateLabel>
          <DateLabel value={now} locale={'zh-CN'} kind={'2012年3月'}></DateLabel>
          <DateLabel value={now} locale={'zh-CN'} kind={'2012年3月14日'}></DateLabel>
          <DateLabel value={now} locale={'zh-CN'} kind={'3月14日'}></DateLabel>
          <DateLabel value={now} locale={'zh-CN'} kind={'三月十四日'}></DateLabel>
          <DateLabel value={now} locale={'zh-CN'} kind={'二○一二年三月'}></DateLabel>
          <DateLabel value={now} locale={'zh-CN'} kind={'二○一二年三月十四日'}></DateLabel>
          <DateLabel value={now} locale={'zh-CN'} kind={'周三'}></DateLabel>
          <DateLabel value={now} locale={'zh-CN'} kind={'星期三'}></DateLabel>
        </div>
      </PreviewBox>
      <PreviewBox title="DateLabel" description={'zh-TW'}>
        <div className="u-flex u-flex-col">
          <DateLabel value={now} locale={'zh-TW'} kind={'週三'}></DateLabel>
        </div>
      </PreviewBox>
      <PreviewBox title="DateLabel" description={'en-US'}>
        <div className="u-flex u-flex-col">
          <DateLabel value={now} locale={'en-US'} kind={'2012-03-14'}></DateLabel>
          <DateLabel value={now} locale={'en-US'} kind={'2012/3/14'}></DateLabel>
          <DateLabel value={now} locale={'en-US'} kind={'14-Mar-12'}></DateLabel>
          <DateLabel value={now} locale={'en-US'} kind={'14-Mar-2012'}></DateLabel>
          <DateLabel value={now} locale={'en-US'} kind={'2012-03-14'}></DateLabel>
          <DateLabel value={now} locale={'en-US'} kind={'2012/3/14'}></DateLabel>
          <DateLabel value={now} locale={'en-US'} kind={'3/14'}></DateLabel>
          <DateLabel value={now} locale={'en-US'} kind={'3/14/12'}></DateLabel>
          <DateLabel value={now} locale={'en-US'} kind={'Mar-12'}></DateLabel>
          <DateLabel value={now} locale={'en-US'} kind={'March 14, 2012'}></DateLabel>
          <DateLabel value={now} locale={'en-US'} kind={'March-12'}></DateLabel>
        </div>
      </PreviewBox>
    </div>
  )
}

toDateLabelStory.story = {
  name: 'DateLabel',
};
