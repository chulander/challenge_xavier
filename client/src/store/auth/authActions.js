/*
global fetch:false
global localStorage:false
*/

import * as types from './authActionTypes'
import * as uiActions from '../ui/uiActions'

function signUpRequest () {
  return {
    type: types.SIGNUP_REQUEST,
    isAuthenticated: false
  }
}

function loginRequest () {
  return {
    type: types.LOGIN_REQUEST,
    isAuthenticated: false,
  }
}

function logoutRequest () {
  return {
    type: types.LOGOUT_REQUEST,
    isAuthenticated: true
  }
}

function loginTokenRequest(token){
  return {
    type: types.LOGIN_TOKEN_REQUEST,
    token
  }
}

function csrfRequest () {
  return {
    type: types.CSRF_REQUEST,
  }
}



function signupSuccess () {
  return {
    type: types.SIGNUP_SUCCESSS,
    isAuthenticated: true
  }
}

function loginSuccess (data) {
  console.log('what is data:loginSuccess', data)
  return {
    type: types.LOGIN_SUCCESS,
    isAuthenticated: true,
    user: data.firstName,
    token: data.token
  }
}

function logoutSuccess () {
  return {
    type: types.LOGOUT_SUCCESS,
    isAuthenticated: false,
    user: undefined,
    token: undefined
  }
}


function loginTokenSuccess (data) {
  console.log('what is data:loginSuccess', data)
  return {
    type: types.LOGIN_TOKEN_SUCCESS,
    isAuthenticated: true,
    user: data.firstName,
    token: data.token
  }
}

function csrfSuccess (token) {
  return {
    type: types.CSRF_SUCCESS,
    token
  }
}


function signupFailure (message) {
  return {
    type: types.SIGNUP_FAILURE,
    isAuthenticated: false,
    signupFailure: message
  }
}

function loginFailure (message) {
  return {
    type: types.LOGIN_FAILURE,
    isAuthenticated: false,
    message
  }
}

function loginTokenFailure (message) {
  return {
    type: types.LOGIN_TOKEN_FAILURE,
    isAuthenticated: false,
    message
  }
}

function csrfError (message) {
  return {
    type: types.CSRF_SUCCESS,
    isFetching: false,
    message
  }
}



// Logs the user out
export function logoutUser () {
  console.log('attempting to log out')
  return dispatch => {
    dispatch(logoutRequest())
    dispatch(removeJWT())
    dispatch(logoutSuccess())
  }
}


export function signup (credentials, csrfToken) {
  console.log('inside signup: what is credentials', credentials)
  console.log('inside signup: what is csrfToken', csrfToken)

  const config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'csrf-token': csrfToken
    },
    body: JSON.stringify(credentials)
  }
  return dispatch => {
    dispatch(signUpRequest())
    dispatch(uiActions.toggleIsFetching(true))

    fetch('/api/auth/signup', config).then(res => {
      console.log('what is signup res', res)
      return res.json()
    }).then(data => {
      console.log('what is sign json data', data)
      dispatch(signupSuccess())
      dispatch(uiActions.toggleIsFetching(false))
      dispatch(uiActions.toggleModal(false,'signup'))
      dispatch(addJWT(data.token))
    }).catch(err => {
      console.log('what is signup catch err', err)
      dispatch(signupFailure(data.err))
      dispatch(uiActions.toggleIsFetching(false))
    })
  }
}


// Calls the API to get a token and
// dispatches actions along the way

export function loginUser (credentials, csrfToken) {
  let config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'csrf-token': csrfToken
    },
    body: JSON.stringify(credentials)
  }

  return dispatch => {
    // We dispatch loginRequest to kickoff the call to the API
    dispatch(loginRequest(credentials))
    dispatch(uiActions.toggleIsFetching(true))

    return fetch('/api/auth/login', config).then(res => {
      // return response.json().then(user => ({user, response}))
      console.log('what is res', res)
      return res.json().then(data => ({data, res}))
    }).then(({data, res}) => {
      console.log('what is response', res)
      console.log('what is data', data)
      if (!res.ok) {
        // If there was a problem, we want to
        // dispatch the error condition
        console.log('login error')
        dispatch(loginFailure(data.message))
        dispatch(uiActions.toggleIsFetching(false))
        return Promise.reject(data.message)
      }
      else {
        // If login was successful, set the token in local storage
        localStorage.setItem('token', data.token)
        // Dispatch the success action
        dispatch(loginSuccess(data))
        dispatch(uiActions.toggleIsFetching(false))
        dispatch(addJWT(data.token))
        dispatch(uiActions.toggleModal(false,'login'))
      }
    }).catch(err => console.log('Error: ', err))
  }
}

export function loginToken(token){
  let config = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `JWT ${localStorage.getItem('token')}`,
    }
  }
  return dispatch=>{
    dispatch(loginTokenRequest())
    fetch('/api/auth', config)
    .then(res=>{
      console.log('TOKEN LOGIN WHAT IS RES', res)
      if(res.ok){
        return res.json()
      } else {
        return Promise.reject(new Error(res.statusText))
      }
    })
    .then(data=>{
      dispatch(loginTokenSuccess(data))
    })
    .catch(err=>{
      dispatch(loginTokenFailure(err.message))
    })
  }

}
export function getCsrfToken () {
  let config = {
    method: 'GET'
    // credentials: 'include' // include the cookie or else
    // headers: {'Content-Type': 'application/x-www-form-urlencoded'},

    // body: `username=${creds.username}&password=${creds.password}`
  }
  return dispatch => {
    console.log('trying CSRF REQUEST')
    dispatch(csrfRequest())
    return fetch('/api/auth/signup', config).then(res => {
      console.log('CSRF res', res)
      return res.json()
    }).then(data => {
      console.log('what is csrf data', data)
      dispatch(csrfSuccess(data.csrfToken))
    }).catch(err => {
      console.log('what is csrf data error', err)
      dispatch(csrfError(err.message))
    })
  }
}


export function addJWT (token) {
  localStorage.setItem('token', token)
  return {
    type: types.JWT_ADD,
    token: token
  }
}

export function removeJWT () {
  localStorage.removeItem('token')
  return {
    type: types.JWT_REMOVE,
    token: false
  }
}

export function getJWT () {
  const token = localStorage.getItem('token')
  return {
    type: types.JWT_GET,
    token: token
  }

}

