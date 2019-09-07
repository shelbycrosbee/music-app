import React, { Component } from 'react';
import ReroutingButton from './ReroutingButton';
import './index.css'
import { Navbar, Nav } from 'react-bootstrap'
import Logo from './Logo';
import { withRouter } from 'react-router-dom';

class Header extends Component {
  constructor(props) {
    super(props);
  }



  render() {
    return (

      <Navbar collapseOnSelect className="customBg" expand='sm'>
        <Navbar.Brand href="#home">
          <Logo />
          {/* <ReroutingButton name='Home Page' url='/home' /> */}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto" onSelect={url => this.props.history.push(url)}>
            <ReroutingButton name='Login' url='/' />
            <ReroutingButton name='Player' url='/player'/>
            <ReroutingButton name='The Makers' url='/about' />
            </Nav>
        </Navbar.Collapse>
      </Navbar>

        )
      }
    }
    
export default withRouter(Header);