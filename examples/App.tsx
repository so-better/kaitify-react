import { useEffect, useRef, useState } from 'react'
import { Wrapper, Bubble, Checkbox, Divider, Icon, Tabs } from '../src'
import { Button } from '../src/core/button'
import { Popover, PopoverRefType } from '../src/core/popover'
function App() {
  const [value, setValue] = useState('三国演义是四大名著之一')
  const [visible, setVisible] = useState(false)
  const [checked, setChecked] = useState(false)
  const popoverRef = useRef<PopoverRefType | null>(null)

  return (
    <>
      <div id='before'></div>
      <button onClick={() => setValue('hello')}>修改值</button>
      <Wrapper
        value={value}
        onChange={v => setValue(v)}
        style={{ height: 300 }}
        before={
          <div>
            <Popover ref={popoverRef} refer={<Button>按钮Popover</Button>} trigger='hover'>
              <div>我是浮层内容</div>
            </Popover>
            <Button
              onClick={() => {
                if (visible) {
                  setVisible(false)
                } else {
                  setVisible(true)
                }
              }}
            >
              显示bubble
            </Button>
            <Divider />
            <Icon name='si:user-fill' />
            <Checkbox label='全选' checked={checked} onChange={v => setChecked(v)} />
            <Tabs
              data={[
                { label: 'hello', value: 0 },
                { label: 'myname', value: 1 }
              ]}
              defaultValue={0}
            >
              {current => <span>{current}</span>}
            </Tabs>
          </div>
        }
        after={<div>after</div>}
        autofocus
        placeholder='请输入正文...'
        appendBeforeTo={'#before'}
      >
        {state => {
          return (
            <Bubble visible={visible} match={{ tag: 'span' }} style={{ padding: 8 }}>
              这是bubble
            </Bubble>
          )
        }}
      </Wrapper>
    </>
  )
}

export default App
