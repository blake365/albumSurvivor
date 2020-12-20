import {
  SET_USER,
  // POST_VOTE,
  //   SET_ERRORS,
  //   CLEAR_ERRORS,
  //   LOADING_UI,
  LOADING_USER,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
} from '../types'

const initialState = {
  authenticated: false,
  loading: false,
  credentials: {},
  voteHistory: [],
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return {
        ...state,
        authenticated: true,
      }
    case SET_UNAUTHENTICATED:
      return initialState
    case SET_USER:
      return {
        ...state,
        authenticated: true,
        loading: false,
        ...action.payload,
      }
    case LOADING_USER:
      return {
        ...state,
        loading: true,
      }
    // case POST_VOTE:
    //   return {
    //     ...state,
    //     voted: true,
    //   }

    default:
      return state
  }
}

export default userReducer
