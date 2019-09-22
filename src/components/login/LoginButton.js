import React, { Component } from 'react'
import './index.css'
import { Row, Col, Button } from 'react-bootstrap';

const CLIENT_ID = '1af7ab55e7e64df992dadf08719596ac';
export const authEndpoint = 'https://accounts.spotify.com/authorize';
const redirectUri = process.env.REACT_APP_REDIRECT_URL;
const scopes = [
  "user-read-currently-playing",
  "user-read-playback-state",
  'user-read-email',
  'user-read-private',
  'user-read-currently-playing',
  'streaming',
  'user-modify-playback-state',
  'user-follow-read'
];

export default class LoginButton extends Component {
  render() {
    return (
      <Row  className='center'>
        <Col>
      <Button size="lg"  className="loginButton">
        <a href={`${authEndpoint}?client_id=${CLIENT_ID}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`}> Login </a>
      </Button>
      </Col>
      </Row>
    )
  }
}