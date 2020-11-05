import {
  ADD_ROLEPERMISSION,
  GET_ROLEPERMISSIONS,
  GET_ROLEPERMISSION,
  ROLEPERMISSION_LOADING,
  DELETE_ROLEPERMISSION

} from "../actions/types";

const initialState = {
  rolePermissions: [],
  rolePermission: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ROLEPERMISSION_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_ROLEPERMISSIONS:
      return {
        ...state,
        rolePermissions: action.payload,
        loading: false
      };
    case GET_ROLEPERMISSION:
      return {
        ...state,
        rolePermission: action.payload,
        loading: false
      };
    case ADD_ROLEPERMISSION:
      return {
        ...state,
        rolePermissions: [action.payload, ...state.rolePermissions]
      };
    case DELETE_ROLEPERMISSION:
      return {
        ...state,
        rolePermissions: state.rolePermissions.filter(rolePermission => rolePermission.email !== action.payload)
      };
    default:
      return state;
  }
}
