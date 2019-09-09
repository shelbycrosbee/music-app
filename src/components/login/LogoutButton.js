import React, { Component } from 'react'
import { Button, Col, Row } from 'react-bootstrap'


export default class LogoutButton extends Component {
handleLogout(){
  window.localStorage.clear()
  window.location.reload()
}

  render() {
    return (
      <Row className='center'>
        <Col>
        <Button size='lg' onClick={() => this.handleLogout()}>Logout</Button>
      </Col>
      </Row>
    )
  }
}
