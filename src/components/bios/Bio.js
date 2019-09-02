import React, { Component } from 'react'
import './index.css'
import { Row, Col, Card, Button } from 'react-bootstrap';
import shelby from '../images/shelby.jpg'

export default class Bio extends Component {
  render() {
    return (
      <Row className='text'>
        <Col className='text'>Chris Cozlick</Col>
        <Col className='text'>Sara Lewis</Col>


        <Col><Card style={{ width: '18rem' }} className="cardForBio">
          <Card.Img variant="top" src={shelby} />
          <Card.Body>
            <Card.Title>Shelby Miller</Card.Title>
            <Card.Text> 
            </Card.Text>
            <Button className="button" href="https://shelby-resume.herokuapp.com/" target="blank">Visit My Website</Button>
          </Card.Body>
        </Card>
        </Col>


        <Col className='text'>Taylor Warren</Col>
        <Col className='text'>Tom Bawel</Col>
      </Row>
    )
  }
}
