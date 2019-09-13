import React from 'react';
import Header from './components/header_footer/Header';
import HomePage from './components/home/HomePage';
import PlayerPage from './components/player/PlayerPage';
import LoginPage from './components/login/LoginPage';
import { Route, Switch, withRouter } from 'react-router-dom';
import Footer from './components/header_footer/Footer';
import PlaylistPage from './components/playlists/PlaylistPage';
import Bio from './components/bios/Bio'
import './index.css'
import Ws from '@adonisjs/websocket-client'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from './redux/action';

const ws = Ws('ws://localhost:3333')


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isConnected: false,
      playlist: null,
      spotify_id: '',
      playerReady: false,
      mayIAsk: true,
    }
    this.initializePlaylist = this.initializePlaylist.bind(this);
  }

  componentDidMount() {
    this.addEventListeners(this.connect())
  }

  addEventListeners(playlist) {
    if (this.props.player && !this.state.playerReady) {
      this.setState({
        playerReady: true
      })
      playlist.on('donde', async (data) => {
        const playlist_data = await this.props.getPosition();
        //api call to websocket
        this.state.playlist.emit('givePosition', { playlist: playlist_data, friend_id: data.friend_id });
      })

      playlist.on('join', async (playlist_data) => {
        console.log(playlist_data);
        playlist_data.progress_ms = parseInt(playlist_data.progress_ms) - parseInt(playlist_data.join_time) + Date.now();
        this.props.storePlaylistMS(playlist_data.progress_ms);
        this.props.joinPlaylist(playlist_data);
      })
    }
  }

  onJoin() {
    this.state.playlist.emit('aqui', { topic_id: this.props.topic_id });
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
        <Header />
        <Switch>
          <Route exact path="/" component={LoginPage} />
          <Route path="/home" component={HomePage} />
          <Route path="/player" render={(props) =>
            <PlayerPage 
            playlistFromWebsocket={this.state.playlist}
            onJoin={()=> this.onJoin()}
            addEventListeners={() => this.addEventListeners()}
            />
          }
          />
          <Route path="/playlists" component={PlaylistPage} />
          <Route path='/about' component={Bio} />
        </Switch>
        <Footer />
      </div>
    );
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
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
