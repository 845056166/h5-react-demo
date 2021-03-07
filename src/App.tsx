import React, { FC } from 'react';
import { Router } from 'react-router-dom'
import history from './utils/history'
import Routes from './routes'


const App: FC<{}> = function() {
  return (
    <Router history={history}>
      <Routes />
    </Router>
  )  
}

export default App