import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from './reducers'
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant'
import { createLogger } from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension'
import { routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk'

const logger = createLogger({
  level: 'info',
  collapsed: false,
  logger: console,
  predicate: (getState, action) => true
})

const devMiddlewares = [reduxImmutableStateInvariant(), logger]

export default function configureStore (history, initialState) {
  const middlewares = [rootReducer]
  if (initialState) {
    middlewares.push(initialState)
  }

  if (process.env.NODE_ENV !== 'production') {
    if (history) {
      devMiddlewares.unshift(routerMiddleware(history))
    }
    middlewares.push(
      composeWithDevTools(applyMiddleware(...devMiddlewares, thunk)))
  } else {
    middlewares.push(compose(applyMiddleware(thunk)))
  }

  const store = createStore(...middlewares)

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      // const nextRootReducer = require('./reducers').default
      store.replaceReducer(rootReducer)
    })
  }

  // console.log('what is store inside configureStore ', store);
  return store
}
