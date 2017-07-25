/* global fetch:false */
import * as types from './quoteActionTypes'
import * as uiActions from '../ui/uiActions'
import {actions as toastrActions} from 'react-redux-toastr'

const createAuthorizationHeader = () => ({
  Authorization: `JWT ${localStorage.getItem('token')}`,
  'Content-Type': 'application/json'
})

function createQuoteRequest (data) {
  return {
    type: types.CREATE_QUOTE_REQUEST,
    data
  }
}


function createQuoteSuccess (message) {
  return {
    type: types.CREATE_QUOTE_SUCCESS,
    message
  }
}


function createQuoteFailure (error) {
  return {
    type: types.CREATE_QUOTE_FAILURE,
    error
  }
}


export function createQuote (quoteData) {
  const authHeaders = createAuthorizationHeader()
  return dispatch => {
    dispatch(createQuoteRequest(quoteData))
    dispatch(uiActions.toggleIsFetching(true))

    fetch('/api/quote', {
      method: 'POST',
      headers: authHeaders,
      body: JSON.stringify(quoteData)
    }).then(res => {
      console.log('what is res', res)
      if(res.ok) {
        return res.json()
      }
      else {
        return Promise.reject(new Error(res.statusText))
      }
    }).then(data => {
      console.log('what is data', data)
      dispatch(createQuoteSuccess(data.message))
      dispatch(uiActions.toggleIsFetching(false))
      dispatch(uiActions.toggleModal(false,'quote'))
      const quoteStatus = data.quote.eligible ? 'success' : 'error'
      console.log('what is quoteStatus', quoteStatus)
      const toastrConfig = {
          id:`createQuote${quoteStatus}`,
        type: quoteStatus,
        title: quoteStatus.toUpperCase(),
        position: 'top-right', // This will override the global props position.
        attention: true, // This will add a shadow like the confirm method.
        message: data.message,
        options: {
          timeOut: 5000
        }
      }
      dispatch(toastrActions.add(toastrConfig))
    }).catch(err => {
      console.log('what is err', err)
      dispatch(createQuoteFailure(err.message))
      dispatch(uiActions.toggleIsFetching(false))
      dispatch(toastrActions.add({
        id: 'createQuoteFailure', // If not provided we will add one.
        type: 'error',
        title: 'Our system is experiencing routine maintenance, please try again later',
        position: 'top-right', // This will override the global props position.
        attention: true, // This will add a shadow like the confirm method.
        message: err.message,
        options: {
          timeOut: 5000
        }
      }))
    })
  }
}



