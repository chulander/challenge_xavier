
import * as types from './blogActionTypes'


export default function blog (state = {}, action) {
  // console.log('what is action inside reducer', action)
  switch (action.type) {
    case types.CREATE_BLOG_REQUEST:
      return Object.assign({}, state, {
        data: action.data
      })
    case types.CREATE_BLOG_SUCCESS:
      return Object.assign({}, state, {
        message: action.message
      })
    case types.CREATE_BLOG_FAILURE:
      return Object.assign({}, state, {
        error: action.error
      })
    case types.DELETE_BLOG_REQUEST:
      return Object.assign({}, state, {
        data: action.data
      })
    case types.DELETE_BLOG_SUCCESS:
      return Object.assign({}, state, {
        message: action.message
      })
    case types.DELETE_BLOG_FAILURE:
      return Object.assign({}, state, {
        error: action.error
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
