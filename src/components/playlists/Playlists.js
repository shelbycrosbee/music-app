import React, { Component } from 'react'
import axios from 'axios';
import PlaylistRedirectButton from './PlaylistRedirectButton'
import { Accordion, Card } from 'react-bootstrap'
import "./index.css"
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../../redux/action';
import { withRouter } from 'react-router-dom'

class Playlists extends Component {
  constructor(props) {
    super(props)
    this.state = {
      users: [],
      loaded: false
    }
  }

  componentDidMount() {

    axios.get(`${process.env.REACT_APP_API_URL}users/active`)
      .then(response => {
        console.log(response.data)
        this.setState({
          users: response.data,
          loaded: true
        })
        console.log()
      })
      .catch(error =>
        console.log(error)
      )

  }

  async getMyPlaylist() {
    this.props.getPlaylist()
    this.props.storeTopic(this.props.user.spotify_id)
    this.props.history.push('/player')
  }

  render() {
    let content = <p>loading</p>
    if (this.state.loaded) {
      let usersList = this.state.users.map(user => {
        return <li><PlaylistRedirectButton topic_id={user.topic_id} display_name={user.display_name} /></li>
      })
      content = usersList
    }


    return (
      <>
       <Accordion defaultActiveKey="0">
        <Card>
            <Accordion.Toggle as={Card.Header} eventKey="1" className="your">
              {this.props.user.display_name}'s Playlist
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="1">
              <Card.Body><button onClick={() => this.getMyPlaylist()}>Start Your Music!</button></Card.Body>
            </Accordion.Collapse>
          </Card>
       
          <Card>
            <Accordion.Toggle as={Card.Header} eventKey="0" className="activeUser">
              Active Users
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="0">
              <Card.Body><ul>{content}</ul></Card.Body>
            </Accordion.Collapse>
          </Card>
        

        </Accordion>
      </>

    )
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
  }
}

const mapDispatchToProps = dispatch => {
  return (
    bindActionCreators(Actions, dispatch)
  )
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Playlists));