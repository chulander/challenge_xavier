import { combineReducers } from 'redux'
import auth from './auth/authReducer'
import player from './player/playerReducer'
import group from './group/groupReducer'
import ui from './ui/uiReducer'
import { routerReducer } from 'react-router-redux'
import { reducer as toastr } from 'react-redux-toastr'
const rootReducer = combineReducers({
  auth,
  player,
  group,
  ui,
  toastr,
  router: routerReducer
})

export default rootReducer
