import React, { Component } from 'react';
import ReroutingButton from './ReroutingButton';
import './index.css'
import { Navbar, Nav } from 'react-bootstrap'
import Logo from './Logo';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../../redux/action';

class Header extends Component {
  constructor(props) {
    super(props);
  }



  render() {
    const loginLogout = (this.props.tokenReducer.token ?  'Logout' : 'Login')

    return (

      <Navbar collapseOnSelect className="customBg" expand='sm'>
        <Navbar.Brand href="#home">
          <Logo />
          {/* <ReroutingButton name='Home Page' url='/home' /> */}
        </Navbar.Brand>
        <Navbar.Text className='displayName' >
          {this.props.user.display_name}
        </Navbar.Text>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto" onSelect={url => this.props.history.push(url)}>
            <ReroutingButton name={loginLogout} url='/' />
            <ReroutingButton name='Player' url='/player' />
            <ReroutingButton name='The Makers' url='/about' />
          </Nav>
        </Navbar.Collapse>

      </Navbar>

    )
  }
}
const mapStateToProps = (state, props) => {
  return {
    ...state,
    user: state.userReducer,
    tokenReducer: state.tokenReducer
  }
}

const mapDispatchToProps = dispatch => {
  return (
    bindActionCreators(Actions, dispatch)
  )
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));