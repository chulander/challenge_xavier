
import * as types from './authActionTypes'

// The auth reducer. The starting state sets authentication
// based on a token being in local storage. In a real app,
// we would also want a util to check if the token is expired.
const initialState = {
  isFetching: false,
  isAuthenticated: false,
  // isAuthenticated: localStorage.getItem('id_token') ? true : false
}
export default function auth (state = initialState, action) {
  // console.log('what is action inside reducer', action)
  switch (action.type) {
    case types.SIGNUP_REQUEST:
      return Object.assign({},state,{
        isAuthenticated: action.isAuthenticated
      })
    case types.LOGIN_REQUEST:
      return Object.assign({}, state, {
        isAuthenticated: action.isAuthenticated,
      })
    case types.LOGOUT_REQUEST:
      return Object.assign({}, state, {
        isAuthenticated: action.isAuthenticated,
      })
    case types.LOGIN_TOKEN_REQUEST:
      return Object.assign({}, state, {
        isAuthenticated: action.isAuthenticated,
      })
    case types.CSRF_REQUEST:
      return Object.assign({}, state,{
        isFetching: action.isFetching,
      })
    case types.SIGNUP_SUCCESSS:
      return Object.assign({}, state,{
        isAuthenticated: action.isAuthenticated,
      })
    case types.LOGIN_SUCCESS:
      return Object.assign({}, state, {
        isAuthenticated: action.isAuthenticated,
        user: action.user,
        token:action.token,
      })
    case types.LOGOUT_SUCCESS:
      return Object.assign({}, state, {
        isAuthenticated: action.isAuthenticated,
        user: action.user,
        token: action.token,
      })
    case types.LOGIN_TOKEN_SUCCESS:
      return Object.assign({}, state, {
        isAuthenticated: action.isAuthenticated,
        user: action.user,
        token: action.token,
      })
    case types.CSRF_SUCCESS:
      return Object.assign({}, state,{
        csrfToken: action.csrfToken
      })

    case types.SIGNUP_FAILURE:
      return Object.assign({},state,{
        isAuthenticated: action.isAuthenticated,
        signupFailure: action.message
      })
    case types.LOGIN_FAILURE:
      return Object.assign({}, state, {
        isAuthenticated: action.isAuthenticated,
        loginFailure: action.message
      })
    case types.LOGIN_TOKEN_FAILURE:
      return Object.assign({}, state, {
        isAuthenticated: action.isAuthenticated,
        loginTokenFailure: action.message
      })
    case types.CSRF_FAILURE:
      return Object.assign({}, state,{
        csrfFailure: action.messagee
      })


    case types.JWT_ADD:
      return Object.assign({}, state,{
        token: action.token
      })
    case types.JWT_REMOVE:
      return Object.assign({}, state,{
        token: action.token
    })
    case types.JWT_GET:
      return Object.assign({}, state,{
        token:action.token
      })
    default:
      return state
  }
}

// // The quotes reducer
// function quotes(state = {}, action) {
//   switch (action.type) {
//
//     default:
//       return state
//   }
// }
