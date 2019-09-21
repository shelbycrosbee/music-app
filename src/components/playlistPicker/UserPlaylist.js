import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import { ListGroupItem } from 'react-bootstrap';
import './playlistPicker.css'
import { bindActionCreators } from 'redux';
import * as Actions from '../../redux/action';
import { connect } from 'react-redux';

const mapStateToProps = (state, props) => {
  return {
    ...state,
    user: state.userReducer,
    token: state.tokenReducer.token,
    // token_init: state.tokenReducer.token_init,
    // playlist: state.playlistReducer
  }
}

const mapDispatchToProps = dispatch => {
  return (
    bindActionCreators(Actions, dispatch)
  )
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(class UserPlaylist extends Component {
  constructor(props) {
    super(props);
  }

  playlistSet = async (e) => {
    e.preventDefault();
    await axios.put(`${process.env.REACT_APP_API_URL}users/updatePlaylist`, { spotify_id: this.props.spotify_id, playlist_uri: this.props.id });
    await this.props.getPlaylist();
    this.props.storeTopic(this.props.user.spotify_id)
    this.props.history.push('/Player')
  }

  render() {
    return (
      <ListGroupItem className='playlistItem' action onClick={(e) => this.playlistSet(e)}>
        {this.props.name}
        {/* <button onClick={(e) => this.playlistSet(e)}> This is the One! </button> */}
      </ListGroupItem>
    )
  }
}))
