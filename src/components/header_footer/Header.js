import React, { Component } from 'react';
import LoginButton from '../login/LoginButton';
import ReroutingButton from './ReroutingButton';
import { Navbar, Nav, Button, Form, FormControl } from 'react-bootstrap'

class Header extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
    
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="#home"><ReroutingButton name='Home Page' redirectUrl='/home' />
            </Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link><ReroutingButton name='Login' redirectUrl='/' /></Nav.Link>
            <Nav.Link><ReroutingButton name='Player' redirectUrl='/player' /></Nav.Link>
          </Nav>
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-light">Search</Button>
          </Form>
        </Navbar>
        
    )
  }
}

export default Header;