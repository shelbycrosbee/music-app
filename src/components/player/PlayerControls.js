import React, { Component } from 'react'
import axios from 'axios';

class PlayerControls extends Component {
  onPrevClick() {
    this.player.previousTrack();
    axios({
      method: 'get',
      url: 'https://api.spotify.com/v1/me/following/contains',
      headers: {
        Authorization: `${this.props.token}`
      }
    })
      .then(response => {
        console.log(response)
      })
      .catch(error => {
        console.log(error)
      })

  }

  onPlayClick() {
    this.player.togglePlay();
  }

  onNextClick() {
    this.player.nextTrack();
  }
  render() {
    return (
      <div>
        <button onClick={() => this.onPrevClick()}>Previous</button>
              <button onClick={() => this.onPlayClick()}>{true ? "Pause" : "Play"}</button>
              <button onClick={() => this.onNextClick()}>Next</button>
              <button onClick={() => this.joinButton()}>Christina</button>
      </div>
    )
  }
}

export default PlayerControls;
