import React, { Component } from 'react';
import LoginButton from '../login/LoginButton';
import ReroutingButton from './ReroutingButton';

class Header extends Component{
  constructor(props){
    super(props);
  }
  render(){
    return (
      <> 
        <ReroutingButton name='Login Page' redirectUrl='/'/>
        <ReroutingButton name='Player Page' redirectUrl='/player'/>
        <ReroutingButton name='Home Page' redirectUrl='/home'/>
      </>
    )
  }
}

export default Header;