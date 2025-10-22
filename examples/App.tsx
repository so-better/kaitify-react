import { useState } from 'react'
import { Wrapper } from '../src/editor/wrapper'
import { Bubble } from '../src/editor/bubble'
function App() {
  const [value, setValue] = useState('三国演义是四大名著之一')
  const [visible, setVisible] = useState(false)
  return (
    <>
      <div id='before'>
        <button
          onClick={() => {
            if (visible) {
              setVisible(false)
            } else {
              setVisible(true)
            }
          }}
        >
          显示bubble
        </button>
      </div>
      <button onClick={() => setValue('hello')}>修改值</button>
      <Wrapper value={value} onChange={v => setValue(v)} style={{ height: 300 }} before={<div>before</div>} after={<div>after</div>} autofocus placeholder='请输入正文...' appendBeforeTo={'#before'}>
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
