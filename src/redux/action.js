import { LOGIN, REGISTER } from './actionType';
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
      await axios.post('/user', {
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
