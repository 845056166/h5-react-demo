import React, { FC, lazy, Suspense } from 'react'
import {
  Switch,
  Route,
  RouteComponentProps,
  withRouter
} from 'react-router-dom'
import Refresh from '@/components/Refresh'

const Routes: FC<RouteComponentProps> = ({ location }) => (
  <Suspense fallback={null}>
    <Switch location={location}>
      {process.env.NODE_ENV !== 'production' && (
        <Route component={lazy(async () => import('./Demo'))} path="/demo" />
      )}
      <Refresh path="/refresh" />
      <Route component={lazy(async () => import('./404'))} />
    </Switch>
  </Suspense>
)

export default withRouter(Routes)
