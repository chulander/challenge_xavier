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
  name: '',
  nameError: false,
  groupConfirmActive: false
}
const GroupConfirm = (props) => (
  <Confirm
    header='Cancelling will erase the group data'
    content='Are you sure you want to cancel this?'
    open={props.groupConfirmActive}
    onCancel={() => props.toggleGroupConfirm(false)}
    onConfirm={() => {
      props.toggleGroupConfirm(false)
      props.actions.toggleModal(false, 'createGroup')
      props.wipeState()
    }}
    confirmButton={`Yes, I know what I'm doing`}
    cancelButton='Never mind that'
  />
)

class CreateGroup extends Component {
  constructor (props) {
    super(props)
    this.state = {
      name: '',
      photo:'',
      nameError: false,
      photoError:false,
      groupConfirmActive: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.validateName = this.validateName.bind(this)
    this.validatePhoto = this.validatePhoto.bind(this)
    this.submitGroupForCreation = this.submitGroupForCreation.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.toggleGroupConfirm = this.toggleGroupConfirm.bind(this)
    this.wipeState = this.wipeState.bind(this)
  }

  //because the modal is not unmounted, the state data persist after close
  wipeState () {
    this.setState(initialState)
  }

  validateName (value) {
    return /[a-z-A-Z]{2,}/.test(value)
  }
  validatePhoto(value){
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

  toggleGroupConfirm (status) {
    this.setState({
      groupConfirmActive: typeof status !== 'undefined'
        ? status
        : !this.state.groupConfirmActive
    })
  }

  submitGroupForCreation () {
    const validName= this.validateName(this.state.name)
    const validPhoto = this.state.photo.length ? this.validatePhoto(this.state.photo) : true
    console.log('inside support group')
    this.setState({submitted: true})
    if (validName && validPhoto) {
      // console.log('inside submitGroup yes')
      this.props.actions.addGroup(this.state.name, this.state.photo)
      this.wipeState()
    }
    else {
      this.setState({
        nameError: !validName,
        photoError: !validPhoto,
        photo: !validPhoto ? '' : this.state.photo
      })
      console.log('inside submitgroup else')
    }
  }

  closeModal () {
    const validName= this.validateName(this.state.name)
    if (validName){
      this.toggleGroupConfirm(true)
    }
    else {
      this.props.actions.toggleModal(false, 'createGroup')
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
        onClose={() => this.props.actions.toggleModal(false, 'createGroup')}
        basic
        size='small'
      >
        <Header icon='game' content='Create Group' />

        <Modal.Content>
          <Form>
            <Form.Field>
              <Input
                // label='First Name'
                nameType='name'
                placeholder={this.state.nameError
                  ? `Missing Group Name`
                  : `Group Name`}
                onChange={this.handleChange}
                icon={
                  this.state.nameError
                    ? 'remove'
                    : undefined
                }
                error={this.state.nameError
                }
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
            onClick={this.submitGroupForCreation}
            inverted
          >
            <Icon name='checkmark' /> Create Group
          </Button>
          <Button color='red'
                  onClick={this.closeModal}
                  inverted>
            <Icon name='remove' /> Cancel
          </Button>
        </Modal.Actions>

        <GroupConfirm
          groupConfirmActive={this.state.groupConfirmActive}
          toggleGroupConfirm={this.toggleGroupConfirm}
          wipeState={this.wipeState}
          {...this.props}
        />
      </Modal>
    )
  }
}
export default CreateGroup
