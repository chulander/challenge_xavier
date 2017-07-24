// There are three possible states for our login
// process and we need actions for each of them
export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'

export const LOGIN_TOKEN_REQUEST = 'LOGIN_TOKEN_REQUEST'
export const LOGIN_TOKEN_SUCCESS = 'LOGIN_TOKEN_SUCCESS'
export const LOGIN_TOKEN_FAILURE = 'LOGIN_TOKEN_FAILURE'


export const LOGOUT_REQUEST = 'LOGOUT_REQUEST'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE'

export const SIGNUP_REQUEST = 'SIGNUP_REQUEST'
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE'
export const SIGNUP_SUCCESSS = 'SIGNUP_SUCCESS'


export const CSRF_REQUEST = 'CSRF_REQUEST'
export const CSRF_FAILURE = 'CSRF_FAILURE'
export const CSRF_SUCCESS = 'CSRF_SUCCESS'

export const JWT_ADD = 'JWT_ADD'
export const JWT_REMOVE = 'JWT_REMOVE'
export const JWT_GET = 'JWT_GET'