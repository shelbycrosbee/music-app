import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../../redux/action';
import axios from 'axios';
import PlaylistRedirectButton from '../playlists/PlaylistRedirectButton'
import Playlists from '../playlists/Playlists';
import { Button } from 'react-bootstrap'
// import ReroutingButton from '../header_footer/ReroutingButton';
// import Websocket from '../websocket/Websocket';
import * as Datetime from 'react-datetime';
// require('react-datetime')

const hash = window.location.hash
  .substring(1)
  .split("&")
  .reduce(function (initial, item) {
    if (item) {
      var parts = item.split("=");
      initial[parts[0]] = decodeURIComponent(parts[1]);
    }
    return initial;
  }, {});
window.location.hash = "";

class HomePage extends Component {
  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    let _token = hash.access_token;
    if (_token) {
      const user = await axios.get('https://api.spotify.com/v1/me', { headers: { Authorization: `Bearer ${_token}` } })
      this.props.login(user.data, _token);
      this.props.register(user.data)
    }
  }

  dateButton() {
    let time = Date.now()
    console.log(time)
  }

  render() {
    return (
      <div>
        <PlaylistRedirectButton topic_id='1234' display_name='Shelby' />
        {/* <img src={`${this.props.user.profile_pic}`}/> */}
        <Button onClick={() =>  this.dateButton() }>get date</Button>
      </div>

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
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomePage));