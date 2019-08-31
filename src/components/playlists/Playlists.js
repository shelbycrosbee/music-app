import React, { Component } from 'react'
import axios from 'axios';
import PlaylistRedirectButton from './PlaylistRedirectButton'
import { Accordion, Card } from 'react-bootstrap'
import "./index.css"

export default class Playlists extends Component {
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

  render() {
    let content = <p>loading</p>
    if (this.state.loaded) {
      console.log(this.state.users)
      let usersList = this.state.users.map(user => {
        return <li><PlaylistRedirectButton topic_id={user.topic_id} display_name={user.display_name} /></li>
      })
      content = usersList
    }


    return (
      <>
        <Accordion>
          <Card>
            <Accordion.Toggle as={Card.Header} eventKey="0" className="active">
              Active Users
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="0">
              <Card.Body><ul>{content}</ul></Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card>
            <Accordion.Toggle as={Card.Header} eventKey="1" className="your">
              Your Playlist
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="1">
              <Card.Body><button>start my playlist</button></Card.Body>
            </Accordion.Collapse>
          </Card>

        </Accordion>
      </>

    )
  }

}
