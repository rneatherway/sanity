import {uuid} from '@sanity/uuid'
import type {PaneNode, RouterPanes} from './types'
import type {LOADING_PANE} from './constants'
import {EMPTY_PARAMS} from './constants'

const state: {
  activePanes: Array<PaneNode | typeof LOADING_PANE>
} = {activePanes: []}

export function setActivePanes(panes: Array<PaneNode | typeof LOADING_PANE>): void {
  state.activePanes = panes
}

/**
 * This function looks at the _active panes_ to resolve an intent. this type of
 * intent resolution is faster and does not cause the panes to reset
 *
 * @internal
 */
export function getIntentState(
  intentName: string,
  params: Record<string, string>,
  currentState: {panes?: RouterPanes} | undefined,
  payload: unknown
): {panes: RouterPanes} | {intent: string; params: Record<string, string>; payload: unknown} {
  const panes = currentState?.panes || []
  const activePanes = state.activePanes || []
  const editDocumentId = params.id || uuid()
  const isTemplate = intentName === 'create' && params.template

  // Loop through open panes and see if any of them can handle the intent
  for (let i = activePanes.length - 1; i >= 0; i--) {
    const pane = activePanes[i]

    if (typeof pane !== 'object') continue

    // NOTE: if you update this logic, please also update the similar handler in
    // `resolveIntent.ts`
    if (
      pane.canHandleIntent?.(intentName, params, {
        pane,
        index: i,
      }) ||
      // see `resolveIntent.ts` for more info
      (pane.type === 'documentList' &&
        pane.schemaTypeName === params.type &&
        pane.options.filter === '_type == $type')
    ) {
      const paneParams = isTemplate ? {template: params.template} : EMPTY_PARAMS

      return {
        panes: panes
          .slice(0, i)
          .concat([[{id: editDocumentId, params: paneParams, payload}]]) as RouterPanes,
      }
    }
  }

  return {intent: intentName, params, payload}
}
