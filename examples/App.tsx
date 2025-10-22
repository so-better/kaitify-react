import { useState } from 'react'
import { Wrapper, Bubble, Menu } from '../src'
function App() {
  const [value, setValue] = useState('三国演义是四大名著之一')

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
            <Menu>hello</Menu>
          </div>
        }
        after={<div>after</div>}
        autofocus
        placeholder='请输入正文...'
        appendBeforeTo={'#before'}
      >
        {state => {
          return (
            <Bubble visible match={{ tag: 'span' }} style={{ padding: 8 }}>
              这是bubble
            </Bubble>
          )
        }}
      </Wrapper>
    </>
  )
}

export default App
