import * as types from './uiActionTypes'
const initialState = {
  modalActive: false,
  sidebarActive: false,
  modalType:'login',
  dimmer:'blurring'
}
export default function ui (state = initialState, action) {
  console.log('what is action.modalActive', action.modalActive)
  switch (action.type) {
    case types.TOGGLE_MODAL:
      return Object.assign({}, state, {
        modalActive: typeof action.modalActive === 'undefined'
          ? !state.modalActive
          : action.modalActive,
        modalType: action.modalType
      })
    case types.TOGGLE_SIDEBAR:
      return Object.assign({}, state, {
        sidebarActive: typeof action.sidebarActive === 'undefined'
          ? !state.sidebarActive
          : action.sidebarActive
      })
    default:
      return state

  }
}