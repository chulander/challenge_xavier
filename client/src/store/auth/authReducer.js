
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
    case types.LOGIN_REQUEST:
      return Object.assign({}, state, {
        isFetching: action.isFetching,
        user: action.creds
      })
    case types.LOGIN_SUCCESS:
      return Object.assign({}, state, {
        isFetching: action.isFetching,
        isAuthenticated: action.isAuthenticated,
        user: action.user,
        token:action.token,
        photo:action.photo
      })
    case types.LOGIN_FAILURE:
      return Object.assign({}, state, {
        isFetching: action.isFetching,
        isAuthenticated: action.isAuthenticated,
        loginError: action.loginError
      })
    case types.LOGOUT_SUCCESS:
      return Object.assign({}, state, {
        isFetching: action.isFetching,
        isAuthenticated: action.isAuthenticated
      })
    case types.CSRF_REQUEST:
      return Object.assign({}, state,{
        isFetching: action.isFetching,
      })
    case types.CSRF_SUCCESS:
      return Object.assign({}, state,{
        isFetching: action.isFetching,
        csrfToken: action.csrfToken
      })
    case types.CSRF_ERROR:
      return Object.assign({}, state,{
        isFetching: action.isFetching,
        csrfError: action.csrfError
      })
    case types.SIGNUP:
      return Object.assign({}, state, {
        isFetching: action.isFetching,
      })
    case types.SIGNUP_REQUEST:
      return Object.assign({},state,{
        isFetching:action.isFetching,
        isAuthenticated: action.isAuthenticated
      })
    case types.SIGNUP_SUCCESSS:
      return Object.assign({}, state,{
        isFetching: action.isFetching,
        isAuthenticated: action.isAuthenticated,
      })
    case types.JWT_ADD:
      return Object.assign({}, state,{
        jwtToken: action.jwtToken
      })
    case types.JWT_REMOVE:
      return Object.assign({}, state,{
        jwtToken: action.jwtToken
    })
    case types.JWT_GET:
      return Object.assign({}, state,{
        jwtToken:action.jwtToken
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
