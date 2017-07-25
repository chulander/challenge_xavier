import React, { Component } from 'react'
import { Button, Form, Header, Icon, Input, Modal } from 'semantic-ui-react'

const initialState = {
  email: '',
  password: ''
}

class Login extends Component {
  constructor (props) {
    super(props)
    this.state = {
      email: '',
      password: ''
    }
    this.submitLoginRequest = this.submitLoginRequest.bind(this)
    this.validateEmail = this.validateEmail.bind(this)
    this.handleEmailChange = this.handleEmailChange.bind(this)
    this.handlePasswordChange = this.handlePasswordChange.bind(this)
    this.resetLoginForm = this.resetLoginForm.bind(this)
  }

  handleEmailChange (e, {value}) {
    this.setState({
      email: value
    })
  }

  handlePasswordChange (e, {value}) {
    this.setState({
      password: value
    })
  }

  resetLoginForm () {
    this.setState(initialState)
    this.props.actions.toggleModal(false, 'login')
  }

  validateEmail (value) {
    // http://www.regextester.com/19
    return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(
      value)
  }

  submitLoginRequest () {
    const validEmail = this.validateEmail(this.state.email)
    !validEmail
      ? this.setState({
        emailError: true
      })
      : this.props.actions.loginUser(this.state, this.props.auth.csrfToken)
  }

  render () {
    return (

      <Modal
        open={this.props.ui.modalActive}
        onClose={this.resetLoginForm}
        basic
        size='small'
      >
        <Header icon='signup' content='Login' />
        <Modal.Content>
          <Form>
            <Form.Field>
              <Input
                iconPosition='left'
                placeholder={
                  this.state.emailError
                    ? 'Not a Valid Email'
                    : 'Email'
                }
                onChange={this.handleEmailChange}
                error={this.state.emailError}
              >
                <Icon name='at' />
                <input />
              </Input>
            </Form.Field>
            <Form.Field>
              <Input
                placeholder='Password'
                onChange={this.handlePasswordChange}
              >
                <input type='password' />
              </Input>
            </Form.Field>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button color='green'
                  onClick={this.submitLoginRequest}>
            <Icon name='checkmark' /> Login
          </Button>
          <Button color='red'
                  onClick={this.resetLoginForm}
                  inverted>
            <Icon name='cancel' /> Cancel
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }

}

export default Login
