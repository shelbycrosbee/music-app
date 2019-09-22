import React, { Component } from 'react'
import axios from 'axios';
import { bindActionCreators } from 'redux';
import * as Actions from '../../redux/action';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button } from 'react-bootstrap'

/*Required Local Props :
  --spotify_id(a.k.a. topic_id)

Required Global Props :
  --getTopic(topic){}
*/

class PlaylistRedirectButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      API_URL: "/"
    };
  }

  async playlistRedirect(e) {
    this.props.storeTopic(e.target.value);
    this.props.history.push('/player');
    // await axios.get(`${process.env.REACT_APP_API_URL}playlist`, { params: {spotify_id: e.target.value}})
    // .then(response => {
    //   console.log(response);
    //   //implement SPOTIFY API CALL function from REDUX
    //   this.props.spotifyJoinPlaylist(response.data.data.playlist);
    // })
    // .catch(error => {
    //   console.log(error);
    // })
  }
  render() {
    return (
      <>
        <button value={this.props.topic_id} onClick={(e) => this.playlistRedirect(e)} className="redirect"> Join {this.props.display_name} </button>
        
      </>
    )
  }
}
const mapStateToProps = (state, props) => {
  return {
    ...state,
    // user: state.userReducer,
    // token: state.tokenReducer.token,
    // token_init: state.tokenReducer.token_init,
    // playlist: state.playlistReducer
  }
}

const mapDispatchToProps = dispatch => {
  return (
    bindActionCreators(Actions, dispatch)
  )
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PlaylistRedirectButton));