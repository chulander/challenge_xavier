import React, { Component } from 'react'
import moment from 'moment'

import {
  Button,
  Form,
  Header,
  Icon,
  Input,
  Label,
  Modal,
  Dropdown,
  Select
} from 'semantic-ui-react'

const initialState = {
  name: '',
  models: [
    {
      key: 'Gulfstream G650',
      value: 'Gulfstream G650',
      text: 'Gulfstream G650'
    },
    {
      key: 'CessnaA-37 Dragonfly',
      value: 'CessnaA-37 Dragonfly',
      text: 'CessnaA-37 Dragonfly'
    },
    {
      key: 'Cessna Citation Encore',
      value: 'Cessna Citation Encore',
      text: 'Cessna Citation Encore'
    }
  ],
  model: '',
  capacity: '',
  date: '',
  price: '',
  email: ''
}

class Quote extends Component {
  constructor (props) {
    console.log('Quote Modal: what is props.ui.data', props.ui.data)
    super(props)
    this.state = props.ui.data || initialState
    this.submitQuoteForm = this.submitQuoteForm.bind(this)
    this.handleValueChange = this.handleValueChange.bind(this)
    this.validateName = this.validateName.bind(this)
    this.validateEmail = this.validateEmail.bind(this)
    this.resetQuoteForm = this.resetQuoteForm.bind(this)
  }

  handleValueChange (e, {value, name}) {
    this.setState({
      [name]: name === 'capacity'
        ? Number.parseInt(value)
        : value
    })
  }

  resetQuoteForm () {
    this.setState(initialState)
    this.props.actions.toggleModal(false, 'blog')
  }

  validateName (value) {
    return /[a-z-A-Z]{2,}/.test(value)
  }

  validateEmail (value) {
    // http://www.regextester.com/19
    return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(
      value)
  }

  submitQuoteForm () {
    console.log('clicking submitQuoteForm')
    const validFirstName = this.validateName(this.state.firstName)
    const validSecondName = this.validateName(this.state.secondName)
    const validModel = initialState.models.some(
      model => model.key === this.state.model)
    const validCapacity = Number.isInteger(this.state.capacity)
    const validDate = moment(this.state.date).isValid()
    const validPrice = Number.parseFloat(this.state.price).toFixed(2)
    const validEmail = this.validateEmail(this.state.email)

    const validSubmission = validFirstName && validSecondName && validModel &&
      validCapacity &&
      validDate && validPrice && validEmail
    console.log('validFirstName', validFirstName)
    console.log('validSecondName', validSecondName)
    console.log('validModel', validModel)
    console.log('validCapacity', validCapacity)
    console.log('validDate', validDate)
    console.log('validPrice', validPrice)
    console.log('validEmail', validEmail)
    // console.log('what is validTitle', validTitle)
    // console.log('what is validMessage', validMessage)
    // console.log('what is validSubmission', validSubmission)
    if (validSubmission || true) {
      const submissionObj = {
        owner_name: `${this.state.firstName} ${this.state.lastName}`,
        model: this.state.model,
        seat_capacity: this.state.capacity,
        manufactured_date: moment(this.state.date).toISOString(),
        purchase_price: this.state.price,
        broker_email: this.state.email
      }
      const testObj = {
        'owner_name': 'test test',
        'model': 'CessnaA-37 Dragonfly',
        'seat_capacity': 5,
        'manufactured_date': '2017-04-01T04:00:00.000Z',
        'purchase_price': '5000',
        'broker_email': 'test@mail.com'
      }
      const config = {
        method: 'POST',
        headers:
          {
            'x-api-key': 'L0Q3GvXCwB9jVSmvaJbw5augw4xHCvMy4Egqim2p',
            'Content-Type': 'application/json'
          },
        body: JSON.stringify(testObj)
      }
      fetch(
        'https://j950rrlta9.execute-api.us-east-2.amazonaws.com/v1/ArgoChallenge',
        config).then(res => {
        console.log('node-fetch: what is res', res)
        if (res.ok) {
          return res.json()
        }
        else {
          return Promise.reject(new Error(res.errors))
        }
      }).then(data => {
        console.log('what is data', data)

      }).catch(err => {
        console.log('frontend err', err)
      })
      // this.props.actions.createQuote(submissionObj)

    }
    else {
      const nameError = !validFirstName
        ? 'Title must be at least two characters' : undefined

      this.setState({
        nameError

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
            <Form.Group widths='equal'>
              <Form.Field required>
                <Input placeholder='Owner First Name'
                       name='firstName'
                       onChange={this.handleValueChange}
                       value={this.state.firstName}
                />

                {this.state.firstNameError
                  ? <Label basic color='red'
                           pointing>{this.state.firstNameError}</Label>
                  : undefined
                }
              </Form.Field>
              <Form.Field required>
                <Input placeholder='Owner Last Name'
                       name='lastName'
                       onChange={this.handleValueChange}
                       value={this.state.lastName}
                />

                {this.state.lastNameError
                  ? <Label basic color='red'
                           pointing>{this.state.lastNameError}</Label>
                  : undefined
                }
              </Form.Field>
              <Form.Field required>
                <Input placeholder='Broker Email'
                       name='email'
                       onChange={this.handleValueChange}
                       value={this.state.email}
                />

                {this.state.nameError
                  ? <Label basic color='red'
                           pointing>{this.state.emailError}</Label>
                  : undefined
                }
              </Form.Field>
            </Form.Group>
            <Form.Group widths='equal'>
              <Form.Field required>
                <Select placeholder='Select Model'
                        options={this.state.models}
                        name='model'
                        onChange={this.handleValueChange}
                        fluid
                        selection
                />
              </Form.Field>
              <Form.Field required>
                <Input placeholder='Manufactured Date'
                       name='date'
                       onChange={this.handleValueChange}
                       value={this.state.date}
                />

                {this.state.nameError
                  ? <Label basic color='red'
                           pointing>{this.state.dateError}</Label>
                  : undefined
                }
              </Form.Field>
            </Form.Group>

            <Form.Group widths='equal'>
              <Form.Field required>
                <Input placeholder='Seat Capacity'
                       name='capacity'
                       onChange={this.handleValueChange}
                       value={this.state.capacity}
                />

                {this.state.nameError
                  ? <Label basic color='red'
                           pointing>{this.state.capacityError}</Label>
                  : undefined
                }
              </Form.Field>


              <Form.Field required>
                <Input placeholder='Purchase Price'
                       name='price'
                       onChange={this.handleValueChange}
                       value={this.state.price}
                />

                {this.state.nameError
                  ? <Label basic color='red'
                           pointing>{this.state.priceError}</Label>
                  : undefined
                }
              </Form.Field>

            </Form.Group>


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