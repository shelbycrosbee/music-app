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
