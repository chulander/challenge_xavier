/* global fetch:false */

import * as types from './groupActionTypes'
import * as uiActions from '../ui/uiActions'
import { actions as toastrActions } from 'react-redux-toastr'
export function addGroup (name,photo) {
  return dispatch => {
    dispatch(createGroupRequest(name, photo))

    return fetch('/api/group', {
      method: 'POST',
      headers: {
        Authorization: `JWT ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        photo,
      })
    }).then(response => {
      return (response.status === 401)
        ? Promise.reject({message: response.statusText})
        : response.json()
    }).then(data => {
      console.log('submitGroupData', data)
      if (data.success) {
        dispatch(createGroupSuccess(data.group, data.message))
        dispatch(uiActions.toggleModal(false, 'createGroup'))
        dispatch(toastrActions.add({
          id: 'createGroupSuccess', // If not provided we will add one.
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
        console.log('submitGroupData else case')
        return Promise.reject(data)
      }
    }).catch(err => {
      console.error('submitGroupData error', err)
      dispatch(createGroupFailure({name}, err.message))
      dispatch(
        toastrActions.add({
          id: 'createGroupError', // If not provided we will add one.
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

export function createGroupRequest (name, photo) {
  return {
    type: types.CREATE_GROUP_REQUEST,
    name,
    photo
  }
}

export function createGroupSuccess (group, message) {
  return {
    type: types.CREATE_GROUP_SUCCESS,
    group,
    message
  }
}
export function createGroupFailure (group, message) {
  return {
    type: types.CREATE_GROUP_FAILURE,
    group,
    message
  }
}
