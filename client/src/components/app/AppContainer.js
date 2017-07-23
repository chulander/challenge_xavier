import { connect } from 'react-redux'
import { actions as toastrActions } from 'react-redux-toastr'
import { withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux'
// import * as drawerActions from '../common/drawer/drawerActions'
import * as authActions from '../../store/auth/authActions'
import * as groupActions from '../../store/group/groupActions'
import * as playerActions from '../../store/player/playerActions'
import * as uiActions from '../../store/ui/uiActions'
import App from './App'
// import * as dialogActions from '../common/dialog/dialogActions'

const action = Object.assign({}, authActions, playerActions, uiActions, groupActions, toastrActions)
function mapStateToProps (state, ownProps) {
  // console.log('AppContainer: what is state inside mapstatetoprops', state)
  return {
    // isDialogOpen: state.dialog.isDialogOpen,
    // dialogComponent: state.dialog.dialogComponent,
    // dialogComponentId: state.dialog.dialogComponentId,
    // isDrawerOpen: state.drawer.isDrawerOpen,
    // drawerComponent: state.drawer.drawerComponent,
    // drawerComponentId: state.drawer.drawerComponentId,
    isAuthenticated: state.auth.isAuthenticated,
    auth: state.auth,
    user: state.auth.user,
    photo: state.auth.photo,
    ui: state.ui,
    group: state.group,
    player: state.player,
    // errorMessage: state.auth.errorMessage
  }
}

function mapDispatchToProps (dispatch) {
  return {
    // toggleModal: ()=>dispatch(action.toggleModal())
    actions: bindActionCreators(action, dispatch)
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
