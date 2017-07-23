// import Footer from '../common/footer/Footer'
// import Drawer from '../common/drawer/Drawer'
// import Dialog from '../common/dialog/Dialog'
import React, { Component } from 'react'
import ReduxToastr from 'react-redux-toastr'
import { Route, Switch, Redirect } from 'react-router-dom'
import Header from '../common/header/Header'
import Modals from '../common/modals/Modals'
import Sidebar from '../common/sidebar/Sidebar'
import Games from '../routes/games/Games'
import Groups from '../routes/groups/Groups'
import Signup from '../routes/signup/Signup'
import Players from '../routes/players/Players'
import News from '../routes/news/News'
const FourOhFour = () => <h1>404</h1>
import {Container} from 'semantic-ui-react'
export default class App extends Component {
  // componentDidMount () {
  //   if (window) {
  //     socket = io()
  //     socket.emit('private', {
  //       message: 'hi from client',
  //     })
  //   }
  // }
  constructor (props) {
    super(props)
  }

  componentDidMount () {
    console.log('inside app.js COMPONENTDIDMOUTN')

    // if (window) {
    //   socket = io()
    //   console.log('socket connected client side')
    //   // socket.emit('private', {
    //   //     msg: 'Thank you for your message'
    //   //   }
    //   // )
    // }
    if (!this.props.isAuthenticated) {
      const token = localStorage.getItem('token')
      if(token){
        this.props.actions.loginToken(token)
      }

    }
  }


  componentWillReceiveProps(nextProps){
    // hndles facebook oauth2 redirect hash
    if(nextProps.history && nextProps.history.location && nextProps.history.location.hash === '#_=_'){
      nextProps.history.push('/')
    }
  }
  render () {
    // console.log('APP: what is this.props', this.props)
    return (
      <div>
        <Sidebar {...this.props}>
          <Header {...this.props} />
          <Switch>
            <Route exact path='/' render={() => <Redirect to='/news'/>} />
            <Route path='/news' render={() => <News {...this.props} />} />
            <Route component={FourOhFour} />
          </Switch>
        </Sidebar>
        <ReduxToastr
          timeOut={4000}
          newestOnTop={false}
          preventDuplicates
          position="top-left"
          transitionIn="fadeIn"
          transitionOut="fadeOut"
          progressBar />
        <Modals {...this.props} />
      </div>
    )
  }
}

// if (module.hot) {
//   module.hot.accept('./App.js')
// }
