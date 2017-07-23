import React, { Component } from 'react'

// AsyncRoute is used for code splitting in Production

class AsyncRoute extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loaded: false,
    }
  }

}

export default AsyncRoute