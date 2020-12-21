import React, { useState } from 'react';
import { Button, Dialog, Select, SelectOption, TextField, Drawer, Popover } from '../../src';

export const ComponentsCombination = () => {
  const [dialog1Open, setDialog1Open] = useState(false)
  const [dialog2Open, setDialog2Open] = useState(false)

  const [popoverActive, setPopoverActive] = useState(false)
  const [drawerActive, setDrawerActive] = useState(false)

  const [text, setText] = useState('')

  const [selected, setSelected] = useState('cat')
  const options: SelectOption[] = [
    { key: 'cat', label: 'Cat', value: 'cat' },
    { key: 'dog', label: 'Dog', value: 'dog' },
    { key: 'parrot', label: 'Parrot', value: 'parrot' },
  ]

  return (
    <div className="w-full" style={{ height: 600 }}>
      <Button
        onClick={(() => { setDialog1Open(true) })}
      >点击打开 Dialog1</Button>
      <Button
        onClick={(() => { setDrawerActive(true) })}
      >点击打开 Drawer1</Button>
      <Dialog
        open={dialog1Open}
        onClose={(() => { setDialog1Open(false) })}
        onClickAway={(() => { setDialog1Open(false) })}
        customize={{
          Content: {
            extendClassName: 'dialog1'
          }
        }}
      >
        <div
          style={{
            width: 600,
            height: 200,
          }}
        >
          <div>Dialog1</div>
          <Button
            onClick={(() => { setDialog2Open(true) })}
          >点击打开 Dialog2</Button>
          <TextField
            value={text}
            onChange={(value) => { setText(value) }}
          ></TextField>
          <Select
            options={options}
            value={selected}
            onChange={(value) => { setSelected(value) }}
            multiple={false}
          />
        </div>
      </Dialog>
      <Dialog
        open={dialog2Open}
        onClose={(() => { setDialog2Open(false) })}
        onClickAway={(() => { setDialog2Open(false) })}
        customize={{
          Content: {
            extendClassName: 'dialog2'
          }
        }}
      >
        <div
          style={{
            width: 400,
            height: 150,
          }}
        >
          <div>Dialog2</div>
          <Popover
            active={popoverActive}
            activator={(
              <Button style={{ width: 112, fontSize: 15, height: 40 }} onClick={() => { setPopoverActive(!popoverActive) }}>Activator</Button>
            )}
            onClickAway={() => { setPopoverActive(false) }}
          >
            <div className="m-4 w-48 h-24">
              <p>Popover content header</p>
              <p>Popover test content</p>
            </div>
          </Popover>
        </div>
      </Dialog>
      <Drawer
        active={drawerActive}
        onClose={(() => { setDrawerActive(false) })}
        onClickAway={(() => { setDrawerActive(false) })}
      >
        <div>Drawer1</div>
        <Button
          onClick={(() => { setDialog2Open(true) })}
        >点击打开 Dialog2</Button>
        <TextField
          value={text}
          onChange={(value) => { setText(value) }}
        ></TextField>
        <Select
          options={options}
          value={selected}
          onChange={(value) => { setSelected(value) }}
          multiple={false}
        />
      </Drawer>

      <ul>
        <li>TextField 在 Dialog 内能正常输入</li>
        <li>打开多个支持onClickAway的组件，onClickAway 不会同时触发</li>
      </ul>
    </div>
  )
}

ComponentsCombination.storyName = 'Components Combination'
