import React, { Component } from 'react'
import { Icon, Menu, Button, Input, Image, Header, Segment} from 'semantic-ui-react'
const routeMappings = {
  home: '/',
  group: '/groups',
  game: '/games',
  user: '/players',
  news: '/news'
}
const getActiveItemFromRoute = function(location){
  // console.log('what is location', location)
  const activeItem = Object.keys(routeMappings).reduce((cur,next)=>{
    // console.log('what is routeMappings[next]', routeMappings[next])
    return routeMappings[next]===location ? next : cur
  })
  return activeItem || 'home'
}
class HeaderContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      activeItem: getActiveItemFromRoute(this.props.location.pathname)
    }
    this.handleItemClick = this.handleItemClick.bind(this)
  }

  handleItemClick (e, {name}) {
    this.setState({activeItem: name})
    if (name !== 'sidebar') {
      this.props.history.push(routeMappings[name])
    }
    if (name === 'sidebar') {
      console.log('inside sidebar', this.props)
      this.props.actions.toggleSidebar()
      // console.log('typeof ', typeof this.props.toggleSidebar)
    }

  }

  render () {
    // console.log('what is header props', this.props.location.pathname)
    const {activeItem} = this.state
    console.log('what is activeItem', activeItem)
    return (
      <div>
        <Header textAlign='center'>
          XYZ Insurance Inc.
          {
            this.props.isAuthenticated
            ?  `...${this.props.user}`
              :undefined
          }


          <Header.Subheader>
            Xavier, an online "quick quoting" system
          </Header.Subheader>
        </Header>
        {/*<Menu pointing icon='labeled'>*/}
        <Menu pointing secondary>
          {this.props.isAuthenticated
            ? <Menu.Item name='sidebar'
                         onClick={this.handleItemClick}>
              <Icon name='sidebar' />
            </Menu.Item>
            : ''
          }




          <Menu.Item name='news' active={activeItem === 'news'}
                     onClick={this.handleItemClick}>
            <Icon name='newspaper' />
            News
          </Menu.Item>
          <Menu.Item name='group' active={activeItem === 'group'}
                     onClick={this.handleItemClick}>
            <Icon name='group' />
            Groups
          </Menu.Item>

          <Menu.Item name='user' active={activeItem === 'user'}
                     onClick={this.handleItemClick}>
            <Icon name='user' />
            Players
          </Menu.Item>

          <Menu.Menu position='right'>
            {this.props.isAuthenticated
              ? <Menu.Item name='logout' active={activeItem === 'logout'}
                           onClick={this.handleItemClick}>
                {/*<Image avatar size="mini" src={this.props.photo} />*/}

                <Icon name='log out' />
                Log Out
              </Menu.Item>
              : <Menu.Item name='sign in' active={activeItem === 'sign in'}
                           onClick={()=>this.props.actions.toggleModal(!this.props.ui.modalActive,'login')}>
                <Icon name='sign in' />
                Login
              </Menu.Item>
            }
            {
            this.props.isAuthenticated
              ? undefined
              : <Menu.Item name='signup' active={activeItem === 'signup'}
                           onClick={()=>this.props.actions.toggleModal(!this.props.ui.modalActive,'signup')}>
                <Icon name='add user' />
                Sign up
              </Menu.Item>

            }

          </Menu.Menu>
        </Menu>
      </div>
    )
  }
}

export default HeaderContainer