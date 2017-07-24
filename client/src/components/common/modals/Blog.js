import React, { Component } from 'react'
import {
  Button,
  Form,
  Header,
  Icon,
  Input,
  Label,
  Modal
} from 'semantic-ui-react'

const initialState = {
  title: '',
  message: undefined,
  createdAt: undefined,
  _id: undefined
}

class Blog extends Component {
  constructor (props) {
    super(props)
    this.state = props.ui.data || initialState
    this.submitBlogForm = this.submitBlogForm.bind(this)
    this.handleTitleChange = this.handleTitleChange.bind(this)
    this.handleMessageChange = this.handleMessageChange.bind(this)
    this.validateTitle = this.validateTitle.bind(this)
    this.validateMessage = this.validateMessage.bind(this)
    this.resetBlogForm = this.resetBlogForm.bind(this)
  }

  handleTitleChange (e, {value}) {
    this.setState({
      title: value
    })
  }

  handleMessageChange (e, {value}) {
    this.setState({
      message: value
    })
  }

  resetBlogForm () {
    this.setState(initialState)
    this.props.actions.toggleModal(false, 'blog')
  }

  validateTitle (value) {
    return /[a-z-A-Z]{2,}/.test(value)
  }

  validateMessage (value) {
    return /[\w]{2,}/.test(value)
  }

  submitBlogForm () {
    console.log('clicking submitBlogForm')
    const validTitle = this.validateTitle(this.state.title)
    const validMessage = this.validateTitle(this.state.message)
    const validSubmission = validTitle && validMessage
    // console.log('what is validTitle', validTitle)
    // console.log('what is validMessage', validMessage)
    // console.log('what is validSubmission', validSubmission)
    if (validSubmission) {
      if (this.props.ui.data) {
        this.props.actions.updateBlog(this.state)
      }
      else {
        this.props.actions.createBlog(this.state)
      }

    }
    else {
      const titleError = !validTitle
        ? 'Title must be at least two characters'
        : undefined
      const messageError = !validMessage
        ? 'Message has to be at least 2 words'
        : undefined

      this.setState({
        titleError,
        messageError
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
        onClose={this.resetBlogForm}
        basic
        size='small'
      >
        <Header icon='add user' content={`${buttonActionType} Blog Post`} />
        <Modal.Content>
          <Form>
            <Form.Field required>
              <Input placeholder='Title'
                     onChange={this.handleTitleChange}
                     value={this.state.title}
              />

              {this.state.titleError
                ? <Label basic color='red'
                         pointing>{this.state.titleError}</Label>
                : undefined
              }
            </Form.Field>

            <Form.TextArea placeholder='Blog Details'
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
            onClick={this.submitBlogForm}>
            <Icon name='checkmark' /> {`${buttonActionType} Blog`}
          </Button>
          <Button
            color='red'
            onClick={this.resetBlogForm}>Cancel</Button>
        </Modal.Actions>
      </Modal>
    )
  }
}

export default Blog
