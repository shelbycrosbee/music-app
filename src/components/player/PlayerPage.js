import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../../redux/action';
import Player from './Player';
import { Row, Col } from 'react-bootstrap'
import Websocket from '../websocket/Websocket'
import './index.css'



class PlayerPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        {/* <Row className='center bodyText' >
          <Col>
            <Websocket />
          </Col>
        </Row> */}
        <Row className='center bodyText' >
          <Col sm={12}>
            <Player />
          </Col>
          </Row>
          <Row>
          {/* <img src={`${this.props.user.profile_pic}`}/> */}
          </Row>
        
      </>
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