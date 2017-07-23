import * as types from './playerActionTypes'

export default function playerActions (state = {}, action) {
  console.log('playerActions: what is action', action)
  switch (action.type) {
    case types.CREATE_PLAYER_REQUEST:
      return Object.assign({}, state, {
        firstName: action.firstName,
        lastName: action.lastName,
        photo: action.photo,
        isFetching: true,
        success:undefined
      })
    case types.CREATE_PLAYER_SUCCESS:
      return Object.assign({}, state, action.player, {
        isFetching: false,
        message: action.message,
        success:true,
      })
    case types.CREATE_PLAYER_FAILURE:
      return Object.assign({}, state, action.player, {
        isFetching: false,
        message: action.message,
        success:false
      })
    default:
      return state
  }
}
