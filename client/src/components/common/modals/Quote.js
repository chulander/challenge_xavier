import React, { Component } from 'react'
import {
  Button,
  Form,
  Header,
  Icon,
  Input,
  Label,
  Modal,
  Dropdown
} from 'semantic-ui-react'

const initialState = {
  owner_name: '',
  model: [
    'Gulfstream G650',
    'CessnaA-37 Dragonfly',
    'Cessna Citation Encore'
  ],
  seat_capacity: '',
  manufactured_date: '',
  purchase_price: '',
  broker_email: '',
}

class Quote extends Component {
  constructor (props) {
    console.log('Quote Modal: what is props.ui.data', props.ui.data)
    super(props)
    this.state = props.ui.data || initialState
    this.submitQuoteForm = this.submitQuoteForm.bind(this)
    this.handleNameChange = this.handleNameChange.bind(this)
    this.handleMessageChange = this.handleMessageChange.bind(this)
    this.validateTitle = this.validateTitle.bind(this)
    this.validateMessage = this.validateMessage.bind(this)
    this.resetQuoteForm = this.resetQuoteForm.bind(this)
  }

  handleNameChange (e, {value}) {
    this.setState({
      name: value
    })
  }

  handleMessageChange (e, {value}) {
    this.setState({
      message: value
    })
  }

  resetQuoteForm () {
    this.setState(initialState)
    this.props.actions.toggleModal(false, 'blog')
  }

  validateTitle (value) {
    return /[a-z-A-Z]{2,}/.test(value)
  }

  validateMessage (value) {
    // return /[\w]{2,}/.test(value)
    return true
  }

  submitQuoteForm () {
    console.log('clicking submitQuoteForm')
    const validTitle = this.validateTitle(this.state.name)
    const validMessage = this.validateTitle(this.state.message)
    const validSubmission = validTitle && validMessage
    // console.log('what is validTitle', validTitle)
    // console.log('what is validMessage', validMessage)
    // console.log('what is validSubmission', validSubmission)
    if (validSubmission) {
      if (this.props.ui.data) {
        this.props.actions.updateQuote(this.state)
      }
      else {
        this.props.actions.createQuote(this.state)
      }

    }
    else {
      const nameError = !validTitle
        ? 'Title must be at least two characters' : undefined
      const messageError = !validMessage
        ? 'Message has to be at least 2 words'
        : undefined

      this.setState({
        nameError,
        messageError
      })
    }
  }

  componentWillReceiveProps (nextProps) {
    console.log('blog component will receiving props')
    console.log('what is nextProps', nextProps)
    // this.props.actions.getCsrfToken()
    this.setState(nextProps.ui.data)
  }

  render () {
    const buttonActionType = this.props.ui.data ? 'Update' : 'Create'
    console.log('what is the state', this.state)
    return (
      <Modal
        open={this.props.ui.modalActive}
        onClose={this.resetQuoteForm}
        basic
        size='small'
      >
        <Header icon='add user' content={`${buttonActionType} Quote Post`} />
        <Modal.Content>
          <Form>
            <Form.Field required>
              <Input placeholder='Owner Name'
                     onChange={this.handleNameChange}
                     value={this.state.name}
              />

              {this.state.nameError
                ? <Label basic color='red'
                         pointing>{this.state.nameError}</Label>
                : undefined
              }
            </Form.Field>

            <Form.Field required>
              <Dropdown placeholder='Select Friend' fluid selection options={this.state.model} />
            </Form.Field>
            <Form.TextArea placeholder='Quote Details'
                           onChange={this.handleMessageChange}
                           value={this.state.message}
                           required>
              {this.state.messageError
                ? <Label basic color='red'
                         pointing>{this.state.messageError}</Label>
                : undefined
              }
            </Form.TextArea>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button
            color='green'
            onClick={this.submitQuoteForm}>
            <Icon name='checkmark' /> {`${buttonActionType} Quote`}
          </Button>
          <Button
            color='red'
            onClick={this.resetQuoteForm}>Cancel</Button>
        </Modal.Actions>
      </Modal>
    )
  }
}

export default Quote