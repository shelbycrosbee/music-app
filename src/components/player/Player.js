import React from 'react';
import axios from 'axios';
import PlayerControls from './PlayerControls';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../../redux/action';
import { Row, Col } from 'react-bootstrap';
import Websocket from '../websocket/Websocket'
import Playlists from '../playlists/Playlists'
import { joinSelf, joinOther } from './axiosCalls';


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
      spotifyInit: false,
      joinedMyPlaylist: false,
      playerDelay: false
    };
    this.checkForPlayer = this.checkForPlayer.bind(this);
    this.joinPlaylist = this.joinPlaylist.bind(this)
  }



  componentDidMount() {

    window.onSpotifyWebPlaybackSDKReady = () => {
      this.checkForPlayer();
    }
    this.checkForPlayer();

    axios.put(`${process.env.REACT_APP_API_URL}users/activeStatus`, {
      spotify_id: this.props.user.spotify_id,
      active: true
    })

    axios.put(`${process.env.REACT_APP_API_URL}users/setTopicID`, {
      spotify_id: this.props.user.spotify_id,
      topic_id: this.props.topic_id
    })

  }

  componentWillUnmount() {
    this.setState({ joinedMyPlaylist: false })
    this.player.disconnect();
    axios.put(`${process.env.REACT_APP_API_URL}users/activeStatus`, {
      spotify_id: this.props.user.spotify_id,
      active: false
    })
  }

  componentDidUpdate() {
    axios.put(`${process.env.REACT_APP_API_URL}users/activeStatus`, {
      spotify_id: this.props.user.spotify_id,
      active: true
    })
    // if (this.state.playerDelay) {
    //   this.player.pause();
    //   setTimeout(() => {
    //     this.setState({ playerDelay: false })
    //     this.player.seek(this.props.syncMS)
    //     this.player.resume();
    //   }
    //     , 5000)
    // }
  }


  async checkForPlayer() {
    if (window.Spotify !== undefined) {
      this.player = new window.Spotify.Player({
        name: "Code School's Spotify Player",
        getOAuthToken: cb => { cb(this.props.token_init); },
      });
      this.createEventHandlers();
      await this.player.connect();
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
      console.log("Let the music play on twice!");
      await this.setState({ deviceId: device_id });
      await this.transferPlaybackHere();
    });
  }



  transferPlaybackHere() {
    const { deviceId } = this.state;
    axios({
      method: 'put',
      url: "https://api.spotify.com/v1/me/player",
      data: {
        device_ids: [deviceId],
        play: false
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



  async joinPlaylist(playlist_data) {
    const { deviceId } = this.state;
    // console.log(playlist_data)
    await joinOther(playlist_data, deviceId, this.props.token);
    // this.player.pause();
    // setTimeout(() => {

    //   // this.setState({ playerDelay: false })
    // this.player.seek(this.props.syncMS)
    // this.player.pause();
    //   }
    //     , 3000)
  }

  async joinSelfButton() {
    const { deviceId } = this.state;
    await joinSelf(this.props.playlist, deviceId, this.props.token)
  }


  getPosition() {
    return this.player.getCurrentState().then(state => {
      if (!state) {
        console.error('User is not playing music through the Web Playback SDK');
        return;
      }
      let playlistInfo = {
        join_time: Date.now(),
        progress_ms: state.position,
        playlist_uri: state.track_window.current_track.uri,
        // position: (state.track_window.previous_tracks.length ? state.track_window.previous_tracks.length : 0)
      }
      return playlistInfo;
    })
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


    let playerOrPlaylists = (this.props.topic_id ?
      <>
        <div>
          <h3>Code School Spotify Player</h3>
        </div>

        {error && <p>Error: {error}</p>}
        <Row className='center bodyText' >
          <Col>
            {/* <Websocket
              getPosition={() => this.getPosition()}
              player={this.player}
              spotifyInit={this.state.spotifyInit}
              joinPlaylist={this.joinPlaylist}
            /> */}
          </Col>
        </Row>
        <Row>
          {/*<button onClick={() => this.getPosition()}>don't click me</button>*/}

          <Col>
            <img src={albumImage} />
            <p><u>Artist</u>: {artistName}</p>
            <p><u>Track</u>: {trackName}</p>
            <p><u>Album</u>: {albumName}</p>
            <PlayerControls
              playlistFromWebsocket={this.props.playlistFromWebsocket}
              playing={this.state.playing}
              player={this.player}
              checkForPlayer={() => this.checkForPlayer()}
              spotifyInit={this.state.spotifyInit}
              joinSelfButton={() => this.joinSelfButton()}
              joinPlaylist={() => this.joinPlaylist()}
              owner={this.props.topic_id === this.props.user.spotify_id}
            />
          </Col>
        </Row>
      </>
      :
      <Playlists />
    );


    return (

      <div className="">
        {playerOrPlaylists}
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
    playlist: state.playlistReducer,
    topic_id: state.topicReducer.topic_id,
    syncMS: state.playlistSyncReducer.syncMS
  }
}

const mapDispatchToProps = dispatch => {
  return (
    bindActionCreators(Actions, dispatch)
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Player);