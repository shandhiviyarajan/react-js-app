import {
    ADD_ADMIN,
    GET_ADMINS,
    GET_ADMIN,
    DELETE_ADMIN,
    ADMIN_LOADING,
    GET_PROFILE
  } from "../actions/types";
  
  const initialState = {
    admins: [],
    admin: {},
    loading: false
  };
  
  export default function(state = initialState, action) {
    switch (action.type) {
      case ADMIN_LOADING:
        return {
          ...state,
          loading: true
        };
      case GET_ADMINS:
        return {
          ...state,
          admins: action.payload,
          loading: false
        };
      case GET_ADMIN:
        return {
          ...state,
          admin: action.payload,
          loading: false
        };
      case GET_PROFILE:
        return {
          ...state,
          profile: action.payload,
          loading: false
        };
      case ADD_ADMIN:
        return {
          ...state,
          admins: [action.payload, ...state.admins]
        };
      case DELETE_ADMIN:
        return {
          ...state,
          admins: state.admins.filter(admin => admin.email !== action.payload)
        };
      default:
        return state;
    }
  }
  