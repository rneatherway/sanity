import {
  HotkeyOptions,
  PortableTextEditable,
  RenderAnnotationFunction,
  RenderBlockFunction,
  RenderChildFunction,
  RenderDecoratorFunction,
  OnPasteFn,
  OnCopyFn,
  EditorSelection,
  RenderStyleFunction,
  RenderListItemFunction,
  RangeDecoration,
  PortableTextEditableProps,
} from '@sanity/portable-text-editor'
import {Path} from '@sanity/types'
import {omit} from 'lodash'
import {BoundaryElementProvider, useBoundaryElement, useGlobalKeyDown, useLayer} from '@sanity/ui'
import React, {useCallback, useMemo, useRef} from 'react'
import {PortableTextInputProps} from '../../types/inputProps'
import {Toolbar} from './toolbar'
import {Decorator} from './text'
import {
  EditableCard,
  EditableContainer,
  EditableWrapper,
  Root,
  Scroller,
  ToolbarCard,
} from './Editor.styles'
import {useSpellcheck} from './hooks/useSpellCheck'
import {useScrollSelectionIntoView} from './hooks/useScrollSelectionIntoView'
import {Style} from './text/Style'
import {ListItem} from './text/ListItem'

const noOutlineStyle = {outline: 'none'} as const

interface EditorProps {
  hideToolbar?: boolean
  hotkeys: HotkeyOptions
  initialSelection?: EditorSelection
  isActive: boolean
  isFullscreen: boolean
  onCopy?: OnCopyFn
  onItemOpen: (path: Path) => void
  onPaste?: OnPasteFn
  onToggleFullscreen: () => void
  path: Path
  readOnly?: boolean
  rangeDecorations?: RangeDecoration[]
  renderAnnotation: RenderAnnotationFunction
  renderBlock: RenderBlockFunction
  renderChild: RenderChildFunction
  renderEditable?: PortableTextInputProps['renderEditable']
  scrollElement: HTMLElement | null
  setPortalElement?: (portalElement: HTMLDivElement | null) => void
  setScrollElement: (scrollElement: HTMLElement | null) => void
  ariaDescribedBy: string | undefined
}

const renderDecorator: RenderDecoratorFunction = (props) => {
  return <Decorator {...props} />
}

const renderStyle: RenderStyleFunction = (props) => {
  return <Style {...props} />
}

const renderListItem: RenderListItemFunction = (props) => {
  return <ListItem {...props} />
}
/**
 * @internal
 */
export function Editor(props: EditorProps) {
  const {
    hideToolbar,
    hotkeys,
    initialSelection,
    isActive,
    isFullscreen,
    onCopy,
    onItemOpen,
    onPaste,
    onToggleFullscreen,
    path,
    readOnly,
    rangeDecorations,
    renderAnnotation,
    renderBlock,
    renderChild,
    renderEditable,
    scrollElement,
    setPortalElement,
    setScrollElement,
    ariaDescribedBy,
  } = props
  const {isTopLayer} = useLayer()
  const editableRef = useRef<HTMLDivElement | null>(null)

  const {element: boundaryElement} = useBoundaryElement()

  // Let escape close fullscreen mode
  useGlobalKeyDown(
    useCallback(
      (event: KeyboardEvent) => {
        if (!isTopLayer || !isFullscreen) {
          return
        }
        if (event.key === 'Escape') {
          onToggleFullscreen()
        }
      },
      [onToggleFullscreen, isFullscreen, isTopLayer],
    ),
  )

  const renderPlaceholder = useCallback(
    () => <span data-testid="pt-input-placeholder">Empty</span>,
    [],
  )
  const spellcheck = useSpellcheck()

  const scrollSelectionIntoView = useScrollSelectionIntoView(scrollElement)

  const editable = useMemo(() => {
    const editableProps: PortableTextEditableProps = {
      'aria-describedby': ariaDescribedBy,
      hotkeys,
      onCopy,
      onPaste,
      rangeDecorations,
      ref: editableRef,
      renderAnnotation,
      renderBlock,
      renderChild,
      renderDecorator,
      renderListItem,
      renderPlaceholder,
      renderStyle,
      scrollSelectionIntoView,
      selection: initialSelection,
      spellCheck: spellcheck,
      style: noOutlineStyle,
    }
    const defaultRender = (defaultRenderProps: PortableTextEditableProps) => (
      <PortableTextEditable {...editableProps} {...omit(defaultRenderProps, ['renderDefault'])} />
    )
    if (renderEditable) {
      return renderEditable({...editableProps, renderDefault: defaultRender})
    }
    return defaultRender(editableProps)
  }, [
    ariaDescribedBy,
    hotkeys,
    initialSelection,
    onCopy,
    onPaste,
    rangeDecorations,
    renderAnnotation,
    renderBlock,
    renderChild,
    renderEditable,
    renderPlaceholder,
    scrollSelectionIntoView,
    spellcheck,
  ])

  const handleToolBarOnMemberOpen = useCallback(
    (relativePath: Path) => {
      onItemOpen(path.concat(relativePath))
    },
    [onItemOpen, path],
  )

  return (
    <Root $fullscreen={isFullscreen} data-testid="pt-editor">
      {isActive && hideToolbar !== true && (
        <ToolbarCard data-testid="pt-editor__toolbar-card" shadow={1}>
          <Toolbar
            hotkeys={hotkeys}
            isFullscreen={isFullscreen}
            onMemberOpen={handleToolBarOnMemberOpen}
            onToggleFullscreen={onToggleFullscreen}
            readOnly={readOnly}
          />
        </ToolbarCard>
      )}

      <EditableCard flex={1} tone={readOnly ? 'transparent' : 'default'}>
        <Scroller ref={setScrollElement}>
          <EditableContainer padding={isFullscreen ? 2 : 0} sizing="border" width={1}>
            <EditableWrapper
              $isFullscreen={isFullscreen}
              tone={readOnly ? 'transparent' : 'default'}
            >
              <BoundaryElementProvider element={isFullscreen ? scrollElement : boundaryElement}>
                {editable}
              </BoundaryElementProvider>
            </EditableWrapper>
          </EditableContainer>
        </Scroller>

        <div data-portal="" ref={setPortalElement} />
      </EditableCard>
    </Root>
  )
}
