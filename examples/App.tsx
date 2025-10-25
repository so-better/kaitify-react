import { useState } from 'react'
import { Wrapper, Bubble, AlignCenterMenu, AlignLeftMenu, AlignRightMenu, AlignJustifyMenu, AttachmentMenu, BackColorMenu, BlockquoteMenu, BoldMenu, ClearFormatMenu, CodeMenu, CodeBlockMenu, CodeBlockLanguagesMenu, ColorMenu, DecreaseIndentMenu, EmojiMenu, FontFamilyMenu, FontSizeMenu, FullScreenMenu, HeadingMenu, HorizontalMenu, ImageMenu, IncreaseIndentMenu, ItalicMenu, LineHeightMenu, LinkMenu, LinkUnsetMenu, MathMenu, OrderedListMenu, RedoMenu, StrikethroughMenu, SubscriptMenu, SuperscriptMenu } from '../src'

function App() {
  const [value, setValue] = useState('<p style="background:#000;color:#fff;">三国演义是四大名著之一</p>')
  const [bubbleVisible, setBubbleVisible] = useState(false)

  return (
    <div id='wrap'>
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
            <IncreaseIndentMenu />
            <DecreaseIndentMenu />
            <EmojiMenu />
            <FontFamilyMenu />
            <FontSizeMenu />
            <FullScreenMenu target='#wrap' />
            <HeadingMenu />
            <HorizontalMenu />
            <ImageMenu />
            <ItalicMenu />
            <LineHeightMenu />
            <LinkMenu />
            <LinkUnsetMenu />
            <MathMenu />
            <OrderedListMenu />
            <RedoMenu />
            <StrikethroughMenu />
            <SubscriptMenu />
            <SuperscriptMenu />
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
    </div>
  )
}

export default App
