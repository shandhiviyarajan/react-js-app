import {
  ADD_USER,
  GET_USERS,
  GET_USER,
  DELETE_USER,
  USER_LOADING
} from "../actions/types";

const initialState = {
  users: [],
  user: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_USERS:
      return {
        ...state,
        users: action.payload,
        loading: false
      };
      case GET_USER:
      return {
        ...state,
        admin: action.payload,
        loading: false
      };
    case ADD_USER:
      return {
        ...state,
        users: [action.payload, ...state.users]
      };
    case DELETE_USER:
      return {
        ...state,
        users: state.users.filter(user => user.email !== action.payload)
      };
    default:
      return state;
  }
}
