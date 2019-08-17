import { combineReducer, combineReducers } from 'redux';
import { LOGIN } from './actionType';

const initialUserState = {
  display_name: null,
  spotify_id: null,
  profile_pic: null
}

const userReducer = function (state = initialUserState, action) {
  switch (action.type) {
    case LOGIN: {
      return {
        ...state,
        display_name: action.payload.display_name,
        spotify_id: action.payload.spotify_id,
        profile_pic: action.payload.profile_pic
      }
    }
    default:
      return state;
  }
}

const tokenReducer = function (state = { token: null }, action) {
  switch (action.type) {
    case LOGIN: {
      return {
        ...state,
        token: `Bearer ${action.payload.token}`
      }
    }
    default:
      return state;
  }
}


export default combineReducers({ userReducer, tokenReducer })