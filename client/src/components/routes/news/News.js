import React, { Component } from 'react'
import {
  Container,
  Header,
  Grid,
  Image,
  Card,
  Button,
  Icon,
  Input
} from 'semantic-ui-react'

class NewsItem extends Component {

  constructor(props){
    super(props)
    this.state={
      title: props.title,
      message: props.message,
      createdAt: props.createdAt,
      _id: props._id,
      deleteLoading:false
    }
    this.updateBlog=this.updateBlog.bind(this)
    this.deleteBlog=this.deleteBlog.bind(this)
  }
  deleteBlog(){
    this.setState({
      deleteLoading:true
    })
    this.props.deleteBlog(this.state)
  }
  updateBlog(){
    this.setState({
      updateLoading:true
    })
    this.props.toggleModal(true,'blog', this.state)
  }
  render () {
    return !this.props.isAuthenticated
      ? (<Card>
        <Card.Content>
          <Card.Header>
            {this.state.title}
          </Card.Header>
          <Card.Meta>
            Created at: {this.state.createdAt}
          </Card.Meta>
          <Card.Description>
            {this.props.message}
          </Card.Description>
        </Card.Content>
      </Card>)
      : <Card>
        <Card.Content>
          <Card.Header>
            <Input>{this.state.title}</Input>
          </Card.Header>
          <Card.Meta>
            <Input>Created: {this.state.createdAt}</Input>
          </Card.Meta>
          <Card.Description>
            <Input>{this.props.message}</Input>
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
            <div className='ui two buttons'>
              <Button
                basic color='green'
                onClick={this.updateBlog}
              >Edit
              </Button>
              <Button
                basic color='red'
                onClick={this.deleteBlog}
                loading={this.state.deleteLoading}
              >Delete
              </Button>
            </div>
          </Card.Content>
      </Card>
  }

}

class News extends Component {
  constructor (props) {
    super(props)
    this.state = {
      blogs: []
    }
    if (typeof window !== 'undefined' && window) {
      props.socket.on('new blog', payload => {
        this.setState({blogs: [...this.state.blogs, payload]})
      })
      props.socket.on('delete blog', payload => {
        this.setState(
          {blogs: this.state.blogs.filter(blog => blog._id !== payload)})
      })
      props.socket.on('update blog', payload => {
        const newBlogs = this.state.blogs.map(blog => {
          if (blog._id === payload._id) {
            return payload
          }
          else {
            return blog
          }
        })

        this.setState(
          {blogs: newBlogs})
      })
    }
  }

  componentDidMount () {
    console.log('News Component Mounting')
    fetch('/api/blog', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      console.log('what is res', res)
      if (res.ok) {
        return res.json()
      }
      else {
        return Promise.reject(new Error(res.statusText))
      }
    }).then(data => {
      this.setState({blogs: data.blogs})
    }).catch(err => {
      console.log('News: what is error', err)
    })
    this.props.socket.emit('enter room', {
      room: 'news'
    })
  }

  render () {
    console.log('what is this.state.blogs', this.state.blogs)
    console.log('what is this.props.actions', this.props.actions)
    return (
      <Grid divided='vertically'>
        <Grid.Row columns={1}>
          <Grid.Column>

          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
        <Container >
          <Header as='h2'>News</Header>
          {
            !this.state.blogs.length
              ? <p>Coming soon!</p>
              : <Card.Group>
                {
                  this.state.blogs.map(blog => (<NewsItem
                      key={blog._id} {...blog}
                      isAuthenticated={this.props.isAuthenticated}
                      deleteBlog={this.props.actions.deleteBlog}
                      toggleModal={this.props.actions.toggleModal}
                    />)
                  )
                }
              </Card.Group>
          }

        </Container>
        </Grid.Row>
        <Grid.Row columns={1}>
          <Grid.Column>

          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}

export default News