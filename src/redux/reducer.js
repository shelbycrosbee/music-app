import { combineReducers } from 'redux';
import { LOGIN, STORE_PLAYLIST, STORE_TOPIC, STORE_PLAYLIST_MS } from './actionType';

const initialUserState = {
  display_name: null,
  spotify_id: null,
  profile_pic: null
}

const initialPlaylistState = {
  topic_id: '',
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
        profile_pic: action.payload.profile_pic,
        active: action.payload.active,
        premium: action.payload.premium,
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
        playlist_uri: action.payload.playlist_uri,
        position: action.payload.position,
        progress_ms: action.payload.progress_ms
      }
    }
    default:
      return state;
  }
}

const topicReducer = function (state = { topic_id: '' }, action) {
  switch (action.type) {
    case STORE_TOPIC: {
      return {
        ...state,
        topic_id: action.payload.topic_id
      }
    }
    default:
      return state;
  }
}

const playlistSyncReducer = function (state = { syncMS: '' }, action) {
  switch (action.type) {
    case STORE_PLAYLIST_MS: {
      return {
        ...state,
        syncMS: action.payload.syncMS
      }
    }
    default:
      return state;
  }
}



export default combineReducers({ userReducer, tokenReducer, playlistReducer, topicReducer, playlistSyncReducer })