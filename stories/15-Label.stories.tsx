import React from 'react';
import { MoneyLabel, DateLabel, TimeLabel } from '../src/components/Label';
import { withKnobs } from "@storybook/addon-knobs";
import { PreviewBox } from './utils/PreviewBox';
import { DateTime } from 'luxon';

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

export const toTimeLabelStory = () => {
  const now = new Date()
  return (
    <div>
      <PreviewBox title="TimeLabel" description={'zh-CN'}>
        <div className="u-flex u-flex-col">
          <TimeLabel value={now} locale={'zh-CN'} kind={'13时30分'}></TimeLabel>
          <TimeLabel value={now} locale={'zh-CN'} kind={'13时30分55秒'}></TimeLabel>
          <TimeLabel value={now} locale={'zh-CN'} kind={'下午 1:30:55'}></TimeLabel>
          <TimeLabel value={now} locale={'zh-CN'} kind={'下午1时30分'}></TimeLabel>
          <TimeLabel value={now} locale={'zh-CN'} kind={'下午1时30分55秒'}></TimeLabel>
          <TimeLabel value={now} locale={'zh-CN'} kind={'下午一时三十分'}></TimeLabel>
          <TimeLabel value={now} locale={'zh-CN'} kind={'十三时三十分'}></TimeLabel>
        </div>
      </PreviewBox>
      <PreviewBox title="TimeLabel" description={'zh-TW'}>
        <div className="u-flex u-flex-col">
          <TimeLabel value={now} locale={'zh-TW'} kind={'13時30分'}></TimeLabel>
          <TimeLabel value={now} locale={'zh-TW'} kind={'13時30分55秒'}></TimeLabel>
          <TimeLabel value={now} locale={'zh-TW'} kind={'下午 1:30:55'}></TimeLabel>
          <TimeLabel value={now} locale={'zh-TW'} kind={'下午1時30分'}></TimeLabel>
          <TimeLabel value={now} locale={'zh-TW'} kind={'下午1時30分55秒'}></TimeLabel>
          <TimeLabel value={now} locale={'zh-TW'} kind={'下午一時三十分'}></TimeLabel>
          <TimeLabel value={now} locale={'zh-TW'} kind={'十三時三十分'}></TimeLabel>
        </div>
      </PreviewBox>
      <PreviewBox title="TimeLabel" description={'en-US'}>
        <div className="u-flex u-flex-col">
          <TimeLabel value={now} locale={'en-US'} kind={'13:30'}></TimeLabel>
          <TimeLabel value={now} locale={'en-US'} kind={'13:30:55'}></TimeLabel>
          <TimeLabel value={now} locale={'en-US'} kind={'1:30 PM'}></TimeLabel>
          <TimeLabel value={now} locale={'en-US'} kind={'1:30:55 PM'}></TimeLabel>
        </div>
      </PreviewBox>
    </div>
  )
}

toTimeLabelStory.story = {
  name: 'TimeLabel',
};