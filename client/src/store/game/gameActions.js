/* global fetch:false */
import * as types from './gameActionTypes'

const createAuthorizationHeader = () => ({
  headers: `JWT ${localStorage.getItem('item')}`,
  'Content-Type': 'application/json'
})

export function getGroups () {
  const authHeaders = createAuthorizationHeader()
  return dispatch => {
    return fetch('/api/group', {
      method: 'GET',
      authHeaders
    })
    .then(response=>response.json())
    .then(data=>{

    })
  }
}

