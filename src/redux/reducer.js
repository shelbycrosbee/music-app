import { combineReducers } from 'redux';
import { LOGIN, STORE_PLAYLIST } from './actionType';

const initialUserState = {
  display_name: null,
  spotify_id: null,
  profile_pic: null
}

const initialPlaylistState = {
  uri_link: '62OqyAX5XFoXu0CykxhOyA',
  position: 0,
  progress_ms: 0
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
        token: `Bearer ${action.payload.token}`,
        token_init: action.payload.token
      }
    }
    default:
      return state;
  }
}

const playlistReducer = function (state = initialPlaylistState, action) {
  switch (action.type) {
    case STORE_PLAYLIST: {
      return {
        ...state,
        uri_link: action.payload.uri_link,
        position: action.payload.position,
        progress_ms: action.payload.progress_ms
      }
    }
    default:
      return state;
  }
}

export default combineReducers({ userReducer, tokenReducer, playlistReducer })