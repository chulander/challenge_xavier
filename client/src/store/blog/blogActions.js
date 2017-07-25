/* global fetch:false */
import * as types from './blogActionTypes'
import * as uiActions from '../ui/uiActions'

const createAuthorizationHeader = () => ({
  Authorization: `JWT ${localStorage.getItem('token')}`,
  'Content-Type': 'application/json'
})

function createBlogRequest (data) {
  return {
    type: types.CREATE_BLOG_REQUEST,
    data
  }
}
function deleteBlogRequest(data){
  return {
    type: types.DELETE_BLOG_REQUEST,
    data
  }
}

function updateBlogRequest(data){
  return {
    type: types.UPDATE_BLOG_REQUEST,
    data
  }
}

function createBlogSuccess (message) {
  return {
    type: types.CREATE_BLOG_SUCCESS,
    message
  }
}

function deleteBlogSuccess (message) {
  return {
    type: types.DELETE_BLOG_SUCCESS,
    message
  }
}

function updateBlogSuccess (message) {
  return {
    type: types.UPDATE_BLOG_SUCCESS,
    message
  }
}

function createBlogFailure (error) {
  return {
    type: types.CREATE_BLOG_FAILURE,
    error
  }
}

function deleteBlogFailure (error) {
  return {
    type: types.DELETE_BLOG_FAILURE,
    error
  }
}

function updateBlogFailure (error) {
  return {
    type: types.UPDATE_BLOG_FAILURE,
    error
  }
}


export function createBlog (blogData) {
  const authHeaders = createAuthorizationHeader()
  return dispatch => {
    dispatch(createBlogRequest(blogData))
    dispatch(uiActions.toggleIsFetching(true))

    fetch('/api/blog', {
      method: 'POST',
      headers: authHeaders,
      body: JSON.stringify(blogData)
    }).then(res => {
      if(res.ok) {
        return res.json()
      }
      else {
        return Promise.reject(new Error(res.statusText))
      }
    }).then(data => {
      dispatch(createBlogSuccess(data.message))
      dispatch(uiActions.toggleIsFetching(false))
      dispatch(uiActions.toggleModal(false,'blog'))
    }).catch(err => {
      dispatch(createBlogFailure(err.message))
      dispatch(uiActions.toggleIsFetching(false))
    })
  }
}

export function deleteBlog (blogData) {
  const authHeaders = createAuthorizationHeader()
  return dispatch => {
    dispatch(deleteBlogRequest(blogData))
    // dispatch(uiActions.toggleIsFetching(true))

    fetch(`/api/blog/${blogData._id}`, {
      method: 'DELETE',
      headers: authHeaders,
    }).then(res => {
      if(res.ok) {
        return res.json()
      }
      else {
        return Promise.reject(new Error(res.statusText))
      }
    }).then(data => {
      dispatch(deleteBlogSuccess(data.message))
      // dispatch(uiActions.toggleIsFetching(false))
      // dispatch(uiActions.toggleModal(false,'blog'))
    }).catch(err => {
      dispatch(deleteBlogFailure(err.message))
      // dispatch(uiActions.toggleIsFetching(false))
    })
  }
}


export function updateBlog (blogData) {
  const authHeaders = createAuthorizationHeader()
  return dispatch => {
    dispatch(updateBlogRequest(blogData))
    dispatch(uiActions.toggleIsFetching(true))

    fetch(`/api/blog/${blogData._id}`, {
      method: 'PUT',
      headers: authHeaders,
      body: JSON.stringify(blogData)
    }).then(res => {
      if(res.ok) {
        return res.json()
      }
      else {
        return Promise.reject(new Error(res.statusText))
      }
    }).then(data => {
      dispatch(updateBlogSuccess(data.message))
      dispatch(uiActions.toggleIsFetching(false))
      dispatch(uiActions.toggleModal(false,'blog'))
    }).catch(err => {
      dispatch(updateBlogFailure(err.message))
      dispatch(uiActions.toggleIsFetching(false))
    })
  }
}
