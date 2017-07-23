/* global fetch:false */

import * as types from './playerActionTypes'
import * as uiActions from '../ui/uiActions'
import { actions as toastrActions } from 'react-redux-toastr'
export function addPlayer (firstName, lastName,photo) {
  return dispatch => {
    dispatch(createPlayerRequest(firstName, lastName,photo))

    return fetch('/api/player', {
      method: 'POST',
      headers: {
        Authorization: `JWT ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        firstName,
        lastName,
        photo,
      })
    }).then(response => {
      return (response.status === 401)
        ? Promise.reject({message: response.statusText})
        : response.json()
    }).then(data => {
      console.log('submitPlayerData', data)
      if (data.success) {
        dispatch(createPlayerSuccess(data.player, data.message))
        dispatch(uiActions.toggleModal(false, 'createPlayer'))
        dispatch(toastrActions.add({
          id: 'createPlayerSuccess', // If not provided we will add one.
          type: 'success',
          title: 'Success',
          position: 'top-right', // This will override the global props position.
          attention: true, // This will add a shadow like the confirm method.
          message: data.message,
          options: {
            timeOut: 2000
          }
        }))
      }
      else {
        console.log('submitPlayerData else case')
        return Promise.reject(data)
      }
    }).catch(err => {
      console.error('submitPlayerData error', err)
      dispatch(createPlayerFailure({firstName, lastName}, err.message))
      dispatch(
        toastrActions.add({
          id: 'createPlayerError', // If not provided we will add one.
          type: 'warning',
          title: 'Error',
          position: 'top-right', // This will override the global props position.
          attention: true, // This will add a shadow like the confirm method.
          message: err.message,
          options: {
            timeOut: 2000
          }
        })
      )
      return Promise.reject(err.message)
    })
  }
}

export function createPlayerRequest (firstName, lastName,photo) {
  return {
    type: types.CREATE_PLAYER_REQUEST,
    firstName,
    lastName,
    photo
  }
}

export function createPlayerSuccess (player, message) {
  return {
    type: types.CREATE_PLAYER_SUCCESS,
    player,
    message
  }
}
export function createPlayerFailure (player, message) {
  return {
    type: types.CREATE_PLAYER_FAILURE,
    player,
    message
  }
}
