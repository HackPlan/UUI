import React, { useState } from 'react';
import { TextField, TextArea, RadioGroup, Radio, Checkbox, DatePicker, Button, HTMLSelect } from '../../src';

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

const Control = (props: any) => {
  return (
    <div {...props} style={{ width: 300 }}>
      {props.children}
    </div>
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
      <LabeledControl>
        <Label>名字</Label>
        <Control>
          <TextField value={name} onChange={(value) => setName(value)} />
        </Control>
      </LabeledControl>
      <LabeledControl>
        <Label>介绍</Label>
        <Control>
          <TextArea value={introduction} onChange={(value) => setIntroduction(value)} />
        </Control>
      </LabeledControl>
      <LabeledControl>
        <Label>性别</Label>
        <Control className="flex items-center">
          <RadioGroup name="gender" value={gender} onChange={(value) => { setGender(value) }}>
            <Radio label={'男'} value={'male'} className={"mr-2"}></Radio>
            <Radio label={'女'} value={'female'} className={"mr-2"}></Radio>
            <Radio label={'其他'} value={'other'} className={"mr-2"}></Radio>
          </RadioGroup>
        </Control>
      </LabeledControl>
      <LabeledControl>
        <Label>生日</Label>
        <Control>
          <DatePicker value={birthday} onChange={(value) => setBirthday(value)} />
        </Control>
      </LabeledControl>
      <LabeledControl>
        <Label>学校</Label>
        <Control>
          <HTMLSelect
            options={[
              { label: 'Peking University', value: 'Peking University' },
              { label: 'Chongqing University', value: 'Chongqing University' },
            ]}
            value={school}
            onChange={(value) => setSchool(value)}
          />
        </Control>
      </LabeledControl>
      <LabeledControl>
        <Label>技能</Label>
        <Control className="flex flex-col">
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
        </Control>
      </LabeledControl>
      <LabeledControl>
        <Label></Label>
        <Control>
          <Button>提交</Button>
        </Control>
      </LabeledControl>
    </div>
  )
}

FormControlledMode.storyName = 'Form (Controlled Mode)'


export const FormUncontrolledMode = () => {
  return (
    <form action={'/testdemo'} method="post">
      <LabeledControl>
        <Label>名字</Label>
        <Control>
          <TextField name="name" />
        </Control>
      </LabeledControl>
      <LabeledControl>
        <Label>介绍</Label>
        <Control>
          <TextArea name="introduction" />
        </Control>
      </LabeledControl>
      <LabeledControl>
        <Label>性别</Label>
        <Control className="flex items-center">
          <Radio name={'gender'} label={'男'} value={'male'} className={"mr-2"}></Radio>
          <Radio name={'gender'} label={'女'} value={'female'} className={"mr-2"}></Radio>
          <Radio name={'gender'} label={'其他'} value={'other'} className={"mr-2"}></Radio>
        </Control>
      </LabeledControl>
      {/* TODO: HTMLDatePicker support uncontrolled mode */}
      {/* <LabeledControl>
        <Label>生日</Label>
        <Control>
          <DatePicker name={'birthday'} />
        </Control>
      </LabeledControl> */}
      <LabeledControl>
        <Label>学校</Label>
        <Control>
          <HTMLSelect
            name={'school'}
            options={[
              { label: 'Peking University', value: 'Peking University' },
              { label: 'Chongqing University', value: 'Chongqing University' },
            ]}
          />
        </Control>
      </LabeledControl>
      <LabeledControl>
        <Label>技能</Label>
        <Control className="flex flex-col">
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
        </Control>
      </LabeledControl>
      <LabeledControl>
        <Label></Label>
        <Control>
          <Button type="submit">提交</Button>
        </Control>
      </LabeledControl>
    </form>
  )
}

FormUncontrolledMode.storyName = 'Form (Uncontrolled Mode)'
