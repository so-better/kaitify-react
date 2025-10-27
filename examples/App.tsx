import { useMemo, useState } from 'react'
import { Wrapper as EditorWrapper, BoldMenu, AlignLeftMenu, AlignCenterMenu, AlignRightMenu, AlignJustifyMenu, AttachmentMenu, BackColorMenu, BlockquoteMenu, CodeMenu, CodeBlockMenu, ColorMenu, FontFamilyMenu, FontSizeMenu, HeadingMenu, RedoMenu, UndoMenu, HorizontalMenu, ImageMenu, IncreaseIndentMenu, DecreaseIndentMenu, ItalicMenu, LineHeightMenu, LinkMenu, OrderedListMenu, UnorderedListMenu, MathMenu, StrikethroughMenu, SubscriptMenu, SuperscriptMenu, TableMenu, UnderlineMenu, VideoMenu, TaskMenu, ClearFormatMenu, Divider, FullScreenMenu, EmojiMenu, Editor, StateType, KNodeMatchOptionType, Bubble, VideoControlsMenu, VideoMutedMenu, VideoLoopMenu, WrapUpMenu, CodeBlockLanguagesMenu, WrapDownMenu, LinkUnsetMenu, TableAddRowMenu, TableDeleteRowMenu, TableAddColumnMenu, TableDeleteColumnMenu, TableMergeCellMenu, TableUnsetMenu } from '../src/index'
import './style.less'

