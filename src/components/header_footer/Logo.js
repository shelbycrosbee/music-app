import React, { Component } from 'react'
import './index.css'
import { Image } from 'react-bootstrap'
import logoandname from '../images/logo2.svg'
import { withRouter } from 'react-router-dom'


class Logo extends Component {
  constructor(props) {
    super(props)
  }
  
  logoGoHome() {
    this.props.history.push('/home')
  }

  render() {
    return (
      <>
        <Image src={logoandname} alt='logo' className="logo" onClick={(e) => this.logoGoHome()} />
      </>
    )
  }
}

export default withRouter(Logo)