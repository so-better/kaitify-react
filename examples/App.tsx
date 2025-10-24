import { useState } from 'react'
import { Wrapper, Bubble, AlignCenterMenu, AlignLeftMenu, AlignRightMenu, AlignJustifyMenu, AttachmentMenu, BackColorMenu, BlockquoteMenu, BoldMenu, ClearFormatMenu, CodeMenu, CodeBlockMenu, CodeBlockLanguagesMenu, ColorMenu } from '../src'

function App() {
  const [value, setValue] = useState('三国演义是四大名著之一')
  const [bubbleVisible, setBubbleVisible] = useState(false)

  return (
    <>
      <div id='before'></div>
      <button onClick={() => setValue('hello')}>修改值</button>
      <button onClick={() => setBubbleVisible(!bubbleVisible)}>修改气泡栏显示状态</button>
      <Wrapper
        value={value}
        onChange={v => setValue(v)}
        style={{ height: 300 }}
        before={
          <>
            <AlignCenterMenu />
            <AlignJustifyMenu />
            <AlignLeftMenu />
            <AlignRightMenu />
            <AttachmentMenu popoverProps={{ arrow: true }} />
            <BackColorMenu />
            <BlockquoteMenu />
            <BoldMenu />
            <ClearFormatMenu />
            <CodeMenu />
            <CodeBlockMenu />
            <CodeBlockLanguagesMenu />
            <ColorMenu />
          </>
        }
        after={<div>after</div>}
        autofocus
        placeholder='请输入正文...'
        appendBeforeTo={'#before'}
      >
        {state => {
          return (
            <Bubble visible={bubbleVisible} match={{ tag: 'span' }} style={{ padding: 8 }}>
              这是bubble
            </Bubble>
          )
        }}
      </Wrapper>
    </>
  )
}

export default App
