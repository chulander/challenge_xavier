import React, { Component } from 'react'
import {
  Button,
  Card,
  Container,
  Header,
  Image,
  Segment
} from 'semantic-ui-react'
const GroupCard = (props) => {
  console.log('what is props', props)
  return (
    <Card>
      <Card.Content>
        <Image floated='right' size='mini'
               src={props.photo} />
        <Card.Header>
          {props.name}
        </Card.Header>
        <Card.Meta>
          Friends of Elliot
        </Card.Meta>
        <Card.Description>
          Steve wants to add you to the group <strong>best friends</strong>
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <div className='ui two buttons'>
          <Button basic color='green'>Approve</Button>
          <Button basic color='red'>Decline</Button>
        </div>
      </Card.Content>
    </Card>
  )}
class Groups extends Component {
  constructor (props) {
    console.log('what is props', props)
    super(props)
    this.state = {
      groups: [],
    }
    if(typeof window!=='undefined' && window){
      props.socket.on('new group',payload=>{
        this.setState({groups: [...this.state.groups, payload]})
      })
    }

  }

  componentDidMount () {
    fetch('/api/group', {method: 'GET'}).then(response => response.json())
    .then(groups=>{
      console.log('frontend groups', groups)
      this.setState({groups})
    }).catch(err => {
      console.log('error', err)
    })
    this.props.socket.emit('enter room',{
      room: 'groups'
    })
  }
  componentWillUnmount() {
    this.props.socket.emit('leave room', {
      room: 'groups'
    })
  }

  render () {
    console.log('players: what is this.state', this.state)
    console.log('players: what is this.props', this.props)
    return (
      <Segment>
        <Container>
          <Header as='h2'>Groups</Header>
          <Card.Group>
            {this.state.groups.map(group=> {
                console.log('what is group', group)
                return (<GroupCard key={group._id} {...group} />)
              }

            )}
          </Card.Group>
        </Container>

      </Segment>
    )
  }
}
export default Groups

// plus


