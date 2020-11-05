import {
    ADD_PERMISSION,
    GET_PERMISSIONS,
    GET_PERMISSION,
    DELETE_PERMISSION,
    PERMISSION_LOADING
  } from "../actions/types";
  
  const initialState = {
    permissions: [],
    permission: {},
    loading: false
  };
  
  export default function(state = initialState, action) {
    switch (action.type) {
      case PERMISSION_LOADING:
        return {
          ...state,
          loading: true
        };
      case GET_PERMISSIONS:
        return {
          ...state,
          permissions: action.payload,
          loading: false
        };
      case GET_PERMISSION:
        return {
          ...state,
          permission: action.payload,
          loading: false
        };
      case ADD_PERMISSION:
        return {
          ...state,
          permissions: [action.payload, ...state.permissions]
        };
      case DELETE_PERMISSION:
        return {
          ...state,
          permissions: state.permissions.filter(permission => permission.pid !== action.payload)
        };
      default:
        return state;
    }
  }
  