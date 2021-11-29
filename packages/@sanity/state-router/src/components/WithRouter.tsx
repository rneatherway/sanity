import type React from 'react'
import withRouterHOC from './withRouterHOC'
import type {HOCRouter} from './types'

type Props = {
  router: HOCRouter
  children: (router: HOCRouter) => React.ReactElement
}

const WithRouter = withRouterHOC((props: Props) => props.children(props.router))

export default WithRouter
