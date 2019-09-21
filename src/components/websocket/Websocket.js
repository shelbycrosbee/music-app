import React from 'react'
import Ws from '@adonisjs/websocket-client'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../../redux/action';
import PlayerControls from '../player/PlayerControls';

const ws = Ws(process.env.REACT_APP_API_WS)

class Websocket extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isConnected: false,
      playlist: null,
      spotify_id: '',
      playerReady: false,
      mayIAsk: true,
    }
    // this.onChange = this.onChange.bind(this);
    this.initializePlaylist = this.initializePlaylist.bind(this);
    this.wsCheckInterval = null

    // ws.connect()
    // ws.on('close', () => {
    //   console.log("And we're out!");
    //   this.setState({ isConnected: false });
    // })
  }

  componentDidMount() {
    //
    this.addEventListeners(this.connect())
    // if (this.props.spotify_id !== this.props.topic_id) {
    //   setTimeout(() => { this.onJoin(); }, 1000);
    // }
  }

  componentDidUpdate() {
    this.addEventListeners(this.state.playlist)
    if (this.state.mayIAsk) {
      this.onJoin();
      this.setState({ mayIAsk: false })
    }
  }

  addEventListeners(playlist) {
    if (this.props.player && !this.state.playerReady) {
      this.setState({
        playerReady: true
      })
      playlist.on('donde', async (data) => {
        let time_00 = Date.now();
        const playlist_data = await this.props.getPosition();
        let time_02 = Date.now();
        console.log(`Time_00: ${time_00} -- Time_01: ${playlist_data.time_01} -- Time_03: ${time_02}`);
        //api call to websocket
        this.state.playlist.emit('givePosition', { playlist: { ...playlist_data, join_time: Date.now() }, friend_id: data.friend_id });
      })

      playlist.on('join', async (playlist_data) => {
        // console.log(playlist_data);
        // playlist_data.progress_ms = parseInt(playlist_data.progress_ms) - parseInt(playlist_data.join_time) + Date.now();
        // console.log('Look at theeeese numbers: ' + (Date.now() - parseInt(playlist_data.join_time)));
        // this.props.storePlaylistMS(playlist_data.progress_ms);
        this.props.joinPlaylist(playlist_data);
      })
    }
  }

  onJoin() {
    // if ((this.props.topic_id === this.props.spotify_id) && this.props.spotifyInit) {
    //   //start playing
    //   this.props.player.togglePlay();
    // }
    // else {
    //   if (this.props.spotifyInit) {
    setTimeout(() => this.state.playlist.emit('aqui', { topic_id: this.props.topic_id }), 1000);
    //   }
    // }
  }



  disconnect() {
    ws.close()
    ws.on('close', () => {
      console.log("And we're out!");
      this.setState({ isConnected: false });
    })
  }

  componentWillUnmount() {
    ws.close();
  }

  connect() {
    ws.connect();
    ws.on('open', () => {
      console.log("We've made it");
      this.setState({ isConnected: true });
    })
    const newPlaylist = ws.subscribe(`playlist:${this.props.topic_id}`)
    this.initializePlaylist(newPlaylist);
    this.setState({ playlist: newPlaylist })
    return newPlaylist
  }



  initializePlaylist(playlist) {
    playlist.emit('initialize', { spotify_id: this.props.spotify_id, topic_id: this.props.topic_id })
  }


  render() {
    return (
      <div>
        {/* <button onClick={()=>this.onJoin()}>onJoin</button> */}
        <PlayerControls
          playing={this.props.playing}
          player={this.props.player}
          checkForPlayer={() => this.props.checkForPlayer()}
          spotifyInit={this.props.spotifyInit}
          joinSelfButton={() => this.props.joinSelfButton()}
          joinPlaylist={() => this.onJoin()}
          owner={this.props.owner}
        />
      </div>
    )
  }
}

const mapStateToProps = (state, props) => {
  return {
    ...state,
    spotify_id: state.userReducer.spotify_id,
    topic_id: state.topicReducer.topic_id
  }
}

const mapDispatchToProps = dispatch => {
  return (
    bindActionCreators(Actions, dispatch)
  )
}
export default connect(mapStateToProps, mapDispatchToProps)(Websocket);