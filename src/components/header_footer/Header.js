import React, { Component } from 'react';
import ReroutingButton from './ReroutingButton';
import './index.css'
import { Navbar, Nav, Image } from 'react-bootstrap'
import Logo from './Logo';

class Header extends Component {
  constructor(props) {
    super(props);
  }



  render() {
    return (

      <Navbar className="customBg" expand='sm'>
        <Navbar.Brand href="#home">
          <Logo/>
          {/* <ReroutingButton name='Home Page' redirectUrl='/home' /> */}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link><ReroutingButton name='Login' redirectUrl='/' /></Nav.Link>
            <Nav.Link><ReroutingButton name='Player' redirectUrl='/player' /></Nav.Link>
            <Nav.Link><ReroutingButton name='Playlists' redirectUrl='/playlists' /></Nav.Link>
            <Nav.Link><ReroutingButton name='About Us' redirectUrl='/about' /></Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

    )
  }
}

export default Header;