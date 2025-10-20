
import { useState } from "react"
import { Wrapper } from "../src/editor/wrapper"
import { Bubble } from "../src/editor/bubble"
function App() {
  const [value, setValue] = useState('')
  return (

    <>
      <button onClick={() => setValue('hello')}>修改值</button>
      <Wrapper value={value} onChange={v => setValue(v)} style={{ height: 300 }} before={<div>before</div>} after={<div>after</div>} autofocus placeholder="请输入正文...">
        {({ editor, selection, disabled, isMouseDown }) => {
          return <Bubble visible match={{ tag: 'span' }}>这是bubble</Bubble>
        }}
      </Wrapper>
    </>
  )
}

export default App
