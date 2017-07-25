import moment from 'moment'
import React, { Component } from 'react'

import {
  Button,
  Form,
  Header,
  Icon,
  Input,
  Label,
  Modal,
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
  email: '',
  checked: false
}

class Quote extends Component {
  constructor (props) {
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
      [name]: name === 'capacity' || name === 'price'
        ? Number.parseInt(value)
        : value,
      [`${name}Error`]: undefined
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
    this.setState({
      checked: true
    })
    const validName = this.validateName(this.state.name)
    const validModel = initialState.models.some(
      model => model.key === this.state.model)
    const validCapacity = Number.isInteger(this.state.capacity)
    const validDate = moment(this.state.date).isValid()
    const validPrice = Number.isInteger(this.state.price)
    const validEmail = this.validateEmail(this.state.email)

    const validSubmission = validName  && validModel &&
      validCapacity &&
      validDate && validEmail && validPrice
    console.log('validName', validName)
    console.log('validModel', validModel)
    console.log('validCapacity', validCapacity)
    console.log('validDate', validDate)
    console.log('validPrice', validPrice)
    console.log('typeof validPrice', validPrice)
    console.log('validEmail', validEmail)
    if (validSubmission) {
      const submissionObj = {
        owner_name: this.state.name,
        model: this.state.model,
        seat_capacity: this.state.capacity,
        manufactured_date: moment(this.state.date).toISOString(),
        purchase_price: this.state.price,
        broker_email: this.state.email
      }

      this.props.actions.createQuote(submissionObj)

    }
    else {
      const nameError = !validName
        ? 'Owner name must be at least two characters' : undefined
      const emailError = !validEmail
        ? 'Email is invalid' : undefined
      const modelError = !validModel
        ? 'A model is required to be selected' : undefined
      const capacityError = !validCapacity
        ? 'The seat capacity is required' : undefined
      const dateError = !validDate
        ? 'A valid date is required' : undefined

      const priceError = !validPrice
        ? 'A valid price is required' : undefined

      this.setState({
        nameError,
        emailError,
        modelError,
        capacityError,
        dateError,
        priceError

      })
    }
  }

  componentWillReceiveProps (nextProps) {
    // this.props.actions.getCsrfToken()
    this.setState(nextProps.ui.data)
  }

  render () {
    const buttonActionType = this.props.ui.data ? 'Update' : 'Create'
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
                <Input placeholder='Owner Name'
                       name='name'
                       onChange={this.handleValueChange}
                       value={this.state.name}
                />

                {this.state.nameError
                  ? <Label basic color='red'
                           pointing>{this.state.nameError}</Label>
                  : undefined
                }
              </Form.Field>
              <Form.Field required>
                <Input placeholder='Broker Email'
                       name='email'
                       type='email'
                       onChange={this.handleValueChange}
                       value={this.state.email}
                />

                {this.state.emailError
                  ? <Label basic color='red'
                           pointing>{this.state.emailError}</Label>
                  : undefined
                }
              </Form.Field>
            </Form.Group>
            <Form.Group widths='equal'>
              <Form.Field>
                <Select placeholder='Select Model'
                        options={this.state.models}
                        name='model'
                        onChange={this.handleValueChange}
                        fluid
                        selection
                />
                {this.state.modelError
                  ? <Label basic color='red'
                           pointing>{this.state.modelError}</Label>
                  : undefined
                }
              </Form.Field>
              <Form.Field required>
                <Input placeholder='Manufactured Date'
                       name='date'
                       type='date'
                       onChange={this.handleValueChange}
                       value={this.state.date}
                />

                {this.state.dateError
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
                       type='number'
                       min='0'
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
                       type='number'
                       min='0.00'
                       step='1'
                       max='99999999999'
                       onChange={this.handleValueChange}
                       value={this.state.price}
                />

                {this.state.priceError
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