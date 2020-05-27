import React, { useState } from 'react';
import { TextField, TextArea, RadioGroup, Radio, Checkbox, DatePicker, Button, HTMLSelect, Popover } from '../src';

export default {
  title: 'Form',
};

const LabeledControl = (props: any) => {
  return (
    <div className="flex row mb-4">
      {props.children}
    </div>
  )
}
const Label = (props: any) => {
  return (
    <label className="flex justify-end items-center mr-2 w-24 h-8">
      {props.children}
    </label>
  )
}

export const FormControlledMode = () => {
  const [name, setName] = useState('')
  const [introduction, setIntroduction] = useState('')
  const [gender, setGender] = useState('male')
  const [birthday, setBirthday] = useState<Date | null>(null)
  const [school, setSchool] = useState('Peking University')
  const [skillsWeb, setSkillsWeb] = useState(false)
  const [skillsMobile, setSkillsMobile] = useState(false)
  const [skillsServer, setSkillsServer] = useState(false)
  const [skillsAI, setSkillsAI] = useState(false)

  const [active, setActive] = useState(false)

  return (
    <div>
      <Popover
        active={active}
        activator={(
          <Button style={{ width: 112, fontSize: 15, height: 40 }} onClick={() => { setActive(!active) }}>Activator</Button>
        )}
        onClickAway={() => { setActive(false) }}
      >
        <div className="m-4 w-48 h-24">
          <p>Popover content header</p>
          <p>Popover test content</p>
        </div>
      </Popover>
      <LabeledControl>
        <Label>名字</Label>
        <TextField className="w-64" value={name} onChange={(value) => setName(value)} />
      </LabeledControl>
      <LabeledControl>
        <Label>介绍</Label>
        <TextArea className="w-64" value={introduction} onChange={(value) => setIntroduction(value)} />
      </LabeledControl>
      <LabeledControl>
        <Label>性别</Label>
        <RadioGroup name="gender" value={gender} onChange={(value) => { setGender(value) }}>
          <Radio label={'男'} value={'male'} className={"mr-2"}></Radio>
          <Radio label={'女'} value={'female'} className={"mr-2"}></Radio>
          <Radio label={'其他'} value={'other'} className={"mr-2"}></Radio>
        </RadioGroup>
      </LabeledControl>
      <LabeledControl>
        <Label>生日</Label>
        <DatePicker className="w-64" value={birthday} onChange={(value) => setBirthday(value)} />
      </LabeledControl>
      <LabeledControl>
        <Label>学校</Label>
        <HTMLSelect
          className="w-64"
          options={[
            { label: 'Peking University', value: 'Peking University' },
            { label: 'Chongqing University', value: 'Chongqing University' },
          ]}
          value={school}
          onChange={(value) => setSchool(value)}
        />
      </LabeledControl>
      <LabeledControl>
        <Label>技能</Label>
        <div className="flex flex-col">
          <Checkbox
            label={'Web'}
            checked={skillsWeb}
            onChange={(value) => { setSkillsWeb(value) }}
          />
          <Checkbox
            label={'Mobile'}
            checked={skillsMobile}
            onChange={(value) => { setSkillsMobile(value) }}
          />
          <Checkbox
            label={'Server'}
            checked={skillsServer}
            onChange={(value) => { setSkillsServer(value) }}
          />
          <Checkbox
            label={'AI'}
            checked={skillsAI}
            onChange={(value) => { setSkillsAI(value) }}
          />
        </div>
      </LabeledControl>
      <LabeledControl>
        <Label></Label>
        <Button>提交</Button>
      </LabeledControl>
    </div>
  )
}

FormControlledMode.storyName = 'Form (Controlled Mode)'


export const FormUncontrolledMode = () => {
  return (
    <form action={'#'} method="post">
      <LabeledControl>
        <Label>名字</Label>
        <TextField className="w-64" name="name" />
      </LabeledControl>
      <LabeledControl>
        <Label>介绍</Label>
        <TextArea className="w-64" name="introduction" />
      </LabeledControl>
      <LabeledControl>
        <Label>性别</Label>
        <Radio name={'gender'} label={'男'} value={'male'} className={"mr-2"}></Radio>
        <Radio name={'gender'} label={'女'} value={'female'} className={"mr-2"}></Radio>
        <Radio name={'gender'} label={'其他'} value={'other'} className={"mr-2"}></Radio>
      </LabeledControl>
      <LabeledControl>
        <Label>生日</Label>
        <DatePicker name={'birthday'} className="w-64" />
      </LabeledControl>
      <LabeledControl>
        <Label>学校</Label>
        <HTMLSelect
          name={'school'}
          className="w-64"
          options={[
            { label: 'Peking University', value: 'Peking University' },
            { label: 'Chongqing University', value: 'Chongqing University' },
          ]}
        />
      </LabeledControl>
      <LabeledControl>
        <Label>技能</Label>
        <div className="flex flex-col">
          <Checkbox
            name={'skills[]'}
            label={'Web'}
            value={'web'}
          />
          <Checkbox
            name={'skills[]'}
            label={'Mobile'}
            value={'mobile'}
          />
          <Checkbox
            name={'skills[]'}
            label={'Server'}
            value={'server'}
          />
          <Checkbox
            name={'skills[]'}
            label={'AI'}
            value={'ai'}
          />
        </div>
      </LabeledControl>
      <LabeledControl>
        <Label></Label>
        <Button type="submit">提交</Button>
      </LabeledControl>
    </form>
  )
}

FormUncontrolledMode.storyName = 'Form (Uncontrolled Mode)'
