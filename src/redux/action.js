import { LOGIN } from './actionType';
import axios from 'axios';

export function login(user, token, history) {
  console.log(user);
  return async function (dispatch, getState) {
    dispatch({
      type: LOGIN,
      payload: {
        spotify_id: user.id,
        display_name: user.display_name,
        profile_pic: user.profile_pic,
        token
      }
    })
  }
}
