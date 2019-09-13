import React, { Component } from 'react'
import './index.css'
import { Row, Col, Card, Button, Container } from 'react-bootstrap';
import shelby from '../images/shelby.jpg'
import taylor from '../images/taylor.jpg'

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


        <Col><Card style={{ width: '18rem' }} className="cardForBio">
          <Card.Img variant="top" src={taylor} />
          <Card.Body>
            <Card.Title>Taylor Warren</Card.Title>
            <Card.Text> 
            </Card.Text>
            <Button className="button" href="" target="blank">Visit My Website</Button>
          </Card.Body>
        </Card></Col>
        <Col className='text'>Tom Bawel</Col>
      </Row>
     
   
    )
  }
}
