import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { BrowserRouter } from 'react-router-dom'
// import injectTapEventPlugin from 'react-tap-event-plugin'
// import 'normalize.css'
// import styles from './styles/index.css'
// import './styles/index.css'
import 'semantic-ui-css/semantic.min.css'
import 'react-redux-toastr/src/styles/index.scss'
// import history from 'history'
// import './styles/semantic.slate.css'
import App from './App'
import io from 'socket.io-client'
const socket = io()
// injectTapEventPlugin()
// Does the user's browser support the HTML5 history API?
// If the user's browser doesn't support the HTML5 history API then we
// will force full page refreshes on each page change.
const supportsHistory = 'pushState' in window.history

const initialState = window && window.__INITIAL_STATE__
  ? window.__INITIAL_STATE__
  : undefined

if (initialState) {
  delete window.__INITIAL_STATE__
}
const renderApp = Component => {
  render(
    <AppContainer>
      <BrowserRouter forceRefresh={!supportsHistory}>
        <Component initialState={initialState} socket={socket}/>
      </BrowserRouter>
    </AppContainer>
    ,
    document.getElementById('root'))
}

renderApp(App)

if (module.hot) {
  module.hot.accept('./App', () => {
    renderApp(require('./App').default)
  })
}
