import React, { Component } from 'react'
import {
  Button,
  Confirm,
  Form,
  Header,
  Icon,
  Input,
  Modal,
  Select,
  Dropdown
} from 'semantic-ui-react'
const createAuthorizationHeader = () => ({
  headers: `JWT ${localStorage.getItem('item')}`,
  'Content-Type': 'application/json'
})
const initialState = {
  name: '',
  nameError: false,
  groupConfirmActive: false
}

class CreateGame extends Component {
  constructor (props) {
    super(props)
    this.state = {
      groupName: '',
      date: '',
      players: []
    }
    this.closeModal = this.closeModal.bind(this)
    this.getGroups = this.getGroups.bind(this)
  }

  closeModal () {
    this.props.actions.toggleModal(false, 'createGame')
  }

  getGroups () {
    const headers = createAuthorizationHeader()
    return fetch('/api/group', {
      method: 'GET',
      headers
    }).then(response => response.json()).then(data => {
      console.log('what is data', data)
    }).catch(err => {
      console.log('what is err', err)
    })
  }

  componentDidMount () {
    this.getGroups()
  }

  // console.log('typeof props.state.modalActive', props.state)
  render () {
    const languageOptions = [
      {
        key: 1,
        value: 'bryan'
      },
      {
        key: 2,
        value: 'tommy'
      }
    ]

    console.log('what is this.state', this.state)
    return (
      <Modal
        open={this.props.ui.modalActive}
        closeOnEscape={false}
        closeOnRootNodeClick={false}
        onClose={() => this.props.actions.toggleModal(false, 'createGame')}
        basic
        size='small'
      >
        <Header icon='gamepad' content='Create Game' />

        <Modal.Content image>
          <Form>
            <Form.Field>

              <Dropdown text='Select Language'
                        search
                        floating
                        labeled
                        button
                        className='icon'
                        icon='gamepad'
                        options={languageOptions}
              />

            </Form.Field>
          </Form>
        </Modal.Content>

        <Modal.Actions>
          <Button
            color='green'
            onClick={() => {}}
            inverted
          >
            <Icon name='checkmark' /> Create Game
          </Button>
          <Button color='red'
                  onClick={this.closeModal}
                  inverted>
            <Icon name='remove' /> Cancel
          </Button>
        </Modal.Actions>

      </Modal>
    )
  }
}
export default CreateGame
