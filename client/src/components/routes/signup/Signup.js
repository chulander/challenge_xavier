import React, { Component } from 'react'
import {
  Button,
  Container,
  Form,
  Grid,
  Header,
  Input,
  Label,
  Loader,
  Dimmer
} from 'semantic-ui-react'

const initialState = {
  firstName: '',
  firstNameError: undefined,
  email: '',
  emailError: undefined,
  password: '',
  passwordError: undefined,
  passwordConfirm: '',
  passwordConfirmError: undefined
}

class Signup extends Component {
  constructor (props) {
    super(props)
    this.state = initialState
    this.submitSignupForm = this.submitSignupForm.bind(this)
    this.handleNameChange = this.handleNameChange.bind(this)
    this.handlePasswordChange = this.handlePasswordChange.bind(this)
    this.handleEmailChange = this.handleEmailChange.bind(this)
    this.validateEmail = this.validateEmail.bind(this)
    this.validatePasswordStrength = this.validatePasswordStrength.bind(this)
    this.resetForm = this.resetForm.bind(this)
  }

  handleNameChange (e, {value}) {
    this.setState({
      firstName: value
    })
  }

  handlePasswordChange (passwordType) {
    return (e, {value}) => {
      this.setState({
        [passwordType]: value
      })
    }
  }

  handleEmailChange (e, {value}) {
    this.setState({
      email: value
    })
  }

  resetForm () {
    console.log('inside resetForm')
    this.setState(initialState)
  }

  validateEmail (value) {
    // http://www.regextester.com/19
    return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(
      value)
  }

  validateName (value) {
    return /[a-z-A-Z]{2,}/.test(value)
  }

  validatePasswordStrength (value) {
    // https://www.thepolyglotdeveloper.com/2015/05/use-regex-to-test-password-strength-in-javascript/
    //^(?=.*[a-z]) = lookahead and match lowercase
    // (?=.*[A-Z]) = lookahead and match uppercase
    // (?=.*[0-9]) = lookahead and match numbers
    // (?=.{8,}) = lookahead and match 8 chars

    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/.test(
      value)
  }

  submitSignupForm () {
    const validFirstName = this.validateName(this.state.firstName)
    const validEmail = this.validateEmail(this.state.email)
    const validPassword = this.validatePasswordStrength(this.state.password)
    const validPasswordConfirm = this.state.password ===
      this.state.passwordConfirm
    const validSubmission = validFirstName && validEmail && validPassword &&
      validPasswordConfirm
    if (validSubmission) {
      this.props.actions.signup(this.state)
    }
    else {
      const firstNameError = !validFirstName
        ? 'First name must be at least two characters' : undefined
      const emailError = !validEmail ? 'Email is not valid' : undefined
      const passwordError = !validPassword
        ? 'Password must be at least 8 alpha numeric characters with upper and lower case'
        : undefined
      const passwordConfirmError = !validPasswordConfirm
        ? 'The password does not match'
        : undefined
      this.setState({
        firstNameError,
        emailError,
        passwordError,
        passwordConfirmError
      })
    }
  }

  render () {
    return (
      <Dimmer active={this.props.auth.isFetching}>
      <Grid columns={1}>
        <Grid.Row />
        <Grid.Row>
          <Container text>
            <Header as='h2'>Sign up to be an Admin</Header>
            <Form>
              <Form.Field>
                <Input placeholder='First Name'
                       onChange={this.handleNameChange}
                />

                {this.state.firstNameError
                  ? <Label basic color='red'
                           pointing>{this.state.firstNameError}</Label>
                  : undefined
                }
              </Form.Field>

              <Form.Field>
                <Input placeholder='Email'
                       onChange={this.handleEmailChange}
                />
                {this.state.emailError
                  ? <Label basic color='red'
                           pointing>{this.state.emailError}</Label>
                  : undefined
                }
              </Form.Field>
              <Form.Field>
                <Input placeholder='Password'
                       onChange={this.handlePasswordChange('password')}>
                  <input type='password' />
                </Input>
                {this.state.passwordError
                  ? <Label basic color='red'
                           pointing>{this.state.passwordError}</Label>
                  : undefined
                }

              </Form.Field>
              <Form.Field>
                <Input placeholder='Confirm Password'
                       onChange={this.handlePasswordChange('passwordConfirm')}>
                  <input type='password' />
                </Input>
                {this.state.passwordConfirmError
                  ? <Label basic color='red'
                           pointing>{this.state.passwordConfirmError}</Label>
                  : undefined
                }
              </Form.Field>
              <Button primary onClick={this.submitSignupForm}>Submit</Button>
              <Button secondary onClick={this.resetForm}>Clear Form</Button>
            </Form>

          </Container>
        </Grid.Row>

      </Grid>
        <Loader indeterminate>Processing ...</Loader>
      </Dimmer>
    )
  }
}

export default Signup