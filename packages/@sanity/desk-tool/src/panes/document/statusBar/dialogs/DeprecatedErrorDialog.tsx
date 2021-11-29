import type {DocumentActionErrorDialogProps} from '@sanity/base/_internal'
import {useToast} from '@sanity/ui'
import {useEffect} from 'react'

export function DeprecatedErrorDialog(props: {dialog: DocumentActionErrorDialogProps}) {
  const {dialog} = props
  const {content, onClose, title} = dialog
  const {push: pushToast} = useToast()

  useEffect(() => {
    pushToast({
      closable: true,
      status: 'error',
      title,
      description: content,
    })

    setTimeout(onClose, 0)
  }, [content, onClose, pushToast, title])

  useEffect(() => {
    console.warn(
      [
        'The "error" document action dialog is deprecated.',
        'Use `useToast()` from @sanity/ui instead:',
        '```',
        'import {useToast} from "@sanity/ui"',
        'function MyDocumentAction () {\n  const toast = useToast()\n  useEffect(() => toast.push(...))\n}',
        '```',
      ].join('\n\n')
    )
  }, [])

  return null
}
