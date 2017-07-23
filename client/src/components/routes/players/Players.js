import React, { Component } from 'react'
import {
  Button,
  Card,
  Container,
  Header,
  Image,
  Segment
} from 'semantic-ui-react'
const PlayerCard = (props) => {
  console.log('what is props', props)
  return (
  <Card>
    <Card.Content>
      <Image floated='right' size='mini'
             src={props.photo} />
      <Card.Header>
        {`${props.firstName} ${props.lastName}`}
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
class Players extends Component {
  constructor (props) {
    console.log('what is props', props)
    super(props)
    this.state = {
      players: [],
    }
    if(typeof window!=='undefined' && window){
      props.socket.on('new player',payload=>{
        this.setState({players: [...this.state.players, payload]})
      })
    }

  }

  componentDidMount () {
    fetch('/api/player', {method: 'GET'}).then(response => response.json())
    .then(players=>{
      console.log('frontend players', players)
      this.setState({players})
    }).catch(err => {
      console.log('error', err)
    })
    this.props.socket.emit('enter room',{
      room: 'players'
    })
  }
  componentWillUnmount() {
    this.props.socket.emit('leave room', {
      room: 'players'
    })
  }

  render () {
    console.log('players: what is this.state', this.state)
    console.log('players: what is this.props', this.props)
    return (
      <Segment>
        <Container>
          <Header as='h2'>Players</Header>
          <Card.Group>
            {this.state.players.map(player => {
              console.log('what is player', player)
               return (<PlayerCard key={player._id} {...player} />)
              }

            )}
          </Card.Group>
        </Container>

      </Segment>
    )
  }
}
export default Players

// plus


