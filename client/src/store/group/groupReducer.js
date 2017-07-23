import * as types from './groupActionTypes'

export default function groupActions (state = {}, action) {
  console.log('groupActions: what is action', action)
  switch (action.type) {
    case types.CREATE_GROUP_REQUEST:
      return Object.assign({}, state, {
        name: action.name,
        photo: action.photo,
        isFetching: true,
        success: undefined
      })
    case types.CREATE_GROUP_SUCCESS:
      return Object.assign({}, state, action.group, {
        isFetching: false,
        message: action.message,
        success: true
      })
    case types.CREATE_GROUP_FAILURE:
      return Object.assign({}, state, action.group, {
        isFetching: false,
        message: action.message,
        success: false
      })
    default:
      return state
  }
}
