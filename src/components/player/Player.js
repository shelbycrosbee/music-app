import React from 'react';
import axios from 'axios';
import PlayerControls from './PlayerControls';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../../redux/action';


class Player extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deviceId: "",
      error: "",
      trackName: "Track Name",
      artistName: "Artist Name",
      albumName: "Album Name",
      playing: false,
      position: 0,
      duration: 0,
      spotifyInit: false
    };
    this.checkForPlayer = this.checkForPlayer.bind(this);
  }



  componentDidMount() {
    window.onSpotifyWebPlaybackSDKReady = () => {
      this.checkForPlayer();
    }
    this.checkForPlayer();
  }


  checkForPlayer() {
    if (window.Spotify !== undefined) {
      this.player = new window.Spotify.Player({
        name: "Code School's Spotify Player",
        getOAuthToken: cb => { cb(this.props.token_init); },
      });
      this.createEventHandlers();
      this.player.connect();
      this.setState({
        spotifyInit: true
      })
    } 
  }

  onStateChanged(state) {
    // if we're no longer listening to music, we'll get a null state.
    if (state !== null) {
      console.log(state.track_window);
      const {
        current_track: currentTrack,
        position,
        duration,
      } = state.track_window;
      const trackName = currentTrack.name;
      const albumName = currentTrack.album.name;
      const artistName = currentTrack.artists
        .map(artist => artist.name)
        .join(", ");
      const playing = !state.paused;
      this.setState({
        position,
        duration,
        trackName,
        albumName,
        artistName,
        playing
      });
    }
  }

  createEventHandlers() {
    this.player.on('initialization_error', e => { console.error(e); });
    this.player.on('authentication_error', e => {
      console.error(e);
     
    });
    this.player.on('account_error', e => { console.error(e); });
    this.player.on('playback_error', e => { console.error(e); });

    // Playback status updates
    this.player.on('player_state_changed', state => this.onStateChanged(state));

    // Ready
    this.player.on('ready', data => {
      let { device_id } = data;
      console.log("Let the music play on!");
      this.setState({ deviceId: device_id });
    });

    this.player.on('ready', async data => {
      let { device_id } = data;
      console.log("Let the music play on!");
      await this.setState({ deviceId: device_id });
      this.transferPlaybackHere();
    });
  }



  transferPlaybackHere() {
    const { deviceId } = this.state;
    axios({
      method: 'put',
      url: "https://api.spotify.com/v1/me/player",
      data: {
        device_ids: [deviceId],
        play: true
      },
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


  async changePlaylist(spotify_id) {
    // const data = await axios.get('/playlist', {
    //   params: { spotify_id }
    // })
    // this.joinSpotifyPlaylist(data.data.playlist)
    const { deviceId } = this.state;
    this.props.startListening(deviceId, spotify_id);


  }

  async joinSpotifyPlaylist(playlist) {
    // const { deviceId } = this.state;
    // console.log(playlist.uri_link)
    // await axios({
    //   method: 'put',
    //   url: "https://api.spotify.com/v1/me/player/play",
    //   data: {
    //     device_ids: [deviceId],
    //     play: true,
    //     context_uri: playlist.uri_link,
    //     offset: {
    //       position: playlist.position
    //     },
    //     position_ms: playlist.progress_ms
    //   },
    //   headers: {
    //     Authorization: `${this.props.token}`
    //   }
    // })
    //   .then(response => {
    //     console.log(response)
    //   })
    //   .catch(error => {
    //     console.log(error)
    //   })
  }

  async joinButton() {
    const { deviceId } = this.state;
    const spotify_id = 'christina'
    const data = await axios.get('/playlist', {
      params: { spotify_id: spotify_id }
    })
    await axios({
      method: 'put',
      url: "https://api.spotify.com/v1/me/player/play",
      data: {
        device_ids: [deviceId],
        play: true,
        context_uri: data.data.playlist.uri_link,
        offset: {
          position: data.data.playlist.position
        },
        position_ms: data.data.playlist.progress_ms
      },
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



  render() {
    const {
      artistName,
      trackName,
      albumName,
      error,
      position,
      duration,
      playing,
    } = this.state;



    return (
      <div className="">
        <div>
          <h3>Code School Spotify Player</h3>
        </div>

        {error && <p>Error: {error}</p>}
        <div>
          <p>Artist: {artistName}</p>
          <p>Track: {trackName}</p>
          <p>Album: {albumName}</p>
          <p>
            <PlayerControls 
            playing={this.state.playing}
            player={this.player}
            checkForPlayer={() => this.checkForPlayer()}
            spotifyInit={this.state.spotifyInit}
            />
          </p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    ...state,
    user: state.userReducer,
    token: state.tokenReducer.token,
    token_init: state.tokenReducer.token_init
  }
}

const mapDispatchToProps = dispatch => {
  return (
    bindActionCreators(Actions, dispatch)
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Player);