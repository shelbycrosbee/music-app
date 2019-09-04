import React from 'react';
import axios from 'axios';
import PlayerControls from './PlayerControls';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../../redux/action';
import { Row, Col } from 'react-bootstrap';
import Websocket from '../websocket/Websocket'
import { statement } from '@babel/template';


class Player extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deviceId: "",
      error: "",
      trackName: "Track Name",
      artistName: "Artist Name",
      albumName: "Album Name",
      albumImage: '',
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
      const albumImage = currentTrack.album.images[0].url;
      const artistName = currentTrack.artists
        .map(artist => artist.name)
        .join(", ");
      const playing = !state.paused;
      this.setState({
        albumImage,
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



  async joinPlaylist() {
    const { deviceId } = this.state;
    await axios({
      method: 'put',
      url: "https://api.spotify.com/v1/me/player/play",
      data: {
        device_ids: [deviceId],
        play: true,
        context_uri: `spotify:playlist:${this.props.playlist.uri_link}`,
        offset: {
          position: this.props.playlist.position
        },

        position_ms: this.props.playlist.progress_ms
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

  getPosition() {
    this.player.getCurrentState().then(state => {
      if (!state) {
        console.error('User is not playing music through the Web Playback SDK');
        return;
      }
      // console.log(state.track_window)
      console.log(state.context.metadata)
      return {
        progress_ms: state.position,
        currentTrack: state.track_window.current_track.uri
      }
    });
  }


  render() {
    const {
      artistName,
      trackName,
      albumName,
      albumImage,
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
        <Row className='center bodyText' >
          <Col>
            <Websocket
              getPosition={() => this.getPosition()}
              player={this.player}
            />
          </Col>
        </Row>
        <Row>
          <button onClick={() => this.getPosition()}>don't click me</button>

          {/* <Col xs={12} sm={8}><img src={albumImage} alt="album art" /></Col> */}
          <Col>
            <p><u>Artist</u>: {artistName}</p>
            <p><u>Track</u>: {trackName}</p>
            <p><u>Album</u>: {albumName}</p>
            <PlayerControls
              playing={this.state.playing}
              player={this.player}
              checkForPlayer={() => this.checkForPlayer()}
              joinButton={() => this.joinButton()}
              spotifyInit={this.state.spotifyInit}
            />
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    ...state,
    user: state.userReducer,
    token: state.tokenReducer.token,
    token_init: state.tokenReducer.token_init,
    playlist: state.playlistReducer
  }
}

const mapDispatchToProps = dispatch => {
  return (
    bindActionCreators(Actions, dispatch)
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Player);