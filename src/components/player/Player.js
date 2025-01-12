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
      trackUri: '',
      playing: false,
      position: 0,
      duration: 0,
      spotifyInit: false,
      joinedMyPlaylist: false,
      playerDelay: false,
      changeSong: false
    };
    this.checkForPlayer = this.checkForPlayer.bind(this);
    this.joinPlaylist = this.joinPlaylist.bind(this)
    this.joinSelfButton = this.joinSelfButton.bind(this);
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
      const {
        current_track: currentTrack,
        position,
        duration,
      } = state.track_window;
      const trackName = currentTrack.name;
      const albumName = currentTrack.album.name;
      const albumImage = currentTrack.album.images[0].url;
      const trackUri = currentTrack.uri;
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
        playing,
        trackUri
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
    this.player.on('player_state_changed', state => {
      if (state !== null) {
        const {
          current_track: currentTrack,
        } = state.track_window;
        const newTrackUri = currentTrack.uri;
        if (newTrackUri !== this.state.trackUri && this.props.user.spotify_id === this.props.topic_id) {
          setTimeout(this.toggleChangeSong(), 1.5 * 1000);
        }
      }
      this.onStateChanged(state)
    });

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

    this.player.on('ready', async data => {
      if (this.props.user.spotify_id === this.props.topic_id) {
        setTimeout(() => { this.joinSelfButton(); }, 1000);
      }
    })
  }



  transferPlaybackHere() {
    const { deviceId } = this.state;
    console.log('transferPlaybackHere:' + deviceId)
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

    const { deviceId } = this.state;
    this.props.startListening(deviceId, spotify_id);


  }



  async joinPlaylist(playlist_data) {
    const { deviceId } = this.state;
    // console.log(playlist_data)
    await joinOther(playlist_data, deviceId, this.props.token);
    this.player.pause();
    let seekProgressMS = parseInt(playlist_data.progress_ms) - parseInt(playlist_data.join_time) + Date.now();
    this.player.seek(seekProgressMS + 1 * 1000).then(() => console.log(seekProgressMS))
    setTimeout(this.player.play(), 1 * 1000)

  }

  async joinSelfButton() {
    const { deviceId } = this.state;
    this.props.startListening(deviceId, this.props.user.spotify_id)
    // await joinSelf(this.props.playlist, deviceId, this.props.token)
  }

  toggleChangeSong() {
    this.setState({ changeSong: !this.state.changeSong });
  }


  getPosition() {
    // let checkJoinTime = Date.now();
    let time_01 = Date.now();
    return this.player.getCurrentState().then(state => {
      if (!state) {
        console.error('User is not playing music through the Web Playback SDK');
        return;
      }
      let playlistInfo = {
        time_01: time_01,
        // join_time: checkJoinTime,
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


    let playerOrPlaylists = (this.props.topic_id !== "" ?
      <>
        <div>
          <h3>NOW PLAYING</h3>
          <br/>
        </div>

        {error && <p>Error: {error}</p>}
        <Row>
          {/*<button onClick={() => this.getPosition()}>don't click me</button>*/}

          <Col>
            <img src={albumImage} />
            <p><b className="titleColors">Artist:  </b>{artistName}</p>
            <p><b className="titleColors">Track: </b>{trackName}</p>
            <p><b className="titleColors">Album: </b>{albumName}</p>
            {/* <PlayerControls
              playing={this.state.playing}
              player={this.player}
              checkForPlayer={() => this.checkForPlayer()}
              spotifyInit={this.state.spotifyInit}
              joinSelfButton={() => this.joinSelfButton()}
              joinPlaylist={() => this.joinPlaylist()}
              owner={this.props.topic_id === this.props.user.spotify_id}
            /> */}
            <Websocket
              getPosition={() => this.getPosition()}
              player={this.player}
              spotifyInit={this.state.spotifyInit}
              joinPlaylist={this.joinPlaylist}
              playing={this.state.playing}
              checkForPlayer={() => this.checkForPlayer()}
              spotifyInit={this.state.spotifyInit}
              joinSelfButton={() => this.joinSelfButton()}
              owner={this.props.topic_id === this.props.user.spotify_id}
              changeSong={this.state.changeSong}
              toggleChangeSong={() => this.toggleChangeSong()}
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