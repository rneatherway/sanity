import {useContext} from 'react'
import type {ZIndexContextValue} from './types'
import {ZIndexContext} from './ZIndexContext'

/**
 * @todo: Rename to `useZOffsets`
 *
 * @internal
 */
export function useZIndex(): ZIndexContextValue {
  return useContext(ZIndexContext)
}
