import React from 'react'
import Ws from '@adonisjs/websocket-client'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../../redux/action';
import { WSAEDESTADDRREQ } from 'constants';

const ws = Ws('ws://localhost:3333')

class Websocket extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isConnected: false,
      playlist: ''
    }

    // ws.connect()
    // ws.on('close', () => {
    //   console.log("And we're out!");
    //   this.setState({ isConnected: false });
    // })
  }

  componentDidMount() {
    //
  }

  disconnect() {
    ws.close()
    ws.on('close', () => {
      console.log("And we're out!");
      this.setState({ isConnected: false });
    })
  }

  connect() {
    ws.connect();
    ws.on('open', () => {
      console.log("We've made it");
      this.setState({ isConnected: true });
    })
    const newPlaylist = ws.subscribe(`playlist:${this.props.uri_link}`)
    console.log(newPlaylist)
    this.setState({ playlist: newPlaylist });
  }

  sendToAPI() {
    this.state.playlist.emit('message', { body: 'text'});
  }

  render() {
    return (
      <div>
        <p> Connected: {(this.state.isConnected ? 'True' : 'False')}</p>
        <button onClick={() => this.connect()}> Connect? </button>
        <button onClick={() => this.disconnect()}> Disconnect! </button>
        <button onClick={() => this.sendToAPI()} > Send </button>
      </div>
    )
  }
}

const mapStateToProps = (state, props) => {
  return {
    ...state,
  }
}

const mapDispatchToProps = dispatch => {
  return (
    bindActionCreators(Actions, dispatch)
  )
}
export default connect(mapStateToProps, mapDispatchToProps)(Websocket);