import React, { Component } from 'react'
import LoginButton from './LoginButton'

class Header extends Component{
  constructor(props){
    super(props);
  }
  render(){
    return (
      <> <LoginButton /></>
    )
  }
}

export default Header;