export default function App() {
  const [content, setContent] = useState(
    '<p kaitify-node="91"><span kaitify-node="92" style="font-weight: bold; font-size: 18px;">Publications</span></p ><p kaitify-node="93" style="line-height: 2.5;"><span kaitify-node="94" style="font-size: 14px; font-weight: bold;">Lastest metaRLK article</span><span kaitify-node="95"> </span></p ><p kaitify-node="96" style="line-height: 2;"><span kaitify-node="98">Curation,&nbsp;nomenclature,&nbsp;and&nbsp;topological&nbsp;classification&nbsp;of&nbsp;receptor&nbsp;like&nbsp;kinases&nbsp;from&nbsp;528&nbsp;plant&nbsp;species&nbsp;for&nbsp;novel&nbsp;domain&nbsp;discovery&nbsp;and&nbsp;functional&nbsp;inference[J].&nbsp;Molecular&nbsp;Plant,&nbsp;2024,&nbsp;17(4):&nbsp;658-671.&nbsp;&nbsp; </span></p><p kaitify-node="91"><span kaitify-node="92" style="font-weight: bold; font-size: 18px;">Publications</span></p ><p kaitify-node="93" style="line-height: 2.5;"><span kaitify-node="94" style="font-size: 14px; font-weight: bold;">Lastest metaRLK article</span><span kaitify-node="95"> </span></p ><p kaitify-node="96" style="line-height: 2;"><span kaitify-node="98">Curation, nomenclature, and topological classification of receptor like kinases from 528 plant species for novel domain discovery and functional inference[J]. Molecular Plant, 2024, 17(4): 658-671. </span></p>'
  )
  const [show, setShow] = useState(true)
  const [dark, setDark] = useState(false)
  const [disabled] = useState(false)
  const [state, setState] = useState<StateType | undefined>(undefined)

  const shouldBubble = useMemo<{ visible: boolean; match?: KNodeMatchOptionType; type?: number }>(() => {
    if (!!state?.editor.value?.commands.getVideo?.()) {
      return { visible: true, match: { tag: 'video' }, type: 0 }
    }
    if (!!state?.editor.value?.commands.getCodeBlock?.()) {
      return { visible: true, match: { tag: 'pre' }, type: 1 }
    }
    if (!!state?.editor.value?.getFocusNodesBySelection('text').length) {
      return { visible: true, match: undefined, type: 2 }
    }
    if (!!state?.editor.value?.commands.getLink?.()) {
      return { visible: true, match: { tag: 'a' }, type: 3 }
    }
    if (!!state?.editor.value?.commands.getTable?.()) {
      return { visible: true, match: { tag: 'table' }, type: 4 }
    }
    return { visible: false }
  }, [state?.editor])

  const onCreated = async (editor: Editor) => {
    console.log(editor.selection)
  }

  return (
    <>
      <div style={{ padding: 10 }}>
        <div style={{ padding: 5 }}>
          <button onClick={() => setDark(!dark)}>深色/浅色主题</button>
          <button onClick={() => setShow(!show)}>显示/隐藏编辑器</button>
        </div>
        <div id='before' style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', flexWrap: 'wrap', height: 100, background: dark ? '#1b1b1f' : '#fff' }}></div>
        <div id='area'>
          {show && (
            <EditorWrapper
              autofocus
              ref={v => setState(v?.state)}
              locale='zh-CN'
              disabled={disabled}
              dark={dark}
              style={{ width: '100%', height: 500 }}
              allow-paste-html
              placeholder='输入正文内容...'
              value={content}
              onChange={setContent}
              onCreated={onCreated}
              appendBeforeTo={'#before'}
              before={
                <>
                  <UndoMenu />
                  <RedoMenu />
                  <Divider />
                  <EmojiMenu />
                  <DecreaseIndentMenu />
                  <IncreaseIndentMenu />
                  <Divider />
                  <ClearFormatMenu />
                  <BoldMenu />
                  <ItalicMenu />
                  <StrikethroughMenu />
                  <SubscriptMenu />
                  <SuperscriptMenu />
                  <UnderlineMenu />
                  <CodeMenu />
                  <Divider />
                  <ColorMenu />
                  <BackColorMenu />
                  <FontFamilyMenu />
                  <FontSizeMenu />
                  <Divider />
                  <HeadingMenu popoverProps={{ trigger: 'hover' }} shortcut={{ 1: (e: KeyboardEvent) => e.key == '1' && e.metaKey }} />
                  <LineHeightMenu />
                  <OrderedListMenu />
                  <UnorderedListMenu />
                  <TaskMenu />
                  <Divider />
                  <AlignLeftMenu />
                  <AlignCenterMenu shortcut={e => e.key == 'b' && e.metaKey} />
                  <AlignRightMenu />
                  <AlignJustifyMenu />
                  <Divider />
                  <BlockquoteMenu />
                  <CodeBlockMenu />
                  <HorizontalMenu />
                  <LinkMenu />
                  <AttachmentMenu popoverProps={{ zIndex: 100, arrow: true }} />
                  <ImageMenu tabs={{ data: ['remote', 'upload'], default: 'upload' }} />
                  <VideoMenu tabs={{ data: ['remote', 'upload'], default: 'upload' }} popoverProps={{ zIndex: 100, arrow: true }} />
                  <MathMenu />
                  <TableMenu />
                  <FullScreenMenu target='#area' />
                </>
              }
              after={<>总字数：{state?.editor.value?.getContent().length ?? 0}</>}
            >
              <Bubble visible={shouldBubble.visible} match={shouldBubble.match} style={{ padding: 5 }}>
                {shouldBubble.type === 0 && (
                  <>
                    <VideoControlsMenu />
                    <VideoMutedMenu />
                    <VideoLoopMenu />
                  </>
                )}
                {shouldBubble.type === 1 && (
                  <>
                    <WrapUpMenu match={{ tag: 'pre' }} />
                    <Divider />
                    <CodeBlockLanguagesMenu />
                    <Divider />
                    <WrapDownMenu match={{ tag: 'pre' }} />
                  </>
                )}
                {shouldBubble.type === 2 && (
                  <>
                    <ClearFormatMenu />
                    <EmojiMenu />
                    <BoldMenu />
                    <ItalicMenu />
                    <StrikethroughMenu />
                    <SubscriptMenu />
                    <SuperscriptMenu />
                    <UnderlineMenu />
                    <Divider />
                    <ColorMenu />
                    <BackColorMenu />
                    <CodeMenu />
                    <FontFamilyMenu />
                    <FontSizeMenu />
                  </>
                )}
                {shouldBubble.type === 3 && <LinkUnsetMenu />}
                {shouldBubble.type === 4 && (
                  <>
                    <WrapUpMenu match={{ tag: 'table' }} />
                    <Divider />
                    <TableAddRowMenu type='top' />
                    <TableAddRowMenu type='bottom' />
                    <TableDeleteRowMenu />
                    <TableAddColumnMenu type='left' />
                    <TableAddColumnMenu type='right' />
                    <TableDeleteColumnMenu />
                    <Divider />
                    <TableMergeCellMenu direction='left' />
                    <TableMergeCellMenu direction='right' />
                    <TableMergeCellMenu direction='top' />
                    <TableMergeCellMenu direction='bottom' />
                    <Divider />
                    <TableUnsetMenu />
                    <Divider />
                    <WrapDownMenu match={{ tag: 'table' }} />
                  </>
                )}
              </Bubble>
            </EditorWrapper>
          )}
        </div>
      </div>
    </>
  )
}
