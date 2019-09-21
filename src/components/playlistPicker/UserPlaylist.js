import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'

export default withRouter(class UserPlaylist extends Component {
  constructor(props) {
    super(props);
  }

  playlistSet = (e) => {
    e.preventDefault();
    axios.put(`${process.env.REACT_APP_API_URL}users/updatePlaylist`, { spotify_id: this.props.spotify_id, playlist_uri: this.props.id });
  }

  render() {
    return (
      <div>
        <h1> {this.props.name}</h1>
        <button onClick={(e) => this.playlistSet(e)}> This is the One! </button>
      </div>
    )
  }
})
