import React, { Component } from 'react'
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../../redux/action';


class PlayerControls extends Component {
  constructor(props){
    super(props);
    this.state={};
  }
  
  onPrevClick() {
    if(!this.props.player){
      this.props.checkForPlayer()
    } 
    else {

      this.props.player.previousTrack();
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
  }

  onPlayClick() {
    this.props.player.togglePlay();
  }

  onNextClick() {
    this.props.player.nextTrack();
  }
  render() {
    // if(this.props.spotifyInit){
      if(true){
    return (
      <div>
        <button onClick={() => this.onPrevClick()}>Previous</button>
              <button onClick={() => this.onPlayClick()}>{this.props.playing ? "Pause" : "Play"}</button>
              <button onClick={() => this.onNextClick()}>Next</button>
              <button onClick={() => this.joinButton()}>Christina</button>

      </div>
    )}
    else {
      return(
        <p>Loading</p>
      )
    }
  }
}


const mapStateToProps = (state, props) => {
  return {
    ...state,
    user: state.userReducer,
    token: state.tokenReducer.token
  }
}

const mapDispatchToProps = dispatch => {
  return (
    bindActionCreators(Actions, dispatch)
  )
}
export default connect(mapStateToProps, mapDispatchToProps)(PlayerControls);
