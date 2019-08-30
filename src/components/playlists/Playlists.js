import React, { Component } from 'react'
import axios from 'axios';
import PlaylistRedirectButton from './PlaylistRedirectButton'

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
        return <PlaylistRedirectButton topic_id={user.topic_id} display_name={user.display_name} />
      })
      content = usersList

    }


    return (
      <> {content}</>

    )
  }

}
