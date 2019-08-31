import React, { Component } from 'react';
import LoginButton from '../login/LoginButton';
import ReroutingButton from './ReroutingButton';
import './index.css'
import { Navbar, Nav, Button, Form, FormControl, Image } from 'react-bootstrap'
import logo from '../images/logo.svg'

class Header extends Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (

      <Navbar className="customBg" variant="dark">
        <Navbar.Brand href="#home"><ReroutingButton name='Home Page' redirectUrl='/home' />
        </Navbar.Brand>
        <Image src={logo} alt='logo'/>
        <Nav className="mr-auto">
          <Nav.Link><ReroutingButton name='Login' redirectUrl='/' /></Nav.Link>
          <Nav.Link><ReroutingButton name='Player' redirectUrl='/player' /></Nav.Link>
          <Nav.Link><ReroutingButton name='Playlists' redirectUrl='/playlists' /></Nav.Link>
        </Nav>

        {/* <Form inline>
    
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="#home">
          <Image src={logo} alt='logo'/>
            <ReroutingButton name='Home Page' redirectUrl='/home' />
            </Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link><ReroutingButton name='Login' redirectUrl='/' /></Nav.Link>
            <Nav.Link><ReroutingButton name='Player' redirectUrl='/player' /></Nav.Link>
            <Nav.Link><ReroutingButton name='Playlists' redirectUrl='/playlists' /></Nav.Link>
          </Nav>
          
          {/* <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-light">Search</Button>
          </Form> */}
        <Nav.Link><ReroutingButton  name='About Us' redirectUrl='/about'/></Nav.Link>
      </Navbar>

    )
  }
}

export default Header;