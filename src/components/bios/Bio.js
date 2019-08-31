import React, { Component } from 'react'
import './index.css'
import { Row, Col } from 'react-bootstrap';

export default class Bio extends Component {
  render() {
    return (
      <Row className='text'>
        <Col>Chris Cozlick</Col>
        <Col>Sara Lewis</Col>
        <Col>Shelby Miller</Col>
        <Col>Taylor Warren</Col>
        <Col>Tom Bawel</Col>
      </Row>
    )
  }
}
