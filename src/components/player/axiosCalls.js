import axios from 'axios';

export const joinSelf = (playlist_data, deviceId, token) => {
  console.log(playlist_data.playlist_uri)
  return axios({
    method: 'put',
    url: "https://api.spotify.com/v1/me/player/play",
    data: {
      device_ids: [deviceId],
      play: true,
      context_uri: `${playlist_data.playlist_uri}`,
      offset: {
        position: (playlist_data.position ? playlist_data.position : 0)
      },

      position_ms: (playlist_data.progress_ms ? playlist_data.progress_ms : 0)
    },
    headers: {
      Authorization: `${token}`
    }
  })
    .then(response => {
      console.log(response)
    })
    .catch(error => {
      console.log(error)
    })
}

export const joinOther = (playlist_data, deviceId, token) => {
  return axios({
    method: 'put',
    url: "https://api.spotify.com/v1/me/player/play",
    data: {
      device_ids: [deviceId],
      play: false,
      uris: [`${playlist_data.playlist_uri}`],
      offset: {
        position: (playlist_data.position ? playlist_data.position : 0)
      },
      position_ms: (playlist_data.progress_ms ? playlist_data.progress_ms : 0)
    },
    headers: {
      Authorization: `${token}`
    }
  })
    .then(response => {
      console.log(response)
    })
    .catch(error => {
      console.log(error)
    })
}