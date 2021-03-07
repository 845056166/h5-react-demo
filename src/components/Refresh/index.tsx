import React, { FC } from 'react'
import { Route, Redirect } from 'react-router'

export interface RefreshProps {
  path: string
}

const Refresh: FC<RefreshProps> = ({ path }) => {
  return (
    <Route
      path={path}
      render={({ location, match }) => (
        <Redirect
          to={{
            pathname: location.pathname.substring(match.path.length),
            search: location.search,
            state: location.state
          }}
        />
      )}
    />
  )
}

export default Refresh
