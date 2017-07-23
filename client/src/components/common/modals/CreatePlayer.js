import React, { Component } from 'react'
import {
  Button,
  Confirm,
  Form,
  Header,
  Icon,
  Input,
  Modal
} from 'semantic-ui-react'
const initialState = {
  firstName: '',
  lastName: '',
  firstNameError: false,
  lastNameError: false,
  playerConfirmActive: false
}
const PlayerConfirm = (props) => (
  <Confirm
    header='Cancelling will erase the player data'
    content='Are you sure you want to cancel this?'
    open={props.playerConfirmActive}
    onCancel={() => props.togglePlayerConfirm(false)}
    onConfirm={() => {
      props.togglePlayerConfirm(false)
      props.actions.toggleModal(false, 'createPlayer')
      props.wipeState()
    }}
    confirmButton={`Yes, I know what I'm doing`}
    cancelButton='Never mind that'
  />
)

class CreatePlayer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      firstName: '',
      lastName: '',
      photo: '',
      firstNameError: false,
      lastNameError: false,
      photoError: false,
      playerConfirmActive: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.validateName = this.validateName.bind(this)
    this.validatePhoto = this.validatePhoto.bind(this)
    this.submitPlayerForCreation = this.submitPlayerForCreation.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.togglePlayerConfirm = this.togglePlayerConfirm.bind(this)
    this.wipeState = this.wipeState.bind(this)
  }

  //because the modal is not unmounted, the state data persist after close
  wipeState () {
    this.setState(initialState)
  }

  validateName (value) {
    return /[a-z-A-Z]{2,}/.test(value)
  }

  validatePhoto (value) {
    return /^https?:\/\//.test(value)
  }

  handleChange (e, {value, nameType}) {
    // console.log('what is value', nameType)
    const validName = this.validateName(value) || this.validatePhoto(value)
    const nameError = `${nameType}Error`
    const obj = {
      [nameType]: value
    }
    if (this.state[nameError] && validName) {
      obj[nameError] = false
    }
    this.setState(obj)
  }

  togglePlayerConfirm (status) {
    this.setState({
      playerConfirmActive: typeof status !== 'undefined'
        ? status
        : !this.state.playerConfirmActive
    })
  }

  submitPlayerForCreation () {
    const validFirstName = this.validateName(this.state.firstName)
    const validLastName = this.validateName(this.state.lastName)
    const validPhoto = this.state.photo.length ? this.validatePhoto(
      this.state.photo) : true
    console.log('inside support player')
    this.setState({submitted: true})
    if (validFirstName && validLastName && validPhoto) {
      // console.log('inside submitPlayer yes')
      this.props.actions.addPlayer(this.state.firstName, this.state.lastName,
        this.state.photo)
      this.wipeState()
    }
    else {
      this.setState({
        firstNameError: !validFirstName,
        lastNameError: !validLastName,
        photoError: !validPhoto,
        photo: !validPhoto ? '' : this.state.photo
      })
      console.log('inside submitplayer else')
    }
  }

  closeModal () {
    const validFirstName = this.validateName(this.state.firstName)
    const validLastName = this.validateName(this.state.lastName)
    console.log('what is validFirst', validFirstName)
    console.log('what is validFirst', this.state.firstName)
    console.log('what is validLast', this.state.lastName)
    if (validLastName && validFirstName) {
      this.togglePlayerConfirm(true)
    }
    else {
      this.props.actions.toggleModal(false, 'createPlayer')
    }
  }

  // console.log('typeof props.state.modalActive', props.state)
  render () {

    console.log('what is this.state', this.state)
    return (
      <Modal
        open={this.props.ui.modalActive}
        closeOnEscape={false}
        closeOnRootNodeClick={false}
        onClose={() => this.props.actions.toggleModal(false, 'createPlayer')}
        basic
        size='small'
      >
        <Header icon='add user' content='Create Player' />

        <Modal.Content>
          <Form>
            <Form.Field>
              <Input
                // label='First Name'
                nameType='firstName'
                placeholder={this.state.firstNameError
                  ? `Missing First Name`
                  : `First Name`}
                onChange={this.handleChange}
                icon={
                  this.state.firstNameError
                    ? 'remove'
                    : undefined
                }
                error={this.state.firstNameError
                }
              />
            </Form.Field>
            <Form.Field>
              <Input
                // label='Last Name'
                nameType='lastName'
                placeholder={this.state.lastNameError
                  ? `Missing Last Name`
                  : `Last Name`}
                icon={
                  this.state.lastNameError
                    ? 'remove'
                    : undefined
                }
                onChange={this.handleChange}
                error={this.state.lastNameError}
              />
            </Form.Field>
            <Form.Field>
              <Input
                // label='First Name'
                nameType='photo'
                placeholder={this.state.photoError
                  ? `Photo URL is not an URL`
                  : `Photo URL`}
                onChange={this.handleChange}
                icon={
                  this.state.photoError
                    ? 'remove'
                    : undefined
                }
                error={this.state.photoError
                }
              />
            </Form.Field>
          </Form>
        </Modal.Content>

        <Modal.Actions>
          <Button
            color='green'
            onClick={this.submitPlayerForCreation}
            inverted
          >
            <Icon name='checkmark' /> Create Player
          </Button>
          <Button color='red'
                  onClick={this.closeModal}
                  inverted>
            <Icon name='remove' /> Cancel
          </Button>
        </Modal.Actions>

        <PlayerConfirm
          playerConfirmActive={this.state.playerConfirmActive}
          togglePlayerConfirm={this.togglePlayerConfirm}
          wipeState={this.wipeState}
          {...this.props}
        />
      </Modal>
    )
  }
}
export default CreatePlayer
