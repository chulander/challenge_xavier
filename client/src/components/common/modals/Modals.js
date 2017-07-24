import React from 'react'
import { Dimmer, Loader } from 'semantic-ui-react'
import Signup from './Signup'
import Blog from './Blog'
import Quote from './Quote'

import Login from './Login'
const modalMappings = {
  login: Login,
  signup: Signup,
  blog: Blog,
  quote: Quote
}
const Modals = (props) => {
  const Component = modalMappings[props.ui.modalType]

  return (
    <Dimmer active={props.ui.isFetching}>

      {!props.ui.isFetching
        ? <Component{...props} />
        : undefined
      }
      <Loader indeterminate>Processing ...</Loader>
    </Dimmer>
  )

}

export default Modals