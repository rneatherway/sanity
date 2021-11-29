import {createContext} from 'react'
import type {PaneRouterContextValue} from './types'

function missingContext<T = unknown>(): T {
  throw new Error('Pane is missing router context')
}

/**
 * @public
 */
export const PaneRouterContext = createContext<PaneRouterContextValue>({
  index: 0,
  groupIndex: 0,
  siblingIndex: 0,
  payload: undefined,
  params: {},
  hasGroupSiblings: false,
  groupLength: 0,
  routerPanesState: [],
  ChildLink: () => missingContext(),
  ParameterizedLink: () => missingContext(),
  replaceCurrent: () => missingContext(),
  closeCurrent: () => missingContext(),
  duplicateCurrent: () => missingContext(),
  setView: () => missingContext(),
  setParams: () => missingContext(),
  setPayload: () => missingContext(),
  navigateIntent: () => missingContext(),
})
