import React from 'react'
import { Icon, Menu, Segment, Sidebar } from 'semantic-ui-react'

const SidebarIcons = (props) => {
  // console.log('Sidebar: what is props', props)
  return (
    <Sidebar.Pushable as={Segment}>
      <Sidebar as={Menu} animation='push' width='thin'
               visible={props.ui.sidebarActive} icon='labeled' vertical
               inverted>
        <Menu.Item name='player' onClick={() => props.actions.toggleModal(true,
          'createPlayer')}>
          <Icon name='add user' />
          Create Player
        </Menu.Item>
        <Menu.Item name='group' onClick={() => props.actions.toggleModal(true, 'createGroup')}>
          <Icon name='group' />
          Create Group
        </Menu.Item>
        <Menu.Item name='game' onClick={()=> props.actions.toggleModal(true, 'createGame')}>
          <Icon name='gamepad' />
          Create Games
        </Menu.Item>
      </Sidebar>
      <Sidebar.Pusher>
        <Segment basic>
          {props.children}
        </Segment>
      </Sidebar.Pusher>
    </Sidebar.Pushable>
  )
}

export default SidebarIcons