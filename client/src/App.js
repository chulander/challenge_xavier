import React from 'react'

import AppContainer from './components/app/AppContainer'
import configureStore from './store/configureStore'
import { Provider } from 'react-redux'

// const store = configureStore()
const App = ({history, initialState, socket}) => {
  return (
    <Provider store={configureStore(history, initialState)}>
      <AppContainer socket={socket}/>
    </Provider>
  )
}

export default App
