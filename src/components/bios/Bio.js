import React, { Component } from 'react'
import './index.css'
import { Row, Col, Card, Button, Container } from 'react-bootstrap';
import shelby from '../images/shelby.jpg'
import taylor from '../images/taylor.jpg'
import sara from '../images/sara.jpg'
import chris from '../images/chris.jpeg'
import tom from '../images/tom.jpeg'
import markandgeorgie from '../images/instructors.svg'

export default class Bio extends Component {
  render() {
    return (
      <Container>
        <Row>
          <Col className='textForBioPage'><h3><br /><u>Students of the Montana Code School 2019 Cohort</u></h3></Col>
        </Row>
        <Row className='textForBioPage'>
          <Col className='textForBioPage'>
            <Card style={{ width: '10rem' }} className="cardForBio">
              <Card.Img variant="top" src={chris} />
              <Card.Body>
                <Card.Title>Chris Kozlik</Card.Title>
                <Card.Text>
                </Card.Text>
                <Button className="button" href="https://github.com/Ckozlik/Ckozlik.github.io" target="blank">My GitHub</Button>
              </Card.Body>
            </Card>
          </Col>

          <Col className='textForBioPage'><Card style={{ width: '10rem' }} className="cardForBio">
            <Card.Img variant="top" src={sara} />
            <Card.Body>
              <Card.Title>Sara Lewis</Card.Title>
              <Card.Text>
              </Card.Text>
              <Button className="button" href="https://github.com/saralouwho" target="blank">My GitHub</Button>
            </Card.Body>
          </Card></Col>

          <Col className='textForBioPage'><Card style={{ width: '10rem' }} className="cardForBio">
            <Card.Img variant="top" src={shelby} />
            <Card.Body>
              <Card.Title>Shelby Miller</Card.Title>
              <Card.Text>
              </Card.Text>
              <Button className="button" href="https://shelby-resume.herokuapp.com/" target="blank">Visit My Website</Button>
            </Card.Body>
          </Card>
          </Col>


          <Col className='textForBioPage'><Card style={{ width: '10rem' }} className="cardForBio">
            <Card.Img variant="top" src={taylor} />
            <Card.Body>
              <Card.Title>Taylor Warren</Card.Title>
              <Card.Text>
              </Card.Text>
              <Button className="button" href="https://github.com/TaylorAWarren" target="blank">My GitHub</Button>
            </Card.Body>
          </Card></Col>

          <Col className='textForBioPage'><Card style={{ width: '10rem' }} className="cardForBio">
            <Card.Img variant="top" src={tom} />
            <Card.Body>
              <Card.Title>Tom Bawel</Card.Title>
              <Card.Text>
              </Card.Text>
              <Button className="button" href="https://github.com/tbawel" target="blank">My GitHub</Button>
            </Card.Body>
          </Card></Col>

        </Row>


        <Row>
          <Col className='textForBioPage justify-content-center'><h3><u>Fearful Leaders</u></h3></Col>
        </Row>

        <Row className='textForBioPage justify-content-center'>
          <Col></Col>
          <Col className='textForBioPage'>
            <Card style={{ width: '25rem' }} className="cardForBio">
              <Card.Img variant="top" src={markandgeorgie} />
              <Card.Body>
                <Card.Title>Mark Buckner and Georgie Kirschner</Card.Title>
                <Card.Text>
                </Card.Text>
                <Button className="button" href="https://www.talents-models.com/en/men/1821-marc-buckner/" target="blank">Mark's Website</Button>
                -
                <Button className="button" href="https://www.theindustrymodelmgmt.com/model/new-york/management/724-georgie-taylor/" target="blank">Georgie's Website</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col></Col>
        </Row>

      </Container>

    )
  }
}
