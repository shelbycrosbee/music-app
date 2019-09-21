import React, { Component } from 'react'
import axios from 'axios'

export default class CustomPlaylist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: ''
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`${process.env.REACT_APP_API_URL}users/updatePlaylist`, { spotify_id: this.props.spotify_id, playlist_uri: this.state.id });
  }

  handleEditChange = (e) => {
    this.setState({ id: e.target.value })
  }

  render() {
    return (
      <div>
        <form onSubmit={e => this.handleSubmit(e)}>
          <input type="text"
            value={this.state.id}
            placeholder='Enter the Spotify URI link for you playlist'
            name="id"
            onChange={e => this.handleEditChange(e)} />
          <button type="submit"> Submit! </button>
        </form>
      </div>
    )
  }
}
