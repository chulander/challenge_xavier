import React from 'react'
import { Dimmer, Loader } from 'semantic-ui-react'
import CreateGroup from './CreateGroup'
import CreatePlayer from './CreatePlayer'
import CreateGame from './CreateGame'
import Signup from './Signup'

import Login from './Login'
const modalMappings = {
  login: Login,
  signup: Signup,
  createPlayer: CreatePlayer,
  createGroup: CreateGroup,
  createGame: CreateGame
}
const Modals = (props) => {
  const Component = modalMappings[props.ui.modalType]

  return (
    <Dimmer active={props.auth.isFetching}>

      {!props.auth.isFetching
        ? <Component{...props} />
        : undefined
      }
      <Loader indeterminate>Processing ...</Loader>
    </Dimmer>
  )

}

export default Modals