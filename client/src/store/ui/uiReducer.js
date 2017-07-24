import * as types from './uiActionTypes'

const initialState = {
  modalActive: false,
  sidebarActive: false,
  modalType: 'login',
  dimmer: 'blurring',
  isFetching: false,
  data:undefined
}
export default function ui (state = initialState, action) {
  // console.log('what is action.modalActive', action.modalActive)
  console.log('what is action.data', action.data)
  switch (action.type) {
    case types.TOGGLE_MODAL:
      return Object.assign({}, state, {
        modalActive: typeof action.modalActive === 'undefined'
          ? !state.modalActive
          : action.modalActive,
        modalType: action.modalType,
        data:action.data
      })
    case types.TOGGLE_SIDEBAR:
      return Object.assign({}, state, {
        sidebarActive: typeof action.sidebarActive === 'undefined'
          ? !state.sidebarActive
          : action.sidebarActive
      })
    case types.TOGGLE_ISFETCHING:
      return Object.assign({}, state, {
        isFetching: typeof action.isFetching === 'undefined'
          ? !state.isFetching
          : action.isFetching
      })
    default:
      return state

  }
}