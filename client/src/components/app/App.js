// import Footer from '../common/footer/Footer'
// import Drawer from '../common/drawer/Drawer'
// import Dialog from '../common/dialog/Dialog'
import React, { Component } from 'react'
import ReduxToastr from 'react-redux-toastr'
import { Route, Switch, Redirect } from 'react-router-dom'
import Header from '../common/header/Header'
import Modals from '../common/modals/Modals'
import Sidebar from '../common/sidebar/Sidebar'
import News from '../routes/news/News'
import Home from '../routes/home/Home'
const FourOhFour = () => <h1>404</h1>
export default class App extends Component {

  componentDidMount () {

    if (!this.props.isAuthenticated) {
      const token = localStorage.getItem('token')
      if(token){
        this.props.actions.loginToken(token)
      }

    }
  }

  render () {
    return (
      <div>
        <Sidebar {...this.props}>
          <Header {...this.props} />
          <Switch>
            <Route exact path='/' render={() => <Home {...this.props} />} />
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
