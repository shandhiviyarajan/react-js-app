import {
    GET_DASHCAMS,
    GET_DASHCAM,
    DASHCAM_LOADING
  } from '../actions/types';
  
  const initialState = {
    dashcams: [],
    dashcam: {},
    loading: false
  };
  
  export default function(state = initialState, action) {
    switch (action.type) {
      case DASHCAM_LOADING:
        return {
          ...state,
          loading: true
        };
      case GET_DASHCAMS:
        return {
          ...state,
          dashcams: action.payload,
          loading: false
        };
      case GET_DASHCAM:
        return {
          ...state,
          dashcam: action.payload,
          loading: false
        };
      default:
        return state;
    }
  }
  