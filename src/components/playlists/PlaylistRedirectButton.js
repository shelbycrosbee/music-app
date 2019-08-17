import React, { Component } from 'react'
import axios from 'axios';

/*Required Local Props :
  --spotify_id
  --display_name

Required Global Props :
  --API_URL
  --spotifyJoinPlaylist(playlist){}
*/

class PlaylistRedirectButton extends Component {
  constructor(props){
    super(props);
    this.state = {
      API_URL: "/"
    };
  }

  async playlistRedirect(e){
    await axios.get(`${process.env.REACT_APP_API_URL}playlist`, { params: {spotify_id: e.target.value}})
    .then(response => {
      console.log(response);
      //implement SPOTIFY API CALL function from REDUX
      this.props.spotifyJoinPlaylist(response.data.data.playlist);
    })
    .catch(error => {
      console.log(error);
    })
  }
  render() {
    return (
      <>
        <button value={this.props.spotify_id} onclick={(e) => this.playlistRedirect(e)}> {this.props.display_name} </button>
      </>
    )
  }
}

export default PlaylistRedirectButton;
