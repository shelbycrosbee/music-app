import React, { Component } from 'react'
import UserPlaylist from './UserPlaylist';
import axios from 'axios'
import { bindActionCreators } from 'redux';
import * as Actions from '../../redux/action';
import { connect } from 'react-redux';
import CustomPlaylist from './CustomPlaylist';
import { ListGroup, Container, Col, Row } from 'react-bootstrap';

class PlaylistPickerPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userPlaylists: null
    }
  }

  componentDidMount() {
    axios.get(`https://api.spotify.com/v1/users/${this.props.user.spotify_id}/playlists`, { headers: { Authorization: `${this.props.token}` } })
      .then(userPlaylists => {
        let mappedPlaylists = userPlaylists.data.items.map(item => { return { id: item.id, name: item.name } })
        //console.log(userPlaylists.data.items)
        console.log(mappedPlaylists)
        this.setState({ userPlaylists: mappedPlaylists })
      })
  }

  render() {
    let renderUserPlaylists;
    console.log(this.state.userPlaylists);
    (this.state.userPlaylists !== null ? renderUserPlaylists = this.state.userPlaylists.map(playlist => {
      return <UserPlaylist
        spotify_id={this.props.user.spotify_id}
        name={playlist.name}
        id={playlist.id}
      />
    }) : renderUserPlaylists = <p> No Playlist Loaded </p>)
    return (
      <Container>

        <Row className="justify-content-center">
          <Col style={{ marginTop: '2em' }} md={{ span: 5, offset: 0 }}>
            <ListGroup>
              {renderUserPlaylists}
            </ListGroup>
          </Col>
          <Col style={{ marginTop: '2em' }} md={{ span: 5, offset: 2 }}>
            <CustomPlaylist spotify_id={this.props.user.spotify_id} />
          </Col>
        </Row>
      </Container>
    )
  }
}

const mapStateToProps = (state, props) => {
  return {
    ...state,
    user: state.userReducer,
    token: state.tokenReducer.token,
    // token_init: state.tokenReducer.token_init,
    // playlist: state.playlistReducer
  }
}

const mapDispatchToProps = dispatch => {
  return (
    bindActionCreators(Actions, dispatch)
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistPickerPage);