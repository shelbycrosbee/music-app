import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../../redux/action';
import axios from 'axios';
import ReroutingButton from '../header_footer/ReroutingButton';
import Player from './Player';
import { Row }  from 'react-bootstrap'
import Websocket from '../websocket/Websocket'



class PlayerPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Row className="justify-content-center">
        <Player />
        <Websocket />
        {/* <img src={`${this.props.user.profile_pic}`}/> */}
      </Row>
    )
  }
}

const mapStateToProps = (state, props) => {
  return {
    ...state,
    user: state.userReducer
  }
}

const mapDispatchToProps = dispatch => {
  return (
    bindActionCreators(Actions, dispatch)
  )
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PlayerPage));