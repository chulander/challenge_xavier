import * as types from './uiActionTypes'
import * as authActions from '../auth/authActions'


export function toggleModal (modalActive, modalType) {
  console.log('what is modalActive', modalActive)
  console.log('what is modalType', modalType)
  return dispatch => {
    Promise.resolve().then(() => {
      if (modalActive && (modalType === 'login' || modalType ==='signup')) {
        console.log('trying to dispatch auth CSRF')
        dispatch(authActions.getCsrfToken())
      }
    }).then(() => {
      dispatch(function () {
        return {
          type: types.TOGGLE_MODAL,
          modalActive,
          modalType
        }
      }())
    })

  }
}

export function toggleSidebar (sidebarActive) {
  return {
    type: types.TOGGLE_SIDEBAR,
    sidebarActive
  }
}