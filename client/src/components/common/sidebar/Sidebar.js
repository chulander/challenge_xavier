import React from 'react'
import { Icon, Menu, Segment, Sidebar } from 'semantic-ui-react'

const SidebarIcons = (props) => {
  return (
    <Sidebar.Pushable as={Segment}>
      <Sidebar as={Menu} animation='push' width='thin'
               visible={props.ui.sidebarActive} icon='labeled' vertical
               inverted>
        <Menu.Item name='player' onClick={() => props.actions.toggleModal(true,
          'blog')}>
          <Icon name='add' />
          Create Blog Post
        </Menu.Item>
        <Menu.Item name='login' onClick={() => props.actions.toggleModal(true, 'quote')}>
          <Icon name='plus' />
          Create New Quote
        </Menu.Item>
        <Menu.Item name='logout' onClick={()=>{
          props.actions.logoutUser()
          props.actions.toggleSidebar(false)
        }}>
          <Icon name='log out' />
          Log Out
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