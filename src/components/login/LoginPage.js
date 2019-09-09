import React, { Component } from 'react'
import LoginButton from './LoginButton'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../../redux/action';
import LogoutButton from './LogoutButton';

class LoginPage extends Component {
  render() {
    const loginStatus = (this.props.tokenReducer.token ? <LogoutButton /> : <LoginButton />)
    return (
      <div>
        {loginStatus}
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);