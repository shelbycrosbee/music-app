import React, { Component } from 'react'
import './index.css'
import { Row, Col, Card, Button, Container } from 'react-bootstrap';
import shelby from '../images/shelby.jpg'
import taylor from '../images/taylor.jpg'
import sara from '../images/sara.jpg'
import chris from '../images/chris.jpeg'
import tom from '../images/tom.jpeg'
import markandgeorgie from '../images/markandgeorgie.jpg'

export default class Bio extends Component {
  render() {
    return (
      <Container className="textForBioPage">
        <Row>
          <Col lg={{ span: 8, offset: 2 }} md={{ span: 10, offset: 1 }}>
            <Card className='headerCard'>
              <Card.Text>
                Montana Code School Summer 2019 Cohort
            </Card.Text>
            </Card>
          </Col>
        </Row>
        <Row className='textForBioPage'>
          <Col className='textForBioPage'>
            <Card style={{ width: '10rem' }} className="cardForBio">
              <Card.Img variant="top" src={chris} />
              <Card.Body>
                <Card.Title className='textForBioPage'>Chris Kozlik</Card.Title>
                <Card.Text>
                </Card.Text>
                <Button className="bioButton" href="https://github.com/Ckozlik/Ckozlik.github.io" target="blank">My GitHub</Button>
              </Card.Body>
            </Card>
          </Col>

          <Col className='textForBioPage'><Card style={{ width: '10rem' }} className="cardForBio">
            <Card.Img variant="top" src={sara} />
            <Card.Body>
              <Card.Title className='textForBioPage'>Sara Lewis</Card.Title>
              <Card.Text>
              </Card.Text>
              <Button className="bioButton" href="https://github.com/saralouwho" target="blank">My GitHub</Button>
            </Card.Body>
          </Card></Col>

          <Col className='textForBioPage'><Card style={{ width: '10rem' }} className="cardForBio">
            <Card.Img variant="top" src={shelby} />
            <Card.Body>
              <Card.Title className='textForBioPage'>Shelby Miller</Card.Title>
              <Card.Text>
              </Card.Text>
              <Button className="bioButton" href="https://shelby-resume.herokuapp.com/" target="blank">My Website</Button>
            </Card.Body>
          </Card>
          </Col>


          <Col className='textForBioPage'><Card style={{ width: '10rem' }} className="cardForBio">
            <Card.Img variant="top" src={taylor} />
            <Card.Body>
              <Card.Title className='textForBioPage'>Taylor Warren</Card.Title>
              <Card.Text>
              </Card.Text>
              <Button className="bioButton" href="https://youtu.be/dQw4w9WgXcQ?t=85" target="blank">My GitHub</Button>
            </Card.Body>
          </Card></Col>

          <Col className='textForBioPage'><Card style={{ width: '10rem' }} className="cardForBio">
            <Card.Img variant="top" src={tom} />
            <Card.Body>
              <Card.Title className='textForBioPage'>Tom Bawel</Card.Title>
              <Card.Text>
              </Card.Text>
              <Button className="bioButton" href="https://github.com/tbawel" target="blank">My GitHub</Button>
            </Card.Body>
          </Card></Col>

        </Row>


        <Row>
          <Col lg={{span: 4, offset: 4}}>
            <Card  className="secondHeaderCard">
              <Card.Text>
                Fearful Leaders
            </Card.Text>
            </Card>
          </Col>
        </Row>

        <Row className='textForBioPage justify-content-center'>
          <Col></Col>
          <Col className='textForBioPage'>
            <Card style={{ width: '25rem' }} className="cardForBio markAndGeorgieImage">
              <Card.Img variant="top" src={markandgeorgie} />
              <Card.Body>
              <Card.Title>Mark Buckner and Georgie Kirschner</Card.Title>
                <Card.Text>
                </Card.Text>
                <Button className="markAndGeorgieButton" href="https://www.talents-models.com/en/men/1821-marc-buckner/" target="blank" >Mark's Website</Button>
                <Button className="bioButton" href="https://www.theindustrymodelmgmt.com/model/new-york/management/724-georgie-taylor/" target="blank">Georgie's Website</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col></Col>
        </Row>

      </Container>

    )
  }
}
