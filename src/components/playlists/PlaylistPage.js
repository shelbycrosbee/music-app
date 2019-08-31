import React, { Component } from 'react'
import Playlists from './Playlists'
import { Col, Row } from 'react-bootstrap';
import './index.css'

export default class PlaylistPage extends Component {
  render() {
    return (
      <>
      <Row className="center">
        <Col>
        <Playlists />
        </Col>
        </Row>
      </>
    )
  }
}
