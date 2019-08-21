import { LOGIN, REGISTER, STORE_PLAYLIST } from './actionType';
import axios from 'axios';

export function login(user, token, history) {
  console.log(user);
  return async function (dispatch, getState) {
    dispatch({
      type: LOGIN,
      payload: {
        spotify_id: user.id,
        display_name: user.display_name,
        profile_pic: user.images[0].url,
        token
      }
    })
  }
}

export function register({ spotify_id }) {
  return async function (dispatch, getState) {
    try {
      const currentState = getState();
      console.log(currentState)
      await axios.post(`${process.env.REACT_APP_API_URL}user`, {
        spotify_id: currentState.userReducer.spotify_id 
      })
      dispatch({
        type: REGISTER
      })
    } catch (error) {
      console.log(error)
    }
  }
}

export async function startListening(deviceId, spotify_id){
  return async function(dispatch, getState){
  const currentState = getState();
  const data = await axios.get('/playlist', {
    params: { spotify_id }
  })
  await axios({
    method: 'put',
    url: "https://api.spotify.com/v1/me/player/play",
    data: {
      device_ids: [deviceId],
      play: true,
      context_uri: data.data.playlist.uri_link,
      offset: {
        position: data.data.playlist.position
      },
      position_ms: data.data.playlist.progress_ms
    },
    headers: {
      Authorization: currentState.tokenReducer.token
    }
  })
    .then(response => {
      console.log(response)
    })
    .catch(error => {
      console.log(error)
    })
  }
}


export function getPlaylist(playlist_data) {
  console.log(playlist_data);
  return async function (dispatch, getState) {
    dispatch({
      type: STORE_PLAYLIST,
      payload: {
        uri_link: playlist_data.uri_link,
        position: playlist_data.position,
        progress_ms: playlist_data.progress_ms
      }
    })
  }
}