import {
    ADD_ROLE,
    GET_ROLES,
    GET_ROLE,
    DELETE_ROLE,
    ROLE_LOADING
  } from "../actions/types";
  
  const initialState = {
    roles: [],
    role: {},
    loading: false
  };
  
  export default function(state = initialState, action) {
    switch (action.type) {
      case ROLE_LOADING:
        return {
          ...state,
          loading: true
        };
      case GET_ROLES:
        return {
          ...state,
          roles: action.payload,
          loading: false
        };
      case GET_ROLE:
        return {
          ...state,
          role: action.payload,
          loading: false
        };
      case ADD_ROLE:
        return {
          ...state,
          roles: [action.payload, ...state.roles]
        };
      case DELETE_ROLE:
        return {
          ...state,
          roles: state.roles.filter(role => role.id !== action.payload)
        };
      default:
        return state;
    }
  }
  